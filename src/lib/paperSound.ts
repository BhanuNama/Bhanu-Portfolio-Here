/**
 * Procedural Tactile Paper Sound Synthesis via Web Audio API.
 * Zero audio asset downloads — generates short (<45ms) filtered noise + subtle
 * physical resonance thuds strictly on explicit user gestures.
 */
class PaperSoundEngine {
  private ctx: AudioContext | null = null;
  public enabled = true;

  private ensureContext(): AudioContext | null {
    if (!this.enabled || typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return null;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  private synthPaperBurst(freq: number, q: number, duration: number, gainLevel: number) {
    const ctx = this.ensureContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const bufferSize = Math.max(1, Math.floor(ctx.sampleRate * duration));
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(freq, now);
    filter.Q.setValueAtTime(q, now);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.001, now);
    noiseGain.gain.linearRampToValueAtTime(gainLevel, now + 0.003);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    noise.start(now);
    noise.stop(now + duration);
  }

  /** Crisp paper-tap micro click for buttons and filter pills */
  playClick() {
    const ctx = this.ensureContext();
    if (!ctx) return;
    this.synthPaperBurst(1450, 1.8, 0.032, 0.09);

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(190, now);
    osc.frequency.exponentialRampToValueAtTime(52, now + 0.022);

    oscGain.gain.setValueAtTime(0.055, now);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.024);

    osc.connect(oscGain);
    oscGain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.025);
  }

  /** Soft Bristol-card flick sound when shuffling/opening project cards */
  playCardFlick() {
    this.synthPaperBurst(1900, 1.2, 0.052, 0.12);
  }

  /** Mechanical toggle sound for Light Paper / Dark Carbon & Command Palette */
  playToggle() {
    const ctx = this.ensureContext();
    if (!ctx) return;
    this.synthPaperBurst(1100, 2.2, 0.028, 0.075);

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(310, now);
    osc.frequency.exponentialRampToValueAtTime(130, now + 0.03);
    gain.gain.setValueAtTime(0.045, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.032);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.035);
  }
}

export const paperSound = new PaperSoundEngine();
