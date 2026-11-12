// Generates public/og.jpg (social card) and public/icon-512.png — typographic, no photography.
import sharp from "sharp";

let stars = "";
for (let i = 0; i < 900; i++) {
  const a = Math.random() * Math.PI * 2, r = Math.pow(Math.random(), 1.7) * 520;
  const x = 860 + Math.cos(a + r / 140) * r, y = 315 + Math.sin(a + r / 140) * r * 0.42;
  const o = (1 - r / 520) * 0.9;
  stars += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(Math.random() * 1.4 + 0.3).toFixed(2)}" fill="#f3dfb2" opacity="${o.toFixed(2)}"/>`;
}
const og = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
<defs>
 <radialGradient id="glow" cx="72%" cy="50%" r="55%"><stop offset="0" stop-color="#d6b67c" stop-opacity=".28"/><stop offset=".5" stop-color="#d6b67c" stop-opacity=".05"/><stop offset="1" stop-color="#0a0908" stop-opacity="0"/></radialGradient>
 <linearGradient id="gold" x1="0" x2="1"><stop offset="0" stop-color="#8f6d3b"/><stop offset=".45" stop-color="#f6e4b8"/><stop offset="1" stop-color="#b8955a"/></linearGradient>
</defs>
<rect width="1200" height="630" fill="#0a0908"/><rect width="1200" height="630" fill="url(#glow)"/>${stars}
<ellipse cx="860" cy="315" rx="300" ry="300" fill="none" stroke="#d6b67c" stroke-opacity=".12"/>
<ellipse cx="860" cy="315" rx="420" ry="420" fill="none" stroke="#d6b67c" stroke-opacity=".07"/>
<g font-family="Georgia, 'Times New Roman', serif">
 <text x="80" y="128" font-family="Helvetica, Arial" font-size="17" letter-spacing="5" fill="#d6b67c">AI &amp; FULL-STACK ENGINEER  ·  CHANDIGARH, INDIA</text>
 <text x="74" y="300" font-size="132" fill="#f2ead9" letter-spacing="-4">Vishal</text>
 <text x="74" y="430" font-size="132" font-style="italic" fill="url(#gold)" letter-spacing="-4">Rana</text>
</g>
<rect x="80" y="490" width="56" height="1.5" fill="#d6b67c"/>
<text x="80" y="540" font-family="Helvetica, Arial" font-size="22" fill="#b4ab9b">LLM agents · Voice AI · Automation — Python · Java · Kotlin · TypeScript</text>
</svg>`;
await sharp(Buffer.from(og)).jpeg({ quality: 88 }).toFile("public/og.jpg");

const icon = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 64 64"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f3dfb2"/><stop offset="1" stop-color="#a7834a"/></linearGradient></defs><rect width="64" height="64" fill="#0a0908"/><path d="M15 18l11 28 11-28M36 46V18h7a7 7 0 010 14h-7m7 0l6 14" fill="none" stroke="url(#g)" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
await sharp(Buffer.from(icon)).png().toFile("public/icon-512.png");
console.log("og + icon generated");
