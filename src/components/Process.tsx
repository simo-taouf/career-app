import { useTranslations } from "next-intl";

export function Process() {
  const t = useTranslations("process");
  const steps = [
    { n: "01", title: t("step1Title"), desc: t("step1Desc") },
    { n: "02", title: t("step2Title"), desc: t("step2Desc") },
    { n: "03", title: t("step3Title"), desc: t("step3Desc") },
    { n: "04", title: t("step4Title"), desc: t("step4Desc") },
  ];

  return (
    <section className="bg-slate-50/60 py-20 md:py-28">
      <div className="container-narrow">
        <header className="max-w-3xl">
          <span className="eyebrow">{t("eyebrow")}</span>
          <h2 className="section-title">{t("title")}</h2>
        </header>

        <ol className="mt-12 grid gap-5 md:grid-cols-4">
          {steps.map((s) => (
            <li
              key={s.n}
              className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-card"
            >
              <span className="text-3xl font-bold text-brand-200">{s.n}</span>
              <h3 className="mt-3 text-lg font-semibold text-brand-950">
                {s.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600">{s.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
