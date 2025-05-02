
import { useEffect, useState } from "react";
import { GeoMap } from "@/components/dashboard/GeoMap";
import { RecentEventsFeed } from "@/components/dashboard/RecentEventsFeed";
import { SoundWaveform } from "@/components/dashboard/SoundWaveform";
import { StatusCard } from "@/components/dashboard/StatusCard";
import { UptimeTimer } from "@/components/dashboard/UptimeTimer";
import { 
  Activity, 
  Flame, 
  GaugeCircle, 
  Timer,
  Bell 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export default function Dashboard() {
  const { toast } = useToast();
  const [totalEvents, setTotalEvents] = useState(132);
  const [areaStatus, setAreaStatus] = useState<"calm" | "active">("calm");
  
  useEffect(() => {
    // Simulate receiving events
    const eventTimer = setInterval(() => {
      // 10% chance of getting a new event
      if (Math.random() < 0.1) {
        const newTotal = totalEvents + 1;
        setTotalEvents(newTotal);
        
        const eventTypes = ["chainsaw", "bird", "animal"];
        const randomEvent = eventTypes[Math.floor(Math.random() * eventTypes.length)];
        
        // If it's a chainsaw, mark area as active
        if (randomEvent === "chainsaw") {
          setAreaStatus("active");
          
          // And show an alert
          toast({
            title: "⚠️ Chainsaw Detection Alert",
            description: "Possible illegal logging activity detected in East Valley sector.",
            variant: "destructive",
          });
          
          // Reset status after 20 seconds
          setTimeout(() => {
            setAreaStatus("calm");
          }, 20000);
        }
      }
    }, 5000);
    
    return () => clearInterval(eventTimer);
  }, [totalEvents, toast]);

  return (
    <div className="container py-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        <div className="flex items-center space-x-4">
          <div className="text-sm flex items-center">
            <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1.5 animate-pulse"></span>
            Real-time monitoring active
          </div>
          <Button variant="outline" size="sm" className="gap-1.5">
            <Bell className="h-3.5 w-3.5" />
            Manage Alerts
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatusCard
          title="Area Status"
          value={areaStatus === "calm" ? "Area is Calm" : "Activity Detected"}
          icon={<Activity className={cn(
            "h-5 w-5",
            areaStatus === "calm" ? "text-primary" : "text-amber-500"
          )} />}
          isAlert={areaStatus === "active"}
        />
        
        <StatusCard
          title="Sound Threshold"
          value="60 dB"
          icon={<GaugeCircle className="h-5 w-5 text-primary" />}
        />
        
        <StatusCard
          title="Monitoring Uptime"
          value={<UptimeTimer />}
          icon={<Timer className="h-5 w-5 text-primary" />}
        />
        
        <StatusCard
          title="Total Sound Events"
          value={totalEvents.toString()}
          icon={<Bell className="h-5 w-5 text-primary" />}
        />
      </div>
      
      <div className="mb-6 transform hover:-translate-y-1 transition-all duration-300">
        <SoundWaveform />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentEventsFeed />
        <GeoMap />
      </div>
    </div>
  );
}
