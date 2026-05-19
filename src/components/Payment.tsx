"use client";

import { useTranslations } from "next-intl";
import { ShieldCheck, CreditCard } from "lucide-react";

const PAYMENT_LINK = process.env.NEXT_PUBLIC_PAYMENT_LINK ?? "#booking";

export function Payment({ locale }: { locale: string }) {
  const t = useTranslations("payment");

  return (
    <section className="py-20 md:py-28 bg-slate-50/60">
      <div className="container-narrow">
        <header className="max-w-3xl">
          <span className="eyebrow">{t("eyebrow")}</span>
          <h2 className="section-title">{t("title")}</h2>
          <p className="section-subtitle">{t("subtitle")}</p>
        </header>

        <div className="mt-12 max-w-lg">
          <div className="card flex flex-col gap-6">

            {/* Accepted methods */}
            <div className="flex flex-wrap items-center gap-3">
              <PaymentBadge label="Visa" color="#1a1f71" textColor="white" />
              <PaymentBadge label="Mastercard" color="#eb001b" textColor="white" />
              <PaymentBadge label="Apple Pay" color="#000000" textColor="white" icon="apple" />
              <PaymentBadge label="Google Pay" color="#ffffff" textColor="#3c4043" border />
            </div>

            <p className="text-slate-600 leading-relaxed">{t("cardDesc")}</p>

            {/* Security badges */}
            <div className="flex flex-wrap gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-emerald-600" />
                {t("secure")}
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-emerald-600" />
                {t("encrypted")}
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-emerald-600" />
                {t("noStorage")}
              </span>
            </div>

            <a
              href={PAYMENT_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary self-start"
            >
              <CreditCard size={16} aria-hidden />
              {t("cardCta")}
            </a>

            <p className="text-xs text-slate-400">{t("confirmNote")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function PaymentBadge({
  label,
  color,
  textColor,
  border = false,
  icon,
}: {
  label: string;
  color: string;
  textColor: string;
  border?: boolean;
  icon?: string;
}) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold"
      style={{
        background: color,
        color: textColor,
        border: border ? "1px solid #e2e8f0" : undefined,
        boxShadow: "0 1px 4px rgba(0,0,0,0.10)",
      }}
    >
      {icon === "apple" && (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
        </svg>
      )}
      {label}
    </span>
  );
}
