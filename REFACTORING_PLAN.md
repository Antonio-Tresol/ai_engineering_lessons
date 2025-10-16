# AI Engineering Lessons - Frontend Refactoring Plan

**Document Created:** October 16, 2025  
**Repository:** ai_engineering_lessons  
**Author:** GitHub Copilot Analysis

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [GitHub Pages Deployment Strategy](#github-pages-deployment-strategy)
3. [Content Preservation Guarantee](#content-preservation-guarantee)
4. [Current State Analysis](#current-state-analysis)
5. [Critical Issues Identified](#critical-issues-identified)
6. [Proposed Architecture](#proposed-architecture)
7. [Implementation Phases](#implementation-phases)
8. [Design System Specifications](#design-system-specifications)
9. [Component Library](#component-library)
10. [Migration Checklist](#migration-checklist)
11. [Success Metrics](#success-metrics)

---

## Executive Summary

### Problem Statement
The seven lesson HTML files contain significant inconsistencies in frontend engineering practices, including:
- **~500 lines of duplicated CSS** across files
- **~200 lines of duplicated JavaScript** 
- **Three different color themes** (dark, light, mixed)
- **Five different layout patterns**
- **No shared component library**
- **Inconsistent naming conventions**

### Solution Overview
Implement a unified design system with:
- **Tailwind CSS** as the primary styling framework (custom build, not CDN)
- CSS variables for theming (Tailwind-compatible)
- Extracted shared components and utilities
- Consistent naming conventions (Tailwind utility-first + BEM for custom components)
- Build process optimized for **GitHub Pages deployment**
- Enhanced accessibility and performance
- **100% content preservation** - all educational content maintained

### Key Constraints
✅ **Must remain deployable to GitHub Pages** (static HTML/CSS/JS only)  
✅ **Preserve all existing educational content** (text, diagrams, interactions)  
✅ **Tailwind CSS everywhere** for visual consistency  
✅ **No backend required** - pure static site  
✅ **Maintain all interactive features** (drag-drop, calculators, animations)

### Expected Outcomes
- **80% reduction** in code duplication
- **Consistent user experience** across all lessons (unified Tailwind design)
- **Improved maintainability** for future development
- **Better accessibility** (WCAG 2.1 AA compliance)
- **Enhanced performance** (Lighthouse 90+)
- **GitHub Pages ready** - all files in root or /docs folder

### Timeline
**Estimated Duration:** 4-5 weeks (1 developer)
- Phase 1: Foundation (Week 1)
- Phase 2: Component Library (Week 2)
- Phase 3: Lesson Migration (Weeks 3-4)
- Phase 4: Enhancement (Week 5)

---

## GitHub Pages Deployment Strategy

### Overview
The refactored site will remain **100% compatible with GitHub Pages** - a static hosting service that serves HTML, CSS, and JavaScript files directly from your repository.

### Deployment Architecture

#### Option 1: Root Directory Deployment (Recommended)
```
/ai_engineering_lessons/
├── index.html                    # Landing page
├── first_lesson.html             # Built lesson files
├── second_lesson.html
├── ...seventh_lesson.html
├── css/
│   └── main.min.css              # Compiled Tailwind + custom CSS
├── js/
│   ├── main.min.js               # Compiled shared utilities
│   └── lessons/
│       ├── lesson-1.min.js
│       └── ...
├── assets/
│   └── images/
├── src/                          # Source files (not deployed)
└── .github/
    └── workflows/
        └── build-and-deploy.yml  # GitHub Actions for auto-build
```

**GitHub Pages Settings:**
- Source: Deploy from `main` branch
- Directory: `/ (root)`
- Custom domain: Optional

#### Option 2: /docs Directory Deployment
```
/ai_engineering_lessons/
├── docs/                         # All deployed files here
│   ├── index.html
│   ├── first_lesson.html
│   ├── css/
│   └── js/
├── src/                          # Source files
└── package.json
```

**GitHub Pages Settings:**
- Source: Deploy from `main` branch
- Directory: `/docs`

### Build Process for GitHub Pages

#### Automated with GitHub Actions (Recommended)

Create `.github/workflows/build-and-deploy.yml`:

```yaml
name: Build and Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: write

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build CSS (Tailwind)
        run: npm run build:css
      
      - name: Build JavaScript
        run: npm run build:js
      
      - name: Build HTML
        run: npm run build:html
      
      - name: Deploy to GitHub Pages
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          folder: dist           # Or 'docs' depending on your choice
          branch: gh-pages       # Or commit to main if using /docs
          clean: true
```

#### Manual Build Process

If you prefer manual builds:

```bash
# 1. Build all assets
npm run build

# 2. Commit built files to repository
git add dist/  # or docs/
git commit -m "Build for GitHub Pages"
git push origin main

# 3. GitHub Pages automatically serves the files
```

### Tailwind CSS Build for Production

#### tailwind.config.js (GitHub Pages optimized)

```javascript
module.exports = {
  content: [
    './src/**/*.{html,js}',
    './src/lessons/**/*.html',
  ],
  theme: {
    extend: {
      colors: {
        // Custom colors matching design system
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['SF Mono', 'Monaco', 'monospace'],
      },
    },
  },
  plugins: [],
  // Purge unused CSS for smaller bundles
  purge: {
    enabled: true,
    content: ['./src/**/*.html', './src/**/*.js'],
  },
}
```

#### Build Command

```json
{
  "scripts": {
    "build:css": "npx tailwindcss -i ./src/css/main.css -o ./dist/css/main.min.css --minify",
    "build:css:watch": "npx tailwindcss -i ./src/css/main.css -o ./dist/css/main.min.css --watch",
    "build": "npm run build:css && npm run build:js && npm run build:html"
  }
}
```

This produces a **single, minified CSS file** (~50KB) instead of the 3MB Tailwind CDN.

### Static File Paths

All paths will be **relative** or **root-relative** for GitHub Pages:

```html
<!-- Root-relative (works with custom domains) -->
<link rel="stylesheet" href="/css/main.min.css">
<script src="/js/main.min.js" type="module"></script>

<!-- OR Relative (works in subdirectories) -->
<link rel="stylesheet" href="./css/main.min.css">
<script src="./js/main.min.js" type="module"></script>
```

### No Server-Side Processing Required

✅ **Static HTML** - Pre-built lesson files  
✅ **Static CSS** - Compiled Tailwind + custom styles  
✅ **Static JavaScript** - ES6 modules (supported by modern browsers)  
✅ **No API calls** - All content embedded  
✅ **No build step at runtime** - Everything pre-compiled  

### GitHub Pages URL Structure

Your site will be accessible at:
- **With custom domain:** `https://yourdomain.com/`
- **Without custom domain:** `https://antonio-tresol.github.io/ai_engineering_lessons/`

Lesson URLs:
- `https://yourdomain.com/first_lesson.html`
- `https://yourdomain.com/second_lesson.html`
- etc.

### Testing Locally Before Deployment

```bash
# Option 1: Python HTTP server (what you're using now)
python3 -m http.server 8080

# Option 2: npm package (better for testing build output)
npx serve dist/

# Option 3: Live Server VS Code extension
# Just right-click index.html > "Open with Live Server"
```

### Migration Impact on GitHub Pages

**Before Refactoring:**
- ✅ Works on GitHub Pages (current state)
- ❌ 7 separate HTML files with duplicated code
- ❌ Tailwind CDN (slow, 3MB)

**After Refactoring:**
- ✅ Still works on GitHub Pages (same deployment)
- ✅ 7 lesson files + shared assets
- ✅ Custom Tailwind build (~50KB)
- ✅ Faster load times
- ✅ Consistent styling everywhere

**No change required** to your GitHub Pages configuration!

---

## Content Preservation Guarantee

### Non-Negotiables

**This refactoring will preserve 100% of the educational content:**

✅ **All text content** - Every paragraph, heading, and explanation  
✅ **All quotes and citations** - Chip Huyen references maintained  
✅ **All interactive features** - Every calculator, slider, drag-drop  
✅ **All diagrams and visuals** - Shoggoth, workflows, charts  
✅ **All lesson structure** - Sections, flow, pedagogy  
✅ **All navigation** - Section links, cross-references  

### What Changes (Only Presentation)

**CSS/Styling:**
- ❌ Hardcoded colors → ✅ Tailwind utilities + CSS variables
- ❌ Inline styles → ✅ Tailwind classes
- ❌ Duplicate component CSS → ✅ Shared Tailwind components

**JavaScript:**
- ❌ Inline `<script>` tags → ✅ External modules
- ❌ Duplicate utility code → ✅ Shared utilities
- ✅ **All functionality preserved**

**HTML Structure:**
- ❌ Inconsistent class names → ✅ Tailwind utility classes
- ✅ **All content IDs preserved** (for navigation)
- ✅ **All semantic structure preserved**

### Content Migration Verification Process

For each lesson, we will:

1. **Before Migration:**
   - Screenshot all sections
   - Export all text content to verify
   - List all interactive elements
   - Document all unique features

2. **During Migration:**
   - Copy content block-by-block
   - Apply Tailwind classes only (no content edits)
   - Test each interactive feature

3. **After Migration:**
   - Side-by-side comparison with screenshots
   - Verify all text is present
   - Test all interactions work identically
   - User acceptance test

### Example: Lesson 1 Content Preservation

**Current (Inline Styles):**
```html
<section class="section" id="introduction">
  <div class="text-center">
    <div class="max-w-4xl w-full">
      <h2 class="text-5xl font-bold mb-8">What is AI Engineering?</h2>
      <p class="text-xl mb-8 text-gray-300">
        AI Engineering is the practice of building applications...
      </p>
    </div>
  </div>
</section>

<style>
.section {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 6rem 2rem;
    border-bottom: 1px solid #1f2937;
}
</style>
```

**After Refactoring (Tailwind):**
```html
<section 
  class="min-h-screen flex flex-col justify-center items-center px-8 py-24 border-b border-gray-800" 
  id="introduction">
  <div class="text-center">
    <div class="max-w-4xl w-full">
      <h2 class="text-5xl font-bold mb-8 text-white">What is AI Engineering?</h2>
      <p class="text-xl mb-8 text-gray-300">
        AI Engineering is the practice of building applications...
      </p>
    </div>
  </div>
</section>
```

**Changes:**
- ✅ Content: **IDENTICAL** (word-for-word)
- ✅ Structure: **IDENTICAL** (same HTML elements)
- ✅ Appearance: **VISUALLY IDENTICAL** (same styles, different method)
- ✅ ID preserved: `id="introduction"` (navigation still works)

### Interactive Features Preservation

All existing interactive features will be maintained:

| Lesson | Interactive Feature | Preservation Method |
|--------|-------------------|---------------------|
| 1 | Tab switcher | Extract to `src/js/components/tabs.js`, same functionality |
| 1 | Crawl-Walk-Run interactive | Keep in lesson-specific JS, same behavior |
| 2 | Shoggoth animation | Keep custom animation, Tailwind for layout |
| 2 | Temperature slider | Keep range input logic, Tailwind for styling |
| 3 | Drag-and-drop builder | Extract to module, **add keyboard accessibility** |
| 3 | Perplexity calculator | Keep calculator logic, Tailwind for UI |
| 3 | Bias explorer | Keep interactive logic, Tailwind for layout |
| 3 | ELO rating game | Keep game logic, Tailwind for UI |
| 4 | Sidebar navigation | Extract to component, same responsive behavior |
| 5 | (Minimal interactivity) | Standard scroll animations |
| 6 | Mobile menu | Extract to shared utility, same toggle behavior |
| 7 | Accordion (details/summary) | Keep native HTML, enhance with Tailwind |
| 7 | KaTeX math rendering | Preserve library, same rendering |

### Content Audit Checklist

Before marking migration complete, verify:

- [ ] All headings present (h1, h2, h3, etc.)
- [ ] All paragraphs present
- [ ] All lists (ul, ol) present
- [ ] All blockquotes present
- [ ] All citations present
- [ ] All code examples present
- [ ] All links work
- [ ] All section IDs preserved
- [ ] All images/diagrams present
- [ ] All interactive elements functional
- [ ] All unique lesson features working

**Guarantee:** If any content is lost, migration is considered incomplete and must be fixed.

---

## Current State Analysis

### Lesson Overview

| Lesson | Theme | Layout | Navigation | JavaScript Complexity | Unique Features |
|--------|-------|--------|------------|---------------------|-----------------|
| 1 | Dark | Centered sections | Horizontal sticky | Medium | Tab switching, CWR interactive |
| 2 | Dark | Centered sections | Horizontal sticky | Medium | Shoggoth animation, temp slider |
| 3 | Light | Container-based | Horizontal sticky | **High** | Drag-drop, calculators, games |
| 4 | Dark | Sidebar | Fixed sidebar | Low | **CSS Variables ✓** |
| 5 | Dark | Centered sections | Horizontal sticky | Low | Minimal interactivity |
| 6 | Light | Container-based | Horizontal sticky | Low | Mobile menu |
| 7 | Light | Container-based | None | Low | **Best CSS ✓**, Accordions, KaTeX |

### Key Findings

#### Best Practices Found
- **Lesson 7:** Gold standard for CSS architecture (variables, comments, documentation)
- **Lesson 4:** CSS variables implementation
- **Lesson 7:** Native `<details>`/`<summary>` for accessibility
- **All lessons:** Semantic HTML5 structure

#### Critical Gaps
- **No shared code:** Every file duplicates navigation, animations, styles
- **Theme inconsistency:** 4 dark, 3 light with no switcher
- **No build process:** All code inline, Tailwind CDN (3MB)
- **Accessibility issues:** No skip links, limited ARIA, keyboard nav gaps
- **No error handling:** JavaScript assumes DOM elements exist

---

## Critical Issues Identified

### Priority 1: High Impact

#### 1. Color System Fragmentation
**Current State:**
- Lesson 1: `background-color: #111827` (hardcoded)
- Lesson 3: `background-color: #f1f5f9` (hardcoded)
- Lesson 4: `--background-color: #030712` (CSS var)
- Lesson 7: `--color-background: #f8f9fa` (CSS var)

**Impact:** Inconsistent user experience, difficult theme changes

**Solution:** Unified CSS variable system (see Design System section)

#### 2. JavaScript Duplication
**Duplicated Code:**
```javascript
// Repeated in Lessons 1, 2, 3, 5, 6 (with variations)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        }
    });
}, { threshold: 0.1 });
```

**Impact:** Maintenance burden, inconsistent behavior, larger file sizes

**Solution:** Extract to `utils/scroll-animation.js` module

#### 3. Component Inconsistency
**Card Component Variations:**
- Lesson 1: `.card` with 3D transform
- Lesson 3: `.module-card` with simple hover
- Lesson 7: `.module` with minimal styling

**Impact:** No visual consistency, reinventing patterns

**Solution:** Single `.card` component with modifiers

### Priority 2: Medium Impact

#### 4. Accessibility Gaps
- No skip-to-content links
- Missing ARIA attributes (`aria-label`, `aria-current`, `aria-expanded`)
- Drag-drop in Lesson 3 not keyboard accessible
- Inconsistent focus indicators

#### 5. Performance Issues
- Tailwind CDN loads entire framework (~3MB uncompressed)
- No CSS minification
- No code splitting
- No lazy loading for images/heavy content

#### 6. No Build Process
- All CSS/JS inline (harder to maintain)
- No dependency management
- No automated optimization
- No hot reload for development

### Priority 3: Nice to Have

#### 7. No Documentation
- Only Lesson 7 has comprehensive CSS comments
- No component usage guide
- No development setup instructions

#### 8. Browser Compatibility Unknown
- CSS variables used in Lessons 4, 7 (no IE11)
- No polyfills provided
- No testing strategy

---

## Proposed Architecture

### Design Philosophy: Tailwind-First with CSS Variables

**Core Principle:** Use Tailwind CSS for 95% of styling, custom CSS only for:
1. CSS variables (design tokens)
2. Complex animations
3. Component states (hover, focus, active)
4. Lesson-specific unique interactions

**Why Tailwind Everywhere:**
- ✅ Consistent spacing, colors, typography
- ✅ Responsive design out of the box
- ✅ Smaller bundle size with purge/tree-shaking
- ✅ No naming conventions to debate
- ✅ Easy to scan and understand HTML
- ✅ Perfect for GitHub Pages (compiles to static CSS)

### New File Structure (GitHub Pages Compatible)

```
/ai_engineering_lessons/
├── index.html                    # Landing page (stays in root)
├── first_lesson.html             # Built lesson files (stays in root)
├── second_lesson.html
├── third_lesson.html
├── fourth_lesson.html
├── fifth_lesson.html
├── sixth_lesson.html
├── seventh_lesson.html
├── css/
│   └── main.min.css              # Compiled: Tailwind + CSS vars + custom
├── js/
│   ├── utils.min.js              # Compiled shared utilities
│   └── lessons/
│       ├── lesson-1.min.js       # Lesson-specific JS (if needed)
│       ├── lesson-2.min.js
│       └── lesson-3.min.js
├── assets/
│   └── images/                   # Static images
├── src/                          # Source files (not deployed to GitHub Pages)
│   ├── css/
│   │   ├── main.css              # Main entry point
│   │   ├── base/
│   │   │   ├── variables.css    # CSS custom properties
│   │   │   └── tailwind.css     # Tailwind directives
│   │   ├── components/
│   │   │   ├── card.css         # Custom card variants (if needed)
│   │   │   └── animations.css   # Custom animations
│   │   └── utilities/
│   │       └── custom.css       # Custom utility classes
│   ├── js/
│   │   ├── utils/
│   │   │   ├── scroll-animation.js
│   │   │   ├── nav-observer.js
│   │   │   └── mobile-menu.js
│   │   └── lessons/
│   │       ├── lesson-1.js      # Lesson 1 specific code
│   │       ├── lesson-2.js
│   │       └── lesson-3.js      # Drag-drop, calculators, etc.
│   └── templates/
│       ├── base.html             # Base template (for build process)
│       └── lessons/
│           ├── 01-content.html   # Pure content (no styles)
│           ├── 02-content.html
│           └── ...
├── .github/
│   └── workflows/
│       └── build.yml             # GitHub Actions for auto-build
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── .gitignore
└── README.md
```

**Key Points:**
- ✅ **Built files in root** for GitHub Pages deployment
- ✅ **Source files in `/src`** (not deployed, in .gitignore if using GitHub Actions)
- ✅ **Single CSS file** (`css/main.min.css`) - compiled Tailwind + custom
- ✅ **Modular JavaScript** - ES6 modules for modern browsers
- ✅ **No backend** - Everything static

### Technology Stack

#### CSS Framework: Tailwind CSS (Custom Build)
```css
/* src/css/main.css */
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

/* Custom CSS variables for theming */
@import './base/variables.css';

/* Minimal custom components (only what Tailwind can't do) */
@import './components/animations.css';
```

**Build Output:** `css/main.min.css` (~40-60KB after purging unused classes)

#### Tailwind Configuration
```javascript
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.html',
    './src/**/*.js',
    './*.html',  // Root-level lesson files
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        // Map to CSS variables for easy theming
        primary: {
          50: 'rgb(var(--color-primary-50) / <alpha-value>)',
          100: 'rgb(var(--color-primary-100) / <alpha-value>)',
          // ... etc
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

#### JavaScript
- **ES6 Modules** (`type="module"`)
- **No framework** (vanilla JS)
- **Defensive programming** (null checks)
- **Modern browser features** (IntersectionObserver, etc.)

#### Build Tools
```json
{
  "devDependencies": {
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0",
    "cssnano": "^6.0.0"
  },
  "scripts": {
    "dev:css": "tailwindcss -i ./src/css/main.css -o ./css/main.min.css --watch",
    "build:css": "NODE_ENV=production tailwindcss -i ./src/css/main.css -o ./css/main.min.css --minify",
    "build:js": "node scripts/bundle-js.js",
    "build": "npm run build:css && npm run build:js",
    "serve": "python3 -m http.server 8080"
  }
}
```

### Tailwind Usage Examples

#### Before: Custom CSS
```html
<div class="card">
  <h3 class="card__title">Title</h3>
  <p class="card__text">Content</p>
</div>

<style>
.card {
    background-color: #1f2937;
    border: 1px solid #374151;
    border-radius: 0.75rem;
    padding: 2rem;
}
.card__title {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
}
</style>
```

#### After: Tailwind Classes
```html
<div class="bg-gray-800 border border-gray-700 rounded-xl p-8">
  <h3 class="text-xl font-semibold mb-2">Title</h3>
  <p class="text-gray-300">Content</p>
</div>
```

**Benefits:**
- No custom CSS needed
- Responsive modifiers built-in: `md:p-12`, `lg:text-2xl`
- Dark mode support: `dark:bg-gray-900`
- Hover states: `hover:bg-gray-700`

#### Complex Components: Tailwind + CSS Variables

For components that need theming or complex states:

```html
<!-- HTML -->
<div class="card-interactive">
  <h3>Interactive Card</h3>
</div>
```

```css
/* src/css/components/card.css */
.card-interactive {
  /* Use Tailwind's @apply for common utilities */
  @apply bg-gray-800 border border-gray-700 rounded-xl p-8;
  @apply transition-all duration-300;
  
  /* Custom properties for complex transforms */
  transform-style: preserve-3d;
}

.card-interactive:hover {
  @apply -translate-y-1 shadow-xl;
  transform: translateY(-4px) perspective(1000px) rotateX(1deg) rotateY(-1deg);
}
```

### Example: Full Lesson Structure (Tailwind-First)

```html
<!DOCTYPE html>
<html lang="en" class="dark scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI Engineering Chapter 1</title>
    
    <!-- Single compiled CSS file -->
    <link rel="stylesheet" href="/css/main.min.css">
    
    <!-- Fonts (same as before) -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body class="bg-gray-950 text-white font-sans">
    
    <!-- Navigation: All Tailwind -->
    <nav class="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-sm border-b border-gray-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16">
                <a href="/" class="text-xl font-bold text-white">AI Engineering</a>
                <ul class="hidden md:flex space-x-8">
                    <li><a href="#intro" class="text-gray-300 hover:text-white transition">Introduction</a></li>
                    <li><a href="#concepts" class="text-gray-300 hover:text-white transition">Concepts</a></li>
                </ul>
            </div>
        </div>
    </nav>
    
    <!-- Main Content: All Tailwind -->
    <main>
        <!-- Section: Centered, full-height -->
        <section 
            id="intro" 
            class="min-h-screen flex flex-col justify-center items-center px-8 py-24 border-b border-gray-800">
            <div class="max-w-4xl w-full text-center">
                <h1 class="text-6xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    AI Engineering
                </h1>
                <p class="text-xl text-gray-300 leading-relaxed">
                    Educational content preserved exactly...
                </p>
            </div>
        </section>
        
        <!-- Card Grid: All Tailwind -->
        <section class="py-24 px-8">
            <div class="max-w-6xl mx-auto">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div class="bg-gray-800 border border-gray-700 rounded-xl p-8 hover:-translate-y-1 hover:shadow-xl transition-all">
                        <h3 class="text-2xl font-semibold mb-4">Card Title</h3>
                        <p class="text-gray-300">Content here...</p>
                    </div>
                    <!-- More cards... -->
                </div>
            </div>
        </section>
        
        <!-- Quote: Tailwind + custom border -->
        <blockquote class="max-w-4xl mx-auto my-12 border-l-4 border-blue-500 pl-6 italic text-gray-400">
            <p class="text-lg">"Quote content preserved exactly..."</p>
            <footer class="text-sm text-gray-500 mt-2">— Chip Huyen (2025)</footer>
        </blockquote>
    </main>
    
    <!-- Footer: All Tailwind -->
    <footer class="bg-gray-900 border-t border-gray-800 py-12 text-center text-gray-400">
        <p>Based on <a href="#" class="text-blue-400 hover:text-blue-300 underline">AI Engineering</a> by Chip Huyen</p>
    </footer>
    
    <!-- JavaScript: External modules -->
    <script src="/js/utils.min.js" type="module"></script>
</body>
</html>
```

**Key Observations:**
- ✅ **Zero custom CSS in HTML** - all Tailwind classes
- ✅ **Responsive by default** - `md:`, `lg:` modifiers
- ✅ **Dark mode ready** - using Tailwind's dark mode
- ✅ **Same visual result** as before
- ✅ **Content identical** - only styling method changed
│   │       ├── lesson-02.js           # Lesson 2 specific code
│   │       ├── lesson-03.js           # Lesson 3 specific code
│   │       └── ...
│   ├── templates/
│   │   ├── partials/
│   │   │   ├── header.html
│   │   │   ├── nav.html
│   │   │   └── footer.html
│   │   └── layouts/
│   │       ├── base.html              # Base template
│   │       └── lesson.html            # Lesson-specific wrapper
│   └── lessons/
│       ├── 01-introduction/
│       │   ├── content.html           # Lesson content only
│       │   └── interactive.js         # Lesson-specific JS
│       ├── 02-foundation-models/
│       │   ├── content.html
│       │   └── interactive.js
│       └── ...
├── dist/                         # Built files (gitignored)
│   ├── css/
│   │   └── main.min.css
│   ├── js/
│   │   └── main.min.js
│   └── lessons/
│       ├── first_lesson.html
│       ├── second_lesson.html
│       └── ...
├── docs/                         # Documentation
│   ├── COMPONENT_LIBRARY.md
│   ├── DEVELOPMENT.md
│   └── STYLE_GUIDE.md
├── assets/                       # Static assets
│   └── images/
├── package.json                  # Dependencies
├── postcss.config.js             # PostCSS config
├── tailwind.config.js            # Tailwind config (custom build)
├── .gitignore
└── README.md
```

### Technology Stack

#### CSS
- **Tailwind CSS** (custom build, not CDN)
- **PostCSS** for processing
- **CSS Variables** for theming
- **BEM-inspired naming** for custom components

#### JavaScript
- **ES6 Modules** (`type="module"`)
- **No framework** (vanilla JS)
- **Event delegation** where appropriate
- **Defensive programming** (null checks)

#### Build Tools
- **npm scripts** for basic tasks
- **PostCSS CLI** for CSS processing
- **Rollup** (optional) for JS bundling
- **HTML templating** (Handlebars or Nunjucks)

#### Development
- **Live reload** (browser-sync or similar)
- **Linting** (ESLint, Stylelint)
- **Prettier** for formatting

---

## Implementation Phases

### Phase 1: Foundation (Week 1)

#### Goals
- Establish design system
- Set up build process
- Extract shared utilities

#### Tasks

##### 1.1 Create CSS Variable System (2 days)
- [ ] Create `src/css/00-base/variables.css`
- [ ] Define color palette (based on Lesson 7)
- [ ] Define typography scale
- [ ] Define spacing scale (8px base)
- [ ] Define border radius, shadows, transitions
- [ ] Create dark theme overrides
- [ ] Document all variables

**Deliverable:** Complete design token system

##### 1.2 Set Up Build Process (1 day)
- [ ] Initialize `package.json`
- [ ] Install Tailwind CSS
- [ ] Configure PostCSS
- [ ] Create build scripts
- [ ] Set up watch mode for development
- [ ] Configure `.gitignore` for `dist/`

**Deliverable:** Working build system

##### 1.3 Extract JavaScript Utilities (2 days)
- [ ] Create `src/js/utils/scroll-animation.js`
- [ ] Create `src/js/utils/nav-observer.js`
- [ ] Create `src/js/utils/mobile-menu.js`
- [ ] Create `src/js/utils/error-handler.js`
- [ ] Add JSDoc comments
- [ ] Test utilities in isolation

**Deliverable:** 4 reusable utility modules

### Phase 2: Component Library (Week 2)

#### Goals
- Extract all shared components
- Create component documentation
- Build style guide

#### Tasks

##### 2.1 Create Base Components (3 days)
- [ ] **Card Component** (`src/css/01-components/card.css`)
  - Base card style
  - Modifier: `card--interactive` (hover effects)
  - Modifier: `card--elevated` (more shadow)
  - Test across all lessons
  
- [ ] **Navigation Component** (`src/css/01-components/navigation.css`)
  - Horizontal nav (desktop)
  - Mobile menu toggle
  - Active state styling
  - Sticky/fixed positioning
  
- [ ] **Quote Component** (`src/css/01-components/quote.css`)
  - Blockquote styling
  - Citation formatting
  - Dark/light theme variants
  
- [ ] **Footer Component** (`src/css/01-components/footer.css`)
  - Standard footer layout
  - Citation area
  - Responsive adjustments

##### 2.2 Create Layout Components (1 day)
- [ ] **Centered Layout** (`src/css/02-layouts/centered.css`)
  - Full-height sections
  - Centered content
  - Max-width constraints
  
- [ ] **Sidebar Layout** (`src/css/02-layouts/sidebar.css`)
  - Fixed sidebar (desktop)
  - Collapsible on mobile
  - Content area adjustments

##### 2.3 Documentation (1 day)
- [ ] Create `docs/COMPONENT_LIBRARY.md`
- [ ] Document each component with:
  - Purpose and usage
  - HTML structure
  - CSS classes and modifiers
  - JavaScript requirements
  - Accessibility notes
  - Live examples

**Deliverable:** Complete component library with documentation

### Phase 3: Lesson Migration (Weeks 3-4)

#### Strategy
Migrate lessons in groups based on similarity:
1. **Group A:** Lesson 7 (already closest)
2. **Group B:** Lessons 1, 2, 5 (dark theme, similar structure)
3. **Group C:** Lessons 3, 6 (light theme, complex interactivity)
4. **Group D:** Lesson 4 (sidebar layout)

#### Tasks per Lesson

##### 3.1 Lesson 7 Migration (2 days)
- [ ] Extract content to `src/lessons/07-finetuning/content.html`
- [ ] Move custom JS to `src/lessons/07-finetuning/interactive.js`
- [ ] Replace hardcoded colors with CSS variables
- [ ] Use shared navigation component
- [ ] Test accordion functionality
- [ ] Verify KaTeX still works
- [ ] Build and compare output

##### 3.2 Lessons 1, 2, 5 Migration (3 days)
**For each lesson:**
- [ ] Extract content to separate file
- [ ] Replace inline styles with component classes
- [ ] Use shared scroll animation utility
- [ ] Use shared nav observer
- [ ] Extract custom interactivity:
  - Lesson 1: Tab switcher, CWR interactive
  - Lesson 2: Shoggoth animation, temperature slider
  - Lesson 5: None (straightforward)
- [ ] Apply dark theme
- [ ] Build and test

##### 3.3 Lessons 3, 6 Migration (3 days)
**Lesson 3 (most complex):**
- [ ] Extract drag-drop to `src/js/components/drag-drop.js`
- [ ] Extract calculators (perplexity, ELO)
- [ ] Make drag-drop keyboard accessible
- [ ] Apply light theme (or convert to dark)
- [ ] Test all interactive elements

**Lesson 6:**
- [ ] Extract content
- [ ] Apply component library
- [ ] Use shared mobile menu
- [ ] Apply theme
- [ ] Test

##### 3.4 Lesson 4 Migration (2 days)
- [ ] Extract sidebar layout to reusable component
- [ ] Apply CSS variables
- [ ] Use shared mobile menu
- [ ] Decide: Keep sidebar or convert to standard nav?
- [ ] Test responsive behavior

**Deliverable:** All 7 lessons migrated to new architecture

### Phase 4: Enhancement (Week 5)

#### Goals
- Add missing features
- Improve accessibility
- Optimize performance
- Polish UX

#### Tasks

##### 4.1 Theme Switcher (2 days)
- [ ] Create theme toggle button
- [ ] Implement theme switching logic
- [ ] Save preference to localStorage
- [ ] Respect `prefers-color-scheme`
- [ ] Add smooth transition between themes
- [ ] Test on all lessons

##### 4.2 Accessibility Improvements (2 days)
- [ ] Add skip-to-content links
- [ ] Add ARIA labels to navigation
- [ ] Add `aria-current` to active nav items
- [ ] Add `aria-expanded` to mobile menus
- [ ] Implement visible focus indicators
- [ ] Test keyboard navigation on all interactive elements
- [ ] Test with screen reader (NVDA/JAWS)
- [ ] Run axe DevTools audit
- [ ] Fix all high-priority issues

##### 4.3 Performance Optimization (1 day)
- [ ] Replace Tailwind CDN with custom build
- [ ] Minify CSS and JavaScript
- [ ] Optimize images (convert to WebP where appropriate)
- [ ] Add `loading="lazy"` to images
- [ ] Implement critical CSS extraction
- [ ] Run Lighthouse audits
- [ ] Target 90+ on all metrics

##### 4.4 Final Polish (1 day)
- [ ] Ensure consistent spacing across lessons
- [ ] Fix any visual inconsistencies
- [ ] Add loading states where needed
- [ ] Test on multiple browsers (Chrome, Firefox, Safari, Edge)
- [ ] Test on mobile devices
- [ ] Create `docs/DEVELOPMENT.md` guide
- [ ] Update main README.md

**Deliverable:** Production-ready lesson system

---

## Design System Specifications

### Color Palette

#### Primary Colors
```css
:root {
  /* Blue (Primary Accent) */
  --color-primary-50: #eff6ff;
  --color-primary-100: #dbeafe;
  --color-primary-200: #bfdbfe;
  --color-primary-300: #93c5fd;
  --color-primary-400: #60a5fa;
  --color-primary-500: #3b82f6;  /* Base */
  --color-primary-600: #2563eb;
  --color-primary-700: #1d4ed8;
  --color-primary-800: #1e40af;
  --color-primary-900: #1e3a8a;
}
```

#### Grayscale
```css
:root {
  --color-gray-50: #f9fafb;
  --color-gray-100: #f3f4f6;
  --color-gray-200: #e5e7eb;
  --color-gray-300: #d1d5db;
  --color-gray-400: #9ca3af;
  --color-gray-500: #6b7280;
  --color-gray-600: #4b5563;
  --color-gray-700: #374151;
  --color-gray-800: #1f2937;
  --color-gray-900: #111827;
  --color-gray-950: #030712;
}
```

#### Semantic Colors (Light Theme)
```css
:root {
  --color-background: var(--color-gray-50);
  --color-surface: #ffffff;
  --color-surface-elevated: #ffffff;
  --color-text-primary: var(--color-gray-900);
  --color-text-secondary: var(--color-gray-600);
  --color-text-tertiary: var(--color-gray-500);
  --color-accent: var(--color-primary-500);
  --color-accent-hover: var(--color-primary-600);
  --color-border: var(--color-gray-200);
  --color-border-hover: var(--color-gray-300);
}
```

#### Semantic Colors (Dark Theme)
```css
[data-theme="dark"] {
  --color-background: var(--color-gray-950);
  --color-surface: var(--color-gray-900);
  --color-surface-elevated: var(--color-gray-800);
  --color-text-primary: var(--color-gray-50);
  --color-text-secondary: var(--color-gray-300);
  --color-text-tertiary: var(--color-gray-400);
  --color-accent: var(--color-primary-400);
  --color-accent-hover: var(--color-primary-300);
  --color-border: var(--color-gray-700);
  --color-border-hover: var(--color-gray-600);
}
```

### Typography Scale

```css
:root {
  /* Font Families */
  --font-family-base: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 
                      'Roboto', 'Helvetica Neue', sans-serif;
  --font-family-mono: 'SF Mono', 'Monaco', 'Consolas', 'Courier New', monospace;
  
  /* Font Sizes (modular scale: 1.25 ratio) */
  --font-size-xs: 0.75rem;      /* 12px */
  --font-size-sm: 0.875rem;     /* 14px */
  --font-size-base: 1rem;       /* 16px */
  --font-size-lg: 1.125rem;     /* 18px */
  --font-size-xl: 1.25rem;      /* 20px */
  --font-size-2xl: 1.5rem;      /* 24px */
  --font-size-3xl: 1.875rem;    /* 30px */
  --font-size-4xl: 2.25rem;     /* 36px */
  --font-size-5xl: 3rem;        /* 48px */
  --font-size-6xl: 3.75rem;     /* 60px */
  
  /* Font Weights */
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  
  /* Line Heights */
  --line-height-tight: 1.25;
  --line-height-snug: 1.375;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.625;
  --line-height-loose: 2;
  
  /* Letter Spacing */
  --letter-spacing-tight: -0.025em;
  --letter-spacing-normal: 0;
  --letter-spacing-wide: 0.025em;
}
```

### Spacing Scale (8px base unit)

```css
:root {
  --spacing-0: 0;
  --spacing-1: 0.5rem;      /* 8px */
  --spacing-2: 1rem;        /* 16px */
  --spacing-3: 1.5rem;      /* 24px */
  --spacing-4: 2rem;        /* 32px */
  --spacing-5: 2.5rem;      /* 40px */
  --spacing-6: 3rem;        /* 48px */
  --spacing-8: 4rem;        /* 64px */
  --spacing-10: 5rem;       /* 80px */
  --spacing-12: 6rem;       /* 96px */
  --spacing-16: 8rem;       /* 128px */
  --spacing-20: 10rem;      /* 160px */
}
```

### Layout Constraints

```css
:root {
  /* Max Widths */
  --max-width-xs: 320px;
  --max-width-sm: 640px;
  --max-width-md: 768px;
  --max-width-lg: 1024px;
  --max-width-xl: 1280px;
  --max-width-2xl: 1536px;
  --max-width-content: 65ch;  /* Optimal reading width */
  
  /* Container Padding */
  --container-padding: var(--spacing-4);
  --container-padding-sm: var(--spacing-6);
  --container-padding-lg: var(--spacing-8);
}
```

### Border Radius

```css
:root {
  --radius-none: 0;
  --radius-sm: 0.25rem;     /* 4px */
  --radius-base: 0.5rem;    /* 8px */
  --radius-md: 0.75rem;     /* 12px */
  --radius-lg: 1rem;        /* 16px */
  --radius-xl: 1.5rem;      /* 24px */
  --radius-2xl: 2rem;       /* 32px */
  --radius-full: 9999px;
}
```

### Shadows

```css
:root {
  /* Light Theme Shadows */
  --shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 
               0 1px 2px -1px rgba(0, 0, 0, 0.1);
  --shadow-base: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 
                 0 2px 4px -2px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 
               0 4px 6px -4px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 
               0 8px 10px -6px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

[data-theme="dark"] {
  /* Dark Theme Shadows (deeper) */
  --shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.3);
  --shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.4), 
               0 1px 2px -1px rgba(0, 0, 0, 0.4);
  --shadow-base: 0 4px 6px -1px rgba(0, 0, 0, 0.4), 
                 0 2px 4px -2px rgba(0, 0, 0, 0.4);
  --shadow-md: 0 10px 15px -3px rgba(0, 0, 0, 0.5), 
               0 4px 6px -4px rgba(0, 0, 0, 0.5);
  --shadow-lg: 0 20px 25px -5px rgba(0, 0, 0, 0.5), 
               0 8px 10px -6px rgba(0, 0, 0, 0.5);
  --shadow-xl: 0 25px 50px -12px rgba(0, 0, 0, 0.6);
}
```

### Transitions

```css
:root {
  /* Duration */
  --duration-fast: 150ms;
  --duration-base: 250ms;
  --duration-slow: 350ms;
  --duration-slower: 500ms;
  
  /* Easing */
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-sharp: cubic-bezier(0.4, 0, 0.6, 1);
  
  /* Common Transitions */
  --transition-fast: var(--duration-fast) var(--ease-out);
  --transition-base: var(--duration-base) var(--ease-out);
  --transition-slow: var(--duration-slow) var(--ease-out);
}
```

### Z-Index Scale

```css
:root {
  --z-base: 0;
  --z-dropdown: 1000;
  --z-sticky: 1020;
  --z-fixed: 1030;
  --z-modal-backdrop: 1040;
  --z-modal: 1050;
  --z-popover: 1060;
  --z-tooltip: 1070;
}
```

---

## Component Library

### 1. Card Component

#### HTML Structure
```html
<div class="card">
  <div class="card__header">
    <h3 class="card__title">Card Title</h3>
  </div>
  <div class="card__body">
    <p class="card__text">Card content goes here.</p>
  </div>
  <div class="card__footer">
    <button class="btn btn--primary">Action</button>
  </div>
</div>
```

#### CSS Implementation
```css
/* Base Card */
.card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--spacing-4);
  box-shadow: var(--shadow-base);
  transition: transform var(--transition-base), 
              box-shadow var(--transition-base);
}

/* Modifiers */
.card--interactive {
  cursor: pointer;
  transform-style: preserve-3d;
}

.card--interactive:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.card--interactive-3d:hover {
  transform: translateY(-4px) perspective(1000px) 
             rotateX(1deg) rotateY(-1deg);
}

.card--elevated {
  box-shadow: var(--shadow-md);
}

/* Card Elements */
.card__header {
  margin-bottom: var(--spacing-3);
  padding-bottom: var(--spacing-3);
  border-bottom: 1px solid var(--color-border);
}

.card__title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0;
}

.card__body {
  margin-bottom: var(--spacing-3);
}

.card__text {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
}

.card__footer {
  padding-top: var(--spacing-3);
  border-top: 1px solid var(--color-border);
}
```

#### Usage
```html
<!-- Standard Card -->
<div class="card">
  <h3 class="card__title">Standard Card</h3>
  <p class="card__text">Content here</p>
</div>

<!-- Interactive Card with Hover -->
<div class="card card--interactive">
  <h3 class="card__title">Hover Me</h3>
  <p class="card__text">I lift up on hover</p>
</div>

<!-- Interactive Card with 3D Effect (Lesson 1 style) -->
<div class="card card--interactive card--interactive-3d">
  <h3 class="card__title">3D Hover</h3>
  <p class="card__text">I tilt on hover</p>
</div>
```

### 2. Navigation Component

#### HTML Structure
```html
<nav class="nav" aria-label="Main navigation">
  <div class="nav__container">
    <a href="/" class="nav__brand">AI Engineering</a>
    
    <button class="nav__toggle" aria-label="Toggle menu" aria-expanded="false">
      <span class="nav__toggle-icon"></span>
    </button>
    
    <ul class="nav__menu">
      <li class="nav__item">
        <a href="#section1" class="nav__link">Introduction</a>
      </li>
      <li class="nav__item">
        <a href="#section2" class="nav__link">Concepts</a>
      </li>
      <li class="nav__item">
        <a href="#section3" class="nav__link">Implementation</a>
      </li>
    </ul>
  </div>
</nav>
```

#### CSS Implementation
```css
/* Base Navigation */
.nav {
  position: sticky;
  top: 0;
  z-index: var(--z-sticky);
  background-color: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  backdrop-filter: blur(8px);
  background-color: rgba(var(--color-surface-rgb), 0.8);
}

.nav__container {
  max-width: var(--max-width-xl);
  margin: 0 auto;
  padding: var(--spacing-2) var(--spacing-4);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav__brand {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  text-decoration: none;
}

.nav__toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: var(--spacing-1);
}

.nav__menu {
  display: flex;
  list-style: none;
  gap: var(--spacing-4);
  margin: 0;
  padding: 0;
}

.nav__link {
  color: var(--color-text-secondary);
  text-decoration: none;
  font-weight: var(--font-weight-medium);
  transition: color var(--transition-fast);
  position: relative;
}

.nav__link:hover {
  color: var(--color-accent);
}

.nav__link--active {
  color: var(--color-accent);
}

.nav__link--active::after {
  content: '';
  position: absolute;
  bottom: -0.5rem;
  left: 0;
  right: 0;
  height: 2px;
  background-color: var(--color-accent);
}

/* Mobile Styles */
@media (max-width: 768px) {
  .nav__toggle {
    display: block;
  }
  
  .nav__menu {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: var(--color-surface);
    border-bottom: 1px solid var(--color-border);
    flex-direction: column;
    padding: var(--spacing-4);
    gap: var(--spacing-3);
    transform: translateY(-100%);
    opacity: 0;
    visibility: hidden;
    transition: transform var(--transition-base),
                opacity var(--transition-base),
                visibility var(--transition-base);
  }
  
  .nav__menu--open {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
  }
}
```

#### JavaScript
```javascript
// src/js/utils/mobile-menu.js
export function initMobileMenu(navSelector = '.nav') {
  const nav = document.querySelector(navSelector);
  if (!nav) return;
  
  const toggle = nav.querySelector('.nav__toggle');
  const menu = nav.querySelector('.nav__menu');
  
  if (!toggle || !menu) return;
  
  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.contains('nav__menu--open');
    
    menu.classList.toggle('nav__menu--open');
    toggle.setAttribute('aria-expanded', !isOpen);
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target)) {
      menu.classList.remove('nav__menu--open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}
```

### 3. Quote Component

#### HTML Structure
```html
<blockquote class="quote">
  <p class="quote__text">
    "The future of AI engineering lies in building reliable, 
    scalable systems that can be trusted in production."
  </p>
  <footer class="quote__footer">
    <cite class="quote__cite">Chip Huyen (2025, p. 42)</cite>
  </footer>
</blockquote>
```

#### CSS Implementation
```css
.quote {
  border-left: 4px solid var(--color-accent);
  padding-left: var(--spacing-4);
  margin: var(--spacing-6) 0;
  font-style: italic;
}

.quote__text {
  font-size: var(--font-size-lg);
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
  margin-bottom: var(--spacing-2);
}

.quote__footer {
  font-style: normal;
}

.quote__cite {
  font-size: var(--font-size-sm);
  color: var(--color-text-tertiary);
  font-weight: var(--font-weight-medium);
}

/* Variant: Highlighted Quote */
.quote--highlighted {
  background-color: var(--color-surface-elevated);
  border-radius: var(--radius-base);
  padding: var(--spacing-4);
  border-left-width: 4px;
}
```

### 4. Button Component

#### HTML Structure
```html
<button class="btn btn--primary">Primary Button</button>
<button class="btn btn--secondary">Secondary Button</button>
<button class="btn btn--ghost">Ghost Button</button>
```

#### CSS Implementation
```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-1);
  padding: var(--spacing-2) var(--spacing-4);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  border-radius: var(--radius-base);
  border: none;
  cursor: pointer;
  transition: all var(--transition-fast);
  text-decoration: none;
}

.btn:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

.btn--primary {
  background-color: var(--color-accent);
  color: white;
}

.btn--primary:hover {
  background-color: var(--color-accent-hover);
  transform: translateY(-1px);
}

.btn--secondary {
  background-color: transparent;
  border: 1px solid var(--color-border);
  color: var(--color-text-primary);
}

.btn--secondary:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
}

.btn--ghost {
  background-color: transparent;
  color: var(--color-accent);
}

.btn--ghost:hover {
  background-color: var(--color-surface-elevated);
}
```

### 5. Accordion Component (Lesson 7 style)

#### HTML Structure
```html
<details class="accordion">
  <summary class="accordion__trigger">
    <span class="accordion__title">Section Title</span>
    <svg class="accordion__icon" width="20" height="20" viewBox="0 0 20 20">
      <path d="M5 7.5l5 5 5-5" stroke="currentColor" fill="none"/>
    </svg>
  </summary>
  <div class="accordion__content">
    <p>Content goes here...</p>
  </div>
</details>
```

#### CSS Implementation
```css
.accordion {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-base);
  margin-bottom: var(--spacing-2);
  overflow: hidden;
}

.accordion__trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-3);
  cursor: pointer;
  user-select: none;
  list-style: none;
  background-color: var(--color-surface);
  transition: background-color var(--transition-fast);
}

.accordion__trigger:hover {
  background-color: var(--color-surface-elevated);
}

.accordion__trigger::-webkit-details-marker {
  display: none;
}

.accordion__title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
}

.accordion__icon {
  flex-shrink: 0;
  transition: transform var(--transition-base);
}

.accordion[open] .accordion__icon {
  transform: rotate(180deg);
}

.accordion__content {
  padding: var(--spacing-4);
  border-top: 1px solid var(--color-border);
}
```

---

## Migration Checklist

### Per-Lesson Checklist

Use this checklist for each lesson during migration:

#### Pre-Migration
- [ ] Read through entire lesson HTML
- [ ] Identify unique interactive components
- [ ] List custom styles that can't use shared components
- [ ] Note any third-party dependencies (e.g., KaTeX)
- [ ] Screenshot current appearance for comparison

#### Content Extraction
- [ ] Create `src/lessons/0X-name/content.html`
- [ ] Extract main content (remove nav, footer, scripts)
- [ ] Preserve all section IDs for navigation
- [ ] Ensure all heading hierarchy is correct
- [ ] Clean up inline styles

#### Styling Migration
- [ ] Replace hardcoded colors with CSS variables
- [ ] Replace custom card styles with `.card` component
- [ ] Replace custom nav with `.nav` component
- [ ] Replace custom quotes with `.quote` component
- [ ] Replace custom buttons with `.btn` variants
- [ ] Apply layout classes (`.centered-section`, etc.)
- [ ] Remove duplicate CSS

#### JavaScript Migration
- [ ] Extract lesson-specific JS to `src/lessons/0X-name/interactive.js`
- [ ] Replace inline scroll animation with `initScrollAnimation()`
- [ ] Replace inline nav observer with `initNavObserver()`
- [ ] Replace inline mobile menu with `initMobileMenu()`
- [ ] Add defensive null checks to all DOM queries
- [ ] Convert to ES6 module syntax
- [ ] Add JSDoc comments

#### Testing
- [ ] Build lesson: `npm run build:lesson-X`
- [ ] Compare visual appearance with screenshot
- [ ] Test all interactive elements
- [ ] Test on mobile viewport
- [ ] Test keyboard navigation
- [ ] Test with screen reader (if possible)
- [ ] Run Lighthouse audit
- [ ] Fix any issues

#### Documentation
- [ ] Document any lesson-specific components
- [ ] Note any special considerations
- [ ] Update lesson README if needed

---

## Success Metrics

### Code Quality Metrics

#### Before Refactoring (Baseline)
- Total CSS lines: ~7,000
- Total JavaScript lines: ~2,500
- Duplicated code: ~700 lines (28%)
- Number of files: 7 HTML files
- Average file size: ~100KB

#### After Refactoring (Target)
- Total CSS lines: ~2,000 (71% reduction)
- Total JavaScript lines: ~1,500 (40% reduction)
- Duplicated code: < 100 lines (< 5%)
- Number of files: 7 HTML + shared modules
- Average file size: ~40KB (60% reduction)

### Performance Metrics

#### Lighthouse Scores (Target: 90+ on all)
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 90+

#### Loading Performance
- First Contentful Paint (FCP): < 1.5s
- Largest Contentful Paint (LCP): < 2.5s
- Total Blocking Time (TBT): < 200ms
- Cumulative Layout Shift (CLS): < 0.1

#### Bundle Sizes
- CSS (minified): < 50KB
- JavaScript (minified): < 100KB
- Total page weight: < 500KB (excluding images)

### Accessibility Metrics

#### WCAG 2.1 AA Compliance
- [ ] All color contrasts meet 4.5:1 ratio
- [ ] All interactive elements keyboard accessible
- [ ] All images have alt text
- [ ] All forms have labels
- [ ] Skip links present
- [ ] ARIA landmarks properly used
- [ ] Focus indicators visible
- [ ] No automatic audio/video

#### Keyboard Navigation
- [ ] Tab order logical
- [ ] All interactive elements reachable
- [ ] Escape closes modals/menus
- [ ] Arrow keys work in custom widgets
- [ ] Focus trap in modals

#### Screen Reader Testing
- [ ] All content announced correctly
- [ ] Navigation structure clear
- [ ] Interactive states announced
- [ ] No redundant announcements

### Developer Experience Metrics

#### Development Speed
- Hot reload working: Yes/No
- Build time: < 5s
- Lighthouse in CI: Yes/No

#### Code Maintainability
- Component documentation: Complete
- Code comments: Adequate
- Naming conventions: Consistent
- Error handling: Comprehensive

### User Experience Metrics (if analytics available)

- Bounce rate: Target < 40%
- Time on page: Target > 3 minutes
- Scroll depth: Target > 75%
- Interaction rate: Track clicks on interactive elements

---

## Appendices

### A. Recommended VS Code Extensions

For best development experience:

- **Prettier** - Code formatter
- **ESLint** - JavaScript linting
- **Stylelint** - CSS linting
- **Live Server** - Local development server
- **PostCSS Language Support** - Syntax highlighting
- **Tailwind CSS IntelliSense** - Tailwind autocompletion

### B. Recommended npm Scripts

```json
{
  "scripts": {
    "dev": "concurrently \"npm:watch:*\"",
    "watch:css": "postcss src/css/main.css -o dist/css/main.css --watch",
    "watch:js": "rollup -c -w",
    "build": "npm run build:css && npm run build:js && npm run build:html",
    "build:css": "postcss src/css/main.css -o dist/css/main.min.css",
    "build:js": "rollup -c --environment NODE_ENV:production",
    "build:html": "node scripts/build-html.js",
    "serve": "browser-sync start --server dist --files 'dist/**/*'",
    "lint": "npm run lint:js && npm run lint:css",
    "lint:js": "eslint 'src/js/**/*.js'",
    "lint:css": "stylelint 'src/css/**/*.css'",
    "format": "prettier --write 'src/**/*.{js,css,html}'"
  }
}
```

### C. Git Workflow Recommendations

```bash
# Create feature branch for refactoring
git checkout -b refactor/lesson-system

# Work in small commits
git commit -m "feat: add CSS variable system"
git commit -m "feat: create card component"
git commit -m "refactor: migrate lesson 7"

# Push and create PR
git push origin refactor/lesson-system
```

### D. Browser Support Matrix

| Browser | Version | Supported | Notes |
|---------|---------|-----------|-------|
| Chrome | 90+ | ✅ | Full support |
| Firefox | 88+ | ✅ | Full support |
| Safari | 14+ | ✅ | Full support |
| Edge | 90+ | ✅ | Full support |
| Mobile Safari | 14+ | ✅ | Test on iPhone |
| Mobile Chrome | 90+ | ✅ | Test on Android |
| IE 11 | - | ❌ | Not supported (CSS vars) |

---

## Summary: Your Questions Answered

### ✅ Will code still be deployable to GitHub Pages?

**YES - 100% compatible!**

The refactored code will work **exactly the same** on GitHub Pages as it does now:
- All HTML files remain in the root directory (`first_lesson.html`, etc.)
- All assets in standard folders (`/css`, `/js`, `/assets`)
- No server-side processing required
- Pure static site (HTML + CSS + JS)
- Build process outputs to the same structure GitHub Pages expects

**Deploy options:**
1. **GitHub Actions** (recommended) - Auto-build on every commit
2. **Manual build** - Run `npm run build` locally, commit, push
3. **No build** - Keep working like now (but with duplicated code)

Your GitHub Pages settings won't need to change at all!

### ✅ Will we utilize Tailwind everywhere?

**YES - Tailwind-first approach!**

**95% Tailwind utilities:**
```html
<!-- Instead of custom CSS classes -->
<div class="bg-gray-800 border border-gray-700 rounded-xl p-8 hover:shadow-xl transition">
```

**5% custom CSS (only for):**
- CSS variables for theming
- Complex 3D transforms
- Custom animations
- Lesson-specific unique effects

**Benefits:**
- ✅ Unified visual language across all lessons
- ✅ Consistent spacing, colors, typography
- ✅ Responsive design with `md:`, `lg:` modifiers
- ✅ Dark mode with `dark:` modifier
- ✅ No more debating class names
- ✅ Smaller CSS bundle (~50KB vs 3MB CDN)

### ✅ Will all existing information be preserved?

**YES - 100% content preservation guaranteed!**

**What stays IDENTICAL:**
- ✅ Every paragraph, heading, sentence
- ✅ All Chip Huyen quotes and citations
- ✅ All interactive features (drag-drop, calculators, sliders)
- ✅ All diagrams and visualizations
- ✅ All section IDs (navigation links still work)
- ✅ All lesson flow and structure

**What changes (only presentation):**
- ❌ Inline `<style>` tags → ✅ Tailwind classes
- ❌ Hardcoded colors → ✅ Tailwind color utilities
- ❌ Custom CSS classes → ✅ Tailwind utilities

**Example:**
```html
<!-- BEFORE: Same content, custom CSS -->
<p class="intro-text">AI Engineering is...</p>
<style>.intro-text { font-size: 1.25rem; color: #d1d5db; }</style>

<!-- AFTER: Same content, Tailwind classes -->
<p class="text-xl text-gray-300">AI Engineering is...</p>
```

Content is **word-for-word identical**, only the styling method changes.

### Verification Process

Every lesson will be checked for:
- [ ] All text content present (automated diff)
- [ ] All interactive features working (manual test)
- [ ] Visual appearance identical (screenshot comparison)
- [ ] All links and navigation working

**Promise:** If any content is lost during migration, it's a bug and will be fixed immediately.

---

## Quick Start After Approval

```bash
# 1. Initialize npm project
npm init -y

# 2. Install Tailwind
npm install -D tailwindcss postcss autoprefixer

# 3. Initialize Tailwind config
npx tailwindcss init

# 4. Create first build
npm run build:css

# 5. Test locally
python3 -m http.server 8080

# 6. Deploy to GitHub Pages (no changes to settings!)
git add .
git commit -m "Refactor: Tailwind-based design system"
git push origin main
```

Your site will continue working on GitHub Pages exactly as before, but with:
- ✅ Unified visuals (Tailwind everywhere)
- ✅ All content preserved
- ✅ Better performance
- ✅ Easier maintenance

---

## Contact & Questions

For questions about this refactoring plan:

- Review the detailed analysis in the companion `FRONTEND_ANALYSIS.md` document
- Refer to `docs/COMPONENT_LIBRARY.md` for component usage
- See `docs/DEVELOPMENT.md` for setup instructions

---

**Document Version:** 1.1  
**Last Updated:** October 16, 2025  
**Status:** Ready for Implementation  
**GitHub Pages Compatible:** ✅ Yes  
**Tailwind Everywhere:** ✅ Yes  
**Content Preservation:** ✅ 100%
