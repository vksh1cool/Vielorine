/**
 * Property-Based Tests for Tree of Life Animation Calculations
 * 
 * Uses fast-check to verify correctness properties across all valid inputs.
 * Each test is tagged with the property it validates from the design document.
 */

import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import {
  calculateSeedScale,
  calculateTrunkScaleY,
  calculateBranchDrawProgress,
  calculateStrokeDashoffset,
  calculateCanopyOpacity,
  calculateCanopyBlur,
  calculateFruitScale,
  calculateFruitInteractive,
  calculateHoverScale,
  calculateHoverGlow,
  calculateBreathingScale,
  calculatePulseOpacity,
  calculateBranchOffset,
  getReducedMotionValues,
} from '@/lib/treeAnimations';
import { ANIMATION_PHASES } from '@/lib/constants';

describe('Tree of Life Phase Calculations - Property Tests', () => {
  /**
   * **Feature: tree-of-life-recreation, Property 1: Seed scale calculation**
   * 
   * For any scroll progress value in [0, 0.15], the seed scale should be correctly
   * interpolated from 0 to 1, and for progress < 0 it should be 0, and for 
   * progress > 0.15 it should be 1.
   * 
   * **Validates: Requirements 1.2**
   */
  describe('Property 1: Seed scale calculation', () => {
    it('should return 0 for progress <= 0', () => {
      fc.assert(
        fc.property(
          fc.double({ min: -1, max: 0, noNaN: true }),
          (progress) => {
            expect(calculateSeedScale(progress)).toBe(0);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should return 1 for progress >= 0.15', () => {
      fc.assert(
        fc.property(
          fc.double({ min: 0.15, max: 2, noNaN: true }),
          (progress) => {
            expect(calculateSeedScale(progress)).toBe(1);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should interpolate correctly within seed phase [0, 0.15]', () => {
      fc.assert(
        fc.property(
          fc.double({ min: 0.001, max: 0.149, noNaN: true }),
          (progress) => {
            const scale = calculateSeedScale(progress);
            // Scale should be between 0 and 1
            expect(scale).toBeGreaterThan(0);
            expect(scale).toBeLessThan(1);
            // Scale should be proportional to progress
            const expectedScale = progress / ANIMATION_PHASES.seed.end;
            expect(scale).toBeCloseTo(expectedScale, 5);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should be monotonically increasing', () => {
      fc.assert(
        fc.property(
          fc.double({ min: 0, max: 0.15, noNaN: true }),
          fc.double({ min: 0, max: 0.15, noNaN: true }),
          (p1, p2) => {
            if (p1 < p2) {
              expect(calculateSeedScale(p1)).toBeLessThanOrEqual(calculateSeedScale(p2));
            }
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  /**
   * **Feature: tree-of-life-recreation, Property 2: Trunk scaleY calculation**
   * 
   * For any scroll progress value in [0.15, 0.35], the trunk scaleY should be
   * correctly interpolated from 0 to 1, with values clamped at boundaries.
   * 
   * **Validates: Requirements 1.3**
   */
  describe('Property 2: Trunk scaleY calculation', () => {
    it('should return 0 for progress <= 0.15', () => {
      fc.assert(
        fc.property(
          fc.double({ min: -1, max: 0.15, noNaN: true }),
          (progress) => {
            expect(calculateTrunkScaleY(progress)).toBe(0);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should return 1 for progress >= 0.35', () => {
      fc.assert(
        fc.property(
          fc.double({ min: 0.35, max: 2, noNaN: true }),
          (progress) => {
            expect(calculateTrunkScaleY(progress)).toBe(1);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should interpolate correctly within trunk phase [0.15, 0.35]', () => {
      fc.assert(
        fc.property(
          fc.double({ min: 0.151, max: 0.349, noNaN: true }),
          (progress) => {
            const scaleY = calculateTrunkScaleY(progress);
            expect(scaleY).toBeGreaterThan(0);
            expect(scaleY).toBeLessThan(1);
            // Verify interpolation
            const { start, end } = ANIMATION_PHASES.trunk;
            const expected = (progress - start) / (end - start);
            expect(scaleY).toBeCloseTo(expected, 5);
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  /**
   * **Feature: tree-of-life-recreation, Property 3: Branch draw progress calculation**
   * 
   * For any scroll progress value in [0.35, 0.65] and any branch index, the draw
   * progress should be correctly calculated with appropriate stagger, and
   * strokeDashoffset should decrease as progress increases.
   * 
   * **Validates: Requirements 1.4**
   */
  describe('Property 3: Branch draw progress calculation', () => {
    it('should return 0 for progress <= 0.35', () => {
      fc.assert(
        fc.property(
          fc.double({ min: -1, max: 0.35, noNaN: true }),
          fc.integer({ min: 0, max: 11 }),
          (progress, branchIndex) => {
            expect(calculateBranchDrawProgress(progress, branchIndex)).toBe(0);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should return 1 for progress >= 0.65', () => {
      fc.assert(
        fc.property(
          fc.double({ min: 0.65, max: 2, noNaN: true }),
          fc.integer({ min: 0, max: 11 }),
          (progress, branchIndex) => {
            expect(calculateBranchDrawProgress(progress, branchIndex)).toBe(1);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should apply stagger - earlier branches draw before later ones', () => {
      fc.assert(
        fc.property(
          fc.double({ min: 0.36, max: 0.64, noNaN: true }),
          (progress) => {
            const branch0Progress = calculateBranchDrawProgress(progress, 0);
            const branch11Progress = calculateBranchDrawProgress(progress, 11);
            // Earlier branches should have more progress
            expect(branch0Progress).toBeGreaterThanOrEqual(branch11Progress);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('strokeDashoffset should decrease as draw progress increases', () => {
      fc.assert(
        fc.property(
          fc.double({ min: 100, max: 1000, noNaN: true }),
          fc.double({ min: 0, max: 1, noNaN: true }),
          fc.double({ min: 0, max: 1, noNaN: true }),
          (pathLength, progress1, progress2) => {
            const offset1 = calculateStrokeDashoffset(pathLength, progress1);
            const offset2 = calculateStrokeDashoffset(pathLength, progress2);
            if (progress1 < progress2) {
              expect(offset1).toBeGreaterThanOrEqual(offset2);
            }
          }
        ),
        { numRuns: 100 }
      );
    });

    it('strokeDashoffset should equal pathLength at progress 0', () => {
      fc.assert(
        fc.property(
          fc.double({ min: 100, max: 1000, noNaN: true }),
          (pathLength) => {
            expect(calculateStrokeDashoffset(pathLength, 0)).toBe(pathLength);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('strokeDashoffset should equal 0 at progress 1', () => {
      fc.assert(
        fc.property(
          fc.double({ min: 100, max: 1000, noNaN: true }),
          (pathLength) => {
            expect(calculateStrokeDashoffset(pathLength, 1)).toBe(0);
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  /**
   * **Feature: tree-of-life-recreation, Property 4: Canopy opacity and blur calculation**
   * 
   * For any scroll progress value in [0.65, 0.85], canopy opacity should increase
   * from 0 to 1 and blur should decrease from maximum to 0.
   * 
   * **Validates: Requirements 1.5**
   */
  describe('Property 4: Canopy opacity and blur calculation', () => {
    it('canopy opacity should be 0 for progress <= 0.65', () => {
      fc.assert(
        fc.property(
          fc.double({ min: -1, max: 0.65, noNaN: true }),
          (progress) => {
            expect(calculateCanopyOpacity(progress)).toBe(0);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('canopy opacity should be 1 for progress >= 0.85', () => {
      fc.assert(
        fc.property(
          fc.double({ min: 0.85, max: 2, noNaN: true }),
          (progress) => {
            expect(calculateCanopyOpacity(progress)).toBe(1);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('canopy blur should be maxBlur for progress <= 0.65', () => {
      fc.assert(
        fc.property(
          fc.double({ min: -1, max: 0.65, noNaN: true }),
          fc.double({ min: 10, max: 50, noNaN: true }),
          (progress, maxBlur) => {
            expect(calculateCanopyBlur(progress, maxBlur)).toBe(maxBlur);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('canopy blur should be 0 for progress >= 0.85', () => {
      fc.assert(
        fc.property(
          fc.double({ min: 0.85, max: 2, noNaN: true }),
          fc.double({ min: 10, max: 50, noNaN: true }),
          (progress, maxBlur) => {
            expect(calculateCanopyBlur(progress, maxBlur)).toBe(0);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('opacity and blur should be inversely related during canopy phase', () => {
      fc.assert(
        fc.property(
          fc.double({ min: 0.66, max: 0.84, noNaN: true }),
          (progress) => {
            const opacity = calculateCanopyOpacity(progress);
            const blur = calculateCanopyBlur(progress, 20);
            // As opacity increases, blur should decrease
            // opacity + (blur/maxBlur) should approximately equal 1
            expect(opacity + blur / 20).toBeCloseTo(1, 5);
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  /**
   * **Feature: tree-of-life-recreation, Property 5: Fruit scale and interactivity calculation**
   * 
   * For any scroll progress value in [0.85, 1.0], fruit scale should increase
   * from 0 to 1, and fruits should become interactive (return true) only when
   * progress >= 0.85.
   * 
   * **Validates: Requirements 1.6**
   */
  describe('Property 5: Fruit scale and interactivity calculation', () => {
    it('fruit scale should be 0 for progress <= 0.85', () => {
      fc.assert(
        fc.property(
          fc.double({ min: -1, max: 0.85, noNaN: true }),
          (progress) => {
            expect(calculateFruitScale(progress)).toBe(0);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('fruit scale should be 1 for progress >= 1.0', () => {
      fc.assert(
        fc.property(
          fc.double({ min: 1.0, max: 2, noNaN: true }),
          (progress) => {
            expect(calculateFruitScale(progress)).toBe(1);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('fruits should NOT be interactive for progress < 0.85', () => {
      fc.assert(
        fc.property(
          fc.double({ min: -1, max: 0.849, noNaN: true }),
          (progress) => {
            expect(calculateFruitInteractive(progress)).toBe(false);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('fruits should be interactive for progress >= 0.85', () => {
      fc.assert(
        fc.property(
          fc.double({ min: 0.85, max: 2, noNaN: true }),
          (progress) => {
            expect(calculateFruitInteractive(progress)).toBe(true);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('fruit scale should interpolate correctly within fruits phase', () => {
      fc.assert(
        fc.property(
          fc.double({ min: 0.851, max: 0.999, noNaN: true }),
          (progress) => {
            const scale = calculateFruitScale(progress);
            expect(scale).toBeGreaterThan(0);
            expect(scale).toBeLessThan(1);
            // Verify interpolation
            const { start, end } = ANIMATION_PHASES.fruits;
            const expected = (progress - start) / (end - start);
            expect(scale).toBeCloseTo(expected, 5);
          }
        ),
        { numRuns: 100 }
      );
    });
  });
});


describe('Tree of Life Life Effects - Property Tests', () => {
  /**
   * **Feature: tree-of-life-recreation, Property 6: Hover state calculation**
   * 
   * For any fruit in hover state, the hover scale should be greater than 1.0
   * (specifically 1.15), and hover glow should be intensified compared to
   * non-hover state.
   * 
   * **Validates: Requirements 4.1**
   */
  describe('Property 6: Hover state calculation', () => {
    it('hover scale should be 1.0 when not hovered', () => {
      expect(calculateHoverScale(false)).toBe(1.0);
    });

    it('hover scale should be 1.15 when hovered', () => {
      expect(calculateHoverScale(true)).toBe(1.15);
    });

    it('hover glow should be 1.0 when not hovered', () => {
      expect(calculateHoverGlow(false)).toBe(1.0);
    });

    it('hover glow should be greater than 1.0 when hovered', () => {
      expect(calculateHoverGlow(true)).toBeGreaterThan(1.0);
    });

    it('hover scale when hovered should always be greater than when not hovered', () => {
      fc.assert(
        fc.property(
          fc.boolean(),
          () => {
            const hoveredScale = calculateHoverScale(true);
            const notHoveredScale = calculateHoverScale(false);
            expect(hoveredScale).toBeGreaterThan(notHoveredScale);
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  /**
   * **Feature: tree-of-life-recreation, Property 7: Breathing effect bounds**
   * 
   * For any time value, the breathing scale should always be within
   * [0.99, 1.01] (±1% variation).
   * 
   * **Validates: Requirements 7.1**
   */
  describe('Property 7: Breathing effect bounds', () => {
    it('breathing scale should always be within [0.99, 1.01]', () => {
      fc.assert(
        fc.property(
          fc.double({ min: 0, max: 1000, noNaN: true }),
          (time) => {
            const scale = calculateBreathingScale(time);
            expect(scale).toBeGreaterThanOrEqual(0.99);
            expect(scale).toBeLessThanOrEqual(1.01);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('breathing scale should oscillate around 1.0', () => {
      // Sample multiple time points and verify average is close to 1.0
      const samples = Array.from({ length: 100 }, (_, i) => 
        calculateBreathingScale(i * 0.1)
      );
      const average = samples.reduce((a, b) => a + b, 0) / samples.length;
      expect(average).toBeCloseTo(1.0, 1);
    });
  });

  /**
   * **Feature: tree-of-life-recreation, Property 8: Pulse effect bounds**
   * 
   * For any time value, the pulse opacity should always be within valid
   * bounds [0, 1] and vary smoothly.
   * 
   * **Validates: Requirements 7.2**
   */
  describe('Property 8: Pulse effect bounds', () => {
    it('pulse opacity should always be within [0, 1]', () => {
      fc.assert(
        fc.property(
          fc.double({ min: 0, max: 1000, noNaN: true }),
          (time) => {
            const opacity = calculatePulseOpacity(time);
            expect(opacity).toBeGreaterThanOrEqual(0);
            expect(opacity).toBeLessThanOrEqual(1);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('pulse opacity should be within [0.7, 1.0] range', () => {
      fc.assert(
        fc.property(
          fc.double({ min: 0, max: 1000, noNaN: true }),
          (time) => {
            const opacity = calculatePulseOpacity(time);
            expect(opacity).toBeGreaterThanOrEqual(0.7);
            expect(opacity).toBeLessThanOrEqual(1.0);
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  /**
   * **Feature: tree-of-life-recreation, Property 9: Cursor proximity branch offset**
   * 
   * For any cursor position and branch index, the calculated branch offset
   * should be subtle (within ±5 pixels) and proportional to cursor distance.
   * 
   * **Validates: Requirements 7.3**
   */
  describe('Property 9: Cursor proximity branch offset', () => {
    it('branch offset should always be within ±5 pixels', () => {
      fc.assert(
        fc.property(
          fc.double({ min: 0, max: 1000, noNaN: true }), // cursorX
          fc.double({ min: 0, max: 1200, noNaN: true }), // cursorY
          fc.double({ min: 0, max: 1000, noNaN: true }), // branchCenterX
          fc.double({ min: 0, max: 1200, noNaN: true }), // branchCenterY
          (cursorX, cursorY, branchCenterX, branchCenterY) => {
            const offset = calculateBranchOffset(
              cursorX, cursorY, branchCenterX, branchCenterY, 1000, 1200
            );
            expect(offset.x).toBeGreaterThanOrEqual(-5);
            expect(offset.x).toBeLessThanOrEqual(5);
            expect(offset.y).toBeGreaterThanOrEqual(-5);
            expect(offset.y).toBeLessThanOrEqual(5);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('branch offset should be zero when cursor is at center', () => {
      const offset = calculateBranchOffset(500, 600, 500, 600, 1000, 1200);
      expect(offset.x).toBeCloseTo(0, 5);
      expect(offset.y).toBeCloseTo(0, 5);
    });
  });
});


describe('Tree of Life Reduced Motion - Property Tests', () => {
  /**
   * **Feature: tree-of-life-recreation, Property 10: Reduced motion static states**
   * 
   * For any progress value when reduced motion is enabled, all animation
   * calculations should return their final/static values without intermediate states.
   * 
   * **Validates: Requirements 8.1, 8.2**
   */
  describe('Property 10: Reduced motion static states', () => {
    it('should return static final values based on progress thresholds', () => {
      fc.assert(
        fc.property(
          fc.double({ min: 0, max: 1, noNaN: true }),
          (progress) => {
            const values = getReducedMotionValues(progress);
            
            // All values should be either 0 or 1 (no intermediate states)
            expect([0, 1]).toContain(values.seedScale);
            expect([0, 1]).toContain(values.trunkScaleY);
            expect([0, 1]).toContain(values.branchDrawProgress);
            expect([0, 1]).toContain(values.canopyOpacity);
            expect([0, 20]).toContain(values.canopyBlur);
            expect([0, 1]).toContain(values.fruitScale);
            expect(typeof values.fruitInteractive).toBe('boolean');
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should show seed after seed phase completes (progress >= 0.15)', () => {
      fc.assert(
        fc.property(
          fc.double({ min: 0.15, max: 1, noNaN: true }),
          (progress) => {
            const values = getReducedMotionValues(progress);
            expect(values.seedScale).toBe(1);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should hide seed before seed phase completes (progress < 0.15)', () => {
      fc.assert(
        fc.property(
          fc.double({ min: 0, max: 0.149, noNaN: true }),
          (progress) => {
            const values = getReducedMotionValues(progress);
            expect(values.seedScale).toBe(0);
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should make fruits interactive only when progress >= 0.85', () => {
      // Before fruits phase
      fc.assert(
        fc.property(
          fc.double({ min: 0, max: 0.849, noNaN: true }),
          (progress) => {
            const values = getReducedMotionValues(progress);
            expect(values.fruitInteractive).toBe(false);
          }
        ),
        { numRuns: 100 }
      );
      
      // During/after fruits phase
      fc.assert(
        fc.property(
          fc.double({ min: 0.85, max: 1, noNaN: true }),
          (progress) => {
            const values = getReducedMotionValues(progress);
            expect(values.fruitInteractive).toBe(true);
          }
        ),
        { numRuns: 100 }
      );
    });
  });
});


import { fruits } from '@/lib/data/treePaths';

describe('Tree of Life Data Structure - Property Tests', () => {
  /**
   * **Feature: tree-of-life-recreation, Property 11: Fruit data-type uniqueness**
   * 
   * For any collection of fruits, all data-type attributes should be unique
   * (no duplicates).
   * 
   * **Validates: Requirements 9.2**
   */
  describe('Property 11: Fruit data-type uniqueness', () => {
    it('all fruit data-types should be unique', () => {
      const dataTypes = fruits.map(f => f.dataType);
      const uniqueDataTypes = new Set(dataTypes);
      
      expect(uniqueDataTypes.size).toBe(dataTypes.length);
    });

    it('all fruit ids should be unique', () => {
      const ids = fruits.map(f => f.id);
      const uniqueIds = new Set(ids);
      
      expect(uniqueIds.size).toBe(ids.length);
    });

    it('each fruit should have required properties', () => {
      fruits.forEach(fruit => {
        expect(fruit).toHaveProperty('id');
        expect(fruit).toHaveProperty('dataType');
        expect(fruit).toHaveProperty('cx');
        expect(fruit).toHaveProperty('cy');
        expect(fruit).toHaveProperty('label');
        
        expect(typeof fruit.id).toBe('string');
        expect(typeof fruit.dataType).toBe('string');
        expect(typeof fruit.cx).toBe('number');
        expect(typeof fruit.cy).toBe('number');
        expect(typeof fruit.label).toBe('string');
      });
    });

    it('fruit positions should be within valid SVG bounds', () => {
      fruits.forEach(fruit => {
        // SVG viewBox is approximately 0-1000 for x and 0-1200 for y
        expect(fruit.cx).toBeGreaterThanOrEqual(0);
        expect(fruit.cx).toBeLessThanOrEqual(1000);
        expect(fruit.cy).toBeGreaterThanOrEqual(0);
        expect(fruit.cy).toBeLessThanOrEqual(1200);
      });
    });
  });
});
