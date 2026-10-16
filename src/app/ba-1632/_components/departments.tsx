import { ArrowRight, ArrowUpDown, ChevronDown, ChevronRight, Funnel, Plus } from "lucide-react";
import Image from "next/image";
import { departments, products, totalItems, type Product } from "../_data";

function ProductImage({ name, src }: { name: string; src: string }) {
  return (
    <div className="relative mx-auto size-[212px] shrink-0">
      <Image src={src} alt={name} fill sizes="212px" className="object-contain" />
      <button
        aria-label={`Add ${name}`}
        className="absolute right-2 top-2 grid size-10 place-items-center rounded-full bg-brand text-white shadow-add"
      >
        <Plus size={20} aria-hidden />
      </button>
      <span className="absolute right-0 top-[84px] rounded-l-[4px] bg-success py-[3px] pl-3 pr-2 text-micro font-extrabold text-white [clip-path:polygon(8px_0,100%_0,100%_100%,8px_100%,0_50%)]">
        SALE
      </span>
    </div>
  );
}

function ProductCard({ p }: { p: Product }) {
  return (
    <article className="flex min-h-[340px] flex-col rounded-card border border-line bg-surface p-3 shadow-card">
      <ProductImage name={p.name} src={p.img} />
      <div className="mt-5 flex flex-1 flex-col border-t border-line/60 pt-2.5">
        <div className="flex items-baseline gap-1.5">
          <span className="text-lead font-extrabold text-success">{p.price}</span>
          <s className="text-label font-medium text-muted">{p.was}</s>
        </div>
        <h3 className="mt-1 line-clamp-2 text-ui font-normal leading-[1.3] text-ink">{p.name}</h3>
        <span className="mt-1 text-tag text-unit">{p.unit}</span>
      </div>
    </article>
  );
}

export function Departments() {
  return (
    <section className="mt-16">
      <h2 className="font-serif text-h2 font-bold tracking-[-0.01em] text-brand">Departments</h2>

      <div className="mt-[18px] flex items-start justify-between gap-6">
        <div className="relative min-w-0 flex-1">
          <div role="tablist" className="flex gap-6 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {departments.map((d, i) => (
              <button
                key={d}
                role="tab"
                aria-selected={i === 0}
                className={`shrink-0 border-b-2 px-1 pb-[9px] pt-2.5 text-copy font-medium tracking-[0.01em] ${
                  i === 0 ? "border-brand text-brand" : "border-transparent text-muted"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
          <button
            aria-label="Scroll departments"
            className="absolute right-0 top-2 grid size-[26px] place-items-center rounded-full border border-line bg-surface text-ink"
          >
            <ChevronRight size={14} aria-hidden />
          </button>
        </div>
        <button className="mt-2.5 flex shrink-0 items-center gap-1 py-1 text-label font-medium text-ink">
          Shop All Categories <ChevronDown size={14} aria-hidden />
        </button>
      </div>

      <div className="mt-2 flex items-center justify-end gap-3 border-b border-line pb-2.5">
        <span className="text-copy text-muted">{totalItems} results · {totalItems} on sale</span>
        <button className="flex h-10 items-center gap-2 rounded-card border border-line bg-surface px-3.5 text-ui font-semibold text-ink">
          <Funnel size={15} aria-hidden /> Filter
        </button>
        <button className="flex h-10 w-[173px] items-center gap-2 rounded-card border border-line bg-surface pl-3.5 pr-2 text-ui font-semibold text-ink">
          <ArrowUpDown size={15} aria-hidden /> Featured
          <ChevronDown size={15} className="ml-auto" aria-hidden />
        </button>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.name} p={p} />
        ))}
      </div>

      <div className="mt-7 flex justify-center">
        <a
          href="#"
          className="flex h-10 items-center gap-2 rounded-pill border-[1.5px] border-brand bg-surface px-[22px] text-copy font-bold text-brand"
        >
          View all {totalItems} items <ArrowRight size={15} aria-hidden />
        </a>
      </div>
    </section>
  );
}
