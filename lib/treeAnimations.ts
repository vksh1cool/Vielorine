/**
 * Tree of Life Animation Calculation Functions
 * 
 * Pure functions for calculating animation values based on scroll progress.
 * These functions are designed to be testable via property-based testing.
 */

import { ANIMATION_PHASES, LIFE_EFFECTS, HOVER_EFFECTS } from './constants';

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Clamps a value between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Linear interpolation between two values
 */
export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * clamp(t, 0, 1);
}

/**
 * Calculates normalized progress within a phase
 * Returns 0 before phase starts, 1 after phase ends, and interpolated value during phase
 */
export function getPhaseProgress(
  progress: number,
  phaseStart: number,
  phaseEnd: number
): number {
  if (progress <= phaseStart) return 0;
  if (progress >= phaseEnd) return 1;
  return (progress - phaseStart) / (phaseEnd - phaseStart);
}

// ============================================================================
// Phase 1: Seed (0-15%)
// ============================================================================

/**
 * Calculates seed scale based on scroll progress
 * Returns 0 at start, 1 at 15% progress
 */
export function calculateSeedScale(progress: number): number {
  const { start, end } = ANIMATION_PHASES.seed;
  return getPhaseProgress(progress, start, end);
}

/**
 * Calculates seed glow intensity based on scroll progress
 * Glow pulses slightly during the seed phase
 */
export function calculateSeedGlow(progress: number, time: number = 0): number {
  const scale = calculateSeedScale(progress);
  if (scale === 0) return 0;
  // Subtle pulse effect during seed phase
  const pulse = 0.8 + Math.sin(time * 2) * 0.2;
  return scale * pulse;
}

// ============================================================================
// Phase 2: Trunk (15-35%)
// ============================================================================

/**
 * Calculates trunk scaleY based on scroll progress
 * Returns 0 before trunk phase, 1 after trunk phase
 */
export function calculateTrunkScaleY(progress: number): number {
  const { start, end } = ANIMATION_PHASES.trunk;
  return getPhaseProgress(progress, start, end);
}

/**
 * Calculates roots extension based on scroll progress
 * Roots extend during trunk phase
 */
export function calculateRootsExtension(progress: number): number {
  const { start, end } = ANIMATION_PHASES.trunk;
  return getPhaseProgress(progress, start, end);
}

// ============================================================================
// Phase 3: Branches (35-65%)
// ============================================================================

/**
 * Calculates branch draw progress with stagger effect
 * Primary branches (index 0-5) animate first, secondary (6+) animate later
 */
export function calculateBranchDrawProgress(
  progress: number,
  branchIndex: number,
  totalBranches: number = 12
): number {
  const { start, end } = ANIMATION_PHASES.branches;
  const phaseProgress = getPhaseProgress(progress, start, end);
  
  if (phaseProgress === 0) return 0;
  if (phaseProgress === 1) return 1;
  
  // Stagger: each branch starts slightly after the previous
  const staggerAmount = 0.3; // 30% of phase duration for stagger spread
  const branchDelay = (branchIndex / totalBranches) * staggerAmount;
  const adjustedProgress = (phaseProgress - branchDelay) / (1 - staggerAmount);
  
  return clamp(adjustedProgress, 0, 1);
}

/**
 * Calculates strokeDashoffset for line-draw effect
 * Returns pathLength at start (hidden), 0 at end (fully drawn)
 */
export function calculateStrokeDashoffset(
  pathLength: number,
  drawProgress: number
): number {
  return pathLength * (1 - clamp(drawProgress, 0, 1));
}

// ============================================================================
// Phase 4: Canopy (65-85%)
// ============================================================================

/**
 * Calculates canopy opacity based on scroll progress
 * Returns 0 before canopy phase, 1 after canopy phase
 */
export function calculateCanopyOpacity(progress: number): number {
  const { start, end } = ANIMATION_PHASES.canopy;
  return getPhaseProgress(progress, start, end);
}

/**
 * Calculates canopy blur based on scroll progress
 * Returns maxBlur at start of canopy phase, 0 at end
 */
export function calculateCanopyBlur(progress: number, maxBlur: number = 20): number {
  const { start, end } = ANIMATION_PHASES.canopy;
  const phaseProgress = getPhaseProgress(progress, start, end);
  return maxBlur * (1 - phaseProgress);
}

// ============================================================================
// Phase 5: Fruits (85-100%)
// ============================================================================

/**
 * Calculates fruit scale based on scroll progress
 * Returns 0 before fruits phase, 1 after fruits phase
 */
