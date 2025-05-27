"use client";

import SuccessResetPassword from "@/components/partials/modal/success-reset-passowrd";
import { Button } from "@/components/ui/button";
import { InputPassword } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Controller, useForm } from "react-hook-form";

export default function ResetPassword() {
  const { handleSubmit, control } = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    const payload = {
      email: data.email,
    };

    try {
    } catch (error) {}
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
              <Button className="w-full rounded-full" size="2xl" type="submit">
                Reset Password
              </Button>
            </form>
          </div>
        </div>
      </div>
      <SuccessResetPassword />
    </>
  );
}
