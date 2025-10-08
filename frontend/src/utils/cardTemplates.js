// Template Categories
export const TEMPLATE_CATEGORIES = {
  UNC_STYLE: 'UNC Style',
  TEXTURED: 'Textured',
  CLASSIC: 'Classic & Vintage',
  MODERN: 'Modern & Premium',
  ARTISTIC: 'Artistic',
  NEON_BRIGHT: 'Neon & Bright',
  NATURE: 'Nature & Elemental',
  SPECIALTY: 'Specialty'
};

export const cardTemplates = [
  // ============================================
  // UNC STYLE - 1980s-1990s Authentic Replicas
  // ============================================
  {
    id: 'donruss1985',
    name: '1985 Donruss Black',
    category: TEMPLATE_CATEGORIES.UNC_STYLE,
    description: 'Clean black border design',
    backgroundColor: '#FFFFFF',
    borderColor: '#000000',
    textColor: '#000000',
    secondaryTextColor: '#374151',
    accentColor: '#1F2937',
    fontFamily: 'Arial, sans-serif',
    vintage: true,
    layers: [
      {
        type: 'border',
        width: 20,
        color: '#000000',
        x: 12,
        y: 12,
        innerWidth: 376,
        innerHeight: 536
      },
      {
        type: 'border',
        width: 3,
        color: '#FFFFFF',
        x: 15,
        y: 15,
        innerWidth: 370,
        innerHeight: 530
      },
      {
        type: 'name-banner',
        x: 30,
        y: 495,
        width: 340,
        height: 35,
        backgroundColor: '#000000',
        textColor: '#FFFFFF',
        textStyle: 'bold'
      }
    ]
  },
  {
    id: 'topps1990',
    name: '1990 Topps',
    category: TEMPLATE_CATEGORIES.UNC_STYLE,
    description: 'Authentic 1990 Topps with halftone border',
    backgroundColor: '#FFFFFF',
    textColor: '#111827',
    secondaryTextColor: '#4B5563',
    accentColor: '#1E3A8A', // Blue
    secondaryAccent: '#FFD700', // Yellow/gold
    fontFamily: 'Arial, sans-serif',
    vintage: true,
    layers: [
      {
        type: 'texture',
        texture: 'halftone',
        width: 400,
        height: 560,
        x: 0,
        y: 0
      },
      {
        type: 'border',
        width: 20,
        color: '#1E3A8A', // Outer blue border
        x: 20,
        y: 20,
        innerWidth: 360,
        innerHeight: 520
      },
      {
        type: 'border',
        width: 12,
        color: '#3B82F6', // Inner lighter blue
        x: 28,
        y: 28,
        innerWidth: 344,
        innerHeight: 504
      },
      {
        type: 'accent-strip',
        width: 8,
        color: '#FFD700', // Yellow right strip
        x: 364,
        y: 28,
        height: 504
      },
      {
        type: 'team-banner',
        x: 40,
        y: 40,
        width: 140,
        height: 30,
        backgroundColor: '#FF8C42',
        rotation: 0,
        textStyle: 'italic'
      },
      {
        type: 'name-banner',
        x: 40,
        y: 480,
        width: 320,
        height: 35,
        backgroundColor: '#FF8C42',
        textColor: '#000000',
        textStyle: 'italic-bold'
      }
    ]
  },

  // ============================================
  // TEXTURED - Actual texture patterns
  // ============================================
  {
    id: 'sandstone',
    name: 'Sandstone',
    category: TEMPLATE_CATEGORIES.TEXTURED,
    description: 'Rough sand texture',
    backgroundColor: '#DEB887',
    borderColor: '#8B7355',
    textColor: '#3E2723',
    secondaryTextColor: '#5D4037',
    accentColor: '#A0826D',
    fontFamily: 'Georgia, serif',
    layers: [
      {
        type: 'texture',
        textureFile: '/textures/sandstone.svg',
        width: 400,
        height: 560,
        x: 0,
        y: 0
      },
      {
        type: 'border',
        width: 15,
        color: '#8B7355',
        x: 15,
        y: 15,
        innerWidth: 370,
        innerHeight: 530
      }
    ]
  },
  {
    id: 'canvas',
    name: 'Canvas',
    category: TEMPLATE_CATEGORIES.TEXTURED,
    description: 'Fabric canvas texture',
    backgroundColor: '#F5F5DC',
    borderColor: '#8B8680',
    textColor: '#2C2C2C',
    secondaryTextColor: '#5C5C5C',
    accentColor: '#696969',
    fontFamily: 'Georgia, serif',
    texture: 'canvas'
  },
  {
    id: 'concrete',
    name: 'Concrete',
    category: TEMPLATE_CATEGORIES.TEXTURED,
    description: 'Industrial concrete texture',
    backgroundColor: '#A8A8A8',
    borderColor: '#696969',
    textColor: '#1C1C1C',
    secondaryTextColor: '#4A4A4A',
    accentColor: '#FF4500',
    fontFamily: 'Impact, sans-serif',
    texture: 'concrete'
  },
  {
    id: 'woodgrain',
    name: 'Wood Grain',
    category: TEMPLATE_CATEGORIES.TEXTURED,
    description: 'Natural wood texture',
    backgroundColor: '#8B4513',
    borderColor: '#654321',
    textColor: '#F5DEB3',
    secondaryTextColor: '#DEB887',
    accentColor: '#D2691E',
    fontFamily: 'Georgia, serif',
    texture: 'woodgrain'
  },
  {
    id: 'leather',
    name: 'Leather',
    category: TEMPLATE_CATEGORIES.TEXTURED,
    description: 'Premium leather texture',
    backgroundColor: '#3E2723',
    borderColor: '#8D6E63',
    textColor: '#FFF8DC',
    secondaryTextColor: '#D7CCC8',
    accentColor: '#A1887F',
    fontFamily: 'Georgia, serif',
    texture: 'leather'
  },
  {
    id: 'denim',
    name: 'Denim',
    category: TEMPLATE_CATEGORIES.TEXTURED,
    description: 'Jean fabric texture',
    backgroundColor: '#4A5F7F',
    borderColor: '#2C3E50',
    textColor: '#ECF0F1',
    secondaryTextColor: '#BDC3C7',
    accentColor: '#7F8C8D',
    fontFamily: 'Arial, sans-serif',
    texture: 'denim'
  },
  {
    id: 'marble',
    name: 'Marble',
    category: TEMPLATE_CATEGORIES.TEXTURED,
    description: 'Elegant marble texture',
    backgroundColor: '#F0F0F0',
    borderColor: '#2C3E50',
    textColor: '#2C3E50',
    secondaryTextColor: '#34495E',
    accentColor: '#7F8C8D',
    fontFamily: 'Times New Roman, serif',
    texture: 'marble'
  },
  {
    id: 'carbon',
    name: 'Carbon Fiber',
    category: TEMPLATE_CATEGORIES.TEXTURED,
    description: 'High-tech carbon fiber texture',
    backgroundColor: '#1C1C1C',
    borderColor: '#FF4500',
    textColor: '#FFFFFF',
    secondaryTextColor: '#CCCCCC',
    accentColor: '#FF6347',
    fontFamily: 'Arial, sans-serif',
    layers: [
      {
        type: 'texture',
        textureFile: '/textures/carbon-fiber.svg',
        width: 400,
        height: 560,
        x: 0,
        y: 0
      },
      {
        type: 'border',
        width: 15,
        color: '#FF4500',
        x: 15,
        y: 15,
        innerWidth: 370,
        innerHeight: 530
      }
    ]
  },
  {
    id: 'brushedmetal',
    name: 'Brushed Metal',
    category: TEMPLATE_CATEGORIES.TEXTURED,
    description: 'Brushed metal texture',
    backgroundColor: '#C0C0C0',
    borderColor: '#696969',
    textColor: '#1A1A1A',
    secondaryTextColor: '#4A4A4A',
    accentColor: '#808080',
    fontFamily: 'Arial, sans-serif',
    texture: 'brushedMetal'
  },

  // ============================================
  // CLASSIC & VINTAGE
  // ============================================
  {
    id: 'classic',
    name: 'Classic',
    category: TEMPLATE_CATEGORIES.CLASSIC,
    description: 'Traditional baseball card style',
    backgroundColor: '#2E7D32',
    borderColor: '#FFD700',
    textColor: '#FFFFFF',
    secondaryTextColor: '#E0E0E0',
    accentColor: '#FFD700',
    fontFamily: 'Arial, sans-serif'
  },
  {
    id: 'vintage',
    name: 'Vintage',
    category: TEMPLATE_CATEGORIES.CLASSIC,
    description: 'Aged classic look',
    backgroundColor: '#D7CCC8',
    borderColor: '#8D6E63',
    textColor: '#3E2723',
    secondaryTextColor: '#5D4037',
    accentColor: '#BCAAA4',
    fontFamily: 'Georgia, serif'
  },
  {
    id: 'polaroid',
    name: 'Polaroid',
    category: TEMPLATE_CATEGORIES.CLASSIC,
    description: 'Instant photo style',
    backgroundColor: '#FFFFF0',
    borderColor: '#2C2C2C',
    textColor: '#2C2C2C',
    secondaryTextColor: '#5C5C5C',
    accentColor: '#4A4A4A',
    fontFamily: 'Courier New, monospace'
  },
  {
    id: 'newspaper',
    name: 'Newspaper',
    category: TEMPLATE_CATEGORIES.CLASSIC,
    description: 'Classic newspaper print',
    backgroundColor: '#F5F5DC',
    borderColor: '#000000',
    textColor: '#000000',
    secondaryTextColor: '#2F4F4F',
    accentColor: '#696969',
    fontFamily: 'Times New Roman, serif'
  },

  // ============================================
  // MODERN & PREMIUM
  // ============================================
  {
    id: 'modern',
    name: 'Modern',
    category: TEMPLATE_CATEGORIES.MODERN,
    description: 'Contemporary clean design',
    backgroundColor: '#1976D2',
    borderColor: '#64B5F6',
    textColor: '#FFFFFF',
    secondaryTextColor: '#BBDEFB',
    accentColor: '#00ACC1',
    fontFamily: 'Helvetica, sans-serif'
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    category: TEMPLATE_CATEGORIES.MODERN,
    description: 'Simple and elegant',
    backgroundColor: '#FFFFFF',
    borderColor: '#212121',
    textColor: '#212121',
    secondaryTextColor: '#757575',
    accentColor: '#000000',
    fontFamily: 'Helvetica Neue, sans-serif'
  },
  {
    id: 'chrome',
    name: 'Chrome',
    category: TEMPLATE_CATEGORIES.MODERN,
    description: 'Shiny metallic look',
    backgroundColor: '#E8E8E8',
    borderColor: '#7C7C7C',
    textColor: '#1A1A1A',
    secondaryTextColor: '#4A4A4A',
    accentColor: '#C0C0C0',
    secondaryAccent: '#696969',
    fontFamily: 'Impact, sans-serif'
  },
  {
    id: 'gold',
    name: 'Gold Luxury',
    category: TEMPLATE_CATEGORIES.MODERN,
    description: 'Premium gold finish',
    backgroundColor: '#1A1A1A',
    borderColor: '#FFD700',
    textColor: '#FFD700',
    secondaryTextColor: '#FFA500',
    accentColor: '#DAA520',
    secondaryAccent: '#B8860B',
    fontFamily: 'Georgia, serif'
  },
  {
    id: 'diamond',
    name: 'Diamond',
    category: TEMPLATE_CATEGORIES.MODERN,
    description: 'Sparkling diamond effect',
    backgroundColor: '#E8F4F8',
    borderColor: '#00CED1',
    textColor: '#006666',
    secondaryTextColor: '#008B8B',
    accentColor: '#5F9EA0',
    secondaryAccent: '#48D1CC',
    fontFamily: 'Arial, sans-serif',
    animated: true
  },

  // ============================================
  // ARTISTIC
  // ============================================
  {
    id: 'watercolor',
    name: 'Watercolor',
    category: TEMPLATE_CATEGORIES.ARTISTIC,
    description: 'Painted watercolor effect',
    backgroundColor: '#87CEEB',
    borderColor: '#4682B4',
    textColor: '#191970',
    secondaryTextColor: '#4169E1',
    accentColor: '#6495ED',
    fontFamily: 'Brush Script MT, cursive',
    animated: true
  },
  {
    id: 'sketch',
    name: 'Sketch',
    category: TEMPLATE_CATEGORIES.ARTISTIC,
    description: 'Hand-drawn sketch style',
    backgroundColor: '#F5F5DC',
    borderColor: '#2F4F4F',
    textColor: '#2F4F4F',
    secondaryTextColor: '#696969',
    accentColor: '#708090',
    fontFamily: 'Courier New, monospace'
  },
  {
    id: 'comic',
    name: 'Comic Book',
    category: TEMPLATE_CATEGORIES.ARTISTIC,
    description: 'Pop art comic style',
    backgroundColor: '#FFEB3B',
    borderColor: '#000000',
    textColor: '#000000',
    secondaryTextColor: '#FF5722',
    accentColor: '#2196F3',
    secondaryAccent: '#E91E63',
    fontFamily: 'Comic Sans MS, cursive',
    animated: true
  },
  {
    id: 'grunge',
    name: 'Grunge',
    category: TEMPLATE_CATEGORIES.ARTISTIC,
    description: 'Distressed urban look',
    backgroundColor: '#2C2C2C',
    borderColor: '#8B0000',
    textColor: '#E8E8E8',
    secondaryTextColor: '#A8A8A8',
    accentColor: '#CD5C5C',
    secondaryAccent: '#696969',
    fontFamily: 'Impact, sans-serif'
  },
  {
    id: 'chalkboard',
    name: 'Chalkboard',
    category: TEMPLATE_CATEGORIES.ARTISTIC,
    description: 'Chalk on blackboard',
    backgroundColor: '#2F4538',
    borderColor: '#8B7355',
    textColor: '#FFFFFF',
    secondaryTextColor: '#F0E68C',
    accentColor: '#FFD700',
    fontFamily: 'Courier New, monospace'
  },
  {
    id: 'blueprint',
    name: 'Blueprint',
    category: TEMPLATE_CATEGORIES.ARTISTIC,
    description: 'Technical blueprint style',
    backgroundColor: '#003366',
    borderColor: '#FFFFFF',
    textColor: '#FFFFFF',
    secondaryTextColor: '#B0C4DE',
    accentColor: '#87CEEB',
    fontFamily: 'Courier New, monospace'
  },

  // ============================================
  // NEON & BRIGHT
  // ============================================
  {
    id: 'neon',
    name: 'Neon',
    category: TEMPLATE_CATEGORIES.NEON_BRIGHT,
    description: 'Glowing neon lights',
    backgroundColor: '#0D0D0D',
    borderColor: '#00FF00',
    textColor: '#FFFFFF',
    secondaryTextColor: '#B0B0B0',
    accentColor: '#00FF00',
    secondaryAccent: '#FF00FF',
    fontFamily: 'Courier New, monospace'
  },
  {
    id: 'retro80s',
    name: 'Retro 80s',
    category: TEMPLATE_CATEGORIES.NEON_BRIGHT,
    description: 'Vibrant 80s aesthetics',
    backgroundColor: '#FF6B9D',
    borderColor: '#FDB44B',
    textColor: '#FFFFFF',
    secondaryTextColor: '#FFE66D',
    accentColor: '#4ECDC4',
    secondaryAccent: '#C44569',
    fontFamily: 'Arial Black, sans-serif',
    animated: true
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    category: TEMPLATE_CATEGORIES.NEON_BRIGHT,
    description: 'Futuristic neon cityscape',
    backgroundColor: '#0A0E27',
    borderColor: '#00FFFF',
    textColor: '#00FFFF',
    secondaryTextColor: '#FF00FF',
    accentColor: '#FF1493',
    secondaryAccent: '#00FF00',
    fontFamily: 'Courier New, monospace',
    animated: true
  },
  {
    id: 'holographic',
    name: 'Holographic',
    category: TEMPLATE_CATEGORIES.NEON_BRIGHT,
    description: 'Hologram rainbow effect',
    backgroundColor: '#1A0033',
    borderColor: '#FF00FF',
    textColor: '#FFFFFF',
    secondaryTextColor: '#00FFFF',
    accentColor: '#FF00FF',
    secondaryAccent: '#00FFFF',
    tertiaryAccent: '#FFD700',
    fontFamily: 'Arial, sans-serif',
    animated: true
  },
  {
    id: 'rainbow',
    name: 'Rainbow',
    category: TEMPLATE_CATEGORIES.NEON_BRIGHT,
    description: 'Multi-color rainbow',
    backgroundColor: '#FFFFFF',
    borderColor: '#FF0080',
    textColor: '#1A1A1A',
    secondaryTextColor: '#4A4A4A',
    accentColor: '#FF0080',
    secondaryAccent: '#00D9FF',
    tertiaryAccent: '#FFD700',
    fontFamily: 'Comic Sans MS, cursive',
    animated: true
  },
  {
    id: 'lightning',
    name: 'Lightning',
    category: TEMPLATE_CATEGORIES.NEON_BRIGHT,
    description: 'Electric lightning bolts',
    backgroundColor: '#191970',
    borderColor: '#FFFF00',
    textColor: '#FFFF00',
    secondaryTextColor: '#FFD700',
    accentColor: '#FFA500',
    fontFamily: 'Arial Black, sans-serif',
    animated: true
  },

  // ============================================
  // NATURE & ELEMENTAL
  // ============================================
  {
    id: 'galaxy',
    name: 'Galaxy',
    category: TEMPLATE_CATEGORIES.NATURE,
    description: 'Deep space galaxy',
    backgroundColor: '#0B0B1A',
    borderColor: '#7B2CBF',
    textColor: '#FFFFFF',
    secondaryTextColor: '#C77DFF',
    accentColor: '#9D4EDD',
    secondaryAccent: '#E0AAFF',
    fontFamily: 'Verdana, sans-serif',
    animated: true
  },
  {
    id: 'nebula',
    name: 'Nebula',
    category: TEMPLATE_CATEGORIES.NATURE,
    description: 'Cosmic nebula clouds',
    backgroundColor: '#1B0033',
    borderColor: '#B026FF',
    textColor: '#FFFFFF',
    secondaryTextColor: '#E0B0FF',
    accentColor: '#DA70D6',
    secondaryAccent: '#FF00FF',
    fontFamily: 'Arial, sans-serif',
    animated: true
  },
  {
    id: 'sunset',
    name: 'Sunset',
    category: TEMPLATE_CATEGORIES.NATURE,
    description: 'Warm sunset colors',
    backgroundColor: '#FF6B35',
    borderColor: '#004E89',
    textColor: '#FFFACD',
    secondaryTextColor: '#FFE4B5',
    accentColor: '#FF8C42',
    secondaryAccent: '#F67280',
    fontFamily: 'Verdana, sans-serif',
    animated: true
  },
  {
    id: 'ocean',
    name: 'Ocean',
    category: TEMPLATE_CATEGORIES.NATURE,
    description: 'Deep ocean waves',
    backgroundColor: '#006994',
    borderColor: '#003F5C',
    textColor: '#FFFFFF',
    secondaryTextColor: '#B0E0E6',
    accentColor: '#00CED1',
    secondaryAccent: '#48D1CC',
    fontFamily: 'Verdana, sans-serif',
    animated: true
  },
  {
    id: 'fire',
    name: 'Fire',
    category: TEMPLATE_CATEGORIES.NATURE,
    description: 'Blazing flames',
    backgroundColor: '#8B0000',
    borderColor: '#FFD700',
    textColor: '#FFFFFF',
    secondaryTextColor: '#FFE4B5',
    accentColor: '#FF4500',
    secondaryAccent: '#FF6347',
    fontFamily: 'Impact, sans-serif',
    animated: true
  },
  {
    id: 'ice',
    name: 'Ice',
    category: TEMPLATE_CATEGORIES.NATURE,
    description: 'Frozen ice crystals',
    backgroundColor: '#E0FFFF',
    borderColor: '#4682B4',
    textColor: '#191970',
    secondaryTextColor: '#4169E1',
    accentColor: '#87CEEB',
    secondaryAccent: '#B0E0E6',
    fontFamily: 'Arial, sans-serif'
  },

  // ============================================
  // SPECIALTY
  // ============================================
  {
    id: 'camo',
    name: 'Camouflage',
    category: TEMPLATE_CATEGORIES.SPECIALTY,
    description: 'Military camo pattern',
    backgroundColor: '#556B2F',
    borderColor: '#3D3D29',
    textColor: '#F0E68C',
    secondaryTextColor: '#BDB76B',
    accentColor: '#6B8E23',
    fontFamily: 'Impact, sans-serif',
    layers: [
      {
        type: 'texture',
        textureFile: '/textures/camo-green.svg',
        width: 400,
        height: 560,
        x: 0,
        y: 0
      },
      {
        type: 'border',
        width: 15,
        color: '#3D3D29',
        x: 15,
        y: 15,
        innerWidth: 370,
        innerHeight: 530
      },
      {
        type: 'team-banner',
        x: 30,
        y: 40,
        width: 140,
        height: 30,
        backgroundColor: 'rgba(61, 61, 41, 0.9)',
        textColor: '#F0E68C',
        textStyle: 'bold'
      },
      {
        type: 'name-banner',
        x: 30,
        y: 485,
        width: 340,
        height: 40,
        backgroundColor: 'rgba(61, 61, 41, 0.9)',
        textColor: '#F0E68C',
        textStyle: 'bold'
      }
    ]
  },
  {
    id: 'camogray',
    name: 'Gray Camouflage',
    category: TEMPLATE_CATEGORIES.SPECIALTY,
    description: 'Urban gray camo pattern',
    backgroundColor: '#2C2C2C',
    borderColor: '#1A1A1A',
    textColor: '#E0E0E0',
    secondaryTextColor: '#B0B0B0',
    accentColor: '#505050',
    fontFamily: 'Impact, sans-serif',
    layers: [
      {
        type: 'texture',
        textureFile: '/textures/camo-black.svg',
        width: 400,
        height: 560,
        x: 0,
        y: 0
      },
      {
        type: 'border',
        width: 15,
        color: '#1A1A1A',
        x: 15,
        y: 15,
        innerWidth: 370,
        innerHeight: 530
      },
      {
        type: 'team-banner',
        x: 30,
        y: 40,
        width: 140,
        height: 30,
        backgroundColor: 'rgba(26, 26, 26, 0.9)',
        textColor: '#E0E0E0',
        textStyle: 'bold'
      },
      {
        type: 'name-banner',
        x: 30,
        y: 485,
        width: 340,
        height: 40,
        backgroundColor: 'rgba(26, 26, 26, 0.9)',
        textColor: '#E0E0E0',
        textStyle: 'bold'
      }
    ]
  }
];

export const getTemplateById = (id) => {
  return cardTemplates.find(t => t.id === id) || cardTemplates[0];
};

export const getTemplatesByCategory = (category) => {
  return cardTemplates.filter(t => t.category === category);
};

export const getAllCategories = () => {
  return Object.values(TEMPLATE_CATEGORIES);
};
