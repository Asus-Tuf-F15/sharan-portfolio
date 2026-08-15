'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useEnvironment } from '@/context/EnvironmentContext';
import SeasonSelector from './SeasonSelector';
import DayNightToggle from './DayNightToggle';
import { Volume2, VolumeX, Menu, X, Sparkles } from 'lucide-react';
import { ambientSound } from '@/lib/ambientSound';

const NAV_ITEMS = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'skills', label: 'Skills', href: '#skills' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'research', label: 'Research', href: '#research' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const { season, timeOfDay, theme, soundEnabled, toggleSound } = useEnvironment();
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Section scroll spy
      const scrollPosition = window.scrollY + 200;
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSoundToggle = () => {
    const nextSound = !soundEnabled;
    toggleSound();
    ambientSound.update(season, timeOfDay, nextSound);
  };

  return (
    <header
      id="main-navigation-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-3' : 'py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between px-4 py-2.5 sm:px-6 sm:py-3 rounded-2xl transition-all duration-500 ${
            theme.navBg
          } ${theme.navBorder} border shadow-xl backdrop-blur-xl`}
        >
          {/* Logo / Brand Name */}
          <a
            id="brand-logo-link"
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-lg"
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-white shadow-md transition-transform duration-300 group-hover:scale-105"
              style={{
                backgroundColor: theme.accentColor,
                boxShadow: `0 4px 14px ${theme.glowColor}`,
              }}
            >
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm sm:text-base font-bold tracking-tight font-sans leading-none flex items-center gap-1.5">
                Sharan Rai
                <span
                  className="inline-block w-1.5 h-1.5 rounded-full animate-ping"
                  style={{ backgroundColor: theme.accentColor }}
                />
              </span>
              <span className="text-[10px] tracking-wider uppercase opacity-60 font-mono">
                AI / ML Engineer
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav
            id="desktop-nav-menu"
            className="hidden lg:flex items-center gap-1 bg-black/5 dark:bg-white/5 p-1 rounded-xl border border-white/5"
            aria-label="Main Navigation"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`relative px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                    isActive
                      ? 'text-white'
                      : 'opacity-70 hover:opacity-100 hover:bg-white/10'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-nav-indicator"
                      className="absolute inset-0 rounded-lg shadow-sm"
                      style={{ backgroundColor: theme.accentColor }}
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Environmental Controls Dock (Season & Time) in Top-Right */}
          <div id="environmental-controls-dock" className="flex items-center gap-2 sm:gap-3">
            {/* Ambient Soundscape Toggle */}
            <button
              id="soundscape-toggle-btn"
              onClick={handleSoundToggle}
              aria-label={soundEnabled ? 'Disable natural soundscape' : 'Enable natural soundscape'}
              title={soundEnabled ? 'Soundscape Active' : 'Soundscape Muted'}
              className="p-2 rounded-full bg-slate-900/40 backdrop-blur-xl border border-white/10 text-slate-300 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-emerald-400 animate-pulse" />
              ) : (
                <VolumeX className="w-4 h-4 opacity-60" />
              )}
            </button>

            {/* Season Selector (Control 1) */}
            <SeasonSelector />

            {/* Day / Night Toggle (Control 2) */}
            <DayNightToggle />

            {/* Mobile Menu Hamburger */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-black/5 dark:bg-white/5 border border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav-drawer"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className={`lg:hidden max-w-7xl mx-auto px-4 sm:px-6 mt-2`}
          >
            <div
              className={`p-4 rounded-2xl ${theme.navBg} ${theme.navBorder} border shadow-2xl backdrop-blur-2xl flex flex-col gap-2`}
            >
              <div className="grid grid-cols-2 gap-2 pb-3 border-b border-white/10">
                {NAV_ITEMS.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <a
                      key={item.id}
                      id={`mobile-nav-link-${item.id}`}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                        isActive
                          ? 'text-white'
                          : 'opacity-70 hover:opacity-100 hover:bg-white/10'
                      }`}
                      style={{
                        backgroundColor: isActive ? theme.accentColor : undefined,
                      }}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </div>

              <div className="pt-2 flex items-center justify-between text-xs opacity-75">
                <span>Active Atmosphere:</span>
                <span className="font-mono font-medium capitalize" style={{ color: theme.accentColor }}>
                  {season} • {timeOfDay}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
