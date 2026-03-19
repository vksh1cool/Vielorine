'use client';

import { forwardRef } from 'react';
import { colors } from '@/lib/constants';
import {
  seedData,
  rootPaths,
  trunkPath,
  primaryBranchPaths,
  secondaryBranchPaths,
  canopyLayers,
  fruits,
} from '@/lib/data/treePaths';

interface TreeSVGProps {
  onFruitClick?: (fruitId: string) => void;
  onFruitHover?: (fruitId: string | null) => void;
}

/**
 * TreeSVG Component
 * 
 * Semantic SVG structure for GSAP scroll-bound animation.
 * Groups are organized by animation phase:
 * - #seed: Phase 1 (0-15%)
 * - #roots: Phase 2 (15-35%)
 * - #trunk: Phase 2 (15-35%)
 * - #primaryBranches: Phase 3 (35-65%)
 * - #secondaryBranches: Phase 3 (35-65%)
 * - #canopy: Phase 4 (65-85%)
 * - .fruit[data-type]: Phase 5 (85-100%)
 */
const TreeSVG = forwardRef<SVGSVGElement, TreeSVGProps>(
  ({ onFruitClick, onFruitHover }, ref) => {
    return (
      <svg
        ref={ref}
        viewBox="-150 -100 1300 1400"
        className="w-full h-auto tree-svg"
        style={{ maxHeight: 'calc(100vh - 80px)' }}
        aria-label="Tree of Life visualization"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Gradients */}
          <radialGradient id="seedGlow" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor={colors.gold} stopOpacity="0.8" />
            <stop offset="50%" stopColor={colors.gold} stopOpacity="0.4" />
            <stop offset="100%" stopColor={colors.gold} stopOpacity="0" />
          </radialGradient>
          
          <linearGradient id="trunkGradient" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#1A1F18" />
            <stop offset="20%" stopColor="#252D22" />
            <stop offset="50%" stopColor="#2D3A28" />
            <stop offset="80%" stopColor={colors.forest} />
            <stop offset="100%" stopColor="#4A6A44" />
          </linearGradient>
          
          <linearGradient id="trunkFillGradient" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#1A1F18" />
            <stop offset="30%" stopColor="#252D22" />
            <stop offset="60%" stopColor="#2D3A28" />
            <stop offset="100%" stopColor={colors.forest} />
          </linearGradient>
          
          <linearGradient id="branchGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={colors.forest} />
            <stop offset="50%" stopColor={colors.sage} />
            <stop offset="100%" stopColor={colors.gold} stopOpacity="0.5" />
          </linearGradient>
          
          <linearGradient id="rootGradient" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor={colors.wood} />
            <stop offset="60%" stopColor="#8B6914" />
            <stop offset="100%" stopColor="#5A4510" stopOpacity="0.3" />
          </linearGradient>

          {/* Canopy gradients - LUSH, FULL foliage */}
          <radialGradient id="canopyDeepShadow" cx="50%" cy="60%" r="70%">
            <stop offset="0%" stopColor="#1A3318" stopOpacity="0.7" />
            <stop offset="70%" stopColor="#1A3318" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#1A3318" stopOpacity="0.1" />
          </radialGradient>
          
          <radialGradient id="canopyDark" cx="45%" cy="45%" r="65%">
            <stop offset="0%" stopColor="#2D4A28" stopOpacity="0.75" />
            <stop offset="60%" stopColor="#2D4A28" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#2D4A28" stopOpacity="0.15" />
          </radialGradient>
          
          <radialGradient id="canopyMid" cx="45%" cy="45%" r="60%">
            <stop offset="0%" stopColor={colors.sage} stopOpacity="0.8" />
            <stop offset="50%" stopColor={colors.sage} stopOpacity="0.5" />
            <stop offset="100%" stopColor={colors.sage} stopOpacity="0.2" />
          </radialGradient>
          
          <radialGradient id="canopyLight" cx="40%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#B8CFA0" stopOpacity="0.7" />
            <stop offset="50%" stopColor="#B8CFA0" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#B8CFA0" stopOpacity="0.1" />
          </radialGradient>
          
          <radialGradient id="canopyHighlight" cx="35%" cy="35%" r="50%">
            <stop offset="0%" stopColor="#D4E4C0" stopOpacity="0.6" />
            <stop offset="60%" stopColor="#C8D8B0" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#C8D8B0" stopOpacity="0" />
          </radialGradient>

          {/* Filters */}
          <filter id="seedGlowFilter" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          
          <filter id="fruitGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          
          <filter id="canopyBlurHeavy" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="12" />
          </filter>
          
          <filter id="canopyBlurMid" x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur stdDeviation="8" />
          </filter>
          
          <filter id="canopyBlurLight" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" />
          </filter>
        </defs>

        {/* Phase 1: Seed (0-15%) */}
        <g id="seed">
          {/* Seed glow */}
          <ellipse
            className="seed-glow"
            cx={seedData.cx}
            cy={seedData.cy}
            rx={seedData.glowRx}
            ry={seedData.glowRy}
            fill="url(#seedGlow)"
            filter="url(#seedGlowFilter)"
          />
          {/* Seed body */}
          <ellipse
            className="seed-body"
            cx={seedData.cx}
            cy={seedData.cy}
            rx={seedData.rx}
            ry={seedData.ry}
            fill={colors.wood}
          />
          {/* Seed highlight */}
          <ellipse
            cx={seedData.cx - 8}
            cy={seedData.cy - 10}
            rx={8}
            ry={12}
            fill="white"
            fillOpacity="0.3"
          />
        </g>

        {/* Phase 2: Roots (15-35%) */}
        <g id="roots">
          {rootPaths.map((path, index) => (
            <path
              key={`root-${index}`}
              className="root"
              d={path}
              fill="none"
              stroke="url(#rootGradient)"
              strokeWidth={index === 0 ? 12 : 8 - (index % 4)}
              strokeLinecap="round"
              strokeOpacity={0.8}
            />
          ))}
        </g>

        {/* Phase 2: Trunk (15-35%) - Filled organic shape */}
        <g id="trunk">
          <path
            className="trunk-path"
            d={trunkPath}
            fill="url(#trunkFillGradient)"
            stroke="none"
          />
        </g>

        {/* Phase 3: Primary Branches (35-65%) - Thick organic branches */}
        <g id="primaryBranches">
          {primaryBranchPaths.map((path, index) => (
            <path
              key={`primary-branch-${index}`}
              className="branch primary"
              data-index={index}
              d={path}
              fill="none"
              stroke="url(#trunkGradient)"
              strokeWidth={Math.max(6, 20 - index * 1.2)}
              strokeLinecap="round"
              style={{ strokeDasharray: 1200, strokeDashoffset: 1200 }}
            />
          ))}
        </g>

        {/* Phase 3: Secondary Branches (35-65%) - Thinner sub-branches */}
        <g id="secondaryBranches">
          {secondaryBranchPaths.map((path, index) => (
            <path
              key={`secondary-branch-${index}`}
              className="branch secondary"
              data-index={index}
              d={path}
              fill="none"
              stroke={colors.forest}
              strokeWidth={Math.max(3, 8 - index * 0.4)}
              strokeLinecap="round"
              strokeOpacity={0.8}
              style={{ strokeDasharray: 600, strokeDashoffset: 600 }}
            />
          ))}
        </g>

        {/* Phase 4: Canopy (65-85%) */}
        <g id="canopy">
          {/* Deep shadow layer */}
          {canopyLayers.deepShadow.map((layer, i) => (
            <ellipse
              key={`canopy-deep-${i}`}
              className="canopy-layer deep-shadow"
              cx={layer.cx}
              cy={layer.cy}
              rx={layer.rx}
              ry={layer.ry}
              fill="url(#canopyDeepShadow)"
              filter="url(#canopyBlurHeavy)"
            />
          ))}
          {/* Dark layer */}
          {canopyLayers.dark.map((layer, i) => (
            <ellipse
              key={`canopy-dark-${i}`}
              className="canopy-layer dark"
              cx={layer.cx}
              cy={layer.cy}
              rx={layer.rx}
              ry={layer.ry}
              fill="url(#canopyDark)"
              filter="url(#canopyBlurHeavy)"
            />
          ))}
          {/* Mid layer */}
          {canopyLayers.mid.map((layer, i) => (
            <ellipse
              key={`canopy-mid-${i}`}
              className="canopy-layer mid"
              cx={layer.cx}
              cy={layer.cy}
              rx={layer.rx}
              ry={layer.ry}
              fill="url(#canopyMid)"
              filter="url(#canopyBlurMid)"
            />
          ))}
          {/* Light layer */}
          {canopyLayers.light.map((layer, i) => (
            <ellipse
              key={`canopy-light-${i}`}
              className="canopy-layer light"
              cx={layer.cx}
              cy={layer.cy}
              rx={layer.rx}
              ry={layer.ry}
              fill="url(#canopyLight)"
              filter="url(#canopyBlurLight)"
            />
          ))}
          {/* Highlights */}
          {canopyLayers.highlights.map((layer, i) => (
            <ellipse
              key={`canopy-highlight-${i}`}
              className="canopy-layer highlight"
              cx={layer.cx}
              cy={layer.cy}
              rx={layer.rx}
              ry={layer.ry}
              fill="url(#canopyHighlight)"
              filter="url(#canopyBlurLight)"
            />
          ))}
        </g>

        {/* Phase 5: Fruits (85-100%) */}
        {fruits.map((fruit) => (
          <g
            key={fruit.id}
            className="fruit"
            data-type={fruit.dataType}
            onClick={() => onFruitClick?.(fruit.id)}
            onMouseEnter={() => onFruitHover?.(fruit.id)}
            onMouseLeave={() => onFruitHover?.(null)}
            role="button"
            tabIndex={0}
            aria-label={`Learn about ${fruit.label}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onFruitClick?.(fruit.id);
              }
            }}
          >
            {/* Fruit glow */}
            <ellipse
              className="fruit-glow"
              cx={fruit.cx}
              cy={fruit.cy}
              rx={fruit.id === 'cosmos' ? 60 : 40}
              ry={fruit.id === 'cosmos' ? 55 : 38}
              fill={colors.gold}
              fillOpacity={0.3}
              filter="url(#fruitGlow)"
            />
            {/* Fruit body */}
            <ellipse
              className="fruit-body"
              cx={fruit.cx}
              cy={fruit.cy}
              rx={fruit.id === 'cosmos' ? 35 : 24}
              ry={fruit.id === 'cosmos' ? 32 : 22}
              fill={fruit.id === 'cosmos' ? colors.gold : '#E8C87A'}
            />
            {/* Fruit highlight */}
            <ellipse
              cx={fruit.cx - 8}
              cy={fruit.cy - 6}
              rx={fruit.id === 'cosmos' ? 12 : 8}
              ry={fruit.id === 'cosmos' ? 10 : 7}
              fill="white"
              fillOpacity={0.6}
            />
            {/* Fruit label */}
            <text
              x={fruit.cx}
              y={fruit.cy + (fruit.id === 'cosmos' ? 55 : 42)}
              textAnchor="middle"
              fill={colors.forest}
              style={{
                fontSize: fruit.id === 'cosmos' ? '24px' : '18px',
                fontWeight: 600,
                fontFamily: 'serif',
              }}
            >
              {fruit.label}
            </text>
          </g>
        ))}
      </svg>
    );
  }
);

TreeSVG.displayName = 'TreeSVG';

export default TreeSVG;