export function calculateFruitScale(progress: number): number {
  const { start, end } = ANIMATION_PHASES.fruits;
  return getPhaseProgress(progress, start, end);
}

/**
 * Determines if fruits should be interactive
 * Returns true only when fruits are visible (progress >= 85%)
 */
export function calculateFruitInteractive(progress: number): boolean {
  return progress >= ANIMATION_PHASES.fruits.start;
}

// ============================================================================
// Life Effects
// ============================================================================

/**
 * Calculates breathing scale effect
 * Returns value within [1 - amplitude, 1 + amplitude]
 */
export function calculateBreathingScale(time: number): number {
  const amplitude = LIFE_EFFECTS.breathingAmplitude;
  return 1 + Math.sin(time * LIFE_EFFECTS.pulseSpeed * Math.PI * 2) * amplitude;
}

/**
 * Calculates pulse opacity effect for fruits
 * Returns value within [0.7, 1.0]
 */
export function calculatePulseOpacity(time: number): number {
  const base = 0.85;
  const amplitude = 0.15;
  return base + Math.sin(time * LIFE_EFFECTS.pulseSpeed * Math.PI * 2) * amplitude;
}

/**
 * Calculates branch offset based on cursor proximity
 * Returns subtle offset within ±LIFE_EFFECTS.cursorProximityMax pixels
 */
export function calculateBranchOffset(
  cursorX: number,
  cursorY: number,
  branchCenterX: number,
  branchCenterY: number,
  svgWidth: number,
  svgHeight: number
): { x: number; y: number } {
  const maxOffset = LIFE_EFFECTS.cursorProximityMax;
  
  // Normalize cursor position to [-0.5, 0.5]
  const normalizedX = (cursorX / svgWidth) - 0.5;
  const normalizedY = (cursorY / svgHeight) - 0.5;
  
  // Calculate distance from branch center (normalized)
  const branchNormX = (branchCenterX / svgWidth) - 0.5;
  const branchNormY = (branchCenterY / svgHeight) - 0.5;
  
  // Offset is proportional to cursor position, inversely to distance from branch
  const dx = normalizedX - branchNormX;
  const dy = normalizedY - branchNormY;
  const distance = Math.sqrt(dx * dx + dy * dy);
  
  // Closer cursor = stronger effect, but capped
  const influence = Math.max(0, 1 - distance * 2);
  
  return {
    x: clamp(normalizedX * maxOffset * influence, -maxOffset, maxOffset),
    y: clamp(normalizedY * maxOffset * influence * 0.5, -maxOffset, maxOffset),
  };
}

// ============================================================================
// Hover Effects
// ============================================================================

/**
 * Calculates hover scale for fruits
 * Returns 1.0 when not hovered, HOVER_EFFECTS.scale when hovered
 */
export function calculateHoverScale(isHovered: boolean): number {
  return isHovered ? HOVER_EFFECTS.scale : 1.0;
}

/**
 * Calculates hover glow intensity for fruits
 * Returns 1.0 when not hovered, HOVER_EFFECTS.glowIntensity when hovered
 */
export function calculateHoverGlow(isHovered: boolean): number {
  return isHovered ? HOVER_EFFECTS.glowIntensity : 1.0;
}

// ============================================================================
// Reduced Motion Variants
// ============================================================================

/**
 * Returns static final values for all phase calculations when reduced motion is enabled
 */
export function getReducedMotionValues(progress: number): {
  seedScale: number;
  trunkScaleY: number;
  branchDrawProgress: number;
  canopyOpacity: number;
  canopyBlur: number;
  fruitScale: number;
  fruitInteractive: boolean;
} {
  // With reduced motion, show final state based on progress thresholds
  const showSeed = progress >= ANIMATION_PHASES.seed.end;
  const showTrunk = progress >= ANIMATION_PHASES.trunk.end;
  const showBranches = progress >= ANIMATION_PHASES.branches.end;
  const showCanopy = progress >= ANIMATION_PHASES.canopy.end;
  const showFruits = progress >= ANIMATION_PHASES.fruits.start;
  
  return {
    seedScale: showSeed ? 1 : 0,
    trunkScaleY: showTrunk ? 1 : 0,
    branchDrawProgress: showBranches ? 1 : 0,
    canopyOpacity: showCanopy ? 1 : 0,
    canopyBlur: showCanopy ? 0 : 20,
    fruitScale: showFruits ? 1 : 0,
    fruitInteractive: showFruits,
  };
}
