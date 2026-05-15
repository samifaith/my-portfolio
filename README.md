# Sam DeCoteau — Portfolio

A scroll-driven, animation-heavy portfolio showcasing work across writing, product design, development, and visual systems. Built with React + Vite and custom CSS — no UI framework dependencies on the portfolio core.

## Features

- **Full-screen hero** — GSAP pointer-parallax venn diagram with scroll-scale effect and animated ribbon ticker
- **Scroll-pinned project viewer** — GSAP ScrollTrigger pin with scrubbed clip-path layer transitions and snap-to-section
- **Enterprise work section** — Dedicated AESARA Inc. case studies extracted as a standalone component
- **Case study modals** — Full-screen project detail overlays with prev/next navigation
- **Writing archive** — Individual story pages with rich typography, PDF embeds, and audio players
- **Animated home** — GSAP timeline with typed intro, headshot reveal, and vertical scroll timeline
- **Nav filter portal** — Jump-to-section controls rendered into the desktop nav via React portal

## Tech Stack

- **Frontend**: React 19, React Router 7
- **Animation**: GSAP 3 (ScrollTrigger, ScrollToPlugin, MotionPathPlugin)
- **Styling**: Custom CSS (component-scoped), MUI for writing/story pages
- **Icons**: Lucide React
- **Build**: Vite

## Project Structure

```
src/
├── components/
│   ├── Menu.jsx                    # Desktop/mobile nav with filter portal slot
│   ├── FeaturedProjects.jsx        # Full-screen hero — venn diagram, ribbon ticker
│   ├── EnterpriseWork.jsx          # AESARA Inc. enterprise case studies
│   ├── VerticalTimeline.jsx        # Home page scroll timeline
│   ├── ProjectCard.jsx             # Reusable project card
│   ├── ProjectCaseStudyModal.jsx   # Full-screen case study overlay
│   ├── ScrollIndicator.jsx         # Home scroll prompt
│   ├── DrawLetters.jsx             # GSAP letter-draw signature
│   └── MadeByMeHand.jsx            # Hand-drawn credit section
├── pages/
│   ├── AnimatedHomePage.jsx        # GSAP-driven landing experience
│   ├── ExpertisePage.jsx           # Scroll-pinned portfolio viewer
│   ├── ExpertisePageArchived.jsx   # Legacy writing grid
│   └── WritingPage.jsx             # Individual story detail pages
├── development/
│   └── Wander.jsx                  # Wanderlust case study
├── styles/
│   ├── FeaturedProjects.css        # Hero section styles
│   ├── ExpertisePrototype.css      # Expertise page + enterprise section styles
│   └── ...
├── constants/
│   └── WritingPieces.js            # Writing content data
└── App.jsx                         # Routes
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Content

### Adding a project to the expertise viewer

Add an entry to `baseSections` in [ExpertisePage.jsx](src/pages/ExpertisePage.jsx):

```js
{
  id: "project-id",
  title: "Project Title",
  description: "Short description.",
  image: "/path/to/image.webp",   // or use video: "/path/to/clip.mp4"
  label: "Writing | Development | Design | Media",
  route: "/expertise-archived/story-id",  // or external URL
  bg: "#e7ddd2",
  tools: ["Tool A", "Tool B"],
  study: {
    purpose: "...",
    role: "...",
    direction: "...",
  },
}
```

### Adding a writing piece

Add to `src/constants/WritingPieces.js`:

```js
"story-slug": {
  title: "Title",
  subtitle: "Subtitle",
  content: `...`,
  audioFile: "/writing/file.mp3",   // optional
  coverImage: "/writing/cover.png", // optional
  pdfFile: "/writing/article.pdf",  // optional
}
```

## Scripts

```bash
npm run dev       # Development server
npm run build     # Production build
npm run preview   # Preview production build
npm test          # Run tests
```

## Deployment

The site is deployed via **Vercel**. Pushes to `main` trigger automatic deployments. Build command: `npm run build`, output directory: `dist`.
