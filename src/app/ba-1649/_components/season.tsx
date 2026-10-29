"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { createContext, type ReactNode, useContext, useEffect, useSyncExternalStore } from "react";
import { playSeasonalFx } from "../_fx/seasonal-fx.js";
import { findSeason, type Season, seasons } from "../_seasons";

/**
 * PROPOSED (BA-1649): the active seasonal theme for the whole page.
 * - Swaps the accent: --color-success is re-pointed at the season's token.
 * - Plays the season's foreground animation once, each time the season is picked.
 * - The URL is the state (?theme=christmas), so each season has a shareable link.
 *   It's read in the browser, so the page itself still prerenders (as Fall).
 */
const listeners = new Set<() => void>();
const subscribe = (cb: () => void) => {
  listeners.add(cb);
  window.addEventListener("popstate", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("popstate", cb);
  };
};
const getSearch = () => window.location.search;
const getServerSearch = () => "";

const parse = (search: string) => findSeason(new URLSearchParams(search).get("theme") ?? undefined);

function select(season: Season) {
  const url = new URL(window.location.href);
  if (season === seasons[0]) url.searchParams.delete("theme");
  else url.searchParams.set("theme", season.id);
  window.history.replaceState(null, "", url);
  listeners.forEach((cb) => cb());
}

const SeasonContext = createContext<Season>(seasons[0]);

export const useSeason = () => useContext(SeasonContext);

export function SeasonProvider({ children }: { children: ReactNode }) {
  const search = useSyncExternalStore(subscribe, getSearch, getServerSearch);
  const season = parse(search);

  // Started a tick late: on a deep link, hydration renders Fall first, then the URL's season.
  // The delay lets that first pass be cancelled before any leaves appear.
  useEffect(() => {
    if (!season.fx) return;
    let stop: (() => void) | undefined;
    const id = window.setTimeout(() => (stop = playSeasonalFx(season.fx!)));
    return () => {
      window.clearTimeout(id);
      stop?.();
    };
  }, [season]);

  return (
    <SeasonContext.Provider value={season}>
      <div className="contents" style={{ "--color-success": season.accent } as React.CSSProperties}>
        {children}
      </div>
    </SeasonContext.Provider>
  );
}

/**
 * Review-only control, not part of the proposal: a small frosted pill at the
 * bottom center that steps through the seasons in order.
 */
export function SeasonSwitcher() {
  const season = useSeason();
  const i = seasons.indexOf(season);
  const n = seasons.length;
  const go = (delta: number) => select(seasons[(i + delta + n) % n]);

  return (
    <div
      role="group"
      aria-label="Preview seasonal theme"
      className="fixed bottom-3 left-1/2 z-40 flex -translate-x-1/2 items-center rounded-pill bg-white/90 px-1 py-1 text-label text-body shadow-chip backdrop-blur-md"
    >
      <button type="button" onClick={() => go(-1)} aria-label="Previous theme" className={step}>
        <ChevronLeft size={14} aria-hidden />
      </button>
      <p aria-live="polite" className="flex min-w-[9.5em] items-baseline justify-center gap-1.5 whitespace-nowrap px-1">
        <span className="size-2 shrink-0 self-center rounded-full bg-success" aria-hidden />
        <span className="font-bold text-ink">{season.label}</span>
        <span className="tabular-nums">
          {i + 1}/{n}
        </span>
      </p>
      <button type="button" onClick={() => go(1)} aria-label="Next theme" className={step}>
        <ChevronRight size={14} aria-hidden />
      </button>
    </div>
  );
}

// Slim visually; the negative margin grows the hit area to 44px without growing the pill.
const step =
  "-my-[11px] grid size-11 place-items-center rounded-full text-ink hover:bg-ink/5 focus-visible:outline-2 focus-visible:outline-brand";
