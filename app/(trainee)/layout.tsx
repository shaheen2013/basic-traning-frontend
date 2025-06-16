import { Inter, Vollkorn } from "next/font/google";
import React from "react";
import "../globals.css";
import { CourseHeader } from "@/components/partials";
import ReduxProvider from "@/components/partials/provider";

const vollkorn = Vollkorn({
  variable: "--font-vollkorn",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export default function CourseLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en">
      <body className={`${vollkorn.variable} ${inter.variable}  antialiased`}>
        <ReduxProvider>
          <CourseHeader />
          {/* Main content area for the course layout */}
          <main className="min-h-screen overflow-x-hidden font-inter">
            {children}
          </main>
          <footer className="bg-gray-800 font-inter">
            <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 container py-4 lg:py-6">
              <p className="text-white text-base lg:text-lg font-normal lg:font-medium">
                © {new Date().getFullYear()} Basic Training. All rights
                reserved.
              </p>
              <p className="text-white text-base lg:text-lg font-normal lg:font-medium">
                State Farm has not reviewed or approved this material and
                neither supports nor endorses the material presented and makes
                no warranty regarding the accuracy or usability of the
                information contained in this presentation
              </p>
            </div>
          </footer>
        </ReduxProvider>
      </body>
    </html>
  );
}
