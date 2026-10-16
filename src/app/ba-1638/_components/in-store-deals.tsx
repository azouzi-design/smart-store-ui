"use client";

import {
  BookmarkAdd01Icon,
  BookmarkCheck01Icon,
  CarrotIcon,
  CookieIcon,
  DashboardSquare01Icon,
  SandwichIcon,
  SteakIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import Image from "next/image";
import { useState } from "react";
import { inStoreCategories, inStoreDeals, type InStoreCategory } from "../_data";

/*
 * PROPOSED (BA-1638, direction A "Weekly-ad grid") replaces the live in-store
 * section. Changes from live:
 * - one explanation in the header;
 * - square, uncropped photos (the live 16:9 crop cuts most of them);
 * - weekly-ad price type (big dollars, superscript cents) in a brand-blue box;
 * - one normalized category per deal, filtered with the same pill chips as the
 *   departments on BA-1639 + BA-1642 (live shows "FOOD", "Miscellaneous" or nothing);
 * - a save toggle per deal that works signed out, with one list card carrying a
 *   single "Sign in" button, replacing twelve "Sign in to save" buttons.
 */

const focusRing = "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

const categoryIcons: Record<InStoreCategory, IconSvgElement> = {
  Meat: SteakIcon,
  Produce: CarrotIcon,
  Deli: SandwichIcon,
  Snacks: CookieIcon,
};

/** Phones show this many deals until "Show all" is pressed. */
const mobileShown = 6;

/** "$14.99" → big 14, superscript $ and 99, like a printed weekly ad. */
function AdPrice({ price, className = "" }: { price: string; className?: string }) {
  const [dollars, cents] = price.replace("$", "").split(".");
  return (
    <span className={`inline-flex items-start font-extrabold leading-none tracking-tight ${className}`}>
      <span className="sr-only">{price}</span>
      <span aria-hidden className="mt-[0.1em] text-[0.48em]">$</span>
      <span aria-hidden>{dollars}</span>
      <span aria-hidden className="mt-[0.1em] text-[0.48em]">{cents}</span>
    </span>
  );
}

export function InStoreDeals() {
  const [saved, setSaved] = useState<string[]>([]);
  const [filter, setFilter] = useState<InStoreCategory | "All">("All");
  const [expanded, setExpanded] = useState(false);
  const toggle = (name: string) => setSaved((s) => (s.includes(name) ? s.filter((n) => n !== name) : [...s, name]));
  const deals = filter === "All" ? inStoreDeals : inStoreDeals.filter((d) => d.category === filter);
  const chips: { key: InStoreCategory | "All"; icon: IconSvgElement }[] = [
    { key: "All", icon: DashboardSquare01Icon },
    ...inStoreCategories.map((c) => ({ key: c, icon: categoryIcons[c] })),
  ];

  return (
    <section aria-labelledby="in-store-h" className="mb-2">
      <header className="mb-5 flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
        <div>
          <h2 id="in-store-h" className="font-serif text-h2 font-bold tracking-tight text-ink">
            In-store only deals
          </h2>
          <p className="mt-1 max-w-[62ch] text-copy text-body">
            Grab these on your next trip. They&apos;re priced at the register, so they can&apos;t go in an online order.
          </p>
        </div>

        {/* PROPOSED: the list status is a card with one clear action instead of a line of text */}
        <div className="flex w-full items-center gap-3 rounded-card border border-brand/25 bg-tint py-2.5 pl-3 pr-2.5 sm:w-auto sm:min-w-[22rem]">
          <span className="relative inline-flex size-11 flex-none items-center justify-center rounded-full bg-brand text-white">
            <HugeiconsIcon icon={BookmarkCheck01Icon} size={22} strokeWidth={1.8} aria-hidden />
          </span>
          <div aria-live="polite" className="min-w-0 flex-1">
            <p className="text-copy font-bold text-ink">
              {saved.length === 0 ? "Your in-store list" : `${saved.length} ${saved.length === 1 ? "deal" : "deals"} on your list`}
            </p>
            <p className="text-label text-body">
              {saved.length === 0 ? "Tap the bookmark on a deal to save it." : "Sign in to keep it for your trip."}
            </p>
          </div>
          <a
            href="#"
            className={`inline-flex h-11 flex-none items-center rounded-pill border border-brand bg-surface px-4 text-ui font-bold text-brand hover:bg-brand/10 ${focusRing}`}
          >
            Sign in
          </a>
        </div>
      </header>

      {/* Same chip design as the BA-1639 + BA-1642 departments (their below-1024px pills) */}
      <div role="tablist" aria-label="Filter in-store deals" className="mb-5 flex flex-wrap gap-2 pb-1">
        {chips.map(({ key, icon }) => {
          const on = key === filter;
          return (
            <button
              key={key}
              role="tab"
              aria-selected={on}
              onClick={() => setFilter(key)}
              className={`relative inline-flex h-11 flex-none items-center gap-3 rounded-pill border px-3 text-left text-ui transition-colors ${focusRing} ${
                on ? "border-brand bg-tint font-semibold text-brand" : "border-line bg-surface font-medium text-ink hover:bg-tint/60 hover:text-brand"
              }`}
            >
              <HugeiconsIcon icon={icon} size={18} strokeWidth={1.6} aria-hidden className={on ? "" : "text-muted"} />
              {key}
            </button>
          );
        })}
      </div>

      <ul className="m-0 grid list-none grid-cols-2 gap-3 p-0 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {deals.map((d, i) => {
          const on = saved.includes(d.name);
          return (
            <li
              key={d.name}
              className={`group relative flex flex-col overflow-hidden rounded-card border border-line bg-surface shadow-card transition-[box-shadow,border-color] duration-[180ms] hover:border-brand/45 hover:shadow-[0_10px_26px_rgba(15,30,40,0.1)] ${
                !expanded && i >= mobileShown ? "max-sm:hidden" : ""
              }`}
            >
              <div className="relative aspect-square overflow-hidden bg-surface">
                <Image src={d.img} alt={d.name} fill sizes="(max-width: 640px) 45vw, 200px" className="object-cover" />
              </div>
              <button
                type="button"
                aria-pressed={on}
                aria-label={`${on ? "Remove" : "Add"} ${d.name} ${on ? "from" : "to"} my in-store list`}
                onClick={() => toggle(d.name)}
                className={`absolute right-2 top-2 inline-flex size-11 items-center justify-center rounded-full border shadow-card transition-colors ${focusRing} ${
                  on ? "border-brand bg-brand text-white" : "border-line bg-surface text-brand hover:border-brand"
                }`}
              >
                <HugeiconsIcon icon={on ? BookmarkCheck01Icon : BookmarkAdd01Icon} size={20} strokeWidth={1.8} aria-hidden />
              </button>
              {/* Price tag overlaps the photo like a shelf sticker */}
              <div className="relative z-[1] -mt-6 ml-2.5 self-start rounded-sm bg-brand px-2.5 py-1.5 text-white shadow-add">
                <AdPrice price={d.price} className="text-ad-price" />
              </div>
              <div className="flex flex-1 flex-col gap-1 px-3 pb-3 pt-2">
                <h3 className="line-clamp-2 text-ui font-semibold leading-[1.3] text-ink">{d.name}</h3>
                <span className="mt-auto inline-flex items-center gap-1 text-fine text-muted">
                  <HugeiconsIcon icon={categoryIcons[d.category]} size={14} strokeWidth={1.6} aria-hidden /> {d.category}
                </span>
              </div>
            </li>
          );
        })}
      </ul>

      {deals.length > mobileShown && (
        <div className="mt-4 flex justify-center sm:hidden">
          <button
            type="button"
            aria-expanded={expanded}
            onClick={() => setExpanded((e) => !e)}
            className={`inline-flex h-11 items-center rounded-pill border-[1.5px] border-brand bg-surface px-5 text-copy font-bold text-brand ${focusRing}`}
          >
            {expanded ? "Show fewer" : `Show all ${deals.length} in-store deals`}
          </button>
        </div>
      )}
    </section>
  );
}
