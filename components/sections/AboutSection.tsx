'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useEnvironment } from '@/context/EnvironmentContext';
import { PROFILE_DATA } from '@/data/profile';
import {
  Brain,
  Eye,
  Bot,
  Radio,
  Sparkles,
  Code,
  GraduationCap,
  ChevronRight,
  Activity,
  Layers,
  Sliders,
  ShieldCheck,
} from 'lucide-react';

interface DomainTab {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  tagline: string;
  description: string;
  metrics: { label: string; value: string }[];
  simulationType: 'vision' | 'neural' | 'robotics' | 'iot' | 'genai' | 'dev';
}

const DOMAINS: DomainTab[] = [
  {
    id: 'ai-ml',
    name: 'Artificial Intelligence & ML',
    icon: Brain,
    tagline: 'Deep neural networks, loss function design, and edge quantization.',
    description:
      'Designing custom neural architectures with optimized tensor operations, contrastive loss representations, and low-precision integer quantization for edge accelerators.',
    metrics: [
      { label: 'Architectures', value: 'CNNs, Transformers, GNNs' },
      { label: 'Frameworks', value: 'PyTorch, TensorRT, TF-Lite' },
      { label: 'Quantization', value: 'FP32 -> INT8 (<0.8% drop)' },
    ],
    simulationType: 'neural',
  },
  {
    id: 'computer-vision',
    name: 'Computer Vision',
    icon: Eye,
    tagline: 'High-speed object tracking, spatial geometry, and tactile camera fusion.',
    description:
      'Developing sub-15ms multi-class detection pipelines with YOLO architectures, stereo disparity depth reconstruction, optical flow trajectory stabilization, and MediaPipe spatial landmark estimation.',
    metrics: [
      { label: 'Peak Framerate', value: '94+ FPS' },
      { label: 'Models', value: 'YOLOv8, YOLOv11, OpenCV' },
      { label: 'Occlusion Tracking', value: 'ByteTrack Kalman' },
    ],
    simulationType: 'vision',
  },
  {
    id: 'robotics',
    name: 'Robotics',
    icon: Bot,
    tagline: 'Spatial kinematics, closed-loop manipulation, and autonomous pathfinding.',
    description:
      'Merging sensory feedback with inverse kinematics for robotic grippers and autonomous micro-drones. Researching tactile compliance in unstructured object manipulation.',
    metrics: [
      { label: 'Control Loop', value: '<20ms' },
      { label: 'Planning', value: 'RRT*, OctoMap 3D' },
      { label: 'Platforms', value: 'ROS2, Robotic Grippers, Micro-UAVs' },
    ],
    simulationType: 'robotics',
  },
  {
    id: 'iot',
    name: 'IoT & Hardware',
    icon: Radio,
    tagline: 'Flexible electronic skins, embedded microcontrollers, and wireless telemetry.',
    description:
      'Developing physical sensing prototypes using piezoresistive PDMS matrices, low-noise analog transimpedance circuits, ESP32 dual-core microcontrollers, and LoRaWAN mesh nodes.',
    metrics: [
      { label: 'Sampling Bandwidth', value: '500 Hz' },
      { label: 'Sensors', value: 'PDMS Tactile, IMU, LiDAR' },
      { label: 'Telemetry', value: 'BLE, MQTT, LoRa' },
    ],
    simulationType: 'iot',
  },
  {
    id: 'genai',
    name: 'Generative AI',
    icon: Sparkles,
    tagline: 'Multimodal factual verification, cross-encoder NLP, and semantic retrieval.',
    description:
      'Fine-tuning transformer language models for automated misinformation debunking, explainable attribution graphs, and dense vector semantic retrieval.',
    metrics: [
      { label: 'Verification F1', value: '93.7%' },
      { label: 'Retriever', value: 'HNSW Dense Vector' },
      { label: 'Transformers', value: 'RoBERTa, DeBERTa, BERT' },
    ],
    simulationType: 'genai',
  },
  {
    id: 'software-dev',
    name: 'Software Development',
    icon: Code,
    tagline: 'Low-latency full-stack apps, reactive interfaces, and hardware APIs.',
    description:
      'Constructing responsive TypeScript web dashboards, WebSocket frame streaming servers, C++ native bindings, and Dockerized micro-service containers.',
    metrics: [
      { label: 'Stack', value: 'TypeScript, Next.js, C++, Python' },
      { label: 'Realtime', value: 'WebSockets, WebRTC' },
      { label: 'DevOps', value: 'Docker, CI/CD, Linux' },
    ],
    simulationType: 'dev',
  },
];

