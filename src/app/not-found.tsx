import Link from "next/link";

export default function NotFound() {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, sans-serif", padding: "4rem 1rem", textAlign: "center" }}>
        <h1 style={{ fontSize: "2rem", margin: 0 }}>404 — Page not found</h1>
        <p style={{ color: "#64748b" }}>This page doesn&apos;t exist.</p>
        <Link href="/fr" style={{ color: "#2563eb", textDecoration: "underline" }}>
          Go home
        </Link>
      </body>
    </html>
  );
}
