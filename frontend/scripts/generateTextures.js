const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

const TEXTURE_SIZE = 512;
const OUTPUT_DIR = path.join(__dirname, '../public/textures');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Helper function to save canvas as image
function saveTexture(canvas, filename) {
  const buffer = canvas.toBuffer('image/png');
  const filepath = path.join(OUTPUT_DIR, filename);
  fs.writeFileSync(filepath, buffer);
  console.log(`✓ Generated: ${filename}`);
}

// 1. WOODGRAIN TEXTURE
function generateWoodgrain() {
  const canvas = createCanvas(TEXTURE_SIZE, TEXTURE_SIZE);
  const ctx = canvas.getContext('2d');

  // Base wood color
  ctx.fillStyle = '#8B7355';
  ctx.fillRect(0, 0, TEXTURE_SIZE, TEXTURE_SIZE);

  // Add grain lines
  const grainDensity = 40;
  for (let i = 0; i < grainDensity; i++) {
    const y = (i / grainDensity) * TEXTURE_SIZE;
    const offset = Math.sin(y * 0.1) * 20;
    const waviness = Math.random() * 10;

    // Dark grain
    ctx.strokeStyle = `rgba(101, 67, 33, ${0.3 + Math.random() * 0.4})`;
    ctx.lineWidth = 1 + Math.random() * 2;
    ctx.beginPath();
    ctx.moveTo(0, y);

    for (let x = 0; x < TEXTURE_SIZE; x += 10) {
      const yOffset = Math.sin(x * 0.05 + offset) * waviness;
      ctx.lineTo(x, y + yOffset);
    }
    ctx.stroke();
  }

  // Add knots
  for (let i = 0; i < 3; i++) {
    const x = Math.random() * TEXTURE_SIZE;
    const y = Math.random() * TEXTURE_SIZE;
    const radius = 15 + Math.random() * 20;

    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(0, 'rgba(56, 37, 19, 0.8)');
    gradient.addColorStop(0.5, 'rgba(101, 67, 33, 0.5)');
    gradient.addColorStop(1, 'rgba(139, 115, 85, 0)');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  saveTexture(canvas, 'woodgrain.png');
}

// 2. HALFTONE PATTERN (like 1990 Topps outer border)
function generateHalftone() {
  const canvas = createCanvas(TEXTURE_SIZE, TEXTURE_SIZE);
  const ctx = canvas.getContext('2d');

  // Light gray base
  ctx.fillStyle = '#E8E8E8';
  ctx.fillRect(0, 0, TEXTURE_SIZE, TEXTURE_SIZE);

  // Create dot pattern
  const dotSpacing = 8;
  const dotSize = 3;

  for (let y = 0; y < TEXTURE_SIZE; y += dotSpacing) {
    for (let x = 0; x < TEXTURE_SIZE; x += dotSpacing) {
      // Alternate dot sizes for texture
      const size = dotSize + Math.sin(x * 0.1) * 0.5;
      const gray = 180 + Math.random() * 30;

      ctx.fillStyle = `rgb(${gray}, ${gray}, ${gray})`;
      ctx.beginPath();
      ctx.arc(x, y, size / 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  saveTexture(canvas, 'halftone.png');
}

// 3. CONCRETE TEXTURE
function generateConcrete() {
  const canvas = createCanvas(TEXTURE_SIZE, TEXTURE_SIZE);
  const ctx = canvas.getContext('2d');

  // Base concrete color
  ctx.fillStyle = '#A8A8A8';
  ctx.fillRect(0, 0, TEXTURE_SIZE, TEXTURE_SIZE);

  // Add noise
  const imageData = ctx.getImageData(0, 0, TEXTURE_SIZE, TEXTURE_SIZE);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const variation = (Math.random() - 0.5) * 40;
    data[i] += variation;     // R
    data[i + 1] += variation; // G
    data[i + 2] += variation; // B
  }

  ctx.putImageData(imageData, 0, 0);

  // Add cracks
  for (let i = 0; i < 15; i++) {
    ctx.strokeStyle = `rgba(80, 80, 80, ${0.3 + Math.random() * 0.3})`;
    ctx.lineWidth = 1 + Math.random();
    ctx.beginPath();

    const startX = Math.random() * TEXTURE_SIZE;
    const startY = Math.random() * TEXTURE_SIZE;
    const length = 50 + Math.random() * 100;
    const angle = Math.random() * Math.PI * 2;

    ctx.moveTo(startX, startY);

    let x = startX;
    let y = startY;
    for (let j = 0; j < length; j += 5) {
      x += Math.cos(angle + (Math.random() - 0.5) * 0.5) * 5;
      y += Math.sin(angle + (Math.random() - 0.5) * 0.5) * 5;
      ctx.lineTo(x, y);
    }

    ctx.stroke();
  }

  saveTexture(canvas, 'concrete.png');
}

// 4. SANDSTONE TEXTURE
function generateSandstone() {
  const canvas = createCanvas(TEXTURE_SIZE, TEXTURE_SIZE);
  const ctx = canvas.getContext('2d');

  // Base sand color
  ctx.fillStyle = '#DEB887';
  ctx.fillRect(0, 0, TEXTURE_SIZE, TEXTURE_SIZE);

  // Add grainy texture
  const imageData = ctx.getImageData(0, 0, TEXTURE_SIZE, TEXTURE_SIZE);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const grain = (Math.random() - 0.5) * 30;
    data[i] += grain;     // R
    data[i + 1] += grain * 0.9; // G
    data[i + 2] += grain * 0.8; // B
  }

  ctx.putImageData(imageData, 0, 0);

  // Add subtle stratification
  for (let i = 0; i < 20; i++) {
    const y = Math.random() * TEXTURE_SIZE;
    const height = 5 + Math.random() * 10;

    ctx.fillStyle = `rgba(160, 130, 109, ${0.1 + Math.random() * 0.2})`;
    ctx.fillRect(0, y, TEXTURE_SIZE, height);
  }

  saveTexture(canvas, 'sandstone.png');
}

// 5. CANVAS FABRIC TEXTURE
function generateCanvasFabric() {
  const canvas = createCanvas(TEXTURE_SIZE, TEXTURE_SIZE);
  const ctx = canvas.getContext('2d');

  // Base canvas color
  ctx.fillStyle = '#F5F5DC';
  ctx.fillRect(0, 0, TEXTURE_SIZE, TEXTURE_SIZE);

  // Create weave pattern
  const threadWidth = 4;

  for (let y = 0; y < TEXTURE_SIZE; y += threadWidth * 2) {
    for (let x = 0; x < TEXTURE_SIZE; x += threadWidth * 2) {
      // Horizontal threads
      ctx.fillStyle = `rgba(220, 220, 200, ${0.5 + Math.random() * 0.3})`;
      ctx.fillRect(x, y, threadWidth * 2, threadWidth);

      // Vertical threads
      ctx.fillStyle = `rgba(200, 200, 180, ${0.5 + Math.random() * 0.3})`;
      ctx.fillRect(x, y, threadWidth, threadWidth * 2);
    }
  }

  saveTexture(canvas, 'canvas-fabric.png');
}

// Generate all textures
console.log('Generating textures...\n');

try {
  generateWoodgrain();
  generateHalftone();
  generateConcrete();
  generateSandstone();
  generateCanvasFabric();

  console.log('\n✓ All textures generated successfully!');
  console.log(`Output directory: ${OUTPUT_DIR}`);
} catch (error) {
  console.error('Error generating textures:', error);
  process.exit(1);
}
