"use client";

import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { type MobileProduct, products } from "../_data";

// INHERITED: the 2-up product grid. Quantities are local state so the steppers
// and "+ Add" buttons work; nothing is sent anywhere.

export function ProductGrid() {
  return (
    <ul className="mt-[14px] grid auto-rows-fr grid-cols-2 gap-3 px-[13px] pb-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </ul>
  );
}

function ProductCard({ product: p }: { product: MobileProduct }) {
  const [qty, setQty] = useState(p.qty);

  return (
    <li className="rounded-[14px] border border-m-line bg-surface px-[7px] pb-[10px] pt-[7px]">
      <div className="relative h-[130px]">
        <div className="absolute left-1/2 -translate-x-1/2" style={{ width: p.img.w, height: p.img.h, top: p.img.top }}>
          <Image src={p.img.src} alt={p.name} fill sizes="146px" className={p.img.cover ? "object-cover" : "object-contain"} />
        </div>

        {qty > 0 ? (
          <div className="absolute -bottom-[9px] right-0 flex h-[39px] w-[101px] items-center justify-between rounded-pill bg-brand px-1 text-white">
            <button type="button" onClick={() => setQty(qty - 1)} aria-label={`Remove one ${p.name}`} className="grid size-9 place-items-center">
              <Minus size={20} strokeWidth={2} aria-hidden />
            </button>
            <span aria-live="polite" className="text-[15px] font-medium">
              {qty}
            </span>
            <button type="button" onClick={() => setQty(qty + 1)} aria-label={`Add one ${p.name}`} className="grid size-9 place-items-center">
              <Plus size={20} strokeWidth={2} aria-hidden />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setQty(1)}
            aria-label={`Add ${p.name}`}
            className="absolute -bottom-[9px] right-0 flex h-[35px] items-center gap-[5px] rounded-pill bg-brand pl-[14px] pr-[16px] text-[14.5px] font-medium text-white"
          >
            <Plus size={18} strokeWidth={2.2} aria-hidden />
            Add
          </button>
        )}
      </div>

      <div className="pt-3 text-m-ink">
        {p.approx && <p className="mb-[3px] text-[11px] leading-4 text-m-muted">approx.</p>}
        <p className="text-[17px] font-semibold leading-[22px] tracking-tight">
          {p.price}
          <span className={`text-[12px] font-normal ${p.unit === "ea" ? "ml-[3px]" : ""}`}>{p.unit}</span>
        </p>
        <h3 className="mt-0.5 line-clamp-2 text-[13.5px] font-normal leading-[18px]">{p.name}</h3>
        {p.perUnit && <p className="mt-0.5 text-[11.5px] leading-4 text-m-muted">{p.perUnit}</p>}
      </div>
    </li>
  );
}
