/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Snowflake, Sparkles, AlertCircle, RefreshCw, Square } from "lucide-react";
import { SimulationType } from "../types";

interface ControlCardProps {
  activeType: SimulationType;
  timeLeft: number; // in miliseconds, 0 to 5000
  onTrigger: (type: SimulationType) => void;
  onStop: () => void;
}

export default function ControlCard({
  activeType,
  timeLeft,
  onTrigger,
  onStop,
}: ControlCardProps) {
  const isSnowActive = activeType === "snowflakes";
  const isBalloonActive = activeType === "balloons";
  const isAnyActive = activeType !== "none";

  // Calculate percentage for progress bar
  const progressPercent = (timeLeft / 5000) * 100;

  return (
    <div className="w-full max-w-4xl bg-[#111319]/70 border border-white/5 backdrop-blur-md rounded-2xl shadow-[0_24px_50px_rgba(0,0,0,0.5)] p-8 md:p-10 flex flex-col justify-between font-sans relative overflow-hidden">
      
      {/* Decorative center radial background highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-slate-800/10 filter blur-[90px] rounded-full pointer-events-none" />

      {/* Top Section */}
      <div className="mb-10 z-10">
        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 tracking-[0.3em] uppercase mb-3">
          <Sparkles className="h-3.5 w-3.5 text-slate-500" />
          <span>Interactive Presentation Canvas</span>
        </div>
        <h2 className="font-serif text-3xl md:text-5xl font-light text-white tracking-tight mb-3">
          Atmospheric Visualization Console
        </h2>
        <p className="text-slate-400 text-xs md:text-sm leading-relaxed max-w-2xl">
          Instantiate highly atmospheric particle models inside the workspace. 
          Each simulation executes with hardware-accelerated precision for an exact duration of 5.0 seconds.
        </p>
      </div>

      {/* Two Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 z-10">
        
        {/* Snowflakes Card */}
        <div 
          className={`flex flex-col items-center p-8 rounded-xl border group transition-all duration-300 ${
            isSnowActive 
              ? "bg-[#181D26]/80 border-sky-500/30 shadow-[0_12px_40px_rgba(14,165,233,0.04)]" 
              : "bg-[#14171E]/50 border-white/5 hover:bg-[#181D26]/50 hover:border-white/10"
          }`}
        >
          {/* Elegant vertical alignment line */}
          <div className={`w-[1px] h-16 bg-gradient-to-b from-transparent transition-all duration-700 mb-6 ${
            isSnowActive ? "to-sky-400" : "to-slate-800 group-hover:to-sky-400/80"
          }`} />

          <div className="flex flex-col items-center text-center">
            <div className={`p-3.5 rounded-full mb-4 border ${
              isSnowActive ? "bg-sky-500/10 text-sky-300 border-sky-400/30" : "bg-white/5 text-slate-400 border-white/5"
            }`}>
              <Snowflake className={`h-6 w-6 ${isSnowActive ? "animate-spin" : ""}`} />
            </div>
            
            <h3 className="font-serif font-light text-white text-xl mb-1 uppercase tracking-wider">Snowflakes Cascade</h3>
            <p className="text-[9px] text-slate-500 uppercase tracking-[0.3em] font-semibold mb-4">Crystalline Modulation</p>
            <p className="text-slate-400 text-xs leading-relaxed mb-8 max-w-xs">
              Generates a gentle array of intermediate-sized ice crystals falling under simulated gravity. 
              Features horizontal drift currents, variable speeds, and unique rotations.
            </p>
          </div>

          <button
            id="snowflake-trigger-btn"
            onClick={() => onTrigger("snowflakes")}
            disabled={isSnowActive}
            className={`w-full max-w-[240px] py-3.5 px-6 border text-[11px] font-semibold uppercase tracking-[0.25em] transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 h-12 rounded-none ${
              isSnowActive 
                ? "bg-sky-500/10 text-sky-200 border-sky-404/30 cursor-default" 
                : "bg-transparent text-slate-400 border-slate-800 hover:border-slate-200 hover:text-white hover:bg-white/[0.01]"
            }`}
          >
            <Snowflake className="h-3.5 w-3.5" />
            {isSnowActive ? "Running" : "Launch"}
          </button>
        </div>

        {/* Balloons Card */}
        <div 
          className={`flex flex-col items-center p-8 rounded-xl border group transition-all duration-300 ${
            isBalloonActive 
              ? "bg-[#181D26]/80 border-rose-500/30 shadow-[0_12px_40px_rgba(244,63,94,0.04)]" 
              : "bg-[#14171E]/50 border-white/5 hover:bg-[#181D26]/50 hover:border-white/10"
          }`}
        >
          {/* Elegant vertical alignment line */}
          <div className={`w-[1px] h-16 bg-gradient-to-b from-transparent transition-all duration-700 mb-6 ${
            isBalloonActive ? "to-rose-400" : "to-slate-800 group-hover:to-rose-400/80"
          }`} />

          <div className="flex flex-col items-center text-center">
            <div className={`p-3.5 rounded-full mb-4 border ${
              isBalloonActive ? "bg-rose-500/10 text-rose-300 border-rose-400/30" : "bg-white/5 text-slate-400 border-white/5"
            }`}>
              <Sparkles className={`h-6 w-6 ${isBalloonActive ? "animate-bounce" : ""}`} />
            </div>
            
            <h3 className="font-serif font-light text-white text-xl mb-1 uppercase tracking-wider">Balloons Ascent</h3>
            <p className="text-[9px] text-slate-500 uppercase tracking-[0.3em] font-semibold mb-4">Buoyant Distribution</p>
            <p className="text-slate-400 text-xs leading-relaxed mb-8 max-w-xs">
              Releases a premium selection of helium-inflated pastel balloons floating with upwards buoyancy. 
              Features gentle sine-wave swayed motion trajectories and custom rotating offsets.
            </p>
          </div>

          <button
            id="balloon-trigger-btn"
            onClick={() => onTrigger("balloons")}
            disabled={isBalloonActive}
            className={`w-full max-w-[240px] py-3.5 px-6 border text-[11px] font-semibold uppercase tracking-[0.25em] transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 h-12 rounded-none ${
              isBalloonActive 
                ? "bg-rose-500/10 text-rose-200 border-rose-404/30 cursor-default" 
                : "bg-transparent text-slate-400 border-slate-800 hover:border-slate-200 hover:text-white hover:bg-white/[0.01]"
            }`}
          >
            <Sparkles className="h-3.5 w-3.5" />
            {isBalloonActive ? "Running" : "Launch"}
          </button>
        </div>

      </div>

      {/* Active State / Progress Monitoring Panel */}
      <div className="border border-white/5 rounded-xl p-5 bg-[#14171E]/60 backdrop-blur-md flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-5 z-10">
        <div className="flex items-center gap-4">
          <div className="relative flex items-center justify-center">
            {isAnyActive ? (
              <span className="relative flex h-3.5 w-3.5">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isSnowActive ? "bg-sky-400" : "bg-rose-400"}`}></span>
                <span className={`relative inline-flex rounded-full h-3.5 w-3.5 ${isSnowActive ? "bg-sky-500" : "bg-rose-500"}`}></span>
              </span>
            ) : (
              <span className="relative flex h-3 w-3">
                <span className="relative inline-flex rounded-full h-3 w-3 bg-slate-700"></span>
              </span>
            )}
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-200 tracking-wider uppercase">
              {isSnowActive && "Cascade Active: Snowflakes"}
              {isBalloonActive && "Ascent Active: Balloons"}
              {!isAnyActive && "Simulation Grid: Standby"}
            </div>
            <div className="text-[11px] text-slate-500 font-mono mt-0.5">
              {isAnyActive 
                ? `${(timeLeft / 1000).toFixed(2)}s remaining in active viewport frame` 
                : "Request a trigger command above to instantiate model"
              }
            </div>
          </div>
        </div>

        {isAnyActive ? (
          <div className="flex items-center gap-4 flex-1 sm:max-w-xs">
            {/* Countdown Slider Progress Bar */}
            <div className="flex-1 h-1.5 bg-slate-900 border border-white/5 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-75 ease-linear ${
                  isSnowActive ? "bg-sky-400" : "bg-rose-400"
                }`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            {/* Terminate Button */}
            <button
              id="halt-simulation-btn"
              onClick={onStop}
              className="py-2 px-3.5 bg-transparent hover:bg-rose-950/20 text-slate-400 hover:text-rose-400 rounded-lg text-[10px] font-semibold uppercase tracking-wider cursor-pointer transition flex items-center gap-2 border border-slate-800 hover:border-rose-900/40 active:translate-y-0.5"
              title="Terminate Active Simulation"
            >
              <Square className="h-3 w-3 fill-current" />
              <span>Halt</span>
            </button>
          </div>
        ) : (
          <div className="text-xs text-slate-600 flex items-center gap-1.5 sm:text-right font-sans">
            <AlertCircle className="h-3.5 w-3.5 text-slate-700" />
            <span className="uppercase tracking-wider text-[10px] font-semibold text-slate-500">Ready for trigger command</span>
          </div>
        )}
      </div>

    </div>
  );
}
