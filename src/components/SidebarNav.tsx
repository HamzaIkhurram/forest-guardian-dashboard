
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { LoraxLogo } from "./LoraxLogo";
import { Button } from "@/components/ui/button";
import {
  Activity,
  AlertOctagon,
  ArrowDown,
  ArrowUp,
  Bell,
  GaugeCircle,
  Monitor,
  Settings,
  TrendingUp
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

interface SidebarNavProps {
  className?: string;
}

export function SidebarNav({ className }: SidebarNavProps) {
  const [expanded, setExpanded] = useState(true);
  const location = useLocation();

  // Auto-collapse sidebar on small screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setExpanded(false);
      } else {
        setExpanded(true);
      }
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const navItems = [
    {
      title: "Dashboard",
      icon: <Activity className="h-5 w-5" />,
      path: "/",
    },
    {
      title: "Sound Threshold",
      icon: <GaugeCircle className="h-5 w-5" />,
      path: "/sound-threshold",
    },
    {
      title: "Live Monitoring",
      icon: <Monitor className="h-5 w-5" />,
      path: "/live-monitoring",
    },
    {
      title: "Detections & Alerts",
      icon: <AlertOctagon className="h-5 w-5" />,
      path: "/detections",
      badge: 2,
    },
    {
      title: "Historical Trends",
      icon: <TrendingUp className="h-5 w-5" />,
      path: "/historical",
    },
    {
      title: "Settings",
      icon: <Settings className="h-5 w-5" />,
      path: "/settings",
    },
  ];

  return (
    <div
      className={cn(
        "relative h-screen bg-sidebar transition-all duration-300 border-r border-border shadow-md z-50",
        expanded ? "w-[240px]" : "w-[64px]",
        className
      )}
    >
      <div className="p-4">
        <div className="flex justify-between items-center">
          {expanded && <LoraxLogo className="ml-1" />}
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "rounded-full hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              expanded ? "" : "mx-auto"
            )}
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <ArrowDown className="h-5 w-5" />
            ) : (
              <ArrowUp className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      <nav className="mt-6 px-2">
        <ul className="space-y-2">
          {navItems.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "flex items-center py-2 px-3 rounded-2xl transition-all duration-200",
                    "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    location.pathname === item.path
                      ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium shadow-sm"
                      : "text-sidebar-foreground"
                  )
                }
              >
                <span className="flex items-center justify-center relative">
                  {item.icon}
                  {item.badge && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center bg-red-500 text-white text-[10px] font-bold rounded-full">
                      {item.badge}
                    </span>
                  )}
                </span>
                {expanded && (
                  <span className={cn(
                    "ml-3 transition-opacity duration-200",
                    expanded ? "opacity-100" : "opacity-0"
                  )}>
                    {item.title}
                  </span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Environment badge */}
      {expanded && (
        <div className="absolute bottom-4 left-0 right-0 px-4">
          <div className="py-2 px-3 bg-sidebar-accent/50 rounded-xl text-center">
            <div className="text-xs font-medium text-sidebar-foreground/70">Lorax Forest Guard</div>
            <div className="text-[10px] text-sidebar-foreground/60">v1.5.2 - Production</div>
          </div>
        </div>
      )}
    </div>
  );
}
