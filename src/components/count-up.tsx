"use client";

import { useEffect, useRef, useState } from "react";

const DURATION_MS = 1500;

// Parses a display string like "63%", "17.2 Million+" into a numeric target
// plus whatever prefix/suffix text surrounds it, so the animation can count
// up the number while keeping the rest of the label intact.
function parseValue(raw: string) {
  const match = raw.match(/^(\D*)([\d,]+(?:\.\d+)?)(.*)$/);
  if (!match) return { prefix: "", target: 0, suffix: raw, decimals: 0 };
  const [, prefix, numberPart, suffix] = match;
  const target = parseFloat(numberPart.replace(/,/g, ""));
  const decimals = numberPart.includes(".")
    ? numberPart.split(".")[1].length
    : 0;
  return { prefix, target, suffix, decimals };
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export function CountUp({ value }: { value: string }) {
  const { prefix, target, suffix, decimals } = parseValue(value);
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;

        const startTime = performance.now();
        function tick(now: number) {
          const progress = Math.min((now - startTime) / DURATION_MS, 1);
          setDisplay(target * easeOutCubic(progress));
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {prefix}
      {display.toLocaleString("en-AU", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}
