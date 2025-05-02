
import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { cn } from "@/lib/utils";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface Sensor {
  id: number;
  name: string;
  lat: number;
  lng: number;
  status: "online" | "offline" | "alert";
  lastReading?: number;
  batteryLevel?: number;
}

export function GeoMap() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [selectedSensor, setSelectedSensor] = useState<Sensor | null>(null);
  const markersRef = useRef<{[key: number]: mapboxgl.Marker}>({});
  
  // BC and Alberta forest sensor locations (realistic coordinates)
  const sensors: Sensor[] = [
    { id: 1, name: "Jasper North", lat: 52.8738, lng: -118.0814, status: "online", lastReading: 42, batteryLevel: 78 },
    { id: 2, name: "Banff Valley", lat: 51.1784, lng: -115.5708, status: "online", lastReading: 38, batteryLevel: 92 },
    { id: 3, name: "Kootenay Alert", lat: 50.9769, lng: -116.2562, status: "alert", lastReading: 89, batteryLevel: 65 },
    { id: 4, name: "Yoho Reserve", lat: 51.4968, lng: -116.4843, status: "offline", lastReading: 0, batteryLevel: 12 },
    { id: 5, name: "Glacier Watch", lat: 51.2601, lng: -117.5177, status: "online", lastReading: 36, batteryLevel: 84 },
    { id: 6, name: "Golden Perimeter", lat: 51.3022, lng: -116.9649, status: "online", lastReading: 41, batteryLevel: 91 },
    { id: 7, name: "Revelstoke Node", lat: 51.0330, lng: -118.1957, status: "online", lastReading: 37, batteryLevel: 86 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "#10b981"; // emerald-500
      case "offline":
        return "#6b7280"; // gray-500
      case "alert":
        return "#ef4444"; // red-500
      default:
        return "#6b7280"; // gray-500
    }
  };

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;
    
    mapboxgl.accessToken = 'pk.eyJ1IjoiZXhhbXBsZXVzZXIiLCJhIjoiY2xxOXh3eDV1MGNiMDJrcXBxdHQwNXFkbiJ9.lB_GbNcEDFxS56HYQFcaFg';
    
    // Initialize map centered on Alberta/BC border area
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/outdoors-v12', // Nature-focused style
      center: [-117.0, 51.5], // Center between AB and BC
      zoom: 6.5,
      pitch: 30, // Add perspective
      attributionControl: false
    });
    
    mapRef.current = map;

    map.on('load', () => {
      // Add forest cover layer for realism
      map.addSource('forest-cover', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'Polygon',
                coordinates: [[
                  [-118.5, 50.8],
                  [-118.5, 52.3],
                  [-116.0, 52.3],
                  [-116.0, 50.8],
                  [-118.5, 50.8]
                ]]
              }
            }
          ]
        }
      });
      
      map.addLayer({
        id: 'forest-area',
        type: 'fill',
        source: 'forest-cover',
        layout: {},
        paint: {
          'fill-color': '#2B593E',
          'fill-opacity': 0.2
        }
      });

      // Add navigation controls
      map.addControl(new mapboxgl.NavigationControl(), 'top-right');
      
      // Add markers for each sensor
      sensors.forEach(sensor => {
        const el = document.createElement('div');
        const size = 24;
        
        el.className = 'sensor-marker';
        el.style.width = `${size}px`;
        el.style.height = `${size}px`;
        el.style.borderRadius = '50%';
        el.style.background = getStatusColor(sensor.status);
        el.style.border = '2px solid white';
        el.style.boxShadow = '0 2px 6px rgba(0,0,0,0.3)';
        el.style.cursor = 'pointer';
        
        if (sensor.status === 'alert') {
          el.style.animation = 'pulse 2s infinite';
          const pulse = document.createElement('div');
          pulse.style.position = 'absolute';
          pulse.style.width = '100%';
          pulse.style.height = '100%';
          pulse.style.borderRadius = '50%';
          pulse.style.boxShadow = `0 0 0 rgba(239, 68, 68, 0.4)`;
          pulse.style.animation = 'ripple 1.5s infinite';
          el.appendChild(pulse);
        }
        
        const marker = new mapboxgl.Marker(el)
          .setLngLat([sensor.lng, sensor.lat])
          .addTo(map);
          
        el.addEventListener('click', () => {
          setSelectedSensor(sensor);
          // Fly to the sensor with animation
          map.flyTo({
            center: [sensor.lng, sensor.lat],
            zoom: 9,
            duration: 1500,
            essential: true
          });
        });
        
        markersRef.current[sensor.id] = marker;
      });
    });

    // Cleanup function
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <Card className="shadow-lg border border-border/50 overflow-hidden bg-gradient-to-br from-card to-card/80 backdrop-blur-sm">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium">Forest Sensor Network</CardTitle>
        <div className="flex items-center gap-2">
          <div className="text-xs font-medium">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-green-500"></span>
              Online
            </span>
          </div>
          <div className="text-xs font-medium">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-red-500"></span>
              Alert
            </span>
          </div>
          <div className="text-xs font-medium">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-gray-400"></span>
              Offline
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0 h-[400px] relative">
        <div ref={mapContainerRef} className="absolute inset-0" />
        
        {selectedSensor && (
          <div className="absolute bottom-4 left-4 right-4 md:w-72 bg-background/90 dark:bg-sidebar/90 backdrop-blur-md p-4 rounded-xl border border-border shadow-lg z-10">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">{selectedSensor.name}</h3>
              <span className={cn(
                "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
                selectedSensor.status === "online" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" :
                selectedSensor.status === "alert" ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400" :
                "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400"
              )}>
                <span className={cn(
                  "mr-1 h-2 w-2 rounded-full",
                  selectedSensor.status === "online" ? "bg-green-500" : 
                  selectedSensor.status === "alert" ? "bg-red-500" : 
                  "bg-gray-500"
                )} />
                {selectedSensor.status.charAt(0).toUpperCase() + selectedSensor.status.slice(1)}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-3">
              <div>
                <p className="text-xs text-muted-foreground">Last Reading</p>
                <p className="font-mono font-medium">
                  {selectedSensor.status !== 'offline' ? `${selectedSensor.lastReading} dB` : 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Battery</p>
                <p className={cn(
                  "font-mono font-medium",
                  selectedSensor.batteryLevel && selectedSensor.batteryLevel < 20 ? "text-red-500" : ""
                )}>
                  {selectedSensor.batteryLevel}%
                </p>
              </div>
              <div className="col-span-2 pt-2">
                {selectedSensor.status === 'alert' && (
                  <div className="text-xs text-red-500 font-medium animate-pulse">
                    ⚠️ Chainsaw sound detected 3 minutes ago
                  </div>
                )}
                {selectedSensor.status === 'offline' && (
                  <div className="text-xs text-muted-foreground">
                    Last online: 13 hours ago
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
