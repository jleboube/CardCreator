/**
 * Generate texture patterns as data URLs that can be used in Konva
 * These run in the browser, no server-side dependencies needed
 */

// Generate woodgrain texture
export const generateWoodgrainTexture = (width = 512, height = 512) => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  // Base wood color
  ctx.fillStyle = '#8B7355';
  ctx.fillRect(0, 0, width, height);

  // Add grain lines
  const grainDensity = 40;
  for (let i = 0; i < grainDensity; i++) {
    const y = (i / grainDensity) * height;
    const offset = Math.sin(y * 0.1) * 20;
    const waviness = Math.random() * 10;

    // Dark grain
    ctx.strokeStyle = `rgba(101, 67, 33, ${0.3 + Math.random() * 0.4})`;
    ctx.lineWidth = 1 + Math.random() * 2;
    ctx.beginPath();
    ctx.moveTo(0, y);

    for (let x = 0; x < width; x += 10) {
      const yOffset = Math.sin(x * 0.05 + offset) * waviness;
      ctx.lineTo(x, y + yOffset);
    }
    ctx.stroke();
  }

  // Add knots
  for (let i = 0; i < 3; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
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

  return canvas.toDataURL('image/png');
};

// Generate halftone pattern (like 1990 Topps)
export const generateHalftoneTexture = (width = 512, height = 512) => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  // Light gray base
  ctx.fillStyle = '#E8E8E8';
  ctx.fillRect(0, 0, width, height);

  // Create dot pattern
  const dotSpacing = 8;
  const dotSize = 3;

  for (let y = 0; y < height; y += dotSpacing) {
    for (let x = 0; x < width; x += dotSpacing) {
      // Alternate dot sizes for texture
      const size = dotSize + Math.sin(x * 0.1) * 0.5;
      const gray = 180 + Math.random() * 30;

      ctx.fillStyle = `rgb(${gray}, ${gray}, ${gray})`;
      ctx.beginPath();
      ctx.arc(x, y, size / 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  return canvas.toDataURL('image/png');
};

// Generate concrete texture
export const generateConcreteTexture = (width = 512, height = 512) => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  // Base concrete color
  ctx.fillStyle = '#A8A8A8';
  ctx.fillRect(0, 0, width, height);

  // Add noise
  const imageData = ctx.getImageData(0, 0, width, height);
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

    const startX = Math.random() * width;
    const startY = Math.random() * height;
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

  return canvas.toDataURL('image/png');
};

// Generate sandstone texture
export const generateSandstoneTexture = (width = 512, height = 512) => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  // Base sand color
  ctx.fillStyle = '#DEB887';
  ctx.fillRect(0, 0, width, height);

  // Add grainy texture
  const imageData = ctx.getImageData(0, 0, width, height);
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
    const y = Math.random() * height;
    const h = 5 + Math.random() * 10;

    ctx.fillStyle = `rgba(160, 130, 109, ${0.1 + Math.random() * 0.2})`;
    ctx.fillRect(0, y, width, h);
  }

  return canvas.toDataURL('image/png');
};

// Generate canvas fabric texture
export const generateCanvasFabricTexture = (width = 512, height = 512) => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  // Base canvas color
  ctx.fillStyle = '#F5F5DC';
  ctx.fillRect(0, 0, width, height);

  // Create weave pattern
  const threadWidth = 4;

  for (let y = 0; y < height; y += threadWidth * 2) {
    for (let x = 0; x < width; x += threadWidth * 2) {
      // Horizontal threads
      ctx.fillStyle = `rgba(220, 220, 200, ${0.5 + Math.random() * 0.3})`;
      ctx.fillRect(x, y, threadWidth * 2, threadWidth);

      // Vertical threads
      ctx.fillStyle = `rgba(200, 200, 180, ${0.5 + Math.random() * 0.3})`;
      ctx.fillRect(x, y, threadWidth, threadWidth * 2);
    }
  }

  return canvas.toDataURL('image/png');
};

