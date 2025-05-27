import type { Metadata } from "next";
import { Vollkorn, Inter } from "next/font/google";
import "../globals.css";
import { neueHaasDisplay } from "@/public/fonts";
import { Footer } from "@/components/partials";

const vollkorn = Vollkorn({
  variable: "--font-vollkorn",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Basic Training",
  description: "Transform Learning with Basic Training",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${neueHaasDisplay.variable} ${vollkorn.variable} ${inter.variable}  antialiased`}
      >
        {children}
        <Footer />
      </body>
    </html>
  );
}
