/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import SuccessResetPassword from "@/components/partials/modal/success-reset-passowrd";
import { Button } from "@/components/ui/button";
import { InputPassword } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Controller, useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useResetPasswordMutation } from "@/features/auth/passwordApi";
import { useState } from "react";

export default function ResetPassword() {
  const [isOpen, setIsOpen] = useState(false);
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const searchParams = useSearchParams();
  const { handleSubmit, control, setError } = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: any) => {
    const email = searchParams.get("email");
    const token = searchParams.get("token");
    if (!email || !token) {
      toast.error("Email or token is missing in the URL parameters.");
      return;
    }
    const payload = {
      email,
      token,
      password: data.password,
      password_confirmation: data.confirmPassword,
    };

    try {
      const resposne = await resetPassword(payload).unwrap();
      if (resposne.success) {
        setIsOpen(true);
      }
    } catch (error: any) {
      const errors = error?.data?.errors;
      if (!errors) return;
      if (errors.password?.length) {
        setError("password", {
          type: "manual",
          message: errors.password.join(", "),
        });
      }
      if (errors.password_confirmation?.length) {
        setError("confirmPassword", {
          type: "manual",
          message: errors.password_confirmation.join(", "),
        });
      }
    }
  };

  return (
    <>
      <div className="flex flex-col justify-between items-center h-screen px-4 pt-20">
        <div className="flex justify-center items-center">
          <div className="max-w-[600px] w-full">
            {/* title */}
            <h2 className="text-primary font-semibold text-3xl lg:text-4xl font-inter mb-3 lg:mb-4">
              Reset Your <span className="italic font-normal">Password</span>
            </h2>

            {/* subtitle  */}
            <p className="text-slate-800 text-base lg:text-lg font-normal mb-6 lg:mb-8">
              Set a new password to regain access to your account and get back
              on track.
            </p>

            {/* form */}
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* password */}
              <div className="mb-3 lg:mb-4">
                <Controller
                  control={control}
                  name="password"
                  rules={{
                    required: "Password is required",
                    minLength: { value: 8, message: "Minimum length is 8" },
                  }}
                  render={({
                    field: { onChange, value, onBlur },
                    fieldState: { error },
                  }) => (
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="password">Password *</Label>
                      <InputPassword
                        id="password"
                        placeholder="Enter password"
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        errorText={error?.message}
                      />
                    </div>
                  )}
                />
              </div>

              {/*Confirm password */}
              <div className="mb-6 lg:mb-8">
                <Controller
                  control={control}
                  name="confirmPassword"
                  rules={{
                    required: "Password is required",
                    minLength: { value: 8, message: "Minimum length is 8" },
                  }}
                  render={({
                    field: { onChange, value, onBlur },
                    fieldState: { error },
                  }) => (
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="confirmPassword">
                        Confirm Password *
                      </Label>
                      <InputPassword
                        id="confirmPassword"
                        placeholder="Enter Confirm password"
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                        errorText={error?.message}
                      />
                    </div>
                  )}
                />
              </div>

              {/* submit */}
              <Button
                className="w-full rounded-full"
                size="2xl"
                disabled={isLoading}
                type="submit"
              >
                Reset Password
              </Button>
            </form>
          </div>
        </div>
      </div>
      {isOpen && <SuccessResetPassword />}
    </>
  );
}
