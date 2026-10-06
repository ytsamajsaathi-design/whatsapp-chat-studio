# 💬 WhatsApp Voice & Chat Animated Video Studio (ElevenLabs v4)

A complete, high-fidelity browser-based animation workflow for generating realistic **WhatsApp chat conversation sequences** with synchronized **voice notes**, **ElevenLabs flagship `eleven_v4` AI voiceover engine**, **expressive audio prompt tags**, **dialogue delivery speed / speech pacing controls**, **responsive collapsible sidebar**, **Google Sheets / CSV pipeline sync**, and **up to 4K video & PNG sequence exports**.

---

## 🌟 Key Features

1. **Pixel-Perfect WhatsApp Chat Animations**:
   - Distinct, authentic message bubbles for **Sender** (custom green bubble on right with read receipt ticks) and **Receiver** (custom white bubble on left).
   - Authentic SVG tails, responsive word wrapping, and timestamps.
   - Realistic **WhatsApp Voice Message Note UI**:
     - Circular play/pause button.
     - Dynamic audio waveform bars that highlight in sync with playback.
     - Profile thumbnail with tiny microphone icon.
     - Duration counter and `1x` playback speed indicator.
   - **Typing Indicator**:
     - 3-dot bouncing animation bubble.
     - Real-time status update in top bar (`typing...` or `recording audio...`).

