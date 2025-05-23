import Image from "next/image";
import Link from "next/link";
import { menus } from "../header/constans";
import { Facebook, Instagram, Linkedin, X, Youtube } from "@/components/icons";

const Footer = () => {
  return (
    <footer className="bg-gray-800 py-6 lg:py-16">
      <div className="container flex flex-col gap-8 lg:gap-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
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
          <div className="flex items-center lg:justify-center gap-8">
            {menus.map((menu) => (
              <Link
                key={menu.href}
                href={menu.href}
                className="text-base lg:text-xl font-normal lg:font-semibold text-white"
              >
                {menu.label}
              </Link>
            ))}
          </div>
          <div className="flex gap-4 items-center lg:justify-end">
            <Youtube className="text-white size-6" />
            <Facebook className="text-white size-6" />
            <X className="text-white size-6" />
            <Instagram className="text-white size-6" />
            <Linkedin className="text-white size-6" />
          </div>
        </div>
        <hr className="text-slate-700" />
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12">
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
      </div>
    </footer>
  );
};

export default Footer;
