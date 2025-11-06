# AI Engineering Lessons

Educational materials for AI Engineering course based on Chip Huyen's book "AI Engineering: Building Applications with Foundation Models".

## Overview

This repository contains 7 interactive lesson HTML files covering key topics in AI Engineering:

1. **Introduction to Building AI Applications** - The paradigm shift and fundamentals
2. **Deconstructing the Foundation Model** - Architecture and inner workings
3. **Evaluation Methodology** - Metrics, benchmarks, and assessment
4. **Evaluate AI Systems** - Practical evaluation techniques
5. **Prompt Engineering** - Crafting effective prompts
6. **RAG and Agents** - Retrieval-Augmented Generation and AI agents
7. **Finetuning** - Customizing foundation models

## Development

### Prerequisites

- Node.js 18+ and npm
- Python 3 (for local server)

### Setup

Install dependencies:
```bash
npm install
```

### Building Assets

Build CSS (Tailwind):
```bash
npm run build:css
```

Build JavaScript:
```bash
npm run build:js
```

Build all:
```bash
npm run build
```

### Development Mode

Watch CSS changes:
```bash
npm run dev:css
```

### Local Testing

Serve locally:
```bash
npm run serve
# Visit http://localhost:8080
```

## Deployment

This site is deployed via **GitHub Pages**. The built files are committed to the repository.

To deploy:
1. Make changes to source files in `src/`
2. Run `npm run build`
3. Commit changes
4. Push to `main` branch

GitHub Pages will automatically serve the updated site.

## Architecture

### Directory Structure

```
.
├── index.html                    # Landing page
├── first_lesson.html            # Lesson HTML files
├── ...
├── seventh_lesson.html
├── css/
│   └── main.min.css            # Compiled Tailwind CSS (~23KB)
├── js/
│   └── utils.js                # Compiled shared utilities (~4.4KB)
├── src/
│   ├── css/
│   │   ├── main.css            # CSS entry point
│   │   ├── base/
│   │   │   └── variables.css   # CSS custom properties
│   │   └── components/
│   │       └── animations.css  # Custom animations
│   └── js/
│       ├── main.js             # JS entry point
│       ├── utils/
│       │   ├── scroll-animation.js
│       │   ├── nav-observer.js
│       │   └── mobile-menu.js
│       └── lessons/
│           ├── lesson-1.js     # Lesson-specific code
│           └── ...
├── scripts/
│   └── bundle-js.js            # JavaScript bundler
├── package.json
├── tailwind.config.js
└── .gitignore
```

### Technology Stack

- **CSS Framework:** Tailwind CSS v3.4.0 (custom build)
- **JavaScript:** Vanilla ES6 (no framework)
- **Build Tools:** Tailwind CLI, custom Node.js bundler
- **Deployment:** GitHub Pages (static hosting)

## Design System

### Colors

The site uses a dark theme with the following color palette:

- **Primary:** Blue/Indigo (#4f46e5 - #6366f1)
- **Background:** Gray 900-950 (#111827 - #030712)
- **Text:** White and Gray 300-400
- **Borders:** Gray 700-800

### Typography

- **Font Family:** Inter (from Google Fonts)
- **Headings:** Bold, various sizes (text-3xl to text-6xl)
- **Body:** Regular weight, text-base to text-lg

### Components

- **Cards:** 3D hover effect with rounded corners
- **Quotes:** Blue left border with italic text
- **Navigation:** Sticky top navigation with active states
- **Sections:** Full-height centered layouts

## Performance

### Bundle Sizes

- CSS: **23KB** (minified, vs 3MB CDN)
- JavaScript: **4.4KB** (bundled)
- Total: **~27KB** of custom assets

### Optimizations

- Custom Tailwind build (purged unused classes)
- Minified CSS and JavaScript
- No external dependencies (except fonts)
- Optimized for GitHub Pages static serving

## Content Attribution

All lesson content is primarily based on:

**AI Engineering: Building Applications with Foundation Models (1st Edition)**  
by Chip Huyen  
Published by O'Reilly Media, 2025

Additional supplementary materials from other sources where noted.

## License

See LICENSE file for details.

## Development Notes

### Migrating Lessons

When migrating lessons to the unified design system:

1. **Backup:** `cp lesson.html lesson.html.backup`
2. **Update head:** Replace CDN with local CSS
3. **Convert classes:** Use Tailwind utilities instead of custom CSS
4. **Extract JS:** Move to `src/js/lessons/lesson-N.js`
5. **Test:** Check all interactive features work
6. **Verify:** Ensure all content and citations preserved

### Code Style

- Use Tailwind utilities first
- Keep custom CSS minimal (only for complex interactions)
- Extract reusable utilities to shared files
- Keep lesson-specific code in separate files
- Preserve all educational content exactly

## Contributing

When contributing:

1. Preserve all educational content (text, citations, quotes)
2. Maintain all interactive features
3. Follow existing code patterns
4. Test thoroughly before committing
5. Update documentation as needed

## Support

For issues or questions, please open an issue on GitHub.
