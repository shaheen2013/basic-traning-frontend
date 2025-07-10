import { Footer } from "@/components/partials";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className="font-neue-haas-display">{children}</main>
      {/* Footer component */}
      <Footer />
    </>
  );
}
