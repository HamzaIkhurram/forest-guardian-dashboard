
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import { Layout } from "./components/Layout";
import Splash from "./pages/Splash";
import Dashboard from "./pages/Dashboard";
import SoundThreshold from "./pages/SoundThreshold";
import LiveMonitoring from "./pages/LiveMonitoring";
import Detections from "./pages/Detections";
import Historical from "./pages/Historical";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Splash />} />
            <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
            <Route path="/sound-threshold" element={<Layout><SoundThreshold /></Layout>} />
            <Route path="/live-monitoring" element={<Layout><LiveMonitoring /></Layout>} />
            <Route path="/detections" element={<Layout><Detections /></Layout>} />
            <Route path="/historical" element={<Layout><Historical /></Layout>} />
            <Route path="/settings" element={<Layout><Settings /></Layout>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
