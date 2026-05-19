import Link from "next/link";
import Image from "next/image";

export function Logo({ locale }: { locale: string }) {
  return (
    <Link
      href={`/${locale}`}
      className="flex items-center"
      aria-label="CareerBridge"
    >
      <Image
        src="/careerbridge-logo.png"
        alt="CareerBridge"
        width={480}
        height={180}
        className="h-40 w-auto object-contain"
        priority
      />
    </Link>
  );
}
