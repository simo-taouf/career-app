"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Check, Star } from "lucide-react";
import { tracks, tiers, popularByTrack, type Track } from "@/lib/packages";

export function Packages() {
  const t = useTranslations("packages");
  const [active, setActive] = useState<Track>("career");

  return (
    <section id="packages" className="bg-slate-50/60 py-20 md:py-28">
      <div className="container-narrow">
        <header className="max-w-3xl">
          <span className="eyebrow">{t("eyebrow")}</span>
          <h2 className="section-title">{t("title")}</h2>
          <p className="section-subtitle">{t("subtitle")}</p>
        </header>

        <div className="mt-10 inline-flex rounded-full border border-slate-200 bg-white p-1 shadow-card">
          {tracks.map((trk) => (
            <button
              key={trk}
              type="button"
              onClick={() => setActive(trk)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                active === trk
                  ? "bg-brand-700 text-white shadow"
                  : "text-brand-800 hover:bg-brand-50"
              }`}
            >
              {t(`tabs.${trk}`)}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {tiers[active].map((tier) => {
            const isPopular = popularByTrack[active] === tier;
            const features = (t.raw(`${active}.${tier}.features`) as string[]) ?? [];
            return (
              <article
                key={tier}
                className={`relative flex flex-col rounded-2xl border p-7 transition ${
                  isPopular
                    ? "border-brand-700 bg-white shadow-soft md:scale-[1.02]"
                    : "border-slate-200 bg-white shadow-card hover:-translate-y-0.5 hover:shadow-soft"
                }`}
              >
                {isPopular && (
                  <span className="absolute -top-3 start-7 inline-flex items-center gap-1 rounded-full bg-accent-500 px-3 py-1 text-xs font-semibold text-white shadow">
                    <Star size={12} aria-hidden />
                    {t("popular")}
                  </span>
                )}

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand-600">
                    {t(`tabs.${active}`)}
                  </p>
                  <h3 className="mt-2 text-2xl font-bold text-brand-950">
                    {t(`${active}.${tier}.name`)}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    {t(`${active}.${tier}.tagline`)}
                  </p>
                </div>

                <div className="mt-5 flex items-baseline gap-2">
                  <span className="text-xs font-medium text-slate-500">
                    {t("from")}
                  </span>
                  <span className="text-4xl font-bold text-brand-950">
                    {t(`${active}.${tier}.price`)}
                  </span>
                </div>

                <ul className="mt-6 flex-1 space-y-3">
                  {features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-700">
                        <Check size={12} strokeWidth={3} aria-hidden />
                      </span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={`#booking?service=${active}&package=${tier}`}
                  className={`mt-7 ${
                    isPopular ? "btn-primary" : "btn-secondary"
                  } w-full justify-center`}
                >
                  {t("select")}
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
