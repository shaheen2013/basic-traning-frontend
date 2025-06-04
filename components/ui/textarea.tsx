import * as React from "react";

import { cn } from "@/lib/utils";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  errorText?: string;
}

function Textarea({ className, errorText, ...props }: TextareaProps) {
  const hasError = Boolean(errorText);
  return (
    <>
      <textarea
        data-slot="textarea"
        className={cn(
          "border placeholder:text-muted-foreground  flex field-sizing-content min-h-16 w-full rounded-md bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 resize-none",
          hasError && "border-red-500",
          className
        )}
        {...props}
      />
      {/* Helper Text & Error Message */}
      {errorText && (
        <p className="text-red-500 text-sm mt-1 ml-1">{errorText}</p>
      )}
    </>
  );
}

export { Textarea };
