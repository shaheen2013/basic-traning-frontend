/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Modal from "..";
import { Button } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { trainingSlots } from "./constant";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import Image from "next/image";

interface TrainingSlotProps {
  children?: React.ReactNode;
  className?: string;
}

interface FirstFormData {
  email: string;
  trainingSlot: string;
}

interface SecondFormData {
  numberOfTrainees: number;
}

const PRICE = 549;

const TrainingSlot = ({ children, className }: TrainingSlotProps) => {
  const [open, setOpen] = useState(false);
  const [openSecondModal, setOpenSecondModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState("");

  const { handleSubmit, control, reset } = useForm<FirstFormData>({
    defaultValues: {
      trainingSlot: "",
    },
    mode: "onChange",
  });

  const {
    handleSubmit: handleSubmitSecond,
    reset: resetSecond,
    control: controlSecond,
    watch,
  } = useForm<SecondFormData>({
    defaultValues: {
      numberOfTrainees: 1,
    },
    mode: "onChange",
  });

  const watchNumberOfTrainees = watch("numberOfTrainees");

  console.log(typeof watchNumberOfTrainees);
  const onSubmitFirstForm = async (data: FirstFormData) => {
    setSelectedSlot(data.trainingSlot);
    setOpenSecondModal(true);
    setOpen(false);
  };

  const onSubmitSecondForm = async (data: SecondFormData) => {
    // Handle final submission with both forms' data
    const payload = {
      trainingSlot: selectedSlot,
      numberOfTrainees: data.numberOfTrainees,
    };
    console.log("Submitting:", payload);
    // Add actual submission logic
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

      <FirstModal
        open={open}
        onClose={() => (setOpen(false), reset(), resetSecond())}
        onSubmit={handleSubmit(onSubmitFirstForm)}
        control={control}
      />

      <SecondModal
        open={openSecondModal}
        onClose={() => (setOpenSecondModal(false), setOpen(true))}
        onSubmit={handleSubmitSecond(onSubmitSecondForm)}
        control={controlSecond}
        price={PRICE}
        numberOfTrainees={watchNumberOfTrainees}
      />
    </>
  );
};

// Extracted First Modal Component
const FirstModal = ({ open, onClose, onSubmit, control }: any) => (
  <Modal open={open} onOpenChange={onClose}>
    <form className="flex flex-col gap-3 lg:gap-5" onSubmit={onSubmit}>
      <h3 className="mb-2 text-primary text-xl lg:text-3xl font-semibold">
        Select your training start date - ${PRICE}
      </h3>

      <Controller
        name="trainingSlot"
        control={control}
        rules={{ required: "Please select a training slot" }}
        render={({ field, fieldState: { error } }) => (
          <>
            <RadioGroup
              className="gap-0 overflow-y-auto max-h-[300px] lg:max-h-[400px]"
              value={field.value}
              onValueChange={field.onChange}
            >
              {trainingSlots.map((slot) => (
                <Label
                  key={slot.value}
                  htmlFor={String(slot.id)}
                  className="flex items-center space-x-2 border-x border-t border-slate-300 px-6 py-4 hover:bg-slate-50 transition-colors last:border-b"
                >
                  <RadioGroupItem value={slot.value} id={String(slot.id)} />
                  <span className="cursor-pointer text-slate-800 text-sm lg:text-xl font-medium">
                    {slot.label}
                  </span>
                </Label>
              ))}
            </RadioGroup>
            {error && <p className="text-red-500 text-sm">{error.message}</p>}
          </>
        )}
      />

      <StripeNote />

      <div className="mt-4 flex justify-between gap-4 w-full">
        <Button
          type="button"
          variant="outline"
          size="xl"
          className="rounded-full w-1/2"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button type="submit" size="xl" className="rounded-full w-1/2">
          Continue
        </Button>
      </div>
    </form>
  </Modal>
);

// Extracted Second Modal Component
const SecondModal = ({
  open,
  onClose,
  onSubmit,
  control,
  price,
  numberOfTrainees,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  control: any;
  price: number;
  numberOfTrainees: number;
}) => (
  <Modal open={open} onOpenChange={onClose}>
    <form
      className="flex flex-col gap-3 lg:gap-5 max-w-[600px] w-full"
      onSubmit={onSubmit}
    >
      <Image
        src={"/icons/stripe.png"}
        alt="stripe"
        width={1000}
        height={700}
        className="h-auto max-w-28 w-full object-contain object-center"
      />
      <h3 className="text-primary text-xl lg:text-4xl font-semibold">
        Secure Your Spot with a One-Time Payment
      </h3>
      <p className="text-slate-700 text-sm lg:text-xl font-medium">
        You’re just one step away from unlocking full access to your training.
        Pay securely via Stripe to continue.
      </p>

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
          }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Input
              id="numberOfTrainees"
              type="number"
              min="1"
              max="10000"
              placeholder="Enter number of trainees"
              className="rounded-full"
              value={value}
              onChange={onChange}
              errorText={error?.message}
            />
          )}
        />
      </div>
      {numberOfTrainees > 0 && (
        <p className="text-primary text-lg lg:text-2xl font-medium font-inter truncate">
          Pricing: ${price} × {numberOfTrainees} = ${price * numberOfTrainees}
        </p>
      )}
      <div className="mt-4 flex justify-between gap-4 w-full">
        <Button
          type="button"
          variant="outline"
          size="xl"
          className="rounded-full w-1/2"
          onClick={onClose}
        >
          Back
        </Button>
        <Button type="submit" size="xl" className="rounded-full w-1/2">
          Proceed
        </Button>
      </div>
    </form>
  </Modal>
);
// Extracted Stripe Note Component
const StripeNote = () => (
  <div className="bg-[#FFFAEB] py-2.5 border border-[#F79009] rounded">
    <p className="text-[#F79009] text-xs lg:text-lg text-center font-medium">
      Note: Secure checkout powered by{" "}
      <span className="font-vollkorn italic font-bold">Stripe</span>.
    </p>
  </div>
);

export default TrainingSlot;
