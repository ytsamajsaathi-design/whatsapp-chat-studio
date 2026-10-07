/**
 * Modern Avatar Presets with zero-latency SVG data URIs
 */
const STUDIO_AVATAR_PRESETS = [
  {
    id: 'female_modern',
    name: 'Elena (Friendly)',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="#a855f7"/><circle cx="50" cy="42" r="21" fill="#fde047"/><path d="M22 88c0-18 13-30 28-30s28 12 28 30" fill="#7e22ce"/><path d="M28 38c0-14 9-22 22-22s22 8 22 22c0 4-1 8-3 10-4-10-11-13-19-13s-15 3-19 13c-2-2-3-6-3-10z" fill="#4c1d95"/><circle cx="42" cy="42" r="2.6" fill="#1e1b4b"/><circle cx="58" cy="42" r="2.6" fill="#1e1b4b"/><path d="M46 51q4 3 8 0" stroke="#7e22ce" stroke-width="2" stroke-linecap="round" fill="none"/></svg>`
  },
  {
    id: 'female_pro',
    name: 'Sarah (Professional)',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="#00a884"/><circle cx="50" cy="42" r="21" fill="#fed7aa"/><path d="M20 88c0-18 14-30 30-30s30 12 30 30" fill="#0f766e"/><path d="M27 36c0-15 10-24 23-24s23 9 23 24c-3 8-11 12-23 12s-20-4-23-12z" fill="#1c1917"/><circle cx="42" cy="42" r="2.6" fill="#0f172a"/><circle cx="58" cy="42" r="2.6" fill="#0f172a"/><path d="M46 51q4 2.5 8 0" stroke="#047857" stroke-width="2" stroke-linecap="round" fill="none"/></svg>`
  },
  {
    id: 'male_casual',
    name: 'Alex (Casual)',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="#3b82f6"/><circle cx="50" cy="44" r="21" fill="#fed7aa"/><path d="M20 88c0-18 14-28 30-28s30 10 30 28" fill="#1d4ed8"/><path d="M29 36c0-14 9-22 21-22s21 8 21 22v4H29z" fill="#451a03"/><circle cx="42" cy="44" r="2.6" fill="#0f172a"/><circle cx="58" cy="44" r="2.6" fill="#0f172a"/><path d="M46 52q4 2.5 8 0" stroke="#b45309" stroke-width="2" stroke-linecap="round" fill="none"/></svg>`
  },
  {
    id: 'male_creative',
    name: 'Marcus (Creative)',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="#10b981"/><circle cx="50" cy="43" r="21" fill="#fcd34d"/><path d="M20 88c0-18 14-28 30-28s30 10 30 28" fill="#047857"/><path d="M28 33c0-12 10-20 22-20s22 8 22 20-2 8-5 10c-5-8-11-10-17-10s-12 2-17 10c-3-2-5-6-5-10z" fill="#09090b"/><circle cx="42" cy="44" r="2.6" fill="#09090b"/><circle cx="58" cy="44" r="2.6" fill="#09090b"/><circle cx="42" cy="44" r="5.5" stroke="#09090b" stroke-width="1.6" fill="none"/><circle cx="58" cy="44" r="5.5" stroke="#09090b" stroke-width="1.6" fill="none"/><path d="M48 44h4" stroke="#09090b" stroke-width="1.6"/><path d="M46 53q4 2.5 8 0" stroke="#065f46" stroke-width="2" stroke-linecap="round" fill="none"/></svg>`
  },
  {
    id: 'avatar_3d_pink',
    name: '3D Cool Avatar',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="gp1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#ec4899"/><stop offset="100%" stop-color="#8b5cf6"/></linearGradient></defs><circle cx="50" cy="50" r="50" fill="url(#gp1)"/><circle cx="50" cy="45" r="22" fill="#fed7aa"/><path d="M20 90c0-16 14-26 30-26s30 10 30 26" fill="#4c1d95"/><path d="M28 36c2-12 10-20 22-20s20 8 22 20c-4-4-12-6-22-6s-18 2-22 6z" fill="#312e81"/><path d="M36 43h10v4H36zm18 0h10v4H54z" fill="#1e1b4b"/><path d="M46 53q4 4 8 0" stroke="#be185d" stroke-width="2.5" stroke-linecap="round" fill="none"/></svg>`
  },
  {
    id: 'avatar_3d_blue',
    name: 'Studio DJ / Artist',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="gp2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#06b6d4"/><stop offset="100%" stop-color="#3b82f6"/></linearGradient></defs><circle cx="50" cy="50" r="50" fill="url(#gp2)"/><circle cx="50" cy="46" r="21" fill="#fde047"/><path d="M20 90c0-16 14-26 30-26s30 10 30 26" fill="#0369a1"/><path d="M25 44c0-14 11-24 25-24s25 10 25 24" stroke="#0f172a" stroke-width="7" fill="none"/><rect x="22" y="38" width="6" height="15" rx="3" fill="#0f172a"/><rect x="72" y="38" width="6" height="15" rx="3" fill="#0f172a"/><circle cx="43" cy="46" r="2.6" fill="#0f172a"/><circle cx="57" cy="46" r="2.6" fill="#0f172a"/><path d="M46 54q4 2.5 8 0" stroke="#0284c7" stroke-width="2" stroke-linecap="round" fill="none"/></svg>`
  }
];

function getPresetDataUrl(preset) {
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(preset.svg);
}

/**
 * Resize user uploaded image files to crisp 256x256 square avatars to optimize memory & localStorage
 */
function resizeImageFile(file, maxDimension = 256, quality = 0.85) {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith('image/')) {
      return reject(new Error('Invalid image file.'));
    }
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read image file.'));
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => reject(new Error('Failed to decode image.'));
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const w = img.width;
        const h = img.height;

        // Square center crop
        const minSide = Math.min(w, h);
        const sx = (w - minSide) / 2;
        const sy = (h - minSide) / 2;

        const outSize = Math.min(maxDimension, minSide);
        canvas.width = outSize;
        canvas.height = outSize;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, sx, sy, minSide, minSide, 0, 0, outSize, outSize);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

/**
 * ElevenLabs Expressive Audio Prompt Tags Catalog (eleven_v4 ready)
 */
const EXTENDED_AUDIO_TAGS = [
  {
    category: 'Tone & Emotion',
    tags: [
      { tag: '[whispering]', label: '🤫 Whispering' },
      { tag: '[shouting]', label: '📢 Shouting' },
      { tag: '[laughing]', label: '😂 Laughing' },
      { tag: '[giggling]', label: '🤭 Giggling' },
      { tag: '[sighs]', label: '😮‍💨 Sighs' },
      { tag: '[gasping]', label: '😱 Gasping' },
      { tag: '[excited]', label: '🤩 Excited' },
      { tag: '[angry]', label: '😡 Angry' },
      { tag: '[crying]', label: '😢 Crying' },
      { tag: '[sarcastic]', label: '🙃 Sarcastic' },
      { tag: '[cheerful]', label: '😊 Cheerful' },
      { tag: '[sad]', label: '😞 Sad' },
      { tag: '[curious]', label: '🧐 Curious' },
      { tag: '[panicked]', label: '😨 Panicked' },
      { tag: '[calm]', label: '😌 Calm' }
    ]
  },
  {
    category: 'Vocal Actions & Delivery',
    tags: [
      { tag: '[clears throat]', label: '🗣️ Clears Throat' },
      { tag: '[panting]', label: '💨 Panting' },
      { tag: '[coughing]', label: '😷 Coughing' },
      { tag: '[yawning]', label: '🥱 Yawning' },
      { tag: '[snicker]', label: '😏 Snicker' },
      { tag: '[screaming]', label: '🔊 Screaming' }
    ]
  },
  {
    category: 'Pacing & Cadence',
    tags: [
      { tag: '[pause]', label: '⏸️ Normal Pause' },
      { tag: '[short pause]', label: '⏱️ Short Pause' },
      { tag: '[long pause]', label: '⏳ Long Pause' },
      { tag: '[hesitant]', label: '🤔 Hesitant' },
      { tag: '[rapidly]', label: '⚡ Rapidly' },
      { tag: '[slowly]', label: '🐢 Slowly' }
    ]
  }
];

/**
 * Main Application Orchestrator for WhatsApp Voice & Chat Animation Studio
 */
class WhatsAppStudioApp {
  constructor() {
    this.audioManager = new AudioManager();
    this.elevenLabs = new ElevenLabsClient();
    this.renderer = new AnimationRenderer(this);
    this.voicePreviewAudio = null; // For voice preview in settings modal

    // Initial settings
    this.settings = {
      theme: 'light',
      contactName: 'Sarah Jenkins',
      contactAvatar: localStorage.getItem('setting_contact_avatar') || '',
      senderAvatar: localStorage.getItem('setting_sender_avatar') || '',
      receiverAvatar: localStorage.getItem('setting_receiver_avatar') || '',
      phoneTime: '9:41 AM',
      senderBubbleColor: '#d9fdd3',
      receiverBubbleColor: '#ffffff',
      backgroundType: 'doodle',
      backgroundColor: '#efeae2',
      showPhoneFrame: true,
      sfxEnabled: true,
      elevenSenderVoiceId: localStorage.getItem('default_eleven_sender_voice') || '',
      elevenReceiverVoiceId: localStorage.getItem('default_eleven_receiver_voice') || '',
      elevenLabsModel: 'eleven_v4', // Flagship eleven_v4 model with expressive audio tags
      elevenSpeed: parseFloat(localStorage.getItem('eleven_voice_speed') || '1.0'), // Dialogue delivery speed (0.70x to 1.20x)
      elevenLanguageOverride: localStorage.getItem('eleven_language_override') !== 'false', // Default ON
      elevenLanguageCode: localStorage.getItem('eleven_language_code') || 'hi'
    };
    this.mountedBubbleNodes = new Map(); // msg.id -> { element, msg, appearTime, isVoice }

    // Preloaded initial dialogue
    this.messages = [
      {
        id: 'msg_1',
        sender: 'receiver',
        type: 'text',
        text: 'Hey! Are you still at the recording studio?',
        time: '10:42 AM',
        status: 'read',
        delay: 0.2,
        audioDuration: 0,
        waveform: []
      },
      {
        id: 'msg_2',
        sender: 'sender',
        type: 'text',
        text: 'Yeah, just wrapping up the final master track right now! 🎧',
        time: '10:43 AM',
        status: 'read',
        delay: 0.2,
        audioDuration: 0,
        waveform: []
      },
      {
        id: 'msg_3',
        sender: 'receiver',
        type: 'voice',
        text: 'Listen to this quick hook idea before you leave, tell me what you think!',
        time: '10:44 AM',
        status: 'read',
        delay: 0.2,
        audioDuration: 3.8,
        waveform: AudioManager.generateRealisticWaveform(32)
      },
      {
        id: 'msg_4',
        sender: 'sender',
        type: 'text',
        text: 'Yo that sounds INSANE!! Adding the 808s right now 🔥🔥',
        time: '10:45 AM',
        status: 'read',
        delay: 0.2,
        audioDuration: 0,
        waveform: []
      }
    ];

    // Playback state
    this.isPlaying = false;
    this.currentTime = 0;
    this.playbackSpeed = 1.0;
    this.lastFrameTime = null;
    this.rafId = null;
    this.playedSfxMessages = new Set();
    this.activeVoiceAudio = null;

    this.initDOM();
    this.bindEvents();
    this.renderPipelineList();
    this.updatePreviewAtTime(0);
  }


  initDOM() {
    // Pipeline panel elements
    this.pipelineListEl = document.getElementById('pipelineMessagesList');
    this.msgCountBadge = document.getElementById('msgCountBadge');

    // Phone simulator elements
    this.phoneMockup = document.getElementById('phoneMockup');
    this.phoneScreen = document.getElementById('phoneScreen');
    this.chatViewport = document.getElementById('waChatViewport');
    this.messagesContainer = document.getElementById('activeMessagesContainer');
    this.typingBubble = document.getElementById('typingBubble');
    this.headerAvatar = document.getElementById('headerAvatar');
    this.headerContactName = document.getElementById('headerContactName');
    this.headerContactStatus = document.getElementById('headerContactStatus');
    this.statusBarClock = document.getElementById('statusBarClock');

    // Controls
    this.playPauseBtn = document.getElementById('playPauseBtn');
    this.playIcon = document.getElementById('playIcon');
    this.restartBtn = document.getElementById('restartBtn');
    this.scrubber = document.getElementById('timelineScrubber');
    this.currentTimeDisplay = document.getElementById('currentTimeDisplay');
    this.totalDurationDisplay = document.getElementById('totalDurationDisplay');
    this.playbackSpeedSelect = document.getElementById('playbackSpeedSelect');
    this.themeToggleBtn = document.getElementById('themeToggleBtn');
    this.frameToggleBtn = document.getElementById('frameToggleBtn');

    // Modals
    this.exportModal = document.getElementById('exportModal');
    this.appearanceModal = document.getElementById('appearanceModal');
    this.voiceSettingsModal = document.getElementById('voiceSettingsModal');
    this.voiceLibraryModal = document.getElementById('voiceLibraryModal');
    this.sheetsModal = document.getElementById('sheetsModal');
    this.templatesModal = document.getElementById('templatesModal');

    // Load ElevenLabs key if saved
    const savedElevenKey = this.elevenLabs.getApiKey();
    if (savedElevenKey) {
      const elevenKeyInput = document.getElementById('elevenLabsApiKeyInput');
      if (elevenKeyInput) elevenKeyInput.value = savedElevenKey;
    }

    // Initialize Speech Delivery Speed UI
    const speedSlider = document.getElementById('voiceSpeedSlider');
    const speedLabel = document.getElementById('speedValueLabel');
    if (speedSlider) {
      speedSlider.value = this.settings.elevenSpeed || 1.0;
      if (speedLabel) {
        const val = parseFloat(speedSlider.value);
        speedLabel.innerText = `${val.toFixed(2)}x ${val === 1.0 ? '(Normal)' : ''}`;
      }
      document.querySelectorAll('.speed-preset-btn').forEach(btn => {
        btn.classList.toggle('active', parseFloat(btn.dataset.speed) === Number((this.settings.elevenSpeed || 1.0).toFixed(2)));
      });
    }

    // Initialize ElevenLabs Language Override UI (Default ON)
    const elevenOverrideToggle = document.getElementById('elevenLanguageOverrideToggle');
    if (elevenOverrideToggle) {
      elevenOverrideToggle.checked = this.settings.elevenLanguageOverride !== false;
      this.updateElevenOverrideUI(elevenOverrideToggle.checked);
    }
    const elevenLangCodeInput = document.getElementById('elevenLanguageCodeInput');
    if (elevenLangCodeInput) {
      elevenLangCodeInput.value = this.settings.elevenLanguageCode || 'hi';
    }
    const elevenLangSelect = document.getElementById('elevenLanguageSelect');
    if (elevenLangSelect && elevenLangCodeInput) {
      const currentCode = (this.settings.elevenLanguageCode || 'hi').toLowerCase();
      const matchOption = Array.from(elevenLangSelect.options).find(opt => opt.value === currentCode);
      if (matchOption) {
        elevenLangSelect.value = currentCode;
      } else {
        elevenLangSelect.value = 'custom';
      }
    }

    this.updateElevenConnectionStatus();
    this.populateElevenVoiceSelect();
    this.populatePersonaSelects();

    // Auto-fetch ElevenLabs voices if key saved
    if (this.elevenLabs.hasApiKey()) {
      this.fetchAndReloadElevenVoices(true);
    }

    // Initialize Profile Photos & Avatars UI
    this.initAvatarsUI();

    // Initialize Responsive Collapsible Sidebar & Audio Tags
    this.initSidebar();
  }

