"use client";

import { cn } from "@/lib/cn";
import { type ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const base =
      "inline-flex items-center justify-center font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4ED8] focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed rounded-[4px]";

    const variants = {
      primary: "bg-[#1D4ED8] text-white hover:bg-[#1E40AF]",
      secondary:
        "bg-white text-[#111111] border border-[#E5E5E5] hover:bg-[#F8F8F8]",
      ghost: "text-[#555555] hover:bg-[#F0F0F0] hover:text-[#111111]",
      danger: "bg-[#DC2626] text-white hover:bg-[#b91c1c]",
    };

    const sizes = {
      sm: "text-[13px] px-3 py-1.5 h-8",
      md: "text-[14px] px-4 py-2 h-9",
      lg: "text-[15px] px-5 py-2.5 h-11",
    };

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <span className="size-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
            {children}
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
