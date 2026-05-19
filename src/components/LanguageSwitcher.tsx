"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { useTransition } from "react";
import { Globe } from "lucide-react";

const LOCALES = ["fr", "ar", "en"] as const;

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("language");
  const [isPending, startTransition] = useTransition();

  const labels: Record<(typeof LOCALES)[number], string> = {
    fr: t("french"),
    ar: t("arabic"),
    en: t("english"),
  };

  function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const next = e.target.value as (typeof LOCALES)[number];
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  }

  return (
    <label className="relative flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-brand-900 hover:border-brand-300">
      <Globe size={16} className="text-brand-600" aria-hidden />
      <span className="sr-only">Language</span>
      <select
        aria-label="Language"
        value={locale}
        onChange={onChange}
        disabled={isPending}
        className="appearance-none bg-transparent pe-2 outline-none cursor-pointer"
      >
        {LOCALES.map((l) => (
          <option key={l} value={l}>
            {labels[l]}
          </option>
        ))}
      </select>
    </label>
  );
}
