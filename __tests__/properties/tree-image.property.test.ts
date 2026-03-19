/**
 * Property-Based Tests for Tree Image Animations
 * 
 * These tests verify that animation calculation functions maintain
 * their correctness properties across all valid inputs.
 */

import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import {
  calculateBreathingScale,
  calculateGlowOpacity,
  calculateParallaxOffset,
  calculateFruitHoverScale,
  calculateFruitHoverGlow,
  calculateFruitPosition,
  calculateBreathingScaleWithMotionPref,
  calculateGlowOpacityWithMotionPref,
  calculateParallaxOffsetWithMotionPref,
  ANIMATION_CONFIG,
} from '@/lib/treeImageAnimations';

describe('Tree Image Animation Properties', () => {
  /**
   * **Feature: tree-image-redesign, Property 1: Breathing scale bounds**
   * 
   * For any time value, the breathing scale calculation should return
   * a value within [0.995, 1.005] (±0.5% variation).
   * 
   * **Validates: Requirements 2.1**
   */
  describe('Property 1: Breathing scale bounds', () => {
    it('should always return scale within [0.995, 1.005] for any time value', () => {
      fc.assert(
        fc.property(
          fc.float({ min: 0, max: 100000, noNaN: true }),
          (time) => {
            const scale = calculateBreathingScale(time);
            expect(scale).toBeGreaterThanOrEqual(ANIMATION_CONFIG.breathing.minScale);
            expect(scale).toBeLessThanOrEqual(ANIMATION_CONFIG.breathing.maxScale);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should handle negative time values gracefully', () => {
      fc.assert(
        fc.property(
          fc.float({ min: -100000, max: 0, noNaN: true }),
          (time) => {
            const scale = calculateBreathingScale(time);
            expect(scale).toBeGreaterThanOrEqual(ANIMATION_CONFIG.breathing.minScale);
            expect(scale).toBeLessThanOrEqual(ANIMATION_CONFIG.breathing.maxScale);
          }
        ),
        { numRuns: 100 }
      );
    });
  });


  /**
   * **Feature: tree-image-redesign, Property 2: Glow opacity bounds**
   * 
   * For any time value, the glow opacity calculation should return
   * a value within [0, 1] and specifically within the configured min/max range.
   * 
   * **Validates: Requirements 2.3**
   */
  describe('Property 2: Glow opacity bounds', () => {
    it('should always return opacity within configured bounds for any time value', () => {
      fc.assert(
        fc.property(
          fc.float({ min: 0, max: 100000, noNaN: true }),
          (time) => {
            const opacity = calculateGlowOpacity(time);
            expect(opacity).toBeGreaterThanOrEqual(ANIMATION_CONFIG.glow.minOpacity);
            expect(opacity).toBeLessThanOrEqual(ANIMATION_CONFIG.glow.maxOpacity);
            // Also verify it's a valid opacity value
            expect(opacity).toBeGreaterThanOrEqual(0);
            expect(opacity).toBeLessThanOrEqual(1);
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  /**
   * **Feature: tree-image-redesign, Property 3: Parallax offset bounds**
   * 
   * For any scroll position and container position, the parallax offset
   * should be bounded within the configured maximum offset.
   * 
   * **Validates: Requirements 2.2**
   */
  describe('Property 3: Parallax offset bounds', () => {
    it('should always return offset within [-maxOffset, maxOffset]', () => {
      fc.assert(
        fc.property(
          fc.float({ min: -10000, max: 10000, noNaN: true }),
          fc.float({ min: -10000, max: 10000, noNaN: true }),
          (scrollY, containerTop) => {
            const offset = calculateParallaxOffset(scrollY, containerTop);
            expect(offset).toBeGreaterThanOrEqual(-ANIMATION_CONFIG.parallax.maxOffset);
            expect(offset).toBeLessThanOrEqual(ANIMATION_CONFIG.parallax.maxOffset);
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  /**
   * **Feature: tree-image-redesign, Property 4: Fruit hover scale**
   * 
   * For any fruit in hover state, the hover scale should be greater than 1.0
   * (specifically 1.15), and for non-hover state it should be exactly 1.0.
   * 
   * **Validates: Requirements 3.2**
   */
  describe('Property 4: Fruit hover scale', () => {
    it('should return 1.15 when hovered and 1.0 when not hovered', () => {
      fc.assert(
        fc.property(
          fc.boolean(),
          (isHovered) => {
            const scale = calculateFruitHoverScale(isHovered);
            if (isHovered) {
              expect(scale).toBe(ANIMATION_CONFIG.hover.scale);
              expect(scale).toBeGreaterThan(1.0);
            } else {
              expect(scale).toBe(1.0);
            }
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should return intensified glow when hovered', () => {
      fc.assert(
        fc.property(
          fc.boolean(),
          (isHovered) => {
            const glow = calculateFruitHoverGlow(isHovered);
            if (isHovered) {
              expect(glow).toBe(ANIMATION_CONFIG.hover.glowIntensity);
              expect(glow).toBeGreaterThan(1.0);
            } else {
              expect(glow).toBe(1.0);
            }
          }
        ),
        { numRuns: 100 }
      );
    });
  });


  /**
   * **Feature: tree-image-redesign, Property 5: Responsive fruit positioning**
   * 
   * For any percentage-based position (0-100) and any container dimensions,
   * the calculated pixel position should be proportionally correct
   * (position = percent * dimension / 100).
   * 
   * **Validates: Requirements 3.5**
   */
  describe('Property 5: Responsive fruit positioning', () => {
    it('should calculate correct pixel position from percentage', () => {
      fc.assert(
        fc.property(
          fc.float({ min: 0, max: 100, noNaN: true }),
          fc.float({ min: 0, max: 100, noNaN: true }),
          fc.float({ min: 1, max: 5000, noNaN: true }),
          fc.float({ min: 1, max: 5000, noNaN: true }),
          (percentX, percentY, containerWidth, containerHeight) => {
            const { x, y } = calculateFruitPosition(
              percentX,
              percentY,
              containerWidth,
              containerHeight
            );
            
            const expectedX = (percentX / 100) * containerWidth;
            const expectedY = (percentY / 100) * containerHeight;
            
            expect(x).toBeCloseTo(expectedX, 5);
            expect(y).toBeCloseTo(expectedY, 5);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should clamp percentage values to valid range [0, 100]', () => {
      fc.assert(
        fc.property(
          fc.float({ min: -100, max: 200, noNaN: true }),
          fc.float({ min: -100, max: 200, noNaN: true }),
          fc.float({ min: 1, max: 1000, noNaN: true }),
          fc.float({ min: 1, max: 1000, noNaN: true }),
          (percentX, percentY, containerWidth, containerHeight) => {
            const { x, y } = calculateFruitPosition(
              percentX,
              percentY,
              containerWidth,
              containerHeight
            );
            
            // Position should always be within container bounds
            expect(x).toBeGreaterThanOrEqual(0);
            expect(x).toBeLessThanOrEqual(containerWidth);
            expect(y).toBeGreaterThanOrEqual(0);
            expect(y).toBeLessThanOrEqual(containerHeight);
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  /**
   * **Feature: tree-image-redesign, Property 8: Reduced motion static values**
   * 
   * For any animation calculation when reduced motion is enabled,
   * the function should return static values (scale = 1, no glow animation, no parallax).
   * 
   * **Validates: Requirements 5.1, 5.2**
   */
  describe('Property 8: Reduced motion static values', () => {
    it('should return static scale of 1.0 when reduced motion is enabled', () => {
      fc.assert(
        fc.property(
          fc.float({ min: 0, max: 100000, noNaN: true }),
          (time) => {
            const scale = calculateBreathingScaleWithMotionPref(time, true);
            expect(scale).toBe(1.0);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should return static glow opacity when reduced motion is enabled', () => {
      fc.assert(
        fc.property(
          fc.float({ min: 0, max: 100000, noNaN: true }),
          (time) => {
            const opacity = calculateGlowOpacityWithMotionPref(time, true);
            const expectedMidpoint = (ANIMATION_CONFIG.glow.minOpacity + ANIMATION_CONFIG.glow.maxOpacity) / 2;
            expect(opacity).toBe(expectedMidpoint);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should return zero parallax offset when reduced motion is enabled', () => {
      fc.assert(
        fc.property(
          fc.float({ min: -10000, max: 10000, noNaN: true }),
          fc.float({ min: -10000, max: 10000, noNaN: true }),
          (scrollY, containerTop) => {
            const offset = calculateParallaxOffsetWithMotionPref(scrollY, containerTop, true);
            expect(offset).toBe(0);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should return animated values when reduced motion is disabled', () => {
      fc.assert(
        fc.property(
          fc.float({ min: 0, max: 100000, noNaN: true }),
          (time) => {
            const scaleWithMotion = calculateBreathingScaleWithMotionPref(time, false);
            const scaleNormal = calculateBreathingScale(time);
            expect(scaleWithMotion).toBe(scaleNormal);
          }
        ),
        { numRuns: 100 }
      );
    });
  });
});
