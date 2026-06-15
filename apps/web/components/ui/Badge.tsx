import { cn } from "@/lib/cn";
import { type HTMLAttributes } from "react";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "error" | "outline";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variants = {
    default: "bg-[#F0F0F0] text-[#555555]",
    success: "bg-[#dcfce7] text-[#15803d]",
    warning: "bg-[#fef3c7] text-[#b45309]",
    error: "bg-[#fee2e2] text-[#b91c1c]",
    outline: "border border-[#E5E5E5] text-[#555555]",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[12px] font-medium",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

export { Badge };
