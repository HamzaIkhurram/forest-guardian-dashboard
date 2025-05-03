
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface SoundHistogramProps {
  className?: string;
  isActive?: boolean;
}

export function SoundHistogram({ className, isActive = true }: SoundHistogramProps) {
  const [histogramData, setHistogramData] = useState<number[]>([]);
  
  useEffect(() => {
    // Generate initial histogram data
    const initialData = Array.from({ length: 32 }, () => Math.floor(Math.random() * 100));
    setHistogramData(initialData);
    
    if (!isActive) return;
    
    // Update histogram periodically
    const interval = setInterval(() => {
      setHistogramData(prevData => {
        return prevData.map(value => {
          const change = Math.random() * 30 - 15;
          return Math.max(5, Math.min(100, value + change));
        });
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isActive]);
  
  return (
    <Card className={cn("shadow-lg border-border/50 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Sound Histogram</CardTitle>
        <p className="text-sm text-muted-foreground mt-1">
          Distribution of sound intensity across frequencies
        </p>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-[300px] flex items-end justify-between">
          {histogramData.map((height, i) => {
            const barColor = height > 80 
              ? "bg-red-500" 
              : height > 60 
                ? "bg-amber-500" 
                : "bg-primary";
                
            return (
              <div key={i} className="flex flex-col items-center gap-0.5 w-full">
                <div
                  className={cn("w-full rounded-t-sm transition-all duration-300", barColor)}
                  style={{ height: `${height}%`, opacity: isActive ? 0.8 : 0.4 }}
                />
                {i % 4 === 0 && (
                  <div className="text-[9px] text-muted-foreground mt-1">
                    {i * 125} Hz
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
