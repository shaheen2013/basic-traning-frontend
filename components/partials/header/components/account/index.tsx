"use client";

import { ArrowRight, Dismiss, Hamburger } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { menus } from "../../constans";
import Link from "next/link";

const Account = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="flex gap-3 items-center">
        <Button variant="ghost" size="2xl" className="text-white">
          My Account
        </Button>
        <Button
          size="2xl"
          className="bg-[#FFBB00] hover:bg-[#FFBB00]/90 text-900 px-8 hidden lg:block"
        >
          Start Training Today
          <ArrowRight className="ml-3 size-6 text-900 shrink-0" />
        </Button>

        <div
          className="p-2.5 lg:hidden bg-slate-100 rounded-lg size-10 flex item-center justify-center"
          onClick={() => setOpen(!open)}
        >
          {open ? (
            <Dismiss className="text-slate-900 text-xl" />
          ) : (
            <Hamburger className="text-slate-900 text-xl" />
          )}
        </div>
      </div>
      {open && (
        <>
          {/* Overlay */}
          <div
            className="fixed top-[88px] left-0 w-full h-[calc(100vh-88px)] bg-slate-900/80 z-20"
            onClick={() => setOpen(!open)}
          />
          <div className="absolute top-[88px] left-0 w-full h-fit bg-white z-30 flex flex-col">
            {menus.map((menu) => (
              <Link
                key={menu.href}
                href={menu.href}
                className="text-base font-medium text-slate-900 py-3 px-5 w-full border-b border-slate-200"
              >
                {menu.label}
              </Link>
            ))}

            <Button
              size="xl"
              className="bg-[#FFBB00] hover:bg-[#FFBB00]/90 text-900 my-3 mx-5 rounded-full"
            >
              Start Training Today
              <ArrowRight className="ml-2 size-6 text-900 shrink-0" />
            </Button>
          </div>
        </>
      )}
    </>
  );
};

export default Account;
