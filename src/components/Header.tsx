/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { Sparkles, Clock, Compass } from "lucide-react";

export default function Header() {
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatClock = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  const formatCalendar = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  return (
    <header className="w-full bg-transparent border-b border-white/5 px-8 md:px-12 py-8 flex flex-col sm:flex-row items-center sm:items-end justify-between gap-4 select-none z-10">
      <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
        <h1 className="font-serif text-4xl font-light tracking-tight text-white mb-2">
          Aetheris
        </h1>
        <p className="text-[10px] uppercase tracking-[0.4em] text-slate-500 font-semibold font-sans">
          Environmental Atmosphere Orchestrator
        </p>
      </div>

      <div className="text-center sm:text-right flex flex-col items-center sm:items-end gap-1.5 font-sans">
        <div className="text-[10px] uppercase tracking-[0.25em] text-slate-400 font-semibold">
          Atmospheric Control Grid
        </div>
        <div className="h-[1px] w-32 bg-slate-800 my-1 hidden sm:block" />
        <div className="flex items-center gap-3 text-xs font-mono text-slate-500 tracking-wider">
          <span>{formatCalendar(time)}</span>
          <span className="h-2.5 w-[1px] bg-slate-800" />
          <span className="text-sky-200 font-medium">{formatClock(time)}</span>
        </div>
      </div>
    </header>
  );
}
