"use client";

import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
  BookmarkAdd01Icon,
  BookmarkCheck01Icon,
  Calendar03Icon,
  CookieIcon,
  CarrotIcon,
  DashboardSquare01Icon,
  Location01Icon,
  SandwichIcon,
  SteakIcon,
  Store01Icon,
  Tick02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import Image from "next/image";
import { useRef, useState } from "react";
import { adWeek, inStoreCategories, inStoreDeals, store, type InStoreCategory, type InStoreDeal } from "../_data";

/*
 * PROPOSED (BA-1638): three directions for "In-store only deals", stacked under
 * the inherited section so they can be compared on one page. Shared changes:
 * - one explanation in the header instead of a muted line, with the ad dates and store;
 * - square, uncropped photos (the live 16:9 crop cuts most of them);
 * - weekly-ad price type (big dollars, superscript cents) instead of a blue number;
 * - one normalized category per deal (live shows "FOOD", "Miscellaneous" or nothing);
 * - a save toggle per deal that works signed out, with a single "Sign in to keep
 *   your list" prompt, replacing twelve "Sign in to save" buttons.
 */

const focusRing = "outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

const categoryIcons: Record<InStoreCategory, IconSvgElement> = {
  Meat: SteakIcon,
  Produce: CarrotIcon,
  Deli: SandwichIcon,
  Snacks: CookieIcon,
};

const storeName = store.address.split(",")[0];

/* ---------- shared pieces ---------- */

function useTripList() {
  const [saved, setSaved] = useState<string[]>([]);
  const toggle = (name: string) => setSaved((s) => (s.includes(name) ? s.filter((n) => n !== name) : [...s, name]));
  const addAll = () => setSaved(inStoreDeals.map((d) => d.name));
  return { saved, isSaved: (name: string) => saved.includes(name), toggle, addAll };
}

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

/** Ad shots are square with the product centered, so they can fill the tile edge to edge. */
function DealPhoto({ deal, sizes, zoom = false, className = "" }: { deal: InStoreDeal; sizes: string; zoom?: boolean; className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-surface ${className}`}>
      {/* zoom: thumbnails crop into the product so it reads at 48px */}
      <Image src={deal.img} alt={deal.name} fill sizes={sizes} className={`object-cover ${zoom ? "scale-[1.7]" : ""}`} />
    </div>
  );
}

function SaveButton({ deal, saved, onToggle, className = "" }: { deal: InStoreDeal; saved: boolean; onToggle: () => void; className?: string }) {
  return (
    <button
      type="button"
      aria-pressed={saved}
      aria-label={`${saved ? "Remove" : "Add"} ${deal.name} ${saved ? "from" : "to"} my in-store list`}
      onClick={onToggle}
      className={`inline-flex size-11 flex-none items-center justify-center rounded-full border transition-colors ${focusRing} ${
        saved ? "border-brand bg-brand text-white" : "border-line bg-surface text-brand hover:border-brand"
      } ${className}`}
    >
      <HugeiconsIcon icon={saved ? BookmarkCheck01Icon : BookmarkAdd01Icon} size={20} strokeWidth={1.8} aria-hidden />
    </button>
  );
}

function InStoreChip({ inverted = false }: { inverted?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-pill px-2.5 py-1 font-sans text-tag font-bold uppercase tracking-[0.06em] ${
        inverted ? "bg-surface text-accent" : "bg-accent text-white"
      }`}
    >
      <HugeiconsIcon icon={Store01Icon} size={14} strokeWidth={2} aria-hidden /> In store only
    </span>
  );
}

