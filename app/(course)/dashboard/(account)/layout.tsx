"use client";

import { courseMenus } from "@/components/partials/header/constans";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  console.log("pathname", pathname);

  return (
    <div className="container flex gap-6 min-h-[calc(100vh-144px] lg:min-h-[calc(100vh-184px)] my-6">
      <div className="hidden xl:block max-w-[400px] w-full bg-slate-50 rounded-2xl border-slate-200 border">
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
                { "bg-blue-600 text-white": pathname === menu.href }
              )}
            >
              {menu.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex-1 min-h-[calc(100vh-144px)] lg:min-h-[calc(100vh-184px)]">
        <div className="bg-slate-50 border-slate-200 h-full border rounded-2xl overflow-hidden">
          <div className="hidden lg:block font-semibold lg:text-2xl text-lg lg:py-6 lg:px-8 p-4 bg-slate-200 rounded-t-2xl">
            {courseMenus.find((menu) => menu.href === pathname)?.label}
          </div>

          {/* mobile menu */}
          <div className="block lg:hidden w-full bg-slate-200 p-4 rounded-t-2xl">
            <Select onValueChange={(value) => router.push(value)}>
              <SelectTrigger className="w-full border-transparent shadow-none px-0 data-[placeholder]:text-primary text-primary font-semibold text-lg data-[placeholder]:font-semibold data-[placeholder]:text-lg">
                <SelectValue
                  placeholder={
                    courseMenus.find((item) => item.href === pathname)?.label
                  }
                />
              </SelectTrigger>
              <SelectContent className="w-full px-2 py-3">
                {courseMenus.map((item, index) => (
                  <SelectItem
                    key={index}
                    value={item.href}
                    className={cn(
                      "cursor-pointer rounded-lg hover:bg-blue-600 hover:text-white block font-normal text-sm py-2 mb-1",
                      { "!bg-blue-600 !text-white": pathname === item.href }
                    )}
                  >
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
