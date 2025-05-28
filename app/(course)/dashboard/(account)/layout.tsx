import { courseMenus } from "@/components/partials/header/constans";
import Link from "next/link";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container flex min-h-screen h-full my-6">
      <div className="max-w-[400px] w-full bg-slate-50 rounded-2xl">
        <div className="font-semibold text-2xl text-primary p-6 bg-slate-200 rounded-t-2xl">
          My Account
        </div>
        <div className="flex flex-col gap-1 p-6">
          {courseMenus.map((menu) => (
            <Link
              key={menu.id}
              href={menu.href}
              className="text-base font-semibold text-slate-700 px-4 py-3 hover:bg-blue-600 hover:text-white rounded-lg transition-colors duration-200"
            >
              {menu.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="ml-6 flex-1 overflow-y-auto">{children}</div>
    </div>
  );
}
