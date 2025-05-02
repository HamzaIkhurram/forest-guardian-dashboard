
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

export default function SoundThreshold() {
  const [threshold, setThreshold] = useState(60);
  
  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold mb-6">Sound Threshold Configuration</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Sound Threshold Control</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-6">
            <div className="font-mono text-2xl mr-4">{threshold} dB</div>
            <Slider
              value={[threshold]}
              onValueChange={(values) => setThreshold(values[0])}
              max={100}
              step={1}
              className="max-w-md"
            />
          </div>
          <p className="text-muted-foreground">
            Adjust the sound threshold to determine when alerts are triggered. 
            Higher values mean fewer alerts, lower values will increase sensitivity.
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Sound Histogram</CardTitle>
        </CardHeader>
        <CardContent className="h-80 flex items-center justify-center">
          <div className="text-muted-foreground">
            Sound histogram visualization would be displayed here
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
