"use client";

import { courseMenus } from "@/components/partials/header/constans";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MobileMenu } from "./components";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="container flex gap-6 min-h-[calc(100vh-144px] lg:min-h-[calc(100vh-184px)] my-6">
      <div
        className={cn(
          "hidden xl:block max-w-[400px] w-full bg-slate-50 rounded-2xl border-slate-200 border",
          {
            "xl:hidden": pathname === "/syllabus",
          }
        )}
      >
        <div className="font-semibold text-2xl text-primary p-6 bg-slate-200 rounded-t-2xl">
          My Account
        </div>
        <div className="flex flex-col gap-1 p-6">
          {courseMenus.map((menu) => (
            <Link
              key={menu.id}
              href={menu.href}
              className={cn(
                "text-base font-semibold text-slate-700 px-4 py-3 hover:bg-blue-600 hover:text-white rounded-lg transition-colors duration-200",
                {
                  "bg-blue-600 text-white":
                    pathname === menu.href ||
                    menu.items?.some((item) => item.href === pathname),
                }
              )}
            >
              {menu.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex-1 min-h-[calc(100vh-144px)] lg:min-h-[calc(100vh-184px)]">
        <div className="bg-slate-50 border-slate-200 h-full border rounded-2xl overflow-hidden">
          {pathname !== "/syllabus" && pathname !== "/chats/create" && (
            <MobileMenu />
          )}
          {children}
        </div>
      </div>
    </div>
  );
}
