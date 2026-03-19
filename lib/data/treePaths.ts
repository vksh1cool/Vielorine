/**
 * Tree of Life SVG Path Data
 * 
 * ORGANIC TREE DESIGN - NOT A DIAGRAM
 * This is a mystical, ancient tree - not an infographic.
 * 
 * Structure:
 * - Thick organic trunk with natural taper
 * - Branches grow UPWARD and outward like a real tree
 * - Full, lush canopy with overlapping organic shapes
 * - Roots spread naturally underground
 */

// ============================================================================
// Seed Data - The origin point
// ============================================================================

export const seedData = {
  cx: 500,
  cy: 950,
  rx: 30,
  ry: 40,
  glowRx: 50,
  glowRy: 65,
};

// ============================================================================
// Root Paths - Organic underground spreading
// ============================================================================

export const rootPaths = [
  // Main taproot
  'M 500,980 C 500,1020 498,1080 495,1150',
  // Left roots - natural spreading
  'M 500,980 C 450,1010 380,1050 300,1100 C 220,1150 140,1190 60,1230',
  'M 500,985 C 460,1020 400,1070 330,1120 C 260,1170 180,1210 100,1250',
  'M 498,990 C 440,1030 360,1090 270,1150 C 180,1210 80,1260 -20,1300',
  // Right roots - asymmetric
  'M 500,980 C 560,1015 640,1060 720,1110 C 800,1160 880,1200 960,1240',
  'M 502,988 C 570,1025 660,1080 750,1135 C 840,1190 920,1235 1000,1275',
  'M 500,992 C 550,1040 620,1100 700,1165 C 780,1230 870,1280 960,1320',
];

// ============================================================================
// Trunk Path - Thick organic trunk with natural curves
// This is a FILLED shape, not a stroke
// ============================================================================

export const trunkPath = `
  M 470,950 
  C 465,850 460,750 455,650 
  C 450,550 448,450 450,380
  L 455,380
  C 458,320 465,280 480,250
  L 520,250
  C 535,280 542,320 545,380
  L 550,380
  C 552,450 550,550 545,650
  C 540,750 535,850 530,950
  Z
`;

// ============================================================================
// Primary Branch Paths - UPWARD growing branches like a real tree
// Branches reach UP toward the sky, not horizontally outward
// ============================================================================

export const primaryBranchPaths = [
  // LEFT SIDE - Lower branches (grow up and out)
  'M 460,700 C 400,650 320,580 240,500 C 180,440 120,370 60,300',
  'M 455,600 C 380,540 280,460 180,380 C 100,320 20,250 -60,180',
  'M 450,500 C 360,430 250,350 140,270 C 60,210 -30,140 -100,80',
  
  // RIGHT SIDE - Lower branches (asymmetric heights)
  'M 540,720 C 620,670 720,600 820,520 C 900,460 980,390 1050,320',
  'M 545,610 C 640,550 760,470 880,390 C 970,330 1060,260 1140,190',
  'M 550,510 C 660,440 790,360 920,280 C 1020,220 1110,150 1180,90',
  
  // UPPER branches - reaching toward crown
  'M 455,420 C 380,360 280,290 180,220 C 100,170 20,110 -40,60',
  'M 545,430 C 640,370 760,300 880,230 C 980,180 1070,120 1140,70',
  
  // Crown branches - vertical reach
  'M 480,350 C 450,280 400,200 340,130 C 300,80 250,30 200,-10',
  'M 520,350 C 550,280 600,200 660,130 C 700,80 750,30 800,-10',
  'M 500,320 C 490,250 470,170 440,100 C 420,50 390,0 360,-40',
  'M 500,320 C 510,250 530,170 560,100 C 580,50 610,0 640,-40',
];

// ============================================================================
// Secondary Branch Paths - Smaller organic sub-branches
// ============================================================================

export const secondaryBranchPaths = [
  // Left side sub-branches
  'M 240,500 C 200,450 150,390 100,330',
  'M 180,380 C 130,330 70,270 10,210',
  'M 140,270 C 90,220 30,160 -30,100',
  'M 340,130 C 290,90 230,40 170,-10',
  
  // Right side sub-branches
  'M 820,520 C 880,470 950,410 1010,350',
  'M 880,390 C 950,340 1030,280 1100,220',
  'M 920,280 C 990,230 1070,170 1140,110',
  'M 660,130 C 720,90 790,40 850,-10',
  
  // Inner detail branches
  'M 400,450 C 350,400 290,340 230,280',
  'M 600,460 C 660,410 730,350 800,290',
  'M 440,350 C 390,300 330,240 270,180',
  'M 560,360 C 620,310 690,250 760,190',
];

// ============================================================================
// Canopy Layers - LUSH, FULL foliage (not blurry ellipses)
// Multiple overlapping organic cloud-like shapes
// ============================================================================

