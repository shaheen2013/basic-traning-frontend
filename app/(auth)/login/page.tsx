"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input, InputPassword } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import React from "react";
import { Controller, useForm } from "react-hook-form";

export default function Login() {
  const { handleSubmit, control, setError } = useForm({
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    const payload = {
      email: data.email,
      password: data.password,
      remember: data.remember,
    };

    try {
    } catch (error) {}
  };

  return (
    <div className="flex flex-col justify-between items-center h-screen px-4 pt-12">
      <div className="flex justify-center items-center">
        <div className="max-w-[600px] w-full">
          {/* title */}
          <h2 className="text-primary font-semibold text-3xl lg:text-4xl font-inter mb-3 lg:mb-4">
            Welcome <span className="italic font-normal">Back</span>
          </h2>

          {/* subtitle  */}
          <p className="text-slate-800 text-base lg:text-lg font-normal mb-6 lg:mb-8">
            Log in to continue your training and access your personalized
            dashboard.
          </p>

          {/* form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* email */}
            <div className="mb-4">
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

            {/* password */}
            <div className="mb-2">
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
                    <Label htmlFor="email">Password *</Label>
                    <InputPassword
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

            {/* remember/forget password */}
            <div className="flex justify-between mb-8">
              <div className="flex items-center gap-1.5">
                <Controller
                  control={control}
                  name="remember"
                  render={({ field: { onChange, value, onBlur } }) => (
                    <Checkbox
                      id="remember"
                      variant="secondary"
                      checked={value}
                      onCheckedChange={onChange}
                      onBlur={onBlur}
                    />
                  )}
                />

                <Label htmlFor="remember">Keep me signed in.</Label>
              </div>

              <Link
                href="/forgot-password"
                className="text-slate-800 font-semibold text-base lg:text-lg hover:underline underline-offset-4"
              >
                Forgot password
              </Link>
            </div>

            {/* submit */}
            <Button className="w-full rounded-full" size="2xl" type="submit">
              Login
            </Button>
          </form>

          <div className="flex items-center gap-2 my-4">
            <div className="flex-1 border-t border-slate-300"></div>
            <div className="text-gray-800 text-sm font-medium">OR</div>
            <div className="flex-1 border-t border-slate-300"></div>
          </div>

          <Button
            className="w-full rounded-full bg-blue-600 hover:bg-blue-600/90"
            size="2xl"
            type="button"
          >
            Login as Organization
          </Button>

          <div className="flex justify-center mt-6">
            <p className="lg:text-base text-sm text-slate-800 font-normal">
              Don&apos;t have an Organization account?{" "}
              <Link href="/signup" className="font-semibold">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
