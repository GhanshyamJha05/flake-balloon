/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SnowflakeParticle {
  id: string;
  startX: number; // Percentage X coordinate (0 to 100)
  drift: number;  // Drift amplitude in percentage/pixels
  size: number;   // Diameter in pixels (20 to 28)
  speed: number;  // Duration of descent in seconds
  delay: number;  // Delay before starting animation in seconds
  spin: number;   // Spin angle in degrees (e.g. 180 to 540)
  opacity: number;// Opacity multiplier (0.6 to 0.95)
}

export interface BalloonParticle {
  id: string;
  startX: number; // Percentage X coordinate (0 to 100)
  sway: number;   // Horizontal sway amplitude
  size: number;   // Width in pixels (38 to 46)
  speed: number;  // Duration of ascent in seconds
  delay: number;  // Delay before starting animation in seconds
  color: string;  // Hex color for the balloon envelope
  tilt: number;   // Max tilt sway angle in degrees
}

export type SimulationType = 'none' | 'snowflakes' | 'balloons';
