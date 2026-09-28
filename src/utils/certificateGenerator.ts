import { jsPDF } from 'jspdf';
import confetti from 'canvas-confetti';

interface CertificateData {
  userName: string;
  rankTitle: string;
  level: number;
  xp: number;
  masteredPatternsCount: number;
  serialId: string;
  issueDate: string;
}

/**
 * Robust constructor resolver for jsPDF in ESM/Vite environments.
 */
function getJsPdfInstance(): jsPDF {
  try {
    if (typeof jsPDF === 'function') {
      return new jsPDF('landscape', 'mm', 'a4');
    }
    const anyJsPdf = jsPDF as any;
    if (typeof anyJsPdf?.jsPDF === 'function') {
      return new anyJsPdf.jsPDF('landscape', 'mm', 'a4');
    }
    if (typeof anyJsPdf?.default === 'function') {
      return new anyJsPdf.default('landscape', 'mm', 'a4');
    }
    if (typeof anyJsPdf?.default?.jsPDF === 'function') {
      return new anyJsPdf.default.jsPDF('landscape', 'mm', 'a4');
    }
  } catch (e) {
    console.warn('Direct jsPDF resolution fallback:', e);
  }
  return new (jsPDF as any)('landscape', 'mm', 'a4');
}

/**
 * Renders a high-resolution, pixel-perfect 300 DPI Certificate onto an HTML5 Canvas.
 * This completely avoids DOM cloning, SVG CORS bugs, and iframe sandbox restrictions.
 */