// Generate leather texture
export const generateLeatherTexture = (width = 512, height = 512) => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  // Base leather color (brown)
  ctx.fillStyle = '#8B4513';
  ctx.fillRect(0, 0, width, height);

  // Add noise for grain
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const variation = (Math.random() - 0.5) * 25;
    data[i] += variation;     // R
    data[i + 1] += variation * 0.8; // G
    data[i + 2] += variation * 0.6; // B
  }

  ctx.putImageData(imageData, 0, 0);

  // Add wrinkle lines
  for (let i = 0; i < 30; i++) {
    ctx.strokeStyle = `rgba(70, 35, 10, ${0.2 + Math.random() * 0.3})`;
    ctx.lineWidth = 0.5 + Math.random() * 1.5;
    ctx.beginPath();

    const startX = Math.random() * width;
    const startY = Math.random() * height;
    const length = 30 + Math.random() * 80;
    const angle = Math.random() * Math.PI * 2;

    ctx.moveTo(startX, startY);

    let x = startX;
    let y = startY;
    for (let j = 0; j < length; j += 3) {
      x += Math.cos(angle + (Math.random() - 0.5) * 0.8) * 3;
      y += Math.sin(angle + (Math.random() - 0.5) * 0.8) * 3;
      ctx.lineTo(x, y);
    }

    ctx.stroke();
  }

  return canvas.toDataURL('image/png');
};

// Generate denim texture
export const generateDenimTexture = (width = 512, height = 512) => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  // Base denim blue
  ctx.fillStyle = '#4682B4';
  ctx.fillRect(0, 0, width, height);

  // Add diagonal weave pattern
  const weaveSize = 3;
  for (let y = -width; y < height + width; y += weaveSize * 2) {
    for (let x = -height; x < width + height; x += weaveSize * 2) {
      // Diagonal light threads
      ctx.fillStyle = `rgba(100, 149, 237, ${0.3 + Math.random() * 0.2})`;
      ctx.fillRect(x + y, y, weaveSize, weaveSize);

      // Diagonal dark threads
      ctx.fillStyle = `rgba(25, 50, 100, ${0.2 + Math.random() * 0.2})`;
      ctx.fillRect(x + y + weaveSize, y, weaveSize, weaveSize);
    }
  }

  // Add slight noise
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const variation = (Math.random() - 0.5) * 15;
    data[i] += variation;
    data[i + 1] += variation;
    data[i + 2] += variation;
  }

  ctx.putImageData(imageData, 0, 0);

  return canvas.toDataURL('image/png');
};

// Generate marble texture
export const generateMarbleTexture = (width = 512, height = 512) => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  // Base white/cream marble
  ctx.fillStyle = '#F8F8F0';
  ctx.fillRect(0, 0, width, height);

  // Add subtle color variation
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const variation = (Math.random() - 0.5) * 20;
    data[i] += variation;
    data[i + 1] += variation;
    data[i + 2] += variation - 5;
  }

  ctx.putImageData(imageData, 0, 0);

  // Add veins
  for (let i = 0; i < 15; i++) {
    const startX = Math.random() * width;
    const startY = Math.random() * height;
    const veinLength = 100 + Math.random() * 300;
    const angle = (Math.random() - 0.5) * Math.PI;

    ctx.strokeStyle = `rgba(169, 169, 169, ${0.2 + Math.random() * 0.4})`;
    ctx.lineWidth = 1 + Math.random() * 3;
    ctx.beginPath();
    ctx.moveTo(startX, startY);

    let x = startX;
    let y = startY;
    for (let j = 0; j < veinLength; j += 5) {
      x += Math.cos(angle + (Math.random() - 0.5) * 0.3) * 5;
      y += Math.sin(angle + (Math.random() - 0.5) * 0.3) * 5;
      ctx.lineTo(x, y);
    }

    ctx.stroke();

    // Add secondary branching veins
    if (Math.random() > 0.5) {
      const branchX = startX + Math.cos(angle) * (veinLength / 2);
      const branchY = startY + Math.sin(angle) * (veinLength / 2);
      const branchAngle = angle + (Math.random() - 0.5) * Math.PI / 2;
      const branchLength = 50 + Math.random() * 100;

      ctx.strokeStyle = `rgba(169, 169, 169, ${0.1 + Math.random() * 0.3})`;
      ctx.lineWidth = 0.5 + Math.random() * 1.5;
      ctx.beginPath();
      ctx.moveTo(branchX, branchY);

      x = branchX;
      y = branchY;
      for (let j = 0; j < branchLength; j += 5) {
        x += Math.cos(branchAngle + (Math.random() - 0.5) * 0.4) * 5;
        y += Math.sin(branchAngle + (Math.random() - 0.5) * 0.4) * 5;
        ctx.lineTo(x, y);
      }

      ctx.stroke();
    }
  }

  return canvas.toDataURL('image/png');
};

