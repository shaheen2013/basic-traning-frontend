"use client";

import { useState } from "react";
import Modal from "..";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const SuccessResetPassword = () => {
  const [open, setOpen] = useState(true);

  return (
    <Modal
      open={open}
      onOpenChange={() => setOpen(false)}
      classes={{ dialogContent: "sm:max-w-[496px]" }}
    >
      <div className="flex flex-col gap-6 lg:gap-8">
        <Image
          src={"/assets/auth/success-reset-password.svg"}
          alt="success"
          width={1000}
          height={700}
          className="h-auto max-w-60 w-full object-contain object-center mx-auto"
        />
        <p className="text-primary text-lg lg:text-2xl font-medium text-center">
          Your password has been reset successfully! You can now log in with
          your credentials.
        </p>
        <Button type="button" className="rounded-full w-full" asChild>
          <Link href="/login">Go to Login</Link>
        </Button>
      </div>
    </Modal>
  );
};

export default SuccessResetPassword;
