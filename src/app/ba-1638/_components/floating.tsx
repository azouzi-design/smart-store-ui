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
import { useState } from "react";

// Mirrors the live .pdock-* (For you) and .gp-assist-fab (Ask Breezy) rules.

const rows = [
  { label: "Personalized coupons for you", Icon: Tag },
  { label: "Meals we think you'll love", Icon: Utensils },
  { label: "Restock my pantry", Icon: Repeat },
  { label: "Based on my purchases", Icon: Receipt },
  { label: "New this week", Icon: Sparkles },
  { label: "Trending near me", Icon: TrendingUp },
];

/** "For you" side panel — collapsed to its tab by default, as on the live Weekly Ad page. */
export function ForYou() {
  const [open, setOpen] = useState(false);

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        aria-expanded={false}
        className="fixed right-0 top-[clamp(110px,16vh,190px)] z-[2540] rounded-l-[10px] bg-brand px-[7px] py-4 text-copy font-bold tracking-[0.03em] text-white shadow-tab [writing-mode:vertical-rl] hover:brightness-[1.08] max-[640px]:top-[clamp(84px,14vh,150px)] max-[640px]:px-1.5 max-[640px]:py-3.5 max-[640px]:text-label"
      >
        For you
      </button>
    );
  }

  return (
    <aside
      aria-label="For you"
      className="fixed right-3 top-[clamp(96px,14vh,170px)] z-[2560] flex max-h-[calc(100vh-clamp(96px,14vh,170px)-16px)] w-[min(430px,calc(100vw-24px))] flex-col overflow-hidden rounded-panel border border-line bg-surface text-ink shadow-panel max-[640px]:inset-y-0 max-[640px]:right-0 max-[640px]:max-h-none max-[640px]:w-screen max-[640px]:rounded-none max-[640px]:border-l-0"
    >
      <div data-dock-head className="flex flex-none items-center justify-between gap-2.5 rounded-t-[13px] border-b border-brand/12 bg-tint px-3.5 py-3">
        <h2 className="text-panel font-extrabold text-brand">For you</h2>
        <button
          onClick={() => setOpen(false)}
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
