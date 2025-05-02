
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Slider } from "../ui/slider";

export function SoundWaveform() {
  const [lines, setLines] = useState<number[]>([]);
  const [threshold, setThreshold] = useState(60);
  
  useEffect(() => {
    // Generate initial waveform heights
    const initialLines = Array.from({ length: 100 }, () => 
      Math.floor(Math.random() * 50) + 10
    );
    setLines(initialLines);
    
    // Update waveform periodically
    const interval = setInterval(() => {
      setLines(prev => {
        const newLines = [...prev];
        newLines.shift();
        // Generate a new value that isn't too different from the last
        const lastVal = newLines[newLines.length - 1];
        const newVal = Math.max(10, Math.min(100, lastVal + (Math.random() * 20 - 10)));
        newLines.push(Math.floor(newVal));
        return newLines;
      });
    }, 150);
    
    return () => clearInterval(interval);
  }, []);
  
  // Convert threshold (0-100) to height in pixels
  const thresholdHeight = 100 - threshold;
  
  return (
    <Card className="shadow-soft">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium">Live Sound Waveform</CardTitle>
        <div className="flex items-center gap-3">
          <div className="text-sm">Threshold: {threshold} dB</div>
          <Slider 
            value={[threshold]} 
            onValueChange={(values) => setThreshold(values[0])}
            min={40}
            max={80}
            step={1}
            className="w-32"
          />
        </div>
      </CardHeader>
      <CardContent className="relative h-40 overflow-hidden">
        {/* Threshold line */}
        <div 
          className="absolute left-0 right-0 border-t-2 border-dashed border-red-400 z-10"
          style={{ top: `${thresholdHeight}%` }}
        />
        
        {/* Waveform */}
        <div className="flex items-end h-full">
          {lines.map((height, index) => {
            const isOverThreshold = height > threshold;
            const barHeight = `${height}%`;
            
            return (
              <div 
                key={index}
                className={cn(
                  "flex-1 rounded-t-sm transition-all duration-150 mx-[0.5px]",
                  isOverThreshold ? "bg-red-400" : "bg-primary"
                )}
                style={{ height: barHeight }}
              />
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
