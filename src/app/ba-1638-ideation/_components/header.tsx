import {
  ChevronDown,
  ClipboardList,
  Clock,
  MapPin,
  Menu,
  Phone,
  Pill,
  Search,
  ShoppingCart,
  Sparkles,
  Store,
} from "lucide-react";
import { store, user } from "../_data";
import { Logo } from "./logo";

// Mirrors the live .topbar / .hdr-* rules, including their breakpoints
// (nav hides <1080, search narrows ≤1240, labels hide ≤900, search collapses ≤640).

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="absolute -right-1.5 -top-1.5 h-5 min-w-5 rounded-pill border-2 border-white bg-badge px-[5px] text-center text-fine font-extrabold leading-5 text-white">
      {children}
    </span>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 flex flex-wrap items-center gap-x-3.5 gap-y-1 border-b border-line/40 bg-surface px-[clamp(14px,4vw,36px)] py-3 shadow-header max-[400px]:gap-x-2 max-[400px]:px-3">
      <a href="#" className="mr-1.5 flex items-center">
        <Logo className="h-[46px] w-[84px] max-[640px]:h-[33px] max-[640px]:w-[60px]" />
      </a>

      <div className="ml-[clamp(10px,2vw,24px)] flex flex-1 flex-wrap items-center gap-x-2 gap-y-1 max-[400px]:ml-1.5 max-[400px]:gap-x-1.5">
        <nav className="flex min-w-0 flex-nowrap items-center gap-2 max-[1079px]:hidden">
          {["Coupons", "Weekly Deals"].map((label) => (
            <a
              key={label}
              href="#"
              className="whitespace-nowrap rounded-pill border border-transparent bg-accent px-3 py-[7px] text-small font-bold text-white hover:border-accent hover:bg-accent/8 hover:text-accent"
            >
              {label}
            </a>
          ))}
          <button className="inline-flex items-center gap-1 whitespace-nowrap rounded-pill p-1.5 text-small font-semibold text-ink hover:bg-brand/10 hover:text-brand">
            Departments <ChevronDown size={10} aria-hidden />
          </button>
        </nav>

        <div className="relative ml-auto min-w-[150px] max-w-[380px] flex-[1_1_220px] max-[1240px]:min-w-[130px] max-[1240px]:basis-[160px] max-[640px]:hidden">
          <form role="search" className="flex items-center rounded-pill border border-line/55 bg-surface py-0.5 pl-3.5 pr-0.5">
            {/* Live input doesn't inherit the page font, so it renders in the browser default (Arial) */}
            <input
              type="search"
              placeholder="Search with EVERYAISLE…"
              aria-label="Search"
              className="min-w-0 flex-1 border-0 bg-transparent font-[Arial] text-ui text-search-text outline-0"
            />
            <button type="submit" aria-label="Search" className="grid size-9 flex-none place-items-center rounded-pill bg-brand text-white">
              <Sparkles size={16} aria-hidden />
            </button>
          </form>
        </div>
        <button
          aria-label="Search"
          className="ml-auto hidden size-10 items-center justify-center rounded-pill border border-brand/45 bg-surface text-brand max-[640px]:inline-flex"
        >
          <Search size={17} aria-hidden />
        </button>

        <a
          href="#"
          className="inline-flex items-center whitespace-nowrap rounded-pill border border-brand/45 bg-surface px-3.5 py-2 text-ui font-bold text-brand hover:bg-brand/8 max-[640px]:hidden"
        >
          Sign in
        </a>
        <a
          href="#"
          className="relative inline-flex items-center gap-[7px] whitespace-nowrap rounded-pill border border-line bg-surface px-[13px] py-[7px] text-ui font-bold text-ink hover:border-brand hover:text-brand max-[900px]:px-[11px]"
        >
          <ClipboardList size={15} aria-hidden />
          <span className="max-[900px]:hidden">Shopping List</span>
        </a>
        <button className="relative inline-flex items-center gap-2 whitespace-nowrap rounded-pill bg-brand px-3.5 py-2 text-ui font-bold text-white max-[900px]:px-3">
          <ShoppingCart size={16} aria-hidden />
          <span className="max-[900px]:hidden">Cart</span>
          <Badge>{user.cartCount}</Badge>
        </button>
        <button className="inline-flex items-center gap-[5px] whitespace-nowrap rounded-pill border border-brand/45 bg-surface px-3 py-2 text-ui font-bold text-brand hover:bg-brand/8 max-[400px]:px-[11px]">
          <Menu size={18} aria-hidden />
          <span className="max-[400px]:hidden">Menu</span>
        </button>
      </div>
    </header>
  );
}

export function InfoBar() {
  const col = "inline-flex items-center gap-2 whitespace-nowrap";
  return (
    <div className="relative z-[2] overflow-hidden bg-accent-deep px-[clamp(16px,4vw,36px)] py-[11px] text-copy font-semibold text-white">
      <div className="mx-auto flex max-w-site items-center justify-between gap-4 max-[760px]:flex-col max-[760px]:items-start max-[760px]:gap-1">
        <span className={col}>
          <Clock size={14} aria-hidden /> {store.hours}
        </span>
        <span className={col}>
          <Pill size={14} aria-hidden /> {store.pharmacy}
        </span>
        <span className={col}>
          <MapPin size={14} aria-hidden /> {store.address}
        </span>
        <span className={col}>
          <Phone size={14} aria-hidden /> {store.phone}
        </span>
        <a href="#" className={`${col} text-brand-link underline`}>
          <Store size={14} aria-hidden /> Change store
        </a>
      </div>
    </div>
  );
}
