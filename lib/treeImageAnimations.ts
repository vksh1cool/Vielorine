/**
 * Tree Image Animation Utilities
 * 
 * Pure functions for calculating animation values for the Tree of Life image.
 * All functions are designed to be testable with property-based testing.
 */

// Animation configuration constants
export const ANIMATION_CONFIG = {
  breathing: {
    minScale: 0.995,
    maxScale: 1.005,
    duration: 4, // seconds per cycle
  },
  glow: {
    minOpacity: 0.3,
    maxOpacity: 0.6,
    duration: 3, // seconds per cycle
  },
  parallax: {
    maxOffset: 30, // pixels
    factor: 0.1,
  },
  hover: {
    scale: 1.15,
    glowIntensity: 1.5,
    duration: 0.3,
  },
} as const;

/**
 * Calculate breathing scale effect for the tree image.
 * Returns a value oscillating between 0.995 and 1.005 (±0.5% variation).
 * 
 * @param time - Current time in seconds
 * @returns Scale value in range [0.995, 1.005]
 */
export function calculateBreathingScale(time: number): number {
  const { minScale, maxScale, duration } = ANIMATION_CONFIG.breathing;
  const amplitude = (maxScale - minScale) / 2;
  const midpoint = (maxScale + minScale) / 2;
  
  // Use sine wave for smooth oscillation
  const phase = (time / duration) * Math.PI * 2;
  return midpoint + amplitude * Math.sin(phase);
}

/**
 * Calculate glow opacity for ambient pulse effect.
 * Returns a value oscillating between configured min and max opacity.
 * 
 * @param time - Current time in seconds
 * @returns Opacity value in range [minOpacity, maxOpacity]
 */
export function calculateGlowOpacity(time: number): number {
  const { minOpacity, maxOpacity, duration } = ANIMATION_CONFIG.glow;
  const amplitude = (maxOpacity - minOpacity) / 2;
  const midpoint = (maxOpacity + minOpacity) / 2;
  
  // Use sine wave for smooth oscillation
  const phase = (time / duration) * Math.PI * 2;
  return midpoint + amplitude * Math.sin(phase);
}


/**
 * Calculate parallax offset based on scroll position.
 * Returns a bounded offset value for subtle parallax movement.
 * 
 * @param scrollY - Current scroll position in pixels
 * @param containerTop - Top position of the container element
 * @returns Offset value bounded within [-maxOffset, maxOffset]
 */
export function calculateParallaxOffset(scrollY: number, containerTop: number): number {
  const { maxOffset, factor } = ANIMATION_CONFIG.parallax;
  const relativeScroll = scrollY - containerTop;
  const rawOffset = relativeScroll * factor;
  
  // Clamp to bounds
  return Math.max(-maxOffset, Math.min(maxOffset, rawOffset));
}

/**
 * Calculate fruit hover scale.
 * Returns 1.15 when hovered, 1.0 when not.
 * 
 * @param isHovered - Whether the fruit is currently hovered
 * @returns Scale value (1.0 or 1.15)
 */
export function calculateFruitHoverScale(isHovered: boolean): number {
  return isHovered ? ANIMATION_CONFIG.hover.scale : 1.0;
}

/**
 * Calculate fruit hover glow intensity.
 * Returns intensified glow when hovered, normal when not.
 * 
 * @param isHovered - Whether the fruit is currently hovered
 * @returns Glow intensity multiplier (1.0 or 1.5)
 */
export function calculateFruitHoverGlow(isHovered: boolean): number {
  return isHovered ? ANIMATION_CONFIG.hover.glowIntensity : 1.0;
}

/**
 * Calculate fruit position in pixels from percentage-based coordinates.
 * Ensures responsive positioning across different screen sizes.
 * 
 * @param percentX - X position as percentage (0-100)
 * @param percentY - Y position as percentage (0-100)
 * @param containerWidth - Container width in pixels
 * @param containerHeight - Container height in pixels
 * @returns Pixel coordinates { x, y }
 */
export function calculateFruitPosition(
  percentX: number,
  percentY: number,
  containerWidth: number,
  containerHeight: number
): { x: number; y: number } {
  // Clamp percentages to valid range
  const clampedX = Math.max(0, Math.min(100, percentX));
  const clampedY = Math.max(0, Math.min(100, percentY));
  
  return {
    x: (clampedX / 100) * containerWidth,
    y: (clampedY / 100) * containerHeight,
  };
}

// Reduced motion variants - return static values

/**
 * Calculate breathing scale with reduced motion preference.
 * Returns static value of 1.0 when reduced motion is enabled.
 * 
 * @param time - Current time in seconds (ignored when reduced motion)
 * @param prefersReducedMotion - Whether user prefers reduced motion
 * @returns Scale value (1.0 when reduced motion, animated otherwise)
 */
export function calculateBreathingScaleWithMotionPref(
  time: number,
  prefersReducedMotion: boolean
): number {
  if (prefersReducedMotion) return 1.0;
  return calculateBreathingScale(time);
}

/**
 * Calculate glow opacity with reduced motion preference.
 * Returns static midpoint value when reduced motion is enabled.
 * 
 * @param time - Current time in seconds (ignored when reduced motion)
 * @param prefersReducedMotion - Whether user prefers reduced motion
 * @returns Opacity value (static midpoint when reduced motion, animated otherwise)
 */
export function calculateGlowOpacityWithMotionPref(
  time: number,
  prefersReducedMotion: boolean
): number {
  if (prefersReducedMotion) {
    const { minOpacity, maxOpacity } = ANIMATION_CONFIG.glow;
    return (minOpacity + maxOpacity) / 2;
  }
  return calculateGlowOpacity(time);
}

/**
 * Calculate parallax offset with reduced motion preference.
 * Returns 0 when reduced motion is enabled.
 * 
 * @param scrollY - Current scroll position
 * @param containerTop - Container top position
 * @param prefersReducedMotion - Whether user prefers reduced motion
 * @returns Offset value (0 when reduced motion, calculated otherwise)
 */
export function calculateParallaxOffsetWithMotionPref(
  scrollY: number,
  containerTop: number,
  prefersReducedMotion: boolean
): number {
  if (prefersReducedMotion) return 0;
  return calculateParallaxOffset(scrollY, containerTop);
}
