
import { cn } from "@/lib/utils";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface StatusCardProps {
  title: string;
  value: string | React.ReactNode;
  icon: React.ReactNode;
  className?: string;
  isAlert?: boolean;
}

export function StatusCard({
  title,
  value,
  icon,
  className,
  isAlert = false,
}: StatusCardProps) {
  return (
    <Card className={cn(
      "shadow-soft overflow-hidden transition-all duration-300",
      "hover:shadow-md hover:-translate-y-1", 
      isAlert && "border-destructive/50",
      className
    )}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className={cn(
          "p-2 rounded-full bg-primary/10",
          isAlert && "bg-destructive/10"
        )}>
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}
