"use client";

import { useState } from "react";
import Modal from "..";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ArrowDownLoad } from "@/components/icons";
import Link from "next/link";

const DownloadCertificate = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="secondary"
        onClick={() => setOpen(true)}
        className="w-full lg:w-fit"
      >
        <ArrowDownLoad className="size-5 text-white" />
        Download Certificate
      </Button>
      <Modal
        open={open}
        onOpenChange={() => setOpen(false)}
        classes={{ dialogContent: "sm:max-w-[604px]" }}
      >
        <div className="flex flex-col">
          <Image
            src={"/assets/course/download-certificate.svg"}
            alt="success"
            width={1000}
            height={700}
            className="h-auto max-w-60 w-full object-contain object-center mx-auto mb-6"
          />
          <h3 className="text-primary text-3xl font-semibold text-center mb-2">
            Are You Sure You Want to Download the Certificate?
          </h3>
          <p className="text-slate-600 text-base font-normal text-center">
            Once downloaded, the certificate cannot be changed. Please
            double-check your name and other details before proceeding.
          </p>
          <div className="mt-10 flex justify-between gap-4 w-full">
            <Button
              type="button"
              variant="outline"
              className="rounded-full w-1/2"
              asChild
            >
              <Link href="/dashboard/profile">Edit Profile</Link>
            </Button>
            <Button
              type="submit"
              className="rounded-full w-1/2"
              variant="secondary"
            >
              Download
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DownloadCertificate;
