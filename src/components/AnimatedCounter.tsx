'use client';

import { useRef, useEffect, useState } from 'react';

type AnimatedCounterProps = {
  value: string;
  delay?: number;
};

export function AnimatedCounter({ value, delay = 0 }: AnimatedCounterProps) {
  const [count, setCount] = useState('0');
  const ref = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const numMatch = String(value).match(/[\d.]+/);
    if (!numMatch) {
      setCount(value);
      return;
    }

    const targetNum = parseFloat(numMatch[0]);
    const isFloat = String(value).includes('.');
    const prefix = String(value).substring(0, numMatch.index);
    const suffix = String(value).substring((numMatch.index ?? 0) + numMatch[0].length);

    const duration = 2000;
    let startTime: number | null = null;
    let animationFrame: number;

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 4);

      const currentNum = targetNum * easeProgress;
      setCount(
        `${prefix}${isFloat ? currentNum.toFixed(1) : Math.floor(currentNum)}${suffix}`
      );

      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCount);
      } else {
        setCount(value);
      }
    };

    const timeout = setTimeout(() => {
      animationFrame = requestAnimationFrame(updateCount);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [isVisible, value, delay]);

  return <span ref={ref}>{count}</span>;
}
