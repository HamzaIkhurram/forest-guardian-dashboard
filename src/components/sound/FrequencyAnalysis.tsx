
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface FrequencyAnalysisProps {
  className?: string;
  isActive?: boolean;
}

export function FrequencyAnalysis({ className, isActive = true }: FrequencyAnalysisProps) {
  const [frequencyData, setFrequencyData] = useState<{ freq: number; value: number; color: string }[]>([]);
  
  useEffect(() => {
    // Generate the frequencies (from 0 to 4000 Hz)
    const frequencies = Array.from({ length: 32 }, (_, i) => i * 125);
    
    // Generate initial values for each frequency
    const generateData = () => {
      return frequencies.map(freq => {
        const value = Math.floor(Math.random() * 100);
        
        // Assign colors based on value ranges
        let color = "primary";
        if (value > 80) color = "red-500";
        else if (value > 60) color = "amber-500";
        else if (value > 40) color = "green-500";
        
        // Special case for chainsaw-like frequencies (around 800-1500 Hz)
        const isChainsawRange = freq >= 800 && freq <= 1500;
        const adjustedValue = isChainsawRange 
          ? Math.min(100, value + Math.random() * 40) 
          : value;
          
        return { freq, value: adjustedValue, color: isChainsawRange && adjustedValue > 60 ? "red-500" : color };
      });
    };
    
    // Set initial data
    setFrequencyData(generateData());
    
    if (!isActive) return;
    
    // Update data periodically
    const interval = setInterval(() => {
      setFrequencyData(generateData());
    }, 2000);
    
    return () => clearInterval(interval);
  }, [isActive]);
  
  return (
    <Card className={cn("shadow-lg border-border/50 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Frequency Analysis</CardTitle>
        <p className="text-sm text-muted-foreground mt-1">
          Spectral distribution of current audio
        </p>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-[300px] flex items-end justify-between">
          {frequencyData.map((item, i) => (
            <div key={i} className="flex flex-col items-center w-full">
              <div
                className={cn("w-full rounded-t-sm transition-all duration-300", `bg-${item.color}`)}
                style={{ 
                  height: `${item.value}%`,
                  opacity: isActive ? 0.8 : 0.4,
                  backgroundColor: 
                    item.color === 'red-500' ? 'rgb(239, 68, 68)' : 
                    item.color === 'amber-500' ? 'rgb(245, 158, 11)' : 
                    item.color === 'green-500' ? 'rgb(34, 197, 94)' : 
                    'var(--primary)'
                }}
              />
              {i % 4 === 0 && (
                <div className="text-[9px] text-muted-foreground mt-1">
                  {item.freq} Hz
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Legend */}
        <div className="flex justify-end mt-4 gap-4 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-sm bg-red-500"></div>
            <span>High intensity</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-sm bg-amber-500"></div>
            <span>Medium</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-sm" style={{backgroundColor: 'var(--primary)'}}></div>
            <span>Low</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
