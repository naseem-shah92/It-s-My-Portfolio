# Aaban Shah — Portfolio (React + TypeScript + Vite)

## Run locally

```bash
npm install
npm run dev
```

Open the URL it prints (usually http://localhost:5173).

## Build for production

```bash
npm run build
```

Type-checks the whole project (`tsc -b`) then builds to `dist/`.

## Deploy to Netlify

1. Push this folder to a GitHub repo
2. On Netlify: **New site from Git** → pick the repo
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Deploy

## Project structure

```
index.html
src/
  main.tsx              -> app entry point
  App.tsx                -> top-level layout
  style.css               -> all styles
  data.ts                  -> services & works content (typed)
  elevenlabs.d.ts           -> TS declaration for <elevenlabs-convai>
  assets/images.ts           -> embedded photo + project screenshots (base64)
  hooks/useScrollReveal.ts    -> IntersectionObserver reveal-on-scroll hook
  components/
    Preloader.tsx    -> black intro, scroll/click/key/timeout triggered reveal
    Nav.tsx
    Hero.tsx
    Marquee.tsx
    Services.tsx
    Works.tsx
    VoiceAgentWidget.tsx  -> ElevenLabs Conversational AI widget, global
```

## What's implemented

- Full React + TypeScript rebuild - zero plain JavaScript, zero `any`
- Hero (headline reveal, photo wipe-reveal)
- Preloader - reveals on scroll/click/keypress, 4.5s safety fallback
- Scroll-triggered reveal animations across every section
- Services (editorial hover list)
- Works (4 live projects with real screenshots)
- ElevenLabs voice agent widget - loads globally, appears on every page

## Next up

- Contact section
