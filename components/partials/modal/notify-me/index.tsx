"use client";

import { useState } from "react";
import Modal from "..";
import { Button } from "@/components/ui/button";
import { AlertBadge } from "@/components/icons";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { useSubscribeMutation } from "@/features/newsletter/newsLetterApi";
import { toast } from "sonner";

const NotifyMe = () => {
  const [open, setOpen] = useState(false);
  const [subscribe, { isLoading }] = useSubscribeMutation();

  const { handleSubmit, control, setError } = useForm<{
    email: string;
  }>({
    defaultValues: {
      email: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: { email: string }) => {
    const payload = {
      email: data.email,
    };
    try {
      const resposne = await subscribe(payload).unwrap();
      toast.success(resposne.message);
    } catch (error) {
      setError("email", {
        type: "manual",
        message: (error as Error).message || "You are already subscribed",
      });
    }
  };
  return (
    <div>
      <Button
        className="w-full lg:w-fit rounded-full"
        size="2xl"
        onClick={() => setOpen(true)}
      >
        Get Notified Upcoming Classes
        <AlertBadge className="ml-2 size-6 text-white" />
      </Button>
      <Modal open={open} onOpenChange={() => setOpen(false)}>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2">
            <h3 className="mb-2 text-primary text-xl lg:text-4xl font-semibold">
              Stay Informed About Upcoming Sessions!
            </h3>
            <p className="text-slate-700 text-sm lg:text-xl font-medium">
              Enter your email address for notifications about our next
              available sessions, including course dates, topics, and exclusive
              early access.
            </p>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="email">
              Email <span className="text-primary">*</span>
            </Label>
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
                  classes={{ input: "bg-white" }}
                  placeholder="Enter email address"
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  errorText={error?.message}
                />
              )}
            />
          </div>
          <div className="mt-4 flex justify-between gap-4 w-full">
            <Button
              type="button"
              size="xl"
              variant={"outline"}
              className="rounded-full w-1/2"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="xl"
              className="rounded-full w-1/2"
              disabled={isLoading}
            >
              Notify Me
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default NotifyMe;
