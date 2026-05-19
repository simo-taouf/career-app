"use client";

import { useState } from "react";
import { X, ArrowLeft, Copy, Check } from "lucide-react";
import Image from "next/image";

type Locale = "fr" | "ar" | "en";
type Service = "linkedin" | "career";
type Pkg = "starter" | "pro" | "premium";
type Step = "welcome" | "service" | "pkg" | "payment" | "done";

const PHONE = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "4915679384731";
const RIB = "007791001531300030002122";
const RIB_DISPLAY = "007 791 0015 3130 0030 0021 22";

const PRICES: Record<Service, Partial<Record<Pkg, string>>> = {
  linkedin: { starter: "15 €", pro: "30 €", premium: "50 €" },
  career:   { starter: "30 €", pro: "50 €" },
};

const PKGS: Record<Service, Pkg[]> = {
  linkedin: ["starter", "pro", "premium"],
  career:   ["starter", "pro"],
};

const PKG_DESC: Record<Locale, Record<Service, Partial<Record<Pkg, string>>>> = {
  fr: {
    linkedin: {
      starter: "Profil LinkedIn optimisé + bannière",
      pro:     "LinkedIn complet + stratégie de contenu",
      premium: "LinkedIn + coaching personnalisé 1-to-1",
    },
    career: {
      starter: "CV ATS + lettre de motivation",
      pro:     "CV + coaching entretien complet",
    },
  },
  ar: {
    linkedin: {
      starter: "ملف LinkedIn محسّن + غلاف احترافي",
      pro:     "LinkedIn كامل + استراتيجية المحتوى",
      premium: "LinkedIn + تدريب شخصي 1-to-1",
    },
    career: {
      starter: "سيرة ذاتية ATS + رسالة تحفيزية",
      pro:     "سيرة ذاتية + تدريب على المقابلات",
    },
  },
  en: {
    linkedin: {
      starter: "Optimized LinkedIn profile + banner",
      pro:     "Full LinkedIn + content strategy",
      premium: "LinkedIn + personal 1-to-1 coaching",
    },
    career: {
      starter: "ATS CV + cover letter",
      pro:     "CV + full interview coaching",
    },
  },
};

const T = {
  fr: {
    greeting:   "Bonjour ! Bienvenue chez CareerBridge.",
    langQ:      "Dans quelle langue souhaitez-vous continuer ?",
    serviceQ:   "Quel service vous intéresse ?",
    pkgQ:       "Choisissez votre formule :",
    svc:        { linkedin: "LinkedIn & Marque Personnelle", career: "Boost Carrière" } as Record<Service, string>,
    pkg:        { starter: "Starter", pro: "Pro", premium: "Premium" } as Record<Pkg, string>,
    payTitle:   "Paiement par virement bancaire",
    payTo:      "Effectuez un virement vers :",
    payAmount:  "Montant à virer :",
    payNote:    "Une fois le virement effectué, envoyez votre reçu (capture d'écran) sur WhatsApp pour valider votre commande :",
    payBtn:     "Envoyer le reçu sur WhatsApp",
    done:       "Merci ! Nous confirmerons votre commande sous 24h apres reception du recu.",
    back:       "Retour",
    copyRib:    "Copier le RIB",
    copied:     "Copie !",
    amount:     "Montant",
  },
  ar: {
    greeting:   "مرحباً ! اهلاً بكم في CareerBridge.",
    langQ:      "بأي لغة تود المتابعة؟",
    serviceQ:   "ما الخدمة التي تهمك؟",
    pkgQ:       "اختر باقتك :",
    svc:        { linkedin: "LinkedIn والعلامة الشخصية", career: "تطوير المسيرة المهنية" } as Record<Service, string>,
    pkg:        { starter: "Starter", pro: "Pro", premium: "Premium" } as Record<Pkg, string>,
    payTitle:   "الدفع بالتحويل البنكي",
    payTo:      "يرجى اجراء تحويل الى :",
    payAmount:  "المبلغ المطلوب :",
    payNote:    "بعد اتمام التحويل، ارسل صورة الايصال على واتساب لتاكيد طلبك :",
    payBtn:     "ارسال الايصال على واتساب",
    done:       "شكراً ! سنؤكد طلبك خلال 24 ساعة من استلام الايصال.",
    back:       "رجوع",
    copyRib:    "نسخ الـ RIB",
    copied:     "تم النسخ !",
    amount:     "المبلغ",
  },
  en: {
    greeting:   "Hello! Welcome to CareerBridge.",
    langQ:      "Which language would you like to continue in?",
    serviceQ:   "Which service interests you?",
    pkgQ:       "Choose your package:",
    svc:        { linkedin: "LinkedIn & Personal Brand", career: "Career Boost" } as Record<Service, string>,
    pkg:        { starter: "Starter", pro: "Pro", premium: "Premium" } as Record<Pkg, string>,
    payTitle:   "Bank Transfer Payment",
    payTo:      "Please make a transfer to:",
    payAmount:  "Amount to transfer:",
    payNote:    "Once the transfer is done, send your receipt (screenshot) on WhatsApp to confirm your order:",
    payBtn:     "Send receipt on WhatsApp",
    done:       "Thank you! We will confirm your order within 24h after receiving the receipt.",
    back:       "Back",
    copyRib:    "Copy RIB",
    copied:     "Copied!",
    amount:     "Amount",
  },
};

