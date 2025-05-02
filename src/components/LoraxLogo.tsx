
import { cn } from "@/lib/utils";
import React from "react";

interface LoraxLogoProps {
  className?: string;
  large?: boolean;
}

export const LoraxLogo: React.FC<LoraxLogoProps> = ({ 
  className,
  large = false,
}) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative">
        <div className={cn(
          "flex items-center justify-center bg-lorax-green text-white font-bold rounded-full",
          large ? "w-12 h-12 text-xl" : "w-8 h-8 text-base"
        )}>
          <span className="relative z-10">L</span>
        </div>
        <div className={cn(
          "absolute top-0 left-0 bg-lorax-mint rounded-full animate-pulse-slow",
          large ? "w-12 h-12" : "w-8 h-8",
          "opacity-30"
        )}></div>
      </div>
      <div className="font-semibold text-lorax-green dark:text-white">
        <span className={cn(large ? "text-2xl" : "text-lg")}>Lorax</span>
      </div>
    </div>
  );
};
