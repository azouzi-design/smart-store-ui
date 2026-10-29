/**
 * Seasonal FX — a one-off shower of falling shapes over the page
 * (falling leaves for fall, like Google's "fall season" search easter egg).
 *
 * One file, zero dependencies, no framework, no CSS to add. Copy it as is.
 *
 *   import { playSeasonalFx } from "./seasonal-fx.js";
 *
 *   playSeasonalFx("fall");                // on page load
 *   const stop = playSeasonalFx("fall");   // stop() removes it early (e.g. on unmount)
 *
 * Or without a bundler:
 *
 *   <script type="module">
 *     import { playSeasonalFx } from "/path/to/seasonal-fx.js";
 *     playSeasonalFx("fall");
 *   </script>
 *
 * Behaviour
 * - Plays once (~10s), then removes everything it added. Nothing to clean up.
 * - Sits on top of the page but never catches clicks, taps or focus,
 *   and is hidden from screen readers.
 * - Does nothing for users who prefer reduced motion, or on the server.
 * - Deterministic: the same layout every time, no randomness.
 * - Pure CSS animation (transform only), so it stays on the GPU and off the main thread.
 *
 * Options (all optional): playSeasonalFx("fall", { count: 28, zIndex: 60 })
 */

/** @typedef {"fall"} FxPreset */
/** @typedef {{ count?: number, zIndex?: number }} FxOptions */

// --- Presets ---------------------------------------------------------------
// Shapes are drawn on a 100×100 grid. Each one has a body (filled with a
// light-to-deep gradient of its color) and veins (darker strokes on top).

// Right half of the maple leaf; mirrored for the left so it stays symmetric.
const MAPLE_HALF =
  "M50 4L54 14L58 12L57 22L62 20L60 40L70 32L72 26L78 28L82 22L90 26L86 34L92 38L80 46L84 52L70 54L80 58L84 62L78 66L70 66L72 72L56 70L52 80L51 97H50Z";

const PRESETS = {
  fall: {
    shapes: [
      {
        // maple
        body: `<path d="${MAPLE_HALF}"/><path d="${MAPLE_HALF}" transform="matrix(-1 0 0 1 100 0)"/>`,
        veins: "M50 10V90M50 56L84 30M50 56L16 30M50 66L80 62M50 66L20 62",
      },
      {
        // beech
        body: '<path d="M50 4C30 18 18 40 24 62C28 76 40 84 50 88C60 84 72 76 76 62C82 40 70 18 50 4ZM49 86H51V98H49Z"/>',
        veins: "M50 10V90M50 30L34 24M50 30L66 24M50 46L28 40M50 46L72 40M50 62L30 58M50 62L70 58M50 76L38 72M50 76L62 72",
      },
      {
        // aspen
        body: '<path d="M50 88C26 76 10 52 22 32C32 16 46 20 50 8C54 20 68 16 78 32C90 52 74 76 50 88ZM49 86H51V98H49Z"/>',
        veins: "M50 14V92M50 40L30 30M50 40L70 30M50 58L26 50M50 58L74 50M50 74L36 68M50 74L64 68",
      },
    ],
    // Which shape each particle uses, in turn (indexes into shapes): maples are the most common
    shapeOrder: [0, 1, 0, 2, 0, 1],
    // red, orange, gold, brown
    colors: ["#b8321f", "#d9701a", "#e8a317", "#8a4b1f"],
    colorOrder: [1, 0, 2, 3, 1, 2],
    light: "#fff3c4", // gradient highlight
    shade: "#3b1a08", // gradient shadow, edges, veins
    shadow: "0 3px 4px rgb(59 26 8 / 0.28)",
    count: 28,
  },
};

// --- Engine ----------------------------------------------------------------

const GOLDEN = 0.61803398875;
const frac = (n) => n - Math.floor(n);