export function ChatBot({ locale }: { locale: string }) {
  const initLang: Locale = (["fr", "ar", "en"].includes(locale) ? locale : "fr") as Locale;
  const [open,    setOpen]    = useState(false);
  const [lang,    setLang]    = useState<Locale>(initLang);
  const [step,    setStep]    = useState<Step>("welcome");
  const [service, setService] = useState<Service | null>(null);
  const [pkg,     setPkg]     = useState<Pkg | null>(null);
  const [copied,  setCopied]  = useState(false);

  const t      = T[lang];
  const isRtl  = lang === "ar";

  function copyRib() {
    navigator.clipboard.writeText(RIB);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function buildWaHref() {
    const pkgLabel  = pkg     ? t.pkg[pkg]     : "";
    const svcLabel  = service ? t.svc[service] : "";
    const price     = service && pkg ? (PRICES[service][pkg] ?? "") : "";
    const msgs: Record<Locale, string> = {
      fr: `Bonjour CareerBridge,\n\nJe vous transmets mon recu de virement pour :\n${svcLabel} - ${pkgLabel} (${price})\n\nMerci de valider ma commande.`,
      ar: `مرحباً CareerBridge،\n\nارسل اليكم ايصال التحويل لـ:\n${svcLabel} - ${pkgLabel} (${price})\n\nشكراً لتاكيد طلبي.`,
      en: `Hello CareerBridge,\n\nPlease find my transfer receipt for:\n${svcLabel} - ${pkgLabel} (${price})\n\nThank you for confirming my order.`,
    };
    return `https://wa.me/${PHONE}?text=${encodeURIComponent(msgs[lang])}`;
  }

  /* ── Shared bubble wrapper ── */
  function Bubble({ children }: { children: React.ReactNode }) {
    return (
      <div className="flex gap-2 items-start">
        <div className="h-7 w-7 shrink-0 rounded-full bg-brand-700 grid place-items-center text-white text-[10px] font-bold">
          CB
        </div>
        <div className="rounded-2xl rounded-tl-sm bg-slate-100 px-4 py-3 text-sm text-slate-800 w-full">
          {children}
        </div>
      </div>
    );
  }

  /* ── Choice button ── */
  function Btn({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
    return (
      <button
        onClick={onClick}
        className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-left text-sm font-medium text-slate-700 transition hover:border-brand-400 hover:bg-brand-50 hover:text-brand-800"
      >
        {children}
      </button>
    );
  }

  /* ── Back link ── */
  function Back({ to }: { to: Step }) {
    return (
      <button
        onClick={() => setStep(to)}
        className="mt-2 flex items-center gap-1 text-xs text-slate-400 hover:text-slate-600"
        dir={isRtl ? "rtl" : "ltr"}
      >
        <ArrowLeft size={11} />
        <span>{t.back}</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 start-6 z-50 flex flex-col items-start gap-2">
      {/* Chat window */}
      {open && (
        <div
          className="w-[22rem] rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden"
          dir={isRtl ? "rtl" : "ltr"}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3"
            style={{ background: "linear-gradient(135deg, #1e3a8a, #2563eb)" }}
          >
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-full bg-white/20 grid place-items-center">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2.046 21.2a.75.75 0 00.955.895l3.8-1.425A9.956 9.956 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-white leading-tight">CareerBridge</p>
                <p className="text-[11px] text-blue-200">Assistant virtuel</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white transition">
              <X size={17} />
            </button>
          </div>

          {/* Messages */}
          <div className="p-4 space-y-4 max-h-[28rem] overflow-y-auto">

            {/* ── STEP: welcome / language ── */}
            {step === "welcome" && (
              <Bubble>
                <p className="mb-3">{t.greeting}</p>
                <p className="text-xs text-slate-500 mb-2">{t.langQ}</p>
                <div className="flex flex-col gap-2">
                  {(["fr", "ar", "en"] as Locale[]).map((l) => (
                    <Btn key={l} onClick={() => { setLang(l); setStep("service"); }}>
                      {l === "fr" ? "Francais" : l === "ar" ? "العربية" : "English"}
                    </Btn>
                  ))}
                </div>
              </Bubble>
            )}

            {/* ── STEP: service ── */}
            {step === "service" && (
              <Bubble>
                <p className="mb-3">{t.serviceQ}</p>
                <div className="flex flex-col gap-2">
                  {(["linkedin", "career"] as Service[]).map((s) => (
                    <Btn key={s} onClick={() => { setService(s); setStep("pkg"); }}>
                      {t.svc[s]}
                    </Btn>
                  ))}
                </div>
                <Back to="welcome" />
              </Bubble>
            )}

            {/* ── STEP: package ── */}
            {step === "pkg" && service && (
              <Bubble>
                <p className="mb-3">{t.pkgQ}</p>
                <div className="flex flex-col gap-2">
                  {PKGS[service].map((p) => (
                    <button
                      key={p}
                      onClick={() => { setPkg(p); setStep("payment"); }}
                      className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-left transition hover:border-brand-400 hover:bg-brand-50"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-slate-800">{t.pkg[p]}</span>
                        <span className="text-sm font-bold text-brand-700">{PRICES[service][p]}</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">{PKG_DESC[lang][service][p]}</p>
                    </button>
                  ))}
                </div>
                <Back to="service" />
              </Bubble>
            )}

            {/* ── STEP: payment ── */}
            {step === "payment" && service && pkg && (
              <Bubble>
                <p className="font-semibold mb-3">{t.payTitle}</p>

                {/* Selected package summary */}
                <div className="mb-3 rounded-xl bg-brand-50 border border-brand-100 px-3 py-2.5">
                  <p className="text-xs text-brand-700 font-medium">{t.svc[service]}</p>
                  <div className="flex items-center justify-between mt-0.5">
                    <span className="text-sm font-semibold text-brand-900">{t.pkg[pkg]}</span>
                    <span className="text-lg font-bold text-brand-700">{PRICES[service][pkg]}</span>
                  </div>
                </div>

                {/* Attijariwafa bank card */}
                <p className="text-xs text-slate-500 mb-2">{t.payTo}</p>
                <div className="rounded-xl overflow-hidden border border-slate-200 mb-3">
                  {/* Bank header */}
                  <div className="flex items-center justify-center bg-white px-4 py-3">
                    <Image
                      src="/attijariwafa-logo.png"
                      alt="Attijariwafa bank"
                      width={140}
                      height={109}
                      className="object-contain"
                    />
                  </div>
                  {/* RIB */}
                  <div className="bg-red-50 px-3 py-2.5">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-red-600 mb-1">RIB</p>
                    <p className="font-mono text-sm font-bold text-slate-800 tracking-wider">
                      {RIB_DISPLAY}
                    </p>
                    <button
                      onClick={copyRib}
                      className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-600 hover:text-red-800 transition"
                    >
                      {copied ? <Check size={12} /> : <Copy size={12} />}
                      {copied ? t.copied : t.copyRib}
                    </button>
                  </div>
                </div>

                {/* WhatsApp instruction */}
                <p className="text-xs text-slate-600 mb-3">{t.payNote}</p>

                <a
                  href={buildWaHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setTimeout(() => setStep("done"), 800)}
                  className="flex items-center justify-center gap-2 w-full rounded-xl py-2.5 text-sm font-semibold text-white transition hover:opacity-90 active:scale-95"
                  style={{ background: "#25D366" }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  {t.payBtn}
                </a>

                <Back to="pkg" />
              </Bubble>
            )}

            {/* ── STEP: done ── */}
            {step === "done" && (
              <Bubble>
                <div className="flex items-start gap-2 text-emerald-700">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="shrink-0 mt-0.5">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <p className="text-sm font-medium">{t.done}</p>
                </div>
              </Bubble>
            )}

          </div>
        </div>
      )}

      {/* Floating trigger button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Chat with us"
          className="group relative grid h-14 w-14 place-items-center rounded-full shadow-soft transition hover:scale-110 active:scale-95"
          style={{ background: "linear-gradient(135deg, #1e3a8a, #2563eb)" }}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2.046 21.2a.75.75 0 00.955.895l3.8-1.425A9.956 9.956 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
          </svg>
          {/* Pulse ring */}
          <span className="absolute inset-0 rounded-full animate-ping opacity-30 bg-blue-500" />
        </button>
      )}
    </div>
  );
}
