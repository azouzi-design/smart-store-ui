// Glyphs the app draws filled, which lucide only ships as outlines.

type Props = { className?: string };

/** Filled house with a chimney and a door cut-out (active Home tab). */
export function HomeFilled({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M12 2.6 1.6 11.6l1.3 1.4 1.6-1.4V21.4h5.6v-6.2h3.8v6.2h5.6v-9.8l1.6 1.4 1.3-1.4-3.4-2.9V3.5h-2.6v3z" />
    </svg>
  );
}

/** Circle outline with a filled head and shoulders (Account tab). */
export function AccountCircle({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <circle cx="12" cy="12" r="10.1" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="9.6" r="3.4" fill="currentColor" />
      <path d="M5.4 18.3c1.5-2.3 3.9-3.6 6.6-3.6s5.1 1.3 6.6 3.6A9.1 9.1 0 0 1 12 21.1a9.1 9.1 0 0 1-6.6-2.8z" fill="currentColor" />
    </svg>
  );
}

/** Three heavy rounded bars (Menu tab). */
export function MenuBars({ className }: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <rect x="2" y="4" width="20" height="2.6" rx="1.3" />
      <rect x="2" y="10.7" width="20" height="2.6" rx="1.3" />
      <rect x="2" y="17.4" width="20" height="2.6" rx="1.3" />
    </svg>
  );
}

/** Cellular signal: three full bars and a dim fourth. */
export function Signal({ className }: Props) {
  return (
    <svg viewBox="0 0 16 12" fill="currentColor" aria-hidden className={className}>
      <rect x="0" y="8" width="2.8" height="4" rx="0.7" />
      <rect x="4.2" y="5.5" width="2.8" height="6.5" rx="0.7" />
      <rect x="8.4" y="3" width="2.8" height="9" rx="0.7" />
      <rect x="12.6" y="0" width="2.8" height="12" rx="0.7" opacity="0.3" />
    </svg>
  );
}