export function renderCertificateToCanvas(data: CertificateData): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  // High-resolution A4 landscape proportions (2480 x 1754 px at ~215-300 dpi)
  canvas.width = 2480;
  canvas.height = 1754;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas 2D context not supported');

  const { width, height } = canvas;

  // 1. Deep Obsidian Background with Radial Glow
  const bgGrad = ctx.createRadialGradient(width / 2, height / 2, 100, width / 2, height / 2, width * 0.7);
  bgGrad.addColorStop(0, '#0a1226');
  bgGrad.addColorStop(0.5, '#060a17');
  bgGrad.addColorStop(1, '#03050c');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // 2. Outer Ornate Golden Borders
  // Outer border
  ctx.strokeStyle = '#F5A623';
  ctx.lineWidth = 8;
  ctx.strokeRect(50, 50, width - 100, height - 100);

  // Inner subtle border
  ctx.strokeStyle = 'rgba(245, 166, 35, 0.4)';
  ctx.lineWidth = 2;
  ctx.strokeRect(70, 70, width - 140, height - 140);

  // Third accent border
  ctx.strokeStyle = 'rgba(245, 166, 35, 0.2)';
  ctx.lineWidth = 1;
  ctx.strokeRect(84, 84, width - 168, height - 168);

  // Corner ornamental brackets
  const cornerSize = 60;
  const corners = [
    { x: 50, y: 50, dx: 1, dy: 1 },
    { x: width - 50, y: 50, dx: -1, dy: 1 },
    { x: 50, y: height - 50, dx: 1, dy: -1 },
    { x: width - 50, y: height - 50, dx: -1, dy: -1 }
  ];

  ctx.strokeStyle = '#F5A623';
  ctx.lineWidth = 6;
  corners.forEach(c => {
    ctx.beginPath();
    ctx.moveTo(c.x + c.dx * cornerSize, c.y);
    ctx.lineTo(c.x, c.y);
    ctx.lineTo(c.x, c.y + c.dy * cornerSize);
    ctx.stroke();

    // Corner diamond accent
    ctx.fillStyle = '#F5A623';
    ctx.beginPath();
    ctx.arc(c.x + c.dx * 18, c.y + c.dy * 18, 5, 0, Math.PI * 2);
    ctx.fill();
  });

  // 3. Draw Candlestick Circle Emblem (Global Forex Club Official Mark)
  const emblemX = width / 2;
  const emblemY = 195;
  const emblemR = 48;

  // Outer gold ring
  ctx.beginPath();
  ctx.arc(emblemX, emblemY, emblemR, 0, Math.PI * 2);
  ctx.fillStyle = '#03050c';
  ctx.fill();
  ctx.lineWidth = 8;
  ctx.strokeStyle = '#F5A623';
  ctx.stroke();

  // Left Bearish Red Candle
  ctx.strokeStyle = '#E52525';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(emblemX - 16, emblemY - 26);
  ctx.lineTo(emblemX - 16, emblemY + 28);
  ctx.stroke();
  ctx.fillStyle = '#E52525';
  ctx.fillRect(emblemX - 22, emblemY - 10, 12, 26);

  // Center Small Red Dip Candle
  ctx.beginPath();
  ctx.moveTo(emblemX, emblemY + 4);
  ctx.lineTo(emblemX, emblemY + 26);
  ctx.stroke();
  ctx.fillRect(emblemX - 4, emblemY + 10, 8, 10);

  // Right Bullish Green Candle
  ctx.strokeStyle = '#00C853';
  ctx.beginPath();
  ctx.moveTo(emblemX + 16, emblemY - 32);
  ctx.lineTo(emblemX + 16, emblemY + 26);
  ctx.stroke();
  ctx.fillStyle = '#00C853';
  ctx.fillRect(emblemX + 10, emblemY - 16, 12, 30);

  // 4. Brand Name: "Global Forex Club"
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  ctx.font = '900 44px "Plus Jakarta Sans", system-ui, sans-serif';
  const brandY = 280;

  // Measure and draw "Global Forex Club" with Forex in Gold
  const part1 = "Global ";
  const part2 = "Forex ";
  const part3 = "Club";
  const w1 = ctx.measureText(part1).width;
  const w2 = ctx.measureText(part2).width;
  const w3 = ctx.measureText(part3).width;
  const totalBrandW = w1 + w2 + w3;
  let startX = (width - totalBrandW) / 2;

  ctx.textAlign = 'left';
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText(part1, startX, brandY);
  startX += w1;

  ctx.fillStyle = '#F5A623';
  ctx.fillText(part2, startX, brandY);
  startX += w2;

  ctx.fillStyle = '#FFFFFF';
  ctx.fillText(part3, startX, brandY);

  // Brand Slogan: "with you every pip of the trade"
  ctx.textAlign = 'center';
  ctx.font = 'italic 700 28px "Caveat", "Dancing Script", cursive, serif';
  ctx.fillStyle = '#F5A623';
  ctx.fillText('with you every pip of the trade', width / 2, brandY + 40);

  // 5. Academy Subtitle
  ctx.font = '800 20px "JetBrains Mono", monospace';
  ctx.fillStyle = '#94A3B8';
  ctx.fillText('INSTITUTIONAL TECHNICAL ANALYSIS & CAPITAL DEFENSE ACADEMY', width / 2, 380);

  // 6. Main Certificate Title
  ctx.font = '900 66px "Orbitron", "Plus Jakarta Sans", sans-serif';
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText('CERTIFICATE OF TECHNICAL MASTERY', width / 2, 470);

  // Gold accent divider
  const divGrad = ctx.createLinearGradient(width / 2 - 250, 0, width / 2 + 250, 0);
  divGrad.addColorStop(0, 'rgba(245, 166, 35, 0)');
  divGrad.addColorStop(0.5, 'rgba(245, 166, 35, 1)');
  divGrad.addColorStop(1, 'rgba(245, 166, 35, 0)');
  ctx.strokeStyle = divGrad;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(width / 2 - 250, 520);
  ctx.lineTo(width / 2 + 250, 520);
  ctx.stroke();

  // "This official credential certifies that"
  ctx.font = '600 24px "JetBrains Mono", monospace';
  ctx.fillStyle = '#CBD5E1';
  ctx.fillText('THIS OFFICIAL ACADEMIC CREDENTIAL CERTIFIES THAT', width / 2, 575);

  // 7. Recipient Name Plaque
  const plaqueW = Math.max(900, ctx.measureText(data.userName || 'Dedicated Market Trader').width * 1.5);
  const plaqueH = 130;
  const plaqueX = (width - plaqueW) / 2;
  const plaqueY = 625;

  // Plaque gradient background
  const plaqueGrad = ctx.createLinearGradient(plaqueX, plaqueY, plaqueX + plaqueW, plaqueY);
  plaqueGrad.addColorStop(0, 'rgba(245, 166, 35, 0.08)');
  plaqueGrad.addColorStop(0.5, 'rgba(15, 23, 42, 0.95)');
  plaqueGrad.addColorStop(1, 'rgba(245, 166, 35, 0.08)');
  ctx.fillStyle = plaqueGrad;
  ctx.fillRect(plaqueX, plaqueY, plaqueW, plaqueH);

  // Plaque borders
  ctx.strokeStyle = '#F5A623';
  ctx.lineWidth = 2;
  ctx.strokeRect(plaqueX, plaqueY, plaqueW, plaqueH);

  // Student Full Name in Large Elegant Regal Typography
  ctx.font = '900 68px "Plus Jakarta Sans", serif';
  const nameGrad = ctx.createLinearGradient(0, plaqueY, 0, plaqueY + plaqueH);
  nameGrad.addColorStop(0, '#FFFFFF');
  nameGrad.addColorStop(0.5, '#FDE68A');
  nameGrad.addColorStop(1, '#F5A623');
  ctx.fillStyle = nameGrad;
  ctx.fillText(data.userName || 'Dedicated Market Trader', width / 2, plaqueY + plaqueH / 2);

  // 8. Body Curriculum Certification Statement
  ctx.font = '500 27px "Plus Jakarta Sans", system-ui, sans-serif';
  ctx.fillStyle = '#E2E8F0';
  const line1 = "Has successfully demonstrated rigorous institutional proficiency in identifying 14 Japanese Candlestick Reversals,";
  const line2 = "12 Chart Formations, Dynamic Trendline Confluences, Fair Value Gaps (FVG), BOS & CHOCH Market Structures,";
  const line3 = "and Capital Defense with Strict 1-2% Position Size Risk Management.";
  ctx.fillText(line1, width / 2, 825);
  ctx.fillText(line2, width / 2, 868);
  ctx.fillText(line3, width / 2, 911);

  // 9. Four Verified Metric Badges
  const badges = [
    `RANK: LEVEL ${data.level} · ${data.rankTitle.toUpperCase()}`,
    `VERIFIED XP: ${data.xp} POINTS`,
    `MASTERY: ${data.masteredPatternsCount}/26 FORMATIONS`,
    `CAPITAL DEFENSE: 1-2% STRICT PROTOCOL`
  ];

  const badgeY = 995;
  const badgeW = 500;
  const badgeH = 54;
  const badgeGap = 24;
  const totalBadgesW = badgeW * 4 + badgeGap * 3;
  let bStartX = (width - totalBadgesW) / 2;

  ctx.font = '700 17px "JetBrains Mono", monospace';
  badges.forEach((bText, i) => {
    // Badge pill background
    ctx.fillStyle = '#060B18';
    ctx.strokeStyle = i === 1 ? '#F5A623' : (i === 3 ? '#A855F7' : (i === 0 ? '#10B981' : '#06B6D4'));
    ctx.lineWidth = 1.8;

    const bx = bStartX + i * (badgeW + badgeGap);
    ctx.beginPath();
    ctx.roundRect(bx, badgeY, badgeW, badgeH, 27);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = i === 1 ? '#FBBF24' : (i === 3 ? '#D8B4FE' : (i === 0 ? '#34D399' : '#67E8F9'));
    ctx.fillText(bText, bx + badgeW / 2, badgeY + badgeH / 2 + 1);
  });

  // 10. Horizontal Footer Separator
  ctx.strokeStyle = 'rgba(148, 163, 184, 0.25)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(140, 1115);
  ctx.lineTo(width - 140, 1115);
  ctx.stroke();

  // 11. Bottom 3 Columns: Academic Board | Official Gold Seal | Verification Serial
  const colY = 1260;

  // LEFT COLUMN: Academic Board Signature
  ctx.font = 'italic 700 48px "Caveat", "Dancing Script", cursive, serif';
  ctx.fillStyle = '#FDE68A';
  ctx.fillText('Charlton Nicholas', 450, colY - 40);

  ctx.strokeStyle = 'rgba(245, 166, 35, 0.6)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(250, colY + 5);
  ctx.lineTo(650, colY + 5);
  ctx.stroke();

  ctx.font = '700 19px "JetBrains Mono", monospace';
  ctx.fillStyle = '#CBD5E1';
  ctx.fillText('ACADEMIC BOARD & LEAD MENTOR', 450, colY + 35);
  ctx.font = '500 16px "JetBrains Mono", monospace';
  ctx.fillStyle = '#94A3B8';
  ctx.fillText('GLOBAL FOREX CLUB CURRICULUM BOARD', 450, colY + 62);

  // CENTER COLUMN: Gold Standard Verification Medallion
  const sealX = width / 2;
  const sealY = colY + 20;
  const sealR = 76;

  // Outer rays/scallops
  ctx.save();
  ctx.translate(sealX, sealY);
  for (let i = 0; i < 24; i++) {
    ctx.rotate((Math.PI * 2) / 24);
    ctx.fillStyle = i % 2 === 0 ? '#F5A623' : '#D97706';
    ctx.fillRect(-6, -sealR - 10, 12, 16);
  }
  ctx.restore();

  // Outer gold circle
  const sealGrad = ctx.createLinearGradient(sealX - sealR, sealY - sealR, sealX + sealR, sealY + sealR);
  sealGrad.addColorStop(0, '#FDE68A');
  sealGrad.addColorStop(0.5, '#F5A623');
  sealGrad.addColorStop(1, '#B45309');
  ctx.fillStyle = sealGrad;
  ctx.beginPath();
  ctx.arc(sealX, sealY, sealR, 0, Math.PI * 2);
  ctx.fill();

  // Inner dark core
  ctx.fillStyle = '#060B18';
  ctx.beginPath();
  ctx.arc(sealX, sealY, sealR - 8, 0, Math.PI * 2);
  ctx.fill();

  // Seal Candlesticks
  ctx.strokeStyle = '#E52525';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(sealX - 10, sealY - 16);
  ctx.lineTo(sealX - 10, sealY + 16);
  ctx.stroke();
  ctx.fillStyle = '#E52525';
  ctx.fillRect(sealX - 14, sealY - 6, 8, 14);

  ctx.strokeStyle = '#00C853';
  ctx.beginPath();
  ctx.moveTo(sealX + 10, sealY - 20);
  ctx.lineTo(sealX + 10, sealY + 18);
  ctx.stroke();
  ctx.fillStyle = '#00C853';
  ctx.fillRect(sealX + 6, sealY - 10, 8, 16);

  ctx.font = '800 13px "JetBrains Mono", monospace';
  ctx.fillStyle = '#F5A623';
  ctx.fillText('VERIFIED', sealX, sealY + 28);

  ctx.font = '700 16px "JetBrains Mono", monospace';
  ctx.fillStyle = '#F5A623';
  ctx.fillText('OFFICIAL GOLD STANDARD SEAL', sealX, colY + 125);

  // RIGHT COLUMN: Verification Date & Serial ID
  ctx.font = '700 28px "JetBrains Mono", monospace';
  ctx.fillStyle = '#38BDF8';
  ctx.fillText(data.issueDate, width - 450, colY - 40);

  ctx.strokeStyle = 'rgba(56, 189, 248, 0.5)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(width - 650, colY + 5);
  ctx.lineTo(width - 250, colY + 5);
  ctx.stroke();

  ctx.font = '700 19px "JetBrains Mono", monospace';
  ctx.fillStyle = '#CBD5E1';
  ctx.fillText('VERIFICATION DATE & STATUS', width - 450, colY + 35);

  ctx.font = '800 20px "JetBrains Mono", monospace';
  ctx.fillStyle = '#F5A623';
  ctx.fillText(data.serialId, width - 450, colY + 68);

  ctx.font = '600 14px "JetBrains Mono", monospace';
  ctx.fillStyle = '#34D399';
  ctx.fillText('STATUS: AUTHENTIC & VERIFIED', width - 450, colY + 95);

  return canvas;
}

