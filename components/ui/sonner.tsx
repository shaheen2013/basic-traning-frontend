"use client";

import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  return <Sonner richColors className="toaster group" {...props} />;
};

export { Toaster };
