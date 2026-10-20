import { ChevronDown } from "lucide-react";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { AppHeader, AppTabBar } from "./_components/chrome";
import { type ChipVariant, DepartmentChips } from "./_components/department-chips";
import { ProductGrid } from "./_components/product-grid";
import { resultCount } from "./_data";

export const metadata: Metadata = {
  title: "Smart Store Mobile",
};

// INHERITED: the screenshot is Android, where the app renders in the system font, Roboto.
const roboto = Roboto({ variable: "--font-roboto", subsets: ["latin"] });

// B: borderless tinted pills, icons in a white disc. C: round icon tiles, names below.
const variants: { id: ChipVariant; label: string }[] = [
  { id: "tinted", label: "Proposed · B" },
  { id: "tiles", label: "Proposed · C" },
];

/**
 * INHERITED rebuild of the live mobile app's "Recommended For You" screen, from a
 * 720×1600 screenshot (2026-10-20), shown at 360×800 inside a PROPOSED phone frame
 * so mobile designs can be iterated on the web. On real phones (≤420px) the frame
 * drops away and each screen fills the viewport.
 *
 * Department chips: two PROPOSED directions with Hugeicons, one phone each. Phones are
 * drawn at 80% so both fit side by side on a laptop screen.
 */
export default function Page() {
  return (
    <main className={`${roboto.variable} min-h-dvh bg-canvas px-4 py-10 max-[420px]:p-0`}>
      <header className="mx-auto mb-8 max-w-page text-center max-[420px]:hidden">
        <h1 className="text-panel font-bold text-ink">Department chips</h1>
        <nav aria-label="Variants" className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1 text-label">
          {variants.map((v) => (
            <a key={v.id} href={`#${v.id}`} className="font-semibold text-brand-link underline underline-offset-4">
              {v.label}
            </a>
          ))}
        </nav>
      </header>

      <div className="flex flex-wrap justify-center gap-x-16 gap-y-12 max-[420px]:gap-0">
        {variants.map((v) => (
          <section key={v.id} id={v.id} aria-label={v.label} className="flex scroll-mt-6 flex-col items-center gap-3">
            <p className="text-label font-semibold text-ink max-[420px]:hidden">{v.label}</p>
            <Phone variant={v.id} />
          </section>
        ))}
      </div>
    </main>
  );
}

function Phone({ variant }: { variant: ChipVariant }) {
  return (
    // PROPOSED: device frame
    <div className="rounded-[54px] bg-device p-[11px] shadow-device min-[421px]:[zoom:0.8] max-[420px]:rounded-none max-[420px]:p-0 max-[420px]:shadow-none">
      <div className="flex h-[800px] w-[360px] flex-col overflow-hidden rounded-[43px] bg-surface font-mobile max-[420px]:h-dvh max-[420px]:w-screen max-[420px]:rounded-none">
        <AppHeader />

        <div className="min-h-0 flex-1 overflow-y-auto [scrollbar-width:none]">
          <DepartmentChips variant={variant} />

          <p className="mt-[6px] px-[22px] text-[11px] leading-[18px] text-m-muted">{resultCount} results</p>

          <div className="mt-[6px] flex gap-[9px] px-[22px]">
            <button type="button" className="h-[35px] rounded-pill border border-m-line bg-surface px-[11px] text-[13.5px] text-brand">
              On sale only
            </button>
            <button type="button" className="flex h-[35px] items-center gap-0.5 rounded-pill border border-m-line bg-surface pl-[11px] pr-2 text-[13.5px] text-brand">
              Sort: Featured
              <ChevronDown size={16} strokeWidth={2.4} aria-hidden />
            </button>
          </div>

          <ProductGrid />
        </div>

        <AppTabBar />
      </div>
    </div>
  );
}