/**
 * Downloads the high-resolution certificate as a PDF file directly.
 */
export async function downloadCertificatePdf(data: CertificateData): Promise<void> {
  const canvas = renderCertificateToCanvas(data);
  const imgData = canvas.toDataURL('image/png', 1.0);

  const doc = getJsPdfInstance();
  // Landscape A4 dimensions are 297mm x 210mm
  doc.addImage(imgData, 'PNG', 0, 0, 297, 210, undefined, 'FAST');

  const cleanName = (data.userName || 'Trader').trim().replace(/[^a-zA-Z0-9_-]/g, '_');
  doc.save(`FX_Pattern_Master_Certificate_${cleanName}.pdf`);

  confetti({ particleCount: 90, spread: 75, origin: { y: 0.6 } });
}

/**
 * Downloads the high-resolution certificate as a 300 DPI PNG file directly.
 */
export function downloadCertificatePng(data: CertificateData): void {
  const canvas = renderCertificateToCanvas(data);
  const imgData = canvas.toDataURL('image/png', 1.0);

  const link = document.createElement('a');
  const cleanName = (data.userName || 'Trader').trim().replace(/[^a-zA-Z0-9_-]/g, '_');
  link.download = `FX_Pattern_Master_Certificate_${cleanName}.png`;
  link.href = imgData;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  confetti({ particleCount: 60, spread: 65 });
}
