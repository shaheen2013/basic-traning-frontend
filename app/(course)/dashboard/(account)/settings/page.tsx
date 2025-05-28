"use client";

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { InputPassword } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function AccountPassword() {
  type FormValues = {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  };

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
    <div className="bg-slate-50 border-slate-200 border rounded-2xl flex flex-col gap-6">
      <div className="font-semibold lg:text-2xl text-lg lg:py-6 lg:px-8 p-4 bg-slate-200 rounded-t-2xl">
        Settings
      </div>
      <div className="flex flex-col gap-3 px-6">
        <h3 className="text-primary text-2xl font-semibold">Change Password</h3>
        <p className="text-slate-800 text-base">
          Update your account password to keep your profile secure.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="px-6">
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
                  Old Password<span className="text-inherit">*</span>
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
        <div className="mb-6">
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

        <Button type="submit" variant="secondary" className="mb-6">
          Update Password
        </Button>
      </form>
    </div>
  );
}
