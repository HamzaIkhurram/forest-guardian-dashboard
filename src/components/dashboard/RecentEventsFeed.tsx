
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
import { Badge } from "../ui/badge";
import { useState, useEffect } from "react";

interface Event {
  id: number;
  type: 'chainsaw' | 'fire' | 'bird' | 'animal';
  timestamp: string;
  confidence: number;
  location: string;
  isNew?: boolean;
}

export function RecentEventsFeed() {
  // More realistic event timestamps
  const currentDate = new Date();
  
  const generateTimeString = (minutesAgo: number): string => {
    const date = new Date(currentDate);
    date.setMinutes(date.getMinutes() - minutesAgo);
    return date.toLocaleString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  // More descriptive events with real locations in Alberta/BC
  const initialEvents: Event[] = [
    { id: 1, type: 'chainsaw', timestamp: generateTimeString(12), confidence: 94, location: 'Jasper North Ridge', isNew: true },
    { id: 2, type: 'fire', timestamp: generateTimeString(35), confidence: 98, location: 'Kootenay East Valley', isNew: true },
    { id: 3, type: 'bird', timestamp: generateTimeString(57), confidence: 89, location: 'Banff Central', isNew: false },
    { id: 4, type: 'chainsaw', timestamp: generateTimeString(105), confidence: 76, location: 'Yoho Western Perimeter', isNew: false },
    { id: 5, type: 'animal', timestamp: generateTimeString(152), confidence: 85, location: 'Revelstoke Forest Edge', isNew: false },
    { id: 6, type: 'fire', timestamp: generateTimeString(197), confidence: 92, location: 'Golden South Slope', isNew: false },
    { id: 7, type: 'bird', timestamp: generateTimeString(255), confidence: 95, location: 'Glacier Central Basin', isNew: false },
    { id: 8, type: 'chainsaw', timestamp: generateTimeString(308), confidence: 89, location: 'Mount Revelstoke East', isNew: false },
    { id: 9, type: 'animal', timestamp: generateTimeString(374), confidence: 72, location: 'Jasper South Trail', isNew: false },
    { id: 10, type: 'bird', timestamp: generateTimeString(452), confidence: 88, location: 'Banff Northern Reach', isNew: false },
  ];

  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [isLoading, setIsLoading] = useState(false);

  // Event types with their descriptions
  const eventTypes = {
    chainsaw: "Chainsaw Detection",
    fire: "Fire Alert",
    bird: "Bird Sound",
    animal: "Animal Sound"
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'chainsaw':
        return <AlertOctagon size={20} className="text-destructive" />;
      case 'fire':
        return <Flame size={20} className="text-orange-500" />;
      case 'bird':
        return <Volume2 size={20} className="text-green-500" />;
      case 'animal':
        return <TreePine size={20} className="text-blue-500" />;
      default:
        return <CircleAlert size={20} />;
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "bg-green-500";
    if (confidence >= 75) return "bg-yellow-500";
    return "bg-orange-500";
  };

  const handleRefresh = () => {
    setIsLoading(true);
    
    // Simulate a refresh operation
    setTimeout(() => {
      // Add a new event at the top
      const eventTypes = ['chainsaw', 'fire', 'bird', 'animal'] as const;
      const randomType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
      const locations = ['Jasper', 'Banff', 'Kootenay', 'Yoho', 'Glacier', 'Golden', 'Revelstoke'];
      const areas = ['North', 'South', 'East', 'West', 'Central', 'Ridge', 'Valley', 'Basin'];
      const randomLocation = `${locations[Math.floor(Math.random() * locations.length)]} ${areas[Math.floor(Math.random() * areas.length)]}`;
      
      const newEvent: Event = {
        id: Math.floor(Math.random() * 1000) + 100,
        type: randomType,
        timestamp: generateTimeString(0),
        confidence: Math.floor(Math.random() * 30 + 70),
        location: randomLocation,
        isNew: true
      };
      
      const updatedEvents = [newEvent, ...events];
      updatedEvents.pop(); // Remove the last one to keep the list at 10 items
      
      setEvents(updatedEvents);
      setIsLoading(false);
    }, 1000);
  };

  // Automatically mark new events as not new after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setEvents(prevEvents => 
        prevEvents.map(event => ({
          ...event,
          isNew: false
        }))
      );
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [events]);

  return (
    <Card className="shadow-lg border-border/50 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm h-[400px] flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-lg font-medium">Recent Events</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">Latest detections across all sensors</p>
        </div>
        <RefreshCcw 
          size={18} 
          className={cn(
            "text-muted-foreground hover:text-primary cursor-pointer transition-all",
            isLoading && "animate-spin text-primary"
          )} 
          onClick={handleRefresh}
        />
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden p-0">
        <ScrollArea className="h-full pr-4 pl-6">
          <div className="space-y-3 pt-1 pb-6">
            {events.map((event) => (
              <div 
                key={event.id}
                className={cn(
                  "flex items-center p-3 rounded-xl transition-all",
                  "border border-border hover:shadow-md",
                  "bg-card hover:bg-card/80",
                  event.isNew && "bg-primary/5 animate-pulse border-primary/20"
                )}
              >
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center mr-3",
                  event.type === 'chainsaw' && "bg-red-100 dark:bg-red-900/30",
                  event.type === 'fire' && "bg-orange-100 dark:bg-orange-900/30",
                  event.type === 'bird' && "bg-green-100 dark:bg-green-900/30",
                  event.type === 'animal' && "bg-blue-100 dark:bg-blue-900/30"
                )}>
                  {getEventIcon(event.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center">
                    <div className="font-medium truncate">
                      {eventTypes[event.type]}
                    </div>
                    {event.isNew && (
                      <Badge variant="secondary" className="ml-2 bg-primary/10 text-primary dark:bg-primary/20 text-xs px-1.5 py-0">New</Badge>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground truncate">{event.location}</div>
                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                    <Clock size={12} className="mr-1" />
                    {event.timestamp}
                  </div>
                </div>
                <div className="flex flex-col items-end pl-3">
                  <div className="text-xs mb-1 font-medium">{event.confidence}% confidence</div>
                  <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
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
