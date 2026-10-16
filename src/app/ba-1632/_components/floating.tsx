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
import { useState, useSyncExternalStore } from "react";

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
  const setOpen = setChoice;

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        aria-expanded={false}
        className="fixed right-0 top-[138px] z-50 rounded-l-[10px] bg-brand px-[7px] py-4 text-copy font-bold text-white shadow-tab [writing-mode:vertical-rl]"
      >
        For you
      </button>
    );
  }

  return (
    <aside
      aria-label="For you"
      className="fixed right-3 top-[120px] z-50 w-[430px] max-w-[calc(100vw-24px)] overflow-hidden rounded-panel border border-line bg-surface shadow-panel"
    >
      <div className="flex items-center justify-between border-b border-brand/10 bg-tint px-3.5 py-3">
        <h2 className="text-panel font-extrabold text-brand">For you</h2>
        <button
          onClick={() => setOpen(false)}
          aria-label="Close For you panel"
          className="grid size-10 place-items-center text-ink"
        >
          <X size={18} aria-hidden />
        </button>
      </div>
      <ul>
        {rows.map(({ label, Icon }) => (
          <li key={label} className="border-b border-line-faint last:border-0">
            <button className="flex w-full items-center gap-2.5 px-4 py-[13px] text-lead font-semibold text-ink">
              <Icon size={16} aria-hidden /> {label}
              <ChevronDown size={14} className="ml-auto text-muted" aria-hidden />
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export function BreezyFab() {
  return (
    <button className="fixed bottom-7 left-7 z-40 flex items-center gap-2.5 rounded-pill bg-brand py-2.5 pl-2.5 pr-[22px] text-lead font-bold text-white shadow-fab">
      <span aria-hidden className="grid size-[38px] place-items-center rounded-full bg-white">
        <Image src="/live/breezy-avatar.png" alt="" width={22} height={22} className="rounded-full" />
      </span>
      Ask Breezy
    </button>
  );
}
