"use client";

import Image from "next/image";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useRef, useState } from "react";
import { DeleteIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload } from "@/components/icons";

type FormValues = {
  name: string;
  email: string;
  phone: string;
  address: string;
  avatar?: File;
};

export default function ProfileOverview() {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { handleSubmit, control } = useForm<FormValues>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
    mode: "onChange",
  });

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      setFileError("Only JPG, JPEG, and PNG files are allowed.");
      e.target.value = ""; // Clear the file input
      return;
    }

    // Check file size (5MB)
    const MAX_FILE_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_FILE_SIZE) {
      setFileError(
        "File size exceeds 5MB limit. Please choose a smaller file."
      );
      e.target.value = "";
      return;
    }

    setFileError(null);

    // Create preview URL if file is acceptable
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result as string);
    };
    reader.readAsDataURL(file);

    try {
      const formPayload = new FormData();
    } catch (error: any) {}
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleDeletePreviewImage = async () => {
    setPreviewImage(null);
    setFileError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    try {
    } catch (error) {}
  };

  const onSubmit: SubmitHandler<FormValues> = async (formData) => {
    const formPayload = new FormData();

    // Append all form fields
    formPayload.append("name", formData.name);
    formPayload.append("email", formData.email);
    formPayload.append("phone", formData.phone);
    formPayload.append("address", formData.address);

    // Append the image file if it exists
    if (fileInputRef.current?.files?.[0]) {
      formPayload.append("avatar", fileInputRef.current.files[0]);
    }

    if (!previewImage) {
      formPayload.append("is_avatar_deleted", "true");
    }

    try {
    } catch (error) {}
  };

  return (
    <div className="bg-slate-50 border-slate-200 border rounded-2xl">
      <div className="font-semibold lg:text-2xl text-lg lg:py-6 lg:px-8 p-4 bg-slate-200 rounded-t-2xl">
        Profile Overview
      </div>

      {/* profile/upload */}
      <div className="lg:p-6 p-4">
        {/* Hidden file input */}

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageChange}
          accept=".jpg,.jpeg,.png"
          className="hidden"
          title="Upload your profile picture"
        />

        {/* image/button */}
        <div className="lg:mb-12 mb-6">
          <div className="flex gap-6 items-end">
            {/* Image with subtle overlay on hover */}
            <div className="relative group w-36 h-36 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200">
              {previewImage &&
                !previewImage.endsWith("avatars/default.png") && (
                  <button
                    onClick={handleDeletePreviewImage}
                    type="button"
                    title="Delete image"
                    className="absolute top-2 right-2 z-10 p-1.5 bg-red-500 rounded-full shadow-md hover:bg-red-600 transition-all opacity-0 group-hover:opacity-100"
                  >
                    <DeleteIcon className="text-white w-4 h-4" />
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
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                  </>
                )}
              </div>
            </div>

            <Button
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

        {/* form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-x-6 gap-y-4 lg:mb-6 mb-4">
            {/*  name */}
            <div className="col-span-2">
              <label className="mb-1 block">Name</label>
              <Controller
                control={control}
                name="name"
                rules={{ required: "name is required" }}
                render={({
                  field: { onChange, value, onBlur },
                  fieldState: { error },
                }) => (
                  <Input
                    type="text"
                    className="bg-white"
                    placeholder="Enter name"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    errorText={error?.message}
                  />
                )}
              />
            </div>

            {/* email */}
            <div className="lg:col-span-1 col-span-2">
              <label htmlFor="email" className="mb-1 block">
                Email
              </label>
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
                    className="bg-white"
                    placeholder="Enter email address"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    errorText={error?.message}
                  />
                )}
              />
            </div>

            {/* phone number */}
            <div className="lg:col-span-1 col-span-2">
              <label className="mb-1 block">Phone Number</label>
              <Controller
                control={control}
                name="phone"
                render={({
                  field: { onChange, value, onBlur },
                  fieldState: { error },
                }) => (
                  <Input
                    type="tel"
                    className="bg-white"
                    placeholder="Enter your phone number"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    errorText={error?.message}
                  />
                )}
              />
            </div>

            {/* Address */}
            <div className="col-span-2">
              <label className="mb-1 block">Address</label>
              <Controller
                control={control}
                name="address"
                render={({
                  field: { onChange, value, onBlur },
                  fieldState: { error },
                }) => (
                  <Input
                    type="text"
                    className="bg-white"
                    placeholder="Enter your address"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    errorText={error?.message}
                  />
                )}
              />
            </div>
          </div>

          <Button
            type="submit"
            className="min-w-32 w-full lg:w-fit"
            variant="secondary"
          >
            Save Changes
          </Button>
        </form>
      </div>
    </div>
  );
}
