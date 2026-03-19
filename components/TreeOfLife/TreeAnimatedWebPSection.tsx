'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import NodePopup from './NodePopup';
import FruitOverlay from './FruitOverlay';
import { fruitContent, wisdomQuotes } from '@/lib/data/treePaths';
import { colors } from '@/lib/constants';

// ─── Sand Particle System ───────────────────────────────────────────────
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  decay: number;
  color: string;
}

function createParticles(canvas: HTMLCanvasElement, count: number): Particle[] {
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  const palette = ['#D9C39A', '#B88A55', '#A7B88A', '#F3EDE2', '#E8D5B5'];
  return Array.from({ length: count }, () => {
    const angle = Math.random() * Math.PI * 2;
    const speed = 1 + Math.random() * 5;
    return {
      x: cx + (Math.random() - 0.5) * canvas.width * 0.6,
      y: cy + (Math.random() - 0.5) * canvas.height * 0.6,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - Math.random() * 2,
      size: 1 + Math.random() * 3,
      alpha: 0.6 + Math.random() * 0.4,
      decay: 0.005 + Math.random() * 0.015,
      color: palette[Math.floor(Math.random() * palette.length)],
    };
  });
}

function animateParticles(
  ctx: CanvasRenderingContext2D,
  particles: Particle[],
  onDone: () => void
) {
  let alive = true;
  const step = () => {
    if (!alive) return;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    let anyVisible = false;
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.03; // gentle gravity
      p.alpha -= p.decay;
      if (p.alpha <= 0) continue;
      anyVisible = true;
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    if (anyVisible) {
      requestAnimationFrame(step);
    } else {
      onDone();
    }
  };
  requestAnimationFrame(step);
  return () => { alive = false; };
}

