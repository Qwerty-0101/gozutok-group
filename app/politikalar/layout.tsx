import Link from "next/link";
import { SiteFooter } from "../site-footer";

export default function PoliciesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header id="top" className="sticky top-0 z-50 border-b bg-mist/90 backdrop-blur-xl">
        <div className="shell flex h-20 items-center justify-between">
          <Link
            href="/"
            aria-label="Gözütok Grup ana sayfa"
            className="relative block h-12 w-48 overflow-hidden sm:w-56"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/q-06.svg"
              alt="Gözütok Grup"
              className="absolute left-1/2 top-1/2 w-[128%] max-w-none -translate-x-1/2 -translate-y-1/2"
            />
          </Link>
          <Link href="/" className="button-secondary group !min-h-10 !px-5">
            <span className="transition-transform group-hover:-translate-x-1">←</span> Ana sayfa
          </Link>
        </div>
      </header>
      {children}
      <SiteFooter />
    </>
  );
}
