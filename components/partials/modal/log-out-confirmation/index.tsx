"use client";

import { useState } from "react";
import Modal from "..";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Logout } from "@/components/icons";

const LogOutConfirmation = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className="inline-flex gap-2 text-sm font-medium text-slate-700 p-2.5 hover:text-red-500 hover:bg-red-100 w-full rounded-md transition-colors duration-200 cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <Logout className="size-5" />
        Logout
      </div>
      <Modal
        open={open}
        onOpenChange={() => setOpen(false)}
        classes={{ dialogContent: "sm:max-w-[604px]" }}
      >
        <div className="flex flex-col">
          <Image
            src={"/assets/auth/logout.svg"}
            alt="success"
            width={1000}
            height={700}
            className="h-auto max-w-60 w-full object-contain object-center mx-auto mb-6"
          />
          <h3 className="text-primary text-3xl font-semibold text-center mb-2">
            Are you sure you want to log out?
          </h3>
          <p className="text-slate-600 text-base font-normal text-center">
            You will need to log in again to access your account.
          </p>
          <div className="mt-10 flex justify-between gap-4 w-full">
            <Button
              type="button"
              variant="outline"
              className="rounded-full w-1/2"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="rounded-full w-1/2"
              variant="secondary"
            >
              Logout
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default LogOutConfirmation;
