"use client";

import Link from "next/link";
import { menus } from "./constans";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight, Dismiss, Hamburger } from "@/components/icons";
import { useState } from "react";

const Header = ({ className }: { className?: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "container flex justify-between items-center relative",
        className,
        open && "bg-slate-900"
      )}
    >
      <div className="flex flex-col gap-1 cursor-pointer">
        <div className="flex gap-1.6 lg:gap-2 items-center">
          <Image
            src="/logo.png"
            alt="logo"
            width={33}
            height={32}
            className="h-6 lg:h-8 object-center object-contain"
          />
          <h3 className="text-white text-lg lg:text-2xl font-bold">
            Basic Training
          </h3>
        </div>
        <p className="text-white text-[8px] lg:text-xs font-inter">
          By Trophy Club Consulting
        </p>
      </div>
      <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 gap-12">
        {menus.map((menu) => (
          <Link
            key={menu.href}
            href={menu.href}
            className="text-xl font-semibold text-white"
          >
            {menu.label}
          </Link>
        ))}
      </div>
      <>
        <div className="flex gap-3 items-center">
          <Button
            variant="ghost"
            size="2xl"
            className="text-white hover:bg-transparent"
          >
            My Account
          </Button>
          <Button
            size="2xl"
            className="bg-[#FFBB00] hover:bg-[#FFBB00]/90 text-900 px-8 hidden lg:flex"
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
    </div>
  );
};

export default Header;
