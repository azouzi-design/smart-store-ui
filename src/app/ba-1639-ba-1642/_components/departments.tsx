"use client";

import {
  AiMagicIcon,
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
import { departments, products, totalItems, type Product } from "../_data";

/*
 * PROPOSED (BA-1642, direction D "Side rail"): on desktop the departments are
 * a sticky list beside the products, so none hide behind a scroll arrow (the
 * live strip's arrow covers "Shop All Categories"). Below 1024px the list
 * becomes chips that wrap onto new lines. Icons are Hugeicons (free set).
 * Product cards, results line, Filter and Sort are inherited from the live page.
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

const focusRing = "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

/** Three rows at 4 / 3 / 2 columns. */
const shownCount = 12;
function cardVisibility(i: number) {
  if (i < 6) return "";
  if (i < 9) return "max-sm:hidden";
  return "max-xl:hidden";
}

/** Shifts the mock products per department so switching visibly changes the grid. */
function shownProducts(active: string) {
  const start = (departments.indexOf(active) * 3) % products.length;
  return [...products.slice(start), ...products.slice(0, start)].slice(0, shownCount);
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

function ResultsControls() {
  return (
    <div className="mb-5 flex flex-wrap items-center justify-end gap-3 border-b border-line pb-3">
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
      <h2 className="mb-5 font-serif text-h2 font-bold tracking-tight text-brand">Departments</h2>

      <div className="lg:grid lg:grid-cols-[14rem_1fr] lg:gap-8">
        <nav aria-label="Departments" className="lg:sticky lg:top-24 lg:self-start">
          <div
            role="tablist"
            aria-orientation="vertical"
            className="flex flex-wrap gap-2 pb-1 lg:flex-col lg:flex-nowrap lg:gap-0.5"
          >
            {departments.map((d) => {
              const on = d === active;
              return (
                <button
                  key={d}
                  role="tab"
                  aria-selected={on}
                  onClick={() => setActive(d)}
                  className={`relative inline-flex h-11 flex-none items-center gap-3 rounded-md px-3 text-left text-ui transition-colors max-lg:rounded-pill max-lg:border lg:w-full ${focusRing} ${
                    on
                      ? "bg-tint font-semibold text-brand max-lg:border-brand lg:before:absolute lg:before:inset-y-2 lg:before:left-0 lg:before:w-1 lg:before:rounded-pill lg:before:bg-brand"
                      : "font-medium text-ink hover:bg-tint/60 hover:text-brand max-lg:border-line max-lg:bg-surface"
                  }`}
                >
                  <HugeiconsIcon icon={icons[d]} size={18} strokeWidth={1.6} aria-hidden className={on ? "" : "text-muted"} />
                  {d}
                </button>
              );
            })}
            <a
              href="#"
              className={`inline-flex h-11 flex-none items-center gap-3 px-3 text-ui font-semibold text-brand-link hover:underline lg:mt-2 lg:border-t lg:border-line lg:pt-1 ${focusRing}`}
            >
              <HugeiconsIcon icon={DashboardSquare01Icon} size={18} strokeWidth={1.6} aria-hidden /> All categories
            </a>
          </div>
        </nav>

        <div className="min-w-0 max-lg:mt-5">
          <ResultsControls />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
            {shownProducts(active).map((p, i) => (
              <ProductCard key={p.name} p={p} className={cardVisibility(i)} />
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
        </div>
      </div>
    </section>
  );
}
