declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, opts: { action: string }) => Promise<string>;
    };
    __RECAPTCHA_SITE_KEY?: string;
  }
}

export async function getRecaptchaToken(action: string): Promise<string> {
  if (typeof window === "undefined") return "";
  const siteKey = window.__RECAPTCHA_SITE_KEY;
  const grecaptcha = window.grecaptcha;
  if (!siteKey || !grecaptcha?.execute) return "";
  try {
    await new Promise<void>((resolve) => grecaptcha.ready(() => resolve()));
    return await grecaptcha.execute(siteKey, { action });
  } catch {
    return "";
  }
}
