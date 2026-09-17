"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface RippleLinkProps extends React.ComponentProps<typeof Link> {
  children: React.ReactNode;
  className?: string;
  rippleColor?: string;
}

export function RippleLink({
  href,
  children,
  className,
  rippleColor = "bg-primary",
  ...props
}: RippleLinkProps) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const linkRef = useRef<HTMLAnchorElement>(null);

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (linkRef.current) {
      const rect = linkRef.current.getBoundingClientRect();
      setPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  return (
    <Link
      ref={linkRef}
      href={href}
      onMouseEnter={handleMouseEnter}
      className={cn(
        "relative overflow-hidden group cursor-pointer transition-all duration-300",
        className
      )}
      {...props}
    >
      <span
        className={cn(
          "absolute w-10 h-10 rounded-full scale-0 transition-transform duration-700 ease-in-out group-hover:scale-[15] pointer-events-none",
          rippleColor
        )}
        style={{
          left: pos.x - 20,
          top: pos.y - 20,
        }}
      />
      <span className="relative z-10 transition-colors duration-500 pointer-events-none group-hover:text-white">
        {children}
      </span>
    </Link>
  );
}

export default RippleLink;

