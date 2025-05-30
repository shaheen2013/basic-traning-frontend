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
import { usePathname, useRouter } from "next/navigation";

const MobileMenus = () => {
  const pathname = usePathname();
  const router = useRouter();
  return (
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
  );
};

export default MobileMenus;
