'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Season, TimeOfDay, EnvironmentTheme } from '@/types/environment';
import { getEnvironmentTheme } from '@/lib/environmentThemes';

interface EnvironmentContextType {
  season: Season;
  timeOfDay: TimeOfDay;
  theme: EnvironmentTheme;
  setSeason: (season: Season) => void;
  setTimeOfDay: (timeOfDay: TimeOfDay) => void;
  cycleSeason: () => void;
  toggleTimeOfDay: () => void;
  setEnvironment: (season: Season, timeOfDay: TimeOfDay) => void;
  isMounted: boolean;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  toggleSound: () => void;
}

const EnvironmentContext = createContext<EnvironmentContextType | undefined>(undefined);

const SEASONS: Season[] = ['summer', 'rainy', 'winter'];

export function EnvironmentProvider({ children }: { children: React.ReactNode }) {
  const [season, setSeasonState] = useState<Season>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('sharan_portfolio_season') as Season;
        if (saved && ['summer', 'rainy', 'winter'].includes(saved)) {
          return saved;
        }
      } catch {}
    }
    return 'summer';
  });

  const [timeOfDay, setTimeOfDayState] = useState<TimeOfDay>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('sharan_portfolio_time') as TimeOfDay;
        if (saved && ['day', 'night'].includes(saved)) {
          return saved;
        }
      } catch {}
    }
    return 'day';
  });

  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('sharan_portfolio_sound');
        if (saved !== null) {
          return saved === 'true';
        }
      } catch {}
    }
    return false;
  });

  const isMounted = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const setSeason = useCallback((newSeason: Season) => {
    setSeasonState(newSeason);
    try {
      localStorage.setItem('sharan_portfolio_season', newSeason);
    } catch {}
  }, []);

  const setTimeOfDay = useCallback((newTime: TimeOfDay) => {
    setTimeOfDayState(newTime);
    try {
      localStorage.setItem('sharan_portfolio_time', newTime);
    } catch {}
  }, []);

  const setEnvironment = useCallback((newSeason: Season, newTime: TimeOfDay) => {
    setSeasonState(newSeason);
    setTimeOfDayState(newTime);
    try {
      localStorage.setItem('sharan_portfolio_season', newSeason);
      localStorage.setItem('sharan_portfolio_time', newTime);
    } catch {}
  }, []);

  const cycleSeason = useCallback(() => {
    setSeasonState((current) => {
      const currentIndex = SEASONS.indexOf(current);
      const nextSeason = SEASONS[(currentIndex + 1) % SEASONS.length];
      try {
        localStorage.setItem('sharan_portfolio_season', nextSeason);
      } catch {}
      return nextSeason;
    });
  }, []);

  const toggleTimeOfDay = useCallback(() => {
    setTimeOfDayState((current) => {
      const nextTime = current === 'day' ? 'night' : 'day';
      try {
        localStorage.setItem('sharan_portfolio_time', nextTime);
      } catch {}
      return nextTime;
    });
  }, []);

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('sharan_portfolio_sound', String(next));
      } catch {}
      return next;
    });
  }, []);

  const theme = getEnvironmentTheme(season, timeOfDay);

  return (
    <EnvironmentContext.Provider
      value={{
        season,
        timeOfDay,
        theme,
        setSeason,
        setTimeOfDay,
        cycleSeason,
        toggleTimeOfDay,
        setEnvironment,
        isMounted,
        soundEnabled,
        setSoundEnabled,
        toggleSound,
      }}
    >
      {children}
    </EnvironmentContext.Provider>
  );
}

export function useEnvironment() {
  const context = useContext(EnvironmentContext);
  if (!context) {
    throw new Error('useEnvironment must be used within an EnvironmentProvider');
  }
  return context;
}
