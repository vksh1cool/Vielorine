'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { colors } from '@/lib/constants';

interface NodePopupProps {
  isOpen: boolean;
  onClose: () => void;
  content: {
    title: string;
    subtitle: string;
    description: string;
    tarotCards: string[];
    keywords: string[];
  } | null;
}

const mysticalMessages = [
  "The veil closes...",
  "Return to the mortal realm",
  "The cards have spoken",
  "Until we meet again...",
];

export default function NodePopup({ isOpen, onClose, content }: NodePopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [animationPhase, setAnimationPhase] = useState(0);
  const [isHoveringClose, setIsHoveringClose] = useState(false);
  const [closeMessage, setCloseMessage] = useState('');
  const [isClosing, setIsClosing] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setIsClosing(false);
      setCloseMessage(mysticalMessages[Math.floor(Math.random() * mysticalMessages.length)]);
      const interval = setInterval(() => {
        setAnimationPhase((p) => (p + 0.03) % (Math.PI * 2));
      }, 30);
      return () => clearInterval(interval);
    } else {
      const timeout = setTimeout(() => setIsVisible(false), 400);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => onClose(), 300);
  }, [onClose]);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        handleClose();
      }
    },
    [handleClose]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    },
    [handleClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
      };
    }
  }, [isOpen, handleKeyDown]);

  if (!isVisible || !content) return null;

  const showPopup = isOpen && !isClosing;

  // Fewer, subtler particles
  const particles = Array.from({ length: 12 }, (_, i) => {
    const baseX = 8 + (i % 4) * 28;
    const baseY = 10 + Math.floor(i / 4) * 35;
    const offsetX = Math.sin(animationPhase + i * 0.6) * 6;
    const offsetY = Math.cos(animationPhase * 0.8 + i * 0.4) * 5;
    const opacity = 0.08 + Math.sin(animationPhase + i * 0.8) * 0.05;
    return { x: baseX + offsetX, y: baseY + offsetY, opacity, id: i };
  });

  // Orbiting particles for close button
  const orbitParticles = Array.from({ length: 4 }, (_, i) => {
    const angle = (i / 4) * Math.PI * 2 + animationPhase * 2;
    const radius = isHoveringClose ? 24 : 18;
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
      opacity: 0.5 + Math.sin(animationPhase * 3 + i) * 0.3,
    };
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        backgroundColor: showPopup ? 'rgba(58, 90, 54, 0.5)' : 'transparent',
        backdropFilter: showPopup ? 'blur(10px)' : 'none',
        transition: 'background-color 0.4s ease-out, backdrop-filter 0.4s ease-out',
      }}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="popup-title"
    >
      {/* Mystical close button - top right of viewport */}
      <div
        className="fixed z-[60]"
        style={{
          top: '24px',
          right: '24px',
          transform: showPopup
            ? `scale(1) rotate(${Math.sin(animationPhase) * 3}deg)`
            : 'scale(0) rotate(-180deg)',
          opacity: showPopup ? 1 : 0,
          transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease-out',
        }}
      >
        {/* Tooltip */}
        <div
          className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 rounded-lg font-serif text-xs italic pointer-events-none"
          style={{
            backgroundColor: colors.shadow,
            color: colors.linen,
            opacity: isHoveringClose ? 0.95 : 0,
            transform: `translateY(${isHoveringClose ? 0 : 8}px)`,
            transition: 'opacity 0.3s ease-out, transform 0.3s ease-out',
          }}
        >
          {closeMessage}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleClose();
          }}
          onMouseEnter={() => setIsHoveringClose(true)}
          onMouseLeave={() => setIsHoveringClose(false)}
          className="relative w-12 h-12 rounded-full flex items-center justify-center"
          style={{
            background: `radial-gradient(circle at 30% 30%, ${colors.gold}, ${colors.wood})`,
            boxShadow: isHoveringClose
              ? `0 0 30px ${colors.gold}, 0 0 50px ${colors.gold}80`
              : `0 0 15px ${colors.gold}60`,
            transition: 'box-shadow 0.3s ease-out',
          }}
          aria-label="Close"
        >
          {/* Orbiting particles */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: 'visible' }}>
            {orbitParticles.map((p, i) => (
              <circle key={i} cx={24 + p.x} cy={24 + p.y} r={2} fill={colors.linen} opacity={p.opacity} />
            ))}
          </svg>

          {/* X symbol */}
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            style={{
              transform: isHoveringClose ? 'rotate(90deg) scale(1.1)' : 'rotate(0deg)',
              transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            <path
              d="M7 7 L17 17 M17 7 L7 17"
              stroke={colors.linen}
              strokeWidth="2.5"
              strokeLinecap="round"
              style={{ filter: `drop-shadow(0 0 ${isHoveringClose ? 6 : 3}px ${colors.linen})` }}
            />
          </svg>
        </button>
      </div>

      {/* Main popup - BIGGER and NO SCROLL */}
      <div
        ref={popupRef}
        className="relative w-full max-w-2xl rounded-2xl"
        style={{
          backgroundColor: colors.linen,
          boxShadow: `0 25px 60px -12px rgba(0, 0, 0, 0.5), 0 0 60px ${colors.gold}25`,
          transform: showPopup ? 'scale(1) translateY(0)' : 'scale(0.9) translateY(20px)',
          opacity: showPopup ? 1 : 0,
          transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease-out',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle background particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-2xl">
          <svg className="w-full h-full" preserveAspectRatio="none">
            <defs>
              <radialGradient id="popupGlow" cx="50%" cy="20%" r="70%">
                <stop offset="0%" stopColor={colors.gold} stopOpacity="0.15" />
                <stop offset="60%" stopColor={colors.sage} stopOpacity="0.05" />
                <stop offset="100%" stopColor="transparent" stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#popupGlow)" />
            {particles.map((p) => (
              <circle
                key={p.id}
                cx={`${p.x}%`}
                cy={`${p.y}%`}
                r={3}
                fill={p.id % 2 === 0 ? colors.gold : colors.sage}
                opacity={p.opacity}
              />
            ))}
          </svg>
        </div>

        {/* Subtle border */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            border: `1px solid ${colors.gold}30`,
          }}
        />

        {/* Content - compact layout */}
        <div className="relative z-10 p-6 md:p-8">
          {/* Header */}
          <div className="text-center mb-4">
            <h2
              id="popup-title"
              className="font-serif text-3xl md:text-4xl mb-1"
              style={{ 
                color: colors.forest,
                filter: `drop-shadow(0 0 ${6 + Math.sin(animationPhase) * 3}px ${colors.gold}40)`,
              }}
            >
              {content.title}
            </h2>
            <p className="font-serif text-base italic" style={{ color: colors.wood }}>
              {content.subtitle}
            </p>
          </div>

          {/* Simple divider */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12" style={{ background: `linear-gradient(to right, transparent, ${colors.gold}50)` }} />
            <div 
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: colors.gold, opacity: 0.6 + Math.sin(animationPhase * 2) * 0.2 }} 
            />
            <div className="h-px w-12" style={{ background: `linear-gradient(to left, transparent, ${colors.gold}50)` }} />
          </div>

          {/* Description - shorter */}
          <p
            className="text-sm md:text-base leading-relaxed mb-5 text-center max-w-xl mx-auto"
            style={{ color: colors.shadow }}
          >
            {content.description}
          </p>

          {/* Two columns for cards and keywords on larger screens */}
          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            {/* Tarot Cards */}
            <div>
              <h3 className="font-serif text-sm mb-2 text-center" style={{ color: colors.forest }}>
                Associated Cards
              </h3>
              <div className="flex flex-wrap justify-center gap-1.5">
                {content.tarotCards.map((card, i) => (
                  <span
                    key={card}
                    className="px-2.5 py-1 rounded-full text-xs font-medium"
                    style={{
                      backgroundColor: `${colors.gold}20`,
                      color: colors.forest,
                      border: `1px solid ${colors.gold}35`,
                      transform: `translateY(${Math.sin(animationPhase + i * 0.5) * 2}px)`,
                    }}
                  >
                    {card}
                  </span>
                ))}
              </div>
            </div>

            {/* Keywords */}
            <div>
              <h3 className="font-serif text-sm mb-2 text-center" style={{ color: colors.forest }}>
                Keywords
              </h3>
              <div className="flex flex-wrap justify-center gap-1.5">
                {content.keywords.map((keyword, i) => (
                  <span
                    key={keyword}
                    className="px-2.5 py-1 rounded-md text-xs"
                    style={{
                      backgroundColor: `${colors.sage}20`,
                      color: colors.shadow,
                      opacity: 0.9 + Math.sin(animationPhase * 1.5 + i * 0.7) * 0.1,
                    }}
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
