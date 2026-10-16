import { Newspaper, Ticket } from "lucide-react";
import Image from "next/image";
import { user } from "../_data";
import { AdCarousel } from "./ad-carousel";
import { Swoosh } from "./swoosh";

// Mirrors the live .hero-clean / .hero-cta rules; the promo tiles are PROPOSED
// as a single carousel of full-bleed ads (see ad-carousel.tsx).

const cta =
  "inline-flex items-center gap-[9px] rounded-pill px-[26px] py-[13px] text-[clamp(14px,1.3vw,15.5px)] font-bold leading-none text-white shadow-pill hover:brightness-[1.06] max-[720px]:px-[18px] max-[720px]:py-3 max-[720px]:text-copy";

export function Hero() {
  return (
    <section className="flex min-h-[clamp(200px,24vw,300px)] flex-col justify-center px-4 pb-[clamp(24px,3.5vw,44px)] pt-[clamp(26px,4vw,52px)] text-center max-[720px]:min-h-0 max-[720px]:px-3.5 max-[720px]:pb-6 max-[720px]:pt-[26px]">
      <div className="relative z-[1] mx-auto max-w-[760px]">
        <p className="font-serif text-md font-semibold text-body">Good afternoon, {user.name}!</p>
        <h1 className="mb-2.5 font-serif text-hero font-bold leading-[1.08] tracking-[-0.01em] text-ink">
          What are we{" "}
          <span className="relative px-1.5 font-script text-[1.32em] font-normal leading-[0.9] text-success">
            Shopping
            <Swoosh className="pointer-events-none absolute bottom-[-0.02em] left-1 right-1 h-[0.3em] w-[calc(100%-8px)] overflow-visible" />
          </span>{" "}
          for today?
        </h1>
        <p className="mx-auto max-w-[520px] text-md text-body">
          Your AI grocery assistant for meal ideas, savings, recipes, and stress-free shopping.
        </p>
        <div className="mt-[clamp(18px,3vw,28px)] flex flex-wrap justify-center gap-3.5 max-[720px]:gap-2.5">
          <a href="#" className={`${cta} bg-success`}>
            <Newspaper size={16} aria-hidden /> This week&apos;s Sales Ad
          </a>
          <a href="#" className={`${cta} bg-brand`}>
            <Ticket size={16} aria-hidden /> This week&apos;s Coupons
          </a>
        </div>
      </div>
    </section>
  );
}

// PROPOSED: each ad is one full-bleed image (2.5:1 source). The art carries its own
// headline and UI, so the slide is just a link; object-cover trims the edges when
// the banner is narrower or taller than 2.5:1.
const ads = [
  { src: "/ads/ad-ai-basket.jpg", alt: "Ask Breezy: build a high-protein grocery basket for a family of 4" },
  { src: "/ads/ad-shop-fresh.jpg", alt: "Shop fresh everywhere: Organic Farm Basket" },
  { src: "/ads/ad-fresh-daily.jpg", alt: "Freshness delivered daily: organic strawberries, $3.99 per pound" },
];

/** PROPOSED: the three live promo tiles merged into one rotating ad slot. */
export function PromoCards() {
  const slides = ads.map(({ src, alt }, i) => (
    <a key={src} href="#" className="relative block h-full overflow-hidden bg-promo-sage">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 800px) 100vw, 760px"
        priority={i === 0}
        draggable={false}
        className="object-cover"
      />
      {/* Inherited from the live tiles: marks the slot as a retail-media-network placement. */}
      <span className="absolute right-2.5 top-2.5 z-[3] rounded-xs bg-white/85 px-[9px] py-[3px] text-tag font-semibold text-ad-tag opacity-90">
        RMN ad placement
      </span>
    </a>
  ));

  return (
    // PROPOSED size: centered under the hero copy; fills its column up to 760px.
    <div className="mx-auto mt-[clamp(8px,1.5vw,20px)] w-full max-w-[760px]">
      <AdCarousel slides={slides} label="Featured ads" />
    </div>
  );
}
