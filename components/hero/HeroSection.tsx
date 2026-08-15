'use client';

import React from 'react';
import { motion } from 'motion/react';
import { useEnvironment } from '@/context/EnvironmentContext';
import Hero3DScene from './Hero3DScene';
import { PROFILE_DATA } from '@/data/profile';
import { ArrowDown, Code2, Sparkles, Terminal, ArrowUpRight, Cpu, Zap, Activity } from 'lucide-react';

export default function HeroSection() {
  const { season, timeOfDay, theme } = useEnvironment();

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[92vh] w-full flex items-center justify-center pt-28 pb-16 overflow-hidden select-none"
    >
      {/* Interactive 3D Canvas Background */}
      <Hero3DScene />

      {/* Floating Holographic Content Overlay */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl">
          {/* Status Badge with Active World Telemetry */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-mono mb-6 border shadow-lg backdrop-blur-xl subtle-border-glow transition-all duration-300"
            style={{
              backgroundColor: `${theme.accentColor}15`,
              borderColor: `${theme.accentColor}40`,
              color: theme.accentColor,
            }}
          >
            <span className="relative flex h-2.5 w-2.5">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ backgroundColor: theme.accentColor }}
              />
              <span
                className="relative inline-flex rounded-full h-2.5 w-2.5"
                style={{ backgroundColor: theme.accentColor }}
              />
            </span>
            <span className="font-bold tracking-wider">AI &amp; ROBOTICS LAB</span>
            <span className="opacity-40">•</span>
            <span className="capitalize font-semibold">
              {season} atmosphere ({timeOfDay})
            </span>
          </motion.div>

          {/* Heading with Distinctive Typography */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-base sm:text-lg font-medium opacity-80 mb-2 flex items-center gap-2 font-sans tracking-wide">
              <Sparkles className="w-4 h-4" style={{ color: theme.accentColor }} />
              <span>Hi, I&apos;m</span>
              <span className="font-bold tracking-tight text-current">{PROFILE_DATA.name}</span>
            </p>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] mb-6 font-sans">
              <span className="block">Architecting</span>
              <span
                className="block bg-clip-text text-transparent bg-gradient-to-r"
                style={{
                  backgroundImage: `linear-gradient(to right, ${theme.accentColor}, ${theme.accentSecondary})`,
                }}
              >
                Intelligent Systems
              </span>
            </h1>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-xl font-normal leading-relaxed opacity-90 max-w-2xl mb-8 font-sans"
          >
            {PROFILE_DATA.tagline}
          </motion.p>

          {/* Key Metrics Strip with Premium Glass Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10 max-w-2xl"
          >
            {PROFILE_DATA.stats.map((stat, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl border backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] shadow-sm hover:shadow-md subtle-border-glow"
                style={{
                  backgroundColor: `${theme.accentColor}0a`,
                  borderColor: `${theme.accentColor}25`,
                }}
              >
                <div
                  className="text-xl sm:text-2xl font-black font-mono tracking-tight"
                  style={{ color: theme.accentColor }}
                >
                  {stat.value}
                </div>
                <div className="text-[11px] font-mono font-medium opacity-75 uppercase tracking-wider mt-0.5">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4"
          >
            <button
              id="hero-cta-work"
              onClick={() => handleScrollTo('projects')}
              className="px-7 py-3.5 rounded-2xl font-bold text-sm tracking-wide text-white transition-all duration-300 shadow-xl flex items-center gap-2.5 hover:scale-[1.03] active:scale-[0.98] cursor-pointer group"
              style={{
                backgroundColor: theme.accentColor,
                boxShadow: `0 12px 32px -8px ${theme.glowColor}`,
              }}
            >
              <Code2 className="w-4 h-4 transition-transform group-hover:rotate-12" />
              <span>Explore Projects</span>
              <ArrowUpRight className="w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            <button
              id="hero-cta-contact"
              onClick={() => handleScrollTo('contact')}
              className="px-7 py-3.5 rounded-2xl font-bold text-sm tracking-wide transition-all duration-300 border backdrop-blur-xl flex items-center gap-2 hover:scale-[1.03] active:scale-[0.98] cursor-pointer subtle-border-glow"
              style={{
                borderColor: `${theme.accentColor}40`,
                backgroundColor: `${theme.accentColor}12`,
              }}
            >
              <Terminal className="w-4 h-4 opacity-80" />
              <span>Get in Touch</span>
            </button>

            <div
              className="hidden sm:flex items-center gap-2 text-xs font-mono opacity-70 ml-2 px-3 py-1.5 rounded-xl border border-white/10 backdrop-blur-md"
            >
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
              <span>Edge inference online</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.button
        id="hero-scroll-indicator"
        onClick={() => handleScrollTo('about')}
        aria-label="Scroll down to About section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 opacity-70 hover:opacity-100 transition-opacity cursor-pointer group"
      >
        <span className="text-[11px] font-mono tracking-widest uppercase">Explore Ecosystem</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          className="p-1.5 rounded-full border border-current"
        >
          <ArrowDown className="w-3.5 h-3.5" />
        </motion.div>
      </motion.button>
    </section>
  );
}
