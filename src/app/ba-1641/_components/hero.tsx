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

// PROPOSED: each ad is one full-bleed image. The art carries its own headline and
// UI, so the slide is just a link.
// - ratio: the source image's width / height
// - zoom: how much taller than the banner the art is drawn (1 = whole ad, full height)
// - cropTop: share of the art's height cut from the top, chosen to keep the headline
//   and price/CTA areas inside the banner
const ads = [
  { src: "/ads/ad-shop-fresh.jpg", ratio: 2160 / 864, zoom: 1.19, cropTop: 0.025, alt: "Shop fresh everywhere: Organic Farm Basket" },
  { src: "/ads/ad-ai-basket.jpg", ratio: 2160 / 864, zoom: 1.34, cropTop: 0.13, alt: "Ask Breezy: build a high-protein grocery basket for a family of 4" },
  { src: "/ads/ad-fresh-daily.jpg", ratio: 2128 / 912, zoom: 1.15, cropTop: 0.055, alt: "Freshness delivered daily: organic strawberries, $3.99 per pound" },
];

// Banner shape on wide screens (see ad-carousel.tsx: aspect-[10/3]).
const BANNER_RATIO = 10 / 3;

// Progressive side blur: each layer blurs a narrower band at the edge, so the blur
// ramps up toward the extremities instead of sitting there as one flat block.
const BLUR_RAMP = [
  { className: "backdrop-blur-xs", reach: 1 },
  { className: "backdrop-blur-sm", reach: 0.66 },
  { className: "backdrop-blur-lg", reach: 0.33 },
];

/** CSS mask that is opaque at both edges and clear across the middle. */
function edgeMask(reach: number) {
  const solid = reach * 0.4;
  return `linear-gradient(90deg,#000 0%,#000 ${solid}%,transparent ${reach}%,transparent ${100 - reach}%,#000 ${100 - solid}%,#000 100%)`;
}

/** PROPOSED: the three live promo tiles merged into one rotating ad slot. */
export function PromoCards() {
  const slides = ads.map(({ src, ratio, zoom, cropTop, alt }, i) => {
    // % of the banner width left uncovered on each side by the (zoomed) art
    const side = Math.max(0, (1 - (zoom * ratio) / BANNER_RATIO) / 2) * 100;
    // the ramp starts a little inside the art so it also softens the seam
    const reach = side > 0 ? side + 5 : 0;
    return (
      <a key={src} href="#" className="relative block h-full overflow-hidden bg-promo-sage">
        {/* PROPOSED (BA-1649): the banner is wider than the art. Each ad is enlarged as far as
            its headline and price/CTA allow and centered; any side gap shows the art stretched
            to cover, under a blur that ramps up toward the edges. On narrow screens the art
            simply crops at the sides. */}
        <Image
          src={src}
          alt=""
          fill
          sizes="(max-width: 1200px) 100vw, 1136px"
          priority={i === 0}
          draggable={false}
          className="object-cover"
        />
        <div
          className="absolute left-1/2 -translate-x-1/2 [mask-image:linear-gradient(90deg,transparent,#000_7%,#000_93%,transparent)]"
          style={{ aspectRatio: ratio, height: `${zoom * 100}%`, top: `${-zoom * cropTop * 100}%` }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 1200px) 100vw, 1136px"
            priority={i === 0}
            draggable={false}
            className="object-cover"
          />
        </div>
        {reach > 0 &&
          BLUR_RAMP.map(({ className, reach: k }) => (
            <div
              key={className}
              aria-hidden
              className={`pointer-events-none absolute inset-0 max-[720px]:hidden ${className}`}
              style={{ maskImage: edgeMask(reach * k) }}
            />
          ))}
      </a>
    );
  });

  return (
    // PROPOSED size (BA-1649): spans the same container as Departments, at 3.33:1; ads are enlarged to fit, with a ramped side blur where needed.
    <div className="w-full">
      <AdCarousel slides={slides} label="Featured ads" />
    </div>
  );
}
