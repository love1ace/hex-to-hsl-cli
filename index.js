#!/usr/bin/env node

const hexToRgb = (hex) => {
  hex = hex.replace('#', '');
  if (hex.length !== 6) {
    console.error("Invalid hex color. Please provide a valid 6-character hex code.");
    process.exit(1);
  }
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  return { r, g, b };
};

const rgbToHsl = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  h = Math.round(h * 360);
  s = Math.round(s * 100);
  l = Math.round(l * 100);

  return { h, s, l };
};

const [hex] = process.argv.slice(2);

if (!hex) {
  console.error("Usage: hex-to-hsl-cli <hex>");
  process.exit(1);
}

const { r, g, b } = hexToRgb(hex);
const { h, s, l } = rgbToHsl(r, g, b);

console.log(`HEX: ${hex}`);
console.log(`HSL: (${h}°, ${s}%, ${l}%)`);

console.log(`\x1b[48;2;${r};${g};${b}m   COLOR   \x1b[0m`);