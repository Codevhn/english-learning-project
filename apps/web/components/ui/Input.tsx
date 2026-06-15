import { cn } from "@/lib/cn";
import { type InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={id}
            className="text-[13px] font-medium text-[#111111]"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            "h-10 w-full rounded-[6px] border border-[#D1D1D1] bg-white px-3 text-[15px] text-[#111111] placeholder:text-[#999999] transition-shadow duration-150",
            "focus:outline-none focus:ring-2 focus:ring-[#2D4A7A] focus:ring-offset-0 focus:border-[#2D4A7A]",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            error && "border-[#DC2626] focus:ring-[#DC2626]",
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-[13px] text-[#DC2626]">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
