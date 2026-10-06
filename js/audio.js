/**
 * Audio System: Sound Effects, Waveform Generator, and Voice Note Audio Player
 *
 * Place your MP3 files in the sounds/ folder:
 *   sounds/sent.mp3      ← Sender outgoing  (Pixabay "Bubble Pop 06")
 *   sounds/received.mp3  ← Receiver incoming (Pixabay WhatsApp notification)
 */
class AudioManager {
  constructor() {
    this.ctx = null;
    this.audioCache = new Map(); // id -> AudioBuffer or object URL

    // Decoded AudioBuffers — set by decodeSfx()
    this._sfxDecoded       = false;
    this.sentSfxBuffer     = null;
    this.receivedSfxBuffer = null;

    // Instant HTMLAudioElements for rock-solid zero-latency audible playback
    this.sentAudio = null;
    this.receivedAudio = null;

    this.initSfx();
  }

  static base64ToArrayBuffer(base64) {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  }

  initSfx() {
    try {
      const data = (typeof window !== 'undefined' && window.STUDIO_SOUNDS_DATA) ? window.STUDIO_SOUNDS_DATA : null;
      if (data) {
        if (data.sent) {
          this.sentAudio = new Audio('data:audio/mp3;base64,' + data.sent);
          this.sentAudio.preload = 'auto';
        }
        if (data.received) {
          this.receivedAudio = new Audio('data:audio/mp3;base64,' + data.received);
          this.receivedAudio.preload = 'auto';
        }
      }
    } catch (e) {
      console.warn("AudioManager initSfx warning:", e);
    }
  }

  getAudioContext() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  /**
   * Decode sounds/sent.mp3 and sounds/received.mp3 into AudioBuffers.
   * Uses embedded base64 data for instantaneous offline decoding, falling back to fetch.
   */
  async decodeSfx() {
    if (this._sfxDecoded) return;
    this._sfxDecoded = true;

    // Ensure AudioContext is running
    const ctx = this.getAudioContext();
    if (ctx.state !== 'running') {
      try { await ctx.resume(); } catch (e) {}
    }

    const decodeDataOrPath = async (b64, path) => {
      try {
        let ab = null;
        if (b64) {
          ab = AudioManager.base64ToArrayBuffer(b64);
        } else {
          const res = await fetch(path);
          if (res.ok) ab = await res.arrayBuffer();
        }
        if (ab) {
          const decoded = await ctx.decodeAudioData(ab.slice(0));
          console.log(`✅ SFX decoded: ${path}`);
          return decoded;
        }
      } catch (e) {
        console.warn(`SFX decode failed (${path}):`, e);
      }
      return null;
    };

    const data = (typeof window !== 'undefined' && window.STUDIO_SOUNDS_DATA) ? window.STUDIO_SOUNDS_DATA : {};
    const [sent, received] = await Promise.all([
      decodeDataOrPath(data.sent, 'sounds/sent.mp3'),
      decodeDataOrPath(data.received, 'sounds/received.mp3')
    ]);

    this.sentSfxBuffer     = sent     || null;
    this.receivedSfxBuffer = received || null;
  }

  /**
   * Play a decoded AudioBuffer at the given volume.
   */
  _playBuffer(buffer, volume = 0.85) {
    try {
      const ctx = this.getAudioContext();
      const source = ctx.createBufferSource();
      const gain   = ctx.createGain();
      source.buffer = buffer;
      gain.gain.setValueAtTime(volume, ctx.currentTime);
      source.connect(gain);
      gain.connect(ctx.destination);
      source.start(ctx.currentTime);
    } catch (e) {
      console.warn('SFX _playBuffer error:', e);
    }
  }

  /**
   * Sender (Outgoing) — plays sounds/sent.mp3 (Pixabay "Bubble Pop 06")
   */
  playSentSfx() {
    try {
      if (this.sentAudio) {
        const clone = this.sentAudio.cloneNode();
        clone.volume = 0.9;
        const p = clone.play();
        if (p && p.catch) p.catch(() => {});
        return;
      }
    } catch (e) {}

    if (this.sentSfxBuffer) {
      this._playBuffer(this.sentSfxBuffer, 0.9);
    }
  }

  /**
   * Receiver (Incoming) — plays sounds/received.mp3 (Pixabay "WhatsApp notification")
   */
  playReceivedSfx() {
    try {
      if (this.receivedAudio) {
        const clone = this.receivedAudio.cloneNode();
        clone.volume = 0.95;
        const p = clone.play();
        if (p && p.catch) p.catch(() => {});
        return;
      }
    } catch (e) {}

    if (this.receivedSfxBuffer) {
      this._playBuffer(this.receivedSfxBuffer, 0.95);
    }
  }


  /**
   * Generates normalized waveform bar values (0.1 to 1.0) from an AudioBuffer or synthetic speech
   * @param {AudioBuffer|null} buffer
   * @param {number} barCount
   * @returns {number[]}
   */
  static extractWaveform(buffer, barCount = 35) {
    if (!buffer) {
      return AudioManager.generateRealisticWaveform(barCount);
    }

    try {
      const channelData = buffer.getChannelData(0);
      const step = Math.floor(channelData.length / barCount);
      const waveform = [];

      for (let i = 0; i < barCount; i++) {
        const start = i * step;
        let sum = 0;
        const count = Math.min(step, channelData.length - start);
        for (let j = 0; j < count; j++) {
          sum += Math.abs(channelData[start + j]);
        }
        const avg = count > 0 ? sum / count : 0.2;
        // Normalize with minimum height
        const normalized = Math.min(1.0, Math.max(0.15, avg * 3.5));
        waveform.push(Number(normalized.toFixed(2)));
      }
      return waveform;
    } catch (err) {
      return AudioManager.generateRealisticWaveform(barCount);
    }
  }

