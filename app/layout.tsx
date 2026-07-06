import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gözütok Grup | Beş sektör, tek çatı",
  description:
    "Gözütok Grup; geri dönüşüm teknolojileri, metal sistemleri, lüks konaklama, savunma sanayi ve inşaat alanlarında faaliyet gösteren çok sektörlü bir grup şirketidir.",
};

export const viewport = {
  themeColor: "#003049",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${inter.variable} ${manrope.variable} scroll-smooth`}
    >
      <body className="overflow-x-hidden">{children}</body>
    </html>
  );
}
