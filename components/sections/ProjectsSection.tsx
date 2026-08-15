'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { useEnvironment } from '@/context/EnvironmentContext';
import { PROJECTS, Project } from '@/data/projects';
import ProjectModal from '@/components/projects/ProjectModal';
import {
  FolderGit2,
  Github,
  ExternalLink,
  ArrowUpRight,
  Sparkles,
  Layers,
  Activity,
  SlidersHorizontal,
} from 'lucide-react';

const CATEGORIES = ['All', 'AI/ML', 'Computer Vision', 'IoT', 'Web'] as const;
type CategoryFilter = (typeof CATEGORIES)[number];

export default function ProjectsSection() {
  const { theme } = useEnvironment();
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const filteredProjects =
    selectedCategory === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-24 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold mb-3 border shadow-sm"
          style={{
            backgroundColor: `${theme.accentColor}15`,
            borderColor: `${theme.accentColor}30`,
            color: theme.accentColor,
          }}
        >
          <FolderGit2 className="w-3.5 h-3.5" />
          <span>PORTFOLIO & SYSTEM BUILDS</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
          Featured Engineering{' '}
          <span
            className="bg-clip-text text-transparent bg-gradient-to-r"
            style={{
              backgroundImage: `linear-gradient(to right, ${theme.accentColor}, ${theme.accentSecondary})`,
            }}
          >
            Deployments & Systems
          </span>
        </h2>
        <p className="text-base sm:text-lg opacity-85 leading-relaxed">
          Production-tested deep learning models, high-speed vision pipelines, and embedded IoT hardware prototypes.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-black/10 dark:bg-white/5 border border-white/10 backdrop-blur-md">
          <SlidersHorizontal className="w-4 h-4 ml-2 opacity-50 hidden sm:block" />
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                id={`project-filter-${cat.toLowerCase().replace(/[^a-z0-9]/g, '')}`}
                onClick={() => setSelectedCategory(cat)}
                className={`relative px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                  isActive ? 'text-white' : 'opacity-70 hover:opacity-100 hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-project-filter"
                    className="absolute inset-0 rounded-xl shadow-md"
                    style={{ backgroundColor: theme.accentColor }}
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Projects Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        <AnimatePresence>
          {filteredProjects.map((project) => (
            <motion.article
              layout
              key={project.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className={`rounded-3xl border overflow-hidden flex flex-col justify-between transition-all duration-300 group hover:scale-[1.02] cursor-pointer ${theme.cardBg} ${theme.cardBorder}`}
              onClick={() => setActiveModalProject(project)}
            >
              {/* Project Card Media Header */}
              <div className="relative h-52 w-full overflow-hidden bg-slate-950">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover opacity-75 transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

                {/* Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-mono font-bold text-white shadow-md border"
                    style={{ backgroundColor: `${project.color}40`, borderColor: project.color }}
                  >
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500 text-slate-950 flex items-center gap-1 shadow-md">
                      <Sparkles className="w-3 h-3" />
                      Featured
                    </span>
                  )}
                </div>

                {/* Metric Overlay */}
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-mono text-white">
                  <span className="opacity-80">{project.metrics[0].label}:</span>
                  <span className="font-bold text-emerald-400 bg-black/60 px-2 py-0.5 rounded-md border border-emerald-500/30">
                    {project.metrics[0].value}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold tracking-tight mb-2 group-hover:text-emerald-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm opacity-80 leading-relaxed line-clamp-3 mb-4">
                    {project.description}
                  </p>
                </div>

                {/* Tech tags */}
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.technologies.slice(0, 4).map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-medium border"
                        style={{
                          backgroundColor: `${theme.accentColor}10`,
                          borderColor: `${theme.accentColor}25`,
                          color: theme.accentColor,
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-mono opacity-60 border border-white/10">
                        +{project.technologies.length - 4} more
                      </span>
                    )}
                  </div>

                  {/* Card Action Footer */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <button
                      id={`inspect-project-btn-${project.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveModalProject(project);
                      }}
                      className="text-xs font-bold flex items-center gap-1.5 group-hover:underline cursor-pointer"
                      style={{ color: theme.accentColor }}
                    >
                      <span>Explore Architecture</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>

                    <div className="flex items-center gap-2">
                      <a
                        id={`card-github-link-${project.id}`}
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        aria-label={`View ${project.title} on GitHub`}
                        className="p-2 rounded-lg bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 transition-colors"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                      {project.liveDemoUrl && (
                        <a
                          id={`card-demo-link-${project.id}`}
                          href={project.liveDemoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          aria-label={`View live demo for ${project.title}`}
                          className="p-2 rounded-lg bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Project Details Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
}
