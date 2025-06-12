/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";

export default function ForgetPassword() {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      email: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: any ) => { // eslint-disable-line @typescript-eslint/no-explicit-any
    const payload = {
      email: data.email,
    };

    try {
    } catch (error) {}
  };

  return (
    <div className="flex flex-col justify-between items-center h-screen px-4 pt-20">
      <div className="flex justify-center items-center">
        <div className="max-w-[600px] w-full">
          {/* title */}
          <h2 className="text-primary font-semibold text-3xl lg:text-4xl font-inter mb-3 lg:mb-4">
            Forgot <span className="italic font-normal">Your Password?</span>
          </h2>

          {/* subtitle  */}
          <p className="text-slate-800 text-base lg:text-lg font-normal mb-6 lg:mb-8">
            No worries! Enter your email, and we will send you an Verification
            code to reset it.
          </p>

          {/* form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* email */}
            <div className="mb-6 lg:mb-8">
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email *</Label>

                <Controller
                  control={control}
                  name="email"
                  rules={{
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address",
                    },
                  }}
                  render={({
                    field: { onChange, value, onBlur },
                    fieldState: { error },
                  }) => (
                    <Input
                      id="email"
                      type="text"
                      placeholder="Enter email address"
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      errorText={error?.message}
                    />
                  )}
                />
              </div>
            </div>

            {/* submit */}
            <Button className="w-full rounded-full" size="2xl" type="submit">
              Send Verification Link
            </Button>
          </form>
          {/* footer */}

          <div className="flex justify-center mt-4 lg:mt-6">
            <p className="lg:text-base text-sm text-slate-800 font-normal">
              Back to{" "}
              <Link
                href="/login"
                className="font-semibold hover:underline underline-offset-4"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
