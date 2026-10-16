import type { Metadata } from "next";
import Image from "next/image";
import { Departments } from "./_components/departments";
import { SiteFooter, TrustStrip } from "./_components/footer";
import { BreezyFab, ForYou } from "./_components/floating";
import { InfoBar, SiteHeader } from "./_components/header";
import { Hero, PromoCards } from "./_components/hero";

export const metadata: Metadata = {
  title: "BA-1642",
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
        {/* flex-col: live sections sit in grid cells, so their margins add up instead of collapsing */}
        <main className="relative mx-auto flex w-full max-w-site flex-col px-[clamp(14px,4vw,32px)]">
          {/* .home-hero: the For you panel stretches this band to fit itself (see floating.tsx) */}
          <div className="home-hero">
            <Hero />
          </div>
          <PromoCards />
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
