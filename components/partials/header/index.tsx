/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { Link as LinkScroll } from "react-scroll";
import { menus } from "./constans";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight, Dismiss, Hamburger } from "@/components/icons";
import { useState } from "react";
import TrainingSlot from "../modal/training-slot";
import { usePathname } from "next/navigation";
import { useMe } from "@/services/hook";
import { HeaderSkeleton } from "./components/header-skeletons";

const Header = ({
  className,
  batches,
}: {
  className?: string;
  batches: any;
}) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isHomePage = pathname === "/";
  const { data: userData, isLoading, isFetching } = useMe({});

  if (isLoading || isFetching) return <HeaderSkeleton />;
  return (
    <div className={cn(className, open && "bg-primary")}>
      <div className="container flex justify-between items-center relative py-4 lg:py-8">
        <Link href={"/"} className="flex flex-col gap-1 cursor-pointer">
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
        </Link>
        <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 gap-8">
          {menus.map((menu) => (
            <Link
              key={menu.href}
              href={menu.href}
              className="text-xl font-semibold text-white px-2 py-3"
            >
              {menu.label}
            </Link>
          ))}
          {isHomePage ? (
            <LinkScroll
              to="faq"
              smooth={true}
              duration={500}
              spy
              className="text-xl font-semibold text-white cursor-pointer px-2 py-3"
            >
              Faq
            </LinkScroll>
          ) : (
            <Link
              key="faq"
              href="/#faq"
              className="text-xl font-semibold text-white px-2 py-3 "
            >
              Faq
            </Link>
          )}
        </div>
        <>
          <div className="flex gap-3 items-center">
            {!userData ? (
              <Link
                href="/login"
                className="text-white text-xl font-semibold px-4 py-3"
              >
                Login
              </Link>
            ) : (
              <Link
                href="/my-course"
                className="text-white text-xl font-semibold px-4 py-3"
              >
                My Account
              </Link>
            )}

            <div className="hidden lg:flex">
              <TrainingSlot batches={batches}>
                <Button
                  className="bg-[#FFBB00] hover:bg-[#FFBB00]/90 text-primary has-[>svg]:px-6 rounded-full"
                  size="2xl"
                >
                  Start Training Today
                  <ArrowRight className="lg:ml-3 ml-2 size-6 text-900 shrink-0" />
                </Button>
              </TrainingSlot>
            </div>

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
                className="fixed top-[76px] left-0 w-full h-[calc(100vh-76px)] bg-slate-900/80 z-20"
                onClick={() => setOpen(!open)}
              />
              <div className="absolute top-[76px] left-0 w-full h-fit bg-white z-30 lg:hidden flex flex-col">
                {menus.map((menu) => (
                  <Link
                    key={menu.href}
                    href={menu.href}
                    className="text-base font-medium text-slate-900 py-3 px-5 w-full border-b border-slate-200"
                  >
                    {menu.label}
                  </Link>
                ))}
                {isHomePage ? (
                  <LinkScroll
                    onClick={() => setOpen(!open)}
                    to="faq"
                    smooth={true}
                    duration={500}
                    spy
                    className="text-base font-medium text-slate-900 py-3 px-5 w-full border-b border-slate-200"
                  >
                    Faq
                  </LinkScroll>
                ) : (
                  <Link
                    key="faq"
                    href="/#faq"
                    className="text-base font-medium text-slate-900 py-3 px-5 w-full border-b border-slate-200"
                  >
                    Faq
                  </Link>
                )}

                <TrainingSlot>
                  <Button
                    className="bg-[#FFBB00] hover:bg-[#FFBB00]/90 text-900 my-3 mx-auto w-full max-w-[350px] rounded-full"
                    size="xl"
                  >
                    Start Training Today
                    <ArrowRight className="lg:ml-3 ml-2 size-6 text-900 shrink-0" />
                  </Button>
                </TrainingSlot>
              </div>
            </>
          )}
        </>
      </div>
    </div>
  );
};

export default Header;
