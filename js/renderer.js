/**
 * Multi-Format Video & 4K Animation Renderer
 * Handles real-time and frame-by-frame rendering for MP4/WebM, Transparent MOV/WebM, and PNG sequences.
 */
class AnimationRenderer {
  constructor(app) {
    this.app = app;
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d', { willReadFrequently: true, alpha: true });
    this.isExporting = false;
    this.shouldCancel = false;
    this.imageCache = new Map();
  }

  /**
   * Fetch and cache HTMLImageElement for canvas rendering
   */
  getImage(src) {
    if (!src) return null;
    if (this.imageCache.has(src)) {
      const img = this.imageCache.get(src);
      return (img && img.complete && img.naturalWidth > 0) ? img : null;
    }
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      if (this.app && this.app.updatePreviewAtTime && !this.isExporting) {
        this.app.updatePreviewAtTime(this.app.currentTime);
      }
    };
    img.onerror = () => {
      console.warn("Could not load image:", src.substring(0, 60));
    };
    img.src = src;
    this.imageCache.set(src, img);
    return (img.complete && img.naturalWidth > 0) ? img : null;
  }

  /**
   * Preload all avatar images prior to export
   */
  async preloadAllImages(settings) {
    const urls = [
      settings?.contactAvatar,
      settings?.senderAvatar,
      settings?.receiverAvatar
    ].filter(Boolean);

    await Promise.all(urls.map(url => new Promise((resolve) => {
      if (this.imageCache.has(url)) {
        const cached = this.imageCache.get(url);
        if (cached && cached.complete && cached.naturalWidth > 0) return resolve(cached);
      }
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        this.imageCache.set(url, img);
        resolve(img);
      };
      img.onerror = () => resolve(null);
      img.src = url;
    })));
  }

  cancelExport() {
    this.shouldCancel = true;
  }

  /**
   * Calculate timeline duration and keyframes
   * @param {Array} messages
   * @returns {{totalDuration: number, events: Array}}
   */
  buildTimeline(messages) {
    let currentTime = 0.2; // brief 0.2s initial pause
    const events = [];

    for (let i = 0; i < messages.length; i++) {
      const msg = messages[i];
      const msgDelay = Math.max(0.05, isNaN(parseFloat(msg.delay)) ? 0.2 : parseFloat(msg.delay));
      const typingDelay = Math.min(0.2, msgDelay);

      // 1. Typing event
      events.push({
        type: 'typing_start',
        time: currentTime,
        sender: msg.sender,
        messageIndex: i
      });

      currentTime += typingDelay;

      events.push({
        type: 'typing_end',
        time: currentTime,
        sender: msg.sender,
        messageIndex: i
      });

      // 2. Message appear event
      const appearTime = currentTime;
      let duration = msgDelay;

      if (msg.type === 'voice') {
        const audioDuration = parseFloat(msg.audioDuration) || 3.0;
        duration = audioDuration + msgDelay;
      }

      events.push({
        type: 'message_appear',
        time: appearTime,
        messageIndex: i,
        msg: msg,
        duration: duration
      });

      currentTime += duration;
    }

    const totalDuration = currentTime + 0.3; // brief 0.3s outro pause
    return { totalDuration, events };
  }

  /**
   * Render frame at exact timestamp t onto offscreen canvas
   * @param {number} t - time in seconds
   * @param {Array} messages
   * @param {object} settings
   * @param {number} width
   * @param {number} height
   */
  renderFrame(t, messages, settings, width, height) {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, width, height);

    const isTransparent = settings.backgroundType === 'transparent';
    const isDark = settings.theme === 'dark';
    const showPhoneMockup = settings.showPhoneFrame !== false;

    if (showPhoneMockup) {
      // Authentic Phone Mockup Mode: 375:760 matching modern Android preview
      const targetAspect = 375 / 760;
      let phoneH = height * 0.94;
      let phoneW = phoneH * targetAspect;
      if (phoneW > width * 0.92) {
        phoneW = width * 0.92;
        phoneH = phoneW / targetAspect;
      }
      const phoneX = (width - phoneW) / 2;
      const phoneY = (height - phoneH) / 2;
      const scale = phoneW / 375;

      // 1. Draw Canvas Stage Background behind Phone
      if (!isTransparent) {
        if (settings.backgroundType === 'green_screen') {
          ctx.fillStyle = '#00FF00';
          ctx.fillRect(0, 0, width, height);
        } else if (settings.backgroundType === 'solid') {
          ctx.fillStyle = settings.backgroundColor || '#0f172a';
          ctx.fillRect(0, 0, width, height);
        } else {
          // Default: Sleek studio stage radial gradient matching preview stage
          const bgGrad = ctx.createRadialGradient(
            width / 2, height / 2, Math.min(width, height) * 0.1,
            width / 2, height / 2, Math.max(width, height) * 0.78
          );
          bgGrad.addColorStop(0, '#172033');
          bgGrad.addColorStop(1, '#090d16');
          ctx.fillStyle = bgGrad;
          ctx.fillRect(0, 0, width, height);

          // Subtle ambient green studio glow behind phone
          const glowGrad = ctx.createRadialGradient(
            phoneX + phoneW / 2, phoneY + phoneH / 2, 0,
            phoneX + phoneW / 2, phoneY + phoneH / 2, phoneW * 0.75
          );
          glowGrad.addColorStop(0, 'rgba(34, 197, 94, 0.12)');
          glowGrad.addColorStop(1, 'rgba(34, 197, 94, 0)');
          ctx.fillStyle = glowGrad;
          ctx.fillRect(phoneX - phoneW * 0.3, phoneY - phoneH * 0.2, phoneW * 1.6, phoneH * 1.4);
        }
      }

      // 2. Draw Realistic Android Flagship Phone Chassis
      this.drawPhoneChassis(ctx, phoneX, phoneY, phoneW, phoneH, scale);

      // 3. Inner Screen Area (slim 7px bezel on all sides)
      const screenX = phoneX + 7 * scale;
      const screenY = phoneY + 7 * scale;
      const screenW = phoneW - 14 * scale;
      const screenH = phoneH - 14 * scale;
      const screenRadius = 26 * scale;

      ctx.save();
      ctx.beginPath();
      this.roundRect(ctx, screenX, screenY, screenW, screenH, screenRadius);
      ctx.clip();

      // Screen Wallpaper Background
      ctx.fillStyle = isDark ? '#0b141a' : '#efeae2';
      ctx.fillRect(screenX, screenY, screenW, screenH);
      this.drawWhatsAppPattern(ctx, screenW, screenH, isDark, screenX, screenY, scale);

      // 4. Status Bar with Centered Punch-Hole Camera
      const statusBarHeight = 34 * scale;
      this.drawStatusBar(ctx, screenX, screenY, screenW, statusBarHeight, scale, isDark, true, settings);

      // 5. WhatsApp Header Bar
      const headerHeight = 56 * scale;
      const headerY = screenY + statusBarHeight;
      const headerState = this.getHeaderStateAt(t, messages);
      this.drawHeader(ctx, screenX, headerY, screenW, headerHeight, scale, isDark, settings, headerState);

      // 6. Navigation Bar & Floating Bottom Bar
      const navBarHeight = 14 * scale;
      const inputBarHeight = 56 * scale;
      const inputY = screenY + screenH - navBarHeight - inputBarHeight;
      this.drawInputBar(ctx, screenX, inputY, screenW, inputBarHeight, scale, isDark);
      this.drawAndroidNavBar(ctx, screenX, screenY + screenH - navBarHeight, screenW, navBarHeight, scale, isDark);

      // 7. Chat Messages Viewport (between Header and Bottom Bar)
      const chatY = headerY + headerHeight;
      const chatH = screenH - statusBarHeight - headerHeight - inputBarHeight - navBarHeight;

      ctx.save();
      ctx.beginPath();
      ctx.rect(screenX, chatY, screenW, chatH);
      ctx.clip();

      this.drawMessages(ctx, t, messages, settings, screenX, chatY, screenW, chatH, scale, isDark);

      ctx.restore(); // restore chat viewport clip

      ctx.restore(); // restore screen clip

    } else {
      // Clean Frameless Chat Box Mode (No Phone Chassis)
      let viewX = 0, viewY = 0, viewW = width, viewH = height;
      let scale = width / 414;

      if (width / height > 0.75) {
        // Landscape or Square: center the chat box maintaining standard aspect ratio
        viewH = height * 0.94;
        viewW = viewH * (390 / 700);
        viewX = (width - viewW) / 2;
        viewY = (height - viewH) / 2;
        scale = viewW / 390;
      }

      if (!isTransparent) {
        if (settings.backgroundType === 'green_screen') {
          ctx.fillStyle = '#00FF00';
          ctx.fillRect(0, 0, width, height);
        } else if (settings.backgroundType === 'solid') {
          ctx.fillStyle = settings.backgroundColor || '#efeae2';
          ctx.fillRect(0, 0, width, height);
        } else {
          if (viewX > 0 || viewY > 0) {
            const bgGrad = ctx.createRadialGradient(
              width / 2, height / 2, Math.min(width, height) * 0.1,
              width / 2, height / 2, Math.max(width, height) * 0.78
            );
            bgGrad.addColorStop(0, '#172033');
            bgGrad.addColorStop(1, '#090d16');
            ctx.fillStyle = bgGrad;
            ctx.fillRect(0, 0, width, height);
          }
        }
      }

      ctx.save();
      if (viewX > 0 || viewY > 0) {
        ctx.beginPath();
        this.roundRect(ctx, viewX, viewY, viewW, viewH, 16 * scale);
        ctx.clip();
      }

      // Fill screen wallpaper
      ctx.fillStyle = isDark ? '#0b141a' : '#efeae2';
      ctx.fillRect(viewX, viewY, viewW, viewH);
      this.drawWhatsAppPattern(ctx, viewW, viewH, isDark, viewX, viewY, scale);

      // 1. Mobile Top Status Bar with Centered Punch-Hole Camera
      const statusBarHeight = 34 * scale;
      this.drawStatusBar(ctx, viewX, viewY, viewW, statusBarHeight, scale, isDark, true, settings);

      // 2. WhatsApp Header Bar
      const headerHeight = 56 * scale;
      const headerY = viewY + statusBarHeight;
      const headerState = this.getHeaderStateAt(t, messages);
      this.drawHeader(ctx, viewX, headerY, viewW, headerHeight, scale, isDark, settings, headerState);

      // 3. Navigation Bar & Floating Bottom Bar
      const navBarHeight = 14 * scale;
      const inputBarHeight = 56 * scale;
      const inputY = viewY + viewH - navBarHeight - inputBarHeight;
      this.drawInputBar(ctx, viewX, inputY, viewW, inputBarHeight, scale, isDark);
      this.drawAndroidNavBar(ctx, viewX, viewY + viewH - navBarHeight, viewW, navBarHeight, scale, isDark);

      // 4. Chat Messages Viewport (between Header and Bottom Bar)
      const chatY = headerY + headerHeight;
      const chatH = viewH - statusBarHeight - headerHeight - inputBarHeight - navBarHeight;

      ctx.save();
      ctx.beginPath();
      ctx.rect(viewX, chatY, viewW, chatH);
      ctx.clip();

      this.drawMessages(ctx, t, messages, settings, viewX, chatY, viewW, chatH, scale, isDark);

      ctx.restore();

      ctx.restore();
    }
  }

  roundRect(ctx, x, y, w, h, radii) {
    ctx.beginPath();
    let rTopLeft = 0, rTopRight = 0, rBottomRight = 0, rBottomLeft = 0;
    if (Array.isArray(radii)) {
      [rTopLeft, rTopRight, rBottomRight, rBottomLeft] = radii;
    } else {
      rTopLeft = rTopRight = rBottomRight = rBottomLeft = radii || 0;
    }
    const maxR = Math.min(w / 2, h / 2);
    rTopLeft = Math.max(0, Math.min(rTopLeft, maxR));
    rTopRight = Math.max(0, Math.min(rTopRight, maxR));
    rBottomRight = Math.max(0, Math.min(rBottomRight, maxR));
    rBottomLeft = Math.max(0, Math.min(rBottomLeft, maxR));

    ctx.moveTo(x + rTopLeft, y);
    ctx.lineTo(x + w - rTopRight, y);
    ctx.arcTo(x + w, y, x + w, y + rTopRight, rTopRight);
    ctx.lineTo(x + w, y + h - rBottomRight);
    ctx.arcTo(x + w, y + h, x + w - rBottomRight, y + h, rBottomRight);
    ctx.lineTo(x + rBottomLeft, y + h);
    ctx.arcTo(x, y + h, x, y + h - rBottomLeft, rBottomLeft);
    ctx.lineTo(x, y + rTopLeft);
    ctx.arcTo(x, y, x + rTopLeft, y, rTopLeft);
    ctx.closePath();
  }

  drawPhoneChassis(ctx, x, y, w, h, scale) {
    ctx.save();
    // Drop shadow
    ctx.shadowColor = 'rgba(0, 0, 0, 0.75)';
    ctx.shadowBlur = 35 * scale;
    ctx.shadowOffsetY = 20 * scale;

    const chassisRadius = 32 * scale;

    // Outer Chassis Body (Modern Android Flagship: Titanium Graphite / Dark Slate)
    ctx.beginPath();
    this.roundRect(ctx, x, y, w, h, chassisRadius);
    ctx.fillStyle = '#121417';
    ctx.fill();

    // Reset shadow
    ctx.restore();

    ctx.save();
    // Metallic Titanium Edge Rim (#2a313d)
    ctx.strokeStyle = '#2a313d';
    ctx.lineWidth = 1.8 * scale;
    ctx.beginPath();
    this.roundRect(ctx, x, y, w, h, chassisRadius);
    ctx.stroke();

    // Inner subtle chamfer bezel rim
    ctx.strokeStyle = '#181d24';
    ctx.lineWidth = 1 * scale;
    ctx.beginPath();
    this.roundRect(ctx, x + 1.2 * scale, y + 1.2 * scale, w - 2.4 * scale, h - 2.4 * scale, chassisRadius - 1.2 * scale);
    ctx.stroke();

    // Subtle Antenna Bands (Top & Bottom left/right)
    ctx.fillStyle = '#3a4454';
    ctx.fillRect(x + 36 * scale, y - 0.5 * scale, 2 * scale, 2.5 * scale);
    ctx.fillRect(x + w - 38 * scale, y - 0.5 * scale, 2 * scale, 2.5 * scale);
    ctx.fillRect(x + 36 * scale, y + h - 2 * scale, 2 * scale, 2.5 * scale);
    ctx.fillRect(x + w - 38 * scale, y + h - 2 * scale, 2 * scale, 2.5 * scale);

    // Modern Android Hardware Side Buttons (Right Side Only)
    ctx.fillStyle = '#2a313d';
    // Right: Volume Rocker (Volume Up & Down)
    ctx.beginPath();
    this.roundRect(ctx, x + w, y + 130 * scale, 3 * scale, 65 * scale, 1.5 * scale);
    ctx.fill();
    // Right: Power / Sleep Key
    ctx.beginPath();
    this.roundRect(ctx, x + w, y + 215 * scale, 3 * scale, 42 * scale, 1.5 * scale);
    ctx.fill();

    ctx.restore();
  }

  drawWhatsAppPattern(ctx, w, h, isDark, offsetX = 0, offsetY = 0, scale = 1) {
    ctx.save();
    ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.05)';
    const spacing = 22 * Math.max(1, scale);
    const dotR = 1.1 * Math.max(1, scale);
    for (let x = offsetX + spacing / 2; x < offsetX + w; x += spacing) {
      for (let y = offsetY + spacing / 2; y < offsetY + h; y += spacing) {
        ctx.beginPath();
        ctx.arc(x, y, dotR, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.restore();
  }

  drawStatusBar(ctx, x, y, w, h, scale, isDark, showPunchHole = true, settings = null) {
    ctx.save();
    const fgColor = isDark ? '#e9edef' : '#111b21';
    ctx.fillStyle = fgColor;
    const cy = y + h / 2;

    // 1. Android Clock on Left (e.g. "9:41" or custom setting)
    const clockText = (settings && settings.phoneTime) ? settings.phoneTime.replace(/ AM| PM/i, '') : '9:41';
    ctx.font = `600 ${12.5 * scale}px Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(clockText, x + 16 * scale, cy + 0.5 * scale);

    // 2. Centered Punch-Hole Camera
    if (showPunchHole) {
      const camX = x + w / 2;
      const camY = y + 13 * scale;
      const camR = 5.5 * scale;

      ctx.save();
      // Outer subtle bezel ring
      ctx.beginPath();
      ctx.arc(camX, camY, camR + 0.8 * scale, 0, Math.PI * 2);
      ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)';
      ctx.fill();

      // Deep Black Camera Lens Hole
      ctx.beginPath();
      ctx.arc(camX, camY, camR, 0, Math.PI * 2);
      ctx.fillStyle = '#06090e';
      ctx.fill();

      // Optical Anti-Reflective Coating Ring
      ctx.beginPath();
      ctx.arc(camX, camY, camR * 0.65, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.45)';
      ctx.lineWidth = 0.8 * scale;
      ctx.stroke();

      // Specular Reflection Highlight Dot
      ctx.beginPath();
      ctx.arc(camX - 1.4 * scale, camY - 1.4 * scale, 1.2 * scale, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.fill();
      ctx.restore();
    }

    // 3. Right Status Icons: 5G, Wi-Fi fan, Signal bars, Battery
    const rx = x + w - 16 * scale;

    // Battery (Modern Android horizontal capsule with level + percentage)
    const batW = 17 * scale;
    const batH = 9.5 * scale;
    const batX = rx - batW;
    const batY = cy - batH / 2;

    ctx.strokeStyle = fgColor;
    ctx.lineWidth = 1.2 * scale;
    ctx.beginPath();
    this.roundRect(ctx, batX, batY, batW, batH, 2 * scale);
    ctx.stroke();

    // Battery terminal cap
    ctx.fillStyle = fgColor;
    ctx.fillRect(batX + batW + 0.5 * scale, cy - 2 * scale, 1.4 * scale, 4 * scale);

    // Battery fill (green 88%)
    ctx.fillStyle = '#22c55e';
    ctx.beginPath();
    this.roundRect(ctx, batX + 1.5 * scale, batY + 1.5 * scale, 12 * scale, batH - 3 * scale, 1 * scale);
    ctx.fill();

    // Battery percentage text (98%)
    ctx.fillStyle = fgColor;
    ctx.font = `600 ${9.5 * scale}px Roboto, -apple-system, sans-serif`;
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.fillText('98%', batX - 4 * scale, cy + 0.5 * scale);

    // Android Cellular Signal (Solid Stair Triangle / 4 Bars)
    const sigX = batX - 40 * scale;
    ctx.fillStyle = fgColor;
    for (let i = 0; i < 4; i++) {
      const bH = (2.5 + i * 2.2) * scale;
      ctx.fillRect(sigX + i * (2.6 * scale), cy + 4.5 * scale - bH, 1.8 * scale, bH);
    }

    // Android Wi-Fi Icon (3 radiating curved fan arcs)
    const wifiX = sigX - 16 * scale;
    ctx.strokeStyle = fgColor;
    ctx.lineWidth = 1.3 * scale;
    ctx.lineCap = 'round';
    // Outer arc
    ctx.beginPath();
    ctx.arc(wifiX, cy + 4 * scale, 8 * scale, Math.PI * 1.25, Math.PI * 1.75);
    ctx.stroke();
    // Middle arc
    ctx.beginPath();
    ctx.arc(wifiX, cy + 4 * scale, 5 * scale, Math.PI * 1.25, Math.PI * 1.75);
    ctx.stroke();
    // Center dot
    ctx.fillStyle = fgColor;
    ctx.beginPath();
    ctx.arc(wifiX, cy + 3.2 * scale, 1.2 * scale, 0, Math.PI * 2);
    ctx.fill();

    // "5G" Text Badge
    ctx.font = `700 ${9.5 * scale}px Roboto, -apple-system, sans-serif`;
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.fillText('5G', wifiX - 9 * scale, cy + 0.5 * scale);

    ctx.restore();
  }

  getHeaderStateAt(t, messages) {
    const timeline = this.buildTimeline(messages);
    for (const evt of timeline.events) {
      if (evt.type === 'typing_start' && t >= evt.time) {
        const nextEnd = timeline.events.find(e => e.type === 'typing_end' && e.messageIndex === evt.messageIndex);
        if (nextEnd && t < nextEnd.time) {
          const msg = messages[evt.messageIndex];
          if (msg.sender === 'receiver') {
            return msg.type === 'voice' ? 'recording audio...' : 'typing...';
          }
        }
      }
    }
    return 'online';
  }

  drawHeaderIcons(ctx, x, y, h, scale, isDark) {
    const iconColor = isDark ? '#aebac1' : '#54656f';
    const cy = y + h / 2;

    const drawSvgPath = (svgStr, px, py, size) => {
      ctx.save();
      ctx.translate(px, py);
      ctx.scale((size * scale) / 24, (size * scale) / 24);
      ctx.fillStyle = iconColor;
      const path = new Path2D(svgStr);
      ctx.fill(path);
      ctx.restore();
    };

    // 1. Video Camera (at rx - 64 * scale)
    drawSvgPath(
      'M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z',
      x - 64 * scale,
      cy - 9.5 * scale,
      19
    );

    // 2. Phone Call Handset (at rx - 34 * scale)
    drawSvgPath(
      'M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-2.2 2.2a15.053 15.053 0 0 1-6.59-6.59l2.2-2.21a.96.96 0 0 0 .25-1.01A11.36 11.36 0 0 1 8.57 3.99c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.61c0-.55-.45-1-.99-1z',
      x - 34 * scale,
      cy - 9 * scale,
      18
    );

    // 3. Three Vertical Dots (at rx)
    drawSvgPath(
      'M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z',
      x - 8 * scale,
      cy - 10 * scale,
      20
    );
  }

  drawHeader(ctx, x, y, w, h, scale, isDark, settings, statusSubtitle) {
    ctx.save();
    // Header background
    ctx.fillStyle = isDark ? '#202c33' : '#f0f2f5';
    ctx.fillRect(x, y, w, h);

    // Bottom divider shadow
    ctx.fillStyle = isDark ? 'rgba(0, 0, 0, 0.25)' : 'rgba(11, 20, 26, 0.08)';
    ctx.fillRect(x, y + h - 1 * scale, w, 1 * scale);

    const cy = y + h / 2;

    // Android Material Back Arrow (←)
    const arrowColor = isDark ? '#aebac1' : '#54656f';
    ctx.strokeStyle = arrowColor;
    ctx.fillStyle = arrowColor;
    ctx.lineWidth = 2 * scale;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(x + 24 * scale, cy);
    ctx.lineTo(x + 10 * scale, cy);
    ctx.moveTo(x + 16 * scale, cy - 5.5 * scale);
    ctx.lineTo(x + 10 * scale, cy);
    ctx.lineTo(x + 16 * scale, cy + 5.5 * scale);
    ctx.stroke();

    // Contact Avatar Circle
    const avatarR = 19 * scale;
    const avatarX = x + 48 * scale;
    const avatarY = cy;

    const contactImgSrc = settings.contactAvatar || settings.receiverAvatar;
    const contactImg = contactImgSrc ? this.getImage(contactImgSrc) : null;

    if (contactImg) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(avatarX, avatarY, avatarR, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(contactImg, avatarX - avatarR, avatarY - avatarR, avatarR * 2, avatarR * 2);
      ctx.restore();
    } else {
      ctx.beginPath();
      ctx.arc(avatarX, avatarY, avatarR, 0, Math.PI * 2);
      ctx.fillStyle = settings.receiverAvatarBg || '#00a884';
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = `600 ${14.5 * scale}px Roboto, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const initial = (settings.contactName || 'Sarah').charAt(0).toUpperCase();
      ctx.fillText(initial, avatarX, avatarY);
    }

    // Contact Name
    ctx.fillStyle = isDark ? '#e9edef' : '#111b21';
    ctx.font = `600 ${15 * scale}px Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';
    ctx.fillText(settings.contactName || 'Sarah Jenkins', x + 74 * scale, y + 23 * scale);

    // Subtitle (online / typing...)
    const isTypingState = statusSubtitle.includes('typing') || statusSubtitle.includes('recording');
    ctx.font = `${isTypingState ? '600' : '400'} ${11.5 * scale}px Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`;
    ctx.fillStyle = isTypingState
      ? (isDark ? '#00a884' : '#008069')
      : (isDark ? '#8696a0' : '#667781');
    ctx.fillText(statusSubtitle, x + 74 * scale, y + 41 * scale);

    // Right Action Icons (Video, Phone, Menu dots)
    this.drawHeaderIcons(ctx, x + w - 14 * scale, y, h, scale, isDark);

  }

  drawChatTopBadges(ctx, x, y, w, scale, isDark) {
    const badgeW = Math.min(w * 0.84, 310 * scale);
    const badgeX = x + (w - badgeW) / 2;
    const badgeH = 34 * scale;

    // 1. Encryption Notice Badge
    ctx.save();
    ctx.fillStyle = isDark ? '#182229' : 'rgba(254, 243, 199, 0.92)';
    ctx.beginPath();
    this.roundRect(ctx, badgeX, y, badgeW, badgeH, 7 * scale);
    ctx.fill();

    ctx.fillStyle = isDark ? '#ffd279' : '#92400e';
    ctx.font = `400 ${10 * scale}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🔒 Messages and calls are end-to-end encrypted.', badgeX + badgeW / 2, y + 11 * scale);
    ctx.fillText('No one outside of this chat can read or listen to them.', badgeX + badgeW / 2, y + 23 * scale);
    ctx.restore();

    // 2. Date Pill: TODAY
    const dateY = y + badgeH + 7 * scale;
    const dateW = 66 * scale;
    const dateH = 22 * scale;
    const dateX = x + (w - dateW) / 2;

    ctx.save();
    ctx.fillStyle = isDark ? '#182229' : 'rgba(255, 255, 255, 0.88)';
    ctx.beginPath();
    this.roundRect(ctx, dateX, dateY, dateW, dateH, 6 * scale);
    ctx.fill();

    ctx.fillStyle = isDark ? '#8696a0' : '#54656f';
    ctx.font = `600 ${10 * scale}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('TODAY', dateX + dateW / 2, dateY + dateH / 2);
    ctx.restore();

    return badgeH + 7 * scale + dateH;
  }

  buildScrollMilestones(timeline, messages, viewW, viewH, scale) {
    const topBadgesH = 63 * scale;
    const typingHeight = 34 * scale;

    const maxBubbleW = Math.min(viewW * 0.78, 280 * scale);
    const msgHeights = messages.map(m => {
      if (m.type === 'voice') return 64 * scale;
      const textLines = this.wrapText(this.ctx, m.text, maxBubbleW - 28 * scale, `400 ${14.5 * scale}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`);
      return Math.max(38 * scale, (textLines.length * 20 * scale) + 24 * scale);
    });

    const milestones = [{ time: 0, scroll: 0, startScroll: 0, duration: 0.42 }];

    for (let i = 0; i < timeline.events.length; i++) {
      const evt = timeline.events[i];
      let contentH = topBadgesH + 12 * scale;

      for (let j = 0; j < messages.length; j++) {
        const appEvt = timeline.events.find(e => e.type === 'message_appear' && e.messageIndex === j);
        if (appEvt && (appEvt.time < evt.time || (appEvt.time === evt.time && evt.type === 'message_appear'))) {
          contentH += msgHeights[j] + 9 * scale;
        }
      }

      if (evt.type === 'typing_start') {
        contentH += typingHeight + 9 * scale;
      }

      const targetScroll = Math.max(0, contentH - (viewH - 16 * scale));
      const prevMilestone = milestones[milestones.length - 1];

      let startScroll = prevMilestone.scroll;
      if (evt.time < prevMilestone.time + prevMilestone.duration) {
        const p = (evt.time - prevMilestone.time) / prevMilestone.duration;
        const ease = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
        startScroll = prevMilestone.startScroll + (prevMilestone.scroll - prevMilestone.startScroll) * ease;
      }

      milestones.push({
        time: evt.time,
        startScroll: startScroll,
        scroll: targetScroll,
        duration: 0.42
      });
    }

    return milestones;
  }

  getSmoothScrollY(t, milestones) {
    if (!milestones || milestones.length === 0) return 0;
    let active = milestones[0];
    for (let i = 0; i < milestones.length; i++) {
      if (milestones[i].time <= t) {
        active = milestones[i];
      } else {
        break;
      }
    }

    if (t >= active.time + active.duration) {
      return active.scroll;
    }

    const p = Math.max(0, (t - active.time) / active.duration);
    const ease = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
    return active.startScroll + (active.scroll - active.startScroll) * ease;
  }

  drawMessages(ctx, t, messages, settings, viewX, viewY, viewW, viewH, scale, isDark) {
    const timeline = this.buildTimeline(messages);
    const visibleMessages = [];
    let isTyping = false;
    let typingSender = 'receiver';

    for (const evt of timeline.events) {
      if (evt.type === 'message_appear' && t >= evt.time) {
        visibleMessages.push({
          msg: evt.msg,
          appearTime: evt.time,
          index: evt.messageIndex
        });
      }
      if (evt.type === 'typing_start' && t >= evt.time) {
        const nextEnd = timeline.events.find(e => e.type === 'typing_end' && e.messageIndex === evt.messageIndex);
        if (nextEnd && t < nextEnd.time) {
          isTyping = true;
          typingSender = evt.sender;
        }
      }
    }

    // Measure visible message heights
    const maxBubbleW = Math.min(viewW * 0.78, 280 * scale);
    const renderedItems = [];

    for (const item of visibleMessages) {
      const m = item.msg;
      let bubbleH = 0;
      let bubbleW = maxBubbleW;
      if (m.type === 'voice') {
        bubbleH = 64 * scale;
        bubbleW = Math.min(viewW * 0.82, 280 * scale);
      } else {
        const textLines = this.wrapText(ctx, m.text, maxBubbleW - 28 * scale, `400 ${14.5 * scale}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`);
        const textMetrics = textLines.map(l => ctx.measureText(l).width);
        const maxLineWidth = Math.max(...textMetrics, 50 * scale);
        bubbleW = Math.min(maxBubbleW, Math.max(85 * scale, maxLineWidth + 32 * scale));
        bubbleH = Math.max(38 * scale, (textLines.length * 20 * scale) + 24 * scale);
      }
      renderedItems.push({
        ...item,
        height: bubbleH,
        bubbleWidth: bubbleW
      });
    }

    // Top badges height (Encryption badge + TODAY date pill)
    const topBadgesH = 63 * scale;

    // Smooth Continuous Scroll Calculation
    const scrollMilestones = this.buildScrollMilestones(timeline, messages, viewW, viewH, scale);
    const scrollY = this.getSmoothScrollY(t, scrollMilestones);

    let currentY = viewY + 10 * scale - scrollY;

    // Draw Top Badges if visible
    if (currentY + topBadgesH > viewY) {
      this.drawChatTopBadges(ctx, viewX, currentY, viewW, scale, isDark);
    }
    currentY += topBadgesH + 12 * scale;

    // Draw visible messages with smooth spring slide-up and fade
    for (const item of renderedItems) {
      const msg = item.msg;
      const isSender = msg.sender === 'sender';
      const bubbleW = item.bubbleWidth;
      const bubbleH = item.height;

      // Enhanced smooth pop-in animation
      const animDuration = 0.32;
      const elapsed = Math.max(0, t - item.appearTime);
      const rawP = Math.min(1.0, elapsed / animDuration);

      let easeScale = 1.0;
      let slideY = 0;
      let opacity = 1.0;

      if (rawP < 1.0) {
        const s = 1.65;
        const p1 = rawP - 1;
        const easeBack = p1 * p1 * ((s + 1) * p1 + s) + 1;
        easeScale = 0.80 + 0.20 * Math.max(0, easeBack);
        slideY = (1 - rawP) * (14 * scale);
        opacity = Math.min(1.0, rawP * 2.2);
      }

      const bubbleX = isSender ? (viewX + viewW - bubbleW - 14 * scale) : (viewX + 14 * scale);

      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.translate(bubbleX + (isSender ? bubbleW : 0), currentY + bubbleH / 2 + slideY);
      ctx.scale(easeScale, easeScale);
      ctx.translate(-(bubbleX + (isSender ? bubbleW : 0)), -(currentY + bubbleH / 2));

      // Bubble background color
      let bubbleBg = '';
      if (isSender) {
        bubbleBg = settings.senderBubbleColor || (isDark ? '#005c4b' : '#d9fdd3');
      } else {
        bubbleBg = settings.receiverBubbleColor || (isDark ? '#202c33' : '#ffffff');
      }

      ctx.fillStyle = bubbleBg;
      ctx.beginPath();
      // Sender has rounded corners with top-right sharp; Receiver with top-left sharp
      if (isSender) {
        this.roundRect(ctx, bubbleX, currentY, bubbleW, bubbleH, [8 * scale, 0, 8 * scale, 8 * scale]);
      } else {
        this.roundRect(ctx, bubbleX, currentY, bubbleW, bubbleH, [0, 8 * scale, 8 * scale, 8 * scale]);
      }
      ctx.fill();

      // Authentic Bubble Tail Triangle
      ctx.beginPath();
      if (isSender) {
        ctx.moveTo(bubbleX + bubbleW, currentY);
        ctx.lineTo(bubbleX + bubbleW + 7 * scale, currentY);
        ctx.lineTo(bubbleX + bubbleW, currentY + 8 * scale);
      } else {
        ctx.moveTo(bubbleX, currentY);
        ctx.lineTo(bubbleX - 7 * scale, currentY);
        ctx.lineTo(bubbleX, currentY + 8 * scale);
      }
      ctx.closePath();
      ctx.fill();

      // Content
      if (msg.type === 'voice') {
        this.drawVoiceNote(ctx, msg, t - item.appearTime, bubbleX, currentY, bubbleW, bubbleH, scale, isDark, isSender, settings);
      } else {
        // Text content
        ctx.fillStyle = isDark ? '#e9edef' : '#111b21';
        ctx.font = `400 ${14.5 * scale}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';

        const lines = this.wrapText(ctx, msg.text, bubbleW - 28 * scale, ctx.font);
        lines.forEach((line, idx) => {
          ctx.fillText(line, bubbleX + 12 * scale, currentY + 8 * scale + (idx * 20 * scale));
        });

        // Timestamp & ticks
        this.drawBubbleMeta(ctx, msg.time, msg.status, isSender, bubbleX + bubbleW - 10 * scale, currentY + bubbleH - 8 * scale, scale, isDark);
      }

      ctx.restore();
      currentY += bubbleH + 9 * scale;
    }

    // Draw typing indicator bubble if active with smooth pop-in
    if (isTyping && typingSender === 'receiver') {
      const typeW = 56 * scale;
      const typeH = 32 * scale;
      const typeX = viewX + 14 * scale;

      const typingEvt = timeline.events.find(e => e.type === 'typing_start' && t >= e.time);
      const typingElapsed = typingEvt ? Math.max(0, t - typingEvt.time) : 1.0;
      const typeRawP = Math.min(1.0, typingElapsed / 0.22);
      const typeScale = 0.4 + 0.6 * Math.sin(typeRawP * Math.PI / 2);
      const typeOpacity = typeRawP;

      ctx.save();
      ctx.globalAlpha = typeOpacity;
      ctx.translate(typeX, currentY + typeH / 2);
      ctx.scale(typeScale, typeScale);
      ctx.translate(-typeX, -(currentY + typeH / 2));

      ctx.fillStyle = isDark ? '#202c33' : '#ffffff';
      this.roundRect(ctx, typeX, currentY, typeW, typeH, [4 * scale, 14 * scale, 14 * scale, 14 * scale]);
      ctx.fill();

      // 3 Bouncing Dots
      const dotR = 3.2 * scale;
      const dotY = currentY + typeH / 2;
      for (let i = 0; i < 3; i++) {
        const dotOffset = Math.sin((t * 7.5) + (i * 0.85)) * 3.6 * scale;
        ctx.fillStyle = isDark ? '#8696a0' : '#667781';
        ctx.beginPath();
        ctx.arc(typeX + 16 * scale + (i * 12 * scale), dotY + dotOffset, dotR, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
  }

  drawVoiceNote(ctx, msg, elapsed, x, y, w, h, scale, isDark, isSender = false, settings = {}) {
    const isSenderBool = isSender !== undefined ? Boolean(isSender) : (msg?.sender === 'sender');
    const audioDur = parseFloat(msg.audioDuration) || 3.0;
    const progress = Math.min(1.0, Math.max(0.0, elapsed / audioDur));
    const isPlaying = elapsed > 0 && elapsed < audioDur;

    // Play/Pause button
    const btnX = x + 16 * scale;
    const btnY = y + h / 2;
    const btnR = 15 * scale;

    ctx.save();
    ctx.fillStyle = isDark ? '#00a884' : '#008069';
    ctx.beginPath();
    ctx.arc(btnX, btnY, btnR, 0, Math.PI * 2);
    ctx.fill();

    // Play/Pause icon inside button
    ctx.fillStyle = '#ffffff';
    if (isPlaying) {
      this.roundRect(ctx, btnX - 4.5 * scale, btnY - 5 * scale, 2.8 * scale, 10 * scale, 1 * scale);
      ctx.fill();
      this.roundRect(ctx, btnX + 1.7 * scale, btnY - 5 * scale, 2.8 * scale, 10 * scale, 1 * scale);
      ctx.fill();
    } else {
      ctx.beginPath();
      ctx.moveTo(btnX - 3.5 * scale, btnY - 6 * scale);
      ctx.lineTo(btnX + 5.5 * scale, btnY);
      ctx.lineTo(btnX - 3.5 * scale, btnY + 6 * scale);
      ctx.closePath();
      ctx.fill();
    }

    // Voice Note Profile Thumbnail on Right
    const thumbR = 15 * scale;
    const thumbX = x + w - 24 * scale;
    const thumbY = y + 22 * scale;

    const avatarSrc = isSenderBool
      ? settings?.senderAvatar
      : (settings?.receiverAvatar || settings?.contactAvatar);
    const avatarImg = avatarSrc ? this.getImage(avatarSrc) : null;

    if (avatarImg) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(thumbX, thumbY, thumbR, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(avatarImg, thumbX - thumbR, thumbY - thumbR, thumbR * 2, thumbR * 2);
      ctx.restore();
    } else {
      ctx.beginPath();
      ctx.arc(thumbX, thumbY, thumbR, 0, Math.PI * 2);
      ctx.fillStyle = isSenderBool ? '#075e54' : (settings?.receiverAvatarBg || '#00a884');
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = `600 ${11 * scale}px Roboto, -apple-system, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const init = isSenderBool ? 'M' : ((settings?.contactName || 'Sarah').charAt(0).toUpperCase());
      ctx.fillText(init, thumbX, thumbY);
    }

    // Mic badge overlay at bottom-right of avatar thumb
    const badgeR = 5.5 * scale;
    const badgeX = thumbX + 8.5 * scale;
    const badgeY = thumbY + 8.5 * scale;
    ctx.beginPath();
    ctx.arc(badgeX, badgeY, badgeR, 0, Math.PI * 2);
    ctx.fillStyle = '#00a884';
    ctx.fill();
    ctx.lineWidth = 1.4 * scale;
    ctx.strokeStyle = '#ffffff';
    ctx.stroke();

    // White microphone glyph inside badge
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(badgeX, badgeY - 1 * scale, 1.8 * scale, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillRect(badgeX - 0.8 * scale, badgeY - 0.8 * scale, 1.6 * scale, 2.4 * scale);

    // Waveform bars (Substantially taller, lifted quiet baseline)
    const waveX = btnX + btnR + 10 * scale;
    const waveW = w - (waveX - x) - 52 * scale;
    const barCount = 26;
    const barW = Math.max(2.4 * scale, waveW / (barCount * 1.55));
    const gap = barW * 0.55;
    const waveCenterY = y + 24 * scale;

    const waveform = msg.waveform && msg.waveform.length >= barCount
      ? msg.waveform
      : AudioManager.generateRealisticWaveform(barCount);

    for (let i = 0; i < barCount; i++) {
      const normalizedVal = Math.min(1.0, Math.max(0.05, Number(waveform[i]) || 0));
      const barH = Math.round(7 + Math.pow(normalizedVal, 0.65) * 25) * scale;
      const bx = waveX + i * (barW + gap);
      const by = waveCenterY - barH / 2;
      const isPlayed = progress > 0 && (i / barCount) <= progress;

      ctx.beginPath();
      ctx.fillStyle = isPlayed
        ? (isDark ? '#00a884' : '#008069')
        : (isDark ? '#505d65' : '#b0b8bc');
      this.roundRect(ctx, bx, by, barW, barH, 1.4 * scale);
      ctx.fill();
    }

    // Scrubber dot with exact alignment to bar centers
    const scrubX = waveX + (progress * ((barCount - 1) * (barW + gap))) + (barW / 2);
    ctx.beginPath();
    ctx.arc(scrubX, waveCenterY, 4.2 * scale, 0, Math.PI * 2);
    ctx.fillStyle = isDark ? '#00a884' : '#008069';
    ctx.fill();

    // Duration text & 1x speed badge
    ctx.fillStyle = isDark ? '#8696a0' : '#667781';
    ctx.font = `500 ${11 * scale}px Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    const currentTimeText = AudioManager.formatDuration(isPlaying ? elapsed : audioDur);
    ctx.fillText(currentTimeText, waveX, y + h - 16 * scale);

    const timeMetrics = ctx.measureText(currentTimeText);
    const speedX = waveX + timeMetrics.width + 8 * scale;
    const speedY = y + h - 17.5 * scale;
    const speedW = 19 * scale;
    const speedH = 13 * scale;

    // Subtle 1x pill background like modern WhatsApp Android
    ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)';
    this.roundRect(ctx, speedX, speedY, speedW, speedH, 3.5 * scale);
    ctx.fill();

    ctx.fillStyle = isDark ? '#8696a0' : '#667781';
    ctx.font = `600 ${9.5 * scale}px Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('1x', speedX + speedW / 2, speedY + speedH / 2);

    // Time & ticks
    this.drawBubbleMeta(ctx, msg.time, msg.status, isSenderBool, x + w - 10 * scale, y + h - 8 * scale, scale, isDark);

    ctx.restore();
  }

  drawBubbleMeta(ctx, time, status, isSender = false, rightX, bottomY, scale, isDark) {
    const isSenderBool = Boolean(isSender);
    ctx.save();
    ctx.font = `400 ${11 * scale}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`;
    ctx.fillStyle = isDark ? '#8696a0' : '#667781';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'bottom';

    let xPos = rightX;
    if (isSenderBool) {
      const isBlue = status === 'read';
      const tickColor = isBlue ? '#53bdeb' : (isDark ? '#8696a0' : '#667781');
      ctx.strokeStyle = tickColor;
      ctx.lineWidth = 1.6 * scale;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      // WhatsApp-style: two overlapping ticks, 4px apart, same proportions as SVG viewBox 0 0 16 11
      // Anchor rightmost point of the whole mark at xPos
      // Tick 2 (front, rightmost): points="5,5.5 8.5,9 14,2" scaled
      // Tick 1 (back, leftmost):   points="1,5.5 4.5,9 10,2" scaled
      const tickW = 16 * scale;   // total width of the double-tick
      const tickH = 11 * scale;   // total height
      const ox = xPos - tickW;    // left edge origin X
      const oy = bottomY - tickH; // top edge origin Y

      // Tick 1 — back check
      ctx.beginPath();
      ctx.moveTo(ox + 1  * scale, oy + 5.5 * scale);
      ctx.lineTo(ox + 4.5* scale, oy + 9   * scale);
      ctx.lineTo(ox + 10 * scale, oy + 2   * scale);
      ctx.stroke();

      // Tick 2 — front check (only if delivered or read)
      if (status === 'delivered' || status === 'read') {
        ctx.beginPath();
        ctx.moveTo(ox + 5  * scale, oy + 5.5 * scale);
        ctx.lineTo(ox + 8.5* scale, oy + 9   * scale);
        ctx.lineTo(ox + 14 * scale, oy + 2   * scale);
        ctx.stroke();
      }

      xPos -= tickW + 3 * scale; // gap between ticks and timestamp
    }

    ctx.fillText(time || '10:45 AM', xPos, bottomY);
    ctx.restore();
  }

  drawInputBar(ctx, x, y, w, h, scale, isDark) {
    ctx.save();
    const cy = y + h / 2;

    // 1. Modern Floating Input Pill on Left
    const pillX = x + 6 * scale;
    const pillW = w - 62 * scale;
    const pillH = 44 * scale;
    const pillY = y + (h - pillH) / 2;

    // Soft drop shadow under pill
    ctx.save();
    ctx.shadowColor = isDark ? 'rgba(0, 0, 0, 0.4)' : 'rgba(11, 20, 26, 0.12)';
    ctx.shadowBlur = 4 * scale;
    ctx.shadowOffsetY = 1.5 * scale;
    ctx.fillStyle = isDark ? '#1f2c34' : '#ffffff';
    ctx.beginPath();
    this.roundRect(ctx, pillX, pillY, pillW, pillH, 22 * scale);
    ctx.fill();
    ctx.restore();

    const iconColor = isDark ? '#8696a0' : '#8696a0';
    const drawSvgIcon = (svgStr, px, py, size, rotateRad = 0) => {
      ctx.save();
      ctx.translate(px, py);
      if (rotateRad && ctx.rotate) ctx.rotate(rotateRad);
      ctx.scale((size * scale) / 24, (size * scale) / 24);
      ctx.translate(-12, -12);
      ctx.fillStyle = iconColor;
      const path = new Path2D(svgStr);
      ctx.fill(path);
      ctx.restore();
    };

    // Inside Pill:
    // A. Emoji Smiley Face on the left
    const emojiX = pillX + 20 * scale;
    drawSvgIcon(
      'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z',
      emojiX,
      cy,
      20
    );

    // B. Placeholder Text "Message"
    ctx.fillStyle = isDark ? '#8696a0' : '#8696a0';
    ctx.font = `400 ${14.5 * scale}px Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText('Message', emojiX + 16 * scale, cy);

    // C. Attachment Paperclip Icon (Modern WhatsApp angled paperclip)
    const clipX = pillX + pillW - 48 * scale;
    drawSvgIcon(
      'M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5a2.5 2.5 0 0 1 5 0v10.5c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5V6H9v9.5a3 3 0 0 0 6 0V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z',
      clipX,
      cy,
      19,
      Math.PI / 4 // 45 deg tilt like WhatsApp Android
    );

    // D. Camera Icon (Modern WhatsApp camera with lens cutout & center dot)
    const camX = pillX + pillW - 20 * scale;
    ctx.save();
    ctx.translate(camX, cy);
    ctx.scale((19 * scale) / 24, (19 * scale) / 24);
    ctx.translate(-12, -12);
    ctx.fillStyle = iconColor;
    const camBody = new Path2D('M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z');
    ctx.fill(camBody);
    ctx.beginPath();
    ctx.arc(12, 12, 3.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // 2. Floating Circular Green Mic Button on the Right
    const micX = x + w - 26 * scale;
    const micY = cy;
    const micR = 22 * scale;

    ctx.save();
    ctx.shadowColor = 'rgba(11, 20, 26, 0.25)';
    ctx.shadowBlur = 6 * scale;
    ctx.shadowOffsetY = 2 * scale;
    ctx.fillStyle = isDark ? '#00a884' : '#00a884';
    ctx.beginPath();
    ctx.arc(micX, micY, micR, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // White microphone icon inside button
    ctx.save();
    ctx.translate(micX, micY);
    ctx.scale((20 * scale) / 24, (20 * scale) / 24);
    ctx.translate(-12, -12);
    ctx.fillStyle = '#ffffff';
    const micPath = new Path2D('M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5-3c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z');
    ctx.fill(micPath);
    ctx.restore();

    ctx.restore();
  }

  drawAndroidNavBar(ctx, x, y, w, h, scale, isDark) {
    ctx.save();
    const navW = 100 * scale;
    const navH = 3.5 * scale;
    const navX = x + (w - navW) / 2;
    const navY = y + (h - navH) / 2;

    ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.4)' : 'rgba(17, 27, 33, 0.35)';
    ctx.beginPath();
    this.roundRect(ctx, navX, navY, navW, navH, 2 * scale);
    ctx.fill();
    ctx.restore();
  }

  wrapText(ctx, text, maxWidth, font) {
    ctx.font = font;
    const words = (text || '').split(' ');
    const lines = [];
    let currentLine = '';

    for (let n = 0; n < words.length; n++) {
      const testLine = currentLine + (currentLine ? ' ' : '') + words[n];
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && n > 0) {
        lines.push(currentLine);
        currentLine = words[n];
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) lines.push(currentLine);
    return lines.length > 0 ? lines : [''];
  }

  /**
   * Export to PNG Sequence (ZIP) up to 4K
   */
  async exportPNGSequence(messages, settings, options, onProgress) {
    this.isExporting = true;
    this.shouldCancel = false;

    const width = options.width || 1080;
    const height = options.height || 1920;
    const fps = options.fps || 30;

    this.canvas.width = width;
    this.canvas.height = height;

    await this.preloadAllImages(settings);

    const timeline = this.buildTimeline(messages);
    const totalFrames = Math.ceil(timeline.totalDuration * fps);
    const zip = new SimpleZip();

    for (let frame = 0; frame < totalFrames; frame++) {
      if (this.shouldCancel) break;

      const t = frame / fps;
      this.renderFrame(t, messages, settings, width, height);

      // Extract PNG Uint8Array
      const blob = await new Promise(res => this.canvas.toBlob(res, 'image/png'));
      const buffer = await blob.arrayBuffer();
      const filename = `frame_${String(frame + 1).padStart(5, '0')}.png`;
      zip.addFile(filename, new Uint8Array(buffer));

      if (onProgress) {
        onProgress({
          frame: frame + 1,
          totalFrames: totalFrames,
          percentage: Math.round(((frame + 1) / totalFrames) * 100)
        });
      }

      // Small yield to keep UI responsive
      if (frame % 5 === 0) {
        await new Promise(r => setTimeout(r, 0));
      }
    }

    if (this.shouldCancel) {
      this.isExporting = false;
      return null;
    }

    const zipBlob = zip.generateBlob();
    this.isExporting = false;
    return zipBlob;
  }

  /**
   * Export to true MP4 using WebCodecs (VideoEncoder + AudioEncoder) & Mp4Muxer.
   * Renders deterministically frame-by-frame with zero dropped frames and ultra-smooth animations.
   */
  async exportMp4WebCodecs(messages, settings, options, onProgress) {
    this.isExporting = true;
    this.shouldCancel = false;

    // H.264 requires even dimensions
    let width = options.width || 1080;
    let height = options.height || 1920;
    width = width - (width % 2);
    height = height - (height % 2);
    const fps = options.fps || 30;
    const bitrate = options.bitrate || 14000000; // 14 Mbps for crisp HD/4K

    this.canvas.width = width;
    this.canvas.height = height;

    await this.preloadAllImages(settings);

    const timeline = this.buildTimeline(messages);
    const totalDuration = Math.max(0.5, timeline.totalDuration);
    const totalFrames = Math.max(1, Math.ceil(totalDuration * fps));

    // Detect supported H.264 video codec
    const candidateCodecs = [
      'avc1.4d002a', // Main Profile Level 4.2
      'avc1.640028', // High Profile Level 4.0
      'avc1.42001f', // Baseline Level 3.1
      'avc1.420028', // Baseline Level 4.0
      'avc1.4d001f',
      'avc1.42e01f'
    ];
    let selectedVideoCodec = null;
    for (const c of candidateCodecs) {
      try {
        const support = await VideoEncoder.isConfigSupported({
          codec: c,
          width,
          height,
          bitrate,
          framerate: fps
        });
        if (support && support.supported) {
          selectedVideoCodec = c;
          break;
        }
      } catch (e) {}
    }

    if (!selectedVideoCodec) {
      throw new Error("No supported H.264 VideoEncoder found on this browser.");
    }

    // Process audio tracks (Voice Notes + Message Sent/Received Sound Effects)
    const voiceEvents = timeline.events.filter(
      evt => evt.type === 'message_appear' && evt.msg.type === 'voice' && evt.msg.audioBlob
    );
    const messageAppearEvents = timeline.events.filter(
      evt => evt.type === 'message_appear'
    );
    const sfxEnabled = settings.sfxEnabled !== false;

    let audioEncoder = null;
    let renderedAudioBuffer = null;
    const sampleRate = 44100;

    if ((voiceEvents.length > 0 || (sfxEnabled && messageAppearEvents.length > 0)) && typeof AudioEncoder !== 'undefined') {
      try {
        const audioConfig = {
          codec: 'mp4a.40.2', // AAC-LC
          sampleRate: sampleRate,
          numberOfChannels: 2,
          bitrate: 128000
        };
        const audioSupport = await AudioEncoder.isConfigSupported(audioConfig);
        if (audioSupport && audioSupport.supported) {
          const totalSamples = Math.ceil(totalDuration * sampleRate);
          const offlineCtx = new (window.OfflineAudioContext || window.webkitOfflineAudioContext)(
            2,
            Math.max(1, totalSamples),
            sampleRate
          );

          let hasAudioContent = false;

          // 1. Voice Note Recordings
          for (const evt of voiceEvents) {
            try {
              const ab = await evt.msg.audioBlob.arrayBuffer();
              const buffer = await offlineCtx.decodeAudioData(ab.slice(0));
              const source = offlineCtx.createBufferSource();
              source.buffer = buffer;
              source.connect(offlineCtx.destination);
              source.start(evt.time);
              hasAudioContent = true;
            } catch (err) {
              console.warn("Could not decode audio for MP4 sync:", err);
            }
          }

          // 2. Real MP3 Message SFX — sounds/sent.mp3 + sounds/received.mp3
          if (sfxEnabled) {
            const decodeB64OrFetch = async (b64, fallbackPath) => {
              try {
                let ab = null;
                if (b64) {
                  const binaryString = atob(b64);
                  const len = binaryString.length;
                  const bytes = new Uint8Array(len);
                  for (let i = 0; i < len; i++) {
                    bytes[i] = binaryString.charCodeAt(i);
                  }
                  ab = bytes.buffer;
                } else {
                  const res = await fetch(fallbackPath);
                  if (res.ok) ab = await res.arrayBuffer();
                }
                if (ab) {
                  return await offlineCtx.decodeAudioData(ab.slice(0));
                }
              } catch (e) {
                console.warn("Export SFX decode error:", e);
              }
              return null;
            };

            const soundsData = (typeof window !== 'undefined' && window.STUDIO_SOUNDS_DATA) ? window.STUDIO_SOUNDS_DATA : {};
            const [sentBuf, receivedBuf] = await Promise.all([
              decodeB64OrFetch(soundsData.sent, 'sounds/sent.mp3'),
              decodeB64OrFetch(soundsData.received, 'sounds/received.mp3')
            ]);

            for (const evt of messageAppearEvents) {
              const isSender = evt.msg.sender === 'sender';
              const tEvent   = Math.max(0, evt.time);
              const buf      = isSender ? sentBuf : receivedBuf;

              if (buf) {
                const src  = offlineCtx.createBufferSource();
                const gain = offlineCtx.createGain();
                src.buffer = buf;
                gain.gain.setValueAtTime(isSender ? 0.9 : 0.95, tEvent);
                src.connect(gain);
                gain.connect(offlineCtx.destination);
                src.start(tEvent);
                hasAudioContent = true;
              }
            }
          }

          if (hasAudioContent) {
            renderedAudioBuffer = await offlineCtx.startRendering();
          }
        }
      } catch (err) {
        console.warn("AudioEncoder check failed:", err);
      }
    }

    // Initialize MP4 Muxer
    const muxerOptions = {
      target: new Mp4Muxer.ArrayBufferTarget(),
      video: {
        codec: 'avc',
        width: width,
        height: height
      },
      fastStart: 'in-memory',
      firstTimestampBehavior: 'offset'
    };

    if (renderedAudioBuffer) {
      muxerOptions.audio = {
        codec: 'aac',
        numberOfChannels: 2,
        sampleRate: sampleRate
      };
    }

    const muxer = new Mp4Muxer.Muxer(muxerOptions);
    const frameDurationMicros = Math.round((1 / fps) * 1000000);

    let encoderError = null;
    const videoEncoder = new VideoEncoder({
      output: (chunk, meta) => {
        try {
          const chunkData = new Uint8Array(chunk.byteLength);
          chunk.copyTo(chunkData);
          const chunkDur = (Number.isFinite(chunk.duration) && chunk.duration > 0)
            ? chunk.duration
            : frameDurationMicros;
          muxer.addVideoChunkRaw(chunkData, chunk.type, chunk.timestamp, chunkDur, meta);
        } catch (e) {
          console.error("VideoEncoder output error:", e);
          encoderError = e;
        }
      },
      error: (e) => {
        console.error("VideoEncoder error:", e);
        encoderError = e;
      }
    });

    videoEncoder.configure({
      codec: selectedVideoCodec,
      width: width,
      height: height,
      bitrate: bitrate,
      framerate: fps,
      avc: { format: 'avc' }
    });

    // Encode audio data if voice notes are present
    if (renderedAudioBuffer) {
      audioEncoder = new AudioEncoder({
        output: (chunk, meta) => {
          try {
            const chunkData = new Uint8Array(chunk.byteLength);
            chunk.copyTo(chunkData);
            const chunkDur = (Number.isFinite(chunk.duration) && chunk.duration > 0)
              ? chunk.duration
              : Math.round((1024 / sampleRate) * 1000000);
            muxer.addAudioChunkRaw(chunkData, chunk.type, chunk.timestamp, chunkDur, meta);
          } catch (e) {
            console.error("Audio chunk error:", e);
          }
        },
        error: (e) => {
          console.error("AudioEncoder error:", e);
        }
      });

      audioEncoder.configure({
        codec: 'mp4a.40.2',
        sampleRate: sampleRate,
        numberOfChannels: 2,
        bitrate: 128000
      });

      const numFrames = renderedAudioBuffer.length;
      const ch0 = renderedAudioBuffer.getChannelData(0);
      const ch1 = renderedAudioBuffer.numberOfChannels > 1 ? renderedAudioBuffer.getChannelData(1) : ch0;
      const chunkSize = 1024;
      let offset = 0;

      while (offset < numFrames) {
        if (this.shouldCancel) break;
        const framesInChunk = Math.min(chunkSize, numFrames - offset);
        const planar = new Float32Array(framesInChunk * 2);
        planar.set(ch0.subarray(offset, offset + framesInChunk), 0);
        planar.set(ch1.subarray(offset, offset + framesInChunk), framesInChunk);

        const timestampMicros = Math.round((offset / sampleRate) * 1000000);
        const audioData = new AudioData({
          format: 'f32-planar',
          sampleRate: sampleRate,
          numberOfFrames: framesInChunk,
          numberOfChannels: 2,
          timestamp: timestampMicros,
          data: planar
        });

        audioEncoder.encode(audioData);
        audioData.close();
        offset += framesInChunk;
      }

      await audioEncoder.flush();
    }

    // Deterministic Frame-by-Frame Rendering: 0 dropped frames!
    for (let frameIndex = 0; frameIndex < totalFrames; frameIndex++) {
      if (this.shouldCancel || encoderError) {
        videoEncoder.close();
        if (audioEncoder) audioEncoder.close();
        this.isExporting = false;
        if (encoderError) throw encoderError;
        return null;
      }

      const t = frameIndex / fps;
      this.renderFrame(t, messages, settings, width, height);

      const timestampMicros = Math.round(t * 1000000);
      const isKeyFrame = frameIndex % (fps * 2) === 0;

      const vFrame = new VideoFrame(this.canvas, {
        timestamp: timestampMicros,
        duration: frameDurationMicros
      });
      videoEncoder.encode(vFrame, { keyFrame: isKeyFrame });
      vFrame.close();

      // Encoder backpressure protection
      if (videoEncoder.encodeQueueSize > 8) {
        await new Promise(r => setTimeout(r, 6));
      }

      if (onProgress) {
        onProgress({
          frame: frameIndex + 1,
          totalFrames: totalFrames,
          currentTime: t,
          totalDuration: totalDuration,
          percentage: Math.min(100, Math.round(((frameIndex + 1) / totalFrames) * 100))
        });
      }

      // Yield event loop
      if (frameIndex % 6 === 0) {
        await new Promise(r => setTimeout(r, 0));
      }
    }

    await videoEncoder.flush();
    videoEncoder.close();
    if (audioEncoder) {
      audioEncoder.close();
    }

    muxer.finalize();
    const mp4Blob = new Blob([muxer.target.buffer], { type: 'video/mp4' });
    this.isExporting = false;

    return {
      blob: mp4Blob,
      mimeType: 'video/mp4'
    };
  }

  /**
   * MediaRecorder fallback export (or for VP8/VP9 Transparent Alpha video)
   */
  async exportVideoMediaRecorder(messages, settings, options, onProgress) {
    this.isExporting = true;
    this.shouldCancel = false;

    const width = options.width || 1080;
    const height = options.height || 1920;
    const fps = options.fps || 30;
    const isTransparent = settings.backgroundType === 'transparent';

    this.canvas.width = width;
    this.canvas.height = height;

    await this.preloadAllImages(settings);

    const timeline = this.buildTimeline(messages);
    const totalDuration = timeline.totalDuration;
    const totalFrames = Math.max(1, Math.ceil(totalDuration * fps));

    // Determine supported mime type
    let mimeType = 'video/webm;codecs=vp9';
    if (!isTransparent) {
      if (MediaRecorder.isTypeSupported('video/mp4;codecs=avc1')) {
        mimeType = 'video/mp4;codecs=avc1';
      } else if (MediaRecorder.isTypeSupported('video/mp4')) {
        mimeType = 'video/mp4';
      }
    } else {
      if (MediaRecorder.isTypeSupported('video/webm;codecs=vp8')) {
        mimeType = 'video/webm;codecs=vp8';
      }
    }

    // Set up canvas stream (0 for manual frame requests to preserve frame rate regardless of render lag)
    const canvasStream = this.canvas.captureStream(0);
    const videoTrack = canvasStream.getVideoTracks()[0];

    // Set up audio mixing stream
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const dest = audioCtx.createMediaStreamDestination();

    // Schedule audio playback for each voice note in sync with video
    const scheduledAudios = [];
    for (const evt of timeline.events) {
      if (evt.type === 'message_appear' && evt.msg.type === 'voice' && evt.msg.audioBlob) {
        try {
          const ab = await evt.msg.audioBlob.arrayBuffer();
          const buffer = await audioCtx.decodeAudioData(ab.slice(0));
          scheduledAudios.push({
            time: evt.time,
            buffer: buffer
          });
        } catch (e) {
          console.warn("Could not decode audio for recording sync:", e);
        }
      }
    }

    // Combine video track + audio track
    const tracks = [...canvasStream.getVideoTracks()];
    if (dest.stream.getAudioTracks().length > 0) {
      tracks.push(...dest.stream.getAudioTracks());
    }
    const combinedStream = new MediaStream(tracks);

    const recorder = new MediaRecorder(combinedStream, {
      mimeType: MediaRecorder.isTypeSupported(mimeType) ? mimeType : 'video/webm',
      videoBitsPerSecond: options.bitrate || 20000000 // 20 Mbps for high fidelity
    });

    const chunks = [];
    recorder.ondataavailable = e => {
      if (e.data.size > 0) chunks.push(e.data);
    };

    recorder.start(100);

    let audioPlayedIndices = new Set();
    const frameIntervalMs = Math.max(15, Math.round(1000 / fps));

    for (let frameIndex = 0; frameIndex < totalFrames; frameIndex++) {
      if (this.shouldCancel) break;

      const t = frameIndex / fps;

      // Trigger scheduled audio nodes into destination
      scheduledAudios.forEach((item, idx) => {
        if (!audioPlayedIndices.has(idx) && t >= item.time) {
          audioPlayedIndices.add(idx);
          const source = audioCtx.createBufferSource();
          source.buffer = item.buffer;
          source.connect(dest);
          source.start();
        }
      });

      // Trigger message SFX — real MP3 only (sounds/sent.mp3 + sounds/received.mp3)
      if (settings.sfxEnabled !== false) {
        timeline.events.forEach((evt, idx) => {
          if (evt.type === 'message_appear' && !audioPlayedIndices.has(`sfx_${idx}`) && t >= evt.time) {
            audioPlayedIndices.add(`sfx_${idx}`);
            const isSender = evt.msg.sender === 'sender';
            const am  = this.app && this.app.audioManager;
            const buf = am ? (isSender ? am.sentSfxBuffer : am.receivedSfxBuffer) : null;

            if (buf) {
              const src  = audioCtx.createBufferSource();
              const gain = audioCtx.createGain();
              src.buffer = buf;
              gain.gain.setValueAtTime(isSender ? 0.8 : 0.85, audioCtx.currentTime);
              src.connect(gain);
              gain.connect(dest);
              src.start();
            }
          }
        });
      }

      this.renderFrame(t, messages, settings, width, height);

      if (videoTrack && videoTrack.requestFrame) {
        videoTrack.requestFrame();
      }

      if (onProgress) {
        onProgress({
          frame: frameIndex + 1,
          totalFrames: totalFrames,
          currentTime: t,
          totalDuration: totalDuration,
          percentage: Math.min(100, Math.round(((frameIndex + 1) / totalFrames) * 100))
        });
      }

      // Yield for recording pacing
      await new Promise(r => setTimeout(r, frameIntervalMs));
    }

    return new Promise((resolve) => {
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: recorder.mimeType });
        this.isExporting = false;
        resolve({ blob, mimeType: recorder.mimeType });
      };
      recorder.stop();
    });
  }

  /**
   * Main export video method:
   * Defaults to deterministic MP4 via WebCodecs + Mp4Muxer for flawless smooth animation.
   * Gracefully falls back to MediaRecorder if WebCodecs is unavailable or transparent video is requested.
   */
  async exportVideo(messages, settings, options, onProgress) {
    const isTransparent = settings.backgroundType === 'transparent';
    const canUseWebCodecs = typeof VideoEncoder !== 'undefined' && typeof Mp4Muxer !== 'undefined';

    if (!isTransparent && canUseWebCodecs) {
      try {
        const result = await this.exportMp4WebCodecs(messages, settings, options, onProgress);
        if (result) return result;
      } catch (err) {
        console.warn("WebCodecs MP4 export encountered an issue, falling back to MediaRecorder:", err);
      }
    }

    return await this.exportVideoMediaRecorder(messages, settings, options, onProgress);
  }
}

window.AnimationRenderer = AnimationRenderer;
