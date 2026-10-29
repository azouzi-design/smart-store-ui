import { Newspaper, Ticket } from "lucide-react";
import { user } from "../_data";
import { Swoosh } from "./swoosh";

// Mirrors the live .hero-clean / .hero-cta rules; the promo tiles below the hero
// are PROPOSED as a single carousel of seasonal ads (see promo-cards.tsx).

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
