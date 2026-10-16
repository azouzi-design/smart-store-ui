"use client";

import {
  ChevronDown,
  Receipt,
  Repeat,
  Sparkles,
  Tag,
  TrendingUp,
  Utensils,
  X,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

// Mirrors the live .pdock-* (For you) and .gp-assist-fab (Ask Breezy) rules.

const rows = [
  { label: "Personalized coupons for you", Icon: Tag },
  { label: "Meals we think you'll love", Icon: Utensils },
  { label: "Restock my pantry", Icon: Repeat },
  { label: "Based on my purchases", Icon: Receipt },
  { label: "New this week", Icon: Sparkles },
  { label: "Trending near me", Icon: TrendingUp },
];

const wide = "(min-width: 1024px)";
const subscribeWide = (cb: () => void) => {
  const mq = window.matchMedia(wide);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

/** "For you" side panel — open by default on wide screens (like the live homepage), collapsed to its tab on small ones. */
export function ForYou() {
  const isWide = useSyncExternalStore(subscribeWide, () => window.matchMedia(wide).matches, () => false);
  const [choice, setChoice] = useState<boolean | null>(null);
  const open = choice ?? isWide;
  const panelRef = useRef<HTMLElement>(null);

  // Ported from the live PersonalizationDock: while open, the panel sits 8px below the
  // top of .home-hero and the hero band grows to fit it, pushing the promo tiles down.
  useEffect(() => {
    const hero = document.querySelector<HTMLElement>(".home-hero");
    const panel = panelRef.current;
    if (!open || !hero || !panel) return;
    const head = panel.querySelector<HTMLElement>("[data-dock-head]");
    const body = panel.querySelector<HTMLElement>("[data-dock-body]");
    const measure = () => {
      const natural = (head?.offsetHeight ?? 0) + (body?.scrollHeight ?? 0) + 2;
      const top = hero.getBoundingClientRect().top;
      if (top < 0) {
        panel.style.top = "";
        panel.style.maxHeight = "";
        return;
      }
      const height = Math.min(natural, Math.max(240, Math.round(window.innerHeight - top - 16)));
      hero.style.minHeight = `${height + 16}px`;
      panel.style.top = `${Math.round(top + 8)}px`;
      panel.style.maxHeight = `${height}px`;
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(hero);
    if (body) ro.observe(body);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      hero.style.minHeight = "";
    };
  }, [open]);

  if (!open) {
    return (
      <button
        onClick={() => setChoice(true)}
        aria-expanded={false}
        className="fixed right-0 top-[clamp(110px,16vh,190px)] z-[2540] rounded-l-[10px] bg-brand px-[7px] py-4 text-copy font-bold tracking-[0.03em] text-white shadow-tab [writing-mode:vertical-rl] hover:brightness-[1.08] max-[640px]:top-[clamp(84px,14vh,150px)] max-[640px]:px-1.5 max-[640px]:py-3.5 max-[640px]:text-label"
      >
        For you
      </button>
    );
  }

  return (
    <aside
      ref={panelRef}
      aria-label="For you"
      className="fixed right-3 top-[clamp(96px,14vh,170px)] z-[2560] flex max-h-[calc(100vh-clamp(96px,14vh,170px)-16px)] w-[min(430px,calc(100vw-24px))] flex-col overflow-hidden rounded-panel border border-line bg-surface text-ink shadow-panel max-[640px]:inset-y-0 max-[640px]:right-0 max-[640px]:max-h-none max-[640px]:w-screen max-[640px]:rounded-none max-[640px]:border-l-0"
    >
      <div data-dock-head className="flex flex-none items-center justify-between gap-2.5 rounded-t-[13px] border-b border-brand/12 bg-tint px-3.5 py-3">
        <h2 className="text-panel font-extrabold text-ink">For you</h2>
        <button
          onClick={() => setChoice(false)}
          aria-label="Close For you panel"
          className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-lg px-2 py-1.5 text-muted hover:bg-soft hover:text-ink"
        >
          <X size={18} aria-hidden />
        </button>
      </div>
      <ul data-dock-body className="flex-[0_1_auto] overflow-y-auto">
        {rows.map(({ label, Icon }) => (
          <li key={label} className="border-line/55 [&+&]:border-t">
            <button className="flex w-full items-center gap-2.5 px-4 py-[13px] text-left text-lead font-semibold text-ink">
              <Icon size={15} aria-hidden />
              <span className="flex-1">{label}</span>
              <ChevronDown size={12} className="flex-none text-muted" aria-hidden />
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export function BreezyFab() {
  return (
    <button className="fixed bottom-[clamp(14px,4vw,28px)] left-[clamp(14px,4vw,28px)] z-40 inline-flex items-center gap-2.5 rounded-pill bg-brand py-2.5 pl-2.5 pr-[22px] font-bold text-white shadow-fab max-[640px]:hidden">
      <span aria-hidden className="inline-flex size-[38px] flex-none items-center justify-center rounded-full bg-white">
        <Image src="/live/breezy-avatar.png" alt="" width={22} height={22} className="rounded-full object-cover" />
      </span>
      <span className="text-[15.5px]">Ask Breezy</span>
    </button>
  );
}
