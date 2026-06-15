/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ControlCard from "./components/ControlCard";
import SimulationOverlay from "./components/SimulationOverlay";
import { SimulationType, SnowflakeParticle, BalloonParticle } from "./types";

const BALLOON_COLORS = [
  "#F43F5E", // Coral Rose (Rose 500)
  "#0EA5E9", // Sky Breeze (Sky 500)
  "#10B981", // Mint Emerald (Emerald 500)
  "#F59E0B", // Warm Amber (Amber 500)
  "#8B5CF6", // Royal Amethyst (Violet 500)
  "#EC4899", // Pastel Pink (Pink 500)
  "#06B6D4", // Bright Cyan (Cyan 500)
  "#F97316", // Mandarin Orange (Orange 500)
];

export default function App() {
  const [activeType, setActiveType] = useState<SimulationType>("none");
  const [triggerId, setTriggerId] = useState<string>("");
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [snowflakes, setSnowflakes] = useState<SnowflakeParticle[]>([]);
  const [balloons, setBalloons] = useState<BalloonParticle[]>([]);

  // Function to halt any active simulation instantly
  const handleStop = useCallback(() => {
    setActiveType("none");
    setTimeLeft(0);
    setSnowflakes([]);
    setBalloons([]);
  }, []);

  // Set up the high-resolution countdown timer
  useEffect(() => {
    if (activeType === "none") return;

    const intervalTime = 50; // Update progress bar every 50ms for smooth transitions
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= intervalTime) {
          clearInterval(timer);
          setActiveType("none");
          return 0;
        }
        return prev - intervalTime;
      });
    }, intervalTime);

    return () => {
      clearInterval(timer);
    };
  }, [activeType, triggerId]);

  // Handle triggering a simulation
  const handleTrigger = useCallback((type: SimulationType) => {
    // If the simulation is already active, we halt first to clear old states
    handleStop();

    // Small delay or direct instantiation of new particle array
    const timestampId = Math.random().toString();
    
    if (type === "snowflakes") {
      // Generate standard waves of medium sized snowflakes
      const count = 55;
      const newSnowflakes: SnowflakeParticle[] = Array.from({ length: count }, (_, i) => {
        const startX = 2 + Math.random() * 96; // Stay away from extreme vertical scrollbar edge
        const drift = 5 + Math.random() * 15;   // Sway oscillation amplitude
        const size = 18 + Math.random() * 8;    // Medium size range (18px to 26px)
        const speed = 2.6 + Math.random() * 1.3; // Glide down duration in seconds
        const delay = Math.random() * 1.6;      // Staggered entry delay (0s to 1.6s)
        const spin = 180 + Math.random() * 360;  // Rotate between 180% and 540%
        const opacity = 0.55 + Math.random() * 0.40; // Soft layered visibility
        
        return {
          id: `snowflake-${i}-${timestampId}`,
          startX,
          drift,
          size,
          speed,
          delay,
          spin,
          opacity,
        };
      });
      
      setSnowflakes(newSnowflakes);
      setTimeLeft(5000);
      setActiveType("snowflakes");
      setTriggerId(timestampId);
    } else if (type === "balloons") {
      // Generate waves of medium sized buoyant balloons
      const count = 26;
      const newBalloons: BalloonParticle[] = Array.from({ length: count }, (_, i) => {
        const startX = 6 + Math.random() * 88; // Keep within comfortable central view borders
        const sway = 8 + Math.random() * 14;   // Gentle horizontal sinusoidal wind drift
        const size = 36 + Math.random() * 10;   // Medium sized envelope width (36px to 46px)
        const speed = 3.2 + Math.random() * 1.4; // Rise duration in seconds
        const delay = Math.random() * 1.3;      // Staggered launch delays
        const color = BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)];
        const tilt = 5 + Math.random() * 10;    // Wobble/tilt tilt degrees (5 to 15 degrees)
        
        return {
          id: `balloon-${i}-${timestampId}`,
          startX,
          sway,
          size,
          speed,
          delay,
          color,
          tilt: Math.random() > 0.5 ? tilt : -tilt, // Alternate tilt orientation
        };
      });

      setBalloons(newBalloons);
      setTimeLeft(5000);
      setActiveType("balloons");
      setTriggerId(timestampId);
    }
  }, [handleStop]);

  return (
    <div className="relative min-h-screen bg-[#0F1115] bg-[radial-gradient(circle_at_center,rgba(30,41,59,0.22)_0%,#0F1115_100%)] flex flex-col justify-between overflow-x-hidden selection:bg-slate-800 selection:text-slate-100">
      
      {/* Absolute Full Screen Particle Animation Overlay (Stays beneath buttons but captures full monitor height) */}
      <SimulationOverlay 
        activeType={activeType}
        snowflakes={snowflakes}
        balloons={balloons}
      />

      {/* Top Professional Header */}
      <Header />

      {/* Main Control Hub Workspace */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-12 z-10 relative">
        <ControlCard 
          activeType={activeType}
          timeLeft={timeLeft}
          onTrigger={handleTrigger}
          onStop={handleStop}
        />
      </main>

      {/* Professional Cohesive Footer */}
      <Footer />
    </div>
  );
}
