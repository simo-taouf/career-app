import { useTranslations } from "next-intl";
import { Mail, Phone, MapPin } from "lucide-react";
import { Logo } from "./Logo";

export function Footer({ locale }: { locale: string }) {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="container-narrow grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo locale={locale} />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-600">
            {t("tagline")}
          </p>
          <ul className="mt-5 space-y-2 text-sm text-slate-600">
            <li className="flex items-center gap-2">
              <Mail size={14} className="text-brand-600" aria-hidden />
              <a href="mailto:contact@careerbridge.app" className="hover:text-brand-700">
                contact@careerbridge.app
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={14} className="text-brand-600" aria-hidden />
              <a href="https://wa.me/4915679384731" target="_blank" rel="noopener noreferrer" className="hover:text-brand-700">
                +49 156 7938 4731 🇩🇪
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={14} className="text-brand-600" aria-hidden />
              <a href="https://wa.me/212688534139" target="_blank" rel="noopener noreferrer" className="hover:text-brand-700">
                +212 688 534 139 🇲🇦
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={14} className="text-brand-600" aria-hidden />
              <span>Germany · Morocco</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-brand-900">
            {t("services")}
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            <li><a href="#packages" className="hover:text-brand-700">LinkedIn & Personal Brand</a></li>
            <li><a href="#packages" className="hover:text-brand-700">Career Boost</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-brand-900">
            {t("legal")}
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            <li><a href="#" className="hover:text-brand-700">{t("terms")}</a></li>
            <li><a href="#" className="hover:text-brand-700">{t("privacy")}</a></li>
            <li><a href="#" className="hover:text-brand-700">{t("imprint")}</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-200">
        <div className="container-narrow flex flex-col items-center justify-between gap-2 py-5 text-xs text-slate-500 md:flex-row">
          <p>© {year} CareerBridge. {t("rights")}</p>
          <p>Made with care · Made for MENA talent</p>
        </div>
      </div>
    </footer>
  );
}
