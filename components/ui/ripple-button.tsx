"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface RippleButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "default" | "outline" | "secondary" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  rippleColor?: string;
  hoverTextColor?: string;
}

const variantStyles: Record<string, string> = {
  default: "bg-primary text-primary-foreground",
  outline: "border border-border bg-background text-foreground shadow-xs",
  secondary: "bg-secondary text-secondary-foreground border",
  ghost: "bg-transparent text-foreground",
};

const sizeStyles: Record<string, string> = {
  default: "h-9 px-4 py-2 text-sm",
  sm: "h-8 px-3 text-xs",
  lg: "h-10 px-6 text-sm",
  icon: "size-9",
};

export const RippleButton = React.forwardRef<HTMLButtonElement, RippleButtonProps>(
  (
    {
      children,
      className,
      variant,
      size = "default",
      rippleColor = "bg-primary",
      hoverTextColor = "group-hover:text-white",
      onMouseEnter,
      type = "button",
      disabled,
      ...props
    },
    forwardedRef
  ) => {
    const [pos, setPos] = React.useState({ x: 0, y: 0 });
    const buttonRef = React.useRef<HTMLButtonElement | null>(null);

    const setRefs = React.useCallback(
      (node: HTMLButtonElement | null) => {
        buttonRef.current = node;
        if (typeof forwardedRef === "function") {
          forwardedRef(node);
        } else if (forwardedRef) {
          (forwardedRef as React.MutableRefObject<HTMLButtonElement | null>).current = node;
        }
      },
      [forwardedRef]
    );

    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        setPos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
      onMouseEnter?.(e);
    };

    return (
      <button
        ref={setRefs}
        type={type}
        disabled={disabled}
        onMouseEnter={handleMouseEnter}
        className={cn(
          "relative overflow-hidden group cursor-pointer transition-all duration-300 inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          variant && variantStyles[variant],
          size && sizeStyles[size],
          className
        )}
        {...props}
      >
        <span
          className={cn(
            "absolute w-10 h-10 rounded-full scale-0 transition-transform duration-700 ease-in-out pointer-events-none",
            !disabled && "group-hover:scale-[15]",
            rippleColor
          )}
          style={{
            left: pos.x - 20,
            top: pos.y - 20,
          }}
          aria-hidden="true"
        />
        <span
          className={cn(
            "relative z-10 flex items-center justify-center gap-2 transition-colors duration-500 pointer-events-none w-full",
            hoverTextColor
          )}
        >
          {children}
        </span>
      </button>
    );
  }
);

RippleButton.displayName = "RippleButton";

export default RippleButton;

