import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

async function verifyRecaptcha(token: string): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  // Secret tanımlı değilse reCAPTCHA doğrulaması atlanır.
  if (!secret) return true;
  if (!token) return false;
  try {
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }),
    });
    const data = (await res.json()) as { success?: boolean; score?: number };
    return data.success === true && (typeof data.score !== "number" || data.score >= 0.5);
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  try {
    const form = await request.formData();

    // Honeypot: gizli "website" alanı doluysa botları sessizce başarılıymış gibi geçir.
    if (form.get("website")) {
      return NextResponse.json({ success: true, message: "Mesajınız alındı." });
    }

    const recaptchaOk = await verifyRecaptcha(String(form.get("recaptchaToken") ?? ""));
    if (!recaptchaOk) {
      return NextResponse.json(
        { success: false, message: "Doğrulama başarısız oldu. Lütfen tekrar deneyin." },
        { status: 400 },
      );
    }

    const ad = String(form.get("ad") ?? "").trim();
    const soyad = String(form.get("soyad") ?? "").trim();
    const sirket = String(form.get("sirket") ?? "").trim();
    const eposta = String(form.get("eposta") ?? "").trim();
    const konu = String(form.get("konu") ?? "").trim();
    const mesaj = String(form.get("mesaj") ?? "").trim();

    if (!ad || !eposta || mesaj.length < 10) {
      return NextResponse.json(
        { success: false, message: "Lütfen zorunlu alanları eksiksiz doldurun." },
        { status: 400 },
      );
    }

    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const to = process.env.CONTACT_TO || user;

    if (!user || !pass) {
      console.error("SMTP kimlik bilgileri eksik (SMTP_USER / SMTP_PASS).");
      return NextResponse.json(
        {
          success: false,
          message: "Mesaj gönderilemedi. Lütfen daha sonra tekrar deneyin.",
        },
        { status: 500 },
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT || 465),
      secure: (process.env.SMTP_SECURE ?? "true") === "true",
      auth: { user, pass },
    });

    const adSoyad = [ad, soyad].filter(Boolean).join(" ");
    const html = `
      <h2>Yeni iletişim formu mesajı</h2>
      <p><strong>Ad Soyad:</strong> ${escapeHtml(adSoyad)}</p>
      <p><strong>Şirket:</strong> ${escapeHtml(sirket) || "-"}</p>
      <p><strong>E-posta:</strong> ${escapeHtml(eposta)}</p>
      <p><strong>Konu:</strong> ${escapeHtml(konu) || "-"}</p>
      <p><strong>Mesaj:</strong></p>
      <p style="white-space:pre-line">${escapeHtml(mesaj)}</p>
    `;

    await transporter.sendMail({
      from: `"Gözütok Grup İletişim" <${user}>`,
      to,
      replyTo: eposta,
      subject: `İletişim Formu: ${konu || "Genel"} — ${adSoyad}`,
      text: `Ad Soyad: ${adSoyad}\nŞirket: ${sirket || "-"}\nE-posta: ${eposta}\nKonu: ${konu || "-"}\n\n${mesaj}`,
      html,
    });

    return NextResponse.json({
      success: true,
      message: "Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.",
    });
  } catch (error) {
    console.error("İletişim formu gönderim hatası:", error);
    return NextResponse.json(
      { success: false, message: "Bir hata oluştu. Lütfen tekrar deneyin." },
      { status: 500 },
    );
  }
}
