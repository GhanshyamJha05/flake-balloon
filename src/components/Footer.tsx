/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ShieldCheck, Info } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/5 px-8 md:px-12 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 select-none text-[10px] uppercase tracking-[0.2em] text-slate-500 font-sans mt-auto z-10 bg-transparent">
      <div className="flex items-center gap-4">
        <div className="flex gap-1.5">
          <div className="w-1.5 h-1.5 bg-emerald-500/60 rounded-full animate-pulse" />
          <div className="w-1.5 h-1.5 bg-emerald-500/60 rounded-full animate-pulse [animation-delay:200ms]" />
        </div>
        <span>System Status: Nominal</span>
      </div>
      <div className="font-serif italic lowercase tracking-wider text-slate-400 first-letter:uppercase">
        Established 1994
      </div>
    </footer>
  );
}
