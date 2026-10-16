import type { Metadata } from "next";
import Image from "next/image";
import { Departments } from "./_components/departments";
import { SiteFooter, TrustStrip } from "./_components/footer";
import { BreezyFab, ForYou } from "./_components/floating";
import { InfoBar, SiteHeader } from "./_components/header";
import { Hero, PromoCards } from "./_components/hero";

export const metadata: Metadata = {
  title: "BA-1632 — Homepage rebuild",
};

/**
 * Faithful (inherited) rebuild of the live homepage — the "before" baseline.
 * Images come from the live site (public/live); all data is mock (see ./_data.ts).
 */
export default function Page() {
  return (
    <>
      <SiteHeader />
      <InfoBar />

      <div className="relative">
        {/* Store photo at 15% opacity, fading to white — as on the live page */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-[685px] opacity-15 [mask-image:linear-gradient(to_bottom,black_60%,transparent)]"
        >
          <Image src="/live/hero-bg.jpg" alt="" fill priority sizes="100vw" className="object-cover" />
        </div>
        <main className="relative mx-auto max-w-site px-8">
          <Hero />
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
