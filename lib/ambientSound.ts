// Procedural Web Audio Ambient Sound Generator
// Generates soft, relaxing ambient audio matching the selected season and day/night state.
// Uses pure Web Audio API synthesis without loading external MP3/WAV files.

import { Season, TimeOfDay } from '@/types/environment';

class AmbientSoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private noiseNode: AudioNode | null = null;
  private filterNode: BiquadFilterNode | null = null;
  private lfoNode: OscillatorNode | null = null;
  private isRunning: boolean = false;

  public init() {
    if (typeof window === 'undefined') return;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.08, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
  }

  public play(season: Season, timeOfDay: TimeOfDay) {
    this.init();
    if (!this.ctx || !this.masterGain) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.stop();
    this.isRunning = true;

    try {
      // Create white/pink noise buffer
      const bufferSize = this.ctx.sampleRate * 2;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let lastOut = 0.0;

      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        // Pink noise approximation
        data[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = data[i];
        data[i] *= 3.5;
      }

      const noiseSource = this.ctx.createBufferSource();
      noiseSource.buffer = buffer;
      noiseSource.loop = true;

      const filter = this.ctx.createBiquadFilter();

      // Configure filter based on weather
      if (season === 'rainy') {
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(timeOfDay === 'day' ? 900 : 650, this.ctx.currentTime);
        filter.Q.setValueAtTime(1.5, this.ctx.currentTime);
      } else if (season === 'winter') {
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(320, this.ctx.currentTime);
        filter.Q.setValueAtTime(3.0, this.ctx.currentTime);
      } else {
        // Summer
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(450, this.ctx.currentTime);
        filter.Q.setValueAtTime(0.8, this.ctx.currentTime);
      }

      // Modulation for wind / rain swells
      const lfo = this.ctx.createOscillator();
      lfo.frequency.setValueAtTime(season === 'rainy' ? 0.3 : 0.15, this.ctx.currentTime);
      const lfoGain = this.ctx.createGain();
      lfoGain.gain.setValueAtTime(season === 'winter' ? 120 : 60, this.ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);

      noiseSource.connect(filter);
      filter.connect(this.masterGain);

      noiseSource.start();
      lfo.start();

      this.noiseNode = noiseSource;
      this.filterNode = filter;
      this.lfoNode = lfo;
    } catch {
      // Ignore audio synthesis errors gracefully
    }
  }

  public stop() {
    try {
      if (this.noiseNode) {
        (this.noiseNode as AudioBufferSourceNode).stop();
        this.noiseNode.disconnect();
        this.noiseNode = null;
      }
      if (this.lfoNode) {
        this.lfoNode.stop();
        this.lfoNode.disconnect();
        this.lfoNode = null;
      }
      if (this.filterNode) {
        this.filterNode.disconnect();
        this.filterNode = null;
      }
    } catch {}
    this.isRunning = false;
  }

  public update(season: Season, timeOfDay: TimeOfDay, enabled: boolean) {
    if (!enabled) {
      this.stop();
      return;
    }
    this.play(season, timeOfDay);
  }
}

export const ambientSound = new AmbientSoundEngine();
