import type { Metadata } from "next";
import Image from "next/image";
import { Departments } from "./_components/departments";
import { SiteFooter, TrustStrip } from "./_components/footer";
import { BreezyFab, ForYou } from "./_components/floating";
import { InfoBar, SiteHeader } from "./_components/header";
import { Hero, PromoCards } from "./_components/hero";

export const metadata: Metadata = {
  title: "BA-1641",
};

/**
 * Faithful (inherited) rebuild of the live homepage — the "before" baseline.
 * Layout and type follow the live stylesheet; images come from the live site
 * (public/live); all data is mock (see ./_data.ts).
 */
export default function Page() {
  return (
    <>
      <SiteHeader />
      <InfoBar />

      <div className="relative">
        {/* .home-clean .page-bg: store photo at 15% opacity, fading out from 72% */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[clamp(520px,64vw,900px)] opacity-15 [mask-image:linear-gradient(180deg,#000_72%,transparent)]"
        >
          <Image src="/live/hero-bg.jpg" alt="" fill priority sizes="100vw" className="object-cover" />
        </div>
        {/*
          PROPOSED hero layout. Copy + CTAs with the ad banner centered right under
          them, one stack, whether For you is open or closed. While the panel is
          docked (right-3, 430px) the stack is centered in the space beside it, and
          .home-hero reserves the panel's height.
        */}
        <div className="relative mx-auto grid w-full max-w-site grid-cols-[minmax(0,1fr)] px-[clamp(14px,4vw,32px)] pb-[clamp(28px,5vw,44px)] docked:max-w-none docked:grid-cols-[minmax(0,1fr)_430px] docked:gap-x-[clamp(24px,3vw,48px)] docked:pr-3">
          <div className="col-start-1 row-start-1 flex flex-col">
            <Hero />
            <PromoCards />
          </div>
          {/* .home-hero: the For you panel stretches this to its own height (see floating.tsx).
              Undocked it shares the copy's cell, so it stretches the band like on the live site. */}
          <div className="home-hero col-start-1 row-start-1 docked:col-start-2" />
        </div>

        {/* flex-col: live sections sit in grid cells, so their margins add up instead of collapsing */}
        <main className="relative mx-auto flex w-full max-w-site flex-col px-[clamp(14px,4vw,32px)]">
          <Departments />
        </main>
      </div>

      <TrustStrip />
      <SiteFooter />

      <ForYou />
      <BreezyFab />
    </>
  );
}
