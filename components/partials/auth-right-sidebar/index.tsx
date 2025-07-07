import Image from "next/image";

export default function AuthRightSidebar() {
  return (
    <Image
      src={`/assets/auth/auth.png`}
      className="w-full h-auto object-cover object-center"
      alt="Auth Right Sidebar Image"
      width={1000}
      height={700}
    />
  );
}
