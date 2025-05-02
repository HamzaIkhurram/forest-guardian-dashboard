
import { useEffect, useState } from "react";

export function UptimeTimer() {
  const [uptime, setUptime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  
  useEffect(() => {
    // Set a start time - in a real app, this would come from your backend
    const startTime = new Date().getTime() - (3 * 24 * 60 * 60 * 1000) - (5 * 60 * 60 * 1000) - (23 * 60 * 1000) - (17 * 1000);
    
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = now - startTime;
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setUptime({ days, hours, minutes, seconds });
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="flex space-x-2">
      <div className="text-2xl font-mono">{uptime.days}d</div>
      <div className="text-2xl font-mono">{uptime.hours.toString().padStart(2, '0')}h</div>
      <div className="text-2xl font-mono">{uptime.minutes.toString().padStart(2, '0')}m</div>
      <div className="text-2xl font-mono">{uptime.seconds.toString().padStart(2, '0')}s</div>
    </div>
  );
}
