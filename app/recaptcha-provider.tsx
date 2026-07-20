"use client";

import { useEffect } from "react";

export function RecaptchaProvider() {
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/recaptcha");
        const data = (await res.json()) as { siteKey?: string };
        const siteKey = data?.siteKey;
        if (!siteKey || cancelled) return;
        window.__RECAPTCHA_SITE_KEY = siteKey;
        if (document.getElementById("recaptcha-v3-script")) return;
        const script = document.createElement("script");
        script.id = "recaptcha-v3-script";
        script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
        script.async = true;
        document.head.appendChild(script);
      } catch {
        /* reCAPTCHA yüklenemezse form yine çalışır */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
