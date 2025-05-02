
import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { cn } from "@/lib/utils";

interface Sensor {
  id: number;
  name: string;
  lat: number;
  lng: number;
  status: "online" | "offline" | "alert";
}

export function GeoMap() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [selectedSensor, setSelectedSensor] = useState<Sensor | null>(null);
  
  // Mock sensor data
  const sensors: Sensor[] = [
    { id: 1, name: "North Ridge", lat: 45.4215, lng: -75.6993, status: "online" },
    { id: 2, name: "East Valley", lat: 45.4115, lng: -75.6873, status: "online" },
    { id: 3, name: "South Point", lat: 45.4005, lng: -75.6963, status: "alert" },
    { id: 4, name: "West Hill", lat: 45.4155, lng: -75.7075, status: "offline" },
    { id: 5, name: "Central Node", lat: 45.4125, lng: -75.6983, status: "online" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500";
      case "offline":
        return "bg-gray-400";
      case "alert":
        return "bg-red-500";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <Card className="shadow-soft h-[400px]">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Sensor Node Map</CardTitle>
      </CardHeader>
      <CardContent className="relative h-[340px]">
        {/* Placeholder for map - in a real implementation, you would use a mapping library */}
        <div className="absolute inset-0 bg-secondary/50 rounded-lg flex items-center justify-center">
          <div className="relative w-full h-full rounded-lg overflow-hidden">
            {/* This would be where your actual map renders */}
            <div className="absolute inset-0 bg-gradient-to-br from-lorax-mint to-lorax-green/20"></div>
            
            {/* Mock sensor markers */}
            {sensors.map((sensor) => (
              <div 
                key={sensor.id}
                className={cn(
                  "absolute w-4 h-4 rounded-full cursor-pointer transform transition-all",
                  "hover:scale-150 flex items-center justify-center",
                  sensor.status === "alert" && "animate-pulse",
                  selectedSensor?.id === sensor.id ? "ring-4 ring-primary/50" : ""
                )}
                style={{ 
                  left: `${((sensor.lng + 75.7) * 1000) % 100}%`,
                  top: `${((sensor.lat - 45.4) * 1000) % 100}%`
                }}
                onClick={() => setSelectedSensor(sensor)}
              >
                <span className={cn("block w-3 h-3 rounded-full", getStatusColor(sensor.status))}></span>
                
                {/* Ripple effect for alert status */}
                {sensor.status === "alert" && (
                  <>
                    <span className="absolute w-full h-full rounded-full bg-red-500 animate-ripple"></span>
                    <span className="absolute w-full h-full rounded-full bg-red-500 animate-ripple" style={{ animationDelay: "0.5s" }}></span>
                  </>
                )}
              </div>
            ))}
            
            {/* Selected sensor info */}
            {selectedSensor && (
              <div className="absolute bottom-3 left-3 right-3 bg-background/80 backdrop-blur-sm p-3 rounded-lg border border-border">
                <div className="font-medium">{selectedSensor.name}</div>
                <div className="flex items-center text-sm">
                  <span className={cn("w-2 h-2 rounded-full mr-2", getStatusColor(selectedSensor.status))}></span>
                  <span className="capitalize">{selectedSensor.status}</span>
                </div>
                <div className="text-xs mt-1">
                  {selectedSensor.status === "alert" 
                    ? "Alert: Chainsaw detected 5 minutes ago" 
                    : selectedSensor.status === "online" 
                      ? "All systems normal" 
                      : "Connection lost"}
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
