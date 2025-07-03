/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ChevronLeft, Delete, Upload } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

export default function CreateMessage() {
  const [file, setFile] = useState<File | null>(null);
  const { handleSubmit, control } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      message: "",
      attachment: null as File | null,
    },
  });

  const onSubmit = (data: any) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("message", data.message);

    if (file) {
      formData.append("attachment", file);
    }

    // Now you can send formData to your API
    console.log("formData", formData);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const removeFile = () => {
    setFile(null);
  };

  return (
    <>
      <div className="flex items-center gap-2 font-semibold lg:text-2xl text-lg lg:py-6 lg:px-8 p-4 bg-slate-200 rounded-t-2xl capitalize">
        <Link href="/messages" className="flex lg:hidden">
          <ChevronLeft className="size-6 text-primary" />
        </Link>
        Create a Message
      </div>

      <div className="bg-slate-50 p-4 lg:p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">
              Title<span>*</span>
            </Label>
            <Controller
              control={control}
              name="title"
              rules={{ required: "Title is required" }}
              render={({ field, fieldState: { error } }) => (
                <Input
                  id="title"
                  type="text"
                  className="bg-white"
                  placeholder="Enter title"
                  {...field}
                  errorText={error?.message}
                />
              )}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">
              Message<span>*</span>
            </Label>
            <Controller
              control={control}
              name="message"
              rules={{ required: "Message is required" }}
              render={({ field, fieldState: { error } }) => (
                <Textarea
                  id="message"
                  className="bg-white min-h-80"
                  placeholder="Enter message"
                  {...field}
                  errorText={error?.message}
                />
              )}
            />
          </div>

          {/* Single File Upload Section */}
          <div className="space-y-2">
            <Label htmlFor="attachment">Attachment</Label>
            <div className="flex flex-col gap-2">
              <label className="cursor-pointer w-full block">
                <div className="flex border border-slate-300 rounded-lg bg-white w-full overflow-hidden">
                  <span className="inline-flex w-fit items-center px-4 py-2 bg-slate-300 text-sm font-medium text-primary">
                    <Upload className="size-5 mr-2" /> Upload File
                  </span>
                  <span className="inline-flex grow items-center px-4 py-2 bg-white  shadow-sm text-sm font-medium text-gray-700 ">
                    Choose File
                  </span>
                </div>
                <input
                  id="attachment"
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.txt"
                />
              </label>
              <span className="text-sm text-gray-500 ">
                PDF, JPG, PNG, DOC, DOCX, TXT (Max 10MB)
              </span>
            </div>

            {/* Display selected file */}
            {file && (
              <div className="mt-4">
                <div className="flex items-center justify-between p-2 bg-white rounded border">
                  <span className="text-sm truncate max-w-xs">{file.name}</span>
                  <button
                    type="button"
                    title="Remove file"
                    onClick={removeFile}
                    className="text-red-500 hover:text-red-700 cursor-pointer"
                  >
                    <Delete className="size-5 text-inherit" />
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-4 mt-6">
            <Button
              type="button"
              variant="outline"
              className="min-w-32 w-full lg:w-fit "
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="min-w-32 w-full lg:w-fit"
              variant="secondary"
            >
              Create
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
