'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

// Simple tarot card SVG designs
const tarotCards = [
  { name: 'The Star', symbol: '★', color: '#D4AF37' },
  { name: 'The Moon', symbol: '☽', color: '#C0C0C0' },
  { name: 'The Sun', symbol: '☀', color: '#FFD700' },
  { name: 'The Lovers', symbol: '♥', color: '#C41E3A' },
  { name: 'The Magician', symbol: '✧', color: '#8B4513' },
  { name: 'The High Priestess', symbol: '☾', color: '#4B0082' },
  { name: 'The Empress', symbol: '♛', color: '#228B22' },
  { name: 'The Wheel', symbol: '☸', color: '#B8860B' },
];

interface TarotCardTrailProps {
  className?: string;
}

export default function TarotCardTrail({ className = '' }: TarotCardTrailProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const [isClient, setIsClient] = useState(false);
  
  const mousePos = useRef({ x: 0, y: 0 });
  const lastMousePos = useRef({ x: 0, y: 0 });
  const cacheMousePos = useRef({ x: 0, y: 0 });
  const cardPosition = useRef(0);
  const zIndexVal = useRef(1);
  const threshold = 60;

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !containerRef.current) return;

    const container = containerRef.current;
    
    const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b;
    
    const getDistance = (p1: { x: number; y: number }, p2: { x: number; y: number }) => {
      return Math.hypot(p1.x - p2.x, p1.y - p2.y);
    };

    const showNextCard = () => {
      zIndexVal.current++;
      cardPosition.current = (cardPosition.current + 1) % tarotCards.length;
      
      const card = cardsRef.current[cardPosition.current];
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const cardWidth = rect.width || 50;
      const cardHeight = rect.height || 70;

      gsap.killTweensOf(card);
      gsap.timeline()
        .fromTo(card,
          {
            opacity: 1,
            scale: 0,
            zIndex: zIndexVal.current,
            x: cacheMousePos.current.x - cardWidth / 2,
            y: cacheMousePos.current.y - cardHeight / 2,
            rotation: gsap.utils.random(-15, 15),
          },
          {
            duration: 0.4,
            ease: 'power2.out',
            scale: 1,
            x: mousePos.current.x - cardWidth / 2,
            y: mousePos.current.y - cardHeight / 2,
          }
        )
        .to(card, {
          duration: 0.5,
          ease: 'power2.in',
          opacity: 0,
          scale: 0.3,
          y: `+=${gsap.utils.random(-50, -100)}`,
          rotation: gsap.utils.random(-30, 30),
        }, 0.3);
    };

    const render = () => {
      const distance = getDistance(mousePos.current, lastMousePos.current);
      
      cacheMousePos.current.x = lerp(cacheMousePos.current.x, mousePos.current.x, 0.15);
      cacheMousePos.current.y = lerp(cacheMousePos.current.y, mousePos.current.y, 0.15);

      if (distance > threshold) {
        showNextCard();
        lastMousePos.current = { ...mousePos.current };
      }

      requestAnimationFrame(render);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mousePos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = container.getBoundingClientRect();
        mousePos.current = {
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top,
        };
      }
    };

    const initRender = (e: MouseEvent | TouchEvent) => {
      const rect = container.getBoundingClientRect();
      let clientX = 0, clientY = 0;
      
      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = e.clientX;
        clientY = e.clientY;
      }
      
      mousePos.current = { x: clientX - rect.left, y: clientY - rect.top };
      cacheMousePos.current = { ...mousePos.current };
      lastMousePos.current = { ...mousePos.current };
      
      requestAnimationFrame(render);
      
      container.removeEventListener('mousemove', initRender as EventListener);
      container.removeEventListener('touchmove', initRender as EventListener);
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('touchmove', handleTouchMove);
    container.addEventListener('mousemove', initRender as EventListener, { once: true });
    container.addEventListener('touchmove', initRender as EventListener, { once: true });

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isClient]);

  if (!isClient) return null;

  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-auto ${className}`}
      style={{ cursor: 'none' }}
    >
      {/* Tarot cards that will trail the cursor */}
      {tarotCards.map((card, index) => (
        <div
          key={card.name}
          ref={(el) => { if (el) cardsRef.current[index] = el; }}
          className="absolute opacity-0 pointer-events-none"
          style={{
            width: '50px',
            height: '70px',
          }}
        >
          {/* Mini tarot card design */}
          <div 
            className="w-full h-full rounded-lg border-2 flex flex-col items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #FAF6F1 0%, #E8E0D5 100%)',
              borderColor: card.color,
              boxShadow: `0 4px 12px rgba(0,0,0,0.2), 0 0 8px ${card.color}40`,
            }}
          >
            <span 
              className="text-2xl"
              style={{ color: card.color }}
            >
              {card.symbol}
            </span>
            <span 
              className="text-[6px] font-serif mt-1 text-center px-1 leading-tight"
              style={{ color: '#3A5A36' }}
            >
              {card.name}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
