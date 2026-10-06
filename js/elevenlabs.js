/**
 * ElevenLabs Voice Generation Client
 * Supports ElevenLabs API with 'eleven_v3' flagship model
 * Documentation: https://elevenlabs.io/docs
 *
 * Features:
 * - Flagship model: 'eleven_v3' (70+ languages, emotional depth, conversational prosody)
 * - Also supports eleven_multilingual_v2, eleven_flash_v2_5, eleven_turbo_v2_5, eleven_monolingual_v1
 * - Dynamic model fetching from /v1/models
 * - Custom & cloned voices fetching from /v1/voices
 * - Voice preview playback via preview_url
 * - Stability, similarity boost, style, and speaker boost settings
 * - Base64/Blob audio decoding into native AudioBuffer
 */
class ElevenLabsClient {
  constructor() {
    this.apiKey = localStorage.getItem('elevenlabs_api_key') || '';
    this.defaultModel = 'eleven_v4'; // Flagship ElevenLabs v4 model with audio prompt tags
    this.defaultVoiceId = ''; // No hardcoded default voice
    this.remoteVoices = [];
    this.modelsFetched = false;

    // Available models with eleven_v4 & eleven_v3 prioritized
    this.availableModels = [
      {
        model_id: 'eleven_v4',
        name: '🔥 Eleven v4 (Latest Flagship • Expressive Audio Tags & Emotion)',
        description: 'Next-gen flagship model: high dynamic range, audio prompt tags ([whispering], [laughing], [shouting]), conversational depth',
        can_do_tts: true
      },
      {
        model_id: 'eleven_v3',
        name: '⚡ Eleven v3 (Flagship • 70+ Languages • Expressive)',
        description: 'Flagship model: 70+ languages, deep emotional depth & natural conversational nuance',
        can_do_tts: true
      },
      {
        model_id: 'eleven_v3_conversational',
        name: '⚡ Eleven v3 Conversational (Real-time Dialog • ~280ms)',
        description: 'Ultra-low latency conversational model tuned for natural multi-turn back-and-forth dialogue',
        can_do_tts: true
      },
      {
        model_id: 'eleven_multilingual_v2',
        name: '🌐 Eleven Multilingual v2 (29 Languages • Stable)',
        description: 'Stable long-form speech across 29 languages including Indian languages',
        can_do_tts: true
      },
      {
        model_id: 'eleven_flash_v2_5',
        name: '⚡ Eleven Flash v2.5 (Fastest Real-time • ~75ms)',
        description: 'Ultra-low latency (~75ms), 32 languages, ideal for real-time animations',
        can_do_tts: true
      },
      {
        model_id: 'eleven_flash_v2',
        name: '⚡ Eleven Flash v2 (Ultra-low Latency)',
        description: 'Lightweight, rapid response for streaming chat & dialogue',
        can_do_tts: true
      },
      {
        model_id: 'eleven_turbo_v2_5',
        name: '🚀 Eleven Turbo v2.5 (High Quality & Speed)',
        description: 'Balanced speed and high audio quality across languages',
        can_do_tts: true
      },
      {
        model_id: 'eleven_turbo_v2',
        name: '🚀 Eleven Turbo v2 (Fast English & Multilingual)',
        description: 'Fast, cost-effective generation for dialogue',
        can_do_tts: true
      },
      {
        model_id: 'eleven_multilingual_v1',
        name: '📜 Eleven Multilingual v1 (Classic Generation)',
        description: 'Legacy multilingual model supporting 10 languages',
        can_do_tts: true
      },
      {
        model_id: 'eleven_monolingual_v1',
        name: '📜 Eleven English v1 (Classic English)',
        description: 'Legacy English-only model',
        can_do_tts: true
      }
    ];

    // Current preview audio element
    this.currentPreviewAudio = null;

    // Language override option (ON by default for eleven_v3 & multilingual)
    this.defaultLanguageOverride = localStorage.getItem('eleven_language_override') !== 'false';
    this.defaultLanguageCode = localStorage.getItem('eleven_language_code') || 'hi';

    // Dialogue delivery speed / pacing (0.7 to 1.2, default 1.0)
    this.defaultSpeed = parseFloat(localStorage.getItem('eleven_voice_speed') || '1.0');

    // Load cached remote voices
    const savedRemoteVoices = localStorage.getItem('cached_elevenlabs_remote_voices');
    if (savedRemoteVoices) {
      try {
        this.remoteVoices = JSON.parse(savedRemoteVoices);
      } catch (e) {
        this.remoteVoices = [];
      }
    }

    // Load cached models
    const savedModels = localStorage.getItem('cached_elevenlabs_models');
    if (savedModels) {
      try {
        const parsed = JSON.parse(savedModels);
        if (parsed && parsed.length > 0) {
          this.availableModels = parsed;
          this.modelsFetched = true;
        }
      } catch (e) { /* keep defaults */ }
    }
  }

