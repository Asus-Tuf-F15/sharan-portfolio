'use client';

import React from 'react';
import { EnvironmentProvider, useEnvironment } from '@/context/EnvironmentContext';
import EnvironmentBackground from '@/components/environment/EnvironmentBackground';
import WeatherParticles from '@/components/environment/WeatherParticles';
import Navbar from '@/components/navigation/Navbar';
import HeroSection from '@/components/hero/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import ResearchSection from '@/components/sections/ResearchSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/navigation/Footer';

function PortfolioContent() {
  const { theme } = useEnvironment();

  return (
    <div
      className={`relative min-h-screen transition-colors duration-1000 ease-in-out ${theme.backgroundClasses} ${theme.textPrimary}`}
    >
      {/* Dynamic Procedural Background & Weather Sky */}
      <EnvironmentBackground />

      {/* Atmospheric Weather Particles (Snow, Rain, Fireflies, Pollen) */}
      <WeatherParticles />

      {/* Fixed Sticky Header & Controls Dock */}
      <Navbar />

      {/* Main Page Sections */}
      <main id="main-content" className="relative z-10 flex flex-col">
        {/* Hero Section with Interactive Three.js 3D Biosphere Node */}
        <HeroSection />

        {/* About & Interactive Domain Laboratory */}
        <AboutSection />

        {/* Technical Skills & Interactive Code Inspector */}
        <SkillsSection />

        {/* Featured Projects with Architecture Breakdowns */}
        <ProjectsSection />

        {/* Peer-Reviewed Research & Preprints Dossier */}
        <ResearchSection />

        {/* Encrypted Contact Form & Live Dispatch */}
        <ContactSection />
      </main>

      {/* Footer with Atmosphere Preset Matrix */}
      <Footer />
    </div>
  );
}

export default function Page() {
  return (
    <EnvironmentProvider>
      <PortfolioContent />
    </EnvironmentProvider>
  );
}
