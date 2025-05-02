
import { useState } from "react";
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
  MonitorWave,
  Settings,
  TrendingUp
} from "lucide-react";
import { NavLink } from "react-router-dom";

interface SidebarNavProps {
  className?: string;
}

export function SidebarNav({ className }: SidebarNavProps) {
  const [expanded, setExpanded] = useState(false);

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
      icon: <MonitorWave className="h-5 w-5" />,
      path: "/live-monitoring",
    },
    {
      title: "Detections & Alerts",
      icon: <AlertOctagon className="h-5 w-5" />,
      path: "/detections",
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
        "relative h-screen bg-sidebar transition-all duration-300 border-r border-border",
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
              "rounded-full ml-auto",
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
                    "flex items-center py-2 px-3 rounded-2xl transition-colors",
                    "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                      : "text-sidebar-foreground"
                  )
                }
              >
                <span className="flex items-center justify-center">
                  {item.icon}
                </span>
                {expanded && <span className="ml-3">{item.title}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
