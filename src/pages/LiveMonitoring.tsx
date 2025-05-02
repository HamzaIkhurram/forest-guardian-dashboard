
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";

// Generate dummy data
const generateFrequencyData = () => {
  return Array.from({ length: 128 }, () => Math.floor(Math.random() * 100));
};

export default function LiveMonitoring() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);
  const [audioData, setAudioData] = useState(generateFrequencyData);
  const [sensorLevels, setSensorLevels] = useState([
    { id: 1, name: "Jasper North", level: 42, isActive: true },
    { id: 2, name: "Banff Valley", level: 38, isActive: true },
    { id: 3, name: "Kootenay Alert", level: 89, isActive: true },
    { id: 4, name: "Yoho Reserve", level: 0, isActive: false },
    { id: 5, name: "Glacier Watch", level: 36, isActive: true },
    { id: 6, name: "Golden Perimeter", level: 41, isActive: true },
    { id: 7, name: "Revelstoke Node", level: 37, isActive: true },
  ]);
  const audioIntervalRef = useRef<number | null>(null);
  
  useEffect(() => {
    if (isPlaying) {
      audioIntervalRef.current = window.setInterval(() => {
        setAudioData(generateFrequencyData());
        
        // Update sensor levels periodically
        setSensorLevels(prev => prev.map(sensor => {
          if (!sensor.isActive) return sensor;
          
          const change = Math.random() * 10 - 5;
          let newLevel = Math.max(0, Math.min(100, sensor.level + change));
          
          // Sometimes add a spike for the Kootenay sensor (id: 3)
          if (sensor.id === 3 && Math.random() < 0.2) {
            newLevel = Math.min(100, newLevel + Math.random() * 30);
          }
          
          return {
            ...sensor,
            level: Math.floor(newLevel)
          };
        }));
      }, 100);
    } else if (audioIntervalRef.current) {
      clearInterval(audioIntervalRef.current);
    }
    
    return () => {
      if (audioIntervalRef.current) {
        clearInterval(audioIntervalRef.current);
      }
    };
  }, [isPlaying]);
  
  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };
  
  // Convert sensor level to dB
  const levelToDb = (level: number) => {
    return Math.floor(30 + (level / 100) * 50);
  };

  return (
    <div className="container py-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-bold">Live Audio Monitoring</h1>
        <div className="flex items-center space-x-2">
          <div className={cn(
            "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
            isPlaying 
              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" 
              : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
          )}>
            <span className={cn(
              "mr-1 h-2 w-2 rounded-full",
              isPlaying ? "animate-pulse bg-green-600 dark:bg-green-400" : "bg-amber-600 dark:bg-amber-400"
            )} />
            {isPlaying ? "Streaming" : "Paused"}
          </div>
        </div>
      </div>
      
      <Card className="mb-6 shadow-lg border-border/50 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Real-Time Audio Stream</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">Live audio feed from selected forest sensors</p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              className={cn("rounded-full", isPlaying && "bg-primary/10")}
              onClick={togglePlayback}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full"
              onClick={toggleMute}
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
            <div className="flex items-center gap-2 min-w-[150px]">
              <Volume2 className="h-4 w-4 text-muted-foreground" />
              <Slider
                value={[volume]}
                onValueChange={(values) => setVolume(values[0])}
                disabled={isMuted}
                max={100}
                step={1}
                className={cn(isMuted && "opacity-50")}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[320px] bg-muted/30 rounded-xl overflow-hidden relative flex items-center">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
              <div className="font-bold text-6xl tracking-widest">LORAX</div>
            </div>
            
            {/* Waveform visualization */}
            <div className="w-full h-40 flex items-center justify-center gap-[2px]">
              {audioData.map((value, index) => (
                <div
                  key={index}
                  className={cn(
                    "w-1 bg-primary rounded-full transition-all",
                    !isPlaying && "opacity-50"
                  )}
                  style={{
                    height: `${(value / 100) * 150}px`,
                    opacity: isMuted ? 0.3 : 0.7 + ((value / 100) * 0.3)
                  }}
                ></div>
              ))}
            </div>
            
            {/* Overlay for paused state */}
            {!isPlaying && (
              <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center">
                <Button size="lg" onClick={togglePlayback} className="gap-2">
                  <Play className="h-5 w-5" />
                  Start Audio Stream
                </Button>
              </div>
            )}
          </div>
          
          <div className="mt-3 flex flex-wrap gap-2">
            {["Jasper North", "Banff Valley", "Kootenay Alert"].map((sensor) => (
              <div
                key={sensor}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-medium border",
                  sensor === "Kootenay Alert" 
                    ? "border-red-300 bg-red-50 text-red-700 dark:bg-red-950/30 dark:border-red-800/30 dark:text-red-400" 
                    : "border-green-300 bg-green-50 text-green-700 dark:bg-green-950/30 dark:border-green-800/30 dark:text-green-400"
                )}
              >
                {sensor}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-lg border-border/50 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Sensor Levels</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">Current audio levels across all forest sensors</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-[320px] overflow-y-auto pr-2">
              {sensorLevels.map((sensor) => (
                <div key={sensor.id} className="space-y-1.5">
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center">
                      <span className={cn(
                        "w-2 h-2 rounded-full mr-2",
                        sensor.isActive ? "bg-green-500" : "bg-gray-400" 
                      )}></span>
                      <span className="font-medium">{sensor.name}</span>
                    </div>
                    <span className={cn(
                      "font-mono",
                      sensor.level > 80 ? "text-red-500" : 
                      sensor.level > 60 ? "text-amber-500" : 
                      "text-muted-foreground"
                    )}>
                      {sensor.isActive ? `${levelToDb(sensor.level)} dB` : "Offline"}
                    </span>
                  </div>
                  
                  <div className="h-2 bg-muted/50 rounded-full overflow-hidden">
                    <div
                      className={cn(
                        "h-full transition-all duration-200",
                        sensor.level > 80 ? "bg-red-500" :
                        sensor.level > 60 ? "bg-amber-500" :
                        sensor.level > 40 ? "bg-green-500" :
                        "bg-primary/50"
                      )}
                      style={{ width: `${sensor.isActive ? sensor.level : 0}%` }}
                    ></div>
                  </div>
                  
                  {sensor.level > 80 && (
                    <div className="text-xs text-red-500 animate-pulse">
                      ⚠️ High volume detected - possibly chainsaw activity
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg border-border/50 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Frequency Analysis</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">Spectral distribution of current audio</p>
          </CardHeader>
          <CardContent className="h-[320px] flex items-end justify-between">
            {/* Create a spectrogram-like visualization */}
            {Array.from({ length: 32 }).map((_, i) => {
              const height1 = Math.floor(Math.random() * 100);
              const height2 = Math.floor(Math.random() * 80);
              const height3 = Math.floor(Math.random() * 60);
              
              // Simulate a chainsaw frequency pattern around certain frequency bands
              const isChainsawRange = i >= 8 && i <= 12;
              const chainsawBoost = isChainsawRange ? 40 : 0;
              
              return (
                <div key={i} className="flex flex-col items-center gap-0.5 w-full">
                  <div className="text-[8px] text-muted-foreground mb-1">
                    {i * 125} Hz
                  </div>
                  <div className="w-full flex flex-col gap-[1px] items-center">
                    <div 
                      className={cn(
                        "w-3 rounded-sm",
                        isChainsawRange ? "bg-red-500" : "bg-primary"
                      )}
                      style={{ 
                        height: `${height1 + (isChainsawRange ? chainsawBoost : 0)}%`,
                        maxHeight: "200px",
                        opacity: isPlaying ? 0.8 : 0.4
                      }}
                    ></div>
                    <div 
                      className={cn(
                        "w-2 rounded-sm",
                        isChainsawRange ? "bg-red-400" : "bg-primary/80"
                      )}
                      style={{ 
                        height: `${height2 + (isChainsawRange ? chainsawBoost : 0)}%`,
                        maxHeight: "160px",
                        opacity: isPlaying ? 0.6 : 0.3
                      }}
                    ></div>
                    <div 
                      className={cn(
                        "w-1 rounded-sm",
                        isChainsawRange ? "bg-red-300" : "bg-primary/60"
                      )}
                      style={{ 
                        height: `${height3 + (isChainsawRange ? chainsawBoost : 0)}%`,
                        maxHeight: "120px",
                        opacity: isPlaying ? 0.4 : 0.2
                      }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
      
      {/* Information panel */}
      <div className="mt-6 p-4 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/30">
        <h3 className="font-semibold text-blue-800 dark:text-blue-400 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
          </svg>
          Audio Analysis Information
        </h3>
        <p className="mt-2 text-sm text-blue-700 dark:text-blue-300">
          The system is currently monitoring audio from 7 forest sensors. Chainsaw sounds typically register in the 100-1500 Hz frequency range with amplitude spikes above 70 dB.
          AI detection algorithms analyze both frequency patterns and temporal characteristics to distinguish between natural sounds and potential illegal activities.
        </p>
      </div>
    </div>
  );
}
