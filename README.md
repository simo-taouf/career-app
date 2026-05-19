# CareerBridge

Trilingual (French / Arabic / English) landing page for career & study-abroad coaching services targeted at MENA professionals.

**Stack:** Next.js 15 · TypeScript · Tailwind CSS · next-intl (with RTL for Arabic)

---

## Quick start (one-time setup)

Open a terminal in `C:\Users\taouf\Desktop\career-app` and run:

```bash
npm install
```

This downloads all dependencies (~2–3 minutes the first time).

Then start the dev server:

```bash
npm run dev
```

Open <http://localhost:3000> — you'll be redirected to <http://localhost:3000/fr> automatically.

Switch language using the globe selector in the top-right.

---

## Configuring email & payment (optional, for production)

1. Copy `.env.example` to `.env.local`:

   ```bash
   cp .env.example .env.local
   ```

2. Fill in:
   - **`RESEND_API_KEY`** — get a free key at [resend.com](https://resend.com) (3000 emails/month free). Without this, booking submissions are logged to the console only.
   - **`BOOKING_NOTIFICATION_EMAIL`** — already set to your gmail.
   - **Bank details** — IBAN, BIC, etc. shown on the Payment section.
   - **`NEXT_PUBLIC_STRIPE_PAYMENT_LINK`** — create a free Stripe Payment Link at [dashboard.stripe.com/payment-links](https://dashboard.stripe.com/payment-links).

---

## Deploying to production

1. Push the project to GitHub (private repo is fine).
2. Sign up at [vercel.com](https://vercel.com) — connect your GitHub account.
3. Click "Import Project" → select the repo.
4. In Vercel project settings → Environment Variables, add the same keys from `.env.local`.
5. Deploy — your site will be live at `careerbridge.vercel.app` within 60 seconds.
6. (Later) Buy a domain (e.g. via Namecheap or OVH) and connect it in Vercel → Domains.

---

## Project structure

```
career-app/
├── messages/                 # Translation files (fr.json, ar.json, en.json)
├── public/                   # Static assets (logos, images)
├── src/
│   ├── i18n/                 # next-intl routing & request config
│   ├── middleware.ts         # Locale detection / redirect
│   ├── lib/packages.ts       # Tracks & tiers config
│   ├── components/           # UI components
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── Services.tsx
│   │   ├── Packages.tsx      # 3 tracks × 3 tiers tabbed view
│   │   ├── About.tsx
│   │   ├── Process.tsx
│   │   ├── Payment.tsx       # Card + bank transfer
│   │   ├── BookingForm.tsx   # Lead capture
│   │   ├── FAQ.tsx
│   │   ├── Footer.tsx
│   │   ├── LanguageSwitcher.tsx
│   │   └── Logo.tsx
│   └── app/
│       ├── globals.css
│       ├── not-found.tsx
│       ├── api/booking/route.ts   # Resend integration
│       └── [locale]/
│           ├── layout.tsx
│           └── page.tsx
├── tailwind.config.ts
├── next.config.ts
└── package.json
```

---

## Editing content

- **Texts:** edit the JSON files in `messages/` (one per language). Same key structure across all three.
- **Prices:** edit the price values inside `messages/{locale}.json` under `packages.{track}.{tier}.price`.
- **Bank / Stripe info:** edit `.env.local` and restart the dev server.
- **Colors / fonts:** edit `tailwind.config.ts` and `src/app/globals.css`.

---

## Phase 2 — Mobile apps

When ready to publish to the App Store / Play Store, wrap this Next.js export with [Capacitor](https://capacitorjs.com):

```bash
npm install @capacitor/core @capacitor/cli @capacitor/ios @capacitor/android
npx cap init
npx cap add ios
npx cap add android
```

This packages the same web code into native iOS/Android shells — one codebase for all platforms.
