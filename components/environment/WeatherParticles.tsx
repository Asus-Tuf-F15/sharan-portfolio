'use client';

import React, { useEffect, useRef } from 'react';
import { useEnvironment } from '@/context/EnvironmentContext';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
  glow?: string;
  pulsePhase?: number;
  pulseSpeed?: number;
  swayPhase?: number;
  swaySpeed?: number;
  swayAmount?: number;
  rotation?: number;
  rotSpeed?: number;
  layer?: number; // 1 = background/small, 2 = foreground/large
}

interface Splash {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

export default function WeatherParticles() {
  const { season, timeOfDay, isMounted } = useEnvironment();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const splashesRef = useRef<Splash[]>([]);
  const flashesRef = useRef<{ alpha: number; duration: number } | null>(null);

  useEffect(() => {
    if (!isMounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    const isMobile = width < 768;
    const weatherKey = `${season}-${timeOfDay}`;

    const initParticles = () => {
      const list: Particle[] = [];
      splashesRef.current = [];

      if (weatherKey === 'summer-day') {
        const count = isMobile ? 35 : 70; // Solar pollen & floating sun flecks
        for (let i = 0; i < count; i++) {
          const isLarge = Math.random() > 0.7;
          list.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.4) * 0.4,
            vy: -0.25 - Math.random() * 0.35,
            size: isLarge ? Math.random() * 2.5 + 2 : Math.random() * 1.5 + 0.8,
            alpha: Math.random() * 0.5 + 0.25,
            color: Math.random() > 0.4 ? '#fbbf24' : '#34d399',
            pulsePhase: Math.random() * Math.PI * 2,
            pulseSpeed: 0.02 + Math.random() * 0.025,
            swayPhase: Math.random() * Math.PI * 2,
            swaySpeed: 0.015 + Math.random() * 0.02,
            swayAmount: Math.random() * 0.8 + 0.3,
            layer: isLarge ? 2 : 1,
          });
        }
      } else if (weatherKey === 'summer-night') {
        const count = isMobile ? 25 : 55; // Bioluminescent fireflies
        for (let i = 0; i < count; i++) {
          list.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.6,
            vy: (Math.random() - 0.5) * 0.6,
            size: Math.random() * 3 + 2,
            alpha: Math.random() * 0.8 + 0.2,
            color: Math.random() > 0.3 ? '#34d399' : '#6ee7b7',
            glow: 'rgba(52, 211, 153, 0.6)',
            pulsePhase: Math.random() * Math.PI * 2,
            pulseSpeed: 0.025 + Math.random() * 0.035,
            swayPhase: Math.random() * Math.PI * 2,
            swaySpeed: 0.02 + Math.random() * 0.03,
            layer: 2,
          });
        }
      } else if (weatherKey === 'rainy-day' || weatherKey === 'rainy-night') {
        const count = isMobile ? 80 : 180; // Multi-layered rain
        for (let i = 0; i < count; i++) {
          const isForeground = Math.random() > 0.6;
          list.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: -1.8 - Math.random() * 1.6,
            vy: isForeground ? 14 + Math.random() * 8 : 9 + Math.random() * 6,
            size: isForeground ? Math.random() * 26 + 16 : Math.random() * 14 + 8,
            alpha: weatherKey === 'rainy-night'
              ? (isForeground ? 0.65 : 0.35)
              : (isForeground ? 0.5 : 0.25),
            color: weatherKey === 'rainy-night' ? '#7dd3fc' : '#38bdf8',
            layer: isForeground ? 2 : 1,
          });
        }
      } else if (weatherKey === 'winter-day' || weatherKey === 'winter-night') {
        const count = isMobile ? 45 : 120; // Snowflakes with gentle sway
        for (let i = 0; i < count; i++) {
          const isLarge = Math.random() > 0.7;
          list.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.4,
            vy: isLarge ? 0.9 + Math.random() * 1.4 : 0.5 + Math.random() * 0.9,
            size: isLarge ? Math.random() * 3.5 + 2 : Math.random() * 1.8 + 1,
            alpha: Math.random() * 0.7 + 0.3,
            color: weatherKey === 'winter-night' ? '#e0e7ff' : '#f8fafc',
            rotation: Math.random() * Math.PI * 2,
            rotSpeed: (Math.random() - 0.5) * 0.02,
            swayPhase: Math.random() * Math.PI * 2,
            swaySpeed: 0.015 + Math.random() * 0.025,
            swayAmount: Math.random() * 1.2 + 0.4,
            layer: isLarge ? 2 : 1,
          });
        }
      }
      particlesRef.current = list;
    };

    initParticles();

    let lastLightning = Date.now();
    let nextLightningDelay = 4000 + Math.random() * 7000;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const isStorm = weatherKey === 'rainy-night' || weatherKey === 'rainy-day';

      // Realistic Lightning Flash Simulation
      if (isStorm) {
        const now = Date.now();
        if (now - lastLightning > nextLightningDelay) {
          flashesRef.current = {
            alpha: weatherKey === 'rainy-night' ? 0.35 : 0.18,
            duration: 10,
          };
          lastLightning = now;
          nextLightningDelay = 6000 + Math.random() * 14000;
        }

        if (flashesRef.current && flashesRef.current.duration > 0) {
          ctx.fillStyle = `rgba(186, 230, 253, ${flashesRef.current.alpha})`;
          ctx.fillRect(0, 0, width, height);
          flashesRef.current.duration--;
          flashesRef.current.alpha *= 0.8;
          if (flashesRef.current.duration <= 0) {
            flashesRef.current = null;
          }
        }
      }

      const particles = particlesRef.current;

      // Render rain splashes
      if (isStorm && splashesRef.current.length > 0) {
        for (let i = splashesRef.current.length - 1; i >= 0; i--) {
          const s = splashesRef.current[i];
          s.radius += 0.8;
          s.alpha *= 0.88;

          ctx.beginPath();
          ctx.ellipse(s.x, s.y, s.radius * 2, s.radius * 0.6, 0, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(125, 211, 252, ${s.alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();

          if (s.alpha < 0.05 || s.radius >= s.maxRadius) {
            splashesRef.current.splice(i, 1);
          }
        }
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // 1. Summer Day: Solar Pollen
        if (weatherKey === 'summer-day') {
          p.pulsePhase = (p.pulsePhase || 0) + (p.pulseSpeed || 0.02);
          p.swayPhase = (p.swayPhase || 0) + (p.swaySpeed || 0.015);
          const currentAlpha = Math.sin(p.pulsePhase) * 0.25 + (p.alpha || 0.5);
          p.x += p.vx + Math.sin(p.swayPhase) * (p.swayAmount || 0.5);
          p.y += p.vy;

          if (p.y < -20) {
            p.y = height + 20;
            p.x = Math.random() * width;
          }
          if (p.x < -20) p.x = width + 20;
          if (p.x > width + 20) p.x = -20;

          // Soft radial glow for pollen
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
          grad.addColorStop(0, p.color);
          grad.addColorStop(1, 'transparent');

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 1.5, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.globalAlpha = Math.max(0.1, Math.min(0.8, currentAlpha));
          ctx.fill();
        }

        // 2. Summer Night: Bioluminescent Fireflies
        else if (weatherKey === 'summer-night') {
          p.pulsePhase = (p.pulsePhase || 0) + (p.pulseSpeed || 0.03);
          p.swayPhase = (p.swayPhase || 0) + (p.swaySpeed || 0.02);

          const currentAlpha = Math.sin(p.pulsePhase) * 0.45 + 0.45;
          p.x += p.vx + Math.sin(p.swayPhase) * 0.6;
          p.y += p.vy + Math.cos(p.swayPhase) * 0.4;

          if (p.x < -30) p.x = width + 30;
          if (p.x > width + 30) p.x = -30;
          if (p.y < -30) p.y = height + 30;
          if (p.y > height + 30) p.y = -30;

          // Bioluminescent Glow Halo
          const glowGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3.5);
          glowGrad.addColorStop(0, 'rgba(52, 211, 153, 0.9)');
          glowGrad.addColorStop(0.4, 'rgba(16, 185, 129, 0.4)');
          glowGrad.addColorStop(1, 'transparent');

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 3.5, 0, Math.PI * 2);
          ctx.fillStyle = glowGrad;
          ctx.globalAlpha = Math.max(0.05, Math.min(0.9, currentAlpha));
          ctx.fill();

          // Core point
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.6, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.globalAlpha = Math.max(0.2, Math.min(1, currentAlpha * 1.2));
          ctx.fill();
        }

        // 3. Rainy Season: Slanted Streaks & Splashes
        else if (weatherKey === 'rainy-day' || weatherKey === 'rainy-night') {
          p.x += p.vx;
          p.y += p.vy;

          if (p.y > height) {
            // Chance of creating a ripple splash at the bottom
            if (p.layer === 2 && Math.random() > 0.4 && splashesRef.current.length < 30) {
              splashesRef.current.push({
                x: p.x,
                y: height - Math.random() * 40,
                radius: 1,
                maxRadius: Math.random() * 8 + 4,
                alpha: 0.6,
              });
            }
            p.y = -p.size;
            p.x = Math.random() * (width + 200);
          }
          if (p.x < -50) {
            p.x = width + 50;
          }

          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + p.vx * 1.4, p.y + p.size);
          ctx.strokeStyle = p.color;
          ctx.lineWidth = p.layer === 2 ? 1.4 : 0.8;
          ctx.globalAlpha = p.alpha;
          ctx.stroke();
        }

        // 4. Winter Season: Drifting Snowflakes
        else if (weatherKey === 'winter-day' || weatherKey === 'winter-night') {
          p.swayPhase = (p.swayPhase || 0) + (p.swaySpeed || 0.02);
          p.rotation = (p.rotation || 0) + (p.rotSpeed || 0.01);

          p.x += p.vx + Math.sin(p.swayPhase) * (p.swayAmount || 0.8);
          p.y += p.vy;

          if (p.y > height + 20) {
            p.y = -20;
            p.x = Math.random() * width;
          }
          if (p.x < -20) p.x = width + 20;
          if (p.x > width + 20) p.x = -20;

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.globalAlpha = p.alpha;

          if (p.layer === 2 && p.size > 3) {
            // Detailed 6-axis crystal snowflake for foreground flakes
            ctx.strokeStyle = p.color;
            ctx.lineWidth = 0.8;
            for (let arm = 0; arm < 3; arm++) {
              ctx.rotate(Math.PI / 3);
              ctx.beginPath();
              ctx.moveTo(-p.size, 0);
              ctx.lineTo(p.size, 0);
              ctx.stroke();
            }
          } else {
            // Soft circular snowflake for background
            ctx.beginPath();
            ctx.arc(0, 0, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
          }

          ctx.restore();
        }
      }

      ctx.globalAlpha = 1.0;
      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [season, timeOfDay, isMounted]);

  return (
    <canvas
      id="weather-particles-canvas"
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 select-none"
      aria-hidden="true"
    />
  );
}
