"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { courseMenus, menus } from "../constans";
import { Analytics, Settings, User } from "@/components/icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import LogOutConfirmation from "@/components/partials/modal/log-out-confirmation";
import { useMe } from "@/services/hook";

const icons = [
  {
    id: 1,
    label: "My Course",
    icon: (
      <User className="size-5 text-slate-700 group-hover:text-white transition-colors duration-200" />
    ),
  },
  {
    id: 2,
    label: "Profile Overview",
    icon: (
      <User className="size-5 text-slate-700 group-hover:text-white transition-colors duration-200" />
    ),
  },
  {
    id: 3,
    label: "Analytics",
    icon: (
      <Analytics className="size-5 text-slate-700 group-hover:text-white transition-colors duration-200" />
    ),
  },
  {
    id: 4,
    label: "Chats",
    icon: (
      <User className="size-5 text-slate-700 group-hover:text-white transition-colors duration-200" />
    ),
  },
  {
    id: 5,
    label: "Settings",
    icon: (
      <Settings className="size-5 text-slate-700 group-hover:text-white transition-colors duration-200" />
    ),
  },
];

const CoursMenusWithIcons = courseMenus.map((menu) => ({
  ...menu,
  icon: icons.find((icon) => icon.id === menu.id)?.icon,
}));

const Header = () => {
  const { data: userData } = useMe({});

  return (
    <div className="bg-primary font-inter">
      <div className="container flex justify-between items-center relative py-4 lg:py-8">
        <Link href={"/"} className="flex flex-col gap-0.5 cursor-pointer">
          <Image
            src="/logo1.png"
            alt="logo"
            width={1000}
            height={700}
            className="w-full max-w-[212px] filter brightness-0 invert"
          />
          <p className="text-white text-xs font-inter">
            By Trophy Club Consulting
          </p>
        </Link>
        <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 gap-8">
          {menus.map((menu) => (
            <Link
              key={menu.href}
              href={menu.href}
              className="text-xl font-semibold px-2 py-3 text-white"
            >
              {menu.label}
            </Link>
          ))}
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="2xl"
              className="text-white hover:bg-transparent hover:text-white"
            >
              <div className="flex items-center justify-center size-12 rounded-full">
                {userData?.avatar && (
                  <Image
                    src={userData?.avatar}
                    alt={userData?.name}
                    width={48}
                    height={48}
                    className="size-full object-center object-contain rounded-full"
                  />
                )}
              </div>
              My Account
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-[324px] shadow-lg rounded-lg"
            align="end"
          >
            <div className="flex gap-3 items-center mb-4">
              <div className="flex items-center justify-center size-12 rounded-full">
                {userData?.avatar && (
                  <Image
                    src={userData?.avatar}
                    alt={userData?.name}
                    width={48}
                    height={48}
                    className="size-full object-center object-contain rounded-full"
                  />
                )}
              </div>
              <div className="flex flex-col">
                <h3 className="text-primary text-base font-semibold">
                  {userData?.name}
                </h3>
                <span className="text-slate-700 text-sm fotn-normal">
                  {userData?.email}
                </span>
              </div>
            </div>
            <div className="flex flex-col mb-4">
              {CoursMenusWithIcons.map((menu) => (
                <Link
                  key={menu.id}
                  href={menu.href}
                  className="text-sm font-medium text-slate-700 p-2.5 group hover:bg-blue-600 hover:text-white rounded-md transition-colors duration-200"
                >
                  <div className="flex items-center gap-2">
                    {menu.icon}
                    {menu.label}
                  </div>
                </Link>
              ))}
            </div>
            <div className="border-t border-slate-200 pt-4" />
            <LogOutConfirmation />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default Header;