// ─── Component ──────────────────────────────────────────────────────────
export default function TreeAnimatedWebPSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const quotesLeftRef = useRef<HTMLDivElement>(null);
  const quotesRightRef = useRef<HTMLDivElement>(null);
  const textOverlayRef = useRef<HTMLDivElement>(null);
  const fruitOverlayRef = useRef<HTMLDivElement>(null);
  const contentWrapRef = useRef<HTMLDivElement>(null);

  const [selectedFruit, setSelectedFruit] = useState<string | null>(null);
  const [hoveredFruit, setHoveredFruit] = useState<string | null>(null);

  const handleFruitClick = useCallback((id: string) => setSelectedFruit(id), []);
  const handleFruitHover = useCallback((id: string | null) => setHoveredFruit(id), []);
  const handleClosePopup = useCallback(() => setSelectedFruit(null), []);

  // ── Main GSAP ScrollTrigger ──
  useEffect(() => {
    if (!sectionRef.current) return;

    let tl: gsap.core.Timeline | null = null;
    let stopParticles: (() => void) | null = null;

    const init = () => {
      const video = videoRef.current;
      if (!video || !video.duration) return;

      if (tl) { tl.scrollTrigger?.kill(); tl.kill(); }

      video.pause(); // Stop autoplay, let GSAP control it

      const dur = video.duration;

      tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=2000', // Restored original tighter scrolling duration
          scrub: 1.2,    // Restored tight tracking
          pin: true,
          anticipatePin: 1,
        },
      });

      // ── Initial state ──
      gsap.set(fruitOverlayRef.current, { opacity: 0, scale: 0.9 });
      gsap.set(textOverlayRef.current, { opacity: 0, y: 40 });
      if (quotesLeftRef.current) gsap.set(quotesLeftRef.current.children, { opacity: 0, x: -80 });
      if (quotesRightRef.current) gsap.set(quotesRightRef.current.children, { opacity: 0, x: 80 });

      // ── Phase 0→2: Video scrub (tree grows) ──
      tl.fromTo(video, { currentTime: 0 }, { currentTime: dur, duration: 2, ease: 'none' }, 0);

      // ── Phase 0.3→1.3: Left quotes stagger in ──
      if (quotesLeftRef.current) {
        tl.to(quotesLeftRef.current.children, {
          opacity: 1, x: 0, duration: 0.8, stagger: 0.25, ease: 'power3.out',
        }, 0.3);
      }

      // ── Phase 0.5→1.5: Right quotes stagger in ──
      if (quotesRightRef.current) {
        tl.to(quotesRightRef.current.children, {
          opacity: 1, x: 0, duration: 0.8, stagger: 0.25, ease: 'power3.out',
        }, 0.5);
      }

      // ── Phase 1.0→1.6: Fruits appear with bounce ──
      tl.to(fruitOverlayRef.current, {
        opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.4)',
      }, 1.0);

      // ── Phase 1.5→2.0: Bottom text fades in ──
      tl.to(textOverlayRef.current, {
        opacity: 1, y: 0, duration: 0.5, ease: 'power2.out',
      }, 1.5);

      // ── Phase 2.2→2.8: SAND VAPORIZE EXIT ──

      // Quotes scatter outward and dissolve
      if (quotesLeftRef.current) {
        tl.to(quotesLeftRef.current.children, {
          opacity: 0, x: -120, scale: 0.5, duration: 0.5, stagger: 0.08, ease: 'power2.in',
        }, 2.2);
      }
      if (quotesRightRef.current) {
        tl.to(quotesRightRef.current.children, {
          opacity: 0, x: 120, scale: 0.5, duration: 0.5, stagger: 0.08, ease: 'power2.in',
        }, 2.2);
      }

      // Fruits dissolve
      tl.to(fruitOverlayRef.current, {
        opacity: 0, scale: 0.7, duration: 0.4, ease: 'power2.in',
      }, 2.3);

      // Bottom text dissolves
      tl.to(textOverlayRef.current, {
        opacity: 0, y: -20, duration: 0.3, ease: 'power2.in',
      }, 2.3);

      // Video fades to black
      tl.to(videoRef.current, { opacity: 0, duration: 0.5, ease: 'power2.in' }, 2.4);

      // Content wrapper fades
      tl.to(contentWrapRef.current, { opacity: 0, duration: 0.6, ease: 'power2.in' }, 2.4);

      // Canvas particle burst — fire once when we approach exit phase
      tl.call(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        const particles = createParticles(canvas, 250);
        stopParticles = animateParticles(ctx, particles, () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        });
      }, [], 2.3);
    };

    const v = videoRef.current;
    if (v) {
      if (v.readyState >= 1) init();
      else v.addEventListener('loadedmetadata', init);
    }

    return () => {
      if (tl) { tl.scrollTrigger?.kill(); tl.kill(); }
      if (v) v.removeEventListener('loadedmetadata', init);
      if (stopParticles) stopParticles();
    };
  }, []);

  // ── Resize canvas when window changes ──
  useEffect(() => {
    const resize = () => {
      const c = canvasRef.current;
      if (c) { c.width = window.innerWidth; c.height = window.innerHeight; }
    };
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  const leftQuotes = wisdomQuotes.filter(q => q.side === 'left');
  const rightQuotes = wisdomQuotes.filter(q => q.side === 'right');

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-black"
    >
      {/* ── Video Background (scales to fit viewport, shifted to hide watermark) ── */}
      <video
        ref={videoRef}
        src="/videos/tree-scroll-anim-intra.mp4"
        className="absolute inset-0 w-full h-full object-contain mx-auto pointer-events-none scale-[1.7] md:scale-[1.15] translate-y-[-5%] md:translate-y-[6%]"
        style={{ 
          maxWidth: '1400px',
          objectPosition: 'center 60%', // Adjust vertical focus
        }}
        playsInline
        muted
        autoPlay
        preload="auto"
        poster="/images/tree-fallback.png"
      />

      {/* ── Canvas overlay for sand particle effect ── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-40"
      />

      {/* ── Content wrapper (everything that dissolves) ── */}
      <div ref={contentWrapRef} className="absolute inset-0 z-10">

        {/* ── Left Quotes ── */}
        <div
          ref={quotesLeftRef}
          className="absolute left-0 top-[15%] md:top-0 bottom-auto md:bottom-0 w-[140px] md:w-[220px] lg:w-[280px] flex flex-col justify-center gap-6 md:gap-12 pl-2 md:pl-6 lg:pl-10 pointer-events-none z-20"
        >
          {leftQuotes.map((quote) => (
            <p
              key={quote.id}
              className="font-serif text-[13px] md:text-base lg:text-lg italic leading-tight md:leading-relaxed drop-shadow-lg"
              style={{
                color: colors.gold,
                textShadow: '0 0 20px rgba(217,195,154,0.3), 0 2px 4px rgba(0,0,0,0.6)',
              }}
            >
              &ldquo;{quote.text}&rdquo;
            </p>
          ))}
        </div>

        {/* ── Right Quotes ── */}
        <div
          ref={quotesRightRef}
          className="absolute right-0 top-[15%] md:top-0 bottom-auto md:bottom-0 w-[140px] md:w-[220px] lg:w-[280px] flex flex-col justify-center gap-6 md:gap-12 pr-2 md:pr-6 lg:pr-10 pointer-events-none z-20"
        >
          {rightQuotes.map((quote) => (
            <p
              key={quote.id}
              className="font-serif text-[13px] md:text-base lg:text-lg italic leading-tight md:leading-relaxed text-right drop-shadow-lg"
              style={{
                color: colors.gold,
                textShadow: '0 0 20px rgba(217,195,154,0.3), 0 2px 4px rgba(0,0,0,0.6)',
              }}
            >
              &ldquo;{quote.text}&rdquo;
            </p>
          ))}
        </div>

        {/* ── Fruit Overlay (centered over the tree) ── */}
        <div
          ref={fruitOverlayRef}
          className="absolute inset-0 flex items-center justify-center z-15 pointer-events-none"
        >
          <div className="relative w-[150%] md:w-[60%] max-w-[800px] aspect-[16/9] md:aspect-[4/3] -translate-y-[5%] md:translate-y-0 pointer-events-auto">
            <FruitOverlay
              onFruitClick={handleFruitClick}
              onFruitHover={handleFruitHover}
              hoveredFruit={hoveredFruit}
              prefersReducedMotion={false}
            />
          </div>
        </div>

        {/* ── Bottom Text ── */}
        <div
          ref={textOverlayRef}
          className="absolute bottom-10 md:bottom-16 left-0 right-0 text-center pointer-events-none z-30"
        >
          <p
            className="font-serif text-2xl md:text-4xl lg:text-5xl italic tracking-wide"
            style={{
              color: colors.linen,
              textShadow: '0 0 30px rgba(217,195,154,0.4), 0 2px 8px rgba(0,0,0,0.7)',
            }}
          >
            Every path is connected.
          </p>
        </div>
      </div>

      {/* ── Popup Backdrop ── */}
      {selectedFruit && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity"
          onClick={handleClosePopup}
        />
      )}

      {/* ── Fruit Popup ── */}
      <NodePopup
        isOpen={selectedFruit !== null}
        onClose={handleClosePopup}
        content={selectedFruit ? fruitContent[selectedFruit] : null}
      />
    </section>
  );
}
