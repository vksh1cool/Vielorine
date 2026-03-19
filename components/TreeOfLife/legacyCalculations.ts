/**
 * Legacy calculation functions for backward compatibility
 * These are used by existing tests and will be deprecated
 */

import { treeThresholds } from '@/lib/constants';

export function calculateRootsOpacity(progress: number): number {
  if (progress <= treeThresholds.rootsFadeIn) return 0;
  return Math.min(1, (progress - treeThresholds.rootsFadeIn) / 0.05);
}

export function calculateRootsScale(progress: number): number {
  return 1 + progress * 0.05;
}

export function calculatePathDrawProgress(progress: number): number {
  if (progress <= treeThresholds.pathDrawStart) return 0;
  if (progress >= treeThresholds.pathDrawEnd) return 1;
  return (progress - treeThresholds.pathDrawStart) / (treeThresholds.pathDrawEnd - treeThresholds.pathDrawStart);
}

export function calculateStrokeDashoffset(pathLength: number, drawProgress: number): number {
  return pathLength - pathLength * drawProgress;
}

export function calculateNodesOpacity(progress: number): number {
  if (progress <= treeThresholds.nodesFadeIn) return 0;
  return Math.min(1, (progress - treeThresholds.nodesFadeIn) / 0.1);
}

export function calculateBranchSway(
  cursorX: number,
  cursorY: number,
  svgWidth: number,
  svgHeight: number,
  branchIndex: number,
  force: number = 3
): { x: number; y: number } {
  const relativeX = cursorX / svgWidth - 0.5;
  const relativeY = cursorY / svgHeight - 0.5;
  const direction = branchIndex % 2 === 0 ? 1 : -1;
  return {
    x: relativeX * force * direction,
    y: relativeY * force * direction * 0.3,
  };
}
