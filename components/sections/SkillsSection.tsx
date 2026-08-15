'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useEnvironment } from '@/context/EnvironmentContext';
import { SKILL_CATEGORIES, SkillCategory, SkillItem } from '@/data/skills';
import {
  Cpu,
  BrainCircuit,
  Eye,
  Code2,
  Globe,
  Wrench,
  Flame,
  Layers,
  BarChart2,
  Target,
  Sparkles,
  Scan,
  Camera,
  Terminal,
  Binary,
  FileCode,
  FileCode2,
  Radio,
  CircuitBoard,
  Activity,
  Wifi,
  Atom,
  Zap,
  Server,
  Network,
  Box,
  GitBranch,
  Github,
  CloudRain,
  Copy,
  Check,
  CheckCircle2,
  FolderGit2,
} from 'lucide-react';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Cpu,
  BrainCircuit,
  Eye,
  Code2,
  Globe,
  Wrench,
  Flame,
  Layers,
  BarChart2,
  Target,
  Sparkles,
  Scan,
  Camera,
  Terminal,
  Binary,
  FileCode,
  FileCode2,
  Radio,
  CircuitBoard,
  Activity,
  Wifi,
  Atom,
  Zap,
  Server,
  Network,
  Box,
  GitBranch,
  Github,
  CloudRain,
};

const SKILL_CODE_SNIPPETS: Record<string, string> = {
  PyTorch: `import torch
import torchvision.models as models

# TensorRT Latency-Optimized Inference
model = models.yolo_v11_custom(weights="edge_weights.pt").eval().cuda()
with torch.inference_mode():
    sample_tensor = torch.randn(1, 3, 640, 640, device="cuda")
    predictions = model(sample_tensor)
print(f"Latency: {torch.cuda.Event(enable_timing=True)} -> INT8 Ready")`,

  YOLOv11: `from ultralytics import YOLO

# Real-Time Multi-Agent Tracking Engine
detector = YOLO("yolo11n-seg.pt")
results = detector.track(
    source="rtsp://camera_stream:8554/live",
    tracker="bytetrack.yaml",
    conf=0.65,
    device="0"
)`,

  ESP32: `#include <WiFi.h>
#include <Wire.h>

// High-Bandwidth 500Hz Tactile Matrix Acquisition
void readTactileMatrix() {
  Wire.beginTransmission(0x48);
  Wire.write(0x00);
  Wire.endTransmission();
  Wire.requestFrom(0x48, 16);
  // Send over BLE / FreeRTOS Queue
}`,

  OpenCV: `cv::Mat frame, gray, edges;
cv::VideoCapture cap(0, cv::CAP_V4L2);
cap.set(cv::CAP_PROP_FPS, 94);

while (cap.read(frame)) {
    cv::cvtColor(frame, gray, cv::COLOR_BGR2GRAY);
    cv::Canny(gray, edges, 50, 150);
}`,

  Python: `import numpy as np
import asyncio

async def stream_telemetry_vector(matrix: np.ndarray):
    # Vectorized sensor decomposition
    wavelet_features = np.fft.rfft(matrix, axis=1)
    await broker.publish("robot/tactile", wavelet_features.tobytes())`,

  TensorFlow: `import tensorflow as tf

converter = tf.lite.TFLiteConverter.from_saved_model("model_dir")
converter.optimizations = [tf.lite.Optimize.DEFAULT]
converter.target_spec.supported_types = [tf.int8]
tflite_quant_model = converter.convert()`,
};

