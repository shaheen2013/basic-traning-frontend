import Image from "next/image";

export default function AuthRightSidebar() {
  return (
    <div className="w-full h-screen absolute inset-0">
      <Image
        src={`/assets/auth/auth.png`}
        className="w-full h-full object-cover object-center"
        alt="Auth Right Sidebar Image"
        fill
      />
    </div>
  );
}