  /**
   * Generates a natural-looking conversational voice waveform when no buffer is decoded yet
   */
  static generateRealisticWaveform(barCount = 35) {
    const bars = [];
    let current = 0.35;
    for (let i = 0; i < barCount; i++) {
      // Natural speech cadence has pauses and peaks
      const cadence = Math.sin(i * 0.4) * 0.3 + Math.cos(i * 0.8) * 0.2;
      const noise = (Math.random() - 0.5) * 0.25;
      current = Math.min(0.95, Math.max(0.18, 0.4 + cadence + noise));
      bars.push(Number(current.toFixed(2)));
    }
    return bars;
  }

  /**
   * Format seconds to mm:ss or m:ss (e.g. 0:08, 1:24)
   */
  static formatDuration(seconds) {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  /**
   * Offline / zero-API-key Browser SpeechSynthesis fallback with synthetic audio buffer
   */
  static generateBrowserVoice(text, voiceIndex = 0, gender = 'female', speed = 1.0) {
    return new Promise((resolve, reject) => {
      try {
        const voices = window.speechSynthesis.getVoices();
        const utterance = new SpeechSynthesisUtterance(text);
        const playbackRate = Math.max(0.6, Math.min(1.8, parseFloat(speed) || 1.0));
        utterance.rate = playbackRate;

        if (voices.length > 0) {
          const preferredVoice = voices.find(v =>
            v.lang === 'hi-IN' || v.lang === 'en-IN' ||
            v.lang.startsWith('hi') || v.lang.startsWith('en')
          );
          if (preferredVoice) {
            utterance.voice = preferredVoice;
          } else if (voices[voiceIndex]) {
            utterance.voice = voices[voiceIndex];
          } else {
            utterance.voice = voices[0];
          }
        }

        const wordCount = (text || '').trim().split(/\s+/).length;
        const estimatedSeconds = Math.max(1.4, (wordCount / 2.6) / playbackRate);

        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const audioCtx = new AudioContext();
        const sampleRate = audioCtx.sampleRate || 22050;
        const totalSamples = Math.ceil(estimatedSeconds * sampleRate);
        const audioBuffer = audioCtx.createBuffer(1, totalSamples, sampleRate);
        const channelData = audioBuffer.getChannelData(0);

        const baseFreq = gender === 'female' ? 220 : 130;
        for (let i = 0; i < totalSamples; i++) {
          const t = i / sampleRate;
          const env = Math.sin((t / estimatedSeconds) * Math.PI);
          const vocalTract = Math.sin(2 * Math.PI * baseFreq * t) * 0.4 +
                             Math.sin(2 * Math.PI * baseFreq * 2 * t) * 0.2 +
                             (Math.random() - 0.5) * 0.04;
          const syllableMod = Math.abs(Math.sin(t * (7 * playbackRate)));
          channelData[i] = vocalTract * env * syllableMod * 0.25;
        }

        const wavBlob = AudioManager.bufferToWave(audioBuffer, totalSamples);
        const audioUrl = URL.createObjectURL(wavBlob);

        resolve({
          blob: wavBlob,
          url: audioUrl,
          duration: estimatedSeconds,
          audioBuffer: audioBuffer,
          speakNative: () => {
            window.speechSynthesis.cancel();
            window.speechSynthesis.speak(utterance);
          }
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  /**
   * Convert AudioBuffer to WAV Blob
   */
  static bufferToWave(abuffer, totalSamples) {
    const numOfChan = abuffer.numberOfChannels;
    const length = totalSamples * numOfChan * 2 + 44;
    const out = new ArrayBuffer(length);
    const view = new DataView(out);
    let offset = 0;
    let pos = 0;

    function setUint16(data) {
      view.setUint16(offset, data, true);
      offset += 2;
    }
    function setUint32(data) {
      view.setUint32(offset, data, true);
      offset += 4;
    }

    setUint32(0x46464952); // "RIFF"
    setUint32(length - 8);
    setUint32(0x45564157); // "WAVE"
    setUint32(0x20746d66); // "fmt " chunk
    setUint32(16);         // length = 16
    setUint16(1);          // PCM (uncompressed)
    setUint16(numOfChan);
    setUint32(abuffer.sampleRate);
    setUint32(abuffer.sampleRate * 2 * numOfChan); // avg bytes/sec
    setUint16(numOfChan * 2); // block-align
    setUint16(16);            // 16-bit
    setUint32(0x61746164);    // "data" chunk
    setUint32(length - offset - 4);

    const channels = [];
    for (let i = 0; i < numOfChan; i++) {
      channels.push(abuffer.getChannelData(i));
    }

    while (pos < totalSamples) {
      for (let i = 0; i < numOfChan; i++) {
        let sample = Math.max(-1, Math.min(1, channels[i][pos]));
        sample = (0.5 + sample < 0 ? sample * 32768 : sample * 32767) | 0;
        view.setInt16(offset, sample, true);
        offset += 2;
      }
      pos++;
    }

    return new Blob([out], { type: 'audio/wav' });
  }
}

window.AudioManager = AudioManager;
