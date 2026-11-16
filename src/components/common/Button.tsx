import { forwardRef, ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import type { Route } from "next";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "gold" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  isExternal?: boolean;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      href,
      isExternal = false,
      icon,
      iconPosition = "right",
      isLoading = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium font-body transition-all duration-300 rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] disabled:opacity-60 disabled:pointer-events-none select-none";

    const variantStyles = {
      primary:
        "bg-[var(--color-primary)] text-[var(--color-white)] hover:bg-[var(--color-primary-dark)] hover:shadow-[var(--shadow-md)] shadow-[var(--shadow-sm)] border border-transparent",
      secondary:
        "bg-[var(--color-ivory)] text-[var(--color-charcoal)] hover:bg-[#e8e0d3] border border-[var(--color-border)] hover:border-[var(--color-border-hover)]",
      outline:
        "bg-transparent text-[var(--color-primary)] border border-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-[var(--color-white)]",
      gold:
        "bg-[var(--color-gold)] text-[var(--color-charcoal)] font-semibold hover:bg-[#c4a06a] hover:shadow-[var(--shadow-gold)] shadow-[var(--shadow-sm)] border border-transparent",
      ghost:
        "bg-transparent text-[var(--color-primary)] hover:bg-[var(--color-ivory)]",
    };

    const sizeStyles = {
      sm: "text-xs px-4 py-2 gap-1.5 h-8",
      md: "text-sm px-6 py-3 gap-2 h-11",
      lg: "text-base px-8 py-4 gap-2.5 h-13",
    };

    const content = (
      <>
        {isLoading ? (
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
        ) : (
          icon && iconPosition === "left" && <span className="shrink-0">{icon}</span>
        )}
        <span>{children}</span>
        {!isLoading && icon && iconPosition === "right" && (
          <span className="shrink-0 transition-transform duration-300 group-hover:translate-x-1">
            {icon}
          </span>
        )}
      </>
    );

    const combinedClassName = cn(
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      "group",
      className
    );

    if (href) {
      if (isExternal) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={combinedClassName}
          >
            {content}
          </a>
        );
      }
      return (
        <Link href={href as Route} className={combinedClassName}>
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={combinedClassName}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";
