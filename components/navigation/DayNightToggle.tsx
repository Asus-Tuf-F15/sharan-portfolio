'use client';

import React from 'react';
import { motion } from 'motion/react';
import { useEnvironment } from '@/context/EnvironmentContext';
import { Sun, Moon } from 'lucide-react';
import { ambientSound } from '@/lib/ambientSound';

export default function DayNightToggle() {
  const { season, timeOfDay, toggleTimeOfDay, soundEnabled } = useEnvironment();
  const isNight = timeOfDay === 'night';

  const handleToggle = () => {
    const nextTime = isNight ? 'day' : 'night';
    toggleTimeOfDay();
    if (soundEnabled) {
      ambientSound.play(season, nextTime);
    }
  };

  return (
    <button
      id="day-night-toggle"
      onClick={handleToggle}
      aria-label={`Toggle between day and night mode. Currently ${timeOfDay}`}
      className="relative flex items-center gap-1.5 p-1 rounded-full bg-slate-900/40 backdrop-blur-xl border border-white/10 shadow-inner focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 group cursor-pointer"
    >
      <div className="relative flex items-center">
        {/* Day Button representation */}
        <div
          className={`flex items-center gap-1 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors duration-200 ${
            !isNight ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'
          }`}
        >
          {!isNight && (
            <motion.div
              layoutId="day-night-indicator"
              className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-500/80 to-amber-600/80 shadow-md shadow-amber-950/40 border border-amber-300/40"
              transition={{ type: 'spring', stiffness: 450, damping: 35 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-1">
            <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300 animate-[spin_12s_linear_infinite]" />
            <span className="hidden md:inline font-sans">Day</span>
          </span>
        </div>

        {/* Night Button representation */}
        <div
          className={`flex items-center gap-1 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors duration-200 ${
            isNight ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'
          }`}
        >
          {isNight && (
            <motion.div
              layoutId="day-night-indicator"
              className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-600/80 to-slate-800/90 shadow-md shadow-black/40 border border-indigo-400/40"
              transition={{ type: 'spring', stiffness: 450, damping: 35 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-1">
            <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-300" />
            <span className="hidden md:inline font-sans">Night</span>
          </span>
        </div>
      </div>
    </button>
  );
}