export const canopyLayers = {
  // Base layer - large background foliage mass
  deepShadow: [
    { cx: 500, cy: 200, rx: 450, ry: 280 },
    { cx: 200, cy: 280, rx: 280, ry: 200 },
    { cx: 800, cy: 290, rx: 290, ry: 210 },
    { cx: 100, cy: 380, rx: 220, ry: 160 },
    { cx: 900, cy: 390, rx: 230, ry: 170 },
  ],
  // Dark mid layer
  dark: [
    { cx: 500, cy: 180, rx: 400, ry: 250 },
    { cx: 250, cy: 260, rx: 250, ry: 180 },
    { cx: 750, cy: 270, rx: 260, ry: 185 },
    { cx: 150, cy: 350, rx: 200, ry: 145 },
    { cx: 850, cy: 360, rx: 210, ry: 150 },
    { cx: 400, cy: 120, rx: 180, ry: 130 },
    { cx: 600, cy: 130, rx: 190, ry: 135 },
  ],
  // Mid layer - main visible foliage
  mid: [
    { cx: 500, cy: 160, rx: 360, ry: 220 },
    { cx: 300, cy: 240, rx: 220, ry: 160 },
    { cx: 700, cy: 250, rx: 230, ry: 165 },
    { cx: 180, cy: 320, rx: 180, ry: 130 },
    { cx: 820, cy: 330, rx: 185, ry: 135 },
    { cx: 450, cy: 100, rx: 160, ry: 115 },
    { cx: 550, cy: 110, rx: 165, ry: 120 },
  ],
  // Light layer - front foliage
  light: [
    { cx: 500, cy: 140, rx: 320, ry: 195 },
    { cx: 350, cy: 220, rx: 195, ry: 140 },
    { cx: 650, cy: 230, rx: 200, ry: 145 },
    { cx: 220, cy: 290, rx: 160, ry: 115 },
    { cx: 780, cy: 300, rx: 165, ry: 120 },
    { cx: 500, cy: 80, rx: 140, ry: 100 },
  ],
  // Highlight spots - light catching leaves
  highlights: [
    { cx: 420, cy: 120, rx: 70, ry: 50 },
    { cx: 580, cy: 130, rx: 75, ry: 52 },
    { cx: 320, cy: 200, rx: 60, ry: 42 },
    { cx: 680, cy: 210, rx: 65, ry: 45 },
    { cx: 500, cy: 60, rx: 55, ry: 38 },
    { cx: 250, cy: 270, rx: 50, ry: 35 },
    { cx: 750, cy: 280, rx: 52, ry: 36 },
    { cx: 400, cy: 180, rx: 45, ry: 32 },
    { cx: 600, cy: 190, rx: 48, ry: 34 },
  ],
};

// ============================================================================
// Fruit Data - Glowing orbs nestled in the canopy
// Positioned within the foliage, not on branch tips
// ============================================================================

export interface Fruit {
  id: string;
  dataType: string;
  cx: number;
  cy: number;
  label: string;
}

export const fruits: Fruit[] = [
  // Crown - top of tree
  { id: 'cosmos', dataType: 'cosmos', cx: 500, cy: 80, label: 'Cosmos' },
  // Upper canopy
  { id: 'intuition', dataType: 'intuition', cx: 320, cy: 150, label: 'Intuition' },
  { id: 'wisdom', dataType: 'wisdom', cx: 680, cy: 160, label: 'Wisdom' },
  // Mid canopy
  { id: 'purpose', dataType: 'purpose', cx: 200, cy: 250, label: 'Purpose' },
  { id: 'logic', dataType: 'logic', cx: 800, cy: 260, label: 'Logic' },
  // Lower canopy
  { id: 'health', dataType: 'health', cx: 280, cy: 340, label: 'Health' },
  { id: 'wealth', dataType: 'wealth', cx: 720, cy: 350, label: 'Wealth' },
  // Near trunk
  { id: 'love', dataType: 'love', cx: 380, cy: 420, label: 'Love' },
  { id: 'career', dataType: 'career', cx: 620, cy: 430, label: 'Career' },
];

// ============================================================================
// Fruit Positions for Image-Based Tree (percentage-based)
// These positions are relative to the tree image container (0-100%)
// Designed for the wide, spreading tree image
// ============================================================================

export interface FruitPosition {
  id: string;
  dataType: string;
  positionX: number; // percentage 0-100
  positionY: number; // percentage 0-100
  label: string;
}

