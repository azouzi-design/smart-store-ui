"use client";

import {
  AiMagicIcon,
  ArrowDown01Icon,
  BeerIcon,
  CarrotIcon,
  CroissantIcon,
  DashboardSquare01Icon,
  DetergentIcon,
  MilkCartonIcon,
  SandwichIcon,
  ShoppingBasket01Icon,
  SteakIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import { ArrowRight, ArrowUpDown, Funnel } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { departments, previewCount, products, totalItems, type Product } from "../_data";

// Grid, cards and controls mirror the live .sec.shop / .shop-controls / .grid / .ipc-* rules.

/*
 * PROPOSED (BA-1642, direction A "Pill chips"): the live underline tabs scroll
 * behind an arrow that covers "Shop All Categories". Chips wrap on desktop so
 * every department is visible, scroll sideways on phones, and "All categories"
 * is the last chip. Icons are Hugeicons (free set).
 */

const icons: Record<string, IconSvgElement> = {
  "Recommended For You": AiMagicIcon,
  Bakery: CroissantIcon,
  "Beer & Wine": BeerIcon,
  Dairy: MilkCartonIcon,
  Deli: SandwichIcon,
  Grocery: ShoppingBasket01Icon,
  Household: DetergentIcon,
  "Meat & Poultry": SteakIcon,
  Produce: CarrotIcon,
};

/* 36px pill; the ::after extends the hit area to 44px without changing the look. */
const chip =
  "relative inline-flex h-9 flex-none items-center gap-1.5 rounded-pill border px-3.5 text-label font-semibold transition-colors outline-none after:absolute after:inset-x-0 after:-inset-y-1 after:content-[''] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

/** Shifts the mock products per department so switching visibly changes the grid. */
function shownProducts(active: string) {
  const start = (departments.indexOf(active) * 3) % products.length;
  return [...products.slice(start), ...products.slice(0, start)].slice(0, previewCount);
}

/*
 * Live grid is `repeat(auto-fill, minmax(210px, 1fr))` (2 columns ≤480px).
 * With its gutters that resolves to 2 / 3 / 4 / 5 columns at these widths,
 * so we pin the same counts and hide cards past the third row.
 */
const grid =
  "grid grid-cols-2 gap-2.5 min-[481px]:gap-[clamp(12px,2vw,18px)] min-[716px]:grid-cols-3 min-[958px]:grid-cols-4 min-[1186px]:grid-cols-5";

function rowVisibility(i: number) {
  if (i < 6) return "";
  if (i < 9) return "max-[715px]:hidden";
  if (i < 12) return "max-[957px]:hidden";
  return "max-[1185px]:hidden";
}

function ProductCard({ p, className }: { p: Product; className: string }) {
  return (
    <article
      className={`relative flex flex-col gap-2.5 rounded-card border border-line bg-surface p-3 shadow-card transition-[box-shadow,transform,border-color] duration-[180ms] hover:-translate-y-0.5 hover:border-brand/45 hover:shadow-[0_10px_26px_rgba(15,30,40,0.1)] max-[480px]:p-2.5 ${className}`}
    >
      {/* pb-1: live image is inline, leaving a 4px descender gap below it */}
      <div className="relative pb-1">
        <div className="relative aspect-square w-full">
          <Image src={p.img} alt={p.name} fill sizes="(max-width: 480px) 45vw, 220px" className="rounded-[10px] bg-surface object-contain p-1.5" />
        </div>
        <button
          aria-label={`Add ${p.name}`}
          className="absolute right-2 top-2 z-[2] inline-flex size-10 items-center justify-center rounded-full bg-brand p-0 text-[22px] leading-none text-white shadow-add"
        >
          +
        </button>
        <span className="absolute right-0 top-[38%] z-[1] rounded-l-[4px] bg-success py-[3px] pl-3 pr-2 text-micro font-extrabold tracking-[0.05em] text-white [clip-path:polygon(8px_0,100%_0,100%_100%,8px_100%,0_50%)]">
          SALE
        </span>
      </div>
      <div className="relative mt-2 flex min-w-0 flex-col items-start gap-0.5 border-t border-line px-0.5 pt-[9px] text-left">
        <div className="inline-flex max-w-full items-baseline gap-1.5 whitespace-nowrap text-lead">
          <span className="font-extrabold text-success">{p.price}</span>
          <s className="text-label font-medium text-muted">{p.was}</s>
        </div>
        <h3 className="line-clamp-2 max-w-full text-ui font-normal leading-[1.3] text-ink">{p.name}</h3>
        <span className="text-tag text-unit">{p.unit}</span>
      </div>
    </article>
  );
}

/** Results line + Filter + Sort (inherited). */
function ResultsControls({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="whitespace-nowrap text-copy text-muted">
        {totalItems} results · {totalItems} on sale
      </span>
      <button className="inline-flex h-10 items-center gap-[7px] whitespace-nowrap rounded-card border border-line bg-surface px-3.5 text-ui font-semibold text-ink shadow-[0_2px_1.5px_rgba(0,0,0,0.05)] hover:border-brand">
        <Funnel size={15} aria-hidden /> Filter
      </button>
      <label className="inline-flex h-10 items-center gap-[7px] whitespace-nowrap rounded-card border border-line bg-surface pl-3.5 pr-2 text-ui font-semibold text-ink shadow-[0_2px_1.5px_rgba(0,0,0,0.05)] focus-within:border-brand">
        <ArrowUpDown size={15} aria-hidden />
        <select aria-label="Sort" className="cursor-pointer border-0 bg-transparent p-0 text-ui font-semibold text-ink outline-none">
          <option>Featured</option>
          <option>Price: low to high</option>
          <option>Price: high to low</option>
          <option>Biggest savings</option>
        </select>
      </label>
    </div>
  );
}

export function Departments() {
  const [active, setActive] = useState(departments[0]);
  return (
    <section className="mt-[clamp(10px,2vw,22px)]">
      <h2 className="mb-[18px] font-serif text-h2 font-bold tracking-[-0.01em] text-brand">Departments</h2>

      <div
        role="tablist"
        aria-label="Departments"
        className="flex gap-2 overflow-x-auto py-1 [scrollbar-width:none] md:flex-wrap md:overflow-visible [&::-webkit-scrollbar]:hidden"
      >
        {departments.map((d) => {
          const on = d === active;
          return (
            <button
              key={d}
              role="tab"
              aria-selected={on}
              onClick={() => setActive(d)}
              className={`${chip} ${on ? "border-brand bg-brand text-surface" : "border-line bg-surface text-ink hover:border-brand hover:text-brand"}`}
            >
              <HugeiconsIcon icon={icons[d]} size={15} strokeWidth={1.8} aria-hidden />
              {d}
            </button>
          );
        })}
        <button className={`${chip} border-dashed border-muted bg-surface text-ink hover:border-brand hover:text-brand`}>
          <HugeiconsIcon icon={DashboardSquare01Icon} size={15} strokeWidth={1.8} aria-hidden />
          All categories
          <HugeiconsIcon icon={ArrowDown01Icon} size={13} strokeWidth={2} aria-hidden />
        </button>
      </div>

      <ResultsControls className="mb-5 mt-5 flex-wrap justify-end border-b border-line pb-3" />

      <div className={grid}>
        {shownProducts(active).map((p, i) => (
          <ProductCard key={p.name} p={p} className={rowVisibility(i)} />
        ))}
      </div>

      <div className="mt-[26px] flex justify-center">
        {/* Intentionally inert on this preview page */}
        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-pill border-[1.5px] border-brand bg-surface px-[22px] py-2.5 text-copy font-bold text-brand hover:bg-brand/10"
        >
          View all {totalItems} items <ArrowRight size={14} aria-hidden />
        </button>
      </div>
    </section>
  );
}
