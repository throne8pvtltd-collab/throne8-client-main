'use client';
import { useState, useEffect } from 'react';

/**
 * Animates a number from 0 to target over duration ms.
 * Only starts when `enabled` is true (tie to IntersectionObserver).
 */
export function useCounter(target: number, duration = 1400, enabled = false): number {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!enabled) return;
    let current = 0;
    const increment = target / (duration / 16);
    const id = setInterval(() => {
      current += increment;
      if (current >= target) { setCount(target); clearInterval(id); }
      else setCount(Math.floor(current));
    }, 16);
    return () => clearInterval(id);
  }, [target, duration, enabled]);

  return count;
}
