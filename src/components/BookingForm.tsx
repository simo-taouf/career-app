"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { CreditCard, CheckCircle2, AlertCircle, ShieldCheck } from "lucide-react";
import { tiers, type Track } from "@/lib/packages";
import { getPaymentLink } from "@/lib/paymentLinks";

type Status = "idle" | "submitting" | "success" | "error";

export function BookingForm({ locale }: { locale: string }) {
  const t = useTranslations("booking");
  const [status, setStatus] = useState<Status>("idle");
  const [consent, setConsent] = useState(false);
  const [consentError, setConsentError] = useState(false);
  const [selectedService, setSelectedService] = useState<Track | "">("");
  const [selectedPackage, setSelectedPackage] = useState("");

  useEffect(() => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.split("?")[1] ?? "");
    const svc = params.get("service") as Track | null;
    const pkg = params.get("package");
    if (svc === "linkedin" || svc === "career") setSelectedService(svc);
    if (pkg) setSelectedPackage(pkg);
  }, []);

  const availablePackages = selectedService ? tiers[selectedService] : [];

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!consent) { setConsentError(true); return; }
    setConsentError(false);
    setStatus("submitting");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, locale }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      const link = getPaymentLink(data.service as string, data.package as string);
      setTimeout(() => { window.location.href = link; }, 1500);
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="booking" className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 -z-10 bg-cta-gradient opacity-[0.04]" />
      <div className="container-narrow grid gap-10 md:grid-cols-[1fr_2fr]">

        {/* Left column */}
        <div>
          <span className="eyebrow">{t("eyebrow")}</span>
          <h2 className="section-title">{t("title")}</h2>
          <p className="section-subtitle">{t("subtitle")}</p>
          <ul className="mt-8 space-y-3 text-sm text-slate-700">
            {(t.raw("bullets") as string[]).map((line) => (
              <li key={line} className="flex items-start gap-2">
                <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-brand-600" aria-hidden />
                <span>{line}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex items-start gap-2 rounded-xl border border-brand-100 bg-brand-50 p-4">
            <ShieldCheck size={18} className="mt-0.5 shrink-0 text-brand-700" aria-hidden />
            <p className="text-xs text-brand-800 leading-relaxed">
              {locale === "ar"
                ? "بياناتك محمية وفق القانون 09-08 (CNDP المغرب) والـ GDPR الأوروبي"
                : locale === "en"
                ? "Your data is protected under Law 09-08 (CNDP Morocco) and European GDPR"
                : "Données protégées par la loi 09-08 (CNDP Maroc) et le RGPD européen"}
            </p>
          </div>
        </div>

        {/* Right column — form */}
        <form
          onSubmit={onSubmit}
          className="rounded-2xl border border-slate-200 bg-white p-7 shadow-soft space-y-8"
        >
          {/* Section 1 — Order */}
          <fieldset>
            <legend className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-700">
              <span className="grid h-5 w-5 place-items-center rounded-full bg-brand-700 text-white text-[10px]">1</span>
              {t("sectionOrder")}
            </legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-brand-900">
                  {t("service")} <span className="ms-1 text-rose-500">*</span>
                </label>
                <select
                  name="service"
                  required
                  value={selectedService}
                  onChange={(e) => {
                    setSelectedService(e.target.value as Track | "");
                    setSelectedPackage("");
                  }}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-brand-950 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
                >
                  <option value="">{t("selectService")}</option>
                  <option value="linkedin">{t("linkedinService")}</option>
                  <option value="career">{t("careerService")}</option>
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-brand-900">
                  {t("package")} <span className="ms-1 text-rose-500">*</span>
                </label>
                <select
                  name="package"
                  required
                  value={selectedPackage}
                  onChange={(e) => setSelectedPackage(e.target.value)}
                  disabled={!selectedService}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-brand-950 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200 disabled:opacity-50"
                >
                  <option value="">{t("selectPackage")}</option>
                  {availablePackages.map((pkg) => (
                    <option key={pkg} value={pkg}>
                      {pkg.charAt(0).toUpperCase() + pkg.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </fieldset>

          <div className="border-t border-slate-100" />

          {/* Section 2 — Contact */}
          <fieldset>
            <legend className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-700">
              <span className="grid h-5 w-5 place-items-center rounded-full bg-brand-700 text-white text-[10px]">2</span>
              {t("sectionContact")}
            </legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label={t("fullName")} name="fullName" required />
              <Field label={t("email")} name="email" type="email" required />
              <div className="sm:col-span-2">
                <Field label={t("phone")} name="phone" type="tel" required />
              </div>
            </div>
          </fieldset>

          <div className="border-t border-slate-100" />

          {/* Consent — CNDP + GDPR */}
          <div>
            <label
              className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition ${
                consentError
                  ? "border-rose-300 bg-rose-50"
                  : consent
                  ? "border-brand-300 bg-brand-50"
                  : "border-slate-200 bg-slate-50 hover:border-brand-200"
              }`}
            >
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => {
                  setConsent(e.target.checked);
                  if (e.target.checked) setConsentError(false);
                }}
                className="mt-0.5 h-4 w-4 shrink-0 accent-brand-700"
              />
              <div>
                <p className="text-xs leading-relaxed text-slate-700">
                  {t("consentLabel")}
                </p>
                <a href="#" className="mt-1 inline-block text-xs font-semibold text-brand-700 underline hover:text-brand-800">
                  {t("privacyLink")}
                </a>
              </div>
            </label>
            {consentError && (
              <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-rose-600">
                <AlertCircle size={13} aria-hidden />
                {t("consentRequired")}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={status === "submitting"}
            className="btn-primary w-full justify-center disabled:opacity-60"
          >
            {status === "submitting" ? (
              t("submitting")
            ) : (
              <>
                <CreditCard size={16} aria-hidden />
                {t("submit")}
              </>
            )}
          </button>

          {status === "success" && (
            <div className="flex items-start gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-800">
              <CheckCircle2 size={18} className="mt-0.5 shrink-0" aria-hidden />
              <div>
                <p className="font-semibold">{t("successTitle")}</p>
                <p>{t("successMessage")}</p>
              </div>
            </div>
          )}
          {status === "error" && (
            <div className="flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800">
              <AlertCircle size={18} className="mt-0.5 shrink-0" aria-hidden />
              <div>
                <p className="font-semibold">{t("errorTitle")}</p>
                <p>{t("errorMessage")}</p>
              </div>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-brand-900">
        {label}
        {required && <span className="ms-1 text-rose-500">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-brand-950 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
      />
    </div>
  );
}