  initSidebar() {
    this.studioContainer = document.getElementById('studioContainer');
    this.pipelinePanel = document.getElementById('pipelinePanel');
    this.toggleSidebarBtn = document.getElementById('toggleSidebarBtn');
    this.collapseSidebarBtn = document.getElementById('collapseSidebarBtn');
    this.expandSidebarFloatingBtn = document.getElementById('expandSidebarFloatingBtn');
    this.sidebarBackdrop = document.getElementById('sidebarBackdrop');

    const savedState = localStorage.getItem('studio_sidebar_collapsed');
    const isMobile = window.innerWidth <= 992;
    this.isSidebarCollapsed = savedState !== null ? (savedState === 'true') : false;
    this.applySidebarState(false);

    this.toggleSidebarBtn?.addEventListener('click', () => {
      this.toggleSidebar();
    });

    this.collapseSidebarBtn?.addEventListener('click', () => {
      this.toggleSidebar(true);
    });

    this.expandSidebarFloatingBtn?.addEventListener('click', () => {
      this.toggleSidebar(false);
    });

    this.sidebarBackdrop?.addEventListener('click', () => {
      this.toggleSidebar(true);
    });

    // Keyboard shortcut Ctrl+B or Cmd+B to toggle sidebar
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === 'b' || e.key === 'B')) {
        e.preventDefault();
        this.toggleSidebar();
      }
    });

    window.addEventListener('resize', () => {
      this.updateSidebarOnResize();
    });
  }

  toggleSidebar(forceState) {
    if (forceState !== undefined) {
      this.isSidebarCollapsed = forceState;
    } else {
      this.isSidebarCollapsed = !this.isSidebarCollapsed;
    }
    this.applySidebarState(true);
  }

  applySidebarState(save = true) {
    if (!this.studioContainer) return;
    this.studioContainer.classList.toggle('sidebar-collapsed', this.isSidebarCollapsed);

    if (this.toggleSidebarBtn) {
      const icon = this.toggleSidebarBtn.querySelector('span:first-child');
      const text = this.toggleSidebarBtn.querySelector('.sidebar-toggle-text');
      if (icon) icon.innerText = this.isSidebarCollapsed ? '▶' : '◀';
      if (text) text.innerText = this.isSidebarCollapsed ? 'Show Sidebar' : 'Hide Sidebar';
    }

    if (this.expandSidebarFloatingBtn) {
      this.expandSidebarFloatingBtn.style.display = this.isSidebarCollapsed ? 'inline-flex' : 'none';
      const countEl = document.getElementById('floatingMsgCount');
      if (countEl) countEl.innerText = this.messages.length;
    }

    if (save) {
      localStorage.setItem('studio_sidebar_collapsed', this.isSidebarCollapsed);
    }

    // Trigger canvas resize to adjust to preview container
    setTimeout(() => {
      if (this.onWindowResize) this.onWindowResize();
    }, 320);
  }

  updateSidebarOnResize() {
    if (this.expandSidebarFloatingBtn) {
      const countEl = document.getElementById('floatingMsgCount');
      if (countEl) countEl.innerText = this.messages.length;
    }
  }

  /**
   * Insert an audio prompt tag (e.g. [whispering]) at cursor position in textarea
   */
  insertAudioTag(textarea, tag, msg) {
    if (!textarea) return;
    const start = textarea.selectionStart ?? textarea.value.length;
    const end = textarea.selectionEnd ?? textarea.value.length;
    const val = textarea.value;

    const needsPreSpace = start > 0 && val[start - 1] !== ' ' && val[start - 1] !== '\n';
    const insertStr = (needsPreSpace ? ' ' : '') + tag + ' ';
    const updated = val.substring(0, start) + insertStr + val.substring(end);

    textarea.value = updated;
    if (msg) msg.text = updated;

    const newPos = start + insertStr.length;
    textarea.setSelectionRange(newPos, newPos);
    textarea.focus();

    this.updatePreviewAtTime(this.currentTime);
  }

  /**
   * Open categorized popup for all ElevenLabs audio prompt tags
   */
  openMoreAudioTagsMenu(textarea, msg, triggerBtn) {
    const existing = document.getElementById('audioTagsPopover');
    if (existing) {
      existing.remove();
      return;
    }

    const popover = document.createElement('div');
    popover.id = 'audioTagsPopover';
    popover.style.cssText = `
      position: absolute;
      z-index: 1000;
      background: #090e17;
      border: 1px solid #334155;
      border-radius: 8px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.8);
      padding: 0.75rem 0.9rem;
      width: 320px;
      max-height: 380px;
      overflow-y: auto;
      font-size: 0.75rem;
    `;

    const rect = triggerBtn.getBoundingClientRect();
    const top = rect.bottom + window.scrollY + 4;
    const left = Math.min(rect.left + window.scrollX, window.innerWidth - 340);
    popover.style.top = `${top}px`;
    popover.style.left = `${Math.max(10, left)}px`;

    let html = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.6rem; padding-bottom:0.4rem; border-bottom:1px solid #1e293b;">
        <span style="font-weight:700; color:#c084fc; font-size:0.78rem;">🏷️ Expressive Audio Tags (v4)</span>
        <button type="button" class="btn btn-outline btn-sm close-popover-btn" style="padding:0.1rem 0.35rem; font-size:0.68rem;">✕</button>
      </div>
    `;

    EXTENDED_AUDIO_TAGS.forEach(cat => {
      html += `
        <div style="margin-bottom:0.6rem;">
          <div style="font-size:0.68rem; font-weight:700; color:var(--studio-muted); text-transform:uppercase; margin-bottom:0.3rem;">
            ${cat.category}
          </div>
          <div style="display:flex; flex-wrap:wrap; gap:0.3rem;">
            ${cat.tags.map(t => `
              <button type="button" class="card-tag-btn popover-tag-btn" data-tag="${t.tag}" style="font-size:0.68rem; padding:0.18rem 0.45rem;">
                ${t.label}
              </button>
            `).join('')}
          </div>
        </div>
      `;
    });

    popover.innerHTML = html;
    document.body.appendChild(popover);

    popover.querySelectorAll('.popover-tag-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.insertAudioTag(textarea, btn.dataset.tag, msg);
        popover.remove();
      });
    });

    popover.querySelector('.close-popover-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      popover.remove();
    });

    const handleOutsideClick = (e) => {
      if (!popover.contains(e.target) && e.target !== triggerBtn) {
        popover.remove();
        document.removeEventListener('click', handleOutsideClick);
      }
    };
    setTimeout(() => document.addEventListener('click', handleOutsideClick), 50);
  }

  initAvatarsUI() {
    const contactInput = document.getElementById('contactAvatarUrlInput');
    const senderInput = document.getElementById('senderAvatarUrlInput');
    const receiverInput = document.getElementById('receiverAvatarUrlInput');

    if (contactInput) contactInput.value = this.settings.contactAvatar || '';
    if (senderInput) senderInput.value = this.settings.senderAvatar || '';
    if (receiverInput) receiverInput.value = this.settings.receiverAvatar || '';

    this.updateAvatarPreview('contact', this.settings.contactAvatar);
    this.updateAvatarPreview('sender', this.settings.senderAvatar);
    this.updateAvatarPreview('receiver', this.settings.receiverAvatar);

    this.renderPresetAvatarRows();
    this.updateHeaderAvatar();
    this.updatePersonaChips();
  }

  updateAvatarPreview(target, url) {
    const previewEl = document.getElementById(`${target}AvatarPreview`);
    if (!previewEl) return;

    if (url) {
      previewEl.innerHTML = `<img src="${url}" alt="${target}" style="width:100%; height:100%; object-fit:cover; border-radius:50%; display:block;">`;
      previewEl.parentElement.style.backgroundColor = 'transparent';
    } else {
      let init = 'S';
      let bg = '#00a884';
      if (target === 'sender') {
        init = 'M';
        bg = '#1e7e34';
      } else if (target === 'receiver') {
        init = (this.settings.contactName || 'S').charAt(0).toUpperCase();
        bg = '#2563eb';
      } else {
        init = (this.settings.contactName || 'S').charAt(0).toUpperCase();
        bg = '#00a884';
      }
      previewEl.innerHTML = init;
      previewEl.parentElement.style.backgroundColor = bg;
    }
  }

  updateHeaderAvatar() {
    if (!this.headerAvatar) return;
    const avatarUrl = this.settings.contactAvatar || this.settings.receiverAvatar;
    if (avatarUrl) {
      this.headerAvatar.innerHTML = `<img src="${avatarUrl}" alt="Contact Avatar" class="wa-avatar-img">`;
      this.headerAvatar.style.backgroundColor = 'transparent';
    } else {
      const initial = (this.settings.contactName || 'Sarah').charAt(0).toUpperCase();
      this.headerAvatar.innerHTML = initial;
      this.headerAvatar.style.backgroundColor = '#00a884';
    }
  }

  updatePersonaChips() {
    const senderChip = document.getElementById('personaSenderAvatarChip');
    if (senderChip) {
      if (this.settings.senderAvatar) {
        senderChip.innerHTML = `<img src="${this.settings.senderAvatar}" alt="Sender">`;
        senderChip.style.backgroundColor = 'transparent';
      } else {
        senderChip.innerHTML = 'M';
        senderChip.style.backgroundColor = '#1e293b';
      }
    }

    const receiverChip = document.getElementById('personaReceiverAvatarChip');
    if (receiverChip) {
      const recAvatar = this.settings.receiverAvatar || this.settings.contactAvatar;
      if (recAvatar) {
        receiverChip.innerHTML = `<img src="${recAvatar}" alt="Receiver">`;
        receiverChip.style.backgroundColor = 'transparent';
      } else {
        receiverChip.innerHTML = (this.settings.contactName || 'S').charAt(0).toUpperCase();
        receiverChip.style.backgroundColor = '#1e293b';
      }
    }
  }

  setAvatar(target, url) {
    if (target === 'contact') {
      this.settings.contactAvatar = url;
      localStorage.setItem('setting_contact_avatar', url);
    } else if (target === 'sender') {
      this.settings.senderAvatar = url;
      localStorage.setItem('setting_sender_avatar', url);
    } else if (target === 'receiver') {
      this.settings.receiverAvatar = url;
      localStorage.setItem('setting_receiver_avatar', url);
    }

    this.updateAvatarPreview(target, url);
    this.updateHeaderAvatar();
    this.updatePersonaChips();

    // Preload image into renderer cache for instantaneous canvas draws
    if (url && this.renderer && this.renderer.getImage) {
      this.renderer.getImage(url);
    }

    // Clear mounted bubble nodes so voice notes re-render with new avatar
    this.mountedBubbleNodes.clear();
    if (this.messagesContainer) this.messagesContainer.innerHTML = '';

    // Refresh active messages DOM & canvas
    this.updatePreviewAtTime(this.currentTime);
  }

  renderPresetAvatarRows() {
    document.querySelectorAll('.preset-avatar-row').forEach(row => {
      const target = row.dataset.target;
      row.innerHTML = '';

      STUDIO_AVATAR_PRESETS.forEach(preset => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'preset-avatar-btn';
        btn.title = preset.name;
        btn.innerHTML = preset.svg;
        btn.addEventListener('click', () => {
          const dataUrl = getPresetDataUrl(preset);
          this.setAvatar(target, dataUrl);
          const input = document.getElementById(`${target}AvatarUrlInput`);
          if (input) input.value = '';
          row.querySelectorAll('.preset-avatar-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
        });
        row.appendChild(btn);
      });
    });
  }

  updateElevenOverrideUI(isOn) {
    const badge = document.getElementById('elevenOverrideBadge');
    const langSelect = document.getElementById('elevenLanguageSelect');
    const langCodeInput = document.getElementById('elevenLanguageCodeInput');
    if (badge) {
      if (isOn) {
        badge.innerText = '🟢 ON (Default)';
        badge.style.background = 'rgba(34, 197, 94, 0.2)';
        badge.style.color = '#4ade80';
        badge.style.borderColor = 'rgba(34, 197, 94, 0.35)';
      } else {
        badge.innerText = '⚪ OFF (Auto)';
        badge.style.background = '#1e293b';
        badge.style.color = '#94a3b8';
        badge.style.borderColor = '#334155';
      }
    }
    if (langSelect) langSelect.disabled = !isOn;
    if (langCodeInput) langCodeInput.disabled = !isOn;
  }

  updateElevenConnectionStatus() {
    const statusEl = document.getElementById('elevenConnectionStatus');
    const keyStatusEl = document.getElementById('voiceFetchStatus');
    if (!statusEl) return;

    if (this.elevenLabs.hasApiKey()) {
      const count = this.elevenLabs.getAllVoicesList().length;
      statusEl.innerText = count > 0 ? `🟢 Connected (${count} voices)` : `🟢 Connected (eleven_v4 ready)`;
      statusEl.style.color = '#4ade80';
      statusEl.style.background = 'rgba(74, 222, 128, 0.15)';
      if (keyStatusEl) {
        keyStatusEl.innerHTML = `✅ ElevenLabs key active. Using model <strong>eleven_v4</strong> (Latest Flagship).`;
        keyStatusEl.style.color = '#4ade80';
      }
    } else {
      statusEl.innerText = '⚪ No Key';
      statusEl.style.color = '#94a3b8';
      statusEl.style.background = '#1e293b';
      if (keyStatusEl) {
        keyStatusEl.innerText = 'Enter your ElevenLabs API key and click "Fetch My Voices" to load your voices.';
        keyStatusEl.style.color = 'var(--studio-muted)';
      }
    }
  }

  getVoiceName(voiceId) {
    if (!voiceId || voiceId === 'inherit') return 'Default ElevenLabs Voice';
    const elevenName = this.elevenLabs.getVoiceNameById(voiceId);
    if (elevenName) return `🌐 ${elevenName}`;
    return voiceId;
  }

  updateSelectedElevenVoiceInfo() {
    const infoEl = document.getElementById('selectedElevenVoiceInfo');
    const select = document.getElementById('elevenLabsVoiceSelect');
    if (!infoEl || !select) return;

    const voiceId = select.value;
    if (!voiceId) {
      infoEl.innerText = '';
      return;
    }
    const voice = this.elevenLabs.remoteVoices.find(v => v.id === voiceId);
    if (voice) {
      const items = [
        voice.gender && `Gender: ${voice.gender}`,
        voice.language && `Language: ${voice.language}`,
        voice.accent && `Accent: ${voice.accent}`,
        voice.rawCategory && `Type: ${voice.rawCategory}`,
        'Model: eleven_v4 ready'
      ].filter(Boolean);
      infoEl.innerText = items.join(' • ');
    } else {
      infoEl.innerText = `Voice ID: ${voiceId} • Model: eleven_v4`;
    }
  }

  populatePersonaSelects() {
    const senderSelect = document.getElementById('personaSenderVoiceSelect');
    const receiverSelect = document.getElementById('personaReceiverVoiceSelect');
    if (!senderSelect || !receiverSelect) return;

    const elevenVoices = this.elevenLabs.getAllVoicesList();
    const elevenCat = this.elevenLabs.categorizeVoices(elevenVoices);

    const fillSelect = (selectEl, currentSelectedId) => {
      selectEl.innerHTML = '';

      const addElevenGrp = (label, list) => {
        if (!list || list.length === 0) return;
        const grp = document.createElement('optgroup');
        grp.label = label;
        list.forEach(v => {
          const opt = document.createElement('option');
          opt.value = v.id;
          const details = [v.gender, v.accent || v.language].filter(Boolean).join(' • ');
          opt.innerText = `🌐 ${v.name}${details ? ` (${details})` : ''}`;
          if (v.id === currentSelectedId) opt.selected = true;
          grp.appendChild(opt);
        });
        selectEl.appendChild(grp);
      };

      addElevenGrp('🌟 My Custom & Cloned Voices', elevenCat.customVoices);
      addElevenGrp('🇮🇳 Indian Voices', elevenCat.indianVoices);
      addElevenGrp('🌍 Global Library Voices', elevenCat.globalVoices);

      if (selectEl.children.length === 0) {
        const noVoiceOpt = document.createElement('option');
        noVoiceOpt.value = '';
        noVoiceOpt.innerText = 'No voices loaded (Enter API key or Voice ID)';
        noVoiceOpt.disabled = true;
        noVoiceOpt.selected = true;
        selectEl.appendChild(noVoiceOpt);
      } else if (currentSelectedId) {
        selectEl.value = currentSelectedId;
      }
    };

    fillSelect(senderSelect, this.settings.elevenSenderVoiceId);
    fillSelect(receiverSelect, this.settings.elevenReceiverVoiceId);
  }

  populateElevenVoiceSelect(filterCategory = 'all', searchQuery = '') {
    const select = document.getElementById('elevenLabsVoiceSelect');
    if (!select) return;

    const voices = this.elevenLabs.getAllVoicesList();
    const filtered = this.elevenLabs.filterVoices(voices, filterCategory, searchQuery);
    const cat = this.elevenLabs.categorizeVoices(filtered);
    select.innerHTML = '';

    const addGrp = (label, list) => {
      if (!list || list.length === 0) return;
      const grp = document.createElement('optgroup');
      grp.label = `${label} (${list.length})`;
      list.forEach(v => {
        const opt = document.createElement('option');
        opt.value = v.id;
        const details = [v.gender, v.language || v.accent].filter(Boolean).join(' • ');
        opt.innerText = `${v.name}${details ? ` (${details})` : ''}`;
        if (v.id === this.elevenLabs.defaultVoiceId) opt.selected = true;
        grp.appendChild(opt);
      });
      select.appendChild(grp);
    };

    addGrp('🌟 My Custom & Cloned Voices', cat.customVoices);
    addGrp('🇮🇳 Indian Voices', cat.indianVoices);
    addGrp('🌍 Global Voices', cat.globalVoices);

    if (select.children.length === 0) {
      const empty = document.createElement('option');
      empty.disabled = true;
      empty.selected = true;
      empty.value = '';
      empty.innerText = voices.length === 0 ? 'No voices loaded (Enter API key to fetch voices)' : 'No matching voices found for this filter.';
      select.appendChild(empty);
    }

    this.updateSelectedElevenVoiceInfo();
  }

  async fetchAndReloadElevenVoices(silent = false) {
    const keyInput = document.getElementById('elevenLabsApiKeyInput');
    const key = (keyInput?.value || this.elevenLabs.getApiKey() || '').trim();
    const statusEl = document.getElementById('voiceFetchStatus');
    const fetchBtn = document.getElementById('fetchAllVoicesBtn');

    if (!key) {
      if (!silent && statusEl) {
        statusEl.innerText = '⚠️ Please enter your ElevenLabs API Key first.';
        statusEl.style.color = '#f87171';
      }
      return;
    }

    this.elevenLabs.setApiKey(key);
    if (fetchBtn) {
      fetchBtn.disabled = true;
      fetchBtn.innerHTML = '<span>⏳</span> Fetching...';
    }

    try {
      const [models, categorized] = await Promise.all([
        this.elevenLabs.fetchModels(),
        this.elevenLabs.fetchVoices()
      ]);

      this.updateElevenConnectionStatus();
      this.populateElevenVoiceSelect();
      this.populatePersonaSelects();
      this.renderPipelineList();

      if (statusEl) {
        statusEl.innerHTML = `✅ Loaded <strong>${categorized.allVoices.length}</strong> voices. Model <strong>eleven_v4</strong> active!`;
        statusEl.style.color = '#4ade80';
      }
    } catch (err) {
      if (!silent && statusEl) {
        statusEl.innerText = `❌ Error: ${err.message}`;
        statusEl.style.color = '#f87171';
      }
    } finally {
      if (fetchBtn) {
        fetchBtn.disabled = false;
        fetchBtn.innerHTML = '<span>🔄</span> Fetch My Voices';
      }
    }
  }

  /**
   * Open the ElevenLabs Voice Library modal
   */
  openVoiceLibraryModal() {
    const activeModel = this.settings.elevenLabsModel || 'eleven_v4';
    const targetModelSel = document.getElementById('libraryTargetModelSelect');
    if (targetModelSel) targetModelSel.value = activeModel;

    this.openModal(this.voiceLibraryModal);
    this.renderVoiceLibrary();
  }

  /**
   * Render cards in the ElevenLabs Voice Library Browser
   */
  async renderVoiceLibrary() {
    const container = document.getElementById('voiceLibraryCardsGrid');
    const countText = document.getElementById('libraryVoiceCountText');
    if (!container) return;

    const search = (document.getElementById('librarySearchInput')?.value || '').trim();
    const category = document.getElementById('libraryCategoryFilter')?.value || 'all';
    const gender = document.getElementById('libraryGenderFilter')?.value || 'all';

    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align:center; padding:2.5rem; color:var(--studio-muted);">
        <div style="font-size:1.6rem; margin-bottom:0.5rem;">⏳</div>
        <div style="font-weight:600; color:#fff;">Searching Voice Library...</div>
        <div style="font-size:0.75rem; margin-top:0.25rem;">Fetching community voices from elevenlabs.io/app/voice-library</div>
      </div>
    `;

    try {
      const voices = await this.elevenLabs.fetchSharedVoices(search, category, gender);
      container.innerHTML = '';

      if (countText) {
        countText.innerText = `Found ${voices.length} voice${voices.length === 1 ? '' : 's'} in Voice Library`;
      }

      if (voices.length === 0) {
        const hasKey = this.elevenLabs.hasApiKey();
        container.innerHTML = `
          <div style="grid-column: 1/-1; text-align:center; padding:3rem 1.5rem; color:var(--studio-muted); background:#131d2e; border-radius:8px; border:1px dashed #334155;">
            <div style="font-size:2.5rem; margin-bottom:0.75rem;">🎙️</div>
            <div style="font-weight:600; font-size:1.05rem; color:#fff; margin-bottom:0.4rem;">No voices in library</div>
            <div style="font-size:0.8rem; max-width:480px; margin:0 auto; line-height:1.5;">
              ${hasKey
                ? 'No voices matched your search query or filter. Try searching for other terms or changing the category filter.'
                : 'Connect your ElevenLabs API Key in Voice Engines to search the community voice library, or paste any Voice ID / URL above to import.'
              }
            </div>
          </div>
        `;
        return;
      }

      voices.forEach(voice => {
        const card = document.createElement('div');
        card.style.background = '#131d2e';
        card.style.border = '1px solid #1e293b';
        card.style.borderRadius = '8px';
        card.style.padding = '0.85rem 1rem';
        card.style.display = 'flex';
        card.style.flexDirection = 'column';
        card.style.gap = '0.5rem';

        const isIndian = voice.category === 'indian' || (voice.accent || '').toLowerCase().includes('india');
        const badgeColor = isIndian ? '#38bdf8' : (voice.category === 'storytelling' ? '#f59e0b' : '#a855f7');
        const badgeLabel = isIndian ? '🇮🇳 Indian' : (voice.category === 'storytelling' ? '📖 Story' : (voice.category === 'professional' ? '🌟 Pro' : '🎙️ Chat'));

        card.innerHTML = `
          <div style="display:flex; justify-content:space-between; align-items:flex-start;">
            <div>
              <div style="font-weight:700; font-size:0.95rem; color:#fff; display:flex; align-items:center; gap:0.4rem;">
                ${voice.name}
                <span style="font-size:0.68rem; font-weight:600; padding:0.12rem 0.4rem; border-radius:4px; background:${badgeColor}22; color:${badgeColor}; border:1px solid ${badgeColor}44;">
                  ${badgeLabel}
                </span>
              </div>
              <div style="font-size:0.72rem; color:var(--studio-muted); margin-top:0.15rem;">
                ${[voice.gender === 'male' ? '👨 Male' : (voice.gender === 'female' ? '👩 Female' : ''), voice.accent || voice.language].filter(Boolean).join(' • ')}
              </div>
            </div>
            <span style="font-size:0.65rem; color:#64748b; font-family:monospace; background:#0f172a; padding:0.15rem 0.35rem; border-radius:3px;">
              ${voice.voice_id ? voice.voice_id.slice(0, 8) + '...' : ''}
            </span>
          </div>

          <div style="font-size:0.74rem; color:var(--studio-text); line-height:1.4; flex:1;">
            ${voice.description || 'Expressive AI voice from ElevenLabs community library.'}
          </div>

          <div style="display:flex; gap:0.4rem; align-items:center; margin-top:0.4rem; padding-top:0.5rem; border-top:1px solid #1e293b;">
            ${voice.preview_url ? `
              <button class="btn btn-outline btn-sm preview-library-voice-btn" style="padding:0.25rem 0.6rem; font-size:0.72rem;">
                🔊 Preview
              </button>
            ` : ''}
            <button class="btn btn-primary btn-sm use-library-voice-btn" style="flex:1; padding:0.25rem 0.6rem; font-size:0.72rem; background:linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); border-color:#6366f1;">
              🎯 Use in Pipeline
            </button>
            ${voice.public_user_id ? `
              <button class="btn btn-outline btn-sm add-library-voice-btn" title="Add to your ElevenLabs account" style="padding:0.25rem 0.5rem; font-size:0.72rem;">
                ➕
              </button>
            ` : ''}
          </div>
        `;

        // Wire preview button
        const prevBtn = card.querySelector('.preview-library-voice-btn');
        if (prevBtn && voice.preview_url) {
          prevBtn.addEventListener('click', () => {
            if (prevBtn.innerText.includes('Stop')) {
              this.elevenLabs.stopVoicePreview();
              prevBtn.innerText = '🔊 Preview';
            } else {
              prevBtn.innerText = '⏳ Playing...';
              this.elevenLabs.playVoicePreview(
                voice.preview_url,
                () => { prevBtn.innerText = '⏹ Stop'; },
                () => { prevBtn.innerText = '🔊 Preview'; },
                (err) => {
                  alert(`Preview error: ${err.message}`);
                  prevBtn.innerText = '🔊 Preview';
                }
              );
            }
          });
        }

        // Wire Use in Pipeline button
        const useBtn = card.querySelector('.use-library-voice-btn');
        useBtn?.addEventListener('click', () => {
          this.elevenLabs.stopVoicePreview();
          const targetModel = document.getElementById('libraryTargetModelSelect')?.value || 'eleven_v4';
          this.settings.elevenLabsModel = targetModel;
          const modelSel = document.getElementById('elevenLabsModelSelect');
          if (modelSel) modelSel.value = targetModel;

          // Register in remote voices
          this.elevenLabs.addVoice({
            id: voice.voice_id,
            name: voice.name,
            category: voice.category || 'voice_library',
            rawCategory: 'voice_library',
            gender: voice.gender,
            accent: voice.accent,
            language: voice.language,
            description: voice.description,
            previewUrl: voice.preview_url,
            isCustom: true,
            isIndian: isIndian
          });

          this.populateElevenVoiceSelect();
          const voiceSel = document.getElementById('elevenLabsVoiceSelect');
          if (voiceSel) voiceSel.value = voice.voice_id;
          this.updateSelectedElevenVoiceInfo();

          this.populatePersonaSelects();
          this.renderPipelineList();

          // Close modal and show feedback
          this.voiceLibraryModal.classList.remove('active');
          alert(`✅ Voice "${voice.name}" (${targetModel}) selected from Voice Library!`);
        });

        // Wire Add to Account button
        const addBtn = card.querySelector('.add-library-voice-btn');
        addBtn?.addEventListener('click', async () => {
          if (!this.elevenLabs.hasApiKey()) {
            alert('Please enter your ElevenLabs API Key in the Voice Engines settings first.');
            return;
          }
          addBtn.disabled = true;
          addBtn.innerText = '...';
          try {
            await this.elevenLabs.addSharedVoiceToAccount(voice.public_user_id, voice.voice_id, voice.name);
            alert(`Voice "${voice.name}" successfully bookmarked to your ElevenLabs account!`);
            await this.fetchAndReloadElevenVoices(true);
          } catch (err) {
            alert(`Could not add voice to account: ${err.message}`);
          } finally {
            addBtn.disabled = false;
            addBtn.innerText = '➕';
          }
        });

        container.appendChild(card);
      });
    } catch (err) {
      container.innerHTML = `
        <div style="grid-column: 1/-1; text-align:center; padding:2rem; color:#f87171;">
          Error loading voices: ${err.message}
        </div>
      `;
    }
  }

  /**
   * Import voice from direct URL or ID
   */
  async importVoiceFromInput(rawInput) {
    if (!rawInput || !rawInput.trim()) {
      alert('Please paste a valid voice ID or URL from elevenlabs.io/app/voice-library');
      return;
    }

    const voiceId = this.elevenLabs.parseVoiceIdFromUrl(rawInput);
    if (!voiceId) {
      alert('Could not detect a valid Voice ID. Please check the URL or paste the 20-character voice ID.');
      return;
    }

    try {
      const details = await this.elevenLabs.fetchVoiceDetails(voiceId);
      this.elevenLabs.addVoice(details);
      this.populateElevenVoiceSelect();

      const voiceSel = document.getElementById('elevenLabsVoiceSelect');
      if (voiceSel) voiceSel.value = voiceId;
      this.updateSelectedElevenVoiceInfo();

      this.populatePersonaSelects();
      this.renderPipelineList();

      if (this.voiceLibraryModal) this.voiceLibraryModal.classList.remove('active');
      alert(`✅ Loaded voice "${details.name}" from Voice Library!`);
    } catch (err) {
      alert(`Error loading voice from library: ${err.message}`);
    }
  }

  /**
   * Get current voice settings for ElevenLabs (uses eleven_v4)
   * Includes dialogue delivery speed and language override
   */
  getElevenVoiceSettings(text = '') {
    const overrideToggle = document.getElementById('elevenLanguageOverrideToggle');
    const isOverrideOn = overrideToggle ? overrideToggle.checked : (this.settings.elevenLanguageOverride !== false);
    const langCodeInput = document.getElementById('elevenLanguageCodeInput');
    let langCode = (langCodeInput ? langCodeInput.value : this.settings.elevenLanguageCode || 'hi').trim().toLowerCase();

    // If set to auto or empty while override is on, detect from text if text is provided
    if (isOverrideOn && (langCode === 'auto' || !langCode) && text) {
      langCode = this.elevenLabs.detectLanguage(text);
    }

    const speedSlider = document.getElementById('voiceSpeedSlider');
    const speed = speedSlider ? parseFloat(speedSlider.value) : (this.settings.elevenSpeed || 1.0);

    return {
      modelId: document.getElementById('elevenLabsModelSelect')?.value || this.settings.elevenLabsModel || 'eleven_v4',
      stability: parseFloat(document.getElementById('voiceStabilitySlider')?.value || 0.5),
      similarity: parseFloat(document.getElementById('voiceSimilaritySlider')?.value || 0.75),
      style: parseFloat(document.getElementById('voiceStyleSlider')?.value || 0.0),
      speed: isNaN(speed) ? 1.0 : speed,
      languageOverride: isOverrideOn,
      languageCode: isOverrideOn ? (langCode || 'hi') : '',
      speakerBoost: document.getElementById('elevenSpeakerBoostToggle')?.checked !== false
    };
  }

  async batchGenerateAllVoices() {
    const voiceNotes = this.messages.filter(m => m.type === 'voice');
    if (voiceNotes.length === 0) {
      alert('No voice note messages found in the sequence to generate.');
      return;
    }

    const btn = document.getElementById('batchGenAllVoicesBtn');
    btn.disabled = true;
    const originalText = btn.innerHTML;

    let successCount = 0;
    let failCount = 0;

    for (let i = 0; i < voiceNotes.length; i++) {
      const msg = voiceNotes[i];
      btn.innerHTML = `<span>⏳</span> Generating ${i + 1}/${voiceNotes.length}...`;

      try {
        let voiceId = msg.voiceId;
        if (!voiceId || voiceId === 'inherit') {
          voiceId = msg.sender === 'sender' ? this.settings.elevenSenderVoiceId : this.settings.elevenReceiverVoiceId;
        }
        voiceId = voiceId || this.elevenLabs.defaultVoiceId;

        const msgElevenSettings = this.getElevenVoiceSettings(msg.text);

        if (this.elevenLabs.hasApiKey()) {
          // Use ElevenLabs with eleven_v4
          const res = await this.elevenLabs.generateSpeech(msg.text, voiceId, msgElevenSettings);
          msg.audioBlob = res.blob;
          msg.audioUrl = res.url;
          msg.audioDuration = Number(res.duration.toFixed(1));
          msg.waveform = AudioManager.extractWaveform(res.audioBuffer, 32);
        } else {
          // Fallback browser voice with speed support (strip bracket tags)
          const gender = msg.sender === 'receiver' ? 'female' : 'male';
          const speed = msgElevenSettings.speed || 1.0;
          const cleanText = msg.text.replace(/\[.*?\]/g, '').trim() || msg.text;
          const res = await AudioManager.generateBrowserVoice(cleanText, 0, gender, speed);
          msg.audioBlob = res.blob;
          msg.audioUrl = res.url;
          msg.audioDuration = Number(res.duration.toFixed(1));
          msg.waveform = AudioManager.extractWaveform(res.audioBuffer, 32);
        }
        successCount++;
      } catch (err) {
        failCount++;
        console.warn(`Error generating audio for msg ${msg.id}:`, err);
      }
    }

    btn.disabled = false;
    btn.innerHTML = originalText;
    this.renderPipelineList();
    this.restart();

    if (failCount > 0) {
      alert(`Generated ${successCount} voice note(s). ${failCount} failed — check console for details.`);
    } else {
      alert(`Successfully generated audio for ${successCount} voice note(s) using ElevenLabs (eleven_v4)!`);
    }
  }

  bindEvents() {
    // Add message buttons
    document.getElementById('addSenderTextBtn').addEventListener('click', () => {
      this.addMessage('sender', 'text');
    });
    document.getElementById('addReceiverTextBtn').addEventListener('click', () => {
      this.addMessage('receiver', 'text');
    });
    document.getElementById('addVoiceNoteBtn').addEventListener('click', () => {
      this.addMessage('receiver', 'voice');
    });

    // Playback buttons
    this.playPauseBtn.addEventListener('click', () => this.togglePlay());
    this.restartBtn.addEventListener('click', () => this.restart());

    // Scrubber
    this.scrubber.addEventListener('input', (e) => {
      const targetPercent = parseFloat(e.target.value);
      const totalDur = this.getTotalDuration();
      this.currentTime = (targetPercent / 100) * totalDur;
      this.updatePreviewAtTime(this.currentTime);
    });

    this.playbackSpeedSelect.addEventListener('change', (e) => {
      this.playbackSpeed = parseFloat(e.target.value);
    });

    // Theme toggle
    this.themeToggleBtn.addEventListener('click', () => {
      this.settings.theme = this.settings.theme === 'light' ? 'dark' : 'light';
      document.body.className = `theme-${this.settings.theme}`;
      document.getElementById('themeIcon').innerText = this.settings.theme === 'light' ? '🌙' : '☀️';
      this.updateAppearanceUI();
      this.updatePreviewAtTime(this.currentTime);
    });

    // Phone frame toggle
    const updateFrameBtnUI = () => {
      if (this.settings.showPhoneFrame) {
        this.frameToggleBtn.innerHTML = '<span>📱</span> Phone Frame: ON';
        this.frameToggleBtn.style.color = '#22c55e';
      } else {
        this.frameToggleBtn.innerHTML = '<span>📱</span> Phone Frame: OFF';
        this.frameToggleBtn.style.color = 'inherit';
      }
    };
    updateFrameBtnUI();

    this.frameToggleBtn.addEventListener('click', () => {
      this.settings.showPhoneFrame = !this.settings.showPhoneFrame;
      this.phoneMockup.classList.toggle('frameless-mode', !this.settings.showPhoneFrame);
      updateFrameBtnUI();
    });

    // Open Modals
    const handleOpenExport = () => {
      const frameSel = document.getElementById('exportPhoneFrameSelect');
      if (frameSel) {
        frameSel.value = this.settings.showPhoneFrame ? 'true' : 'false';
      }
      this.openModal(this.exportModal);
    };
    document.getElementById('openExportModalBtn').addEventListener('click', handleOpenExport);
    const expFromPreview = document.getElementById('exportFromPreviewBtn');
    if (expFromPreview) {
      expFromPreview.addEventListener('click', handleOpenExport);
    }
    document.getElementById('openAppearanceBtn').addEventListener('click', () => {
      this.openModal(this.appearanceModal);
    });
    document.getElementById('openVoiceSettingsBtn').addEventListener('click', () => {
      this.openModal(this.voiceSettingsModal);
    });
    document.getElementById('openSheetsModalBtn').addEventListener('click', () => {
      this.renderSheetsTable();
      this.openModal(this.sheetsModal);
    });
    document.getElementById('openTemplatesBtn').addEventListener('click', () => {
      this.openModal(this.templatesModal);
    });

    // Close Modal buttons
    document.querySelectorAll('.close-modal-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
      });
    });

    // Appearance Modal Inputs
    document.getElementById('settingContactName').addEventListener('input', (e) => {
      this.settings.contactName = e.target.value;
      this.headerContactName.innerText = e.target.value;
      this.updateHeaderAvatar();
      this.updatePersonaChips();
    });

    // Avatars & Profile Photos event bindings
    const bindAvatarControls = (target) => {
      const cap = target.charAt(0).toUpperCase() + target.slice(1);
      const uploadInput = document.getElementById(`upload${cap}AvatarInput`);
      const urlInput = document.getElementById(`${target}AvatarUrlInput`);
      const removeBtn = document.getElementById(`remove${cap}AvatarBtn`);

      if (uploadInput) {
        uploadInput.addEventListener('change', async (e) => {
          const file = e.target.files[0];
          if (!file) return;
          try {
            const dataUrl = await resizeImageFile(file, 256, 0.85);
            this.setAvatar(target, dataUrl);
            if (urlInput) urlInput.value = '';
          } catch (err) {
            alert(`Image error: ${err.message}`);
          }
          uploadInput.value = '';
        });
      }

      if (urlInput) {
        urlInput.addEventListener('input', (e) => {
          const val = e.target.value.trim();
          this.setAvatar(target, val);
        });
      }

      if (removeBtn) {
        removeBtn.addEventListener('click', () => {
          this.setAvatar(target, '');
          if (urlInput) urlInput.value = '';
          const row = document.querySelector(`.preset-avatar-row[data-target="${target}"]`);
          if (row) row.querySelectorAll('.preset-avatar-btn').forEach(b => b.classList.remove('active'));
        });
      }
    };

    bindAvatarControls('contact');
    bindAvatarControls('sender');
    bindAvatarControls('receiver');

    // Sync Receiver with Contact Photo button
    const syncBtn = document.getElementById('syncReceiverWithContactBtn');
    if (syncBtn) {
      syncBtn.addEventListener('click', () => {
        const photo = this.settings.contactAvatar;
        this.setAvatar('receiver', photo);
        const recUrlInput = document.getElementById('receiverAvatarUrlInput');
        if (recUrlInput) recUrlInput.value = photo;
      });
    }

    // Persona bar quick triggers
    document.getElementById('openSenderPhotoBtn')?.addEventListener('click', () => {
      this.openModal(this.appearanceModal);
    });
    document.getElementById('openReceiverPhotoBtn')?.addEventListener('click', () => {
      this.openModal(this.appearanceModal);
    });
    document.getElementById('personaSenderAvatarChip')?.addEventListener('click', () => {
      this.openModal(this.appearanceModal);
    });
    document.getElementById('personaReceiverAvatarChip')?.addEventListener('click', () => {
      this.openModal(this.appearanceModal);
    });
    this.headerAvatar?.addEventListener('click', () => {
      this.openModal(this.appearanceModal);
    });

    // Persona bar navigation tabs and smooth horizontal scroll sync
    const personasScroll = document.getElementById('personasScrollContainer');
    const senderSlot = document.getElementById('personaSlotSender');
    const receiverSlot = document.getElementById('personaSlotReceiver');
    const tabSender = document.getElementById('tabSenderPersona');
    const tabReceiver = document.getElementById('tabReceiverPersona');

    tabSender?.addEventListener('click', () => {
      personasScroll?.scrollTo({ left: 0, behavior: 'smooth' });
      tabSender.classList.add('active');
      tabReceiver?.classList.remove('active');
    });

    tabReceiver?.addEventListener('click', () => {
      if (receiverSlot && personasScroll) {
        const offset = receiverSlot.offsetLeft - personasScroll.offsetLeft;
        personasScroll.scrollTo({ left: Math.max(0, offset), behavior: 'smooth' });
        tabReceiver.classList.add('active');
        tabSender?.classList.remove('active');
      }
    });

    personasScroll?.addEventListener('scroll', () => {
      if (!receiverSlot || !personasScroll) return;
      const scrollPos = personasScroll.scrollLeft;
      const targetPos = receiverSlot.offsetLeft - personasScroll.offsetLeft;
      if (scrollPos >= targetPos / 2) {
        tabReceiver?.classList.add('active');
        tabSender?.classList.remove('active');
      } else {
        tabSender?.classList.add('active');
        tabReceiver?.classList.remove('active');
      }
    }, { passive: true });

    // Save Appearance Button
    document.getElementById('saveAppearanceBtn')?.addEventListener('click', () => {
      localStorage.setItem('setting_contact_name', this.settings.contactName);
      localStorage.setItem('setting_contact_avatar', this.settings.contactAvatar || '');
      localStorage.setItem('setting_sender_avatar', this.settings.senderAvatar || '');
      localStorage.setItem('setting_receiver_avatar', this.settings.receiverAvatar || '');
      localStorage.setItem('setting_sender_color', this.settings.senderBubbleColor);
      localStorage.setItem('setting_receiver_color', this.settings.receiverBubbleColor);
      localStorage.setItem('setting_background_type', this.settings.backgroundType);
      this.updateHeaderAvatar();
      this.updatePersonaChips();
      this.updatePreviewAtTime(this.currentTime);
      this.closeModal(this.appearanceModal);
    });

    document.getElementById('settingPhoneTime').addEventListener('input', (e) => {
      this.settings.phoneTime = e.target.value;
      this.statusBarClock.innerText = e.target.value;
    });

    const senderColorPicker = document.getElementById('settingSenderColor');
    const senderColorHex = document.getElementById('settingSenderColorHex');
    senderColorPicker.addEventListener('input', (e) => {
      this.settings.senderBubbleColor = e.target.value;
      senderColorHex.value = e.target.value;
      document.documentElement.style.setProperty('--wa-light-sender', e.target.value);
    });
    senderColorHex.addEventListener('input', (e) => {
      this.settings.senderBubbleColor = e.target.value;
      senderColorPicker.value = e.target.value;
      document.documentElement.style.setProperty('--wa-light-sender', e.target.value);
    });

    const receiverColorPicker = document.getElementById('settingReceiverColor');
    const receiverColorHex = document.getElementById('settingReceiverColorHex');
    receiverColorPicker.addEventListener('input', (e) => {
      this.settings.receiverBubbleColor = e.target.value;
      receiverColorHex.value = e.target.value;
      document.documentElement.style.setProperty('--wa-light-receiver', e.target.value);
    });
    receiverColorHex.addEventListener('input', (e) => {
      this.settings.receiverBubbleColor = e.target.value;
      receiverColorPicker.value = e.target.value;
      document.documentElement.style.setProperty('--wa-light-receiver', e.target.value);
    });

    document.getElementById('settingBackgroundType').addEventListener('change', (e) => {
      this.settings.backgroundType = e.target.value;
      this.updateBackgroundType();
    });

    document.getElementById('settingPhoneMockupToggle').addEventListener('change', (e) => {
      this.settings.showPhoneFrame = e.target.value === 'true';
      this.phoneMockup.classList.toggle('frameless-mode', !this.settings.showPhoneFrame);
    });

    document.getElementById('settingSfxToggle').addEventListener('change', (e) => {
      this.settings.sfxEnabled = e.target.value === 'true';
    });

    // Voiceover Personas & Batch Generation
    const senderVoiceSel = document.getElementById('personaSenderVoiceSelect');
    if (senderVoiceSel) {
      senderVoiceSel.addEventListener('change', (e) => {
        this.settings.elevenSenderVoiceId = e.target.value;
        localStorage.setItem('default_eleven_sender_voice', e.target.value);
        this.renderPipelineList();
      });
    }

    const receiverVoiceSel = document.getElementById('personaReceiverVoiceSelect');
    if (receiverVoiceSel) {
      receiverVoiceSel.addEventListener('change', (e) => {
        this.settings.elevenReceiverVoiceId = e.target.value;
        localStorage.setItem('default_eleven_receiver_voice', e.target.value);
        this.renderPipelineList();
      });
    }

    const batchGenBtn = document.getElementById('batchGenAllVoicesBtn');
    if (batchGenBtn) {
      batchGenBtn.addEventListener('click', () => {
        this.batchGenerateAllVoices();
      });
    }

    // Speech Delivery Speed Slider & Presets
    const speedSlider = document.getElementById('voiceSpeedSlider');
    const speedLabel = document.getElementById('speedValueLabel');
    const updateSpeedUI = (val) => {
      const num = parseFloat(val);
      const speed = Math.max(0.7, Math.min(1.2, isNaN(num) ? 1.0 : num));
      if (speedSlider) speedSlider.value = speed;
      if (speedLabel) {
        speedLabel.innerText = `${speed.toFixed(2)}x ${speed === 1.0 ? '(Normal)' : ''}`;
      }
      document.querySelectorAll('.speed-preset-btn').forEach(btn => {
        btn.classList.toggle('active', parseFloat(btn.dataset.speed) === Number(speed.toFixed(2)));
      });
      this.settings.elevenSpeed = speed;
      this.elevenLabs.defaultSpeed = speed;
      localStorage.setItem('eleven_voice_speed', speed.toString());
    };

    speedSlider?.addEventListener('input', (e) => {
      updateSpeedUI(e.target.value);
    });

    document.querySelectorAll('.speed-preset-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const preset = parseFloat(e.currentTarget.dataset.speed);
        if (!isNaN(preset)) {
          updateSpeedUI(preset);
        }
      });
    });

    // ElevenLabs Controls
    document.getElementById('fetchAllVoicesBtn')?.addEventListener('click', () => {
      this.fetchAndReloadElevenVoices();
    });

    // Open Voice Library Modal
    document.getElementById('openVoiceLibraryModalBtn')?.addEventListener('click', () => {
      this.openVoiceLibraryModal();
    });

    // Direct Voice Library Import from settings panel
    document.getElementById('importVoiceLibraryBtn')?.addEventListener('click', () => {
      const input = document.getElementById('voiceLibraryUrlInput')?.value;
      this.importVoiceFromInput(input);
    });

    // Direct Voice Library Import from inside Voice Library modal
    document.getElementById('libraryModalDirectImportBtn')?.addEventListener('click', () => {
      const input = document.getElementById('libraryModalDirectUrlInput')?.value;
      this.importVoiceFromInput(input);
    });

    // Voice Library Modal Search & Filters
    let librarySearchDebounceTimer = null;
    document.getElementById('librarySearchInput')?.addEventListener('input', () => {
      clearTimeout(librarySearchDebounceTimer);
      librarySearchDebounceTimer = setTimeout(() => {
        this.renderVoiceLibrary();
      }, 300);
    });

    document.getElementById('libraryCategoryFilter')?.addEventListener('change', () => {
      this.renderVoiceLibrary();
    });

    document.getElementById('libraryGenderFilter')?.addEventListener('change', () => {
      this.renderVoiceLibrary();
    });

    document.getElementById('libraryRefreshSearchBtn')?.addEventListener('click', () => {
      this.renderVoiceLibrary();
    });

    // Model selection sync between panels
    document.getElementById('elevenLabsModelSelect')?.addEventListener('change', (e) => {
      this.settings.elevenLabsModel = e.target.value;
      const libModel = document.getElementById('libraryTargetModelSelect');
      if (libModel) libModel.value = e.target.value;
      const badge = document.getElementById('libraryActiveModelBadge');
      if (badge) badge.innerText = e.target.value;
    });

    document.getElementById('libraryTargetModelSelect')?.addEventListener('change', (e) => {
      this.settings.elevenLabsModel = e.target.value;
      const sel = document.getElementById('elevenLabsModelSelect');
      if (sel) sel.value = e.target.value;
      const badge = document.getElementById('libraryActiveModelBadge');
      if (badge) badge.innerText = e.target.value;
    });

    document.getElementById('elevenCategoryFilter')?.addEventListener('change', (e) => {
      const search = document.getElementById('elevenSearchInput')?.value || '';
      this.populateElevenVoiceSelect(e.target.value, search);
    });

    document.getElementById('elevenSearchInput')?.addEventListener('input', (e) => {
      const category = document.getElementById('elevenCategoryFilter')?.value || 'all';
      this.populateElevenVoiceSelect(category, e.target.value);
    });

    document.getElementById('elevenLabsVoiceSelect')?.addEventListener('change', () => {
      this.updateSelectedElevenVoiceInfo();
    });

    document.getElementById('previewElevenVoiceBtn')?.addEventListener('click', () => {
      const select = document.getElementById('elevenLabsVoiceSelect');
      const voiceId = select?.value;
      if (!voiceId) return;
      const previewBtn = document.getElementById('previewElevenVoiceBtn');
      if (previewBtn) previewBtn.innerText = '⏳ Playing...';
      this.elevenLabs.playVoicePreview(
        voiceId,
        () => { if (previewBtn) previewBtn.innerText = '🔊 Playing'; },
        () => { if (previewBtn) previewBtn.innerText = '🔊 Preview'; },
        (err) => {
          alert(`Preview error: ${err.message}`);
          if (previewBtn) previewBtn.innerText = '🔊 Preview';
        }
      );
    });

    document.getElementById('stopElevenPreviewBtn')?.addEventListener('click', () => {
      this.elevenLabs.stopVoicePreview();
      const previewBtn = document.getElementById('previewElevenVoiceBtn');
      if (previewBtn) previewBtn.innerText = '🔊 Preview';
    });

    // ElevenLabs Slider value labels
    document.getElementById('voiceStabilitySlider')?.addEventListener('input', (e) => {
      const label = document.getElementById('stabilityValueLabel');
      if (label) label.innerText = parseFloat(e.target.value).toFixed(2);
    });

    document.getElementById('voiceSimilaritySlider')?.addEventListener('input', (e) => {
      const label = document.getElementById('similarityValueLabel');
      if (label) label.innerText = parseFloat(e.target.value).toFixed(2);
    });

    document.getElementById('voiceStyleSlider')?.addEventListener('input', (e) => {
      const label = document.getElementById('styleValueLabel');
      if (label) label.innerText = parseFloat(e.target.value).toFixed(2);
    });

    // ElevenLabs Language Override toggle & select listeners
    const elevenOverrideToggle = document.getElementById('elevenLanguageOverrideToggle');
    elevenOverrideToggle?.addEventListener('change', (e) => {
      const isOn = e.target.checked;
      this.settings.elevenLanguageOverride = isOn;
      this.elevenLabs.defaultLanguageOverride = isOn;
      localStorage.setItem('eleven_language_override', isOn ? 'true' : 'false');
      this.updateElevenOverrideUI(isOn);
    });

    const elevenLangSelect = document.getElementById('elevenLanguageSelect');
    const elevenLangCodeInput = document.getElementById('elevenLanguageCodeInput');
    elevenLangSelect?.addEventListener('change', (e) => {
      const val = e.target.value;
      if (val !== 'custom') {
        if (elevenLangCodeInput) {
          elevenLangCodeInput.value = val;
        }
        this.settings.elevenLanguageCode = val;
        this.elevenLabs.defaultLanguageCode = val;
        localStorage.setItem('eleven_language_code', val);
      } else {
        elevenLangCodeInput?.focus();
      }
    });

    elevenLangCodeInput?.addEventListener('input', (e) => {
      const val = e.target.value.trim().toLowerCase();
      this.settings.elevenLanguageCode = val;
      this.elevenLabs.defaultLanguageCode = val;
      localStorage.setItem('eleven_language_code', val);
      if (elevenLangSelect) {
        const match = Array.from(elevenLangSelect.options).find(opt => opt.value === val);
        elevenLangSelect.value = match ? val : 'custom';
      }
    });

    // Save Voice Settings (ElevenLabs v3)
    document.getElementById('saveVoiceSettingsBtn')?.addEventListener('click', () => {
      // 1. ElevenLabs API Key
      const elevenKey = (document.getElementById('elevenLabsApiKeyInput')?.value || '').trim();
      this.elevenLabs.setApiKey(elevenKey);
      this.updateElevenConnectionStatus();

      const selectedElevenModel = document.getElementById('elevenLabsModelSelect')?.value;
      if (selectedElevenModel) {
        this.settings.elevenLabsModel = selectedElevenModel;
      }

      const customVoice = (document.getElementById('customVoiceIdInput')?.value || '').trim();
      const selectedElevenVoice = customVoice || document.getElementById('elevenLabsVoiceSelect')?.value;
      if (selectedElevenVoice) {
        this.elevenLabs.defaultVoiceId = selectedElevenVoice;
      }

      // 2. Speech Delivery Speed
      const speed = parseFloat(document.getElementById('voiceSpeedSlider')?.value || 1.0);
      this.settings.elevenSpeed = speed;
      this.elevenLabs.defaultSpeed = speed;
      localStorage.setItem('eleven_voice_speed', speed.toString());

      // 3. Save ElevenLabs Language Override & code
      const isOverride = document.getElementById('elevenLanguageOverrideToggle')?.checked !== false;
      const langCode = (document.getElementById('elevenLanguageCodeInput')?.value || 'hi').trim().toLowerCase();
      this.settings.elevenLanguageOverride = isOverride;
      this.settings.elevenLanguageCode = langCode;
      this.elevenLabs.defaultLanguageOverride = isOverride;
      this.elevenLabs.defaultLanguageCode = langCode;
      localStorage.setItem('eleven_language_override', isOverride ? 'true' : 'false');
      localStorage.setItem('eleven_language_code', langCode);

      this.populatePersonaSelects();
      this.renderPipelineList();
      alert('ElevenLabs (eleven_v4) settings saved & applied to pipeline!');
    });

    // Test ElevenLabs (v4) Voice Button
    document.getElementById('testElevenVoiceBtn')?.addEventListener('click', async () => {
      const key = (document.getElementById('elevenLabsApiKeyInput')?.value || this.elevenLabs.getApiKey() || '').trim();
      const testBtn = document.getElementById('testElevenVoiceBtn');

      try {
        testBtn.disabled = true;
        testBtn.innerText = '⏳ Synthesizing (eleven_v4)...';

        const customVoiceId = (document.getElementById('customVoiceIdInput')?.value || '').trim();
        const voiceId = customVoiceId || document.getElementById('elevenLabsVoiceSelect')?.value || this.elevenLabs.defaultVoiceId;
        const testText = 'Hello! Testing ElevenLabs flagship model eleven_v4 with expressive audio tags for our WhatsApp animation pipeline.';
        const voiceSettings = this.getElevenVoiceSettings(testText);

        if (key) {
          this.elevenLabs.setApiKey(key);
          const result = await this.elevenLabs.generateSpeech(
            testText,
            voiceId,
            voiceSettings
          );
          const audio = new Audio(result.url);
          audio.play();
        } else {
          const result = await AudioManager.generateBrowserVoice(testText, 0, 'female', voiceSettings.speed || 1.0);
          if (result.speakNative) result.speakNative();
          const audio = new Audio(result.url);
          audio.play();
        }
      } catch (err) {
        alert(`ElevenLabs error: ${err.message}`);
      } finally {
        testBtn.disabled = false;
        testBtn.innerText = '🔊 Test ElevenLabs (v3)';
      }
    });

    // Sheets CSV Export & Import
    document.getElementById('downloadCsvBtn').addEventListener('click', () => {
      SheetsManager.downloadCSV(this.messages, 'whatsapp_dialogue.csv');
    });

    document.getElementById('importCsvInput').addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (evt) => {
        try {
          const parsed = SheetsManager.parseCSV(evt.target.result);
          if (parsed && parsed.length > 0) {
            this.messages = parsed;
            this.renderPipelineList();
            this.renderSheetsTable();
            this.restart();
            alert(`Imported ${parsed.length} messages from CSV!`);
          } else {
            alert('No valid messages found in CSV file.');
          }
        } catch (err) {
          alert(`CSV Parse Error: ${err.message}`);
        }
      };
      reader.readAsText(file);
    });

    document.getElementById('addSheetRowBtn').addEventListener('click', () => {
      this.messages.push({
        id: `msg_${Date.now()}`,
        sender: 'sender',
        type: 'text',
        text: 'New message',
        time: '10:46 AM',
        status: 'read',
        delay: 0.2,
        audioDuration: 0,
        waveform: []
      });
      this.renderSheetsTable();
    });

    document.getElementById('applySheetChangesBtn').addEventListener('click', () => {
      this.collectSheetTableChanges();
      this.renderPipelineList();
      this.restart();
      this.closeModals();
    });

    // Templates selection
    document.querySelectorAll('.preset-card').forEach(card => {
      card.addEventListener('click', () => {
        const type = card.getAttribute('data-template');
        this.loadTemplate(type);
        this.closeModals();
      });
    });

    // Export execution
    document.getElementById('startExportBtn').addEventListener('click', () => {
      this.runExport();
    });
    document.getElementById('cancelExportBtn').addEventListener('click', () => {
      this.renderer.cancelExport();
      document.getElementById('exportProgressBox').style.display = 'none';
      document.getElementById('startExportBtn').disabled = false;
    });
  }

  openModal(modalEl) {
    modalEl.classList.add('active');
  }

  closeModals() {
    document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
  }

  updateAppearanceUI() {
    this.phoneScreen.style.backgroundColor = this.settings.theme === 'dark' ? '#0b141a' : '#efeae2';
    this.updateBackgroundType();
  }

  updateBackgroundType() {
    const bgType = this.settings.backgroundType;
    const wallpaper = document.getElementById('waWallpaper');
    if (bgType === 'transparent') {
      wallpaper.style.display = 'none';
      this.phoneScreen.style.backgroundColor = 'transparent';
      this.phoneMockup.style.background = 'transparent';
      this.phoneMockup.style.boxShadow = 'none';
    } else if (bgType === 'green_screen') {
      wallpaper.style.display = 'none';
      this.phoneScreen.style.backgroundColor = '#00FF00';
    } else {
      wallpaper.style.display = 'block';
      this.phoneScreen.style.backgroundColor = this.settings.theme === 'dark' ? '#0b141a' : '#efeae2';
    }
  }

  addMessage(sender = 'sender', type = 'text') {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMessage = {
      id: `msg_${Date.now()}`,
      sender: sender,
      type: type,
      text: type === 'voice' ? 'Hey, check out this voice message!' : 'Hello there!',
      time: timeString,
      status: 'read',
      delay: 0.2,
      audioDuration: type === 'voice' ? 3.5 : 0,
      waveform: type === 'voice' ? AudioManager.generateRealisticWaveform(32) : []
    };
    this.messages.push(newMessage);
    this.renderPipelineList();
    this.updatePreviewAtTime(this.currentTime);

    // Scroll pipeline list to bottom
    this.pipelineListEl.scrollTop = this.pipelineListEl.scrollHeight;
  }

  renderPipelineList() {
    this.pipelineListEl.innerHTML = '';
    this.msgCountBadge.innerText = `${this.messages.length} Message${this.messages.length === 1 ? '' : 's'}`;

    this.messages.forEach((msg, idx) => {
      const card = document.createElement('div');
      card.className = `msg-card sender-${msg.sender}`;

      card.innerHTML = `
        <div class="msg-card-header">
          <div class="msg-header-left">
            <span class="msg-index-chip">#${idx + 1}</span>
            <span class="sender-badge ${msg.sender}">${msg.sender === 'sender' ? '🟢 Sender (Me)' : '🔵 Receiver (Them)'}</span>
            <span class="type-pill">${msg.type === 'voice' ? '🎙️ Voice Note' : '💬 Text'}</span>
          </div>
          <div class="card-order-actions">
            <button title="Move Up" class="card-btn-action move-up-btn" ${idx === 0 ? 'disabled style="opacity:0.25; cursor:not-allowed;"' : ''}>▲</button>
            <button title="Move Down" class="card-btn-action move-down-btn" ${idx === this.messages.length - 1 ? 'disabled style="opacity:0.25; cursor:not-allowed;"' : ''}>▼</button>
            <button title="Duplicate" class="card-btn-action dup-btn">📋</button>
            <button title="Delete" class="card-btn-action del-btn del-danger">✕</button>
          </div>
        </div>

        <div class="msg-card-subbar">
          <span class="card-field-title">${msg.type === 'voice' ? '🎙️ Audio Transcript / Prompt (v4)' : '💬 Message Content'}</span>
          <div class="card-toggles-group">
            <button type="button" class="card-toggle-pill toggle-sender-btn" title="Switch side between Sender and Receiver">
              ⇄ Switch Side
            </button>
            <button type="button" class="card-toggle-pill toggle-type-btn" title="Convert between Text and Voice note">
              ${msg.type === 'voice' ? '💬 To Text' : '🎙️ To Voice'}
            </button>
          </div>
        </div>

        <div class="msg-card-body">
          <!-- Expressive Audio Tags quick bar right above audio transcript textarea -->
          <div class="card-audio-tags-row">
            <span class="card-tags-label" title="Insert expressive audio tags for ElevenLabs v4">🏷️ Tags:</span>
            <div class="card-tags-scroll">
              <button type="button" class="card-tag-btn" data-tag="[whispering]" title="Insert whispering style">🤫 whisper</button>
              <button type="button" class="card-tag-btn" data-tag="[shouting]" title="Insert shouting style">📢 shout</button>
              <button type="button" class="card-tag-btn" data-tag="[laughing]" title="Insert laughing">😂 laugh</button>
              <button type="button" class="card-tag-btn" data-tag="[sighs]" title="Insert sighs">😮‍💨 sighs</button>
              <button type="button" class="card-tag-btn" data-tag="[gasping]" title="Insert gasping">😱 gasp</button>
              <button type="button" class="card-tag-btn" data-tag="[excited]" title="Insert excited tone">🤩 excited</button>
              <button type="button" class="card-tag-btn" data-tag="[angry]" title="Insert angry tone">😡 angry</button>
              <button type="button" class="card-tag-btn" data-tag="[crying]" title="Insert crying tone">😢 cry</button>
              <button type="button" class="card-tag-btn" data-tag="[pause]" title="Insert audio pause">⏸️ pause</button>
            </div>
            <button type="button" class="card-tag-btn tag-more" title="More expressive tags">+ More ▾</button>
          </div>

          <textarea class="msg-textarea" placeholder="${msg.type === 'voice' ? 'Type voice transcript or prompt with [tags]...' : 'Type message text...'}">${msg.text}</textarea>

          ${msg.type === 'voice' ? `
            <div class="voice-actions-box">
              <div class="voice-status-row">
                <div class="voice-duration-pill">
                  <span>⏱️</span>
                  <span>Duration: <strong>${AudioManager.formatDuration(msg.audioDuration)}</strong></span>
                </div>
                <span class="voice-ready-badge ${msg.audioBlob ? 'ready' : 'synthetic'}">
                  ${msg.audioBlob ? '✅ Audio Ready' : '⚡ Synthetic Wave'}
                </span>
              </div>
              <div class="voice-selector-row">
                <label class="voice-selector-label">Voice:</label>
                <select class="card-voice-select form-control-compact">
                  <!-- dynamically filled with ElevenLabs voices -->
                </select>
              </div>
              <div class="voice-btn-grid">
                <button class="btn btn-primary btn-sm gen-eleven-btn" title="Synthesize using ElevenLabs eleven_v4">
                  <span>✨</span> ElevenLabs (v4)
                </button>
                <div class="voice-aux-btns">
                  <button class="btn btn-secondary btn-sm gen-browser-btn" title="Offline synthetic voice">
                    <span>🗣️</span> Browser
                  </button>
                  <label class="btn btn-outline btn-sm upload-audio-btn" title="Upload custom audio file">
                    <span>📁</span> Upload
                    <input type="file" class="upload-audio-input" accept="audio/*" style="display:none;">
                  </label>
                  <button class="btn btn-outline btn-sm play-audio-preview-btn" title="Preview audio">
                    ▶ Preview
                  </button>
                </div>
              </div>
            </div>
          ` : ''}
        </div>

        <div class="msg-card-footer">
          <div class="card-footer-col">
            <label class="footer-label">Timestamp</label>
            <input type="text" class="msg-time-input footer-input" value="${msg.time}" placeholder="10:42 AM">
          </div>
          <div class="card-footer-col">
            <label class="footer-label">Delay (s)</label>
            <input type="number" step="0.1" min="0" max="10" class="msg-delay-input footer-input" value="${msg.delay !== undefined ? msg.delay : 0.2}">
          </div>
          <div class="card-footer-col status-col">
            <label class="footer-label">Status Ticks</label>
            <select class="msg-status-select footer-select">
              <option value="sent" ${msg.status === 'sent' ? 'selected' : ''}>✓ Sent (Single)</option>
              <option value="delivered" ${msg.status === 'delivered' ? 'selected' : ''}>✓✓ Delivered (Grey)</option>
              <option value="read" ${msg.status === 'read' ? 'selected' : ''}>✓✓ Read (Blue)</option>
            </select>
          </div>
        </div>
      `;

      // Event bindings for this card
      const textarea = card.querySelector('.msg-textarea');
      textarea.addEventListener('input', (e) => {
        msg.text = e.target.value;
        this.updatePreviewAtTime(this.currentTime);
      });

      // Expressive Audio Tag buttons insertion for this card
      card.querySelectorAll('.card-tag-btn:not(.tag-more)').forEach(tagBtn => {
        tagBtn.addEventListener('click', (e) => {
          e.preventDefault();
          this.insertAudioTag(textarea, tagBtn.dataset.tag, msg);
        });
      });

      const moreTagsBtn = card.querySelector('.tag-more');
      if (moreTagsBtn) {
        moreTagsBtn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.openMoreAudioTagsMenu(textarea, msg, moreTagsBtn);
        });
      }

      card.querySelector('.msg-time-input').addEventListener('input', (e) => {
        msg.time = e.target.value;
        this.updatePreviewAtTime(this.currentTime);
      });

      card.querySelector('.msg-status-select').addEventListener('change', (e) => {
        msg.status = e.target.value;
        this.updatePreviewAtTime(this.currentTime);
      });

      card.querySelector('.msg-delay-input').addEventListener('input', (e) => {
        const dVal = parseFloat(e.target.value);
        msg.delay = isNaN(dVal) ? 0.2 : dVal;
        this.updateTimelineBounds();
      });

      card.querySelector('.toggle-sender-btn').addEventListener('click', () => {
        msg.sender = msg.sender === 'sender' ? 'receiver' : 'sender';
        this.renderPipelineList();
        this.updatePreviewAtTime(this.currentTime);
      });

      card.querySelector('.toggle-type-btn').addEventListener('click', () => {
        msg.type = msg.type === 'voice' ? 'text' : 'voice';
        if (msg.type === 'voice' && !msg.waveform.length) {
          msg.audioDuration = 3.5;
          msg.waveform = AudioManager.generateRealisticWaveform(32);
        }
        this.renderPipelineList();
        this.updatePreviewAtTime(this.currentTime);
      });

      card.querySelector('.move-up-btn')?.addEventListener('click', () => {
        if (idx > 0) {
          const temp = this.messages[idx];
          this.messages[idx] = this.messages[idx - 1];
          this.messages[idx - 1] = temp;
          this.renderPipelineList();
          this.restart();
        }
      });

      card.querySelector('.move-down-btn')?.addEventListener('click', () => {
        if (idx < this.messages.length - 1) {
          const temp = this.messages[idx];
          this.messages[idx] = this.messages[idx + 1];
          this.messages[idx + 1] = temp;
          this.renderPipelineList();
          this.restart();
        }
      });

      card.querySelector('.dup-btn').addEventListener('click', () => {
        const copy = JSON.parse(JSON.stringify(msg));
        copy.id = `msg_${Date.now()}`;
        this.messages.splice(idx + 1, 0, copy);
        this.renderPipelineList();
        this.restart();
      });

      card.querySelector('.del-btn').addEventListener('click', () => {
        if (this.messages.length <= 1) {
          alert('You must have at least one message in the sequence.');
          return;
        }
        this.messages.splice(idx, 1);
        this.renderPipelineList();
        this.restart();
      });

      // Voice actions
      if (msg.type === 'voice') {
        const cardVoiceSelect = card.querySelector('.card-voice-select');
        if (cardVoiceSelect) {
          cardVoiceSelect.innerHTML = '';
          const elevenVoices = this.elevenLabs.getAllVoicesList();
          const elevenCat = this.elevenLabs.categorizeVoices(elevenVoices);

          const isSender = msg.sender === 'sender';
          const defaultId = isSender ? this.settings.senderVoiceId : this.settings.receiverVoiceId;
          const defaultName = this.getVoiceName(defaultId);

          // Top default option inheriting the role persona voice
          const defaultOpt = document.createElement('option');
          defaultOpt.value = 'inherit';
          defaultOpt.innerText = isSender
            ? `🟢 Inherit Sender Voice (${defaultName})`
            : `🔵 Inherit Receiver Voice (${defaultName})`;
          if (!msg.voiceId || msg.voiceId === 'inherit') {
            defaultOpt.selected = true;
          }
          cardVoiceSelect.appendChild(defaultOpt);

          const appendGroup = (label, list, idKey = 'id', nameFn = s => `${s.name} — ${s.tag}`) => {
            if (!list || list.length === 0) return;
            const grp = document.createElement('optgroup');
            grp.label = label;
            list.forEach(item => {
              const opt = document.createElement('option');
              opt.value = item[idKey];
              opt.innerText = nameFn(item);
              if (msg.voiceId && item[idKey] === msg.voiceId && msg.voiceId !== 'inherit') {
                opt.selected = true;
              }
              grp.appendChild(opt);
            });
            cardVoiceSelect.appendChild(grp);
          };

          if (elevenVoices.length > 0) {
            appendGroup('🌟 ElevenLabs: Custom / Cloned', elevenCat.customVoices, 'id', v => `🌐 ${v.name} (${[v.gender, v.accent || v.language].filter(Boolean).join(' • ')})`);
            appendGroup('🇮🇳 ElevenLabs: Indian Voices', elevenCat.indianVoices, 'id', v => `🌐 ${v.name} (${[v.gender, v.accent || v.language].filter(Boolean).join(' • ')})`);
            appendGroup('🌍 ElevenLabs: Global Voices', elevenCat.globalVoices, 'id', v => `🌐 ${v.name} (${[v.gender, v.accent || v.language].filter(Boolean).join(' • ')})`);
          } else {
            const noVoiceOpt = document.createElement('option');
            noVoiceOpt.value = '';
            noVoiceOpt.innerText = 'No voices loaded (Connect ElevenLabs API)';
            noVoiceOpt.disabled = true;
            cardVoiceSelect.appendChild(noVoiceOpt);
          }

          cardVoiceSelect.addEventListener('change', (e) => {
            msg.voiceId = e.target.value;
          });
        }

        const elevenBtn = card.querySelector('.gen-eleven-btn');
        elevenBtn?.addEventListener('click', async () => {
          if (!this.elevenLabs.hasApiKey()) {
            this.openModal(this.voiceSettingsModal);
            return;
          }
          elevenBtn.disabled = true;
          elevenBtn.innerText = 'Generating (v4)...';
          try {
            let voiceId = msg.voiceId;
            if (!voiceId || voiceId === 'inherit') {
              voiceId = msg.sender === 'sender' ? this.settings.senderVoiceId : this.settings.receiverVoiceId;
            }
            voiceId = voiceId || this.elevenLabs.defaultVoiceId;

            const elevenSettings = this.getElevenVoiceSettings(msg.text);
            const res = await this.elevenLabs.generateSpeech(msg.text, voiceId, elevenSettings);
            msg.audioBlob = res.blob;
            msg.audioUrl = res.url;
            msg.audioDuration = Number(res.duration.toFixed(1));
            msg.waveform = AudioManager.extractWaveform(res.audioBuffer, 32);
            this.renderPipelineList();
            this.updatePreviewAtTime(this.currentTime);
          } catch (e) {
            alert(`ElevenLabs error: ${e.message}`);
          } finally {
            elevenBtn.disabled = false;
            elevenBtn.innerText = '✨ ElevenLabs (v4)';
          }
        });

        const browserBtn = card.querySelector('.gen-browser-btn');
        browserBtn?.addEventListener('click', async () => {
          browserBtn.disabled = true;
          browserBtn.innerText = 'Synthesizing...';
          try {
            const gender = msg.sender === 'receiver' ? 'female' : 'male';
            const speed = this.settings.voiceSpeed || 1.0;
            const cleanText = msg.text.replace(/\[.*?\]/g, '').trim() || msg.text;
            const res = await AudioManager.generateBrowserVoice(cleanText, 0, gender, speed);
            msg.audioBlob = res.blob;
            msg.audioUrl = res.url;
            msg.audioDuration = Number(res.duration.toFixed(1));
            msg.waveform = AudioManager.extractWaveform(res.audioBuffer, 32);
            this.renderPipelineList();
            this.updatePreviewAtTime(this.currentTime);
          } catch (e) {
            alert(`Voice error: ${e.message}`);
          } finally {
            browserBtn.disabled = false;
            browserBtn.innerText = '🗣️ Browser';
          }
        });

        const uploadInput = card.querySelector('.upload-audio-input');
        uploadInput.addEventListener('change', async (e) => {
          const file = e.target.files[0];
          if (!file) return;
          msg.audioBlob = file;
          msg.audioUrl = URL.createObjectURL(file);

          const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
          const arrayBuf = await file.arrayBuffer();
          const buffer = await audioCtx.decodeAudioData(arrayBuf);
          msg.audioDuration = Number(buffer.duration.toFixed(1));
          msg.waveform = AudioManager.extractWaveform(buffer, 32);
          this.renderPipelineList();
          this.updatePreviewAtTime(this.currentTime);
        });

        const previewBtn = card.querySelector('.play-audio-preview-btn');
        previewBtn.addEventListener('click', () => {
          if (this.activeVoiceAudio) {
            this.activeVoiceAudio.pause();
            this.activeVoiceAudio = null;
            previewBtn.innerText = '▶ Preview';
            return;
          }
          if (msg.audioUrl) {
            this.activeVoiceAudio = new Audio(msg.audioUrl);
            this.activeVoiceAudio.onended = () => {
              previewBtn.innerText = '▶ Preview';
              this.activeVoiceAudio = null;
            };
            this.activeVoiceAudio.play();
            previewBtn.innerText = '⏹ Stop';
          } else {
            // Fallback preview
            this.audioManager.playSentSfx();
          }
        });
      }

      this.pipelineListEl.appendChild(card);
    });

    this.updateTimelineBounds();
  }

  renderSheetsTable() {
    const tbody = document.getElementById('sheetTableBody');
    tbody.innerHTML = '';

    this.messages.forEach((msg, idx) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${idx + 1}</td>
        <td>
          <select class="sheet-cell-sender">
            <option value="sender" ${msg.sender === 'sender' ? 'selected' : ''}>Sender (Me)</option>
            <option value="receiver" ${msg.sender === 'receiver' ? 'selected' : ''}>Receiver (Them)</option>
          </select>
        </td>
        <td>
          <select class="sheet-cell-type">
            <option value="text" ${msg.type === 'text' ? 'selected' : ''}>Text</option>
            <option value="voice" ${msg.type === 'voice' ? 'selected' : ''}>Voice Note</option>
          </select>
        </td>
        <td>
          <input type="text" class="sheet-cell-text" value="${msg.text.replace(/"/g, '&quot;')}">
        </td>
        <td>
          <input type="text" class="sheet-cell-time" value="${msg.time}">
        </td>
        <td>
          <select class="sheet-cell-status">
            <option value="sent" ${msg.status === 'sent' ? 'selected' : ''}>Sent</option>
            <option value="delivered" ${msg.status === 'delivered' ? 'selected' : ''}>Delivered</option>
            <option value="read" ${msg.status === 'read' ? 'selected' : ''}>Read (Blue)</option>
          </select>
        </td>
        <td>
          <input type="number" step="0.1" class="sheet-cell-delay" value="${msg.delay}">
        </td>
        <td>
          <button class="btn btn-danger btn-sm sheet-del-row" style="padding:0.15rem 0.35rem;">✕</button>
        </td>
      `;

      tr.querySelector('.sheet-del-row').addEventListener('click', () => {
        tr.remove();
      });

      tbody.appendChild(tr);
    });
  }

  collectSheetTableChanges() {
    const rows = document.querySelectorAll('#sheetTableBody tr');
    const updated = [];

    rows.forEach((tr, idx) => {
      const sender = tr.querySelector('.sheet-cell-sender').value;
      const type = tr.querySelector('.sheet-cell-type').value;
      const text = tr.querySelector('.sheet-cell-text').value;
      const time = tr.querySelector('.sheet-cell-time').value;
      const delayVal = parseFloat(tr.querySelector('.sheet-cell-delay').value);
      const delay = isNaN(delayVal) ? 0.2 : delayVal;

      const existing = this.messages[idx];
      updated.push({
        id: existing ? existing.id : `msg_${Date.now()}_${idx}`,
        sender,
        type,
        text,
        time,
        status,
        delay,
        audioBlob: existing ? existing.audioBlob : null,
        audioUrl: existing ? existing.audioUrl : null,
        audioDuration: existing ? existing.audioDuration : (type === 'voice' ? 3.5 : 0),
        waveform: existing && existing.waveform.length ? existing.waveform : AudioManager.generateRealisticWaveform(32)
      });
    });

    this.messages = updated;
  }

  getTotalDuration() {
    const timeline = this.renderer.buildTimeline(this.messages);
    return timeline.totalDuration;
  }

  updateTimelineBounds() {
    const total = this.getTotalDuration();
    this.totalDurationDisplay.innerText = this.formatTimeDisplay(total);
  }

  formatTimeDisplay(secs) {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    const ms = Math.floor((secs % 1) * 10);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}.${ms}`;
  }

  togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  async play() {
    if (this.currentTime >= this.getTotalDuration() || this.currentTime === 0) {
      this.currentTime = 0;
      this.playedSfxMessages.clear();
    }
    this.isPlaying = true;
    this.playIcon.innerText = '⏸';
    this.playPauseBtn.classList.replace('btn-primary', 'btn-secondary');

    // Unlock AudioContext on user gesture, then decode MP3 SFX files
    // await ensures both MP3s are decoded BEFORE the first frame fires
    this.audioManager.getAudioContext();
    await this.audioManager.decodeSfx();

    this.lastFrameTime = performance.now();
    this.loop();
  }

  pause() {
    this.isPlaying = false;
    this.playIcon.innerText = '▶';
    this.playPauseBtn.classList.replace('btn-secondary', 'btn-primary');
    if (this.rafId) cancelAnimationFrame(this.rafId);
    if (this.activeVoiceAudio) {
      this.activeVoiceAudio.pause();
      this.activeVoiceAudio = null;
    }
  }

  restart() {
    this.pause();
    this.currentTime = 0;
    this.playedSfxMessages.clear();
    this.mountedBubbleNodes.clear();
    this.messagesContainer.innerHTML = '';
    this.updatePreviewAtTime(0);
  }

  loop() {
    if (!this.isPlaying) return;

    const now = performance.now();
    const delta = (now - this.lastFrameTime) / 1000;
    this.lastFrameTime = now;

    this.currentTime += delta * this.playbackSpeed;
    const total = this.getTotalDuration();

    if (this.currentTime >= total) {
      this.currentTime = total;
      this.updatePreviewAtTime(this.currentTime);
      this.pause();
      return;
    }

    this.updatePreviewAtTime(this.currentTime);
    this.rafId = requestAnimationFrame(() => this.loop());
  }

  updatePreviewAtTime(t) {
    const total = this.getTotalDuration();
    this.currentTimeDisplay.innerText = this.formatTimeDisplay(t);
    this.scrubber.value = total > 0 ? (t / total) * 100 : 0;

    const timeline = this.renderer.buildTimeline(this.messages);

    // 1. Typing bubble state & header status
    let isTyping = false;
    let typingSender = 'receiver';

    for (const evt of timeline.events) {
      if (evt.type === 'typing_start' && t >= evt.time) {
        const nextEnd = timeline.events.find(e => e.type === 'typing_end' && e.messageIndex === evt.messageIndex);
        if (nextEnd && t < nextEnd.time) {
          isTyping = true;
          typingSender = evt.sender;
        }
      }
    }

    if (isTyping && typingSender === 'receiver') {
      const activeEvent = timeline.events.find(e => e.type === 'typing_start' && t >= e.time);
      const activeMsg = this.messages[activeEvent.messageIndex];
      this.headerContactStatus.innerText = activeMsg.type === 'voice' ? 'recording audio...' : 'typing...';
      this.headerContactStatus.classList.add('active-typing');
      this.typingBubble.style.display = 'flex';
    } else {
      this.headerContactStatus.innerText = 'online';
      this.headerContactStatus.classList.remove('active-typing');
      this.typingBubble.style.display = 'none';
    }

    // 2. Persistent DOM Message Mounting (No tearing / No re-creating all nodes every frame)
    const visibleEvents = timeline.events.filter(e => e.type === 'message_appear' && t >= e.time);
    const visibleIds = new Set(visibleEvents.map(e => e.msg.id));

    // Remove unmounted messages (e.g. user scrubbed backwards)
    for (const [id, item] of this.mountedBubbleNodes.entries()) {
      if (!visibleIds.has(id)) {
        item.element.remove();
        this.mountedBubbleNodes.delete(id);
      }
    }

    let newlyAdded = false;

    visibleEvents.forEach(evt => {
      const msg = evt.msg;
      let mounted = this.mountedBubbleNodes.get(msg.id);

      if (!mounted) {
        // Create bubble DOM node ONCE
        const bubbleWrap = document.createElement('div');
        bubbleWrap.className = `wa-bubble-wrapper ${msg.sender}`;
        bubbleWrap.id = `bubble_${msg.id}`;

        if (msg.type === 'voice') {
          const waveform = msg.waveform && msg.waveform.length ? msg.waveform : AudioManager.generateRealisticWaveform(28);
          const barsHtml = waveform.slice(0, 26).map((val, bIdx) => {
            const normalizedVal = Math.min(1.0, Math.max(0.05, Number(val) || 0));
            const barH = Math.round(7 + Math.pow(normalizedVal, 0.65) * 25);
            return `<div class="wa-wave-bar" data-idx="${bIdx}" style="height:${barH}px;"></div>`;
          }).join('');

          const isSender = msg.sender === 'sender';
          let avatarHtml = '';
          const hasPhoto = isSender ? !!this.settings.senderAvatar : !!(this.settings.receiverAvatar || this.settings.contactAvatar);

          if (isSender) {
            if (this.settings.senderAvatar) {
              avatarHtml = `<img src="${this.settings.senderAvatar}" alt="Person A">`;
            } else {
              avatarHtml = 'M';
            }
          } else {
            const recAvatar = this.settings.receiverAvatar || this.settings.contactAvatar;
            if (recAvatar) {
              avatarHtml = `<img src="${recAvatar}" alt="Person B">`;
            } else {
              avatarHtml = (this.settings.contactName ? this.settings.contactName.charAt(0).toUpperCase() : 'S');
            }
          }

          bubbleWrap.innerHTML = `
            <div class="wa-bubble ${msg.sender}">
              <div class="wa-voice-player">
                <button class="wa-voice-play-btn" type="button">▶</button>
                <div class="wa-voice-waveform-wrap">
                  <div class="wa-waveform-bars">
                    ${barsHtml}
                  </div>
                  <div class="wa-voice-time-row">
                    <span class="wa-voice-timer">${AudioManager.formatDuration(msg.audioDuration)}</span>
                    <span style="font-weight:600; font-size:0.65rem;">1x</span>
                  </div>
                </div>
                <div class="wa-voice-avatar-thumb" style="${hasPhoto ? 'background:transparent;' : ''}">
                  ${avatarHtml}
                  <div class="wa-mic-badge">🎙️</div>
                </div>
              </div>
              <div class="wa-bubble-meta">
                <span>${msg.time}</span>
                ${msg.sender === 'sender' ? `<span class="wa-ticks ${msg.status === 'read' ? 'blue' : ''}"><svg width="16" height="11" viewBox="0 0 16 11" xmlns="http://www.w3.org/2000/svg">${msg.status === 'sent' ? `<polyline class="tick-stroke" points="1,5.5 4.5,9 10,2" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>` : `<polyline class="tick-stroke" points="1,5.5 4.5,9 10,2" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/><polyline class="tick-stroke" points="5,5.5 8.5,9 14,2" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>`}</svg></span>` : ''}
              </div>
            </div>
          `;
        } else {
          bubbleWrap.innerHTML = `
            <div class="wa-bubble ${msg.sender}">
              <div class="wa-bubble-content">${msg.text}</div>
              <div class="wa-bubble-meta">
                <span>${msg.time}</span>
                ${msg.sender === 'sender' ? `<span class="wa-ticks ${msg.status === 'read' ? 'blue' : ''}"><svg width="16" height="11" viewBox="0 0 16 11" xmlns="http://www.w3.org/2000/svg">${msg.status === 'sent' ? `<polyline class="tick-stroke" points="1,5.5 4.5,9 10,2" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>` : `<polyline class="tick-stroke" points="1,5.5 4.5,9 10,2" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/><polyline class="tick-stroke" points="5,5.5 8.5,9 14,2" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>`}</svg></span>` : ''}
              </div>
            </div>
          `;
        }

        this.messagesContainer.appendChild(bubbleWrap);
        mounted = {
          element: bubbleWrap,
          msg: msg,
          appearTime: evt.time,
          isVoice: msg.type === 'voice'
        };
        this.mountedBubbleNodes.set(msg.id, mounted);
        newlyAdded = true;

        // Sound effect trigger when newly appearing
        if (this.isPlaying && this.settings.sfxEnabled && !this.playedSfxMessages.has(evt.messageIndex)) {
          this.playedSfxMessages.add(evt.messageIndex);
          if (msg.sender === 'sender') {
            this.audioManager.playSentSfx();
          } else {
            this.audioManager.playReceivedSfx();
          }

          if (msg.type === 'voice' && msg.audioUrl) {
            const audio = new Audio(msg.audioUrl);
            audio.playbackRate = this.playbackSpeed;
            audio.play().catch(e => console.warn("Live voice play:", e));
            this.activeVoiceAudio = audio;
          }
        }
      }

      // Smoothly update existing voice notes without tearing DOM
      if (mounted.isVoice) {
        const elapsedSinceAppear = Math.max(0, t - evt.time);
        const audioDur = msg.audioDuration || 3.5;
        const progress = Math.min(1.0, elapsedSinceAppear / audioDur);
        const isPlayingVoice = elapsedSinceAppear > 0 && elapsedSinceAppear < audioDur;

        const playBtn = mounted.element.querySelector('.wa-voice-play-btn');
        if (playBtn) playBtn.innerText = isPlayingVoice ? '⏸' : '▶';

        const timerEl = mounted.element.querySelector('.wa-voice-timer');
        if (timerEl) {
          timerEl.innerText = AudioManager.formatDuration(isPlayingVoice ? elapsedSinceAppear : audioDur);
        }

        const bars = mounted.element.querySelectorAll('.wa-wave-bar');
        const activeBarCount = Math.floor(progress * bars.length);
        bars.forEach((bar, bIdx) => {
          bar.classList.toggle('played', bIdx <= activeBarCount);
        });
      }
    });

    // 3. Smooth auto-scrolling when new messages arrive or typing status changes
    if (newlyAdded || isTyping) {
      this.chatViewport.scrollTo({
        top: this.chatViewport.scrollHeight,
        behavior: 'smooth'
      });
    }
  }

  loadTemplate(templateKey) {
    if (templateKey === 'roommate') {
      this.settings.contactName = 'Dave (Roommate)';
      this.headerContactName.innerText = 'Dave (Roommate)';
      this.headerAvatar.innerText = 'D';
      this.messages = [
        {
          id: 't1_1',
          sender: 'receiver',
          type: 'text',
          text: 'Bro. Did you touch the leftover pepperoni pizza in the fridge?? 🍕👀',
          time: '11:15 PM',
          status: 'read',
          delay: 0.2,
          audioDuration: 0,
          waveform: []
        },
        {
          id: 't1_2',
          sender: 'sender',
          type: 'text',
          text: 'Uhh... maybe one slice? I was starving after the gym lol',
          time: '11:16 PM',
          status: 'read',
          delay: 0.2,
          audioDuration: 0,
          waveform: []
        },
        {
          id: 't1_3',
          sender: 'receiver',
          type: 'voice',
          text: 'One slice?! The entire box is empty! You even ate the garlic dip! You owe me a whole large pizza right now!',
          time: '11:16 PM',
          status: 'read',
          delay: 0.2,
          audioDuration: 4.2,
          waveform: AudioManager.generateRealisticWaveform(32)
        },
        {
          id: 't1_4',
          sender: 'sender',
          type: 'text',
          text: 'Ordering Dominoes with double cheese right now please don\'t kill me 😂🙏',
          time: '11:17 PM',
          status: 'read',
          delay: 0.2,
          audioDuration: 0,
          waveform: []
        }
      ];
    } else if (templateKey === 'startup') {
      this.settings.contactName = 'Elena (Partner)';
      this.headerContactName.innerText = 'Elena (Partner)';
      this.headerAvatar.innerText = 'E';
      this.messages = [
        {
          id: 't2_1',
          sender: 'receiver',
          type: 'text',
          text: 'Did the venture fund partner email back after our demo call??',
          time: '2:30 PM',
          status: 'read',
          delay: 0.2,
          audioDuration: 0,
          waveform: []
        },
        {
          id: 't2_2',
          sender: 'sender',
          type: 'text',
          text: 'Open the attachment I just sent... they wired the term sheet!! 🚀🎉',
          time: '2:31 PM',
          status: 'read',
          delay: 0.2,
          audioDuration: 0,
          waveform: []
        },
        {
          id: 't2_3',
          sender: 'receiver',
          type: 'voice',
          text: 'No way!! Are you serious?! We actually closed the seed round! Call the team right now, we are celebrating tonight!',
          time: '2:31 PM',
          status: 'read',
          delay: 0.2,
          audioDuration: 4.0,
          waveform: AudioManager.generateRealisticWaveform(32)
        }
      ];
    } else if (templateKey === 'thriller') {
      this.settings.contactName = 'Unknown Number';
      this.headerContactName.innerText = 'Unknown Number';
      this.headerAvatar.innerText = '?';
      this.messages = [
        {
          id: 't3_1',
          sender: 'receiver',
          type: 'text',
          text: 'Are you still downstairs in the kitchen?',
          time: '3:04 AM',
          status: 'read',
          delay: 0.2,
          audioDuration: 0,
          waveform: []
        },
        {
          id: 't3_2',
          sender: 'sender',
          type: 'text',
          text: 'No... I’ve been asleep in my bed for hours. Why?',
          time: '3:05 AM',
          status: 'read',
          delay: 0.2,
          audioDuration: 0,
          waveform: []
        },
        {
          id: 't3_3',
          sender: 'receiver',
          type: 'voice',
          text: 'Stay in your room and lock the door right now. Someone is walking up the stairs...',
          time: '3:05 AM',
          status: 'read',
          delay: 0.2,
          audioDuration: 4.5,
          waveform: AudioManager.generateRealisticWaveform(32)
        }
      ];
    } else {
      // Freelancer
      this.settings.contactName = 'Marcus (Client)';
      this.headerContactName.innerText = 'Marcus (Client)';
      this.headerAvatar.innerText = 'M';
      this.messages = [
        {
          id: 't4_1',
          sender: 'receiver',
          type: 'text',
          text: 'Hey! Loved the initial animated chat mockup for our ad campaign!',
          time: '4:15 PM',
          status: 'read',
          delay: 0.2,
          audioDuration: 0,
          waveform: []
        },
        {
          id: 't4_2',
          sender: 'receiver',
          type: 'voice',
          text: 'Just one small note: can we export it with a transparent background so our editor can place it directly over the video footage in Premiere?',
          time: '4:16 PM',
          status: 'read',
          delay: 0.2,
          audioDuration: 4.5,
          waveform: AudioManager.generateRealisticWaveform(32)
        },
        {
          id: 't4_3',
          sender: 'sender',
          type: 'text',
          text: 'Already done! Exported as 4K transparent WebM & PNG sequence ready for your timeline. Sending now! 👍',
          time: '4:17 PM',
          status: 'read',
          delay: 0.2,
          audioDuration: 0,
          waveform: []
        }
      ];
    }

    this.updateHeaderAvatar();
    this.updatePersonaChips();
    this.renderPipelineList();
    this.restart();
  }

  async runExport() {
    this.pause(); // Ensure preview playback is stopped before rendering
    const format = document.getElementById('exportFormatSelect').value;
    const resString = document.getElementById('exportResolutionSelect').value;
    const [widthStr, heightStr] = resString.split('x');
    const width = parseInt(widthStr, 10);
    const height = parseInt(heightStr, 10);
    const fps = parseInt(document.getElementById('exportFpsSelect').value, 10);
    const bgSelect = document.getElementById('exportBackgroundSelect').value;
    const frameSelectEl = document.getElementById('exportPhoneFrameSelect');
    const showPhoneFrame = frameSelectEl ? (frameSelectEl.value === 'true') : (this.settings.showPhoneFrame !== false);

    const exportSettings = {
      ...this.settings,
      backgroundType: bgSelect,
      showPhoneFrame: showPhoneFrame
    };

    const progressBox = document.getElementById('exportProgressBox');
    const progressBar = document.getElementById('exportProgressBar');
    const statusText = document.getElementById('exportStatusText');
    const percentText = document.getElementById('exportPercentText');
    const statsText = document.getElementById('exportFrameStats');
    const startBtn = document.getElementById('startExportBtn');

    progressBox.style.display = 'flex';
    startBtn.disabled = true;
    progressBar.style.width = '0%';

    const onProgress = (info) => {
      progressBar.style.width = `${info.percentage}%`;
      percentText.innerText = `${info.percentage}%`;
      if (info.frame) {
        statsText.innerText = `Frame ${info.frame} / ${info.totalFrames} (${width}x${height} @ ${fps}fps)`;
        statusText.innerText = format === 'png_sequence'
          ? `Rendering 4K Frames into ZIP...`
          : `Encoding Smooth MP4 (H.264 + Audio)...`;
      } else {
        statsText.innerText = `Time ${info.currentTime.toFixed(1)}s / ${info.totalDuration.toFixed(1)}s (${width}x${height})`;
        statusText.innerText = `Recording Video Stream & Audio...`;
      }
    };

    try {
      if (format === 'png_sequence') {
        const zipBlob = await this.renderer.exportPNGSequence(this.messages, exportSettings, { width, height, fps }, onProgress);
        if (zipBlob) {
          const url = URL.createObjectURL(zipBlob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `whatsapp_chat_sequence_${width}x${height}.zip`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          alert('4K PNG sequence ZIP downloaded successfully!');
        }
      } else {
        // Video export (MP4 / WebM / Transparent)
        const videoResult = await this.renderer.exportVideo(this.messages, exportSettings, { width, height, fps }, onProgress);
        if (videoResult) {
          const ext = videoResult.mimeType.includes('mp4') ? 'mp4' : 'webm';
          const url = URL.createObjectURL(videoResult.blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `whatsapp_chat_video_${width}x${height}.${ext}`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          alert(`Final chat animation video (${ext.toUpperCase()}) downloaded successfully!`);
        }
      }
    } catch (err) {
      alert(`Export error: ${err.message}`);
    } finally {
      startBtn.disabled = false;
      progressBox.style.display = 'none';
      this.closeModals();
    }
  }
}

// Instantiate on load
window.addEventListener('DOMContentLoaded', () => {
  window.app = new WhatsAppStudioApp();
  if (window.location.hash === '#voicelibrary') {
    setTimeout(() => window.app.openVoiceLibraryModal(), 100);
  }
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has('t')) {
    const seekT = parseFloat(urlParams.get('t'));
    if (!isNaN(seekT)) {
      setTimeout(() => {
        window.app.currentTime = seekT;
        window.app.updatePreviewAtTime(seekT);
      }, 100);
    }
  }
});
