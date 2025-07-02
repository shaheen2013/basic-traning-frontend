"use client";

import { useState } from "react";
import Modal from "..";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { trainingSlots } from "./constant";
import { cn } from "@/lib/utils";

const TrainingSlot = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  const [open, setOpen] = useState(false);

  const { handleSubmit } = useForm<{
    email: string;
  }>({
    defaultValues: {
      email: "",
    },
    mode: "onChange",
  });

  const onSubmit = async () => {
    // const payload = {
    //   email: data.email,
    // };
    // try {
    // } catch (error) {
    //   setError("email", {
    //     type: "manual",
    //     message: error.message || "Email already exists",
    //   });
    // }
  };
  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className={cn(
          "pointer-cursor flex items-center justify-center",
          className
        )}
      >
        {children}
      </div>

      <Modal open={open} onOpenChange={() => setOpen(false)}>
        <form
          className="flex flex-col gap-3 lg:gap-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h3 className="mb-2 text-primary text-xl lg:text-4xl font-semibold">
            Reserve Your Training Slot – $549 One-Time Payment
          </h3>
          <div className="flex flex-col gap-2">
            <h4 className="text-primary text-lg lg:text-xl font-medium">
              Choose Your Training Start Date
            </h4>
            <p className="text-slate-600 text-sm lg:text-xl font-medium">
              Select a preferred start date from the available monthly batches.
            </p>
          </div>
          <RadioGroup
            defaultValue="june-01-20"
            className="gap-0 overflow-y-auto max-h-[300px] lg:max-h-[400px]"
          >
            {trainingSlots.map((slot) => (
              <div
                key={slot.value}
                className="cursor-pointer flex items-center space-x-2 border-x border-t border-slate-300 px-6 py-4 hover:bg-slate-50 transition-colors last:border-b"
              >
                <RadioGroupItem value={slot.value} id={String(slot.id)} />
                <Label
                  htmlFor={String(slot.id)}
                  className="cursor-pointer text-slate-800 text-sm lg:text-xl font-medium"
                >
                  {slot.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
          <div className="bg-[FFFAEB] py-2.5 border border-[#F79009]">
            <p className="text-[#F79009] text-xs lg:text-lg text-center font-medium">
              Note: Secure checkout powered by{" "}
              <span className="font-vollkorn italic font-bold">Stripe</span> .
            </p>
          </div>

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
            <Button type="submit" size="xl" className="rounded-full w-1/2">
              Proceed to Checkout
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default TrainingSlot;
