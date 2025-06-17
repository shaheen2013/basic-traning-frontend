/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Modal from "..";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useForgotPasswordMutation } from "@/features/auth/passwordApi";
import { toast } from "sonner";

interface VerificationLinkSentProps {
  email?: string;
  onClose?: () => void;
}

const VerificationLinkSent = ({
  email,
  onClose,
}: VerificationLinkSentProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open && onClose) {
      onClose();
    }
  };

  const handleResend = async () => {
    if (!email) return;

    try {
      await forgotPassword({ email }).unwrap();
    } catch (error: any) {
      const errorMessage = error?.data?.message || "Failed to resend link";
      toast.error(errorMessage);
    }
  };

  return (
    <Modal
      open={isOpen}
      onOpenChange={handleOpenChange}
      classes={{ dialogContent: "sm:max-w-[496px] p-6 lg:p-8" }}
      aria-labelledby="verification-success-title"
    >
      <div className="flex flex-col items-center gap-6 lg:gap-8 text-center">
        {/* Success Illustration */}
        <div className="max-w-[240px] mx-auto">
          <Image
            src="/assets/auth/success-reset-password.svg"
            alt="Success illustration"
            width={280}
            height={200}
            className="w-full h-auto"
            priority
          />
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h2
            id="verification-success-title"
            className="text-2xl lg:text-3xl font-semibold text-primary"
          >
            Check Your Email
          </h2>

          <p className="text-muted-foreground">
            We&apos;ve sent a password reset link to{" "}
            {email ? (
              <span className="font-medium text-primary">{email}</span>
            ) : (
              "your email address"
            )}
            .
          </p>

          {email && (
            <p className="text-muted-foreground text-sm">
              Didn&apos;t receive the email?{" "}
              <button
                type="button"
                disabled={isLoading}
                className="text-primary font-medium hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleResend}
              >
                {isLoading ? "Sending..." : "Click to resend"}
              </button>
            </p>
          )}
        </div>

        {/* Actions */}
        <Button asChild className="w-full mt-4">
          <Link href="/login" onClick={() => setIsOpen(false)}>
            Back to Login
          </Link>
        </Button>
      </div>
    </Modal>
  );
};

export default VerificationLinkSent;
