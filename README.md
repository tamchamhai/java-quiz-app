# Java Ticket Station Quiz App (Angular SSR)

A modern, high-performance quiz application designed for mastering Java Core, OOP, Multi-threading, Memory Management, and Backend Architecture for the Ticket Station project.

Built with **Angular 21**, **Server-Side Rendering (SSR)** via `@angular/ssr` and Express, **Angular Signals**, and **Tailwind CSS**.

---

## Features

- **Server-Side Rendering (SSR) & Static Site Generation (SSG)**: Fast initial page load with pre-rendered HTML and client hydration.
- **Angular Signals Architecture**: Modern, granular reactive state management using Angular `signal` and `computed`.
- **6 Milestones & 12 Specialized Modules**: Complete roadmap covering Java Core syntax, Collections, Concurrency, Virtual Threads, Spring Boot, PostgreSQL, and distributed caching.
- **Practice Mode & Exam Mode**:
  - *Practice Mode*: Real-time feedback, detailed explanations, syllabus links, and bookmarks.
  - *Exam Mode*: Timed quiz sessions, score calculations, rank classifications, and celebratory confetti.
- **Offline & Local Storage Persistence**: Seamless progress tracking with SSR-safe browser storage hydration.
- **Tailwind CSS & Responsive Layout**: Clean dark-theme interface with mobile navigation drawer.

---

## Getting Started

### Prerequisites

- Node.js `^20.0.0` or `^22.0.0` or `^24.0.0`
- npm `^10.0.0` or `^11.0.0`

### Installation

```bash
npm install
```

### Development Server

Run the development server on `http://localhost:5173`:

```bash
npm start
# or
npx ng serve
```

### Production Build (SSR)

Build both browser bundles and server bundles:

```bash
npm run build
```

Artifacts are compiled into `dist/java-quiz-app/`.

### Run SSR Server

Start the Node.js Express SSR server on `http://localhost:5173`:

```bash
npm run serve
# or
npm run serve:ssr
```

---

## Project Structure

```text
src/
├── app/
│   ├── components/
│   │   ├── header.component.{ts,html,css}         # Header with mode switcher, timer, filter & search
│   │   ├── icon.component.{ts,html,css}           # Standalone SVG icon system
│   │   ├── quiz-card.component.{ts,html,css}      # Interactive question card with code snippets & feedback
│   │   ├── quiz-results.component.{ts,html,css}   # Scorecard, accuracy analytics & rank classification
│   │   ├── sidebar.component.{ts,html,css}        # Roadmap milestones & module subtopic accordions
│   │   └── theory-modal.component.{ts,html,css}   # Reference curriculum & theory modal dialog
│   ├── services/
│   │   └── quiz-progress.service.ts               # Central Angular Signal state & SSR-safe persistence
│   ├── app.component.{ts,html,css}                # Main application layout shell
│   ├── app.config.ts                              # Client application providers & hydration
│   └── app.config.server.ts                       # Server-side rendering providers
├── data/
│   ├── milestones-data.ts              # 6 Milestones syllabus quiz questions
│   └── modules-data.ts                 # 12 Modules detailed questions & subtopic taxonomy
├── types/
│   └── quiz.ts                         # Core TypeScript interfaces & types
├── index.html                          # Root HTML template
├── main.ts                             # Client bootstrapping entry point
├── main.server.ts                      # Server-side bootstrapping entry point
├── server.ts                           # Express engine server for SSR
└── styles.css                          # Global styles & Tailwind CSS imports
```