2. **Sole AI Voiceover Engine: ElevenLabs (`eleven_v4`)**:
   - **Flagship Model**: `eleven_v4` with expressive emotional depth, fine-grained audio prompt tags, natural dialogue prosody, and support for over 70 languages.
   - **🏷️ Expressive Audio Prompt Tags (Sidebar Adjacent)**:
     - Direct one-click insertion of emotion and vocal delivery tags right above each message transcript / prompt:
       - `[whispering]`, `[shouting]`, `[laughing]`, `[sighs]`, `[gasping]`, `[excited]`, `[angry]`, `[crying]`, `[pause]`, and `+ More ▾`.
     - Full categorized tag library popover covering Tone & Emotion, Vocal Actions & Delivery, and Pacing & Cadence.
     - Global quick-tag chips in the sidebar header with copy-to-clipboard feedback.
     - Smart cleaning for browser TTS fallback so brackets are never spoken aloud.
   - **Full Model Suite**:
     - `eleven_v4`: 🔥 Latest Flagship model (Expressive Audio Tags, deep emotional nuance & prosody)
     - `eleven_v3`: ⚡ Eleven v3 (Flagship 70+ languages, emotional depth)
     - `eleven_v3_conversational`: ⚡ Real-time conversational dialogue model (~280ms latency)
     - `eleven_multilingual_v2`: 🌐 High-stability multilingual speech across 29 languages
     - `eleven_flash_v2_5`: ⚡ Ultra-low latency (~75ms), 32 languages, ideal for real-time video
     - `eleven_flash_v2`: ⚡ Lightweight streaming model
     - `eleven_turbo_v2_5`: 🚀 High-speed & high-quality synthesis
     - `eleven_turbo_v2`: 🚀 Fast English & multilingual model
     - `eleven_multilingual_v1`: 📜 Classic multilingual model
     - `eleven_monolingual_v1`: 📜 Classic English model
   - **⏩ Dialogue Delivery Speed & Speech Pacing Controls**:
     - Adjustable speech delivery speed slider from **`0.70x` (Slower / Deliberate)** to **`1.20x` (Faster / Dynamic)**.
     - Quick preset buttons: `0.80x` (Calm / Dramatic), `1.00x` (Natural / Standard), `1.10x` (Brisk / Energetic), `1.20x` (Rapid / Urgent).
     - Passed directly to ElevenLabs API via `voice_settings.speed` to control pronunciation pacing, sentence rhythm, and pause timing.
   - **🌐 Language Override (ON by Default)**:
     - Enforces strict language normalization, native accents, and pronunciation rules in `eleven_v4` & `eleven_v3` (especially for Indian languages like Hindi `hi`, Indian English `en`, Tamil `ta`, Telugu `te`, Bengali `bn`, Marathi `mr`, Gujarati `gu`, Kannada `kn`, Malayalam `ml`, Punjabi `pa`).
   - **📚 Voice Library Browser ([elevenlabs.io/app/voice-library](https://elevenlabs.io/app/voice-library))**:
     - Integrated in-app browser for discovering community voices and professional voice clones.
     - Category & accent filters (Indian & South Asian, Conversational, Storytelling, Professional).
     - Direct URL / Voice ID loader: Paste any link from `elevenlabs.io/app/voice-library/voice/{id}` or raw ID and load it instantly.
     - Audio sample playback and 1-click **🎯 Use in Pipeline** or **➕ Add to Account**.
   - **Account Voice Sync**: Click **🔄 Fetch My Voices** to load all cloned and library voices from your ElevenLabs account.
   - **Character Voiceover Personas**:
     - Designated **🟢 Sender Voice (Person A)** & **🔵 Receiver Voice (Person B)**.
     - All Sender voice messages automatically inherit Person A's voice actor!
     - All Receiver voice messages automatically inherit Person B's voice actor!
     - Per-message voice override available directly in the pipeline cards.
   - **⚡ 1-Click Batch Audio Generation**: Generate all voice notes across your whole conversation in one click.
   - **Built-in Zero-Config Fallback**: Web Speech API synthesizer generates voice notes immediately even without API keys.

3. **📱 Responsive Home Page Sidebar**:
   - Collapsible desktop layout: Hide or collapse sidebar with topbar toggle `◀ Hide Sidebar` or chevron icon `◀ Collapse`.
   - Floating action pill button (`▶ Show Sequence`) to restore the sidebar at any time.
   - Smooth slide-over drawer navigation on tablets and mobile screens (`<= 992px`) with animated backdrop overlay.

4. **Contact Look & Profile Photos (Contact, Sender Person A, Receiver Person B)**:
   - **📸 Contact Profile Photo (Chat Header)**: Upload any custom image file (JPG, PNG, WebP), paste an image URL, or pick from modern zero-latency SVG avatar presets. Renders on the mobile top bar and in all 4K video exports.
   - **🟢 Sender Profile Photo (Person A)**: Custom avatar for Person A rendered in the right-side voice message circular thumbnail with the iconic green microphone badge.
   - **🔵 Receiver Profile Photo (Person B)**: Custom avatar for Person B rendered in the left-side voice message circular thumbnail.
   - **🔄 1-Click Sync**: Convenient "Sync Contact" button to immediately duplicate Contact Look header photo onto Receiver Person B.
   - **Toolbar Avatar Chips & Quick Triggers**: Click the mini avatar chips in the toolbar or click the chat header avatar directly to immediately open the photo manager.

5. **User Inputs Pipeline & Google Sheets / CSV Sync**:
   - Visual timeline pipeline: Add, remove, reorder, duplicate, and toggle text vs voice notes with one click.
   - Adjust typing delay before each message pops in.
   - **Google Sheets / Excel CSV Export**: Download the conversation script with one click.
   - **CSV Import**: Upload updated dialogue files to immediately refresh the animation timeline.
   - **In-App Spreadsheet Grid**: Interactive editable table directly in the browser.

6. **Multi-Format Export (Up to 4K Ultra HD)**:
   - **MP4 / WebM Video**: Synchronized voice notes and sound effects.
   - **Transparent MOV / WebM (Alpha Channel)**: Transparent background ready for video editors.
   - **4K PNG Image Sequences (ZIP)**: Frame-by-frame 4K PNG sequence (up to 2160x3840 or 3840x2160) for import into Adobe Premiere Pro, DaVinci Resolve, After Effects, Final Cut Pro, or CapCut.
   - Aspect Ratios:
     - `9:16 Vertical (1080x1920 / 2160x3840)`: Shorts, TikTok, Instagram Reels.
     - `16:9 Landscape (1920x1080 / 3840x2160)`: YouTube long-form video.
     - `1:1 Square (1080x1080 / 2160x2160)`: Feed posts.

---

## 🌐 Browsing Voices at ElevenLabs Voice Library (`elevenlabs.io/app/voice-library`)

1. **In-App Explorer**: Click **🎙️ ElevenLabs Voices (v4)** and click **📚 Browse Voice Library**.
2. **Filter & Search**: Search by name, accent (e.g. Hindi, Indian, Conversational), or filter by categories.
3. **Audio Previews**: Click **🔊 Preview** on any voice card to hear high-fidelity audio samples.
4. **Direct URL Import**: Found a voice on [elevenlabs.io/app/voice-library](https://elevenlabs.io/app/voice-library)? Copy the link and paste it into the **Direct Voice Import** field.
5. **Instant Use**: Click **🎯 Use in Pipeline** to immediately assign the voice to your WhatsApp voice notes!

---

## 🚀 Setting Up ElevenLabs (`eleven_v4`)

### Step 1: Get Your ElevenLabs API Key
1. Go to **[elevenlabs.io](https://elevenlabs.io)** and log into your account.
2. Click your profile icon at the bottom left and copy your **API Key** (`xi-api-key`).

### Step 2: Configure in the Studio
1. Open the studio and click **🎙️ ElevenLabs Voices (v4)** in the top navigation.
2. Paste your API key and click **🔄 Fetch My Voices**.
3. All your voices (cloned voices, Indian voices, and library voices) will load into the dropdown.
4. The model is automatically set to **`eleven_v4`** (Latest Flagship).
5. **🏷️ Expressive Audio Prompt Tags**:
   - In each message card on the sidebar, click tags such as `🤫 whisper`, `📢 shout`, `😂 laugh`, `😮‍💨 sighs`, `⏸️ pause`, or `+ More ▾` to insert expressive speech direction into your transcript.
6. **⏩ Dialogue Delivery Speed**:
   - Adjust the speed slider between `0.70x` and `1.20x` (default `1.00x`) or click one of the quick presets (`0.80x`, `1.00x`, `1.10x`, `1.20x`).
7. **🌐 Language Override Option**:
   - **Status**: **🟢 ON by default**.
   - **Purpose**: Enforces strict language normalization, native accents, and pronunciation rules in `eleven_v4` & `eleven_v3` (especially for Hindi `hi`, Indian English `en`, Tamil `ta`, Telugu `te`, etc.).
   - **Language Selection**: Choose from Indian languages (Hindi, English, Tamil, Telugu, Bengali, Marathi, Gujarati, Kannada, Malayalam, Punjabi), global languages (Spanish, French, German, Japanese, Arabic), or use automatic script detection.
8. Click **Save & Apply**.

---

## 🏃 How to Run the Studio

### Option 1: Direct File Opening
Double-click `index.html` or drag it into Chrome, Edge, Safari, or Brave.

### Option 2: Local HTTP Server (Recommended)
Run the launcher:
```bash
./start.sh
```
Or with Python:
```bash
python3 -m http.server 3000
```
Then open: **`http://localhost:3000`**

---

## 📊 Google Sheets & CSV Workflow

1. Click **📊 Sheets / CSV** in the top bar.
2. Click **📥 Download for Google Sheets / Excel (.csv)**.
3. Open the file in Google Sheets or Excel to edit dialogues, timings, senders, and delays in bulk.
4. When finished, save as `.csv` and click **📤 Import CSV from Sheets** to instantly load your updated script!

---

## 🎬 Video Editor Timeline Import Tips

- **Premiere Pro / DaVinci Resolve (PNG Sequence)**:
  - Extract the downloaded ZIP file.
  - In Premiere / DaVinci, go to `File > Import`.
  - Select the first image `frame_00001.png` and check the box **"Image Sequence"**.
  - Drop onto the timeline and choose your frame rate (30fps or 60fps).
