// import * as React from "react"

// import { cn } from "@/lib/utils"

// function Input({ className, type, ...props }: React.ComponentProps<"input">) {
//   return (
//     <input
//       type={type}
//       data-slot="input"
//       className={cn(
//         "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
//         "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
//         "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
//         className
//       )}
//       {...props}
//     />
//   )
// }

// export { Input }

import * as React from "react";
import { cn } from "@/lib/utils";
import { EyeOffIcon } from "lucide-react";

interface InputProps extends React.ComponentProps<"input"> {
  classes?: {
    root?: string;
    input?: string;
  };
  className?: string;
  helperText?: string;
  errorText?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      classes,
      className = "",
      type,
      helperText,
      errorText,
      startIcon,
      endIcon,
      ...props
    },
    ref
  ) => {
    const hasError = Boolean(errorText);

    return (
      <div className={cn("w-full", classes?.root)}>
        <div className="relative flex items-center">
          {startIcon && (
            <span className="absolute left-4 text-gray-500">{startIcon}</span>
          )}
          <input
            type={type}
            className={cn(
              "flex h-12 w-full rounded-xl border bg-transparent px-4 py-3 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-gray-6 focus-visible:outline-none focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50",
              hasError && "border-red-500",

              startIcon && "pl-12",
              endIcon && "pr-12",
              className || classes?.input
            )}
            ref={ref}
            {...props}
          />
          {endIcon && (
            <span className="absolute right-4 text-gray-500">{endIcon}</span>
          )}
        </div>

        {/* Helper Text & Error Message */}
        {errorText ? (
          <p className="text-red-500 text-sm mt-1 ml-1">{errorText}</p>
        ) : (
          helperText && (
            <p className="text-gray-500 text-sm mt-1 ml-1">{helperText}</p>
          )
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

const InputPassword = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, helperText, errorText, startIcon, endIcon, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleTogglePassword = () => setShowPassword((prev) => !prev);

    const hasError = Boolean(errorText);

    return (
      <div className="w-full">
        <div className="relative flex items-center">
          {startIcon && (
            <span className="absolute left-4 text-gray-500">{startIcon}</span>
          )}
          <input
            type={showPassword ? "text" : "password"}
            className={cn(
              "flex h-12 w-full rounded-xl border bg-transparent px-4 py-3 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-gray-6 focus-visible:outline-none focus-visible:border-primary-4 disabled:cursor-not-allowed disabled:opacity-50",
              hasError && "border-red-500 focus-visible:ring-red-500",
              startIcon && "pl-12",
              endIcon && "pr-12",
              className
            )}
            ref={ref}
            {...props}
          />
          {endIcon && (
            <span className="absolute right-4 text-gray-500">{endIcon}</span>
          )}

          <button
            type="button"
            className="absolute right-4 text-gray-500"
            onClick={handleTogglePassword}
          >
            {showPassword ? (
              <EyeOffIcon
                className="w-5 h-5 text-primary-6"
                strokeWidth={1.5}
              />
            ) : (
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.99841 7.00462C12.2075 7.00462 13.9984 8.79549 13.9984 11.0046C13.9984 13.2138 12.2075 15.0046 9.99841 15.0046C7.78927 15.0046 5.99841 13.2138 5.99841 11.0046C5.99841 8.79549 7.78927 7.00462 9.99841 7.00462ZM9.99841 8.50462C8.6177 8.50462 7.49841 9.62391 7.49841 11.0046C7.49841 12.3853 8.6177 13.5046 9.99841 13.5046C11.3791 13.5046 12.4984 12.3853 12.4984 11.0046C12.4984 9.62391 11.3791 8.50462 9.99841 8.50462ZM9.99841 3.5C14.6119 3.5 18.5945 6.65001 19.6995 11.0644C19.8001 11.4662 19.5559 11.8735 19.1541 11.9741C18.7523 12.0746 18.345 11.8305 18.2444 11.4286C17.3055 7.67796 13.9198 5 9.99841 5C6.07534 5 2.68851 7.68026 1.75127 11.4332C1.6509 11.835 1.24376 12.0794 0.841892 11.9791C0.440021 11.8787 0.195601 11.4716 0.295963 11.0697C1.39905 6.65272 5.38289 3.5 9.99841 3.5Z"
                  fill="#527A75"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Helper Text & Error Message */}
        {errorText ? (
          <p className="text-red-500 text-sm mt-1">{errorText}</p>
        ) : (
          helperText && (
            <p className="text-gray-500 text-sm mt-1">{helperText}</p>
          )
        )}
      </div>
    );
  }
);

InputPassword.displayName = "InputPassword";

export { Input, InputPassword };