function AdMeta({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap items-center gap-x-4 gap-y-1.5 text-label text-body ${className}`}>
      <li className="inline-flex items-center gap-1.5">
        <HugeiconsIcon icon={Calendar03Icon} size={16} strokeWidth={1.6} aria-hidden className="text-muted" />
        Prices good {adWeek.from} – {adWeek.to}
      </li>
      <li className="inline-flex items-center gap-1.5">
        <HugeiconsIcon icon={Location01Icon} size={16} strokeWidth={1.6} aria-hidden className="text-muted" />
        {storeName} store
      </li>
    </ul>
  );
}

function ListSummary({ count, className = "" }: { count: number; className?: string }) {
  return (
    <p aria-live="polite" className={`text-label text-body ${className}`}>
      {count === 0 ? (
        <>Save deals to build a list for your next store trip.</>
      ) : (
        <>
          <strong className="font-bold text-ink">
            {count} {count === 1 ? "deal" : "deals"}
          </strong>{" "}
          on your in-store list.
        </>
      )}{" "}
      <a href="#" className={`font-semibold text-brand-link underline-offset-2 hover:underline ${focusRing}`}>
        Sign in to keep it
      </a>
    </p>
  );
}

/* ---------- comparison scaffolding ---------- */

export const inStoreVariants = [
  { id: "in-store-live", tag: "Live", title: "Inherited" },
  { id: "in-store-a", tag: "A", title: "Weekly-ad grid" },
  { id: "in-store-b", tag: "B", title: "Compact rail" },
  { id: "in-store-c", tag: "C", title: "Trip list" },
];

export function VariantNav() {
  return (
    <nav aria-label="In-store deals directions" className="mb-6 flex flex-wrap items-center gap-2 rounded-card border border-dashed border-violet/50 bg-surface px-3 py-2">
      <span className="mr-1 text-fine font-bold uppercase tracking-[0.08em] text-violet">Compare in-store directions</span>
      {inStoreVariants.map((v) => (
        <a
          key={v.id}
          href={`#${v.id}`}
          className={`inline-flex h-11 items-center gap-1.5 rounded-pill px-3 text-label font-semibold text-ink hover:bg-violet/10 hover:text-violet ${focusRing}`}
        >
          <span className="rounded-xs bg-violet/10 px-1.5 py-0.5 text-tag font-bold text-violet">{v.tag}</span>
          {v.title}
        </a>
      ))}
      <a href="#this-weeks-deals" className={`ml-auto inline-flex h-11 items-center px-3 text-label font-semibold text-brand-link hover:underline ${focusRing}`}>
        Skip to This Week&apos;s Deals
      </a>
    </nav>
  );
}

export function VariantLabel({ tag, title, why }: { tag: string; title: string; why: string }) {
  const proposed = tag !== "Live";
  return (
    <div className="mb-5 border-t-2 border-dashed border-violet/40 pt-4">
      <p className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <span className={`rounded-xs px-2 py-0.5 text-tag font-bold uppercase tracking-[0.08em] ${proposed ? "bg-violet text-white" : "bg-field text-ink"}`}>
          {proposed ? `Proposed · ${tag}` : "Inherited · live today"}
        </span>
        <span className="text-copy font-bold text-ink">{title}</span>
      </p>
      <p className="mt-1 max-w-[80ch] text-label text-muted">{why}</p>
    </div>
  );
}

/* ---------- A: weekly-ad grid ---------- */

const mobileShown = 6;

