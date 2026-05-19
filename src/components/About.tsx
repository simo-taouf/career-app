import { useTranslations } from "next-intl";
import { UserCheck, Languages, Trophy } from "lucide-react";

export function About() {
  const t = useTranslations("about");
  return (
    <section id="about" className="py-20 md:py-28">
      <div className="container-narrow grid gap-12 md:grid-cols-2 md:items-center">
        <div>
          <span className="eyebrow">{t("eyebrow")}</span>
          <h2 className="section-title">{t("title")}</h2>
          <p className="mt-5 leading-relaxed text-slate-600">{t("p1")}</p>
          <p className="mt-4 leading-relaxed text-slate-600">{t("p2")}</p>
        </div>

        <div className="grid gap-4">
          <Feature
            icon={UserCheck}
            title={t("feature1Title")}
            desc={t("feature1Desc")}
          />
          <Feature
            icon={Languages}
            title={t("feature2Title")}
            desc={t("feature2Desc")}
          />
          <Feature
            icon={Trophy}
            title={t("feature3Title")}
            desc={t("feature3Desc")}
          />
        </div>
      </div>
    </section>
  );
}

function Feature({
  icon: Icon,
  title,
  desc,
}: {
  icon: React.ComponentType<{ size?: number; "aria-hidden"?: boolean }>;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700">
        <Icon size={20} aria-hidden />
      </div>
      <div>
        <h3 className="font-semibold text-brand-950">{title}</h3>
        <p className="mt-1 text-sm text-slate-600">{desc}</p>
      </div>
    </div>
  );
}
