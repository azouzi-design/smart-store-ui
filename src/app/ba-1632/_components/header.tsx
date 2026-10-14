import {
  ChevronDown,
  ClipboardList,
  Clock,
  MapPin,
  Menu,
  Phone,
  Pill,
  ShoppingCart,
  Sparkles,
  Store,
} from "lucide-react";
import { store, user } from "../_data";
import { Logo } from "./logo";

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-pill bg-badge px-1.5 text-fine font-extrabold leading-none text-white">
      {children}
    </span>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 flex flex-wrap items-center gap-x-3.5 gap-y-1 border-b border-line-faint bg-surface px-4 py-3 sm:px-9 shadow-header">
      <a href="#" className="shrink-0">
        <Logo className="h-[46px] w-[84px]" />
      </a>

      {/* Nav only appears on wide screens (live breakpoint ~ unknown, estimated) */}
      <nav className="ml-3 hidden items-center gap-3 xl:flex">
        {["Coupons", "Weekly Deals"].map((label) => (
          <a
            key={label}
            href="#"
            className="rounded-pill bg-accent px-3 py-[7px] text-small font-bold text-white"
          >
            {label}
          </a>
        ))}
        <a href="#" className="flex items-center gap-1 text-label text-ink">
          Departments <ChevronDown size={13} aria-hidden />
        </a>
      </nav>

      <form
        role="search"
        className="ml-auto flex h-[42px] w-[380px] min-w-0 shrink items-center rounded-pill border border-line-faint bg-surface py-0.5 pl-3.5 pr-0.5"
      >
        {/* Live input falls back to the browser default font (Arial) — kept as-is: inherited quirk */}
        <input
          type="search"
          placeholder="Search with EVERYAISLE…"
          aria-label="Search"
          className="min-w-0 flex-1 bg-transparent font-[Arial] text-ui text-[#14261a] outline-none placeholder:text-muted"
        />
        <button
          type="submit"
          aria-label="Search"
          className="grid size-9 shrink-0 place-items-center rounded-full bg-brand text-white"
        >
          <Sparkles size={17} aria-hidden />
        </button>
      </form>

      <div className="flex flex-wrap items-center gap-2 whitespace-nowrap text-ui font-bold">
        <a href="#" className="hidden text-label font-semibold text-ink sm:inline">
          {user.name}
        </a>
        <a
          href="#"
          className="relative flex items-center gap-[7px] rounded-pill border border-line bg-surface px-[13px] py-[7px] text-ink"
        >
          <ClipboardList size={16} aria-hidden /> Shopping List
          <Badge>{user.listCount}</Badge>
        </a>
        <button className="relative flex items-center gap-2 rounded-pill bg-brand px-3.5 py-2 text-white">
          <ShoppingCart size={16} aria-hidden /> Cart
          <Badge>{user.cartCount}</Badge>
        </button>
        <button className="flex items-center gap-[5px] rounded-pill border border-brand/40 bg-surface px-3 py-2 text-brand">
          <Menu size={16} aria-hidden /> Menu
        </button>
      </div>
    </header>
  );
}

export function InfoBar() {
  const item = "flex shrink-0 items-center gap-2";
  return (
    <div className="overflow-x-auto bg-accent-deep px-4 py-[11px] sm:px-9 text-copy font-semibold text-white [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="flex w-max items-center gap-4 whitespace-nowrap">
        <span className={item}>
          <Clock size={14} aria-hidden /> {store.hours}
        </span>
        <span className={item}>
          <Pill size={14} aria-hidden /> {store.pharmacy}
        </span>
        <span className={item}>
          <MapPin size={14} aria-hidden /> {store.address}
        </span>
        <span className={item}>
          <Phone size={14} aria-hidden /> {store.phone}
        </span>
        <a href="#" className={`${item} text-brand-link underline`}>
          <Store size={14} aria-hidden /> Change store
        </a>
      </div>
    </div>
  );
}