export function InStoreGrid() {
  const list = useTripList();
  const [filter, setFilter] = useState<InStoreCategory | "All">("All");
  const [expanded, setExpanded] = useState(false);
  const deals = filter === "All" ? inStoreDeals : inStoreDeals.filter((d) => d.category === filter);
  const chips: { key: InStoreCategory | "All"; icon: IconSvgElement; count: number }[] = [
    { key: "All", icon: DashboardSquare01Icon, count: inStoreDeals.length },
    ...inStoreCategories.map((c) => ({ key: c, icon: categoryIcons[c], count: inStoreDeals.filter((d) => d.category === c).length })),
  ];

  return (
    <section aria-labelledby="in-store-a-h">
      <header className="mb-5 flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
        <div>
          <InStoreChip />
          <h2 id="in-store-a-h" className="mt-2.5 font-serif text-h2 font-bold tracking-tight text-ink">
            In-store only deals
          </h2>
          <p className="mt-1 max-w-[62ch] text-copy text-body">Grab these on your next trip. They&apos;re priced at the register, so they can&apos;t go in an online order.</p>
          <AdMeta className="mt-2" />
        </div>
        <ListSummary count={list.saved.length} className="sm:text-right" />
      </header>

      <div role="tablist" aria-label="Filter in-store deals" className="mb-5 flex flex-wrap gap-2">
        {chips.map(({ key, icon, count }) => {
          const on = key === filter;
          return (
            <button
              key={key}
              role="tab"
              aria-selected={on}
              onClick={() => setFilter(key)}
              className={`inline-flex h-11 items-center gap-2 rounded-pill border px-3.5 text-ui transition-colors ${focusRing} ${
                on ? "border-brand bg-tint font-semibold text-brand" : "border-line bg-surface font-medium text-ink hover:border-brand/50 hover:text-brand"
              }`}
            >
              <HugeiconsIcon icon={icon} size={18} strokeWidth={1.6} aria-hidden className={on ? "" : "text-muted"} />
              {key}
              <span className={`text-fine ${on ? "text-brand" : "text-muted"}`}>{count}</span>
            </button>
          );
        })}
      </div>

      <ul className="m-0 grid list-none grid-cols-2 gap-3 p-0 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {deals.map((d, i) => (
          <li
            key={d.name}
            className={`group relative flex flex-col overflow-hidden rounded-card border border-line bg-surface shadow-card transition-[box-shadow,border-color] duration-[180ms] hover:border-brand/45 hover:shadow-[0_10px_26px_rgba(15,30,40,0.1)] ${
              !expanded && i >= mobileShown ? "max-sm:hidden" : ""
            }`}
          >
            <DealPhoto deal={d} sizes="(max-width: 640px) 45vw, 200px" className="aspect-square" />
            <SaveButton deal={d} saved={list.isSaved(d.name)} onToggle={() => list.toggle(d.name)} className="absolute right-2 top-2 shadow-card" />
            {/* Price tag overlaps the photo like a shelf sticker */}
            <div className="relative z-[1] -mt-6 ml-2.5 self-start rounded-sm bg-accent px-2.5 py-1.5 text-white shadow-add">
              <AdPrice price={d.price} className="text-ad-price" />
            </div>
            <div className="flex flex-1 flex-col gap-1 px-3 pb-3 pt-2">
              <h3 className="line-clamp-2 text-ui font-semibold leading-[1.3] text-ink">{d.name}</h3>
              <span className="mt-auto inline-flex items-center gap-1 text-fine text-muted">
                <HugeiconsIcon icon={categoryIcons[d.category]} size={14} strokeWidth={1.6} aria-hidden /> {d.category}
              </span>
            </div>
          </li>
        ))}
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

/* ---------- B: compact rail ---------- */

