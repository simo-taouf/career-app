import { useTranslations } from "next-intl";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

export function Hero() {
  const t = useTranslations("hero");
  const initials = (t("testimonialName") as string)
    .split(" ")
    .map((w: string) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <section className="relative overflow-hidden bg-hero-gradient">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-32 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-brand-200/40 blur-3xl" />
      </div>
      <div className="container-narrow grid gap-10 py-20 md:grid-cols-2 md:items-center md:py-28">
        <div className="reveal">
          <span className="eyebrow">
            <Sparkles size={14} aria-hidden />
            {t("badge")}
          </span>
          <h1 className="mt-5 text-4xl font-bold leading-[1.1] tracking-tight text-brand-950 sm:text-5xl md:text-6xl">
            {t("title")}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
            {t("subtitle")}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#packages" className="btn-primary">
              {t("ctaPrimary")}
              <ArrowRight size={16} className="rtl:rotate-180" aria-hidden />
            </a>
            <a href="#packages" className="btn-secondary">
              {t("ctaSecondary")}
            </a>
          </div>

          <dl className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
            <Stat number="500+" label={t("stats.clients")} />
            <Stat number="12" label={t("stats.countries")} />
            <Stat number="73%" label={t("stats.rate")} />
            <Stat number="8+" label={t("stats.years")} />
          </dl>
        </div>

        <div className="relative reveal">
          <div className="relative mx-auto max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-soft md:max-w-none">
            <div className="absolute -inset-2 -z-10 rounded-[2rem] bg-cta-gradient opacity-20 blur-2xl" />
            <div className="rounded-2xl bg-gradient-to-br from-brand-50 to-white p-5">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-brand-700 text-white font-bold text-sm">
                  {initials}
                </div>
                <div>
                  <p className="font-semibold text-brand-950">{t("testimonialName")}</p>
                  <p className="text-sm text-slate-500">{t("testimonialRole")}</p>
                </div>
              </div>
              <ul className="mt-5 space-y-2.5 text-sm text-slate-700">
                {(t.raw("testimonialItems") as string[]).map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2
                      size={16}
                      className="mt-0.5 shrink-0 text-brand-600"
                      aria-hidden
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3 text-center text-xs font-semibold text-brand-800">
              {(t.raw("testimonialDestinations") as string[]).map((c) => (
                <div
                  key={c}
                  className="rounded-xl bg-white border border-slate-200 px-3 py-2"
                >
                  {c}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div>
      <dt className="text-2xl font-bold text-brand-900 sm:text-3xl">{number}</dt>
      <dd className="mt-1 text-xs font-medium uppercase tracking-wider text-slate-500">
        {label}
      </dd>
    </div>
  );
}
