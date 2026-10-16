import type { Metadata } from "next";
import { CouponsOnCard } from "./_components/coupons";
import { BreezyFab, ForYou } from "./_components/floating";
import { SiteFooter } from "./_components/footer";
import { InfoBar, SiteHeader } from "./_components/header";
import { InStoreDeals } from "./_components/in-store-deals";
import { InStoreGrid, InStoreRail, InStoreTripList, VariantLabel, VariantNav } from "./_components/in-store-proposals";
import { ThisWeeksDeals } from "./_components/this-weeks-deals";

export const metadata: Metadata = {
  title: "BA-1638 ideation — Weekly deals",
};

/**
 * Rebuild of the live Weekly Ad page. Header, footer and coupons are inherited.
 * PROPOSED: "In-store only deals" shows the live section, then directions A–C
 * stacked for comparison; "This Week's Deals" uses the BA-1639 + BA-1642 side rail.
 * Images come from the live site (public/live); all data is mock (see ./_data.ts).
 */
export default function Page() {
  return (
    <>
      <SiteHeader />
      <InfoBar />

      <main className="mx-auto w-full max-w-site px-[clamp(14px,4vw,32px)] pt-[clamp(24px,4vw,44px)]">
        <VariantNav />

        <div id="in-store-live" className="scroll-mt-24">
          <VariantLabel tag="Live" title="Inherited" why="As on the live page today: 16:9 crops, blue prices, inconsistent department labels and a sign-in button on every card." />
          <InStoreDeals />
        </div>

        <div id="in-store-a" className="mt-16 scroll-mt-24">
          <VariantLabel
            tag="A"
            title="Weekly-ad grid"
            why="Reads like the printed ad: uncropped photos, red shelf-tag prices, category chips that match the departments pattern, and one save action per deal. Phones show 6 deals, then “Show all”."
          />
          <InStoreGrid />
        </div>

        <div id="in-store-b" className="mt-16 scroll-mt-24">
          <VariantLabel
            tag="B"
            title="Compact rail"
            why="One swipeable row next to a red store panel, so the whole section stays under ~330px and This Week's Deals (the shoppable part) starts higher on the page. Save all in one tap."
          />
          <InStoreRail />
        </div>

        <div id="in-store-c" className="mt-16 scroll-mt-24">
          <VariantLabel
            tag="C"
            title="Trip list"
            why="Built for planning a store visit: a featured deal of the week, the rest grouped by aisle as a checklist, with a running total and a way to take the list with you."
          />
          <InStoreTripList />
        </div>

        <div className="mt-14 border-t border-line pt-2">
          <ThisWeeksDeals />
        </div>
        <CouponsOnCard />
      </main>

      <SiteFooter />

      <ForYou />
      <BreezyFab />
    </>
  );
}