export default function SkillsSection() {
  const { theme } = useEnvironment();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('all');
  const [activeSkill, setActiveSkill] = useState<SkillItem>(SKILL_CATEGORIES[0].skills[0]);
  const [copied, setCopied] = useState(false);

  const categories = [
    { id: 'all', title: 'All Technologies', iconName: 'Cpu' },
    ...SKILL_CATEGORIES,
  ];

  const displayedSkills =
    selectedCategoryId === 'all'
      ? SKILL_CATEGORIES.flatMap((c) => c.skills)
      : SKILL_CATEGORIES.find((c) => c.id === selectedCategoryId)?.skills || [];

  const handleCopySnippet = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const activeSnippet =
    SKILL_CODE_SNIPPETS[activeSkill.name] ||
    `// Production integration for ${activeSkill.name}\n// Optimized for latency and reproducible pipeline execution\nconsole.log("${activeSkill.name} initialized with ${activeSkill.level} precision");`;

  return (
    <section id="skills" className="py-24 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
          <Cpu className="w-3.5 h-3.5" />
          <span>TECHNICAL ARSENAL & TOOLKIT</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
          Engineered for Performance across the{' '}
          <span
            className="bg-clip-text text-transparent bg-gradient-to-r"
            style={{
              backgroundImage: `linear-gradient(to right, ${theme.accentColor}, ${theme.accentSecondary})`,
            }}
          >
            AI & Robotics Stack
          </span>
        </h2>
        <p className="text-base sm:text-lg opacity-85 leading-relaxed">
          From high-level deep learning architectures and computer vision pipelines to embedded C++ firmware and interactive web interfaces.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        {categories.map((cat) => {
          const Icon = ICON_MAP[cat.iconName] || Cpu;
          const isActive = selectedCategoryId === cat.id;
          return (
            <button
              key={cat.id}
              id={`skill-filter-${cat.id}`}
              onClick={() => setSelectedCategoryId(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 border cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                isActive
                  ? 'text-white shadow-lg scale-105'
                  : 'opacity-70 hover:opacity-100 hover:bg-white/5'
              }`}
              style={{
                backgroundColor: isActive ? theme.accentColor : 'rgba(255,255,255,0.04)',
                borderColor: isActive ? theme.accentColor : `${theme.accentColor}20`,
                boxShadow: isActive ? `0 6px 20px -6px ${theme.glowColor}` : undefined,
              }}
            >
              <Icon className="w-4 h-4" />
              <span>{cat.title}</span>
            </button>
          );
        })}
      </div>

      {/* Main Grid: Skills Matrix + Live Deep Dive Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Skills Constellation Grid */}
        <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3">
          {displayedSkills.map((skill) => {
            const Icon = ICON_MAP[skill.iconName] || Code2;
            const isSelected = activeSkill.name === skill.name;

            return (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                onClick={() => setActiveSkill(skill)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 relative group overflow-hidden ${
                  isSelected
                    ? 'shadow-xl scale-[1.03]'
                    : 'hover:scale-[1.02] opacity-90 hover:opacity-100'
                } ${theme.cardBg}`}
                style={{
                  borderColor: isSelected ? theme.accentColor : `${theme.accentColor}25`,
                  boxShadow: isSelected ? `0 10px 30px -10px ${theme.glowColor}` : undefined,
                }}
              >
                {/* Glow highlight */}
                <div
                  className="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl pointer-events-none transition-opacity duration-300 opacity-20 group-hover:opacity-40"
                  style={{ backgroundColor: skill.color }}
                />

                <div className="flex items-center justify-between mb-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-md"
                    style={{ backgroundColor: skill.color }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border bg-black/10 dark:bg-white/10 opacity-80">
                    {skill.experience}
                  </span>
                </div>

                <h3 className="text-sm font-bold tracking-tight mb-1">{skill.name}</h3>

                <p className="text-[11px] opacity-70 line-clamp-2 leading-tight">
                  {skill.highlight}
                </p>

                <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono">
                  <span className="text-emerald-400 font-medium">{skill.level}</span>
                  <span className="opacity-60 flex items-center gap-1">
                    <FolderGit2 className="w-3 h-3" />
                    {skill.projectsCount} projects
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Right Column: Active Skill Deep-Dive Inspector & Live Code Snippet */}
        <div
          className={`lg:col-span-5 p-6 sm:p-7 rounded-3xl border shadow-2xl backdrop-blur-xl ${theme.cardBg} ${theme.cardBorder}`}
        >
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
            <div className="flex items-center gap-3">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center text-white shadow-lg"
                style={{ backgroundColor: activeSkill.color }}
              >
                {(() => {
                  const Icon = ICON_MAP[activeSkill.iconName] || Cpu;
                  return <Icon className="w-6 h-6" />;
                })()}
              </div>
              <div>
                <h3 className="text-lg font-bold">{activeSkill.name}</h3>
                <span className="text-xs font-mono opacity-70 uppercase">
                  {activeSkill.category} • {activeSkill.level}
                </span>
              </div>
            </div>
            <div
              className="text-xs font-mono font-bold px-3 py-1 rounded-full border"
              style={{
                backgroundColor: `${theme.accentColor}15`,
                borderColor: `${theme.accentColor}30`,
                color: theme.accentColor,
              }}
            >
              {activeSkill.experience} exp
            </div>
          </div>

          {/* Details */}
          <div className="space-y-4 mb-6">
            <div>
              <div className="text-xs font-mono font-bold uppercase opacity-60 mb-1">
                Practical Application & Specialization
              </div>
              <p className="text-sm opacity-90 leading-relaxed">
                {activeSkill.highlight}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div
                className="p-3 rounded-xl border"
                style={{
                  backgroundColor: `${theme.accentColor}08`,
                  borderColor: `${theme.accentColor}20`,
                }}
              >
                <div className="text-[10px] font-mono opacity-60">Demonstrated In</div>
                <div className="text-sm font-bold mt-0.5" style={{ color: theme.accentColor }}>
                  {activeSkill.projectsCount} Repositories
                </div>
              </div>
              <div
                className="p-3 rounded-xl border"
                style={{
                  backgroundColor: `${theme.accentColor}08`,
                  borderColor: `${theme.accentColor}20`,
                }}
              >
                <div className="text-[10px] font-mono opacity-60">Proficiency Tier</div>
                <div className="text-sm font-bold mt-0.5 text-emerald-400">
                  {activeSkill.level}
                </div>
              </div>
            </div>
          </div>

          {/* Code Integration Preview */}
          <div className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-2xl font-mono text-xs">
            <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-slate-400">
              <span className="flex items-center gap-2 text-[11px]">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                implementation_{activeSkill.name.toLowerCase().replace(/[^a-z0-9]/g, '')}.py
              </span>
              <button
                onClick={() => handleCopySnippet(activeSnippet)}
                className="flex items-center gap-1 text-[10px] hover:text-white transition-colors cursor-pointer px-2 py-1 rounded bg-slate-800/80"
                aria-label="Copy code snippet"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-4 text-[11px] text-emerald-300/90 overflow-x-auto leading-relaxed max-h-56">
              <code>{activeSnippet}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
