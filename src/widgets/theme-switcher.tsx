/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useTheme } from "next-themes";
import { Moon, Sun, Monitor } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="bg-accent rounded-full w-9 h-9 animate-pulse" />;
  }

  return (
    <div className="flex items-center bg-surface-container-low shadow-sm p-1 border border-border rounded-full">
      <button
        onClick={() => setTheme("light")}
        className={`p-1.5 rounded-full transition-all ${theme === "light"
          ? "bg-background text-foreground shadow-sm"
          : "text-muted-foreground hover:text-foreground"
          }`}
        aria-label="Light mode"
      >
        <Sun className="w-4 h-4" />
      </button>
      <button
        onClick={() => setTheme("system")}
        className={`p-1.5 rounded-full transition-all ${theme === "system"
          ? "bg-background text-foreground shadow-sm"
          : "text-muted-foreground hover:text-foreground"
          }`}
        aria-label="System mode"
      >
        <Monitor className="w-4 h-4" />
      </button>
      <button
        onClick={() => setTheme("dark")}
        className={`p-1.5 rounded-full transition-all ${theme === "dark"
          ? "bg-background text-foreground shadow-sm"
          : "text-muted-foreground hover:text-foreground"
          }`}
        aria-label="Dark mode"
      >
        <Moon className="w-4 h-4" />
      </button>
    </div>
  );
}
