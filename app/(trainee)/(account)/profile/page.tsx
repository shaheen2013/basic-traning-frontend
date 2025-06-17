/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { useForm, Controller } from "react-hook-form";
import { useEffect, useRef, useCallback, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Delete, Upload } from "@/components/icons";
import { courseMenus } from "@/components/partials/header/constans";
import { usePathname } from "next/navigation";
import { useMe } from "@/services/hook";
import {
  useUpdateProfileMutation,
  useUploadAvatarMutation,
} from "@/features/auth/meApi";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";

const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png"];
const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB

export default function ProfileOverview() {
  const { data: userData } = useMe({});
  const pathname = usePathname();
  const [previewImage, setPreviewImage] = useState(userData?.avatar || null);
  const [fileError, setFileError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const [uploadAvatar, { isLoading: isUploading }] = useUploadAvatarMutation();

  const { handleSubmit, control, reset, setError } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
  });

  const currentMenuLabel = useMemo(
    () => courseMenus.find((menu) => menu.href === pathname)?.label,
    [pathname]
  );

  const handleImageChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        setFileError("Only JPG, JPEG, and PNG files are allowed.");
        e.target.value = "";
        return;
      }

      if (file.size > MAX_FILE_SIZE) {
        setFileError(
          "File size exceeds 3MB limit. Please choose a smaller file."
        );
        e.target.value = "";
        return;
      }

      setFileError(null);

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);

      try {
        const formPayload = new FormData();
        formPayload.append("avatar", file);
        await uploadAvatar(formPayload).unwrap();
      } catch (error: any) {
        const errors = error?.data?.errors;
        if (errors?.avatar?.length) {
          setFileError(errors.avatar.join(", "));
        }
      }
    },
    [uploadAvatar]
  );

  const triggerFileInput = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleDeletePreviewImage = useCallback(async () => {
    setPreviewImage(null);
    setFileError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    try {
      const response = await uploadAvatar({
        should_delete_avatar: true,
      }).unwrap();

      if (response?.success) {
        setPreviewImage(response?.data?.null_avatar_url || null);
      }
    } catch (error: any) {
      const errors = error?.data?.errors;
      if (errors?.avatar?.length) {
        setFileError(errors.avatar.join(", "));
      }
    }
  }, [uploadAvatar]);

  const onSubmit = useCallback(
    async (data: any) => {
      const payload = {
        name: data.name,
        phone: data.phone,
        address: data.address,
      };

      try {
        const response = await updateProfile(payload).unwrap();
        if (response?.success) {
          toast.success(response?.message);
          reset(payload);
        }
      } catch (error: any) {
        const errors = error?.data?.errors;
        if (!errors) return;

        if (errors.name?.length) {
          setError("name", {
            type: "manual",
            message: errors.name.join(", "),
          });
        }
        if (errors.phone?.length) {
          setError("phone", {
            type: "manual",
            message: errors.phone.join(", "),
          });
        }
        if (errors.address?.length) {
          setError("address", {
            type: "manual",
            message: errors.address.join(", "),
          });
        }
      }
    },
    [updateProfile, reset, setError]
  );

  // Set default values from user data if available
  useEffect(() => {
    if (userData) {
      reset({
        name: userData.name || "",
        email: userData.email || "",
        phone: userData.phone || "",
        address: userData.address || "",
      });
      setPreviewImage(userData.avatar ?? null);
    }
  }, [userData, reset]);

  return (
    <>
      <div className="hidden lg:block font-semibold lg:text-2xl text-lg lg:py-6 lg:px-8 p-4 bg-slate-200 rounded-t-2xl capitalize">
        {currentMenuLabel}
      </div>
      <div className="lg:p-6 p-4">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageChange}
          accept=".jpg,.jpeg,.png"
          className="hidden"
          title="Upload your profile picture"
        />

        <div className="lg:mb-12 mb-6">
          <div className="flex gap-6 items-end">
            <div className="relative group w-36 h-36 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200">
              {previewImage?.includes(
                process.env.NEXT_PUBLIC_API_BASE_URL ?? ""
              ) && (
                <button
                  onClick={handleDeletePreviewImage}
                  type="button"
                  title="Delete image"
                  className="cursor-pointer absolute top-2 right-2 z-10 p-1.5 bg-red-500 rounded-full shadow-md hover:bg-red-600 transition-all opacity-0 group-hover:opacity-100"
                >
                  <Delete className="text-white w-4 h-4" />
                </button>
              )}

              <div className="relative w-full h-full bg-gray-50">
                {previewImage && (
                  <>
                    <Image
                      src={previewImage}
                      alt="profile picture"
                      fill
                      className="object-cover"
                      priority
                      sizes="144px"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                  </>
                )}
              </div>
            </div>

            <Button
              disabled={isUploading}
              type="button"
              onClick={triggerFileInput}
              className="has-[>svg]:px-6"
            >
              <span>Upload</span>
              <Upload className="size-5 text-white ml-2" />
            </Button>
          </div>
          {fileError && (
            <p className="text-red-500 text-sm mt-3">{fileError}</p>
          )}
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-x-6 gap-y-4 lg:mb-6 mb-4">
            <div className="col-span-2 flex flex-col gap-2">
              <Label htmlFor="name">Name</Label>
              <Controller
                control={control}
                name="name"
                rules={{ required: "Name is required" }}
                render={({ field, fieldState: { error } }) => (
                  <Input
                    id="name"
                    type="text"
                    className="bg-white"
                    placeholder="Enter name"
                    {...field}
                    errorText={error?.message}
                  />
                )}
              />
            </div>

            <div className="lg:col-span-1 col-span-2 flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Controller
                control={control}
                name="email"
                render={({ field }) => (
                  <Input
                    id="email"
                    type="text"
                    className="bg-white cursor-not-allowed"
                    disabled
                    placeholder="Enter email address"
                    {...field}
                  />
                )}
              />
            </div>

            <div className="lg:col-span-1 col-span-2 flex flex-col gap-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Controller
                control={control}
                name="phone"
                render={({ field, fieldState: { error } }) => (
                  <Input
                    type="tel"
                    className="bg-white"
                    placeholder="Enter your phone number"
                    {...field}
                    errorText={error?.message}
                  />
                )}
              />
            </div>

            <div className="col-span-2 flex flex-col gap-2">
              <Label htmlFor="address">Address</Label>
              <Controller
                control={control}
                name="address"
                render={({ field, fieldState: { error } }) => (
                  <Input
                    id="address"
                    type="text"
                    className="bg-white"
                    placeholder="Enter your address"
                    {...field}
                    errorText={error?.message}
                  />
                )}
              />
            </div>
          </div>

          <Button
            disabled={isLoading}
            type="submit"
            className="min-w-32 w-full lg:w-fit"
            variant="secondary"
          >
            Save Changes
          </Button>
        </form>
      </div>
    </>
  );
}
