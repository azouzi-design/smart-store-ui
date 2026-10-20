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
    <section className="flex min-h-[clamp(200px,24vw,300px)] flex-col justify-center px-4 pb-[clamp(36px,5vw,72px)] pt-[clamp(40px,6vw,88px)] text-center max-[720px]:min-h-0 max-[720px]:px-3.5 max-[720px]:pb-6 max-[720px]:pt-[26px]">
      <div className="relative z-[1] mx-auto max-w-[760px]">
        <p className="font-serif text-md font-semibold text-body">Good afternoon, {user.name}!</p>
        <h1 className="mb-2.5 font-serif text-hero font-bold leading-[1.08] tracking-[-0.01em] text-ink">
          {/* PROPOSED (BA-1649): "Shopping" always starts the second line */}
          What are we
          <br />
          <span className="relative px-1.5 font-script text-[1.32em] font-normal leading-[0.9] text-success">
            Shopping
            <Swoosh className="pointer-events-none absolute bottom-[-0.02em] left-1 right-1 h-[0.3em] w-[calc(100%-8px)] overflow-visible" />
          </span>{" "}
          for today?
        </h1>
        <p className="mx-auto max-w-[520px] text-balance text-md text-body">
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

// PROPOSED (BA-1649): fall-season ads, designed at the banner's own 10:3 shape
// (1200×360 frame, exported @4x), so on wide screens each one fills the banner exactly, uncropped.
// The art carries its own headline and CTA, so the slide is just a link.
// - focusX: horizontal focus on phones, where the banner keeps its height and
//   crops the sides; points at each ad's headline
const ads = [
  { src: "/ads/ad-fall-season-1.png", focusX: 100, alt: "From Stewart Farms: featured local item, pumpkins. Shop today" },
  { src: "/ads/ad-fall-season-2.png", focusX: 0, alt: "Easy recipes and quality ingredients, all in one place" },
  { src: "/ads/ad-fall-season-3.png", focusX: 50, alt: "Freshly delivered fall season food" },
];

/** PROPOSED: the three live promo tiles merged into one rotating ad slot. */
export function PromoCards() {
  const slides = ads.map(({ src, focusX, alt }, i) => (
    <a key={src} href="#" className="relative block h-full overflow-hidden bg-promo-sage">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 1200px) 100vw, 1136px"
        quality={90}
        priority={i === 0}
        draggable={false}
        className="object-cover"
        style={{ objectPosition: `${focusX}% center` }}
      />
      {/* Inherited from the live tiles: marks the slot as a retail-media-network placement. */}
      <span className="absolute right-2.5 top-2.5 z-[3] rounded-xs bg-white/85 px-[9px] py-[3px] text-tag font-semibold text-ad-tag opacity-90">
        RMN ad placement
      </span>
    </a>
  ));

  return (
    // PROPOSED size (BA-1649): spans the same container as Departments, at 3.33:1, the same shape as the ad art.
    <div className="w-full">
      <AdCarousel slides={slides} label="Featured ads" />
    </div>
  );
}
