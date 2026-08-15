'use client';

import React from 'react';
import { motion } from 'motion/react';
import { useEnvironment } from '@/context/EnvironmentContext';
import { Season } from '@/types/environment';
import { Sun, CloudRain, Snowflake } from 'lucide-react';
import { ambientSound } from '@/lib/ambientSound';

interface SeasonOption {
  id: Season;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const SEASONS: SeasonOption[] = [
  { id: 'summer', label: 'Summer', icon: Sun, color: 'text-amber-500' },
  { id: 'rainy', label: 'Rainy', icon: CloudRain, color: 'text-sky-500' },
  { id: 'winter', label: 'Winter', icon: Snowflake, color: 'text-indigo-400' },
];

export default function SeasonSelector() {
  const { season, timeOfDay, setSeason, soundEnabled } = useEnvironment();

  const handleSelect = (s: Season) => {
    setSeason(s);
    if (soundEnabled) {
      ambientSound.play(s, timeOfDay);
    }
  };

  return (
    <div
      id="season-selector"
      className="inline-flex items-center p-1 rounded-full bg-slate-900/40 backdrop-blur-xl border border-white/10 shadow-inner"
      role="group"
      aria-label="Season selector"
    >
      {SEASONS.map((item) => {
        const Icon = item.icon;
        const isActive = season === item.id;

        return (
          <button
            key={item.id}
            id={`season-btn-${item.id}`}
            onClick={() => handleSelect(item.id)}
            aria-pressed={isActive}
            className={`relative px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors duration-200 flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
              isActive
                ? 'text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="active-season-pill"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-600/80 to-teal-600/80 shadow-md shadow-emerald-950/40 border border-emerald-400/30"
                transition={{ type: 'spring', stiffness: 450, damping: 35 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1">
              <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isActive ? 'text-white' : item.color}`} />
              <span className="hidden sm:inline font-sans">{item.label}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
