import Image from "next/image";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`relative block ${className}`}>
      <Image src="/live/logo.png" alt="Price Chopper" fill sizes="84px" className="object-contain" priority />
    </span>
  );
}
