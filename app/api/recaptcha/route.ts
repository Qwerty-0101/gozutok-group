import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// reCAPTCHA v3 site key'i çalışma zamanında (env_file) istemciye verir.
export function GET() {
  return NextResponse.json({ siteKey: process.env.RECAPTCHA_SITE_KEY ?? "" });
}
