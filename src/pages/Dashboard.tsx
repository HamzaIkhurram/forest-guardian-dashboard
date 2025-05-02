
import { GeoMap } from "@/components/dashboard/GeoMap";
import { RecentEventsFeed } from "@/components/dashboard/RecentEventsFeed";
import { SoundWaveform } from "@/components/dashboard/SoundWaveform";
import { StatusCard } from "@/components/dashboard/StatusCard";
import { UptimeTimer } from "@/components/dashboard/UptimeTimer";
import { 
  Activity, 
  Fire, 
  GaugeCircle, 
  Timer 
} from "lucide-react";

export default function Dashboard() {
  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatusCard
          title="Area Status"
          value="Area is Calm"
          icon={<Activity className="h-5 w-5 text-primary" />}
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
          title="Fire Alerts"
          value="2 active"
          icon={<Fire className="h-5 w-5 text-destructive" />}
          isAlert
        />
      </div>
      
      <div className="mb-6">
        <SoundWaveform />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentEventsFeed />
        <GeoMap />
      </div>
    </div>
  );
}
