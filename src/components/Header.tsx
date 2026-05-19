"use client";

import { useTranslations } from "next-intl";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export function Header({ locale }: { locale: string }) {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#services", label: t("services") },
    { href: "#packages", label: t("packages") },
    { href: "#about", label: t("about") },
    { href: "#booking", label: t("booking") },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all ${
        scrolled
          ? "border-b border-slate-200/70 bg-white/80 backdrop-blur"
          : "bg-transparent"
      }`}
    >
      <div className="container-narrow flex h-16 items-center justify-between gap-4">
        <Logo locale={locale} />

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="btn-ghost">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <a href="#booking" className="hidden md:inline-flex btn-primary">
            {t("bookNow")}
          </a>
          <button
            type="button"
            className="md:hidden grid h-10 w-10 place-items-center rounded-full border border-slate-200"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <div className="container-narrow flex flex-col gap-1 py-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-brand-900 hover:bg-brand-50"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#booking"
              onClick={() => setOpen(false)}
              className="btn-primary mt-2 w-full"
            >
              {t("bookNow")}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
