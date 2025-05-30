"use client";

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { InputPassword } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { courseMenus } from "@/components/partials/header/constans";
import { usePathname } from "next/navigation";

type FormValues = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export default function AccountPassword() {
  const pathname = usePathname();

  const { handleSubmit, control, getValues } = useForm<FormValues>({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const payload = {
      current_password: data.oldPassword,
      password: data.newPassword,
      password_confirmation: data.confirmPassword,
    };
    try {
    } catch (error) {}
  };

  return (
    <>
      <div className="hidden lg:block font-semibold lg:text-2xl text-lg lg:py-6 lg:px-8 p-4 bg-slate-200 rounded-t-2xl capitalize">
        {courseMenus.find((menu) => menu.href === pathname)?.label}
      </div>
      <div className="flex flex-col gap-4 lg:gap-6 p-4 lg:p-6">
        <div className="flex flex-col gap-2">
          <h3 className="text-primary text-lg lg:text-2xl font-semibold">
            Change Password
          </h3>
          <p className="text-slate-800 text-base">
            Update your account password to keep your profile secure.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* old password */}
          <div className="mb-4">
            <Controller
              control={control}
              name="oldPassword"
              rules={{
                required: "Old password is required",
                minLength: { value: 8, message: "Minimum length is 8" },
              }}
              render={({
                field: { onChange, value, onBlur },
                fieldState: { error },
              }) => (
                <div className="flex flex-col gap-2">
                  <Label htmlFor="oldPassword">
                    Current Password<span className="text-inherit">*</span>
                  </Label>
                  <InputPassword
                    id="oldPassword"
                    className="bg-white"
                    placeholder="Enter your old password"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    errorText={error?.message}
                  />
                </div>
              )}
            />
          </div>

          {/* new password */}
          <div className="mb-4">
            <Controller
              control={control}
              name="newPassword"
              rules={{
                required: "New password is required",
                minLength: { value: 8, message: "Minimum length is 8" },
              }}
              render={({
                field: { onChange, value, onBlur },
                fieldState: { error },
              }) => (
                <div className="flex flex-col gap-2">
                  <Label htmlFor="newPassword">
                    New Password<span className="text-inherit">*</span>
                  </Label>
                  <InputPassword
                    id="newPassword"
                    className="bg-white"
                    placeholder="Enter new password"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    errorText={error?.message}
                  />
                </div>
              )}
            />
          </div>

          {/* confirm password */}
          <div className="mb-4 lg:mb-6">
            <Controller
              control={control}
              name="confirmPassword"
              rules={{
                required: "Confirm password is required",
                minLength: { value: 8, message: "Minimum length is 8" },
                validate: (value) => {
                  if (value === getValues("newPassword")) {
                    return true;
                  }
                  return "Passwords do not match";
                },
              }}
              render={({
                field: { onChange, value, onBlur },
                fieldState: { error },
              }) => (
                <div className="flex flex-col gap-2">
                  <Label htmlFor="confirmPassword">
                    Confirm New Password<span className="text-inherit">*</span>
                  </Label>
                  <InputPassword
                    id="confirmPassword"
                    className="bg-white"
                    placeholder="Enter confirm new password"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    errorText={error?.message}
                  />
                </div>
              )}
            />
          </div>

          <Button
            type="submit"
            variant="secondary"
            className="w-full lg:w-fit mt-4 mb-4 lg:mb-6"
          >
            Update Password
          </Button>
        </form>
      </div>
    </>
  );
}
