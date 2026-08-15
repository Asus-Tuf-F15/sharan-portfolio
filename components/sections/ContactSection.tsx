'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useEnvironment } from '@/context/EnvironmentContext';
import { PROFILE_DATA } from '@/data/profile';
import confetti from 'canvas-confetti';
import {
  Mail,
  Github,
  Linkedin,
  Send,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Sparkles,
  MapPin,
  Clock,
  Terminal,
} from 'lucide-react';

export default function ContactSection() {
  const { theme, season, timeOfDay } = useEnvironment();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('AI / ML Engineering Opportunity');
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const errs: { name?: string; email?: string; message?: string } = {};
    if (!name.trim()) errs.name = 'Please provide your full name.';
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Please provide a valid email address.';
    }
    if (!message.trim() || message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters long.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate reliable dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Trigger celebratory confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.7 },
          colors: [theme.accentColor, '#38bdf8', '#f59e0b'],
        });
      } catch {}
    }, 1000);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setMessage('');
    setIsSubmitted(false);
  };

  return (
    <section id="contact" className="py-24 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
          <MessageSquare className="w-3.5 h-3.5" />
          <span>CONNECT & COLLABORATE</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
          Let&apos;s Build the Next Generation of{' '}
          <span
            className="bg-clip-text text-transparent bg-gradient-to-r"
            style={{
              backgroundImage: `linear-gradient(to right, ${theme.accentColor}, ${theme.accentSecondary})`,
            }}
          >
            Intelligent Systems
          </span>
        </h2>
        <p className="text-base sm:text-lg opacity-85 leading-relaxed">
          Open for full-time AI/ML roles, computer vision engineering projects, robotics research collaborations, and technical consulting.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Direct Contact Info & Socials */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Direct channels card */}
          <div
            className={`p-6 sm:p-8 rounded-3xl border shadow-xl backdrop-blur-xl ${theme.cardBg} ${theme.cardBorder}`}
          >
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Sparkles className="w-4 h-4" style={{ color: theme.accentColor }} />
              Direct Communication Channels
            </h3>

            <div className="space-y-4">
              {/* Email */}
              <a
                id="contact-email-link"
                href={`mailto:${PROFILE_DATA.email}`}
                className="p-4 rounded-2xl border flex items-center gap-4 transition-all hover:scale-[1.02] group"
                style={{
                  backgroundColor: `${theme.accentColor}0a`,
                  borderColor: `${theme.accentColor}25`,
                }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: theme.accentColor }}
                >
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono opacity-60 uppercase font-semibold">Email Inbox</div>
                  <div className="text-sm font-bold truncate">{PROFILE_DATA.email}</div>
                </div>
              </a>

              {/* GitHub */}
              <a
                id="contact-github-link"
                href={PROFILE_DATA.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl border flex items-center gap-4 transition-all hover:scale-[1.02] group"
                style={{
                  backgroundColor: `${theme.accentColor}0a`,
                  borderColor: `${theme.accentColor}25`,
                }}
              >
                <div className="w-11 h-11 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform">
                  <Github className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono opacity-60 uppercase font-semibold">GitHub Profile</div>
                  <div className="text-sm font-bold">github.com/sharanrai</div>
                </div>
              </a>

              {/* LinkedIn */}
              <a
                id="contact-linkedin-link"
                href={PROFILE_DATA.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl border flex items-center gap-4 transition-all hover:scale-[1.02] group"
                style={{
                  backgroundColor: `${theme.accentColor}0a`,
                  borderColor: `${theme.accentColor}25`,
                }}
              >
                <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono opacity-60 uppercase font-semibold">LinkedIn Network</div>
                  <div className="text-sm font-bold">linkedin.com/in/sharanrai-ai</div>
                </div>
              </a>
            </div>

            {/* Quick Status Bar */}
            <div className="mt-6 pt-6 border-t border-white/10 space-y-2 text-xs font-mono opacity-80">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>{PROFILE_DATA.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>Response window: &lt;24 hours</span>
              </div>
            </div>
          </div>

          {/* Terminal status */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 space-y-1.5 shadow-xl">
            <div className="flex items-center gap-1.5 text-slate-500 pb-2 border-b border-slate-800">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span>sharan_session_daemon.sh</span>
            </div>
            <div>[STATUS] Current Atmosphere: {season.toUpperCase()}_{timeOfDay.toUpperCase()}</div>
            <div>[GPU] Inference Pipeline: ACTIVE_LOW_POWER</div>
            <div>[AVAILABILITY] Open for AI/ML Roles & Research Collaborations</div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div
          className={`lg:col-span-7 p-6 sm:p-8 rounded-3xl border shadow-2xl backdrop-blur-xl ${theme.cardBg} ${theme.cardBorder}`}
        >
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 text-center flex flex-col items-center justify-center"
            >
              <div
                className="w-16 h-16 rounded-3xl flex items-center justify-center text-white mb-4 shadow-xl"
                style={{ backgroundColor: theme.accentColor }}
              >
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Message Dispatched!</h3>
              <p className="text-sm opacity-80 max-w-md mb-6 leading-relaxed">
                Thank you for reaching out, <span className="font-bold text-emerald-400">{name}</span>. I have received your message and will get back to you promptly at <span className="font-bold">{email}</span>.
              </p>
              <button
                id="send-another-message-btn"
                onClick={handleReset}
                className="px-6 py-2.5 rounded-xl text-xs font-mono font-bold text-white shadow-lg transition-all hover:scale-105 cursor-pointer"
                style={{ backgroundColor: theme.accentColor }}
              >
                Send Another Dispatch
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div>
                <h3 className="text-xl font-bold mb-1">Direct Message Dispatch</h3>
                <p className="text-xs opacity-75">
                  Fill in the details below to send an encrypted inquiry straight to my dashboard.
                </p>
              </div>

              {/* Subject Selection */}
              <div>
                <label className="block text-xs font-mono font-bold uppercase opacity-80 mb-2">
                  Topic of Inquiry
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    'AI / ML Opportunity',
                    'Research Collaboration',
                    'Technical Consulting',
                  ].map((sub) => (
                    <button
                      type="button"
                      key={sub}
                      onClick={() => setSubject(sub)}
                      className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition-all cursor-pointer ${
                        subject === sub
                          ? 'text-white shadow-md'
                          : 'opacity-70 hover:opacity-100 hover:bg-white/5'
                      }`}
                      style={{
                        backgroundColor: subject === sub ? theme.accentColor : 'transparent',
                        borderColor: subject === sub ? theme.accentColor : `${theme.accentColor}30`,
                      }}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name & Email Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-mono font-bold uppercase opacity-80 mb-1.5">
                    Your Name *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors({ ...errors, name: undefined });
                    }}
                    placeholder="e.g. Alex Morgan"
                    className={`w-full px-4 py-3 rounded-xl border text-sm font-sans focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all bg-black/5 dark:bg-white/5 ${
                      errors.name ? 'border-rose-500' : 'border-white/15'
                    }`}
                  />
                  {errors.name && (
                    <p className="text-rose-400 text-xs font-mono mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-xs font-mono font-bold uppercase opacity-80 mb-1.5">
                    Your Email Address *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors({ ...errors, email: undefined });
                    }}
                    placeholder="alex@company.com"
                    className={`w-full px-4 py-3 rounded-xl border text-sm font-sans focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all bg-black/5 dark:bg-white/5 ${
                      errors.email ? 'border-rose-500' : 'border-white/15'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-rose-400 text-xs font-mono mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="contact-message" className="block text-xs font-mono font-bold uppercase opacity-80 mb-1.5">
                  Message Details *
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (errors.message) setErrors({ ...errors, message: undefined });
                  }}
                  placeholder="Describe your project, timeline, or engineering role..."
                  className={`w-full px-4 py-3 rounded-xl border text-sm font-sans focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all bg-black/5 dark:bg-white/5 resize-none ${
                    errors.message ? 'border-rose-500' : 'border-white/15'
                  }`}
                />
                {errors.message && (
                  <p className="text-rose-400 text-xs font-mono mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                id="submit-contact-form-btn"
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl font-bold text-sm text-white tracking-wide shadow-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer disabled:opacity-50"
                style={{
                  backgroundColor: theme.accentColor,
                  boxShadow: `0 10px 30px -8px ${theme.glowColor}`,
                }}
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Dispatching Payload...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Transmit Message</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