const STYLE_ID = "seasonal-fx-style";
// The outer element falls from above the viewport to below it; the inner svg
// sways and tilts in 3D. Tilts stay under ~55° so a shape never turns edge-on and vanishes.
const CSS = `
@keyframes sfx-fall { from { transform: translateY(-20vh); } to { transform: translateY(120vh); } }
@keyframes sfx-sway {
  from { transform: perspective(600px) translateX(calc(var(--sfx-sway) * -1)) rotate(calc(var(--sfx-tilt) - 28deg)) rotateX(22deg) rotateY(-50deg); }
  to { transform: perspective(600px) translateX(var(--sfx-sway)) rotate(calc(var(--sfx-tilt) + 28deg)) rotateX(-14deg) rotateY(50deg); }
}
.sfx-layer { position: fixed; inset: 0; overflow: hidden; pointer-events: none; }
.sfx-item { position: absolute; top: 0; animation: sfx-fall linear both; will-change: transform; }
.sfx-item svg { display: block; width: 100%; height: 100%; animation: sfx-sway ease-in-out infinite alternate; }
@media (prefers-reduced-motion: reduce) { .sfx-layer { display: none; } }
`;

let uid = 0;

/**
 * Plays a preset once. Returns a function that removes it early.
 * @param {FxPreset} name
 * @param {FxOptions} [options]
 * @returns {() => void}
 */
export function playSeasonalFx(name, options = {}) {
  const noop = () => {};
  if (typeof window === "undefined") return noop;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return noop;
  const preset = PRESETS[name];
  if (!preset) return noop;

  if (!document.getElementById(STYLE_ID)) {
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = CSS;
    document.head.appendChild(style);
  }

  const count = options.count ?? preset.count;
  const run = uid++;
  let html = "";
  let longest = 0;

  for (let i = 0; i < count; i++) {
    const a = frac(i * GOLDEN);
    const b = frac(i * GOLDEN * 2.3 + 0.17);
    const c = frac(i * GOLDEN * 3.7 + 0.41);

    const shape = preset.shapes[preset.shapeOrder[i % preset.shapeOrder.length]];
    const color = preset.colors[preset.colorOrder[(i * 5) % preset.colorOrder.length]];
    const left = a * 100; // % of viewport width
    const size = 40 + b * 44; // px
    const delay = c * 3.6; // s
    const duration = 6.5 + b * 3; // s — bigger shapes read as closer, so they fall a touch faster
    const sway = 30 + c * 60; // px each side
    const flutter = 1.8 + a * 1.4; // s per sway half-cycle
    const tilt = Math.round((a - 0.5) * 120); // deg, resting angle
    longest = Math.max(longest, delay + duration);

    // currentColor = this particle's color; lighter where the light hits, deeper toward the stem
    const grad = `sfx-${run}-${i}`;
    const mix = (pct, other) => `color-mix(in oklab, currentColor ${pct}%, ${other})`;
    html += `
<div class="sfx-item" style="left:${left}%;width:${size}px;height:${size}px;animation-duration:${duration}s;animation-delay:${delay}s;filter:drop-shadow(${preset.shadow})">
  <svg viewBox="0 0 100 100" shape-rendering="geometricPrecision" style="color:${color};--sfx-sway:${sway}px;--sfx-tilt:${tilt}deg;animation-duration:${flutter}s;animation-delay:-${flutter * a}s">
    <defs><linearGradient id="${grad}" x1="0.15" y1="0" x2="0.85" y2="1">
      <stop offset="0" style="stop-color:${mix(62, preset.light)}"/>
      <stop offset="0.55" style="stop-color:currentColor"/>
      <stop offset="1" style="stop-color:${mix(72, preset.shade)}"/>
    </linearGradient></defs>
    <g fill="url(#${grad})" stroke="${mix(70, preset.shade)}" stroke-width="0.8" stroke-linejoin="round">${shape.body}</g>
    <path d="${shape.veins}" fill="none" stroke="${mix(55, preset.shade)}" stroke-opacity="0.7" stroke-width="1.4" stroke-linecap="round"/>
  </svg>
</div>`;
  }

  const layer = document.createElement("div");
  layer.className = "sfx-layer";
  layer.setAttribute("aria-hidden", "true");
  layer.style.zIndex = String(options.zIndex ?? 60);
  layer.innerHTML = html;
  document.body.appendChild(layer);

  // Everything has left the viewport once the slowest particle finishes.
  const timer = window.setTimeout(() => layer.remove(), longest * 1000 + 300);
  return () => {
    window.clearTimeout(timer);
    layer.remove();
  };
}
