import type { Metadata } from "next";
import { CouponsOnCard } from "./_components/coupons";
import { BreezyFab, ForYou } from "./_components/floating";
import { SiteFooter } from "./_components/footer";
import { InfoBar, SiteHeader } from "./_components/header";
import { InStoreDeals } from "./_components/in-store-deals";
import { ThisWeeksDeals } from "./_components/this-weeks-deals";

export const metadata: Metadata = {
  title: "BA-1638 — Weekly deals",
};

/**
 * Faithful (inherited) rebuild of the live Weekly Ad page — the "before" baseline.
 * Images come from the live site (public/live); all data is mock (see ./_data.ts).
 */
export default function Page() {
  return (
    <>
      <SiteHeader />
      <InfoBar />

      <main className="mx-auto w-full max-w-site px-[clamp(14px,4vw,32px)] pt-[clamp(24px,4vw,44px)]">
        <InStoreDeals />
        <ThisWeeksDeals />
        <CouponsOnCard />
      </main>

      <SiteFooter />

      <ForYou />
      <BreezyFab />
    </>
  );
}
