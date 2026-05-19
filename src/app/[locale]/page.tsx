import { setRequestLocale } from "next-intl/server";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Packages } from "@/components/Packages";
import { About } from "@/components/About";
import { Process } from "@/components/Process";
import { BookingForm } from "@/components/BookingForm";
import { Payment } from "@/components/Payment";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Header locale={locale} />
      <main>
        <Hero />
        <Services />
        <Packages />
        <About />
        <Process />
        <Payment locale={locale} />
        <BookingForm locale={locale} />
        <FAQ />
      </main>
      <Footer locale={locale} />
      <WhatsAppButton locale={locale} />
    </>
  );
}
