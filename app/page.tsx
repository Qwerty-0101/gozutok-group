"use client";

import { useEffect } from "react";
import { getRecaptchaToken } from "./recaptcha";

export default function Home() {
  useEffect(() => {
    const nav = document.querySelector<HTMLElement>("#nav");
    const menuButton = document.querySelector<HTMLButtonElement>("#menuButton");
    const mobileMenu = document.querySelector<HTMLElement>("#mobileMenu");
    const themedSections = [
      ...document.querySelectorAll<HTMLElement>("[data-nav-theme]"),
    ];
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const heroVideo = document.querySelector<HTMLVideoElement>("#heroVideo");
    const onVideoError = () => {
      if (heroVideo) heroVideo.hidden = true;
    };
    heroVideo?.addEventListener("error", onVideoError);

    const corporateSlider =
      document.querySelector<HTMLElement>("#corporateSlider");
    const corporateSlides = [
      ...document.querySelectorAll<HTMLElement>(".corporate-slide"),
    ];
    const sliderDots = document.querySelector<HTMLElement>("#sliderDots");
    let activeSlide = 0;
    let sliderTimer: number | undefined;

    const showSlide = (index: number) => {
      activeSlide = (index + corporateSlides.length) % corporateSlides.length;
      corporateSlides.forEach((slide, slideIndex) => {
        const isActive = slideIndex === activeSlide;
        slide.classList.toggle("is-active", isActive);
        slide.setAttribute("aria-hidden", String(!isActive));
      });
      sliderDots?.querySelectorAll("button").forEach((dot, dotIndex) => {
        const isActive = dotIndex === activeSlide;
        dot.classList.toggle("is-active", isActive);
        dot.setAttribute("aria-current", isActive ? "true" : "false");
      });
    };

    corporateSlides.forEach((_, index) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = `slider-dot${index === 0 ? " is-active" : ""}`;
      dot.setAttribute("aria-label", `${index + 1}. görseli göster`);
      dot.addEventListener("click", () => showSlide(index));
      sliderDots?.append(dot);
    });

    const startSlider = () => {
      window.clearInterval(sliderTimer);
      sliderTimer = window.setInterval(
        () => showSlide(activeSlide + 1),
        4500,
      );
    };
    const stopSlider = () => window.clearInterval(sliderTimer);

    if (corporateSlides.length > 1 && !reduceMotion) {
      corporateSlider?.addEventListener("mouseenter", stopSlider);
      corporateSlider?.addEventListener("mouseleave", startSlider);
      corporateSlider?.addEventListener("focusin", stopSlider);
      corporateSlider?.addEventListener("focusout", startSlider);
      startSlider();
    }

    const updateNav = () => {
      if (!nav) return;
      const scrolled = window.scrollY > 24;
      const sampleLine = 90;
      let activeSection: HTMLElement | undefined = themedSections[0];

      themedSections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= sampleLine && rect.bottom > sampleLine)
          activeSection = section;
      });

      nav.dataset.theme = activeSection?.dataset.navTheme || "cream";
      nav.classList.toggle("nav-surface", scrolled);
    };

    const onMenuClick = () => {
      if (!menuButton || !mobileMenu) return;
      const isOpen = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!isOpen));
      menuButton.setAttribute(
        "aria-label",
        isOpen ? "Menüyü aç" : "Menüyü kapat",
      );
      mobileMenu.classList.toggle("hidden");
    };
    menuButton?.addEventListener("click", onMenuClick);

    const closeMenu = () => {
      menuButton?.setAttribute("aria-expanded", "false");
      menuButton?.setAttribute("aria-label", "Menüyü aç");
      mobileMenu?.classList.add("hidden");
    };
    const menuLinks = mobileMenu
      ? [...mobileMenu.querySelectorAll("a")]
      : [];
    menuLinks.forEach((link) => link.addEventListener("click", closeMenu));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    document
      .querySelectorAll<HTMLElement>(".reveal")
      .forEach((element, index) => {
        element.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
        observer.observe(element);
      });

    window.addEventListener("scroll", updateNav, { passive: true });
    updateNav();

    if (window.location.hash) {
      window.setTimeout(() => {
        document
          .querySelector(window.location.hash)
          ?.scrollIntoView();
      }, 150);
    }

    return () => {
      heroVideo?.removeEventListener("error", onVideoError);
      corporateSlider?.removeEventListener("mouseenter", stopSlider);
      corporateSlider?.removeEventListener("mouseleave", startSlider);
      corporateSlider?.removeEventListener("focusin", stopSlider);
      corporateSlider?.removeEventListener("focusout", startSlider);
      menuButton?.removeEventListener("click", onMenuClick);
      menuLinks.forEach((link) =>
        link.removeEventListener("click", closeMenu),
      );
      window.removeEventListener("scroll", updateNav);
      window.clearInterval(sliderTimer);
      observer.disconnect();
    };
  }, []);

  const handleContactSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    const submit = form.querySelector<HTMLButtonElement>("#contactSubmit");
    const status = form.querySelector<HTMLElement>("#contactStatus");
    if (!submit || !status) return;

    const originalLabel = submit.innerHTML;
    submit.disabled = true;
    submit.innerHTML = "Gönderiliyor...";
    status.className = "mt-4 hidden text-sm font-medium";

    try {
      const body = new FormData(form);
      const token = await getRecaptchaToken("contact");
      if (token) body.append("recaptchaToken", token);
      const response = await fetch(form.action, {
        method: "POST",
        body,
        headers: { Accept: "application/json" },
      });
      const result = await response.json();
      if (!response.ok || !result.success)
        throw new Error(result.message || "Mesaj gönderilemedi.");

      form.reset();
      status.textContent = result.message;
      status.className = "mt-4 text-sm font-medium text-green-700";
    } catch (error) {
      status.textContent =
        error instanceof Error
          ? error.message
          : "Bir hata oluştu. Lütfen tekrar deneyin.";
      status.className = "mt-4 text-sm font-medium text-brick";
    } finally {
      submit.disabled = false;
      submit.innerHTML = originalLabel;
    }
  };

  return (
    <>
      <header
        id="top"
        data-nav-theme="light"
        className="relative min-h-[100svh] overflow-hidden bg-white"
      >
        <video
          id="heroVideo"
          className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover opacity-[.82]"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source src="/Gztokgroup-video.mp4" type="video/mp4" />
        </video>
        <div className="pointer-events-none absolute inset-0 z-[1] bg-white/12" />
        <div className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,.72)_0%,rgba(255,255,255,.5)_32%,rgba(255,255,255,.08)_72%)]" />

        <nav
          id="nav"
          className="fixed inset-x-0 top-0 z-50 border-b border-transparent transition duration-300"
        >
          <div className="shell flex h-20 items-center justify-between">
            <a
              href="#top"
              aria-label="Gözütok Grup ana sayfa"
              className="relative z-10 block h-12 w-48 overflow-hidden sm:w-56"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                id="navLogo"
                src="/q-06.svg"
                alt="Gözütok Grup"
                className="absolute left-1/2 top-1/2 w-[128%] max-w-none -translate-x-1/2 -translate-y-1/2 transition duration-300"
              />
            </a>

            <div className="hidden items-center gap-8 lg:flex">
              <a href="#kurumsal" className="text-sm font-medium transition hover:text-brick">Kurumsal</a>
              <a href="#markalar" className="text-sm font-medium transition hover:text-brick">Markalar</a>
              <a href="#ekosistem" className="text-sm font-medium transition hover:text-brick">Ekosistem</a>
              <a href="#surdurulebilirlik" className="text-sm font-medium transition hover:text-brick">Sürdürülebilirlik</a>
              <a href="#iletisim" className="nav-cta button-primary !min-h-10 !px-5">İletişime geç</a>
            </div>

            <button
              id="menuButton"
              type="button"
              className="relative z-10 grid size-11 place-items-center rounded-full border border-space/15 bg-white/50 backdrop-blur lg:hidden"
              aria-expanded="false"
              aria-controls="mobileMenu"
              aria-label="Menüyü aç"
            >
              <span className="sr-only">Menü</span>
              <span className="flex flex-col gap-1.5">
                <span className="block h-px w-5 bg-space" />
                <span className="block h-px w-5 bg-space" />
              </span>
            </button>
          </div>

          <div
            id="mobileMenu"
            className="absolute inset-x-4 top-20 hidden rounded-3xl border border-space/10 bg-white/95 p-5 text-space shadow-2xl backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col">
              <a href="#kurumsal" className="border-b py-4 text-lg font-semibold">Kurumsal</a>
              <a href="#markalar" className="border-b py-4 text-lg font-semibold">Markalar</a>
              <a href="#ekosistem" className="border-b py-4 text-lg font-semibold">Ekosistem</a>
              <a href="#surdurulebilirlik" className="border-b py-4 text-lg font-semibold">Sürdürülebilirlik</a>
              <a href="#iletisim" className="button-primary mt-5">İletişime geç</a>
            </div>
          </div>
        </nav>

        <div className="relative z-10 flex min-h-[100svh] flex-col pt-20">
          <div className="hero-editorial-grid pointer-events-none absolute inset-0 opacity-40" />
          <div className="hero-orb-drift pointer-events-none absolute left-[12%] top-[17%] size-[32rem] rounded-full bg-steel/5 blur-[120px]" />
          <div className="pointer-events-none absolute right-[8%] top-[30%] size-[22rem] rounded-full bg-brick/[.025] blur-[100px]" />

          <div className="shell relative flex flex-1 items-center py-10 sm:py-12">
            <div className="mx-auto w-full max-w-4xl text-center">
              <div className="hero-in-1 mx-auto mb-8 flex w-fit items-center gap-4 text-xs font-bold tracking-[.28em] text-brick uppercase sm:text-sm">
                <span className="h-px w-10 bg-brick sm:w-14" />
                Gözütok Group
                <span className="h-px w-10 bg-brick sm:w-14" />
              </div>
              <h1 className="hero-in-2 hero-title-primary text-[clamp(2.2rem,6.45vw,7.35rem)] leading-[.95]">
                <span className="block text-space">Farklı sektörler.</span>
                <span className="block text-steel">Ortak vizyon.</span>
              </h1>
              <p className="hero-in-3 mx-auto mt-7 max-w-2xl text-base font-medium leading-7 text-space/80">
                Metal sistemlerinden savunma sanayine, geri dönüşüm teknolojilerinden turizm ve inşaata uzanan markalarımızla sürdürülebilir büyüme ve kalıcı değer üretiyoruz.
              </p>
              <div className="hero-in-4 mt-8 flex flex-wrap justify-center gap-3">
                <a href="#markalar" className="button-primary group">Markaları keşfet <span className="arrow">→</span></a>
                <a href="#kurumsal" className="button-secondary !bg-white/70">Grup yapısı</a>
              </div>
            </div>
          </div>

          <div className="relative z-10 mb-4 flex shrink-0 flex-col items-center gap-2 sm:mb-5">
            <span className="text-[9px] font-bold tracking-[.2em] text-space/30 uppercase">Keşfet</span>
            <div className="h-10 w-px overflow-hidden rounded-full bg-space/15">
              <div className="scroll-line-anim h-4 w-full rounded-full bg-space/45" />
            </div>
          </div>
        </div>
      </header>

      <section
        data-nav-theme="light"
        className="overflow-hidden border-y border-space/10 bg-white"
        aria-label="Gözütok Grup markaları"
      >
        <div className="flex items-center justify-between border-b border-space/10 px-5 py-4 sm:px-8 lg:px-12">
          <span className="text-[10px] font-bold tracking-[.2em] text-brick uppercase">Grup markaları</span>
          <span className="text-[10px] font-semibold tracking-[.12em] text-space/45 uppercase">Altı uzmanlık · Tek vizyon</span>
        </div>
        <div className="logo-marquee overflow-hidden">
          <div className="logo-marquee-track">
            <div className="logo-marquee-group">
              {LOGO_ITEMS.map((logo, index) => {
                const href = logo.href;
                if (!href) {
                  return (
                    // eslint-disable-next-line @next/next/no-img-element
                    <span key={`a-${index}`} className="logo-marquee-item">
                      <img src={logo.src} alt={logo.alt} />
                    </span>
                  );
                }
                const external = href.startsWith("http");
                return (
                  // eslint-disable-next-line @next/next/no-img-element
                  <a
                    key={`a-${index}`}
                    href={href}
                    className="logo-marquee-item"
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    <img src={logo.src} alt={logo.alt} />
                  </a>
                );
              })}
            </div>
            <div className="logo-marquee-group" aria-hidden="true">
              {LOGO_ITEMS.map((logo, index) => {
                const href = logo.href;
                if (!href) {
                  return (
                    // eslint-disable-next-line @next/next/no-img-element
                    <span key={`b-${index}`} className="logo-marquee-item">
                      <img src={logo.src} alt="" />
                    </span>
                  );
                }
                const external = href.startsWith("http");
                return (
                  // eslint-disable-next-line @next/next/no-img-element
                  <a
                    key={`b-${index}`}
                    href={href}
                    className="logo-marquee-item"
                    tabIndex={-1}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    <img src={logo.src} alt="" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <main>
        <section id="kurumsal" data-nav-theme="light" className="section-pad bg-mist">
          <div className="shell">
            <div className="grid gap-14 lg:grid-cols-[.75fr_1.25fr] lg:gap-24">
              <div className="reveal">
                <span className="eyebrow text-brick">Kurumsal vizyon</span>
                <p className="mt-8 max-w-sm text-sm leading-6 text-space/55">Gözütok Grup · Üretim, yatırım ve sürdürülebilir büyüme ekosistemi</p>
              </div>
              <div>
                <h2 className="section-title reveal max-w-5xl">
                  Farklı sektörlerdeki markaları ortak bir vizyon ve güçlü bir yönetim anlayışıyla <span className="text-steel">geleceğe taşıyoruz.</span>
                </h2>
              </div>
            </div>

            <div className="mt-20 grid border-t lg:mt-32 lg:grid-cols-2">
              <div className="reveal py-10 lg:border-r lg:py-16 lg:pr-16">
                <h3 className="text-3xl font-semibold tracking-[-.04em] sm:text-5xl">Güçlü markalar. Ortak standartlar.</h3>
              </div>
              <div className="reveal border-t py-10 lg:border-t-0 lg:py-16 lg:pl-16">
                <p className="text-lg leading-8 text-space/70">Gözütok Grup; üretim, teknoloji, savunma, konaklama ve inşaat alanlarında faaliyet gösteren markalarını ortak kalite standartları ve uzun vadeli yatırım anlayışıyla yönetir.</p>
                <p className="mt-5 text-lg leading-8 text-space/70">Her marka kendi uzmanlık alanında değer üretirken, grup yapısı sürdürülebilir büyüme, operasyonel mükemmeliyet ve güçlü marka yönetimi yaklaşımıyla ilerler.</p>
              </div>
            </div>

            <div className="grid border-t sm:grid-cols-2 lg:grid-cols-4">
              <article className="reveal border-b p-6 sm:border-r lg:border-b-0 lg:p-8">
                <span className="text-xs font-bold text-brick">01</span>
                <h3 className="mt-12 text-xl font-semibold">Yönetim disiplini</h3>
                <p className="mt-3 text-sm leading-6 text-space/60">Markalar arası ortak standart ve ölçülebilir hedefler.</p>
              </article>
              <article className="reveal border-b p-6 lg:border-r lg:border-b-0 lg:p-8">
                <span className="text-xs font-bold text-brick">02</span>
                <h3 className="mt-12 text-xl font-semibold">Üretim kültürü</h3>
                <p className="mt-3 text-sm leading-6 text-space/60">Teknik bilgi, kalite kontrol ve uzun ömürlü ürün yaklaşımı.</p>
              </article>
              <article className="reveal border-b p-6 sm:border-r sm:border-b-0 lg:p-8">
                <span className="text-xs font-bold text-brick">03</span>
                <h3 className="mt-12 text-xl font-semibold">Yatırım odağı</h3>
                <p className="mt-3 text-sm leading-6 text-space/60">Sektör çeşitliliğiyle dengeli ve sürdürülebilir büyüme.</p>
              </article>
              <article className="reveal p-6 lg:p-8">
                <span className="text-xs font-bold text-brick">04</span>
                <h3 className="mt-12 text-xl font-semibold">Marka değeri</h3>
                <p className="mt-3 text-sm leading-6 text-space/60">Her iş kolunda ayrı kimlik, ortak Gözütok standardı.</p>
              </article>
            </div>

            <figure
              id="corporateSlider"
              className="reveal relative mt-14 aspect-[4/3] overflow-hidden rounded-[2rem] sm:aspect-video"
              aria-roledescription="carousel"
              aria-label="Gözütok Grup faaliyet alanları"
            >
              <div className="absolute inset-0">
                {SLIDER_IMAGES.map((slide, index) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={slide.src}
                    src={slide.src}
                    alt={slide.alt}
                    className={`corporate-slide${index === 0 ? " is-active" : ""} absolute inset-0 h-full w-full object-cover`}
                    loading={index === 0 ? undefined : "lazy"}
                  />
                ))}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-space/80 via-space/10 to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 flex flex-col justify-between gap-5 p-7 text-white sm:flex-row sm:items-end sm:p-10">
                <span className="max-w-2xl text-xl font-semibold leading-tight tracking-[-.035em] sm:text-3xl">Farklı uzmanlıkları kalıcı değere dönüştüren ortak bir yönetim kültürü.</span>
                <span className="shrink-0 text-xs font-bold tracking-[.16em] uppercase text-white/60">Gözütok Grup</span>
              </figcaption>
              <div
                id="sliderDots"
                className="absolute right-5 top-5 z-10 flex items-center gap-2 rounded-full bg-space/30 px-3 py-2 backdrop-blur-sm sm:right-8 sm:top-8"
                aria-label="Slider sayfaları"
              />
            </figure>
          </div>
        </section>

        <section data-nav-theme="dark" className="bg-space py-16 text-white sm:py-20">
          <div className="shell grid grid-cols-2 gap-y-12 lg:grid-cols-4">
            <div className="reveal border-l border-white/20 pl-5">
              <strong className="block text-5xl font-semibold tracking-[-.06em] sm:text-7xl">5</strong>
              <span className="mt-3 block text-sm text-white/55">Grup Markası · Uzmanlık Alanı</span>
            </div>
            <div className="reveal border-l border-white/20 pl-5">
              <strong className="block text-5xl font-semibold tracking-[-.06em] sm:text-7xl">60+</strong>
              <span className="mt-3 block text-sm text-white/55">Yıllık Tecrübe</span>
            </div>
            <div className="reveal border-l border-white/20 pl-5">
              <strong className="block text-5xl font-semibold tracking-[-.06em] sm:text-7xl">10+</strong>
              <span className="mt-3 block text-sm text-white/55">Ülkede Faaliyet</span>
              <span className="mt-1 block text-xs text-white/35">Asya · Avrupa · Afrika</span>
            </div>
            <div className="reveal border-l border-white/20 pl-5">
              <strong className="block text-5xl font-semibold tracking-[-.06em] sm:text-7xl">2M+</strong>
              <span className="mt-3 block text-sm text-white/55">Ulaşılan Kullanıcı</span>
            </div>
          </div>
        </section>

        <section id="markalar" data-nav-theme="cream" className="section-pad bg-cream">
          <div className="shell">
            <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
              <div>
                <span className="eyebrow reveal text-brick">Grup markaları</span>
                <h2 className="section-title reveal mt-6 max-w-3xl">Ayrı uzmanlıklar.<br /><span className="text-steel">Ortak bir standart.</span></h2>
              </div>
              <p className="reveal max-w-md text-base leading-7 text-space/65">Beş marka, kendi pazarında odaklı çalışırken Gözütok Grup&apos;un kalite, güven ve sürdürülebilir büyüme yaklaşımını paylaşır.</p>
            </div>

            <div className="mt-16 grid gap-5 lg:mt-24 lg:grid-cols-12">
              <article className="brand-card reveal group relative min-h-[520px] overflow-hidden rounded-[2rem] bg-white p-7 shadow-[0_24px_80px_-50px_rgba(0,48,73,.45)] sm:p-10 lg:col-span-7" style={{ "--glow": "rgba(102,155,188,.6)" } as React.CSSProperties}>
                <a href={BRAND_LINKS.flux} target="_blank" rel="noopener noreferrer" aria-label="Gözütok Flux web sitesi" className="absolute inset-0 z-20" />
                <div className="relative z-10 flex h-full flex-col">
                  <div className="flex items-start justify-between">
                    <span className="text-xs font-bold tracking-[.18em] text-brick">01 / 05</span>
                    <span className="rounded-full border px-3 py-1 text-[10px] font-bold tracking-widest uppercase">Geri dönüşüm</span>
                  </div>
                  <div className="relative my-8 h-64 overflow-hidden rounded-[1.5rem]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/marka/flux.webp" alt="Gözütok Flux akıllı depozito iade sistemi" className="sector-photo h-full w-full object-cover" loading="lazy" />
                    <div className="absolute bottom-5 left-5 rounded-full border border-white/30 bg-space/80 px-4 py-2 text-sm font-bold tracking-[-.02em] text-white shadow-xl backdrop-blur-md">
                      Gözütok <span className="text-steel">Flux</span>
                    </div>
                  </div>
                  <div className="max-w-xl">
                    <h3 className="text-2xl font-semibold tracking-[-.035em]">Akıllı geri dönüşüm teknolojileri</h3>
                    <p className="mt-4 leading-7 text-space/65">Depozito iade ve akıllı toplama sistemleriyle döngüsel ekonomiye katkı sağlayan yenilikçi geri dönüşüm teknolojileri geliştirir.</p>
                    <div className="mt-6 flex flex-wrap gap-2 text-xs font-semibold">
                      <span className="rounded-full bg-space/5 px-3 py-2">RVM sistemleri</span><span className="rounded-full bg-space/5 px-3 py-2">Atık toplama</span><span className="rounded-full bg-space/5 px-3 py-2">Veri takibi</span>
                    </div>
                  </div>
                </div>
              </article>

              <article className="brand-card reveal group relative min-h-[520px] overflow-hidden rounded-[2rem] bg-space p-7 text-white sm:p-10 lg:col-span-5" style={{ "--glow": "rgba(102,155,188,.65)" } as React.CSSProperties}>
                <a href={BRAND_LINKS.gmt} target="_blank" rel="noopener noreferrer" aria-label="Gözütok Metal Teknolojileri web sitesi" className="absolute inset-0 z-20" />
                <div className="relative z-10 flex h-full flex-col">
                  <div className="flex items-start justify-between">
                    <span className="text-xs font-bold tracking-[.18em] text-steel">02 / 05</span>
                    <span className="rounded-full border border-white/20 px-3 py-1 text-[10px] font-bold tracking-widest uppercase">Metal</span>
                  </div>
                  <div className="relative my-8 h-64 overflow-hidden rounded-[1.5rem]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/marka/gmt.webp" alt="GMT metal işleme ve endüstriyel üretim" className="sector-photo h-full w-full object-cover" loading="lazy" />
                    <div className="absolute bottom-5 left-5 rounded-full border border-white/30 bg-white/90 px-4 py-2 text-sm font-extrabold tracking-[.08em] text-space shadow-xl backdrop-blur-md">
                      GMT
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold tracking-[-.035em]">Metal teknolojileri ve yapı sistemleri</h3>
                    <p className="mt-4 leading-7 text-white/60">Solar kolektör, çöp şutu, tünel kalıp ve paslanmaz baca sistemleri alanlarında mühendislik odaklı çözümler geliştirir. Üretim gücü ve teknik uzmanlığıyla yapı sektörüne değer katar.</p>
                    <div className="mt-6 flex flex-wrap gap-2 text-xs font-semibold text-white/75">
                      <span className="rounded-full bg-white/10 px-3 py-2">Çöp şutu</span><span className="rounded-full bg-white/10 px-3 py-2">Solar termal</span><span className="rounded-full bg-white/10 px-3 py-2">Baca sistemleri</span><span className="rounded-full bg-white/10 px-3 py-2">Tünel Kalıp Sistemleri</span>
                    </div>
                  </div>
                </div>
              </article>

              <article className="brand-card reveal group relative min-h-[480px] overflow-hidden rounded-[2rem] bg-[#dbe7ec] p-7 sm:p-10 lg:col-span-4" style={{ "--glow": "rgba(0,48,73,.4)" } as React.CSSProperties}>
                <div className="relative z-10 flex h-full flex-col">
                  <div className="flex items-start justify-between"><span className="text-xs font-bold tracking-[.18em] text-brick">03 / 05</span><span className="text-[10px] font-bold tracking-widest uppercase">Savunma</span></div>
                  <div className="relative my-8 h-56 overflow-hidden rounded-[1.5rem]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/marka/defence.webp" alt="Gözütok Defence hassas savunma sanayi üretimi" className="sector-photo h-full w-full object-cover" loading="lazy" />
                    <div className="absolute bottom-4 left-4 rounded-full border border-white/30 bg-space/85 px-4 py-2 text-xs font-bold tracking-[.08em] text-white shadow-lg backdrop-blur-md">GÖZÜTOK DEFENCE</div>
                  </div>
                  <h3 className="text-2xl font-semibold tracking-[-.035em]">Savunma sanayi için hassas üretim</h3>
                  <p className="mt-4 leading-7 text-space/65">Savunma sanayine yönelik yüksek hassasiyetli mermi çekirdeği ve bileşen üretimi gerçekleştirir. Kalite, süreklilik ve üretim güvenliği odaklı çalışır.</p>
                </div>
              </article>

              <article className="brand-card reveal group relative min-h-[480px] overflow-hidden rounded-[2rem] bg-brick p-7 text-white sm:p-10 lg:col-span-4" style={{ "--glow": "rgba(253,240,213,.4)" } as React.CSSProperties}>
                <a href={BRAND_LINKS.build} target="_blank" rel="noopener noreferrer" aria-label="Gözütok Build web sitesi" className="absolute inset-0 z-20" />
                <div className="relative z-10 flex h-full flex-col">
                  <div className="flex items-start justify-between"><span className="text-xs font-bold tracking-[.18em] text-cream">04 / 05</span><span className="text-[10px] font-bold tracking-widest uppercase">İnşaat</span></div>
                  <div className="relative my-8 h-56 overflow-hidden rounded-[1.5rem]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/marka/build.webp" alt="Gözütok Build inşaat ve proje geliştirme çalışması" className="sector-photo h-full w-full object-cover" loading="lazy" />
                    <div className="absolute bottom-4 left-4 rounded-full border border-white/35 bg-cream/90 px-4 py-2 text-xs font-bold tracking-[.08em] text-lava shadow-lg backdrop-blur-md">GÖZÜTOK BUILD</div>
                  </div>
                  <h3 className="text-2xl font-semibold tracking-[-.035em]">İnşaat ve proje geliştirme</h3>
                  <p className="mt-4 leading-7 text-white/70">Konut ve ticari projelerde planlama, uygulama ve teslim süreçlerini bütüncül bir yaklaşımla yöneten inşaat ve proje geliştirme markası.</p>
                </div>
              </article>

              <article className="brand-card reveal group relative min-h-[480px] overflow-hidden rounded-[2rem] bg-[#efe5cd] p-7 sm:p-10 lg:col-span-4" style={{ "--glow": "rgba(193,18,31,.28)" } as React.CSSProperties}>
                <a href={BRAND_LINKS.chluxe} target="_blank" rel="noopener noreferrer" aria-label="Chluxe Royal web sitesi" className="absolute inset-0 z-20" />
                <div className="relative z-10 flex h-full flex-col">
                  <div className="flex items-start justify-between"><span className="text-xs font-bold tracking-[.18em] text-brick">05 / 05</span><span className="text-[10px] font-bold tracking-widest uppercase">Konaklama</span></div>
                  <div className="relative my-8 h-56 overflow-hidden rounded-[1.5rem]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/marka/chluxe.webp" alt="Chluxe Royal modern lüks villa" className="sector-photo h-full w-full object-cover" loading="lazy" />
                    <div className="absolute bottom-4 left-4 rounded-full border border-white/35 bg-white/85 px-4 py-2 text-xs font-bold tracking-[.08em] text-space shadow-lg backdrop-blur-md">CHLUXE ROYAL</div>
                  </div>
                  <h3 className="text-2xl font-semibold tracking-[-.035em]">Lüks villa ve konaklama deneyimi</h3>
                  <p className="mt-4 leading-7 text-space/65">Seçkin destinasyonlarda konfor, mahremiyet ve ayrıcalıklı hizmet anlayışını bir araya getiren lüks villa kiralama markası.</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section id="ekosistem" data-nav-theme="dark" className="section-pad bg-space text-white">
          <div className="shell">
            <div className="grid gap-10 lg:grid-cols-2">
              <div>
                <span className="eyebrow reveal text-steel">Grup ekosistemi</span>
                <h2 className="section-title reveal mt-6">Farklı uzmanlıklar,<br /><span className="text-steel">ortak vizyon.</span></h2>
              </div>
              <p className="reveal max-w-xl self-end text-lg leading-8 text-white/60">Gözütok Grup, farklı sektörlerde faaliyet gösteren markalarını ortak kalite standartları, stratejik yönetim anlayışı ve sürdürülebilir büyüme hedefi altında bir araya getirir.</p>
            </div>

            <div className="mt-20 border-t border-white/15">
              <article className="reveal group grid gap-5 border-b border-white/15 py-8 transition hover:bg-white/[.03] sm:grid-cols-[80px_1fr_1fr] sm:items-center sm:px-5">
                <span className="text-sm text-steel">01</span><h3 className="text-2xl font-semibold tracking-[-.03em]">Marka yönetimi</h3><p className="text-sm leading-6 text-white/50">Her marka kendi alanında uzmanlaşırken, grup seviyesinde ortak hedefler ve büyüme stratejileri doğrultusunda yönetilir.</p>
              </article>
              <article className="reveal group grid gap-5 border-b border-white/15 py-8 transition hover:bg-white/[.03] sm:grid-cols-[80px_1fr_1fr] sm:items-center sm:px-5">
                <span className="text-sm text-steel">02</span><h3 className="text-2xl font-semibold tracking-[-.03em]">Ortak standart</h3><p className="text-sm leading-6 text-white/50">Üretimden hizmete kadar tüm süreçlerde kalite, güven ve sürdürülebilirlik esas alınır.</p>
              </article>
              <article className="reveal group grid gap-5 border-b border-white/15 py-8 transition hover:bg-white/[.03] sm:grid-cols-[80px_1fr_1fr] sm:items-center sm:px-5">
                <span className="text-sm text-steel">03</span><h3 className="text-2xl font-semibold tracking-[-.03em]">Kurumsal güven</h3><p className="text-sm leading-6 text-white/50">Farklı sektörlerde faaliyet gösteren markalar, Gözütok&apos;un kurumsal birikimi ve itibarıyla güç kazanır.</p>
              </article>
              <article className="reveal group grid gap-5 border-b border-white/15 py-8 transition hover:bg-white/[.03] sm:grid-cols-[80px_1fr_1fr] sm:items-center sm:px-5">
                <span className="text-sm text-steel">04</span><h3 className="text-2xl font-semibold tracking-[-.03em]">Sürdürülebilir büyüme</h3><p className="text-sm leading-6 text-white/50">Yeni yatırım fırsatları uzun vadeli değer üretme ve istikrarlı büyüme yaklaşımıyla değerlendirilir.</p>
              </article>
            </div>
          </div>
        </section>

        <section id="surdurulebilirlik" data-nav-theme="steel" className="relative overflow-hidden bg-steel text-space">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/sustainability/Sustainability.webp" alt="" className="absolute inset-0 h-full w-full object-cover object-center opacity-60" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-r from-steel via-steel/85 to-steel/20" />
          <div className="absolute -right-40 top-1/2 size-[34rem] -translate-y-1/2 rounded-full border border-space/15 sm:size-[48rem]" />
          <div className="shell relative z-10 flex min-h-[760px] items-center py-24">
            <div className="max-w-4xl">
              <span className="eyebrow reveal text-lava">Sürdürülebilirlik</span>
              <h2 className="section-title reveal mt-7">Çevreci ve <span className="text-cream">sürdürülebilir çözümler.</span></h2>
              <p className="reveal mt-8 max-w-2xl text-lg leading-8 text-space/70">Gözütok Grup, farklı uzmanlık alanlarını uzun vadeli değer üretme hedefi etrafında bir araya getirir. Enerji, geri dönüşüm, üretim ve yapı teknolojilerinde sürdürülebilir gelecek için çözümler geliştirir.</p>
              <div className="reveal mt-10 flex flex-wrap gap-3">
                <span className="rounded-full border border-space/20 bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur">Döngüsel ekonomi</span>
                <span className="rounded-full border border-space/20 bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur">Solar termal enerji</span>
                <span className="rounded-full border border-space/20 bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur">Verimli üretim</span>
                <span className="rounded-full border border-space/20 bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur">Uzun ömürlü yapı</span>
              </div>
            </div>
          </div>
        </section>

        <section id="kariyer" data-nav-theme="red" className="bg-lava py-20 text-white sm:py-28">
          <div className="shell flex flex-col justify-between gap-10 lg:flex-row lg:items-center">
            <h2 className="section-title reveal max-w-4xl">Değer üreten ekiplerin <span className="text-steel">parçası olun.</span></h2>
            <a href="#iletisim" className="reveal inline-flex min-h-14 shrink-0 items-center justify-center rounded-full bg-cream px-7 text-sm font-semibold text-space transition hover:-translate-y-0.5">Başvuru gönder</a>
          </div>
        </section>

        <section id="iletisim" data-nav-theme="light" className="section-pad bg-mist">
          <div className="shell grid gap-16 lg:grid-cols-[.75fr_1.25fr] lg:gap-24">
            <div>
              <span className="eyebrow reveal text-brick">İletişim</span>
              <h2 className="section-title reveal mt-7">Bizimle iletişime geçin.</h2>
              <div className="reveal mt-12 border-t text-sm">
                <div className="grid grid-cols-[90px_1fr] border-b py-4"><strong>Adres</strong><span className="text-space/60">Beştepe Mah. 40. Sk. Çakıroğlu Plaza A Blok Kat: 4 Daire: 101, Yenimahalle / Ankara</span></div>
                <div className="grid grid-cols-[90px_1fr] border-b py-4"><strong>Telefon</strong><a href="tel:+905343696471" className="text-space/60 hover:text-brick">+90 534 369 64 71</a></div>
                <div className="grid grid-cols-[90px_1fr] border-b py-4"><strong>E-posta</strong><a href="mailto:info@gozutokmetal.com.tr" className="text-space/60 hover:text-brick">info@gozutokmetal.com.tr</a></div>
              </div>
            </div>

            <form id="contactForm" className="reveal grid gap-5 sm:grid-cols-2" action="/api/contact" method="post" onSubmit={handleContactSubmit}>
              <label className="grid gap-2 text-xs font-bold tracking-widest uppercase">Ad
                <input type="text" name="ad" autoComplete="given-name" placeholder="Adınız" required maxLength={80} className="h-14 rounded-xl border bg-white px-4 text-base font-normal tracking-normal normal-case transition focus:border-brick" />
              </label>
              <label className="grid gap-2 text-xs font-bold tracking-widest uppercase">Soyad
                <input type="text" name="soyad" autoComplete="family-name" placeholder="Soyadınız" required maxLength={80} className="h-14 rounded-xl border bg-white px-4 text-base font-normal tracking-normal normal-case transition focus:border-brick" />
              </label>
              <label className="grid gap-2 text-xs font-bold tracking-widest uppercase sm:col-span-2">Şirket
                <input type="text" name="sirket" autoComplete="organization" placeholder="Şirket adı" maxLength={120} className="h-14 rounded-xl border bg-white px-4 text-base font-normal tracking-normal normal-case transition focus:border-brick" />
              </label>
              <label className="grid gap-2 text-xs font-bold tracking-widest uppercase sm:col-span-2">E-posta
                <input type="email" name="eposta" autoComplete="email" placeholder="ornek@firma.com" required maxLength={190} className="h-14 rounded-xl border bg-white px-4 text-base font-normal tracking-normal normal-case transition focus:border-brick" />
              </label>
              <label className="grid gap-2 text-xs font-bold tracking-widest uppercase sm:col-span-2">Konu
                <select name="konu" className="h-14 rounded-xl border bg-white px-4 text-base font-normal tracking-normal normal-case transition focus:border-brick">
                  <option>Grup / Genel iletişim</option><option>Gözütok Flux</option><option>GMT</option><option>Chluxe Royal</option><option>Gözütok Defence</option><option>Gözütok Build</option><option>Kariyer</option><option>Basın / Medya</option>
                </select>
              </label>
              <label className="grid gap-2 text-xs font-bold tracking-widest uppercase sm:col-span-2">Mesajınız
                <textarea name="mesaj" rows={5} placeholder="Mesajınızı yazın..." required minLength={10} maxLength={5000} className="rounded-xl border bg-white p-4 text-base font-normal tracking-normal normal-case transition focus:border-brick" />
              </label>
              <div className="hidden" aria-hidden="true">
                <label>Web sitesi <input type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
              </div>
              <div className="sm:col-span-2">
                <button id="contactSubmit" type="submit" className="button-primary min-w-36">Gönder <span>→</span></button>
                <p id="contactStatus" className="mt-4 hidden text-sm font-medium" role="status" aria-live="polite" />
                <p className="mt-4 text-[11px] leading-relaxed text-space/50">
                  Bu site reCAPTCHA ile korunmaktadır ve Google{" "}
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-brick">Gizlilik Politikası</a>{" "}
                  ve{" "}
                  <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="underline hover:text-brick">Kullanım Şartları</a>{" "}
                  geçerlidir.
                </p>
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer id="site-footer" data-nav-theme="dark" className="border-t-4 border-brick bg-space text-white">
        <div className="shell">
          <div className="grid gap-12 py-14 sm:py-16 lg:grid-cols-[1.15fr_.75fr_1fr] lg:gap-16">
            <div className="max-w-md">
              <a href="#top" className="inline-block text-3xl font-semibold text-cream sm:text-4xl">GÖZÜTOK</a>
              <p className="mt-5 text-sm leading-7 text-white/55">Beş farklı uzmanlık alanını ortak yönetim anlayışı, sürdürülebilir büyüme ve kalıcı değer hedefiyle bir araya getiriyoruz.</p>
            </div>

            <div>
              <h2 className="text-[11px] font-bold tracking-[.18em] text-steel uppercase">Bağlantılar</h2>
              <nav aria-label="Footer menüsü" className="mt-5 grid gap-3 text-sm text-white/65">
                <a href="#kurumsal" className="w-fit transition hover:text-white">Kurumsal</a>
                <a href="#markalar" className="w-fit transition hover:text-white">Markalar</a>
                <a href="#ekosistem" className="w-fit transition hover:text-white">Ekosistem</a>
                <a href="#surdurulebilirlik" className="w-fit transition hover:text-white">Sürdürülebilirlik</a>
                <a href="#kariyer" className="w-fit transition hover:text-white">Kariyer</a>
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
              <a href="#iletisim" className="group mt-6 inline-flex min-h-11 items-center gap-3 border-b border-brick pb-1 text-sm font-semibold text-white transition hover:text-cream">
                İletişime geç <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
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
    </>
  );
}

const BRAND_LINKS = {
  flux: "https://www.gozutokflux.com/",
  gmt: "https://www.gozutokmetal.com.tr/",
  teknik: "https://teknovateknik.com/",
  build: "https://www.gozutokbuild.com/",
  chluxe: "https://www.chluxe.tr/",
} as const;

const LOGO_SET: { src: string; alt: string; href: string | null }[] = [
  { src: "/q-01.svg", alt: "Gözütok Flux", href: BRAND_LINKS.flux },
  { src: "/q-05.svg", alt: "Gözütok Metal Teknolojileri", href: BRAND_LINKS.gmt },
  { src: "/q-04.svg", alt: "Chluxe Royal", href: BRAND_LINKS.chluxe },
  { src: "/q-02.svg", alt: "Gözütok Defence", href: "#markalar" },
  { src: "/q-03.svg", alt: "Gözütok Build", href: BRAND_LINKS.build },
  { src: "/q-07.svg", alt: "Gözütok Teknik Mühendislik", href: BRAND_LINKS.teknik },
  { src: "/iron1.svg", alt: "Gözütok Grup", href: "#markalar" },
];

const LOGO_ITEMS = [...LOGO_SET, ...LOGO_SET, ...LOGO_SET];

const SLIDER_IMAGES = [
  { src: "/slider/Slider-1.webp", alt: "Robotik otomasyonla gerçekleştirilen endüstriyel üretim" },
  { src: "/slider/Slider-2.webp", alt: "Paslanmaz metal sistemleri üretimi" },
  { src: "/slider/Slider-3.webp", alt: "Modern çöp şutu sistemi" },
  { src: "/slider/Slider-4.webp", alt: "Gözütok Flux akıllı depozito iade sistemi" },
  { src: "/slider/Slider-5.webp", alt: "Yeşil alanda solar termal enerji panelleri" },
  { src: "/slider/Slider-6.webp", alt: "Savunma sanayine yönelik hassas metal bileşenler" },
  { src: "/slider/Slider-7.webp", alt: "İnşaat ve proje geliştirme çalışmaları" },
  { src: "/slider/Slider-8.webp", alt: "Lüks villa ve konaklama alanı" },
  { src: "/slider/Slider-9.webp", alt: "Yapı projesinde tünel kalıp sistemleri" },
];
