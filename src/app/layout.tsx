// Root layout — required by Next.js so not-found.tsx has a parent.
// Actual HTML/body rendering is done in [locale]/layout.tsx.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
