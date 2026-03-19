// Constants for Vielorine Website

export const colors = {
  sage: '#A7B88A',
  forest: '#3A5A36',
  gold: '#D9C39A',
  wood: '#B88A55',
  linen: '#F3EDE2',
  shadow: '#4A4A40',
} as const;

export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

// Tree of Life scroll thresholds (legacy - kept for reference)
export const treeThresholds = {
  rootsFadeIn: 0.05,
  pathDrawStart: 0.10,
  pathDrawEnd: 0.60,
  nodesFadeIn: 0.60,
  textOverlay: 0.85,
} as const;

/**
 * Tree of Life Animation Phases
 * Based on specification: Seed → Sprout → Branches → Canopy → Fruits
 */
export const ANIMATION_PHASES = {
  seed: { start: 0, end: 0.15 },
  trunk: { start: 0.15, end: 0.35 },
  branches: { start: 0.35, end: 0.65 },
  canopy: { start: 0.65, end: 0.85 },
  fruits: { start: 0.85, end: 1.0 },
} as const;

/**
 * Scroll configuration for GSAP ScrollTrigger
 */
export const SCROLL_CONFIG = {
  pinDuration: 3000, // pixels of scroll distance while pinned
  scrub: true,
} as const;

/**
 * Life effect configuration
 */
export const LIFE_EFFECTS = {
  breathingAmplitude: 0.01, // ±1% scale variation
  pulseSpeed: 0.5, // cycles per second
  cursorProximityMax: 5, // max pixels of branch offset
} as const;

/**
 * Hover effect configuration
 */
export const HOVER_EFFECTS = {
  scale: 1.15,
  glowIntensity: 1.5,
} as const;

// Cursor dimensions
export const cursorDimensions = {
  dotSize: 8,
  outlineSize: 40,
  outlineHoverSize: 60,
  animationDuration: 500,
} as const;
