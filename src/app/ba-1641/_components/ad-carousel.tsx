"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { type ReactNode, useEffect, useRef, useState, useSyncExternalStore } from "react";

/**
 * PROPOSED: one ad slot that rotates through the three hero ads instead of
 * showing three tiles side by side.
 *
 * - Advances on its own every few seconds (the active dot fills as a timer).
 * - Loops seamlessly: a clone of each end slide sits beyond the edges, so
 *   3 → 1 keeps moving forward instead of rewinding across the whole track.
 * - Swipe / drag, arrow keys, dots and the hover arrows move it by hand.
 * - Pauses while hovered, focused, dragged, off screen or in a hidden tab.
 *   Reduced-motion users get no autoplay at all.
 */
export function AdCarousel({ slides, label }: { slides: ReactNode[]; label: string }) {
  const n = slides.length;
  // Track = [last clone, ...slides, first clone]; pos indexes into it.
  const [pos, setPos] = useState(1);
  const [animate, setAnimate] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(true);
  const [drag, setDrag] = useState<number | null>(null); // px offset while dragging

  const rootRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef<{ x: number; y: number; t: number; locked: boolean | null } | null>(null);
  const suppressClick = useRef(false);

  const reducedMotion = useSyncExternalStore(subscribeReducedMotion, getReducedMotion, () => false);

  const active = (((pos - 1) % n) + n) % n;
  const paused = reducedMotion || hovered || focused || !visible || drag !== null;


  // Pause when scrolled away or the tab is hidden.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    let onScreen = true;
    const update = () => setVisible(onScreen && !document.hidden);
    const io = new IntersectionObserver(([e]) => {
      onScreen = e.isIntersecting;
      update();
    });
    io.observe(el);
    document.addEventListener("visibilitychange", update);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  // After snapping to a clone without animation, turn animation back on.
  useEffect(() => {
    if (animate) return;
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)));
    return () => cancelAnimationFrame(id);
  }, [animate]);

  const step = (delta: number) => {
    // Ignore input while parked on a clone mid-snap.
    if (pos + delta < 0 || pos + delta > n + 1) return;
    setAnimate(true);
    setPos((p) => p + delta);
  };
  const goTo = (i: number) => {
    setAnimate(true);
    setPos(i + 1);
  };

  const onTransitionEnd = (e: React.TransitionEvent) => {
    if (e.target !== e.currentTarget) return;
    if (pos === 0 || pos === n + 1) {
      setAnimate(false);
      setPos(pos === 0 ? n : 1);
    }
  };

  // --- Pointer drag / swipe -------------------------------------------------
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    dragStart.current = { x: e.clientX, y: e.clientY, t: performance.now(), locked: null };
    suppressClick.current = false;
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const s = dragStart.current;
    if (!s) return;
    const dx = e.clientX - s.x;
    const dy = e.clientY - s.y;
    if (s.locked === null) {
      if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
      s.locked = Math.abs(dx) > Math.abs(dy); // horizontal → ours, vertical → page scroll
      if (!s.locked) {
        dragStart.current = null;
        return;
      }
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      suppressClick.current = true;
    }
    setAnimate(false);
    setDrag(dx);
  };
  const endDrag = (e: React.PointerEvent) => {
    const s = dragStart.current;
    dragStart.current = null;
    if (!s?.locked || drag === null) return;
    const width = viewportRef.current?.offsetWidth ?? 1;
    const velocity = drag / Math.max(1, performance.now() - s.t); // px/ms
    const dir = Math.abs(drag) > width * 0.18 || Math.abs(velocity) > 0.45 ? -Math.sign(drag) : 0;
    setDrag(null);
    setAnimate(true);
    if (dir) setPos((p) => Math.min(n + 1, Math.max(0, p + dir)));
    if (e.type === "pointercancel") suppressClick.current = false;
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") step(-1);
    else if (e.key === "ArrowRight") step(1);
    else return;
    e.preventDefault();
  };

  const track = [slides[n - 1], ...slides, slides[0]];
  const offset = drag !== null ? `calc(${-pos * 100}% + ${drag}px)` : `${-pos * 100}%`;

  return (
    <section
      ref={rootRef}
      aria-roledescription="carousel"
      aria-label={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={(e) => setFocused(e.target.matches(":focus-visible"))}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false);
      }}
      onKeyDown={onKeyDown}
      className="group/carousel relative aspect-[10/3] max-[720px]:aspect-auto max-[720px]:h-[clamp(176px,50vw,200px)]"
    >
      <div
        ref={viewportRef}
        className="h-full cursor-grab touch-pan-y select-none overflow-hidden rounded-promo shadow-promo active:cursor-grabbing"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={(e) => {
          if (suppressClick.current) {
            e.preventDefault();
            e.stopPropagation();
            suppressClick.current = false;
          }
        }}
        onDragStart={(e) => e.preventDefault()}
      >
        <div
          aria-live={paused ? "polite" : "off"}
          onTransitionEnd={onTransitionEnd}
          className={`flex h-full ${animate ? "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:duration-1" : ""}`}
          style={{ transform: `translateX(${offset})` }}
        >
          {track.map((slide, i) => {
            const real = i >= 1 && i <= n;
            const current = i === pos;
            return (
              <div
                key={i}
                role={real ? "group" : undefined}
                aria-roledescription={real ? "slide" : undefined}
                aria-label={real ? `${i} of ${n}` : undefined}
                aria-hidden={!current || undefined}
                inert={!current}
                className="h-full w-full shrink-0 [&>*]:h-full"
              >
                {slide}
              </div>
            );
          })}
        </div>
      </div>

      {/* Edge arrows: appear on hover or keyboard focus; touch screens swipe instead. */}
      <button type="button" onClick={() => step(-1)} aria-label="Previous ad" className={`${arrow} left-3`}>
        <ChevronLeft size={20} aria-hidden />
      </button>
      <button type="button" onClick={() => step(1)} aria-label="Next ad" className={`${arrow} right-3`}>
        <ChevronRight size={20} aria-hidden />
      </button>

      {/* Frosted dot pill: the active dot stretches and fills as the autoplay timer. */}
      <div className="absolute bottom-3.5 right-3.5 z-10 flex items-center rounded-pill bg-white/75 px-1.5 py-[9px] shadow-chip backdrop-blur-md">
        {slides.map((_, i) => {
          const on = i === active;
          return (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Show ad ${i + 1} of ${n}`}
              aria-current={on || undefined}
              // 44px hit area; the negative margin keeps the pill itself slim.
              className="group/dot -my-[17px] grid h-11 place-items-center rounded-pill px-[3px] focus-visible:outline-2 focus-visible:outline-brand"
            >
              <span
                className={`relative block h-1.5 overflow-hidden rounded-pill transition-[width,background-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  on ? "w-7 bg-ink/15" : "w-1.5 bg-ink/35 group-hover/dot:bg-ink/60"
                }`}
              >
                {on && (
                  <span
                    key={active}
                    // When the timer fills, advance.
                    onAnimationEnd={() => step(1)}
                    className={`absolute inset-0 origin-left rounded-pill bg-ink ${reducedMotion ? "" : "animate-carousel-progress"}`}
                    style={{ animationPlayState: paused ? "paused" : "running" }}
                  />
                )}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";
const getReducedMotion = () => window.matchMedia(reducedMotionQuery).matches;
const subscribeReducedMotion = (cb: () => void) => {
  const mq = window.matchMedia(reducedMotionQuery);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

const arrow =
  "absolute top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-ink shadow-chip backdrop-blur-md transition-[opacity,scale] duration-200 hover:scale-105 hover:bg-white focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-brand opacity-0 group-hover/carousel:opacity-100 pointer-coarse:hidden";
