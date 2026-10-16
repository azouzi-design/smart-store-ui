import { MapPin, Newspaper, Ticket } from "lucide-react";
import Image from "next/image";
import { user } from "../_data";
import { AdCarousel } from "./ad-carousel";
import { Swoosh } from "./swoosh";

// Mirrors the live .hero-clean / .hero-cta / .ptile-* rules; the promo tiles
// are PROPOSED as a single carousel (see ad-carousel.tsx).

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

function TileImage({ src }: { src: string }) {
  return (
    <div className="absolute right-0 top-0 h-full w-[46%]">
      <Image src={src} alt="" fill sizes="(max-width: 900px) 46vw, 560px" className="object-cover" draggable={false} />
    </div>
  );
}

function AdTag() {
  return (
    <span className="absolute right-2.5 top-2.5 z-[3] rounded-xs bg-white/85 px-[9px] py-[3px] text-tag font-semibold text-ad-tag opacity-90">
      RMN ad placement
    </span>
  );
}

// Radius and shadow now live on the carousel viewport, not on each ad.
const tile = "relative block h-full overflow-hidden text-ink";
const body = "relative z-[2] flex h-full w-[58%] flex-col gap-[5px] p-5";
const tileTitle = "font-serif text-card-title font-bold leading-[1.1]";
const tileCta =
  "mt-auto inline-flex items-center self-start rounded-pill px-[18px] py-[9px] text-ui font-bold shadow-chip";

/** PROPOSED: the three live promo tiles merged into one rotating ad slot. */
export function PromoCards() {
  const slides = [
    <a key="healthier" href="#" className={`${tile} bg-promo-sage`}>
      <AdTag />
      <div className={body}>
        <span className={tileTitle}>Healthier, Cheaper, Better.</span>
        <span className={`${tileCta} bg-white text-success-deep`}>Shop Today</span>
      </div>
      <TileImage src="/live/promo-healthier.png" />
    </a>,

    <a key="local" href="#" className={`${tile} bg-promo-cream`}>
      <div className={body}>
        <span className="text-label font-bold">Featured local item</span>
        <span className="mt-[5px] flex items-center gap-1 text-small opacity-85">
          <MapPin size={12} aria-hidden /> From Stewart Farms
        </span>
      </div>
      <TileImage src="/live/promo-local.jpg" />
    </a>,

    <a key="inspiration" href="#" className={`${tile} bg-promo-lilac`}>
      <AdTag />
      <div className={body}>
        <span className={tileTitle}>Fresh inspiration delivered</span>
        <span className="text-label opacity-90">Easy recipes and quality ingredients, all in one place</span>
        <span className={`${tileCta} bg-violet text-white`}>Learn More</span>
      </div>
      <TileImage src="/live/promo-inspiration.png" />
    </a>,
  ];

  return (
    // PROPOSED size: centered under the hero copy; fills its column up to 760px.
    <div className="mx-auto mt-[clamp(8px,1.5vw,20px)] w-full max-w-[760px]">
      <AdCarousel slides={slides} label="Featured ads" />
    </div>
  );
}
