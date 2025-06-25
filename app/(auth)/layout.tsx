import { AuthRightSidebar, Header } from "@/components/partials";
import { neueHaasDisplay } from "@/public/fonts";
import { Inter, Vollkorn } from "next/font/google";
import React from "react";
import "../globals.css";
import { Toaster } from "@/components/ui/sonner";
import ReduxProvider from "@/components/partials/provider";

const vollkorn = Vollkorn({
  variable: "--font-vollkorn",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export default function AuthLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${neueHaasDisplay.variable} ${vollkorn.variable}   antialiased`}
      >
        <ReduxProvider>
          {/* Sonner Toaster for notifications */}
          <Toaster />
          <main className="min-h-screen overflow-x-hidden">
            <Header className="bg-primary font-neue-haas-display" />
            <div className="grid grid-cols-12 font-inter">
              <div className="col-span-12 lg:col-span-6">{children}</div>
              <div className="lg:block hidden col-span-6 relative">
                <AuthRightSidebar />
              </div>
            </div>
          </main>
        </ReduxProvider>
        <footer className="bg-gray-800 font-neue-haas-display">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 container py-4 lg:py-6">
            <p className="text-white text-base lg:text-lg font-normal lg:font-medium">
              © {new Date().getFullYear()} Basic Training. All rights reserved.
            </p>
            <p className="text-white text-base lg:text-lg font-normal lg:font-medium">
              State Farm has not reviewed or approved this material and neither
              supports nor endorses the material presented and makes no warranty
              regarding the accuracy or usability of the information contained
              in this presentation
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
