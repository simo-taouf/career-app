"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

export function FAQ() {
  const t = useTranslations("faq");
  const items = [1, 2, 3, 4, 5].map((i) => ({
    q: t(`q${i}` as "q1"),
    a: t(`a${i}` as "a1"),
  }));
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="bg-slate-50/60 py-20 md:py-28">
      <div className="container-narrow max-w-3xl">
        <header>
          <span className="eyebrow">{t("eyebrow")}</span>
          <h2 className="section-title">{t("title")}</h2>
        </header>

        <div className="mt-10 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
          {items.map((item, i) => {
            const open = openIdx === i;
            return (
              <div key={i}>
                <button
                  type="button"
                  onClick={() => setOpenIdx(open ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-start"
                  aria-expanded={open}
                >
                  <span className="font-semibold text-brand-950">{item.q}</span>
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-700">
                    {open ? <Minus size={14} /> : <Plus size={14} />}
                  </span>
                </button>
                {open && (
                  <div className="px-5 pb-5 text-sm leading-relaxed text-slate-600">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
