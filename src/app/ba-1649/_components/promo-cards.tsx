"use client";

import Image from "next/image";
import { AdCarousel } from "./ad-carousel";
import { useSeason } from "./season";

/**
 * PROPOSED: the three live promo tiles merged into one rotating ad slot,
 * showing the active season's three ads (see ../_seasons.ts).
 * The art carries its own headline and CTA, so each slide is just a link.
 */
export function PromoCards() {
  const season = useSeason();

  const slides = season.ads
    ? season.ads.map(({ src, focusX, alt }, i) => (
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
        </a>
      ))
    : // Art not delivered yet: a labelled stand-in in the season's accent, with the export spec.
      [1, 2, 3].map((n) => (
        <div
          key={n}
          className="flex h-full flex-col items-center justify-center gap-1 bg-[color-mix(in_oklab,var(--color-success)_10%,white)] px-6 text-center"
        >
          <p className="font-serif text-md font-bold text-success">
            {season.label} ad {n}
          </p>
          <p className="text-copy text-body">Art coming · 1200×360 frame, exported @4x</p>
        </div>
      ));

  return (
    // PROPOSED size (BA-1649): spans the same container as Departments, at 3.33:1, the same shape as the ad art.
    // Keyed by season so a new season starts on its first ad.
    <div className="w-full">
      <AdCarousel key={season.id} slides={slides} label={`${season.label} ads`} />
    </div>
  );
}
