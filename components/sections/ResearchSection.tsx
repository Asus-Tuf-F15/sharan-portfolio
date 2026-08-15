'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useEnvironment } from '@/context/EnvironmentContext';
import { RESEARCH_ITEMS, ResearchItem } from '@/data/research';
import {
  BookOpen,
  FileText,
  Bookmark,
  CheckCircle2,
  ExternalLink,
  Github,
  Quote,
  ChevronDown,
  ChevronUp,
  FlaskConical,
  Microscope,
  Cpu,
  Copy,
  Check,
} from 'lucide-react';

export default function ResearchSection() {
  const { theme } = useEnvironment();
  const [expandedItemId, setExpandedItemId] = useState<string>(RESEARCH_ITEMS[0].id);
  const [copiedCitationId, setCopiedCitationId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedItemId((prev) => (prev === id ? '' : id));
  };

  const handleCopyCitation = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCitationId(id);
    setTimeout(() => setCopiedCitationId(null), 2500);
  };

  return (
    <section id="research" className="py-24 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold mb-3 border shadow-sm"
          style={{
            backgroundColor: `${theme.accentColor}15`,
            borderColor: `${theme.accentColor}30`,
            color: theme.accentColor,
          }}
        >
          <FlaskConical className="w-3.5 h-3.5" />
          <span>SCIENTIFIC RESEARCH & PREPRINTS</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
          Experimental Lab Investigations &{' '}
          <span
            className="bg-clip-text text-transparent bg-gradient-to-r"
            style={{
              backgroundImage: `linear-gradient(to right, ${theme.accentColor}, ${theme.accentSecondary})`,
            }}
          >
            Peer-Reviewed Papers
          </span>
        </h2>
        <p className="text-base sm:text-lg opacity-85 leading-relaxed">
          Advancing robotics tactile perception, low-latency edge vision architectures, and explainable multimodal AI verification.
        </p>
      </div>

      {/* Research Papers Journal List */}
      <div className="space-y-6">
        {RESEARCH_ITEMS.map((paper) => {
          const isExpanded = expandedItemId === paper.id;
          return (
            <motion.article
              key={paper.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className={`rounded-3xl border transition-all duration-300 overflow-hidden ${
                isExpanded ? 'shadow-2xl' : 'shadow-md opacity-95 hover:opacity-100'
              } ${theme.cardBg} ${theme.cardBorder}`}
            >
              {/* Paper Header / Title Strip */}
              <div
                onClick={() => toggleExpand(paper.id)}
                className="p-6 sm:p-8 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 select-none hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shrink-0 mt-1 shadow-lg"
                    style={{ backgroundColor: theme.accentColor }}
                  >
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span
                        className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold border"
                        style={{
                          backgroundColor: `${theme.accentColor}20`,
                          borderColor: `${theme.accentColor}40`,
                          color: theme.accentColor,
                        }}
                      >
                        {paper.field}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-400/30">
                        {paper.status}
                      </span>
                      <span className="text-xs font-mono opacity-60">
                        {paper.venue} • {paper.year}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold tracking-tight leading-snug">
                      {paper.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end md:self-center shrink-0">
                  <button
                    id={`toggle-paper-btn-${paper.id}`}
                    aria-expanded={isExpanded}
                    aria-label={`Toggle paper details for ${paper.title}`}
                    className="p-2.5 rounded-xl bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 transition-all flex items-center gap-1.5 text-xs font-mono font-bold"
                  >
                    <span>{isExpanded ? 'Hide Paper Dossier' : 'Inspect Findings'}</span>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Expandable Paper Details */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-white/10 p-6 sm:p-8 bg-black/5 dark:bg-black/25 space-y-8"
                  >
                    {/* Abstract */}
                    <div>
                      <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 mb-2 flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        Scientific Abstract
                      </h4>
                      <p className="text-sm sm:text-base opacity-90 leading-relaxed font-serif sm:font-sans">
                        {paper.abstract}
                      </p>
                    </div>

                    {/* Experimental Metrics */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {paper.metrics.map((m, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded-xl border bg-black/20"
                          style={{ borderColor: `${theme.accentColor}25` }}
                        >
                          <div className="text-[10px] font-mono uppercase opacity-60">{m.label}</div>
                          <div className="text-xl font-bold font-mono mt-0.5" style={{ color: theme.accentColor }}>
                            {m.value}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Methodology & Key Findings Two-Column Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Methodology */}
                      <div
                        className="p-5 rounded-2xl border"
                        style={{
                          backgroundColor: `${theme.accentColor}06`,
                          borderColor: `${theme.accentColor}20`,
                        }}
                      >
                        <h5 className="text-xs font-mono font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
                          <Microscope className="w-4 h-4" style={{ color: theme.accentColor }} />
                          Experimental Methodology
                        </h5>
                        <ul className="space-y-2 text-xs opacity-85">
                          {paper.methodology.map((step, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="font-mono text-emerald-400 font-bold">[{idx + 1}]</span>
                              <span>{step}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Findings */}
                      <div
                        className="p-5 rounded-2xl border"
                        style={{
                          backgroundColor: `${theme.accentColor}06`,
                          borderColor: `${theme.accentColor}20`,
                        }}
                      >
                        <h5 className="text-xs font-mono font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          Validated Results & Findings
                        </h5>
                        <ul className="space-y-2 text-xs opacity-85">
                          {paper.findings.map((finding, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-emerald-400 font-bold">✓</span>
                              <span>{finding}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Citation & Action Footer */}
                    <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <Quote className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                        <div className="text-xs font-mono">
                          <span className="opacity-60 block text-[10px] uppercase font-bold">Recommended Citation</span>
                          <span className="text-slate-300 select-all">{paper.citation}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          id={`copy-citation-btn-${paper.id}`}
                          onClick={() => handleCopyCitation(paper.id, paper.citation)}
                          className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          {copiedCitationId === paper.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-emerald-400">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy Citation</span>
                            </>
                          )}
                        </button>
                        {paper.githubUrl && (
                          <a
                            id={`research-github-link-${paper.id}`}
                            href={paper.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs transition-colors"
                            aria-label="View research code on GitHub"
                          >
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
