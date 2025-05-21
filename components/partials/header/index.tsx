import Link from "next/link";
import { menus } from "./constans";
import Image from "next/image";
import { cn } from "@/lib/utils";

const Header = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "max-w-[1696px] mx-auto px-4 flex justify-between items-center relative",
        className
      )}
    >
      <div className="flex flex-col gap-1 cursor-pointer">
        <div className="flex gap-2 items-center">
          <Image
            src="/logo.png"
            alt="logo"
            width={33}
            height={32}
            className="h-8 object-center object-contain"
          />
          <h3 className="text-white text-2xl font-bold">Basic Training</h3>
        </div>
        <p className="text-white text-xs font-inter">
          By Trophy Club Consulting
        </p>
      </div>
      <div className="absolute left-1/2 -translate-x-1/2 flex gap-12">
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
      <div>actions</div>
    </div>
  );
};

export default Header;
