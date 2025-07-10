/* eslint-disable @typescript-eslint/no-explicit-any */
import { SessionProvider } from "@/components/partials";
import ReduxProvider from "@/components/partials/provider";
import { Vollkorn, Inter } from "next/font/google";
import { neueHaasDisplay } from "@/public/fonts";
import { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

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

export default function RootLayout({ children }: any) {
  return (
    <html lang="en">
      <body
        className={`${neueHaasDisplay.variable} ${vollkorn.variable} ${inter.variable} min-h-screen overflow-x-hidden  antialiased`}
      >
        <SessionProvider>
          <ReduxProvider>{children}</ReduxProvider>
          {/* Sonner Toaster for notifications */}
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}
