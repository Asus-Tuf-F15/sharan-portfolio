'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useEnvironment } from '@/context/EnvironmentContext';

export default function EnvironmentBackground() {
  const { season, timeOfDay, theme } = useEnvironment();
  const isNight = timeOfDay === 'night';

  return (
    <div
      id="environment-backdrop-root"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Sky Canvas / Base Layer with AnimatePresence for smooth cross-fading */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${season}-${timeOfDay}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="absolute inset-0 w-full h-full"
        >
          {/* ================= SUMMER DAY ================= */}
          {season === 'summer' && !isNight && (
            <div className="absolute inset-0 bg-gradient-to-b from-[#e8f5e9] via-[#f0fdf4] to-[#fefce8]">
              {/* Radiant Sun with Multilayer Halo */}
              <div className="absolute top-[6%] right-[14%] w-48 h-48 rounded-full bg-gradient-to-tr from-amber-400 via-amber-300 to-yellow-100 blur-[4px] shadow-[0_0_120px_40px_rgba(251,191,36,0.45)] opacity-95 animate-pulse-subtle" />
              <div className="absolute top-[3%] right-[10%] w-72 h-72 rounded-full bg-amber-300/20 blur-[80px]" />

              {/* Sun Light Shafts */}
              <div
                className="absolute top-0 right-0 w-[80vw] h-[80vh] opacity-30 pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at 85% 10%, rgba(254, 240, 138, 0.45) 0%, rgba(52, 211, 153, 0.15) 45%, transparent 75%)',
                }}
              />

              {/* Soft Summer Breeze Cloud Bands */}
              <div className="absolute top-[18%] left-[-10%] w-[120%] h-36 bg-gradient-to-r from-transparent via-white/50 to-transparent blur-3xl" />
              <div className="absolute top-[35%] right-[-10%] w-[110%] h-28 bg-gradient-to-l from-transparent via-emerald-100/30 to-transparent blur-2xl" />
            </div>
          )}

          {/* ================= SUMMER NIGHT ================= */}
          {season === 'summer' && isNight && (
            <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-[#091124] to-[#041a18]">
              {/* Deep Starlight Pattern */}
              <div className="absolute inset-0 bg-[radial-gradient(white,rgba(255,255,255,.25)_1px,transparent_20px)] bg-[size:44px_44px] opacity-45" />

              {/* Glowing Crescent Moon with Corona */}
              <div className="absolute top-[8%] right-[16%] w-28 h-28 rounded-full bg-gradient-to-br from-emerald-100 to-slate-200 shadow-[0_0_70px_25px_rgba(52,211,153,0.3)] flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-[#091124] translate-x-3 -translate-y-1" />
              </div>

              {/* Emerald & Indigo Cosmic Nebula */}
              <div className="absolute top-[25%] left-[8%] w-[600px] h-[350px] rounded-full bg-emerald-500/12 blur-[120px] pointer-events-none" />
              <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[300px] rounded-full bg-indigo-500/15 blur-[110px] pointer-events-none" />
            </div>
          )}

          {/* ================= RAINY DAY ================= */}
          {season === 'rainy' && !isNight && (
            <div className="absolute inset-0 bg-gradient-to-b from-[#94a3b8] via-[#cbd5e1] to-[#64748b]/80">
              {/* Dense Overcast Cloud Cover */}
              <div className="absolute top-0 left-0 right-0 h-80 bg-gradient-to-b from-slate-700/40 via-slate-500/25 to-transparent blur-2xl" />

              {/* Diffuse Filtered Solar Glow Behind Clouds */}
              <div className="absolute top-[12%] right-[18%] w-36 h-36 rounded-full bg-slate-100/40 blur-2xl shadow-[0_0_80px_rgba(186,230,253,0.35)]" />

              {/* Layered Atmospheric Rain Mist */}
              <div className="absolute bottom-[10%] left-0 right-0 h-52 bg-gradient-to-t from-sky-200/30 via-slate-300/20 to-transparent blur-lg" />
              <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-slate-600/30 to-transparent" />
            </div>
          )}

          {/* ================= RAINY NIGHT ================= */}
          {season === 'rainy' && isNight && (
            <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#081b33] to-[#020914]">
              {/* Storm Cloud Mass */}
              <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-black/80 via-slate-900/60 to-transparent blur-3xl" />

              {/* Electric Cyan Tempest Atmosphere */}
              <div className="absolute top-[15%] left-[20%] w-[700px] h-[400px] rounded-full bg-sky-500/15 blur-[140px] pointer-events-none" />
              <div className="absolute bottom-[25%] right-[15%] w-[600px] h-[350px] rounded-full bg-blue-600/12 blur-[130px] pointer-events-none" />

              {/* Wet Ground Reflective Glare */}
              <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-sky-950/40 to-transparent blur-md" />
            </div>
          )}

          {/* ================= WINTER DAY ================= */}
          {season === 'winter' && !isNight && (
            <div className="absolute inset-0 bg-gradient-to-b from-[#e0f2fe] via-[#ede9fe]/70 to-[#f8fafc]">
              {/* Arctic Crystalline Sun */}
              <div className="absolute top-[5%] right-[14%] w-40 h-40 rounded-full bg-gradient-to-tr from-sky-200 via-indigo-100 to-white shadow-[0_0_100px_40px_rgba(186,230,253,0.65)] opacity-95" />

              {/* Prismatic Ice Halo */}
              <div className="absolute top-[2%] right-[10%] w-64 h-64 rounded-full border border-sky-300/30 blur-[1px]" />
              <div className="absolute top-[0%] right-[7%] w-80 h-80 rounded-full border border-indigo-200/20 blur-[2px]" />

              {/* Crystalline Light Frost Grid */}
              <div className="absolute inset-0 bg-[radial-gradient(#c7d2fe_1px,transparent_1px)] [background-size:36px_36px] opacity-35" />
            </div>
          )}

          {/* ================= WINTER NIGHT ================= */}
          {season === 'winter' && isNight && (
            <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#091122] to-[#020c18]">
              {/* Polar Aurora Borealis Wave Ribbons */}
              <div className="absolute top-[-10%] left-[15%] w-[850px] h-[450px] bg-gradient-to-r from-emerald-400/20 via-sky-400/25 to-indigo-500/20 rounded-full blur-[110px] rotate-[-10deg] animate-pulse-subtle pointer-events-none" />
              <div className="absolute top-[5%] right-[10%] w-[650px] h-[350px] bg-gradient-to-l from-teal-400/15 via-blue-500/20 to-purple-500/15 rounded-full blur-[120px] rotate-[15deg] pointer-events-none" />

              {/* Crystalline Winter Stars */}
              <div className="absolute inset-0 bg-[radial-gradient(#e0e7ff,rgba(224,231,255,.35)_1px,transparent_24px)] bg-[size:36px_36px] opacity-60" />

              {/* Icy Moon with Polar Ring */}
              <div className="absolute top-[7%] right-[15%] w-28 h-28 rounded-full bg-gradient-to-b from-white to-slate-100 shadow-[0_0_80px_30px_rgba(199,210,254,0.5)]" />
              <div className="absolute top-[4%] right-[12%] w-44 h-44 rounded-full border border-indigo-300/25 blur-[1px]" />
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Atmospheric Horizon Landscape Silhouette with Multi-Ridge Depth */}
      <div className="absolute bottom-0 left-0 right-0 h-64 opacity-35 transition-colors duration-1000">
        {/* Back Ridge */}
        <svg
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="absolute bottom-0 w-full h-48 opacity-40 transition-colors duration-1000"
          style={{
            fill:
              season === 'summer'
                ? isNight ? '#064e3b' : '#34d399'
                : season === 'rainy'
                ? isNight ? '#0c2340' : '#64748b'
                : isNight ? '#1e1b4b' : '#cbd5e1',
          }}
        >
          <path d="M0,160L60,149.3C120,139,240,117,360,138.7C480,160,600,224,720,229.3C840,235,960,181,1080,160C1200,139,1320,149,1380,154.7L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z" />
        </svg>

        {/* Front Ridge */}
        <svg
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="absolute bottom-0 w-full h-32 opacity-70 transition-colors duration-1000"
          style={{
            fill:
              season === 'summer'
                ? isNight ? '#022c22' : '#059669'
                : season === 'rainy'
                ? isNight ? '#020d1a' : '#334155'
                : isNight ? '#0f172a' : '#94a3b8',
          }}
        >
          <path d="M0,224L48,208C96,192,192,160,288,160C384,160,480,192,576,213.3C672,235,768,245,864,229.3C960,213,1056,171,1152,160C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
        </svg>
      </div>

      {/* Global Vignette Framing for Cinematic Contrast */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, transparent 60%, rgba(0, 0, 0, 0.25) 100%)',
        }}
      />
    </div>
  );
}
