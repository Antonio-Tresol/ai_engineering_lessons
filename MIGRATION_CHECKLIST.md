# Quick Reference Checklist - Per Lesson Migration

Use this checklist for each lesson migration to ensure nothing is missed.

---

## Pre-Migration

- [ ] Backup original file: `cp [lesson].html [lesson].html.backup`
- [ ] Read entire current lesson file
- [ ] Identify all section IDs
- [ ] Identify all interactive elements
- [ ] Identify all custom CSS in `<style>` blocks
- [ ] Identify all custom JavaScript in `<script>` tags
- [ ] Screenshot current appearance (full page scroll)

---

## Head Section Updates

```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[Keep original title]</title>
    
    <!-- Fonts (keep as-is) -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- CHANGE: Use local build, not CDN -->
    <link rel="stylesheet" href="/css/main.min.css">
    
    <!-- If lesson needs KaTeX (Lesson 7 only) -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.0/dist/katex.min.css">
</head>
```

- [ ] Replace Tailwind CDN with `/css/main.min.css`
- [ ] Keep Google Fonts link
- [ ] Keep KaTeX if needed (Lesson 7 only)
- [ ] Remove any other `<style>` or `<link>` tags

---

## HTML Element Updates

- [ ] Add classes to `<html>`: `class="dark scroll-smooth"`
- [ ] Add classes to `<body>`: `class="bg-gray-950 text-white font-sans"`

---

## CSS Conversion Patterns

### Sections (Full-height centered)
```html
<!-- BEFORE -->
<section class="section" id="intro">

<style>
.section {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-center;
    align-items: center;
    padding: 6rem 2rem;
    border-bottom: 1px solid #1f2937;
}
</style>

<!-- AFTER -->
<section id="intro" class="min-h-screen flex flex-col justify-center items-center px-8 py-24 border-b border-gray-800">
```

- [ ] Convert all `.section` to Tailwind classes
- [ ] Preserve all `id` attributes

### Navigation
```html
<!-- BEFORE -->
<nav class="sticky top-0 bg-gray-900">

<!-- AFTER -->
<nav class="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-16">
      <a href="index.html" class="text-xl font-bold text-white">AI Engineering</a>
      <ul class="hidden md:flex space-x-8">
        <li><a href="#intro" class="nav-link text-gray-300 hover:text-white transition">Link</a></li>
      </ul>
    </div>
  </div>
</nav>
```

- [ ] Use consistent navigation structure across all lessons
- [ ] Add `nav-link` class to all navigation links
- [ ] Preserve all `href` values

### Cards
```html
<!-- BEFORE -->
<div class="card">

<style>
.card {
    background-color: #1f2937;
    border: 1px solid #374151;
    border-radius: 0.75rem;
    padding: 2rem;
}
</style>

<!-- AFTER -->
<div class="bg-gray-800 border border-gray-700 rounded-xl p-8 card-3d hover:shadow-xl transition-all">
```

- [ ] Convert all card styles to Tailwind
- [ ] Add `card-3d` for 3D hover effect (optional)
- [ ] Use consistent padding (`p-8`)

### Quotes
```html
<!-- BEFORE -->
<blockquote class="quote">

<style>
.quote {
    font-style: italic;
    color: #9ca3af;
    border-left: 3px solid #4f46e5;
    padding-left: 1.5rem;
}
</style>

<!-- AFTER -->
<blockquote class="max-w-4xl mx-auto my-12 border-l-4 border-blue-500 pl-6 italic text-gray-400">
```

- [ ] Convert all quotes to Tailwind
- [ ] Keep citation format consistent

### Grids
```html
<!-- BEFORE -->
<div class="grid">

<style>
.grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}
</style>

<!-- AFTER -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
```

- [ ] Convert grid layouts to Tailwind
- [ ] Use responsive breakpoints (`md:`, `lg:`)

---

## JavaScript Extraction

### Create lesson-specific file
- [ ] Create `src/js/lessons/lesson-[N].js`
- [ ] Move ALL JavaScript from `<script>` tags to this file
- [ ] Wrap in `DOMContentLoaded`:

```javascript
document.addEventListener('DOMContentLoaded', () => {
  // All lesson-specific code here
  
  // Example: Tab switcher
  const tabs = document.querySelectorAll('[data-tab]');
  if (tabs.length) {
    // tab logic
  }
});
```

### Update HTML script loading
```html
<!-- At end of <body> -->
  
  <!-- Shared utilities -->
  <script src="/js/utils.js"></script>
  
  <!-- Lesson-specific (if needed) -->
  <script src="/src/js/lessons/lesson-[N].js"></script>
</body>
```

- [ ] Remove ALL `<script>` tags with inline code
- [ ] Add shared utilities script
- [ ] Add lesson-specific script (if needed)

---

## Content Verification

**Every single item must be checked:**

- [ ] All `<h1>` tags present
- [ ] All `<h2>` tags present
- [ ] All `<h3>` tags present
- [ ] All paragraphs present (word-for-word)
- [ ] All blockquotes present
- [ ] All Chip Huyen citations present with page numbers
- [ ] All `<ul>` and `<ol>` lists present
- [ ] All `<li>` items present
- [ ] All code blocks present
- [ ] All images present (if any)
- [ ] All links present and working
- [ ] All section `id` attributes present
- [ ] All `data-*` attributes present (for interactive elements)

