
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, PlayCircle, PauseCircle, Mic, X, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface PredictionResult {
  label: string;
  confidence: number;
  isAlert: boolean;
}

export function SoundPredictor() {
  const { toast } = useToast();
  const [isRecording, setIsRecording] = useState(false);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Cleanup audio URL when component unmounts or when a new file is uploaded
  useEffect(() => {
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check if file is audio
    if (!file.type.startsWith('audio/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an audio file.",
        variant: "destructive"
      });
      return;
    }

    // Cleanup previous audio URL
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }

    setAudioFile(file);
    const url = URL.createObjectURL(file);
    setAudioUrl(url);
    setPrediction(null);
  };

  // Handle record toggle
  const handleRecordToggle = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  // Start recording function
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const audioChunks: BlobPart[] = [];
      
      mediaRecorder.addEventListener("dataavailable", (event) => {
        audioChunks.push(event.data);
      });
      
      mediaRecorder.addEventListener("stop", () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        const audioFile = new File([audioBlob], "recorded-audio.wav", { type: 'audio/wav' });
        
        // Cleanup previous audio URL
        if (audioUrl) {
          URL.revokeObjectURL(audioUrl);
        }
        
        setAudioFile(audioFile);
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        setPrediction(null);
        setIsRecording(false);
      });
      
      mediaRecorder.start();
      
      // Stop recording after 5 seconds
      setTimeout(() => {
        if (mediaRecorder.state !== 'inactive') {
          mediaRecorder.stop();
          stream.getTracks().forEach(track => track.stop());
        }
      }, 5000);
      
      setIsRecording(true);
      toast({
        title: "Recording started",
        description: "Recording audio for 5 seconds...",
      });
    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast({
        title: "Microphone access denied",
        description: "Please allow microphone access to record audio.",
        variant: "destructive"
      });
    }
  };

  // Stop recording function
  const stopRecording = () => {
    // This will be triggered by the timeout
  };

  // Play/pause audio
  const togglePlayback = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    
    setIsPlaying(!isPlaying);
  };

  // Audio ended event handler
  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  // Clear audio file
  const clearAudio = () => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
    setAudioFile(null);
    setAudioUrl(null);
    setPrediction(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Analyze sound
  const analyzeSound = () => {
    if (!audioFile) return;
    
    setIsProcessing(true);
    
    // Simulate ML processing with timeout
    setTimeout(() => {
      // Mock prediction with random sound type
      const soundTypes = [
        { label: "Chainsaw", confidence: Math.random() * 20 + 80, isAlert: true },
        { label: "Rain", confidence: Math.random() * 40 + 60, isAlert: false },
        { label: "Fire crackling", confidence: Math.random() * 30 + 70, isAlert: true },
        { label: "Bird chirping", confidence: Math.random() * 40 + 60, isAlert: false },
        { label: "Wind", confidence: Math.random() * 40 + 60, isAlert: false },
        { label: "River flowing", confidence: Math.random() * 40 + 60, isAlert: false },
      ];
      
      const result = soundTypes[Math.floor(Math.random() * soundTypes.length)];
      setPrediction(result);
      
      if (result.isAlert) {
        toast({
          title: "⚠️ Alert Sound Detected",
          description: `Detected ${result.label} with ${result.confidence.toFixed(1)}% confidence`,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Sound Analyzed",
          description: `Detected ${result.label} with ${result.confidence.toFixed(1)}% confidence`
        });
      }
      
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <Card className="shadow-lg border-border/50 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm overflow-hidden">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium">Sound Prediction</CardTitle>
          <Badge variant="outline" className="px-2 py-0">ML Powered</Badge>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Upload or record a sound to analyze
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Audio player */}
          {audioUrl && (
            <div className="rounded-lg bg-muted/30 p-3 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium truncate max-w-[200px]">
                  {audioFile?.name || "Recorded Audio"}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={clearAudio}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <audio 
                ref={audioRef}
                src={audioUrl}
                onEnded={handleAudioEnded}
                className="hidden"
              />
              
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full"
                  onClick={togglePlayback}
                >
                  {isPlaying ? <PauseCircle className="h-4 w-4" /> : <PlayCircle className="h-4 w-4" />}
                </Button>
                <div className="bg-primary/20 h-8 flex-1 rounded-md relative overflow-hidden">
                  <div
                    className="absolute inset-0 flex items-center"
                  >
                    {Array.from({ length: 50 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-1 mx-[1px] bg-primary/60"
                        style={{
                          height: `${Math.random() * 60 + 10}%`,
                          opacity: isPlaying ? 0.6 + Math.random() * 0.4 : 0.3
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Upload/Record controls */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="audio/*"
                onChange={handleFileUpload}
                className="hidden"
                id="audio-upload"
              />
              <Button
                variant="outline"
                className="w-full"
                onClick={() => fileInputRef.current?.click()}
                disabled={isRecording || isProcessing}
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload
              </Button>
            </div>
            <Button
              variant={isRecording ? "destructive" : "outline"}
              className={cn(
                "w-full",
                isRecording && "animate-pulse"
              )}
              onClick={handleRecordToggle}
              disabled={isProcessing}
            >
              <Mic className="h-4 w-4 mr-2" />
              {isRecording ? "Stop" : "Record"}
            </Button>
          </div>
          
          {/* Analyze button */}
          <Button
            className="w-full" 
            onClick={analyzeSound}
            disabled={!audioFile || isProcessing || isRecording}
          >
            {isProcessing ? "Processing..." : "Analyze Sound"}
          </Button>
          
          {/* Prediction result */}
          {prediction && (
            <div className={cn(
              "mt-4 p-4 rounded-lg",
              prediction.isAlert 
                ? "bg-red-50 border border-red-200 dark:bg-red-900/20 dark:border-red-800/30" 
                : "bg-green-50 border border-green-200 dark:bg-green-900/20 dark:border-green-800/30"
            )}>
              <div className="flex items-center gap-2 mb-2">
                {prediction.isAlert && <AlertTriangle className="h-4 w-4 text-red-500" />}
                <h4 className={cn(
                  "font-medium",
                  prediction.isAlert ? "text-red-700 dark:text-red-400" : "text-green-700 dark:text-green-400"
                )}>
                  {prediction.label}
                </h4>
              </div>
              <div className="space-y-1">
                <div className="text-sm">Confidence:</div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div 
                    className={cn(
                      "h-full",
                      prediction.isAlert ? "bg-red-500" : "bg-green-500"
                    )}
                    style={{ width: `${prediction.confidence}%` }}
                  />
                </div>
                <div className="text-right text-sm font-mono">
                  {prediction.confidence.toFixed(1)}%
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