export const fruitPositions: FruitPosition[] = [
  // Top center - crown of tree
  { id: 'cosmos', dataType: 'cosmos', positionX: 50, positionY: 26, label: 'Cosmos' },
  // Upper branches - left and right
  { id: 'intuition', dataType: 'intuition', positionX: 36, positionY: 32, label: 'Intuition' },
  { id: 'wisdom', dataType: 'wisdom', positionX: 64, positionY: 32, label: 'Wisdom' },
  // Mid branches - spreading outward
  { id: 'purpose', dataType: 'purpose', positionX: 26, positionY: 40, label: 'Purpose' },
  { id: 'logic', dataType: 'logic', positionX: 74, positionY: 40, label: 'Logic' },
  // Lower outer branches
  { id: 'health', dataType: 'health', positionX: 18, positionY: 50, label: 'Health' },
  { id: 'wealth', dataType: 'wealth', positionX: 82, positionY: 50, label: 'Wealth' },
  // Inner lower branches
  { id: 'love', dataType: 'love', positionX: 38, positionY: 48, label: 'Love' },
  { id: 'career', dataType: 'career', positionX: 62, positionY: 48, label: 'Career' },
];

// ============================================================================
// Wisdom Quotes
// ============================================================================

export const wisdomQuotes = [
  { id: 'quote-1', text: 'Every branch reaches toward the light', side: 'left' as const },
  { id: 'quote-2', text: 'Roots ground us, branches free us', side: 'left' as const },
  { id: 'quote-3', text: 'Growth happens in all directions', side: 'left' as const },
  { id: 'quote-4', text: 'The cosmos flows through every leaf', side: 'right' as const },
  { id: 'quote-5', text: 'Balance is the key to harmony', side: 'right' as const },
  { id: 'quote-6', text: 'Your path is uniquely yours', side: 'right' as const },
];

// ============================================================================
// Fruit Content
// ============================================================================

export const fruitContent: Record<string, {
  title: string;
  subtitle: string;
  description: string;
  tarotCards: string[];
  keywords: string[];
}> = {
  cosmos: {
    title: 'Cosmos',
    subtitle: 'The Universal Connection',
    description: 'The universal connection that binds all things. Your place in the infinite tapestry of existence.',
    tarotCards: ['The Star', 'The World', 'The Moon'],
    keywords: ['infinity', 'unity', 'transcendence', 'divine'],
  },
  intuition: {
    title: 'Intuition',
    subtitle: 'The Inner Voice',
    description: 'Your inner knowing, the whispers of your soul guiding you through life\'s mysteries.',
    tarotCards: ['The High Priestess', 'The Moon', 'The Hanged Man'],
    keywords: ['insight', 'instinct', 'awareness', 'perception'],
  },
  wisdom: {
    title: 'Wisdom',
    subtitle: 'Knowledge Transformed',
    description: 'The accumulated knowledge of experience, transformed into understanding.',
    tarotCards: ['The Hierophant', 'The Hermit', 'Justice'],
    keywords: ['knowledge', 'experience', 'understanding', 'truth'],
  },
  purpose: {
    title: 'Purpose',
    subtitle: 'Your Calling',
    description: 'Your unique reason for being, the calling that gives meaning to your journey.',
    tarotCards: ['The Magician', 'Wheel of Fortune', 'The Sun'],
    keywords: ['meaning', 'destiny', 'calling', 'mission'],
  },
  logic: {
    title: 'Logic',
    subtitle: 'The Rational Mind',
    description: 'The rational mind that helps navigate the complexities of the material world.',
    tarotCards: ['Justice', 'The Emperor', 'Ace of Swords'],
    keywords: ['reason', 'analysis', 'clarity', 'structure'],
  },
  health: {
    title: 'Health',
    subtitle: 'Body, Mind & Spirit',
    description: 'The vitality of body, mind, and spirit working in harmony.',
    tarotCards: ['Strength', 'Temperance', 'The Sun'],
    keywords: ['vitality', 'balance', 'wellness', 'energy'],
  },
  wealth: {
    title: 'Wealth',
    subtitle: 'Abundance in All Forms',
    description: 'Abundance in all its forms - material, spiritual, and relational.',
    tarotCards: ['Ace of Pentacles', 'The Empress', 'Ten of Pentacles'],
    keywords: ['abundance', 'prosperity', 'gratitude', 'flow'],
  },
  love: {
    title: 'Love',
    subtitle: 'The Heart\'s Connection',
    description: 'The force that connects hearts and transcends all boundaries.',
    tarotCards: ['The Lovers', 'Two of Cups', 'The Empress'],
    keywords: ['connection', 'compassion', 'devotion', 'unity'],
  },
  career: {
    title: 'Career',
    subtitle: 'Your Work in the World',
    description: 'Your work in the world, the contribution you make to the collective.',
    tarotCards: ['The Chariot', 'Eight of Pentacles', 'Three of Wands'],
    keywords: ['ambition', 'growth', 'achievement', 'contribution'],
  },
};

// Legacy exports
export const treeNodes = fruits.map(f => ({ id: f.id, cx: f.cx, cy: f.cy, label: f.label }));
export const nodeContent = fruitContent;
export const branchPaths = [...primaryBranchPaths];
export const secondaryBranches = secondaryBranchPaths;
