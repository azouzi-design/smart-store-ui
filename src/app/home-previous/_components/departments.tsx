import { ArrowRight, ArrowUpDown, ChevronDown, Funnel } from "lucide-react";
import Image from "next/image";
import { departments, previewCount, products, totalItems, type Product } from "../_data";

// Mirrors the live .sec.shop / .shop-controls / .dtab / .grid / .ipc-* rules.

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

export function Departments() {
  return (
    <section className="mt-[clamp(10px,2vw,22px)]">
      <h2 className="mb-[18px] font-serif text-h2 font-bold tracking-[-0.01em] text-ink">Departments</h2>

      <div className="mb-5 mt-1 flex flex-wrap items-end justify-between gap-x-4 gap-y-2 border-b border-line">
        <div className="flex min-w-0 flex-[1_1_100%] items-start gap-4 max-[640px]:gap-2.5">
          <div className="relative -mx-[30px] min-w-0 flex-1 px-[30px] max-[640px]:mx-0 max-[640px]:px-0">
            <div
              role="tablist"
              className="flex gap-1 overflow-x-auto pb-1.5 pt-0.5 [mask-image:linear-gradient(to_right,#000_calc(100%-28px),transparent)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {departments.map((d, i) => (
                <button
                  key={d}
                  role="tab"
                  aria-selected={i === 0}
                  className={`mr-5 inline-flex flex-none items-center justify-center whitespace-nowrap border-b-2 px-1 pb-[9px] pt-2.5 text-copy font-medium tracking-[0.01em] max-[640px]:min-w-[70px] max-[640px]:px-2.5 max-[640px]:pb-[7px] max-[640px]:pt-2 max-[640px]:text-[11.5px] ${
                    i === 0 ? "border-brand text-brand" : "border-transparent text-muted hover:text-ink"
                  }`}
                >
                  <span className="leading-[1.1]">{d}</span>
                </button>
              ))}
            </div>
            <button
              aria-label="Scroll departments"
              className="absolute right-0 top-[46%] z-[2] flex size-[26px] -translate-y-1/2 items-center justify-center rounded-full border border-line bg-surface text-[17px] leading-none text-ink hover:border-brand hover:text-brand max-[640px]:hidden"
            >
              ›
            </button>
          </div>
          <div className="relative flex-none pt-2.5">
            <button className="inline-flex items-center gap-1 whitespace-nowrap py-1 text-label font-medium text-ink hover:text-brand">
              Shop All Categories <ChevronDown size={12} aria-hidden />
            </button>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-3 pb-2">
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
      </div>

      <div className={grid}>
        {products.slice(0, previewCount).map((p, i) => (
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
