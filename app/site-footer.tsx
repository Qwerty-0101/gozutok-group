import Link from "next/link";
import { POLICIES } from "./politikalar/policies";

export function SiteFooter() {
  return (
    <footer id="site-footer" data-nav-theme="dark" className="border-t-4 border-brick bg-space text-white">
      <div className="shell">
        <div className="grid gap-12 py-14 sm:grid-cols-2 sm:py-16 lg:grid-cols-[1.15fr_.65fr_.85fr_1fr] lg:gap-16">
          <div className="max-w-md">
            <Link href="/" className="inline-block text-3xl font-semibold text-cream sm:text-4xl">GÖZÜTOK</Link>
            <p className="mt-5 text-sm leading-7 text-white/55">Beş farklı uzmanlık alanını ortak yönetim anlayışı, sürdürülebilir büyüme ve kalıcı değer hedefiyle bir araya getiriyoruz.</p>
          </div>

          <div>
            <h2 className="text-[11px] font-bold tracking-[.18em] text-steel uppercase">Bağlantılar</h2>
            <nav aria-label="Footer menüsü" className="mt-5 grid gap-3 text-sm text-white/65">
              <Link href="/#kurumsal" className="w-fit transition hover:text-white">Kurumsal</Link>
              <Link href="/#markalar" className="w-fit transition hover:text-white">Markalar</Link>
              <Link href="/#ekosistem" className="w-fit transition hover:text-white">Ekosistem</Link>
              <Link href="/#surdurulebilirlik" className="w-fit transition hover:text-white">Sürdürülebilirlik</Link>
              <Link href="/#kariyer" className="w-fit transition hover:text-white">Kariyer</Link>
            </nav>
          </div>

          <div>
            <h2 className="text-[11px] font-bold tracking-[.18em] text-steel uppercase">Politikalar</h2>
            <nav aria-label="Politikalar" className="mt-5 grid gap-3 text-sm text-white/65">
              {POLICIES.map((policy) => (
                <Link key={policy.slug} href={`/politikalar/${policy.slug}`} className="w-fit transition hover:text-white">
                  {policy.title}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h2 className="text-[11px] font-bold tracking-[.18em] text-steel uppercase">İletişim</h2>
            <address className="mt-5 space-y-4 text-sm leading-6 not-italic text-white/65">
              <p>Beştepe Mah. 40. Sk. Çakıroğlu Plaza<br />A Blok Kat: 4 Daire: 101<br />Yenimahalle / Ankara</p>
              <p>
                <a href="tel:+905343696471" className="block w-fit transition hover:text-white">+90 534 369 64 71</a>
                <a href="mailto:info@gozutokmetal.com.tr" className="block w-fit transition hover:text-white">info@gozutokmetal.com.tr</a>
              </p>
            </address>
            <Link href="/#iletisim" className="group mt-6 inline-flex min-h-11 items-center gap-3 border-b border-brick pb-1 text-sm font-semibold text-white transition hover:text-cream">
              İletişime geç <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 py-6 text-[11px] text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Gözütok Grup. Tüm hakları saklıdır.</span>
          <a href="#top" aria-label="Sayfanın başına dön" className="group inline-flex w-fit items-center gap-2 text-white/50 transition hover:text-white">
            Başa dön <span className="transition-transform group-hover:-translate-y-1">↑</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
