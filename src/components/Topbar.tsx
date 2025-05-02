
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { Bell, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LoraxLogo } from "./LoraxLogo";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function Topbar() {
  const [isLive, setIsLive] = useState(true);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6">
      <div className="flex flex-1">
        <LoraxLogo className="md:hidden" />
        <div className="hidden md:block ml-4">
          <div className={cn(
            "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
            isLive 
              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" 
              : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
          )}>
            <span className={cn(
              "mr-1 h-2 w-2 rounded-full",
              isLive ? "bg-green-600 dark:bg-green-400" : "bg-red-600 dark:bg-red-400"
            )} />
            {isLive ? "Live" : "Offline"}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" className="rounded-full relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold">
            2
          </span>
        </Button>
        <ThemeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
