'use client';

import { useState, useEffect } from 'react';

export interface CursorPosition {
  x: number;
  y: number;
}

/**
 * Hook that tracks the mouse cursor position.
 * Returns { x, y } coordinates updated on mousemove events.
 * 
 * @returns CursorPosition - current mouse coordinates
 */
export function useCursorPosition(): CursorPosition {
  const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 });

  useEffect(() => {
    // Check if window is available (client-side)
    if (typeof window === 'undefined') return;

    const handleMouseMove = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    // Add event listener for mouse movement
    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return position;
}
