import { AuthRightSidebar, Header } from "@/components/partials";
import React from "react";
import "../globals.css";

export default function AuthLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <main className="overflow-x-hidden font-inter">
        <Header className="bg-primary" />
        <div className="grid grid-cols-12">
          <div className="col-span-12 lg:col-span-6">{children}</div>
          <div className="lg:block hidden lg:col-span-6">
            <AuthRightSidebar />
          </div>
        </div>
      </main>
      <footer className="bg-gray-800">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 container py-4 lg:py-6">
          <p className="text-white text-base lg:text-lg font-normal lg:font-medium">
            © {new Date().getFullYear()} Basic Training. All rights reserved.
          </p>
          <p className="text-white text-base lg:text-lg font-normal lg:font-medium">
            State Farm has not reviewed or approved this material and neither
            supports nor endorses the material presented and makes no warranty
            regarding the accuracy or usability of the information contained in
            this presentation
          </p>
        </div>
      </footer>
    </>
  );
}
