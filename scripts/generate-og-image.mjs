import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const WIDTH = 1200;
const HEIGHT = 630;
const cx = 930;
const cy = 315;
const rClock = 160;

const clockNumbers = [
  { num: 9, deg: 0 },
  { num: 1, deg: 40 },
  { num: 2, deg: 80 },
  { num: 3, deg: 120 },
  { num: 4, deg: 160 },
  { num: 5, deg: 200 },
  { num: 6, deg: 240 },
  { num: 7, deg: 280 },
  { num: 8, deg: 320 }
];

const clockElements = clockNumbers.map(({ num, deg }) => {
  const rad = (deg * Math.PI) / 180;
  const x = (cx + rClock * Math.sin(rad)).toFixed(1);
  const y = (cy - rClock * Math.cos(rad)).toFixed(1);
  const r1 = 185, r2 = 197;
  const tx1 = (cx + r1 * Math.sin(rad)).toFixed(1);
  const ty1 = (cy - r1 * Math.cos(rad)).toFixed(1);
  const tx2 = (cx + r2 * Math.sin(rad)).toFixed(1);
  const ty2 = (cy - r2 * Math.cos(rad)).toFixed(1);

  return `
    <line x1="${tx1}" y1="${ty1}" x2="${tx2}" y2="${ty2}" stroke="#D4AF37" stroke-width="2.5" stroke-linecap="round" opacity="0.8"/>
    <text x="${x}" y="${y}" fill="#FFFFFF" font-family="'DM Serif Display', Georgia, serif" font-size="26" text-anchor="middle" dominant-baseline="central">${num}</text>
  `;
}).join('');

const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${WIDTH} ${HEIGHT}" width="${WIDTH}" height="${HEIGHT}">
  <defs>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000000" flood-opacity="0.4"/>
    </filter>
  </defs>

  <!-- Fondo Navy Profundo -->
  <rect width="${WIDTH}" height="${HEIGHT}" fill="#0B1B3D"/>
  <rect x="24" y="24" width="${WIDTH - 48}" height="${HEIGHT - 48}" rx="20" fill="none" stroke="#D4AF37" stroke-opacity="0.3" stroke-width="2"/>

  <!-- Cuadrante Numerológico / Sacred Geometry (Derecha) -->
  <g>
    <circle cx="${cx}" cy="${cy}" r="260" fill="none" stroke="#D4AF37" stroke-opacity="0.12" stroke-width="1.5"/>
    <circle cx="${cx}" cy="${cy}" r="215" fill="none" stroke="#D4AF37" stroke-opacity="0.2" stroke-width="2"/>
    <circle cx="${cx}" cy="${cy}" r="185" fill="none" stroke="#D4AF37" stroke-opacity="0.7" stroke-width="3"/>
    <circle cx="${cx}" cy="${cy}" r="130" fill="none" stroke="#D4AF37" stroke-opacity="0.5" stroke-width="2.5"/>

    ${clockElements}

    <circle cx="${cx}" cy="${cy}" r="75" fill="#162B55" stroke="#D4AF37" stroke-width="3"/>
    <path d="M${cx} ${cy - 48} L${cx + 16} ${cy - 8} L${cx + 56} ${cy} L${cx + 16} ${cy + 8} L${cx} ${cy + 48} L${cx - 16} ${cy + 8} L${cx - 56} ${cy} L${cx - 16} ${cy - 8} Z" fill="#D4AF37"/>
    <circle cx="${cx}" cy="${cy}" r="5" fill="#0B1B3D"/>
  </g>

  <!-- Contenido Textual Institucional (Izquierda) -->
  <g transform="translate(80, 0)">
    <!-- Kicker Badge -->
    <g transform="translate(0, 95)">
      <rect width="340" height="38" rx="19" fill="#162B55" stroke="#D4AF37" stroke-opacity="0.6" stroke-width="1.5"/>
      <text x="170" y="24" fill="#D4AF37" font-family="'DM Sans', Arial, sans-serif" font-size="12" font-weight="700" letter-spacing="3" text-anchor="middle">NUMEROLOGÍA PITAGÓRICA · ASTROKAB</text>
    </g>

    <!-- Nombre de Marca Principal -->
    <text x="0" y="225" fill="#D4AF37" font-family="'DM Serif Display', Georgia, serif" font-size="82" font-weight="700" letter-spacing="4" filter="url(#shadow)">Astrodatha</text>

    <!-- Subtítulo / Tagline -->
    <text x="0" y="285" fill="#FFFFFF" font-family="'DM Serif Display', Georgia, serif" font-size="32" font-weight="400" letter-spacing="1">Numerología y Sanación del Alma</text>

    <!-- Separador fino -->
    <line x1="0" y1="325" x2="380" y2="325" stroke="#D4AF37" stroke-opacity="0.4" stroke-width="2"/>

    <!-- Descripción / Propósito -->
    <text x="0" y="375" fill="#E2E8F0" font-family="'DM Sans', Arial, sans-serif" font-size="20" font-weight="400">Descubre el código de tu alma y transforma tu vida</text>
    <text x="0" y="408" fill="#E2E8F0" font-family="'DM Sans', Arial, sans-serif" font-size="20" font-weight="400">con propósito divino.</text>

    <text x="0" y="458" fill="#94A3B8" font-family="'DM Sans', Arial, sans-serif" font-size="16">Sesiones individuales con tu hora y fecha de nacimiento.</text>

    <!-- Badges inferiores -->
    <g transform="translate(0, 500)">
      <rect x="0" y="0" width="210" height="38" rx="19" fill="#162B55" stroke="#D4AF37" stroke-opacity="0.4" stroke-width="1.2"/>
      <text x="105" y="24" fill="#D4AF37" font-family="'DM Sans', Arial, sans-serif" font-size="13" font-weight="600" text-anchor="middle">★ Guía: Mary Marín</text>

      <rect x="225" y="0" width="235" height="38" rx="19" fill="#162B55" stroke="#25D366" stroke-opacity="0.5" stroke-width="1.2"/>
      <text x="342" y="24" fill="#FFFFFF" font-family="'DM Sans', Arial, sans-serif" font-size="13" font-weight="600" text-anchor="middle">WhatsApp: +51 939 103 009</text>
    </g>
  </g>
</svg>`;

const publicDir = path.resolve('public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const tempHtmlPath = path.resolve(publicDir, 'temp-og.html');
const outPngPath = path.resolve(publicDir, 'og-image.png');

const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body { width: ${WIDTH}px; height: ${HEIGHT}px; overflow: hidden; background: #0B1B3D; }
    svg { width: ${WIDTH}px; height: ${HEIGHT}px; display: block; }
  </style>
</head>
<body>
  ${svgContent}
</body>
</html>`;

fs.writeFileSync(tempHtmlPath, htmlContent, 'utf-8');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const command = `"${edgePath}" --headless --disable-gpu --screenshot="${outPngPath}" --window-size=${WIDTH},${HEIGHT} --hide-scrollbars "file://${tempHtmlPath}"`;

console.log('Generando og-image.png en 1200x630...');
execSync(command, { stdio: 'inherit' });

fs.unlinkSync(tempHtmlPath);
console.log('Imagen generada con éxito:', outPngPath);
