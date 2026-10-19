"use client";

import { useEffect, useState } from "react";

/**
 * PROPOSED (BA-1649 fall theme): a one-off shower of autumn leaves over the
 * page, like Google's "fall season" search easter egg.
 *
 * - Plays once on load, then removes itself from the DOM.
 * - Sits in the foreground but never catches clicks, taps or focus.
 * - Skipped entirely for reduced-motion users and hidden from assistive tech.
 * - Deterministic: every leaf is derived from its index, no Math.random, so
 *   server and client markup match and the preview looks the same every time.
 * - Illustrated leaves: drawn on a 100-unit grid with a light-to-deep gradient,
 *   darker veins and a soft drop shadow, so they stay crisp at any size.
 */

type Shape = "maple" | "beech" | "aspen";
type Tone = "text-leaf-red" | "text-leaf-orange" | "text-leaf-gold" | "text-leaf-brown";

const SHAPES: Shape[] = ["maple", "beech", "maple", "aspen", "maple", "beech"];
const TONES: Tone[] = ["text-leaf-orange", "text-leaf-red", "text-leaf-gold", "text-leaf-brown", "text-leaf-orange", "text-leaf-gold"];

const COUNT = 28;
const GOLDEN = 0.61803398875;
const frac = (n: number) => n - Math.floor(n);

const LEAVES = Array.from({ length: COUNT }, (_, i) => {
  const a = frac(i * GOLDEN);
  const b = frac(i * GOLDEN * 2.3 + 0.17);
  const c = frac(i * GOLDEN * 3.7 + 0.41);
  return {
    shape: SHAPES[i % SHAPES.length],
    tone: TONES[(i * 5) % TONES.length],
    left: a * 100, // % of viewport width
    size: 40 + b * 44, // px
    delay: c * 3.6, // s
    duration: 6.5 + b * 3, // s — bigger leaves read as closer, so they fall a touch faster
    sway: 30 + c * 60, // px each side
    flutter: 1.8 + a * 1.4, // s per sway half-cycle
    tilt: Math.round((a - 0.5) * 120), // deg, resting angle
  };
});

// Everything has left the viewport once the slowest leaf finishes.
const TOTAL_MS = Math.max(...LEAVES.map((l) => l.delay + l.duration)) * 1000 + 300;

// Right half of the maple leaf; mirrored for the left so it stays symmetric.
const MAPLE_HALF =
  "M50 4L54 14L58 12L57 22L62 20L60 40L70 32L72 26L78 28L82 22L90 26L86 34L92 38L80 46L84 52L70 54L80 58L84 62L78 66L70 66L72 72L56 70L52 80L51 97H50Z";

const SHAPE: Record<Shape, { body: React.ReactNode; veins: string }> = {
  maple: {
    body: (
      <>
        <path d={MAPLE_HALF} />
        <path d={MAPLE_HALF} transform="matrix(-1 0 0 1 100 0)" />
      </>
    ),
    veins: "M50 10V90M50 56L84 30M50 56L16 30M50 66L80 62M50 66L20 62",
  },
  beech: {
    body: <path d="M50 4C30 18 18 40 24 62C28 76 40 84 50 88C60 84 72 76 76 62C82 40 70 18 50 4ZM49 86H51V98H49Z" />,
    veins: "M50 10V90M50 30L34 24M50 30L66 24M50 46L28 40M50 46L72 40M50 62L30 58M50 62L70 58M50 76L38 72M50 76L62 72",
  },
  aspen: {
    body: <path d="M50 88C26 76 10 52 22 32C32 16 46 20 50 8C54 20 68 16 78 32C90 52 74 76 50 88ZM49 86H51V98H49Z" />,
    veins: "M50 14V92M50 40L30 30M50 40L70 30M50 58L26 50M50 58L74 50M50 74L36 68M50 74L64 68",
  },
};

function Leaf({ shape, id }: { shape: Shape; id: string }) {
  const { body, veins } = SHAPE[shape];
  return (
    <>
      <defs>
        {/* currentColor = the leaf's tone; lighter where the light hits, deeper toward the stem */}
        <linearGradient id={id} x1="0.15" y1="0" x2="0.85" y2="1">
          <stop offset="0" style={{ stopColor: "color-mix(in oklab, currentColor 62%, var(--color-leaf-light))" }} />
          <stop offset="0.55" style={{ stopColor: "currentColor" }} />
          <stop offset="1" style={{ stopColor: "color-mix(in oklab, currentColor 72%, var(--color-leaf-shade))" }} />
        </linearGradient>
      </defs>
      <g
        fill={`url(#${id})`}
        stroke="color-mix(in oklab, currentColor 70%, var(--color-leaf-shade))"
        strokeWidth="0.8"
        strokeLinejoin="round"
      >
        {body}
      </g>
      <path
        d={veins}
        fill="none"
        stroke="color-mix(in oklab, currentColor 55%, var(--color-leaf-shade))"
        strokeOpacity="0.7"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </>
  );
}

export function FallingLeaves() {
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    const id = window.setTimeout(() => setPlaying(false), TOTAL_MS);
    return () => window.clearTimeout(id);
  }, []);

  if (!playing) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[60] overflow-hidden motion-reduce:hidden">
      {LEAVES.map((leaf, i) => (
        <div
          key={i}
          className="absolute top-0 animate-leaf-fall drop-shadow-leaf"
          style={{
            left: `${leaf.left}%`,
            width: leaf.size,
            height: leaf.size,
            animationDuration: `${leaf.duration}s`,
            animationDelay: `${leaf.delay}s`,
          }}
        >
          <svg
            viewBox="0 0 100 100"
            shapeRendering="geometricPrecision"
            className={`size-full animate-leaf-sway ${leaf.tone}`}
            style={
              {
                "--sway": `${leaf.sway}px`,
                "--tilt": `${leaf.tilt}deg`,
                animationDuration: `${leaf.flutter}s`,
                animationDelay: `-${leaf.flutter * frac(i * GOLDEN)}s`,
              } as React.CSSProperties
            }
          >
            <Leaf shape={leaf.shape} id={`leaf-grad-${i}`} />
          </svg>
        </div>
      ))}
    </div>
  );
}
