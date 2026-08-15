'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { Project } from '@/data/projects';
import { useEnvironment } from '@/context/EnvironmentContext';
import {
  X,
  Github,
  ExternalLink,
  Cpu,
  Layers,
  Sparkles,
  CheckCircle,
  Activity,
  Play,
  RotateCcw,
} from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const { theme } = useEnvironment();
  const [simulating, setSimulating] = useState(false);
  const [simProgress, setSimProgress] = useState(0);

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  const handleRunSim = () => {
    setSimulating(true);
    setSimProgress(0);
    let p = 0;
    const interval = setInterval(() => {
      p += 10;
      setSimProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setSimulating(false);
      }
    }, 120);
  };

  if (!project) return null;

  return (
    <AnimatePresence>
      <div
        id="project-modal-backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto bg-black/80 backdrop-blur-md"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-project-title"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
          className={`relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border shadow-2xl ${theme.cardBg} ${theme.cardBorder}`}
        >
          {/* Close Button */}
          <button
            id="close-project-modal-btn"
            onClick={onClose}
            aria-label="Close project modal"
            className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md border border-white/20 transition-transform hover:scale-110 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Hero Image Banner */}
          <div className="relative h-60 sm:h-72 w-full overflow-hidden rounded-t-3xl bg-slate-950">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover opacity-60 transition-transform duration-700 hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span
                  className="px-3 py-1 rounded-full text-xs font-mono font-bold text-white mb-2 inline-block border"
                  style={{ backgroundColor: `${project.color}30`, borderColor: project.color }}
                >
                  {project.category}
                </span>
                <h2 id="modal-project-title" className="text-2xl sm:text-3xl font-extrabold text-white">
                  {project.title}
                </h2>
                <p className="text-sm text-slate-300 mt-1 max-w-2xl">{project.tagline}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 shrink-0">
                <a
                  id="modal-github-link"
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold font-mono flex items-center gap-2 border border-white/20 transition-all cursor-pointer"
                >
                  <Github className="w-4 h-4" />
                  <span>Source Code</span>
                </a>
                {project.liveDemoUrl && (
                  <a
                    id="modal-livedemo-link"
                    href={project.liveDemoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-xl text-white text-xs font-bold font-mono flex items-center gap-2 shadow-lg transition-all hover:scale-105 cursor-pointer"
                    style={{ backgroundColor: theme.accentColor }}
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 space-y-8">
            {/* Key Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {project.metrics.map((metric, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl border"
                  style={{
                    backgroundColor: `${theme.accentColor}0a`,
                    borderColor: `${theme.accentColor}25`,
                  }}
                >
                  <div className="text-[10px] font-mono uppercase opacity-70">{metric.label}</div>
                  <div className="text-xl font-bold font-mono mt-0.5" style={{ color: theme.accentColor }}>
                    {metric.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Deep Technical Overview */}
            <div>
              <h3 className="text-base font-bold flex items-center gap-2 mb-2">
                <Layers className="w-4 h-4" style={{ color: theme.accentColor }} />
                Comprehensive Technical Overview
              </h3>
              <p className="text-sm sm:text-base opacity-85 leading-relaxed">
                {project.longDescription}
              </p>
            </div>

            {/* System Architecture Flow */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-slate-200">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 mb-2">
                <Cpu className="w-4 h-4" />
                SYSTEM ARCHITECTURE PIPELINE
              </div>
              <div className="p-3 bg-slate-900 rounded-xl font-mono text-xs text-sky-300 leading-relaxed border border-slate-800">
                {project.architectureOverview}
              </div>
            </div>

            {/* Key Breakthroughs */}
            <div>
              <h3 className="text-base font-bold flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4" style={{ color: theme.accentColor }} />
                Key Engineering Breakthroughs
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {project.highlights.map((highlight, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border flex items-start gap-2.5"
                    style={{
                      backgroundColor: `${theme.accentColor}06`,
                      borderColor: `${theme.accentColor}18`,
                    }}
                  >
                    <CheckCircle className="w-4 h-4 mt-0.5 shrink-0" style={{ color: theme.accentColor }} />
                    <p className="text-xs opacity-85 leading-relaxed">{highlight}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Model Execution Simulator inside Modal */}
            <div className="p-5 rounded-2xl border bg-black/20 backdrop-blur-md">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold flex items-center gap-2" style={{ color: theme.accentColor }}>
                  <Activity className="w-4 h-4" />
                  LIVE INFERENCE SIMULATOR
                </span>
                <button
                  id="run-inference-sim-btn"
                  onClick={handleRunSim}
                  disabled={simulating}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono font-bold text-white flex items-center gap-1.5 shadow-md cursor-pointer transition-all disabled:opacity-50"
                  style={{ backgroundColor: theme.accentColor }}
                >
                  {simulating ? <RotateCcw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{simulating ? 'Executing...' : 'Trigger Test Frame'}</span>
                </button>
              </div>

              {simulating || simProgress > 0 ? (
                <div className="space-y-2">
                  <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full transition-all duration-100"
                      style={{ width: `${simProgress}%`, backgroundColor: theme.accentColor }}
                    />
                  </div>
                  <div className="flex justify-between text-[11px] font-mono opacity-80">
                    <span>Forward Pass Status: {simProgress < 100 ? `${simProgress}% (TensorRT Engine)` : '100% (Completed)'}</span>
                    <span className="text-emerald-400 font-bold">Latency: 11.2ms</span>
                  </div>
                </div>
              ) : (
                <p className="text-xs opacity-70">
                  Click &apos;Trigger Test Frame&apos; to simulate a live edge inference cycle through this project&apos;s computational pipeline.
                </p>
              )}
            </div>

            {/* Technologies Applied */}
            <div>
              <div className="text-xs font-mono font-bold uppercase opacity-60 mb-2">
                Technologies & Toolchain
              </div>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-lg text-xs font-mono font-semibold border"
                    style={{
                      backgroundColor: `${theme.accentColor}12`,
                      borderColor: `${theme.accentColor}25`,
                      color: theme.accentColor,
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
