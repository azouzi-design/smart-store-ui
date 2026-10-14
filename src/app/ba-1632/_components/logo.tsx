// Neutral stand-in for the brand logo (their asset is not committed to this public repo).
// To use the real one, drop it in /public and swap this for <Image>.
export function Logo({ className = "" }: { className?: string }) {
  return (
    <div
      role="img"
      aria-label="Price Chopper"
      className={`grid place-items-center rounded-xs border border-dashed border-muted/50 bg-field text-tag font-bold tracking-wide text-muted ${className}`}
    >
      LOGO
    </div>
  );
}
