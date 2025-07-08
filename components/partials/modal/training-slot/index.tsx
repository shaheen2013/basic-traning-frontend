/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Modal from "..";
import { Button } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import moment from "moment";

const price = 549;

const TrainingSlot = ({ children, className, batches }: any) => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);

  console.log("batches:", batches);
  const {
    handleSubmit,
    control,
    watch,
    formState: { isValid },
    reset,
  } = useForm({
    defaultValues: {
      trainingSlot: "",
      numberOfTrainees: undefined,
    },
    mode: "onChange",
  });

  console.log("isValid:", isValid);

  const numberOfTrainees = watch("numberOfTrainees") || 0;
  const selectedTrainingSlot = watch("trainingSlot");

  const onSubmit = async (data: any) => {
    if (step === 1) {
      setStep(2);
    } else {
      try {
        // Handle final submission
        console.log("Form submitted:", data);
        setOpen(false);
        setStep(1);
        reset();
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className={cn(
          "cursor-pointer flex items-center justify-center",
          className
        )}
        role="button"
        tabIndex={0}
      >
        {children}
      </div>

      <Modal open={open} onOpenChange={setOpen}>
        <div className="flex items-center justify-center gap-4">
          <div className="flex gap-2 items-center">
            <Image
              src="/icons/batch-step.svg"
              alt="select batch"
              width={32}
              height={32}
              className="h-auto max-w-8 w-full object-contain object-center"
            />

            <span className="text-blue-600 text-base font-semibold">
              Select batch
            </span>
          </div>

          <div
            className={cn(
              "w-12 bg-slate-300 h-0.5",
              step === 2 && "bg-blue-600"
            )}
          />
          <div className="flex gap-2 items-center">
            <div
              className={cn(
                "size-8 rounded-full bg-transparent border-2 border-slate-300 flex items-center justify-center",
                step === 2 && "bg-blue-600 border-blue-200"
              )}
            >
              <div
                className={cn(
                  "size-3 rounded-full bg-slate-300",
                  step === 2 && "bg-white"
                )}
              ></div>
            </div>
            <span
              className={cn(
                "text-primary text-base font-semibold",
                step === 2 && "text-blue-600"
              )}
            >
              Number of trainee
            </span>
          </div>
        </div>
        {step === 1 && (
          <form
            className="flex flex-col gap-3 lg:gap-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-2">
              <h3 className="text-primary text-2xl lg:text-4xl font-semibold">
                Select your training start date
              </h3>
              <p className="text-slate-600 text-base lg:text-xl">
                Pick the start date that works best for your team. We run fresh
                sessions every month.
              </p>
            </div>

            <Controller
              name="trainingSlot"
              control={control}
              rules={{ required: "Please select a training slot" }}
              render={({ field, fieldState: { error } }) => (
                <div className="space-y-2">
                  <RadioGroup
                    className="gap-0 overflow-y-auto max-h-[300px] lg:max-h-[400px]"
                    value={field.value}
                    onValueChange={field.onChange}
                    aria-label="Training slots"
                  >
                    {batches.map((slot: any) => (
                      <Label
                        key={slot.id}
                        htmlFor={String(slot.id)}
                        className="flex items-center space-x-2 border-x border-t border-slate-300 px-6 py-4 hover:bg-slate-50 transition-colors last:border-b"
                      >
                        <RadioGroupItem value={slot.id} id={String(slot.id)} />
                        <span className="cursor-pointer text-slate-800 text-sm lg:text-xl font-medium">
                          {moment(slot.start_date).format("MMMM DD")} -{" "}
                          {moment(slot.end_date).format("MMMM DD")}
                        </span>
                      </Label>
                    ))}
                  </RadioGroup>
                  {error && (
                    <p className="text-red-500 text-sm">{error.message}</p>
                  )}
                </div>
              )}
            />

            <div className="mt-4 flex justify-between gap-4 w-full">
              <Button
                type="button"
                variant="outline"
                size="xl"
                className="rounded-full w-1/2"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size="xl"
                className="rounded-full w-1/2"
                disabled={!selectedTrainingSlot}
              >
                Continue
              </Button>
            </div>
          </form>
        )}

        {step === 2 && (
          <form
            className="flex flex-col gap-3 lg:gap-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-2">
              <h3 className="text-primary text-2xl lg:text-4xl font-semibold">
                Add Trainees & Review Cost ${price}/p
              </h3>
              <p className="text-slate-600 text-base lg:text-xl">
                Enter how many trainees you’re enrolling to calculate your total
                fee.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="numberOfTrainees">Number of Trainees *</Label>
              <Controller
                name="numberOfTrainees"
                control={control}
                rules={{
                  required: "Number of trainees is required",
                  min: {
                    value: 1,
                    message: "Must be at least 1 trainee",
                  },
                  max: {
                    value: 10000,
                    message: "Must be at most 10000 trainees",
                  },
                  validate: (value) =>
                    Number.isInteger(Number(value)) || "Must be a whole number",
                }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <div className="space-y-1">
                    <Input
                      id="numberOfTrainees"
                      type="number"
                      min="1"
                      max="10000"
                      step="1"
                      placeholder="Enter number of trainees"
                      className="rounded-full"
                      value={value ?? ""}
                      onChange={(e) =>
                        onChange(
                          e.target.value === ""
                            ? undefined
                            : Number(e.target.value)
                        )
                      }
                      errorText={error?.message}
                    />
                  </div>
                )}
              />
            </div>

            {numberOfTrainees > 0 && isValid && (
              <div className="flex items-center justify-between px-4 py-2.5 text-3xl font-semibold border rounded-lg bg-amber-50 border-amber-500 text-amber-500">
                <div>
                  {numberOfTrainees} × ${price}
                </div>
                <div>= ${price * numberOfTrainees}</div>
              </div>
            )}

            <div className="mt-4 flex justify-between gap-4 w-full">
              <Button
                type="button"
                variant="outline"
                size="xl"
                className="rounded-full w-1/2"
                onClick={handleBack}
              >
                Back
              </Button>
              <Button
                type="submit"
                size="xl"
                className="rounded-full w-1/2"
                disabled={!isValid}
              >
                Continue
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </>
  );
};

export default TrainingSlot;