export function InStoreRail() {
  const list = useTripList();
  const rail = useRef<HTMLUListElement>(null);
  const scroll = (dir: 1 | -1) => rail.current?.scrollBy({ left: dir * rail.current.clientWidth * 0.8, behavior: "smooth" });
  const allSaved = list.saved.length === inStoreDeals.length;

  return (
    <section aria-labelledby="in-store-b-h" className="grid gap-3 lg:grid-cols-[17rem_1fr]">
      {/* Lead panel: the store's red, like the info bar */}
      <div className="flex flex-col gap-3 rounded-panel bg-accent p-5 text-white max-lg:flex-row max-lg:flex-wrap max-lg:items-end max-lg:justify-between max-lg:gap-x-6">
        <div className="max-lg:min-w-[15rem] max-lg:flex-1">
          <InStoreChip inverted />
          <h2 id="in-store-b-h" className="mt-3 font-serif text-card-title font-bold leading-tight">
            In-store only deals
          </h2>
          <p className="mt-1.5 text-label text-white/90">
            {inStoreDeals.length} deals at {storeName}, {adWeek.from} – {adWeek.to}. Priced at the register, not online.
          </p>
        </div>
        <div className="flex flex-col gap-2 lg:mt-auto">
          <button
            type="button"
            onClick={list.addAll}
            disabled={allSaved}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-surface px-4 text-ui font-bold text-accent outline-none hover:bg-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-default disabled:opacity-80"
          >
            <HugeiconsIcon icon={allSaved ? Tick02Icon : BookmarkAdd01Icon} size={18} strokeWidth={1.8} aria-hidden />
            {allSaved ? "All on your list" : "Save all to my list"}
          </button>
          <p aria-live="polite" className="text-fine text-white/90">
            {list.saved.length} saved ·{" "}
            <a href="#" className="font-semibold text-white underline underline-offset-2 outline-none focus-visible:outline-2 focus-visible:outline-white">
              Sign in to keep them
            </a>
          </p>
        </div>
      </div>

      <div className="relative min-w-0 rounded-panel border border-line bg-surface p-3">
        <ul
          ref={rail}
          aria-label="In-store deals"
          className="m-0 flex list-none snap-x snap-mandatory scroll-px-3 gap-3 overflow-x-auto p-0 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {inStoreDeals.map((d) => (
            <li key={d.name} className="relative flex w-[clamp(150px,40vw,176px)] flex-none snap-start flex-col">
              <DealPhoto deal={d} sizes="176px" className="aspect-square rounded-card" />
              <SaveButton deal={d} saved={list.isSaved(d.name)} onToggle={() => list.toggle(d.name)} className="absolute right-1.5 top-1.5" />
              <AdPrice price={d.price} className="mt-2 text-ad-price text-accent" />
              <h3 className="mt-1 line-clamp-2 text-ui font-semibold leading-[1.3] text-ink">{d.name}</h3>
              <span className="mt-0.5 text-fine text-muted">{d.category}</span>
            </li>
          ))}
        </ul>
        <div className="pointer-events-none absolute inset-y-0 left-0 right-0 hidden items-center justify-between px-1 sm:flex">
          {[
            { dir: -1 as const, icon: ArrowLeft01Icon, label: "Previous deals" },
            { dir: 1 as const, icon: ArrowRight01Icon, label: "More deals" },
          ].map(({ dir, icon, label }) => (
            <button
              key={label}
              type="button"
              aria-label={label}
              onClick={() => scroll(dir)}
              className={`pointer-events-auto -mt-16 inline-flex size-11 items-center justify-center rounded-full border border-line bg-surface text-ink shadow-pill hover:text-brand ${focusRing}`}
            >
              <HugeiconsIcon icon={icon} size={20} strokeWidth={1.8} aria-hidden />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- C: featured deal + trip list ---------- */

const featuredName = "Boneless New York Strip Steak";

export function InStoreTripList() {
  const list = useTripList();
  const featured = inStoreDeals.find((d) => d.name === featuredName)!;
  const rest = inStoreDeals.filter((d) => d !== featured);
  const total = inStoreDeals
    .filter((d) => list.isSaved(d.name))
    .reduce((sum, d) => sum + Number(d.price.replace("$", "")), 0);
  const featuredSaved = list.isSaved(featured.name);

  return (
    <section aria-labelledby="in-store-c-h">
      <header className="mb-5">
        <h2 id="in-store-c-h" className="flex flex-wrap items-center gap-x-3 gap-y-2 font-serif text-h2 font-bold tracking-tight text-ink">
          In-store only deals <InStoreChip />
        </h2>
        <AdMeta className="mt-2" />
      </header>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        {/* Featured deal */}
        <article className="relative flex flex-col overflow-hidden rounded-panel border border-line bg-surface shadow-card">
          <DealPhoto deal={featured} sizes="(max-width: 1024px) 100vw, 460px" className="aspect-[4/3] sm:aspect-[2/1] lg:aspect-auto lg:flex-1" />
          <span className="absolute left-4 top-4 rounded-pill border border-line bg-surface px-3 py-1 text-tag font-bold uppercase tracking-[0.06em] text-ink shadow-card">
            Deal of the week
          </span>
          <div className="flex flex-wrap items-end justify-between gap-3 border-t border-line p-5">
            <div className="min-w-0">
              <h3 className="text-panel font-bold text-ink">{featured.name}</h3>
              <p className="text-label text-muted">{featured.category} counter</p>
            </div>
            <AdPrice price={featured.price} className="text-ad-price-lg text-accent" />
            <button
              type="button"
              aria-pressed={featuredSaved}
              onClick={() => list.toggle(featured.name)}
              className={`inline-flex h-11 w-full items-center justify-center gap-2 rounded-md text-copy font-bold ${focusRing} ${
                featuredSaved ? "border border-brand bg-tint text-brand" : "bg-brand text-white hover:brightness-[1.08]"
              }`}
            >
              <HugeiconsIcon icon={featuredSaved ? BookmarkCheck01Icon : BookmarkAdd01Icon} size={18} strokeWidth={1.8} aria-hidden />
              {featuredSaved ? "On your in-store list" : "Add to my in-store list"}
            </button>
          </div>
        </article>

        {/* Checklist, grouped like store aisles */}
        <div className="flex min-w-0 flex-col rounded-panel border border-line bg-surface">
          <div className="flex flex-col gap-4 p-4">
            {inStoreCategories.map((c) => {
              const items = rest.filter((d) => d.category === c);
              if (!items.length) return null;
              return (
                <section key={c} aria-label={c}>
                  <h3 className="mb-1.5 inline-flex items-center gap-1.5 text-fine font-bold uppercase tracking-[0.08em] text-muted">
                    <HugeiconsIcon icon={categoryIcons[c]} size={15} strokeWidth={1.8} aria-hidden /> {c} · {items.length}
                  </h3>
                  <ul className="m-0 grid list-none gap-x-3 gap-y-1 p-0 sm:grid-cols-2">
                    {items.map((d) => {
                      const on = list.isSaved(d.name);
                      return (
                        <li key={d.name}>
                          <label
                            className={`flex min-h-[60px] cursor-pointer items-center gap-3 rounded-card px-2 py-1.5 transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-1 has-[:focus-visible]:outline-brand ${
                              on ? "bg-tint" : "hover:bg-tint/60"
                            }`}
                          >
                            <input type="checkbox" checked={on} onChange={() => list.toggle(d.name)} className="peer sr-only" />
                            <DealPhoto deal={d} sizes="96px" zoom className="size-12 flex-none rounded-sm" />
                            <span className="min-w-0 flex-1 text-ui font-medium leading-[1.3] text-ink">{d.name}</span>
                            <span className="text-copy font-extrabold text-accent">{d.price}</span>
                            <span
                              aria-hidden
                              className={`inline-flex size-6 flex-none items-center justify-center rounded-full border-[1.5px] ${
                                on ? "border-brand bg-brand text-white" : "border-line bg-surface text-transparent"
                              }`}
                            >
                              <HugeiconsIcon icon={Tick02Icon} size={14} strokeWidth={2.4} />
                            </span>
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              );
            })}
          </div>

          <div className="mt-auto flex flex-wrap items-center justify-between gap-3 rounded-b-panel border-t border-line bg-field/50 px-4 py-3">
            <p aria-live="polite" className="text-label text-body">
              {list.saved.length === 0 ? (
                "Tick deals to plan your store trip."
              ) : (
                <>
                  <strong className="font-bold text-ink">{list.saved.length} on your list</strong> · about ${total.toFixed(2)} at the register
                </>
              )}
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <a href="#" className={`inline-flex h-11 items-center px-2 text-label font-semibold text-brand-link hover:underline ${focusRing}`}>
                Sign in to keep it
              </a>
              {/* Intentionally inert on this preview page */}
              <button
                type="button"
                disabled={list.saved.length === 0}
                className={`inline-flex h-11 items-center rounded-md bg-brand px-4 text-ui font-bold text-white hover:brightness-[1.08] disabled:cursor-not-allowed disabled:bg-field disabled:text-muted ${focusRing}`}
              >
                Send list to my phone
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
