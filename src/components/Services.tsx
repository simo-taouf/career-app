import { useTranslations } from "next-intl";
import { Briefcase, Linkedin, ArrowRight } from "lucide-react";

export function Services() {
  const t = useTranslations("services");

  const items = [
    {
      key: "linkedin",
      icon: Linkedin,
      title: t("linkedin.title"),
      description: t("linkedin.description"),
    },
    {
      key: "career",
      icon: Briefcase,
      title: t("career.title"),
      description: t("career.description"),
    },
  ];

  return (
    <section id="services" className="py-20 md:py-28">
      <div className="container-narrow">
        <header className="max-w-3xl">
          <span className="eyebrow">{t("eyebrow")}</span>
          <h2 className="section-title">{t("title")}</h2>
          <p className="section-subtitle">{t("subtitle")}</p>
        </header>

        <div className="mt-12 grid gap-5 md:grid-cols-2 max-w-2xl">
          {items.map(({ key, icon: Icon, title, description }) => (
            <div key={key} className="card group">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-700 transition group-hover:bg-brand-700 group-hover:text-white">
                <Icon size={22} aria-hidden />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-brand-950">{title}</h3>
              <p className="mt-2 text-slate-600 leading-relaxed">{description}</p>
              <a
                href="#packages"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-800"
              >
                {t("cta")}
                <ArrowRight size={14} className="rtl:rotate-180" aria-hidden />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
