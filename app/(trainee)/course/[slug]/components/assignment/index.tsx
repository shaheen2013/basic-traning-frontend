"use client";

import { ChevronRight, QuestionCircle, Timer } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { formatSecondsToReadableTime } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

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

export default function Assignment() {
  const [assignmentTimer, setAssignmentTimer] = useState<number | null>(null);

  const { handleSubmit, control } = useForm({
    defaultValues: {
      answers: {},
    },
    mode: "onChange",
  });

  const onSubmit = (data) => {
    console.log("Submitted Answers:", data.answers);
  };

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
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            {assignMentResponse.media.url}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-4 py-4 border-t border-slate-200">
        <div className="flex flex-col gap-2">
          <Label>Link(Optional)</Label>
          <Controller
            control={control}
            name="link"
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
                value={value}
                errorText={error?.message}
              />
            )}
          />
        </div>
        <div className="flex flex-col gap-2 col-span-full">
          <Label htmlFor="note">Note</Label>
          <Textarea
            id="note"
            placeholder="Enter note"
            className="col-span-full min-h-40"
          />
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-end mt-10">
        <Button type="submit" variant="secondary">
          Submit
          <ChevronRight className="size-5" />
        </Button>
      </div>
    </form>
  );
}
