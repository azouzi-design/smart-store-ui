"use client";

import {
  AiMagicIcon,
  BeerIcon,
  CarrotIcon,
  CroissantIcon,
  DetergentIcon,
  MilkCartonIcon,
  SandwichIcon,
  ShoppingBasket01Icon,
  SteakIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import { useState } from "react";
import { departments } from "../_data";

// Same Hugeicons (free set) as the desktop departments list in /ba-1639-ba-1642.
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

/** Short labels for the tile variant, where names sit under a 56px icon. */
const shortLabel: Record<string, string> = { "Recommended For You": "For You" };

export type ChipVariant = "tinted" | "tiles";

const row = "flex overflow-x-auto px-[22px] pt-[7px] [scrollbar-width:none]";

export function DepartmentChips({ variant }: { variant: ChipVariant }) {
  const [active, setActive] = useState(departments[0]);

  if (variant === "tiles") {
    // PROPOSED C: round icon tiles with the name underneath, like a shelf of aisles.
    return (
      <nav aria-label="Departments" className={`${row} gap-1 pb-1`}>
        {departments.map((d) => {
          const on = d === active;
          return (
            <button
              key={d}
              type="button"
              aria-pressed={on}
              onClick={() => setActive(d)}
              className="flex w-[68px] shrink-0 flex-col items-center gap-[6px] text-center"
            >
              <span
                className={`grid size-14 place-items-center rounded-full transition-colors ${
                  on ? "bg-brand text-white shadow-chip" : "bg-tint text-brand"
                }`}
              >
                <HugeiconsIcon icon={icons[d]} size={26} strokeWidth={1.6} aria-hidden />
              </span>
              <span className={`text-[11.5px] leading-[14px] ${on ? "font-semibold text-brand" : "font-medium text-m-ink"}`}>
                {shortLabel[d] ?? d}
              </span>
            </button>
          );
        })}
      </nav>
    );
  }

  return (
    <nav aria-label="Departments" className={`${row} gap-2.5`}>
      {departments.map((d) => {
        const on = d === active;
        const base = "flex h-9 shrink-0 items-center rounded-pill text-[13.5px] transition-colors";
        // PROPOSED B: borderless tinted pills; the icon sits in its own white disc.
        const look = on
          ? "gap-2 bg-brand pl-1 pr-[15px] font-medium text-white shadow-chip [&>span]:bg-white/20"
          : "gap-2 bg-tint pl-1 pr-[15px] font-medium text-m-ink [&>span]:bg-surface [&>span]:text-brand";
        return (
          <button key={d} type="button" aria-pressed={on} onClick={() => setActive(d)} className={`${base} ${look}`}>
            <span className="grid size-7 place-items-center rounded-full">
              <HugeiconsIcon icon={icons[d]} size={16} strokeWidth={1.8} aria-hidden />
            </span>
            {d}
          </button>
        );
      })}
    </nav>
  );
}
