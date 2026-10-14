import { ImageIcon, MapPin, Newspaper, Ticket } from "lucide-react";
import { user } from "../_data";

export function Hero() {
  return (
    <section className="px-4 pb-[37px] pt-[43px] text-center">
      <p className="font-serif text-base font-semibold text-body">Good afternoon, {user.name}!</p>
      <h1 className="mt-1 font-serif text-hero font-bold leading-[1.08] tracking-[-0.01em] text-ink">
        What are we{" "}
        <span className="font-script text-[1.32em] font-normal text-success">Shopping</span> for
        today?
      </h1>
      <p className="mx-auto mt-2 max-w-[520px] text-base text-body">
        Your AI grocery assistant for meal ideas, savings, recipes, and stress-free shopping.
      </p>
      <div className="mt-7 flex flex-wrap justify-center gap-3.5">
        <a
          href="#"
          className="flex items-center gap-2 rounded-pill bg-success px-[26px] py-[13px] text-copy font-bold leading-[14px] text-white shadow-pill"
        >
          <Newspaper size={15} aria-hidden /> This week&apos;s Sales Ad
        </a>
        <a
          href="#"
          className="flex items-center gap-2 rounded-pill bg-brand px-[26px] py-[13px] text-copy font-bold leading-[14px] text-white shadow-pill"
        >
          <Ticket size={15} aria-hidden /> This week&apos;s Coupons
        </a>
      </div>
    </section>
  );
}

/** Placeholder for promo photography (live images are hosted on their servers). */
function PromoImage() {
  return (
    <div
      aria-hidden
      className="absolute inset-y-0 right-0 grid w-[149px] place-items-center bg-ink/10 text-muted"
    >
      <ImageIcon size={28} />
    </div>
  );
}

function AdTag() {
  return (
    <span className="absolute right-2.5 top-2.5 rounded-xs bg-white/85 px-[9px] py-[3px] text-tag font-semibold text-ad-tag">
      RMN ad placement
    </span>
  );
}

const card = "relative h-[200px] overflow-hidden rounded-promo shadow-promo";

export function PromoCards() {
  return (
    <div className="mt-[11px] grid grid-cols-1 gap-[17px] md:grid-cols-2 lg:grid-cols-3">
      <a href="#" className={`${card} bg-promo-sage`}>
        <PromoImage />
        <AdTag />
        <div className="absolute inset-y-5 left-5 flex w-[148px] flex-col items-start justify-between">
          <h2 className="font-serif text-card-title font-bold leading-[1.1] text-ink">
            Healthier, Cheaper, Better.
          </h2>
          <span className="rounded-pill bg-white px-[18px] py-[9px] text-ui font-bold text-success-deep shadow-chip">
            Shop Today
          </span>
        </div>
      </a>

      <a href="#" className={`${card} bg-promo-cream`}>
        <PromoImage />
        <div className="absolute left-5 top-5 w-[148px]">
          <span className="block text-label font-bold text-ink">Featured local item</span>
          <div className="mt-2.5 flex items-center gap-1 text-small text-ink">
            <MapPin size={12} aria-hidden /> From Stewart Farms
          </div>
        </div>
      </a>

      <a href="#" className={`${card} bg-promo-lilac md:col-span-2 lg:col-span-1`}>
        <PromoImage />
        <AdTag />
        <div className="absolute inset-y-5 left-5 flex w-[148px] flex-col items-start">
          <h2 className="font-serif text-card-title font-bold leading-[1.1] text-ink">
            Fresh inspiration delivered
          </h2>
          <p className="mt-1.5 text-label leading-[1.25] text-ink">
            Easy recipes and quality ingredients, all in one place
          </p>
          <span className="mt-auto rounded-pill bg-violet px-[18px] py-[9px] text-ui font-bold text-white">
            Learn More
          </span>
        </div>
      </a>
    </div>
  );
}