// Generate carbon fiber texture
export const generateCarbonFiberTexture = (width = 512, height = 512) => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  // Dark base
  ctx.fillStyle = '#1a1a1a';
  ctx.fillRect(0, 0, width, height);

  // Create carbon fiber weave pattern
  const weaveSize = 8;

  for (let y = 0; y < height; y += weaveSize * 2) {
    for (let x = 0; x < width; x += weaveSize * 2) {
      // Horizontal darker fibers
      ctx.fillStyle = '#0d0d0d';
      ctx.fillRect(x, y, weaveSize * 2, weaveSize);

      // Vertical lighter fibers
      ctx.fillStyle = '#262626';
      ctx.fillRect(x, y + weaveSize, weaveSize * 2, weaveSize);

      // Add subtle highlights on fibers
      const gradient1 = ctx.createLinearGradient(x, y, x + weaveSize * 2, y);
      gradient1.addColorStop(0, 'rgba(255, 255, 255, 0)');
      gradient1.addColorStop(0.5, 'rgba(255, 255, 255, 0.05)');
      gradient1.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = gradient1;
      ctx.fillRect(x, y, weaveSize * 2, weaveSize);

      const gradient2 = ctx.createLinearGradient(x, y + weaveSize, x, y + weaveSize * 2);
      gradient2.addColorStop(0, 'rgba(255, 255, 255, 0)');
      gradient2.addColorStop(0.5, 'rgba(255, 255, 255, 0.08)');
      gradient2.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = gradient2;
      ctx.fillRect(x, y + weaveSize, weaveSize * 2, weaveSize);
    }
  }

  return canvas.toDataURL('image/png');
};

// Generate brushed metal texture
export const generateBrushedMetalTexture = (width = 512, height = 512) => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  // Base metallic gray
  ctx.fillStyle = '#C0C0C0';
  ctx.fillRect(0, 0, width, height);

  // Add horizontal brush strokes
  for (let y = 0; y < height; y += 1) {
    const brightness = 180 + (Math.random() - 0.5) * 50;
    const opacity = 0.3 + Math.random() * 0.4;

    ctx.strokeStyle = `rgba(${brightness}, ${brightness}, ${brightness}, ${opacity})`;
    ctx.lineWidth = 1 + Math.random() * 2;
    ctx.beginPath();
    ctx.moveTo(0, y);

    // Slightly wavy horizontal lines for brush effect
    for (let x = 0; x < width; x += 10) {
      const yOffset = (Math.random() - 0.5) * 0.5;
      ctx.lineTo(x, y + yOffset);
    }

    ctx.stroke();
  }

  // Add metallic highlights
  for (let i = 0; i < 20; i++) {
    const y = Math.random() * height;
    const highlightWidth = 50 + Math.random() * 150;

    const gradient = ctx.createLinearGradient(0, y - 5, 0, y + 5);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
    gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.3)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

    ctx.fillStyle = gradient;
    ctx.fillRect(Math.random() * (width - highlightWidth), y - 5, highlightWidth, 10);
  }

  return canvas.toDataURL('image/png');
};

// Cache for generated textures
const textureCache = new Map();

/**
 * Get texture by name, generating it if not cached
 * @param {string} textureName - Name of texture (woodgrain, halftone, concrete, etc.)
 * @param {number} width - Width of texture
 * @param {number} height - Height of texture
 * @returns {Promise<HTMLImageElement>} Image element with texture
 */
export const getTexture = (textureName, width = 512, height = 512) => {
  const cacheKey = `${textureName}_${width}_${height}`;

  if (textureCache.has(cacheKey)) {
    return Promise.resolve(textureCache.get(cacheKey));
  }

  return new Promise((resolve, reject) => {
    let dataUrl;

    switch (textureName) {
      case 'woodgrain':
        dataUrl = generateWoodgrainTexture(width, height);
        break;
      case 'halftone':
        dataUrl = generateHalftoneTexture(width, height);
        break;
      case 'concrete':
        dataUrl = generateConcreteTexture(width, height);
        break;
      case 'sandstone':
      case 'sand':
        dataUrl = generateSandstoneTexture(width, height);
        break;
      case 'canvas':
        dataUrl = generateCanvasFabricTexture(width, height);
        break;
      case 'leather':
        dataUrl = generateLeatherTexture(width, height);
        break;
      case 'denim':
        dataUrl = generateDenimTexture(width, height);
        break;
      case 'marble':
        dataUrl = generateMarbleTexture(width, height);
        break;
      case 'carbon':
        dataUrl = generateCarbonFiberTexture(width, height);
        break;
      case 'brushedmetal':
        dataUrl = generateBrushedMetalTexture(width, height);
        break;
      default:
        reject(new Error(`Unknown texture: ${textureName}`));
        return;
    }

    const img = new Image();
    img.onload = () => {
      textureCache.set(cacheKey, img);
      resolve(img);
    };
    img.onerror = reject;
    img.src = dataUrl;
  });
};

// Clear texture cache (useful for memory management)
export const clearTextureCache = () => {
  textureCache.clear();
};