  setApiKey(key) {
    this.apiKey = (key || '').trim();
    localStorage.setItem('elevenlabs_api_key', this.apiKey);
  }

  getApiKey() {
    return this.apiKey;
  }

  hasApiKey() {
    return !!this.apiKey && this.apiKey.length > 5;
  }

  /**
   * Fetch available models from ElevenLabs API
   */
  async fetchModels() {
    if (!this.hasApiKey()) return this.availableModels;

    try {
      const response = await fetch('https://api.elevenlabs.io/v1/models', {
        headers: { 'xi-api-key': this.apiKey }
      });

      if (!response.ok) return this.availableModels;

      const models = await response.json();
      if (Array.isArray(models) && models.length > 0) {
        const ttsModels = models.filter(m => {
          return m.can_do_text_to_speech === true ||
                 m.model_id?.includes('eleven_v') ||
                 m.model_id?.includes('multilingual') ||
                 m.model_id?.includes('flash') ||
                 m.model_id?.includes('turbo') ||
                 m.model_id?.includes('monolingual');
        }).map(m => ({
          model_id: m.model_id,
          name: m.name || m.model_id,
          description: m.description || '',
          can_do_tts: m.can_do_text_to_speech !== false
        }));

        if (ttsModels.length > 0) {
          // Ensure eleven_v4 & eleven_v3 are included and at the top if available
          const hasV3 = ttsModels.some(m => m.model_id === 'eleven_v3');
          if (!hasV3) {
            ttsModels.unshift({
              model_id: 'eleven_v3',
              name: 'Eleven v3 (Flagship • 70+ Languages)',
              description: 'Flagship model: 70+ languages, emotional nuance',
              can_do_tts: true
            });
          }
          const hasV4 = ttsModels.some(m => m.model_id === 'eleven_v4');
          if (!hasV4) {
            ttsModels.unshift({
              model_id: 'eleven_v4',
              name: 'Eleven v4 (Latest Flagship • Expressive Audio Tags)',
              description: 'Next-gen flagship model: high dynamic range, audio prompt tags ([whispering], [laughing], [shouting]), conversational depth',
              can_do_tts: true
            });
          }
          this.availableModels = ttsModels;
          this.modelsFetched = true;
          localStorage.setItem('cached_elevenlabs_models', JSON.stringify(ttsModels));
        }
      }
      return this.availableModels;
    } catch (err) {
      console.warn("Could not fetch ElevenLabs models:", err);
      return this.availableModels;
    }
  }

