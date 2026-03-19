'use client';

// Helper to round numbers to avoid SSR/client hydration mismatches
const round = (n: number, decimals: number = 2): number => {
  const factor = Math.pow(10, decimals);
  return Math.round(n * factor) / factor;
};

// SVG Zodiac Wheel Component - renders the zodiac wheel with dark lines on transparent background
export default function ZodiacWheelSVG() {
  const zodiacSigns = [
    { name: 'ARIES', symbol: '♈' },
    { name: 'TAURUS', symbol: '♉' },
    { name: 'GEMINI', symbol: '♊' },
    { name: 'CANCER', symbol: '♋' },
    { name: 'LEO', symbol: '♌' },
    { name: 'VIRGO', symbol: '♍' },
    { name: 'LIBRA', symbol: '♎' },
    { name: 'SCORPIO', symbol: '♏' },
    { name: 'SAGITTARIUS', symbol: '♐' },
    { name: 'CAPRICORN', symbol: '♑' },
    { name: 'AQUARIUS', symbol: '♒' },
    { name: 'PISCES', symbol: '♓' },
  ];

  const strokeColor = '#3A5A36';
  const strokeOpacity = 0.5;

  return (
    <svg viewBox="0 0 500 500" className="w-full h-full">
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="1" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Outer ring with tick marks */}
      <circle
        cx="250"
        cy="250"
        r="240"
        fill="none"
        stroke={strokeColor}
        strokeWidth="1"
        strokeOpacity={strokeOpacity}
      />
      <circle
        cx="250"
        cy="250"
        r="230"
        fill="none"
        stroke={strokeColor}
        strokeWidth="0.5"
        strokeOpacity={strokeOpacity * 0.7}
      />

      {/* Tick marks around outer ring */}
      {Array.from({ length: 72 }, (_, i) => {
        const angle = (i * 5 * Math.PI) / 180;
        const isMajor = i % 6 === 0;
        const innerR = isMajor ? 225 : 228;
        const outerR = 238;
        return (
          <line
            key={`tick-${i}`}
            x1={round(250 + Math.cos(angle) * innerR)}
            y1={round(250 + Math.sin(angle) * innerR)}
            x2={round(250 + Math.cos(angle) * outerR)}
            y2={round(250 + Math.sin(angle) * outerR)}
            stroke={strokeColor}
            strokeWidth={isMajor ? 1 : 0.5}
            strokeOpacity={round(strokeOpacity * (isMajor ? 1 : 0.6))}
          />
        );
      })}

      {/* Zodiac sign sections */}
      {zodiacSigns.map((sign, i) => {
        const startAngle = (i * 30 - 90) * (Math.PI / 180);
        const midAngle = ((i * 30 + 15) - 90) * (Math.PI / 180);

        // Section divider lines
        const innerR = 140;
        const outerR = 220;

        // Text positions
        const nameR = 205;
        const symbolR = 170;

        const nameX = round(250 + Math.cos(midAngle) * nameR);
        const nameY = round(250 + Math.sin(midAngle) * nameR);
        const symbolX = round(250 + Math.cos(midAngle) * symbolR);
        const symbolY = round(250 + Math.sin(midAngle) * symbolR);

        return (
          <g key={sign.name}>
            {/* Divider line */}
            <line
              x1={round(250 + Math.cos(startAngle) * innerR)}
              y1={round(250 + Math.sin(startAngle) * innerR)}
              x2={round(250 + Math.cos(startAngle) * outerR)}
              y2={round(250 + Math.sin(startAngle) * outerR)}
              stroke={strokeColor}
              strokeWidth="0.5"
              strokeOpacity={round(strokeOpacity * 0.8)}
            />

            {/* Sign name */}
            <text
              x={nameX}
              y={nameY}
              fill={strokeColor}
              fillOpacity={round(strokeOpacity * 0.9)}
              fontSize="8"
              fontFamily="serif"
              textAnchor="middle"
              dominantBaseline="middle"
              transform={`rotate(${i * 30 + 15}, ${nameX}, ${nameY})`}
            >
              {sign.name}
            </text>

            {/* Zodiac symbol */}
            <text
              x={symbolX}
              y={symbolY}
              fill={strokeColor}
              fillOpacity={strokeOpacity}
              fontSize="24"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {sign.symbol}
            </text>
          </g>
        );
      })}

      {/* Inner circles */}
      <circle
        cx="250"
        cy="250"
        r="140"
        fill="none"
        stroke={strokeColor}
        strokeWidth="1"
        strokeOpacity={strokeOpacity}
      />
      <circle
        cx="250"
        cy="250"
        r="110"
        fill="none"
        stroke={strokeColor}
        strokeWidth="0.5"
        strokeOpacity={round(strokeOpacity * 0.7)}
      />
      <circle
        cx="250"
        cy="250"
        r="80"
        fill="none"
        stroke={strokeColor}
        strokeWidth="0.5"
        strokeOpacity={round(strokeOpacity * 0.6)}
      />
      <circle
        cx="250"
        cy="250"
        r="50"
        fill="none"
        stroke={strokeColor}
        strokeWidth="0.5"
        strokeOpacity={round(strokeOpacity * 0.5)}
      />

      {/* Inner star pattern */}
      {Array.from({ length: 12 }, (_, i) => {
        const angle = (i * 30 - 90) * (Math.PI / 180);
        const x50 = round(250 + Math.cos(angle) * 50);
        const y50 = round(250 + Math.sin(angle) * 50);
        const x110 = round(250 + Math.cos(angle) * 110);
        const y110 = round(250 + Math.sin(angle) * 110);
        const x80 = round(250 + Math.cos(angle) * 80);
        const y80 = round(250 + Math.sin(angle) * 80);
        
        return (
          <g key={`inner-${i}`}>
            {/* Radial lines to center */}
            <line
              x1={x50}
              y1={y50}
              x2={x110}
              y2={y110}
              stroke={strokeColor}
              strokeWidth="0.5"
              strokeOpacity={round(strokeOpacity * 0.5)}
            />
            {/* Small dots at intersections */}
            <circle
              cx={x110}
              cy={y110}
              r="2"
              fill={strokeColor}
              fillOpacity={round(strokeOpacity * 0.6)}
            />
            <circle
              cx={x80}
              cy={y80}
              r="1.5"
              fill={strokeColor}
              fillOpacity={round(strokeOpacity * 0.5)}
            />
          </g>
        );
      })}

      {/* Center 8-pointed star */}
      <g filter="url(#glow)">
        {Array.from({ length: 8 }, (_, i) => {
          const angle = (i * 45 - 90) * (Math.PI / 180);
          const nextAngle = ((i + 1) * 45 - 90) * (Math.PI / 180);
          const outerR = 45;
          const innerR = 20;
          const midAngle = ((i * 45 + 22.5) - 90) * (Math.PI / 180);

          const outerX = round(250 + Math.cos(angle) * outerR);
          const outerY = round(250 + Math.sin(angle) * outerR);
          const midX = round(250 + Math.cos(midAngle) * innerR);
          const midY = round(250 + Math.sin(midAngle) * innerR);
          const nextX = round(250 + Math.cos(nextAngle) * outerR);
          const nextY = round(250 + Math.sin(nextAngle) * outerR);

          return (
            <path
              key={`star-${i}`}
              d={`M ${outerX} ${outerY} L ${midX} ${midY} L ${nextX} ${nextY}`}
              fill="none"
              stroke={strokeColor}
              strokeWidth="1"
              strokeOpacity={round(strokeOpacity * 0.8)}
            />
          );
        })}
      </g>

      {/* Center dot */}
      <circle
        cx="250"
        cy="250"
        r="3"
        fill={strokeColor}
        fillOpacity={strokeOpacity}
      />

      {/* Decorative small stars scattered */}
      {[
        { x: 220, y: 220 },
        { x: 280, y: 230 },
        { x: 260, y: 270 },
        { x: 230, y: 280 },
        { x: 270, y: 210 },
      ].map((pos, i) => (
        <text
          key={`star-deco-${i}`}
          x={pos.x}
          y={pos.y}
          fill={strokeColor}
          fillOpacity={round(strokeOpacity * 0.4)}
          fontSize="6"
          textAnchor="middle"
        >
          ✦
        </text>
      ))}
    </svg>
  );
}
