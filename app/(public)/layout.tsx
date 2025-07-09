import { Footer } from "@/components/partials";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className="min-h-screen overflow-x-hidden font-neue-haas-display">
        {children}
      </main>
      {/* Footer component */}
      <Footer />
    </>
  );
}
