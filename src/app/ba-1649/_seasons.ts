import type { FxPreset } from "./_fx/seasonal-fx.js";

/**
 * PROPOSED (BA-1649): one seasonal theme per event. A theme changes three things:
 * - accent: replaces the inherited green (--color-success) — "Shopping", the
 *   Sales Ad button, prices and SALE tags. Values live in tokens.css.
 * - ads: the three carousel slides, designed at 10:3 (1200×360 frame, exported @4x).
 *   null = art not delivered yet; the carousel shows labelled placeholders.
 *   focusX: horizontal focus on phones, where the banner crops the sides.
 * - fx: the one-off foreground animation (see ./_fx/seasonal-fx.js); null = none yet.
 *
 * Order is the switcher's order.
 */
export type Ad = { src: string; focusX: number; alt: string };

export type Season = {
  id: string;
  label: string;
  /** Written out in full (not built from the id) so Tailwind sees and emits the token. */
  accent: string;
  ads: Ad[] | null;
  fx: FxPreset | null;
};

export const seasons: Season[] = [
  {
    id: "fall",
    label: "Fall",
    accent: "var(--color-season-fall)",
    ads: [
      { src: "/ads/ad-fall-season-1.png", focusX: 100, alt: "From Stewart Farms: featured local item, pumpkins. Shop today" },
      { src: "/ads/ad-fall-season-2.png", focusX: 0, alt: "Easy recipes and quality ingredients, all in one place" },
      { src: "/ads/ad-fall-season-3.png", focusX: 50, alt: "Freshly delivered fall season food" },
    ],
    fx: "fall",
  },
  {
    id: "christmas",
    label: "Christmas",
    accent: "var(--color-season-christmas)",
    ads: null,
    fx: null,
  },
  {
    id: "hanukkah",
    label: "Hanukkah",
    accent: "var(--color-season-hanukkah)",
    ads: null,
    fx: null,
  },
  {
    id: "fourth-of-july",
    label: "Fourth of July",
    accent: "var(--color-season-fourth-of-july)",
    ads: null,
    fx: null,
  },
  {
    id: "memorial-day",
    label: "Memorial Day",
    accent: "var(--color-season-memorial-day)",
    ads: null,
    fx: null,
  },
  {
    id: "new-year",
    label: "New Year",
    accent: "var(--color-season-new-year)",
    ads: null,
    fx: null,
  },
];

export const findSeason = (id: string | undefined) => seasons.find((s) => s.id === id) ?? seasons[0];

