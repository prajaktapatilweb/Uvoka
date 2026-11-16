import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "gold" | "ivory" | "dark" | "outline";
  size?: "sm" | "md";
}

export function Badge({
  children,
  className,
  variant = "ivory",
  size = "md",
  ...props
}: BadgeProps) {
  const variantStyles = {
    primary:
      "bg-[var(--color-primary)] text-[var(--color-white)] border-transparent",
    gold:
      "bg-[var(--color-gold)] text-[var(--color-charcoal)] font-semibold border-transparent",
    ivory:
      "bg-[var(--color-ivory)] text-[var(--color-primary)] border-[var(--color-border)]",
    dark:
      "bg-[var(--color-primary-dark)] text-[var(--color-gold)] border-[var(--color-border-gold)]",
    outline:
      "bg-transparent text-[var(--color-primary)] border-[var(--color-primary)]",
  };

  const sizeStyles = {
    sm: "text-[10px] px-2.5 py-0.5",
    md: "text-xs px-3.5 py-1",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center font-medium rounded-full border transition-colors",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