  /**
   * Fetch all voices from user's ElevenLabs account
   */
  async fetchVoices() {
    if (!this.hasApiKey()) {
      return this.categorizeVoices(this.remoteVoices);
    }

    try {
      const response = await fetch('https://api.elevenlabs.io/v1/voices', {
        headers: { 'xi-api-key': this.apiKey }
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errText}`);
      }

      const data = await response.json();
      if (data.voices && Array.isArray(data.voices)) {
        this.remoteVoices = data.voices.map(v => {
          const labels = v.labels || {};
          const cat = (v.category || 'premade').toLowerCase();
          const isCustom = cat === 'cloned' || cat === 'generated' || cat === 'professional' || cat === 'instant';

          const searchStr = `${v.name} ${labels.accent || ''} ${labels.language || ''} ${labels.description || ''}`.toLowerCase();
          const isIndian = searchStr.includes('india') || searchStr.includes('hindi') || searchStr.includes('tamil') || searchStr.includes('telugu');

          return {
            id: v.voice_id,
            name: v.name || 'Unknown Voice',
            category: v.category || 'premade',
            rawCategory: v.category || 'premade',
            gender: labels.gender || labels.Gender || 'unknown',
            accent: labels.accent || '',
            language: labels.language || '',
            description: labels.description || '',
            previewUrl: v.preview_url || null,
            isCustom: isCustom,
            isIndian: isIndian
          };
        });

        localStorage.setItem('cached_elevenlabs_remote_voices', JSON.stringify(this.remoteVoices));
      }

      return this.categorizeVoices(this.remoteVoices);
    } catch (err) {
      console.warn("Could not fetch remote ElevenLabs voices:", err);
      return this.categorizeVoices(this.remoteVoices);
    }
  }

  getAllVoicesList() {
    return this.remoteVoices.length > 0 ? [...this.remoteVoices] : [];
  }

  categorizeVoices(voiceList) {
    const customVoices = [];
    const indianVoices = [];
    const globalVoices = [];

    for (const v of voiceList) {
      if (v.isCustom) {
        customVoices.push(v);
      } else if (v.isIndian) {
        indianVoices.push(v);
      } else {
        globalVoices.push(v);
      }
    }

    const sortByName = (a, b) => (a.name || '').localeCompare(b.name || '');
    customVoices.sort(sortByName);
    indianVoices.sort(sortByName);
    globalVoices.sort(sortByName);

    return { customVoices, indianVoices, globalVoices, allVoices: voiceList };
  }

  filterVoices(voiceList, filterCategory = 'all', searchQuery = '') {
    const q = searchQuery.trim().toLowerCase();
    return voiceList.filter(v => {
      if (filterCategory === 'custom' && !v.isCustom) return false;
      if (filterCategory === 'indian' && !v.isIndian) return false;
      if (filterCategory === 'premade' && (v.isCustom || v.isIndian)) return false;

      if (q) {
        const full = `${v.name} ${v.language} ${v.accent} ${v.description} ${v.gender}`.toLowerCase();
        return full.includes(q);
      }
      return true;
    });
  }

  getVoiceNameById(voiceId) {
    if (!voiceId) return 'Default Voice';
    const voice = this.remoteVoices.find(v => v.id === voiceId);
    if (voice) return voice.name;
    const curated = this.getCuratedVoiceLibrary().find(c => c.voice_id === voiceId);
    if (curated) return curated.name;
    return voiceId.length > 12 ? voiceId.substring(0, 10) + '...' : voiceId;
  }

  /**
   * Detect language code based on script range
   */
  detectLanguage(text) {
    if (!text) return 'hi';
    if (/[\u0900-\u097F]/.test(text)) return 'hi'; // Hindi / Marathi (Devanagari)
    if (/[\u0B80-\u0BFF]/.test(text)) return 'ta'; // Tamil
    if (/[\u0C00-\u0C7F]/.test(text)) return 'te'; // Telugu
    if (/[\u0C80-\u0CFF]/.test(text)) return 'kn'; // Kannada
    if (/[\u0D00-\u0D7F]/.test(text)) return 'ml'; // Malayalam
    if (/[\u0980-\u09FF]/.test(text)) return 'bn'; // Bengali
    if (/[\u0A80-\u0AFF]/.test(text)) return 'gu'; // Gujarati
    if (/[\u0A00-\u0A7F]/.test(text)) return 'pa'; // Punjabi
    return 'en'; // Default English
  }

  /**
   * Generate speech using ElevenLabs API with model 'eleven_v3'
   */
  async generateSpeech(text, voiceId, options = {}) {
    if (!this.hasApiKey()) {
      throw new Error("Missing ElevenLabs API Key. Please open Voice Engines settings and enter your ElevenLabs key.");
    }

    const cleanText = (text || '').trim();
    if (!cleanText) {
      throw new Error("Cannot generate ElevenLabs speech: text is empty.");
    }

    const targetVoice = (voiceId || this.defaultVoiceId || '').trim();
    if (!targetVoice) {
      throw new Error("No ElevenLabs voice selected. Please select a voice or enter a Voice ID.");
    }
    // Use 'eleven_v4' by default
    const modelId = options.modelId || options.model || this.defaultModel || 'eleven_v4';

    const speedVal = options.speed !== undefined ? parseFloat(options.speed) : (this.defaultSpeed || 1.0);
    const clampedSpeed = Math.max(0.7, Math.min(1.2, isNaN(speedVal) ? 1.0 : speedVal));

    const payload = {
      text: cleanText,
      model_id: modelId,
      voice_settings: {
        stability: options.stability !== undefined ? options.stability : 0.5,
        similarity_boost: options.similarity !== undefined ? options.similarity : 0.75,
        style: options.style !== undefined ? options.style : 0.0,
        use_speaker_boost: options.speakerBoost !== undefined ? options.speakerBoost : true,
        speed: Number(clampedSpeed.toFixed(2))
      }
    };

    // Language override option (default 'on' for eleven_v3 & multilingual)
    const isOverrideOn = options.languageOverride !== undefined ? !!options.languageOverride : this.defaultLanguageOverride;
    if (isOverrideOn) {
      let langCode = options.languageCode || this.defaultLanguageCode || 'hi';
      if (langCode === 'auto' || !langCode) {
        langCode = this.detectLanguage(cleanText);
      }
      if (langCode && langCode.includes('-')) {
        langCode = langCode.split('-')[0];
      }
      if (langCode) {
        payload.language_code = langCode.toLowerCase().trim();
      }
    }

    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${targetVoice}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'xi-api-key': this.apiKey,
        'Accept': 'audio/mpeg'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errText = await response.text();
      let errorMsg = `ElevenLabs API error (${response.status})`;
      try {
        const errJson = JSON.parse(errText);
        if (errJson.detail) {
          if (typeof errJson.detail === 'string') {
            errorMsg += `: ${errJson.detail}`;
          } else if (errJson.detail.message) {
            errorMsg += `: ${errJson.detail.message}`;
          }
        }
      } catch (e) {
        errorMsg += `: ${errText.substring(0, 200)}`;
      }
      throw new Error(errorMsg);
    }

    const audioBlob = await response.blob();
    const audioUrl = URL.createObjectURL(audioBlob);

    const arrayBuffer = await audioBlob.arrayBuffer();
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer.slice(0));

    return {
      blob: audioBlob,
      url: audioUrl,
      duration: audioBuffer.duration,
      audioBuffer: audioBuffer,
      modelId: modelId,
      voiceId: targetVoice
    };
  }

  /**
   * Play audio preview for a voice by ID or preview URL
   */
  playVoicePreview(voiceIdOrUrl, onStart, onEnd, onError) {
    this.stopVoicePreview();

    let previewUrl = null;
    if (voiceIdOrUrl.startsWith('http')) {
      previewUrl = voiceIdOrUrl;
    } else {
      const v = this.remoteVoices.find(voice => voice.id === voiceIdOrUrl);
      if (v && v.previewUrl) {
        previewUrl = v.previewUrl;
      } else {
        // Check curated library
        const curated = this.getCuratedVoiceLibrary().find(c => c.voice_id === voiceIdOrUrl);
        if (curated && curated.preview_url) {
          previewUrl = curated.preview_url;
        }
      }
    }

    if (!previewUrl) {
      if (onError) onError(new Error("No audio preview URL available for this voice."));
      return;
    }

    try {
      this.currentPreviewAudio = new Audio(previewUrl);
      this.currentPreviewAudio.onplay = () => { if (onStart) onStart(); };
      this.currentPreviewAudio.onended = () => { if (onEnd) onEnd(); };
      this.currentPreviewAudio.onerror = (e) => {
        if (onError) onError(new Error("Could not stream preview audio."));
      };
      this.currentPreviewAudio.play().catch(err => {
        if (onError) onError(err);
      });
    } catch (err) {
      if (onError) onError(err);
    }
  }

  stopVoicePreview() {
    if (this.currentPreviewAudio) {
      this.currentPreviewAudio.pause();
      this.currentPreviewAudio.currentTime = 0;
      this.currentPreviewAudio = null;
    }
  }

  /**
   * Curated catalog of community & popular voices - empty by default (no pre-loaded voices)
   */
  getCuratedVoiceLibrary() {
    return [];
  }

  /**
   * Search voices from Voice Library (elevenlabs.io/app/voice-library)
   * Queries /v1/shared-voices if API key is provided.
   */
  async fetchSharedVoices(search = '', category = 'all', gender = 'all') {
    let results = [];

    if (this.hasApiKey()) {
      try {
        const queryParams = new URLSearchParams();
        queryParams.set('page_size', '30');
        if (search) queryParams.set('search', search);
        if (category && category !== 'all') {
          // Map to ElevenLabs API shared-voices categories if matching
          if (['professional', 'famous', 'high_quality'].includes(category)) {
            queryParams.set('category', category);
          }
        }
        if (gender && gender !== 'all') {
          queryParams.set('gender', gender);
        }

        const res = await fetch(`https://api.elevenlabs.io/v1/shared-voices?${queryParams.toString()}`, {
          headers: { 'xi-api-key': this.apiKey }
        });

        if (res.ok) {
          const data = await res.json();
          if (data && Array.isArray(data.voices) && data.voices.length > 0) {
            results = data.voices.map(v => {
              const labels = v.labels || {};
              const searchStr = `${v.name} ${labels.accent || ''} ${labels.language || ''} ${v.description || ''}`.toLowerCase();
              const isIndian = searchStr.includes('india') || searchStr.includes('hindi') || searchStr.includes('tamil');
              return {
                voice_id: v.voice_id,
                public_user_id: v.public_user_id || '',
                name: v.name || 'Shared Voice',
                category: isIndian ? 'indian' : (v.category || 'community'),
                gender: v.gender || labels.gender || 'unknown',
                accent: v.accent || labels.accent || '',
                language: v.language || labels.language || '',
                description: v.description || labels.description || '',
                use_case: v.use_case || v.descriptive || '',
                preview_url: v.preview_url || null,
                isSharedLibrary: true
              };
            });
          }
        }
      } catch (err) {
        console.warn("Could not query /v1/shared-voices:", err);
      }
    }

    // Filter results locally
    const q = (search || '').trim().toLowerCase();
    return results.filter(v => {
      if (category && category !== 'all') {
        if (category === 'indian' && v.category !== 'indian') return false;
        if (category === 'conversational' && v.category !== 'conversational') return false;
        if (category === 'storytelling' && v.category !== 'storytelling') return false;
        if (category === 'professional' && v.category !== 'professional') return false;
      }
      if (gender && gender !== 'all' && v.gender && v.gender.toLowerCase() !== gender.toLowerCase()) {
        return false;
      }
      if (q) {
        const full = `${v.name} ${v.accent} ${v.language} ${v.description} ${v.use_case}`.toLowerCase();
        return full.includes(q);
      }
      return true;
    });
  }

  /**
   * Add a shared voice from the Voice Library to the user's ElevenLabs account
   */
  async addSharedVoiceToAccount(publicUserId, voiceId, newName) {
    if (!this.hasApiKey()) {
      throw new Error('Please enter your ElevenLabs API key first to add voices to your account.');
    }
    const endpoint = `https://api.elevenlabs.io/v1/voices/add/${encodeURIComponent(publicUserId)}/${encodeURIComponent(voiceId)}`;
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'xi-api-key': this.apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        new_name: newName || 'Library Voice'
      })
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Failed to add voice to account: HTTP ${res.status} - ${err}`);
    }

    return await res.json();
  }

  /**
   * Add a voice to local remoteVoices list and cache
   */
  addVoice(voice) {
    if (!voice || !voice.id) return;
    const existingIndex = this.remoteVoices.findIndex(v => v.id === voice.id);
    if (existingIndex >= 0) {
      this.remoteVoices[existingIndex] = { ...this.remoteVoices[existingIndex], ...voice };
    } else {
      this.remoteVoices.unshift(voice);
    }
    this.defaultVoiceId = voice.id;
    localStorage.setItem('cached_elevenlabs_remote_voices', JSON.stringify(this.remoteVoices));
  }

  /**
   * Parse a Voice Library URL or raw voice ID from user input
   */
  parseVoiceIdFromUrl(input) {
    if (!input) return null;
    const str = input.trim();

    // Direct voice ID (typically 20 chars alphanumeric)
    if (/^[a-zA-Z0-9_-]{16,36}$/.test(str)) {
      return str;
    }

    // e.g. https://elevenlabs.io/app/voice-library/voice/onwK4e9ZLuTAKqWW03F9
    const matchPath = str.match(/voice-library\/voice\/([a-zA-Z0-9_-]+)/);
    if (matchPath) return matchPath[1];

    // e.g. https://elevenlabs.io/app/voice-library?voice=onwK4e9ZLuTAKqWW03F9
    try {
      const url = new URL(str);
      const qVoice = url.searchParams.get('voice');
      if (qVoice) return qVoice;
    } catch (e) { /* not a URL */ }

    return null;
  }

  /**
   * Fetch specific voice details from /v1/voices/{voice_id}
   */
  async fetchVoiceDetails(voiceId) {
    if (!voiceId) return null;

    if (this.hasApiKey()) {
      try {
        const res = await fetch(`https://api.elevenlabs.io/v1/voices/${voiceId}`, {
          headers: { 'xi-api-key': this.apiKey }
        });
        if (res.ok) {
          const v = await res.json();
          const labels = v.labels || {};
          return {
            id: v.voice_id,
            name: v.name || 'Voice Library Voice',
            category: v.category || 'voice_library',
            rawCategory: v.category || 'voice_library',
            gender: labels.gender || labels.Gender || 'unknown',
            accent: labels.accent || '',
            language: labels.language || '',
            description: labels.description || '',
            previewUrl: v.preview_url || null,
            isCustom: true,
            isIndian: (v.name + ' ' + (labels.accent || '')).toLowerCase().includes('india')
          };
        }
      } catch (e) {
        console.warn('Could not fetch voice details from API:', e);
      }
    }

    // Check curated library
    const curated = this.getCuratedVoiceLibrary().find(c => c.voice_id === voiceId);
    if (curated) {
      return {
        id: curated.voice_id,
        name: curated.name,
        category: curated.category,
        gender: curated.gender,
        accent: curated.accent,
        language: curated.language,
        description: curated.description,
        previewUrl: curated.preview_url,
        isCustom: true,
        isIndian: curated.category === 'indian'
      };
    }

    // Fallback minimal object
    return {
      id: voiceId,
      name: `Voice (${voiceId.slice(0, 8)}...)`,
      category: 'voice_library',
      gender: 'unknown',
      accent: '',
      description: 'Imported from ElevenLabs Voice Library',
      previewUrl: null,
      isCustom: true,
      isIndian: false
    };
  }
}

window.ElevenLabsClient = ElevenLabsClient;
