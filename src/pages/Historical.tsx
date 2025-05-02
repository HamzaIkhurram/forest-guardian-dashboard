
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Historical() {
  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold mb-6">Historical Trends</h1>
      
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Event Counts Over Time</CardTitle>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center">
            <div className="text-muted-foreground">
              Time-series chart for event counts would be displayed here
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Average dB Levels</CardTitle>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center">
            <div className="text-muted-foreground">
              Average dB level trends would be displayed here
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>False-Positive Rate</CardTitle>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center">
            <div className="text-muted-foreground">
              False-positive rate chart would be displayed here
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
