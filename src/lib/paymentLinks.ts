const fallback = process.env.NEXT_PUBLIC_PAYMENT_LINK ?? "#payment";

export const paymentLinks: Record<string, Record<string, string>> = {
  linkedin: {
    starter: process.env.NEXT_PUBLIC_PAYMENT_LINKEDIN_STARTER ?? fallback,
    pro:     process.env.NEXT_PUBLIC_PAYMENT_LINKEDIN_PRO     ?? fallback,
    premium: process.env.NEXT_PUBLIC_PAYMENT_LINKEDIN_PREMIUM ?? fallback,
  },
  career: {
    starter: process.env.NEXT_PUBLIC_PAYMENT_CAREER_STARTER ?? fallback,
    pro:     process.env.NEXT_PUBLIC_PAYMENT_CAREER_PRO     ?? fallback,
  },
};

export function getPaymentLink(service: string, pkg: string): string {
  return paymentLinks[service]?.[pkg] ?? fallback;
}
