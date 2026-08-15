'use client';

import React from 'react';
import { useEnvironment } from '@/context/EnvironmentContext';
import { Season, TimeOfDay } from '@/types/environment';
import { ArrowUp, Sparkles, Github, Linkedin, Mail, Heart } from 'lucide-react';
import { PROFILE_DATA } from '@/data/profile';

const COMBINATIONS: { season: Season; time: TimeOfDay; label: string; icon: string }[] = [
  { season: 'summer', time: 'day', label: 'Summer Day', icon: '☀️' },
  { season: 'summer', time: 'night', label: 'Summer Night', icon: '🌌' },
  { season: 'rainy', time: 'day', label: 'Rainy Day', icon: '🌧️' },
  { season: 'rainy', time: 'night', label: 'Rainy Night', icon: '⛈️' },
  { season: 'winter', time: 'day', label: 'Winter Day', icon: '❄️' },
  { season: 'winter', time: 'night', label: 'Winter Night', icon: '🌙' },
];

export default function Footer() {
  const { theme, season, timeOfDay, setEnvironment } = useEnvironment();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="main-footer"
      className="relative z-10 border-t border-white/10 py-16 transition-colors duration-500 backdrop-blur-md"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.25)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Atmosphere Quick Selector Matrix in Footer */}
        <div className="p-6 rounded-3xl border border-white/10 mb-12 bg-black/20 backdrop-blur-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <h4 className="text-sm font-bold flex items-center gap-2">
                <Sparkles className="w-4 h-4" style={{ color: theme.accentColor }} />
                Instant Atmosphere Matrix
              </h4>
              <p className="text-xs opacity-70">
                Directly jump between any of the 6 procedural visual and lighting states.
              </p>
            </div>
            <div className="text-xs font-mono opacity-80">
              Active:{' '}
              <span className="font-bold uppercase" style={{ color: theme.accentColor }}>
                {season} • {timeOfDay}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
            {COMBINATIONS.map((c) => {
              const isActive = season === c.season && timeOfDay === c.time;
              return (
                <button
                  key={`${c.season}-${c.time}`}
                  id={`footer-preset-${c.season}-${c.time}`}
                  onClick={() => setEnvironment(c.season, c.time)}
                  className={`p-2.5 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    isActive
                      ? 'text-white shadow-md scale-105'
                      : 'opacity-70 hover:opacity-100 hover:bg-white/5'
                  }`}
                  style={{
                    backgroundColor: isActive ? theme.accentColor : 'transparent',
                    borderColor: isActive ? theme.accentColor : 'rgba(255,255,255,0.1)',
                  }}
                >
                  <span>{c.icon}</span>
                  <span className="text-[11px] truncate">{c.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer Main Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/10">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold flex items-center justify-center md:justify-start gap-2">
              <span>{PROFILE_DATA.name}</span>
              <span
                className="text-xs px-2 py-0.5 rounded-md font-mono"
                style={{ backgroundColor: `${theme.accentColor}25`, color: theme.accentColor }}
              >
                AI/ML
              </span>
            </h3>
            <p className="text-xs opacity-70 mt-1 max-w-sm">
              Handcrafted with Next.js, Three.js, TypeScript, Tailwind CSS &amp; Framer Motion.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              id="footer-github-link"
              href={PROFILE_DATA.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-black/10 dark:bg-white/5 hover:bg-black/20 dark:hover:bg-white/15 border border-white/10 transition-transform hover:scale-105"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              id="footer-linkedin-link"
              href={PROFILE_DATA.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-black/10 dark:bg-white/5 hover:bg-black/20 dark:hover:bg-white/15 border border-white/10 transition-transform hover:scale-105"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              id="footer-email-link"
              href={`mailto:${PROFILE_DATA.email}`}
              className="p-3 rounded-xl bg-black/10 dark:bg-white/5 hover:bg-black/20 dark:hover:bg-white/15 border border-white/10 transition-transform hover:scale-105"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          {/* Back to top */}
          <button
            id="back-to-top-btn"
            onClick={handleScrollToTop}
            className="p-3 rounded-xl border border-white/15 bg-black/10 dark:bg-white/5 hover:bg-black/20 dark:hover:bg-white/15 transition-all flex items-center gap-2 text-xs font-mono font-bold cursor-pointer"
            aria-label="Back to top"
          >
            <span>Top</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs opacity-60 font-mono text-center sm:text-left">
          <div>
            &copy; {new Date().getFullYear()} {PROFILE_DATA.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-1.5">
            <span>Built for Vercel / Cloud Run deployment</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
