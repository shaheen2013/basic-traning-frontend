"use client";

import "filepond/dist/filepond.min.css";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import {
  ChevronRight,
  Download,
  QuestionCircle,
  Timer,
} from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatSecondsToReadableTime } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Image from "next/image";

interface FormValues {
  answers: {
    files?: File[];
    link?: string;
    note?: string;
  };
}

const assignMentResponse = {
  title: "Assignment 1",
  duration: 120000,
  media: {
    type: "video",
    url: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  description:
    "Mount Everest is considered one of the most challenging natural wonders on Earth. Describe what makes it so significant and what challenges climbers face when attempting to summit it.",
};

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

export default function Assignment() {
  const [files, setFiles] = useState<File[]>([]);
  const [assignmentTimer, setAssignmentTimer] = useState<number | null>(null);

  const { handleSubmit, control, setValue } = useForm<FormValues>({
    defaultValues: {
      answers: {
        files: [],
        link: "",
        note: "",
      },
    },
    mode: "onChange",
  });

  const onSubmit = (data: FormValues) => {
    const formData = new FormData();

    // Append files if they exist
    if (data.answers.files && data.answers.files.length > 0) {
      data.answers.files.forEach((file) => {
        formData.append("files", file);
      });
    }

    // Append other fields
    formData.append("link", data.answers.link || "");
    formData.append("note", data.answers.note || "");

    console.log("Form Data:", formData);
  };

  useEffect(() => {
    // Update form value when files change
    setValue("answers.files", files);
  }, [files, setValue]);

  useEffect(() => {
    if (assignMentResponse.duration) {
      setAssignmentTimer(assignMentResponse.duration);
      const interval = setInterval(() => {
        setAssignmentTimer((prev) => {
          if (prev === null) return null;
          if (prev <= 1) {
            clearInterval(interval);
            handleSubmit(onSubmit)();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [handleSubmit]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-between items-center mb-3">
        <div className="flex gap-2 text-slate-600 items-center">
          <QuestionCircle className="size-5" />
          <h3 className="text-lg font-semibold">Assignment</h3>
        </div>
        {assignmentTimer !== null && (
          <div className="flex gap-2 text-blue-500">
            <Timer className="size-5" />
            Time left {formatSecondsToReadableTime(assignmentTimer)}
          </div>
        )}
      </div>

      <p className="text-lg text-primary font-semibold mb-4">
        {assignMentResponse.title}
      </p>
      <div className="py-4 border-t border-slate-200 flex flex-col gap-3">
        <p className="text-slate-700 text-base font-medium">
          {assignMentResponse.description}
        </p>

        <div className="flex flex-col gap-2">
          <Label>File</Label>
          <div className="bg-white rounded-lg p-4 border border-slate-200 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Image
                src="/assets/icons/pdf.svg"
                alt="pdf file"
                width={40}
                height={40}
                className="size-10 object-cover object-center"
              />
              <div className="flex flex-col justify-between">
                <h3 className="text-slate-700 text-sm font-semibold">
                  Email.CSV
                </h3>
                <span className="text-slate-700 text-sm ">200 kB</span>
              </div>
            </div>
            <Download className="size-5 text-slate-500" />
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-4 py-4 border-t border-slate-200">
        <div className="flex flex-col gap-2">
          <Label>Upload file</Label>
          <FilePond
            files={files}
            onupdatefiles={setFiles}
            name="files"
            maxFiles={1}
            acceptedFileTypes={["application/pdf"]}
            labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label>Link (Optional)</Label>
          <Controller
            control={control}
            name="answers.link"
            rules={{
              pattern: {
                value:
                  /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
                message: "Invalid Link",
              },
            }}
            render={({
              field: { onChange, value, onBlur },
              fieldState: { error },
            }) => (
              <Input
                classes={{ input: "bg-white" }}
                placeholder="Enter Assignment Link"
                onChange={onChange}
                onBlur={onBlur}
                value={value || ""}
                errorText={error?.message}
              />
            )}
          />
        </div>
        <div className="flex flex-col gap-2 col-span-full">
          <Label htmlFor="note">Note</Label>
          <Controller
            control={control}
            name="answers.note"
            render={({
              field: { onChange, value, onBlur },
              fieldState: { error },
            }) => (
              <Textarea
                id="note"
                placeholder="Enter note"
                className="col-span-full min-h-40 rounded-lg"
                onChange={onChange}
                onBlur={onBlur}
                value={value || ""}
              />
            )}
          />
        </div>
      </div>

      <div className="flex justify-end mt-10">
        <Button type="submit" variant="secondary">
          Submit
          <ChevronRight className="size-5" />
        </Button>
      </div>
    </form>
  );
}
