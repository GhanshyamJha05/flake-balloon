/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { SnowflakeParticle, BalloonParticle, SimulationType } from "../types";
import { Snowflake } from "lucide-react";

interface SimulationOverlayProps {
  activeType: SimulationType;
  snowflakes: SnowflakeParticle[];
  balloons: BalloonParticle[];
}

export default function SimulationOverlay({
  activeType,
  snowflakes,
  balloons,
}: SimulationOverlayProps) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-50">
      <AnimatePresence mode="wait">
        {activeType === "snowflakes" && (
          <motion.div
            key="snowflakes-container"
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.6 } }}
          >
            {snowflakes.map((flake) => (
              <motion.div
                key={flake.id}
                className="absolute text-slate-300"
                style={{
                  left: `${flake.startX}%`,
                  top: "-5%",
                  width: `${flake.size}px`,
                  height: `${flake.size}px`,
                  opacity: flake.opacity,
                }}
                initial={{ y: "-10vh", x: 0, rotate: 0, opacity: 0 }}
                animate={{
                  y: "115vh",
                  x: [0, flake.drift, -flake.drift, flake.drift / 2, 0],
                  rotate: flake.spin,
                  opacity: [0, flake.opacity, flake.opacity, 0],
                }}
                transition={{
                  duration: flake.speed,
                  delay: flake.delay,
                  ease: "linear",
                  repeat: 0,
                }}
              >
                <Snowflake
                  style={{ width: `${flake.size}px`, height: `${flake.size}px` }}
                  className="text-sky-200/80 filter drop-shadow-[0_2px_4px_rgba(255,255,255,0.4)]"
                />
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeType === "balloons" && (
          <motion.div
            key="balloons-container"
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
          >
            {balloons.map((balloon) => (
              <motion.div
                key={balloon.id}
                className="absolute flex flex-col items-center"
                style={{
                  left: `${balloon.startX}%`,
                  bottom: "-15%",
                  width: `${balloon.size}px`,
                }}
                initial={{ y: "15vh", x: 0, rotate: 0, opacity: 0 }}
                animate={{
                  y: "-115vh",
                  x: [0, balloon.sway, -balloon.sway, balloon.sway / 2, 0],
                  rotate: [0, balloon.tilt, -balloon.tilt, balloon.tilt / 2, 0],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: balloon.speed,
                  delay: balloon.delay,
                  ease: "easeOut",
                  repeat: 0,
                }}
              >
                {/* Balloon Envelope */}
                <div
                  className="rounded-t-full rounded-b-[75%] shadow-md select-none relative"
                  style={{
                    width: `${balloon.size}px`,
                    height: `${balloon.size * 1.25}px`,
                    background: `radial-gradient(circle at 35% 30%, #fff -20%, ${balloon.color} 55%, rgba(0,0,0,0.1) 100%)`,
                    border: `1px solid rgba(255,255,255,0.15)`,
                  }}
                >
                  {/* Sheen effect */}
                  <div className="absolute top-1.5 left-2.5 w-2 h-4 bg-white/25 rounded-full rotate-[-15deg]" />
                </div>

                {/* Balloon base/neck */}
                <div
                  className="w-0 h-0 border-l-[3.5px] border-l-transparent border-r-[3.5px] border-r-transparent border-b-[5px] mx-auto -mt-[1px]"
                  style={{ borderBottomColor: balloon.color }}
                />

                {/* Balloon thread/string */}
                <div className="w-[1px] h-12 bg-slate-300/50 mx-auto mt-0.5 rounded-full" />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