---

## Interactive Features Verification

**Lesson-specific features:**

### Lesson 1
- [ ] Tab switcher works (click tabs)
- [ ] Crawl-Walk-Run interactive works
- [ ] Scroll animations work

### Lesson 2
- [ ] Shoggoth layer animation works
- [ ] Temperature slider works
- [ ] Scroll animations work

### Lesson 3
- [ ] Drag-and-drop evaluation builder works
- [ ] Perplexity calculator works
- [ ] Bias explorer works
- [ ] ELO rating game works
- [ ] ALL must be keyboard accessible

### Lesson 4
- [ ] Navigation works (if keeping sidebar, or new horizontal nav)
- [ ] Scroll animations work

### Lesson 5
- [ ] Scroll animations work
- [ ] All static content present

### Lesson 6
- [ ] Mobile menu toggle works
- [ ] Scroll animations work
- [ ] Tabbed sections work

### Lesson 7
- [ ] KaTeX math renders correctly
- [ ] `<details>`/`<summary>` accordions work
- [ ] All native HTML functionality preserved

---

## Testing

### Local Server Test
```bash
npm run serve
# Visit http://localhost:8080/[lesson].html
```

- [ ] Page loads without errors
- [ ] No console errors
- [ ] All content visible
- [ ] All styles applied correctly

### Visual Comparison
- [ ] Compare with screenshot of original
- [ ] Check header matches
- [ ] Check all sections match
- [ ] Check footer matches
- [ ] Check responsive behavior (resize browser)

### Mobile Testing
- [ ] Test at 375px width (mobile)
- [ ] Test at 768px width (tablet)
- [ ] Test at 1024px width (desktop)
- [ ] Navigation works on mobile
- [ ] All content readable on mobile

### Interactive Testing
- [ ] Click all navigation links
- [ ] Test all custom interactions
- [ ] Test all form inputs (if any)
- [ ] Test all buttons
- [ ] Test keyboard navigation (Tab key)

### Performance
- [ ] Page loads in < 2 seconds
- [ ] No layout shifts
- [ ] Smooth scrolling
- [ ] Animations smooth

---

## Final Cleanup

- [ ] Remove ALL `<style>` blocks
- [ ] Remove ALL inline `<script>` tags
- [ ] Remove ALL inline `style=""` attributes
- [ ] Verify no Tailwind CDN (`<script src="https://cdn.tailwindcss.com"></script>`)
- [ ] Verify local CSS build linked (`/css/main.min.css`)
- [ ] Format HTML (consistent indentation)
- [ ] Remove debug code/comments

---

## Commit

```bash
git add [lesson].html src/js/lessons/lesson-[N].js
git commit -m "refactor(lesson-[N]): Migrate to Tailwind with 100% content preservation

- Convert all custom CSS to Tailwind utilities
- Extract JavaScript to external file
- Preserve all educational content
- Preserve all interactive features
- Test all functionality
"
git push origin refactor/tailwind-unified-design
```

- [ ] Commit with descriptive message
- [ ] Push to feature branch

---

## Post-Migration Verification

- [ ] Original lesson backed up
- [ ] New lesson tested
- [ ] All features working
- [ ] Content identical
- [ ] Visual consistency with other migrated lessons
- [ ] No regressions

---

## Common Tailwind Classes Reference

### Colors
- Text: `text-white`, `text-gray-300`, `text-gray-400`, `text-blue-400`
- Background: `bg-gray-950`, `bg-gray-900`, `bg-gray-800`
- Borders: `border-gray-800`, `border-gray-700`, `border-blue-500`

### Spacing
- Padding: `p-8` (2rem), `px-8` (x-axis), `py-24` (y-axis)
- Margin: `mb-8` (bottom), `mt-12` (top), `mx-auto` (x-axis auto)
- Gap: `gap-6`, `gap-8`, `space-x-8`

### Layout
- Flex: `flex`, `flex-col`, `items-center`, `justify-center`
- Grid: `grid`, `grid-cols-1`, `md:grid-cols-2`, `lg:grid-cols-3`
- Width: `w-full`, `max-w-4xl`, `max-w-7xl`
- Height: `min-h-screen`, `h-16`

### Typography
- Size: `text-xl`, `text-2xl`, `text-5xl`, `text-6xl`
- Weight: `font-bold`, `font-semibold`, `font-medium`
- Style: `italic`, `not-italic`

### Effects
- Shadows: `shadow-xl`
- Transitions: `transition`, `transition-all`
- Hover: `hover:shadow-xl`, `hover:text-white`, `hover:-translate-y-1`
- Border radius: `rounded-xl`, `rounded-lg`

### Responsive
- Breakpoints: `sm:`, `md:`, `lg:`, `xl:`
- Example: `hidden md:flex` (hidden on mobile, flex on desktop)

---

## Emergency Rollback

If something goes wrong:

```bash
# Restore from backup
cp [lesson].html.backup [lesson].html

# Or reset from git
git checkout main -- [lesson].html
```

---

**Use this checklist for EVERY lesson to ensure consistency and quality!** ✅
