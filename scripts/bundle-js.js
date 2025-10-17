const fs = require('fs');
const path = require('path');

// Read main.js and dependencies (simple concatenation)
const mainJs = fs.readFileSync(path.join(__dirname, '../src/js/main.js'), 'utf8');
const scrollAnim = fs.readFileSync(path.join(__dirname, '../src/js/utils/scroll-animation.js'), 'utf8');
const navObs = fs.readFileSync(path.join(__dirname, '../src/js/utils/nav-observer.js'), 'utf8');
const mobileMenu = fs.readFileSync(path.join(__dirname, '../src/js/utils/mobile-menu.js'), 'utf8');

// Combine (remove export/import statements for simple bundle)
let bundle = `
// Scroll Animation Utility
${scrollAnim.replace(/export /g, '')}

// Nav Observer Utility
${navObs.replace(/export /g, '')}

// Mobile Menu Utility
${mobileMenu.replace(/export /g, '')}

// Main Initialization
${mainJs.replace(/import .+;/g, '').replace(/export /g, '')}
`;

// Write to output
fs.writeFileSync(path.join(__dirname, '../js/utils.js'), bundle);
console.log('✓ JavaScript bundled to js/utils.js');
