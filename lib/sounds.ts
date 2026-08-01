'use client';

class SoundSystem {
  private ctx: AudioContext | null = null;
  private enabled: boolean = false;
  private humOsc1: OscillatorNode | null = null;
  private humOsc2: OscillatorNode | null = null;
  private humGain: GainNode | null = null;

  constructor() {
    // AudioContext will be initialized on first user interaction to comply with browser autoplay policies
  }

  private init() {
    if (this.ctx) return;
    if (typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
  }

  private startHum() {
    if (!this.enabled || !this.ctx) return;
    try {
      this.stopHum();
      
      this.humGain = this.ctx.createGain();
      this.humGain.gain.setValueAtTime(0, this.ctx.currentTime);
      this.humGain.connect(this.ctx.destination);
      
      this.humOsc1 = this.ctx.createOscillator();
      this.humOsc1.type = 'triangle';
      this.humOsc1.frequency.setValueAtTime(55, this.ctx.currentTime); // A1 hum
      
      this.humOsc2 = this.ctx.createOscillator();
      this.humOsc2.type = 'sine';
      this.humOsc2.frequency.setValueAtTime(110, this.ctx.currentTime); // A2 harmonic
      
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(140, this.ctx.currentTime);
      
      this.humOsc1.connect(filter);
      this.humOsc2.connect(filter);
      filter.connect(this.humGain);
      
      this.humOsc1.start();
      this.humOsc2.start();
      
      // fade in space drone humming gently
      this.humGain.gain.linearRampToValueAtTime(0.015, this.ctx.currentTime + 1.5);
    } catch (e) {
      console.warn('Failed to start ambient hum:', e);
    }
  }

  private stopHum() {
    if (this.humOsc1) {
      try { this.humOsc1.stop(); } catch (e) {}
      this.humOsc1 = null;
    }
    if (this.humOsc2) {
      try { this.humOsc2.stop(); } catch (e) {}
      this.humOsc2 = null;
    }
    if (this.humGain) {
      this.humGain.disconnect();
      this.humGain = null;
    }
  }

  public setEnabled(val: boolean) {
    this.enabled = val;
    if (val) {
      this.init();
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      this.startHum();
    } else {
      this.stopHum();
    }
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  public playHover() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.04);

    gain.gain.setValueAtTime(0.015, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.04);
  }

  public playClick() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(600, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.08);
  }

  public playTypewriter() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.type = 'sine';
    const freq = 1100 + Math.random() * 300;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(500, this.ctx.currentTime + 0.02);

    gain.gain.setValueAtTime(0.006, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.02);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.02);
  }

  public playSystemScan() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.type = 'sine';
    osc.frequency.setValueAtTime(180, t);
    osc.frequency.exponentialRampToValueAtTime(1600, t + 0.55);

    gain.gain.setValueAtTime(0.025, t);
    gain.gain.linearRampToValueAtTime(0.001, t + 0.55);

    osc.start();
    osc.stop(t + 0.55);
  }

  public playChatMessage() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.ctx.destination);

    osc1.type = 'sine';
    osc2.type = 'triangle';

    osc1.frequency.setValueAtTime(587.33, t); // D5
    osc2.frequency.setValueAtTime(880, t + 0.05); // A5

    gain.gain.setValueAtTime(0.02, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);

    osc1.start();
    osc2.start(t + 0.05);

    osc1.stop(t + 0.22);
    osc2.stop(t + 0.22);
  }

  public playWarning() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(100, t);
    osc.frequency.setValueAtTime(160, t + 0.08);

    gain.gain.setValueAtTime(0.03, t);
    gain.gain.setValueAtTime(0, t + 0.07);
    gain.gain.setValueAtTime(0.03, t + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);

    osc.start();
    osc.stop(t + 0.25);
  }

  public playSuccess() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const playChirp = (delay: number, freq: number) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t + delay);
      gain.gain.setValueAtTime(0.04, t + delay);
      gain.gain.exponentialRampToValueAtTime(0.001, t + delay + 0.12);
      osc.start(t + delay);
      osc.stop(t + delay + 0.12);
    };

    playChirp(0, 523.25); // C5
    playChirp(0.08, 659.25); // E5
    playChirp(0.16, 783.99); // G5
    playChirp(0.24, 1046.50); // C6
  }
}

export const sounds = new SoundSystem();
