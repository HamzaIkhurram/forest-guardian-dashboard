
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { 
  AlertOctagon, 
  CheckCircle,
  CircleAlert,
  Clock, 
  Flame, 
  RefreshCcw, 
  TreePine, 
  Volume2 
} from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";

interface Event {
  id: number;
  type: 'chainsaw' | 'fire' | 'bird' | 'animal';
  timestamp: string;
  confidence: number;
}

export function RecentEventsFeed() {
  // Mock data for recent events
  const events: Event[] = [
    { id: 1, type: 'chainsaw', timestamp: '2025-05-02 10:32:14', confidence: 94 },
    { id: 2, type: 'fire', timestamp: '2025-05-02 10:15:42', confidence: 98 },
    { id: 3, type: 'bird', timestamp: '2025-05-02 09:57:23', confidence: 89 },
    { id: 4, type: 'chainsaw', timestamp: '2025-05-02 09:45:10', confidence: 76 },
    { id: 5, type: 'animal', timestamp: '2025-05-02 09:32:45', confidence: 85 },
    { id: 6, type: 'fire', timestamp: '2025-05-02 09:17:20', confidence: 92 },
    { id: 7, type: 'bird', timestamp: '2025-05-02 09:05:12', confidence: 95 },
    { id: 8, type: 'chainsaw', timestamp: '2025-05-02 08:52:38', confidence: 89 },
    { id: 9, type: 'animal', timestamp: '2025-05-02 08:43:19', confidence: 72 },
    { id: 10, type: 'bird', timestamp: '2025-05-02 08:28:54', confidence: 88 },
  ];

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'chainsaw':
        return <AlertOctagon size={18} className="text-destructive" />;
      case 'fire':
        return <Flame size={18} className="text-orange-500" />;
      case 'bird':
        return <Volume2 size={18} className="text-green-500" />;
      case 'animal':
        return <TreePine size={18} className="text-blue-500" />;
      default:
        return <CircleAlert size={18} />;
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "bg-green-500";
    if (confidence >= 75) return "bg-yellow-500";
    return "bg-orange-500";
  };

  return (
    <Card className="shadow-soft h-[400px]">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Recent Events</CardTitle>
        <RefreshCcw size={18} className="text-muted-foreground hover:text-primary cursor-pointer" />
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[330px] pr-4">
          <div className="space-y-3">
            {events.map((event) => (
              <div 
                key={event.id}
                className="flex items-center p-3 rounded-2xl bg-card border border-border"
              >
                <div className="mr-3">
                  {getEventIcon(event.type)}
                </div>
                <div className="flex-1">
                  <div className="font-medium capitalize">{event.type} Detection</div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock size={12} className="mr-1" />
                    {event.timestamp}
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="text-xs mb-1">{event.confidence}% confidence</div>
                  <div className="w-16 h-1 bg-muted rounded-full overflow-hidden">
                    <div 
                      className={cn("h-full", getConfidenceColor(event.confidence))}
                      style={{ width: `${event.confidence}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