export default function AboutSection() {
  const { theme } = useEnvironment();
  const [activeDomain, setActiveDomain] = useState<DomainTab>(DOMAINS[0]);
  const [learningRate, setLearningRate] = useState(0.01);
  const [simulationStep, setSimulationStep] = useState(0);

  return (
    <section id="about" className="py-24 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
          <Activity className="w-3.5 h-3.5" />
          <span>ABOUT & FOCUS DOMAINS</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
          Architecting the Bridge Between{' '}
          <span
            className="bg-clip-text text-transparent bg-gradient-to-r"
            style={{
              backgroundImage: `linear-gradient(to right, ${theme.accentColor}, ${theme.accentSecondary})`,
            }}
          >
            Algorithms & Physical Reality
          </span>
        </h2>
        <p className="text-base sm:text-lg opacity-85 leading-relaxed">
          {PROFILE_DATA.bio}
        </p>
      </div>

      {/* Main Grid: Left Story/Education + Right Interactive Domain Laboratory */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Background, Education & Philosophies */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Engineering Student Card */}
          <div
            className={`p-6 rounded-2xl border transition-all duration-300 ${theme.cardBg} ${theme.cardBorder}`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                style={{ backgroundColor: theme.accentColor }}
              >
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Academic Foundation</h3>
                <p className="text-xs font-mono opacity-60">
                  {PROFILE_DATA.education[0].period}
                </p>
              </div>
            </div>
            <p className="text-sm font-semibold mb-1" style={{ color: theme.accentColor }}>
              {PROFILE_DATA.education[0].degree}
            </p>
            <p className="text-xs font-medium opacity-80 mb-3">
              {PROFILE_DATA.education[0].institution}
            </p>
            <p className="text-xs opacity-75 leading-relaxed">
              {PROFILE_DATA.education[0].details}
            </p>
          </div>

          {/* Core Technical Passions */}
          <div
            className={`p-6 rounded-2xl border transition-all duration-300 ${theme.cardBg} ${theme.cardBorder}`}
          >
            <h3 className="text-sm font-bold uppercase tracking-wider font-mono opacity-80 mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4" style={{ color: theme.accentColor }} />
              Core Competencies & Research Focus
            </h3>
            <div className="flex flex-wrap gap-2">
              {PROFILE_DATA.interests.map((interest, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all hover:scale-105"
                  style={{
                    backgroundColor: `${theme.accentColor}10`,
                    borderColor: `${theme.accentColor}25`,
                    color: theme.accentColor,
                  }}
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Ethos */}
          <div
            className={`p-5 rounded-2xl border ${theme.cardBg} ${theme.cardBorder} flex items-start gap-3`}
          >
            <ShieldCheck className="w-5 h-5 mt-0.5 shrink-0" style={{ color: theme.accentColor }} />
            <div className="text-xs opacity-85 leading-relaxed">
              <span className="font-bold">Engineering Philosophy:</span> Software is incomplete without hardware synergy. I prioritize ultra-low inference latency, explainable AI weights, and physical robustness.
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Domain Laboratory */}
        <div
          className={`lg:col-span-7 p-6 sm:p-8 rounded-3xl border shadow-2xl backdrop-blur-xl ${theme.cardBg} ${theme.cardBorder}`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 border-b border-white/10 mb-6">
            <div>
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Sliders className="w-4 h-4" style={{ color: theme.accentColor }} />
                Interactive Domain Visualizer
              </h3>
              <p className="text-xs opacity-70">
                Click any domain below to inspect live simulated telemetry and architectural parameters.
              </p>
            </div>
            <div className="text-xs font-mono px-2.5 py-1 rounded-md bg-black/10 dark:bg-white/10 opacity-80 self-start">
              Live Engine v2.4
            </div>
          </div>

          {/* Domain Selection Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-6">
            {DOMAINS.map((domain) => {
              const Icon = domain.icon;
              const isActive = activeDomain.id === domain.id;
              return (
                <button
                  key={domain.id}
                  id={`domain-tab-${domain.id}`}
                  onClick={() => {
                    setActiveDomain(domain);
                    setSimulationStep((s) => s + 1);
                  }}
                  className={`p-3 rounded-xl border text-left transition-all duration-200 flex items-center gap-2.5 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                    isActive
                      ? 'shadow-md scale-[1.02]'
                      : 'opacity-70 hover:opacity-100 hover:bg-white/5'
                  }`}
                  style={{
                    backgroundColor: isActive ? `${theme.accentColor}25` : undefined,
                    borderColor: isActive ? theme.accentColor : `${theme.accentColor}20`,
                  }}
                >
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-white shrink-0"
                    style={{ backgroundColor: isActive ? theme.accentColor : '#64748b' }}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold leading-tight line-clamp-1">
                    {domain.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Domain Display with Live Simulation Visualizer */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDomain.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <div>
                <h4 className="text-base font-bold flex items-center gap-2" style={{ color: theme.accentColor }}>
                  <ChevronRight className="w-4 h-4" />
                  {activeDomain.tagline}
                </h4>
                <p className="text-xs sm:text-sm opacity-80 mt-1 leading-relaxed">
                  {activeDomain.description}
                </p>
              </div>

              {/* Dynamic Interactive Simulator Widget */}
              <div
                className="p-5 rounded-2xl border font-mono text-xs shadow-inner"
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.25)',
                  borderColor: `${theme.accentColor}30`,
                }}
              >
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                  <span className="text-emerald-400 flex items-center gap-1.5 font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    SIMULATION: {activeDomain.name.toUpperCase()}
                  </span>
                  <button
                    onClick={() => setSimulationStep((s) => s + 1)}
                    className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-[10px] transition-colors"
                  >
                    Step Cycle +
                  </button>
                </div>

                {/* Simulation Mode Renderers */}
                {activeDomain.simulationType === 'vision' && (
                  <div className="space-y-3">
                    <div className="relative h-28 bg-slate-900/80 rounded-xl border border-sky-500/30 overflow-hidden flex items-center justify-around p-3">
                      {/* Bounding Box 1 */}
                      <div className="relative p-2 border-2 border-cyan-400 bg-cyan-500/10 rounded">
                        <span className="absolute -top-3 left-1 bg-cyan-400 text-slate-950 font-bold px-1 text-[9px]">
                          PEDESTRIAN: 0.96
                        </span>
                        <div className="w-12 h-14 flex items-center justify-center opacity-80">
                          🚶 (x:142, y:88)
                        </div>
                      </div>
                      {/* Bounding Box 2 */}
                      <div className="relative p-2 border-2 border-emerald-400 bg-emerald-500/10 rounded">
                        <span className="absolute -top-3 left-1 bg-emerald-400 text-slate-950 font-bold px-1 text-[9px]">
                          VEHICLE: 0.98
                        </span>
                        <div className="w-20 h-14 flex items-center justify-center opacity-80">
                          🚗 [v: 42 km/h]
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between text-[11px] opacity-75">
                      <span>Inference: 10.4ms</span>
                      <span>YOLOv11 TensorRT INT8</span>
                      <span>Resolution: 1920x1080@94FPS</span>
                    </div>
                  </div>
                )}

                {activeDomain.simulationType === 'neural' && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-4 gap-2 text-center">
                      {[
                        { layer: 'L1: Input (784)', act: 'Normalized', weight: 'w[0.42]' },
                        { layer: 'L2: Dense (256)', act: 'GeLU / Norm', weight: 'w[-0.18]' },
                        { layer: 'L3: Attention', act: 'Multi-Head 8', weight: 'w[0.91]' },
                        { layer: 'L4: Logits (12)', act: 'Softmax', weight: 'p[0.96]' },
                      ].map((item, idx) => (
                        <div key={idx} className="p-2 rounded-lg bg-white/5 border border-white/10">
                          <div className="font-bold text-[10px] text-emerald-300">{item.layer}</div>
                          <div className="text-[9px] opacity-70 mt-0.5">{item.act}</div>
                          <div className="text-[9px] font-mono text-amber-300 mt-1">{item.weight}</div>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-3 pt-2">
                      <span className="text-[10px] opacity-75">Adjust Learning Rate:</span>
                      <input
                        type="range"
                        min="0.001"
                        max="0.05"
                        step="0.001"
                        value={learningRate}
                        onChange={(e) => setLearningRate(parseFloat(e.target.value))}
                        className="w-32 accent-emerald-500 cursor-pointer"
                      />
                      <span className="text-emerald-400 font-bold">{learningRate.toFixed(3)}</span>
                      <span className="text-[10px] opacity-60 ml-auto">Loss: {(0.042 * (1 / (1 + learningRate * 10))).toFixed(4)}</span>
                    </div>
                  </div>
                )}

                {activeDomain.simulationType === 'robotics' && (
                  <div className="space-y-3">
                    <div className="p-3 bg-slate-900/80 rounded-xl border border-indigo-500/30 flex items-center justify-between">
                      <div>
                        <div className="text-indigo-300 font-bold">Closed-Loop Tactile Gripper</div>
                        <div className="text-[10px] opacity-70">3-DoF Planar Joint Angle Target</div>
                      </div>
                      <div className="text-right">
                        <div className="text-emerald-400 font-bold">θ1: 45.2° | θ2: 112.8° | θ3: -24.0°</div>
                        <div className="text-[10px] opacity-60">Grip Normal Force: 3.42 N (Compliant)</div>
                      </div>
                    </div>
                  </div>
                )}

                {activeDomain.simulationType === 'iot' && (
                  <div className="space-y-3">
                    <div className="p-3 bg-slate-900/80 rounded-xl border border-emerald-500/30 font-mono text-[10px] space-y-1">
                      <div className="flex justify-between">
                        <span className="text-emerald-300">PDMS Tactile Matrix [4x4]:</span>
                        <span className="text-amber-400">Stream: 500 Hz</span>
                      </div>
                      <div className="text-slate-300 truncate">
                        ADC_RAW: [1024, 1140, 980, 2048, 2450, 1890, 990, 1010, 3100, 2900]
                      </div>
                      <div className="text-cyan-400">
                        Classified Surface: &quot;Woven Carbon Fiber / Silk Composite&quot; (Conf: 97.4%)
                      </div>
                    </div>
                  </div>
                )}

                {activeDomain.simulationType === 'genai' && (
                  <div className="space-y-3">
                    <div className="p-3 bg-slate-900/80 rounded-xl border border-purple-500/30 space-y-1">
                      <div className="text-purple-300 font-bold">Cross-Encoder Claim Entailment</div>
                      <div className="text-[10px] opacity-80 text-slate-300">
                        Claim: &quot;High-frequency tactile e-skins operate without latency penalty.&quot;
                      </div>
                      <div className="text-emerald-400 font-bold text-[10px]">
                        Veracity: CORROBORATED (0.941) • Attributed to IEEE 2025 Paper
                      </div>
                    </div>
                  </div>
                )}

                {activeDomain.simulationType === 'dev' && (
                  <div className="space-y-3">
                    <div className="p-3 bg-slate-900/80 rounded-xl border border-amber-500/30 grid grid-cols-3 gap-2 text-center text-[10px]">
                      <div>
                        <div className="opacity-60">WebSocket Latency</div>
                        <div className="font-bold text-amber-400">3.2 ms</div>
                      </div>
                      <div>
                        <div className="opacity-60">Memory Overhead</div>
                        <div className="font-bold text-emerald-400">42.8 MB</div>
                      </div>
                      <div>
                        <div className="opacity-60">Render Throughput</div>
                        <div className="font-bold text-cyan-400">120 FPS</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Domain Key Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {activeDomain.metrics.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl border"
                    style={{
                      backgroundColor: `${theme.accentColor}0a`,
                      borderColor: `${theme.accentColor}20`,
                    }}
                  >
                    <div className="text-[10px] font-mono uppercase opacity-70">{m.label}</div>
                    <div className="text-xs font-bold mt-0.5" style={{ color: theme.accentColor }}>
                      {m.value}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
