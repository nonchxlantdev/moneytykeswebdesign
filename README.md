# MoneyTykes Website

A premium, interactive React website for MoneyTykes — Belize's family fintech platform teaching kids smart money habits.

## Tech Stack

- React 19 + TypeScript + Vite
- TailwindCSS 4
- Framer Motion + GSAP + Lenis
- React Three Fiber (3D phone carousel)
- React CountUp, React Icons

## Repository

Canonical repo: [github.com/moneytykes/website](https://github.com/moneytykes/website)

Live site: [moneytykes.github.io/website](https://moneytykes.github.io/website/)

## Getting Started

```bash
npm install
npm run dev
```

If `npm install` fails with an SSL certificate error on Windows, run:

```powershell
$env:NODE_OPTIONS = "--use-system-ca"
npm install
```

Open [http://localhost:5173](http://localhost:5173)

## Build

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
  components/   # UI, layout, 3D components
  sections/     # Page sections (Hero, Features, etc.)
  pages/        # Page compositions
  hooks/        # Custom hooks (Lenis, magnetic, tilt, theme)
  animations/   # Framer Motion variants
  data/         # Static content data
```

## Features

- 3D phone carousel with floating coins (React Three Fiber)
- Interactive family journey flow
- Animated kids & parent dashboards
- Belize vendor map with hover pins
- Sponsor tiers with infinite logo scroll
- Animated statistics counters
- Glassmorphism navigation
- Custom cursor & mouse trail
- Dark/light mode toggle
- Loading screen with progress
- Confetti on CTA click
- Smooth scroll (Lenis + GSAP)
