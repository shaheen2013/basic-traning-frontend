"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input, InputPassword } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { Controller, useForm } from "react-hook-form";

interface LoginFormData {
  email: string;
  password: string;
  remember: boolean;
}

interface ApiError {
  data?: {
    errors?: {
      email?: string[];
      password?: string[];
    };
    message?: string;
  };
}

export default function Login() {
  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: "trainee@example.com",
      password: "password",
      remember: false,
    },
    mode: "onChange",
  });

  const [isLoading, setIsLoading] = React.useState(false);

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
        remember: data.remember,
        callbackUrl: "/dashboard",
      });

      if (result?.error) {
        setError("root", {
          type: "manual",
          message: result.error,
        });
      } else if (result?.url) {
        window.location.href = result.url;
      }
    } catch (error: unknown) {
      if (typeof error === "object" && error !== null && "data" in error) {
        const apiError = error as ApiError;

        if (apiError.data?.errors?.email) {
          setError("email", {
            type: "manual",
            message: apiError.data.errors.email.join(", "),
          });
        }

        if (apiError.data?.errors?.password) {
          setError("password", {
            type: "manual",
            message: apiError.data.errors.password.join(", "),
          });
        }

        if (apiError.data?.message) {
          setError("root", {
            type: "manual",
            message: apiError.data.message,
          });
        }
      } else {
        setError("root", {
          type: "manual",
          message: "An unexpected error occurred",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-between items-center h-screen px-4 pt-20">
      <div className="flex justify-center items-center">
        <div className="max-w-[600px] w-full">
          {/* Title */}
          <h2 className="text-primary font-semibold text-3xl lg:text-4xl font-inter mb-3 lg:mb-4">
            Welcome <span className="italic font-normal">Back</span>
          </h2>

          {/* Subtitle */}
          <p className="text-slate-800 text-base lg:text-lg font-normal mb-6 lg:mb-8">
            Log in to continue your training and access your personalized
            dashboard.
          </p>

          {/* Root Error Display */}
          {errors.root && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md">
              {errors.root.message}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Email Field */}
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
                      aria-invalid={!!error}
                    />
                  )}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="mb-2">
              <Controller
                control={control}
                name="password"
                rules={{
                  required: "Password is required",
                  // minLength: { value: 8, message: "Minimum length is 8" },
                  // pattern: {
                  //   value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                  //   message: "Must contain uppercase, lowercase & number",
                  // },
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
                      aria-invalid={!!error}
                    />
                  </div>
                )}
              />
            </div>

            {/* Remember/Forgot Password */}
            <div className="flex justify-between mb-8">
              <div className="flex items-center gap-1.5">
                <Controller
                  control={control}
                  name="remember"
                  render={({ field: { onChange, value, onBlur } }) => (
                    <Checkbox
                      id="remember"
                      checked={value}
                      onCheckedChange={onChange}
                      onBlur={onBlur}
                    />
                  )}
                />
                <Label htmlFor="remember">Keep me signed in.</Label>
              </div>

              <Link
                href="/forget-password"
                className="text-slate-800 font-semibold text-base lg:text-lg hover:underline underline-offset-4"
              >
                Forgot password
              </Link>
            </div>

            {/* Submit Button */}
            <Button
              className="w-full rounded-full"
              size="2xl"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-2 my-4">
            <div className="flex-1 border-t border-slate-300"></div>
            <div className="text-gray-800 text-sm font-medium">OR</div>
            <div className="flex-1 border-t border-slate-300"></div>
          </div>

          {/* Organization Login */}
          <Button
            className="w-full rounded-full bg-blue-600 hover:bg-blue-600/90"
            size="2xl"
            type="button"
          >
            Login as Organization
          </Button>

          {/* Sign Up Link */}
          <div className="flex justify-center mt-6">
            <p className="lg:text-base text-sm text-slate-800 font-normal">
              Don&apos;t have an Organization account?{" "}
              <Link
                href="/signup"
                className="font-semibold hover:underline underline-offset-4"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
