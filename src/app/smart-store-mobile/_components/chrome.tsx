import { ChevronLeft, Heart, List, Scan, ShoppingCart, Sparkles, Wifi } from "lucide-react";
import { cartCount, listCount } from "../_data";
import { AccountCircle, HomeFilled, MenuBars, Signal } from "./icons";

// INHERITED: the app's fixed top and bottom bars, measured from the 720×1600
// screenshot at 2× (so every px here is half the screenshot's).

/** Android status bar + search header, on the cream band. */
export function AppHeader() {
  return (
    <header className="shrink-0 border-b border-m-divider bg-soft">
      <div className="flex h-10 items-center justify-between pl-6 pr-[23px] text-m-ink">
        <span className="text-[12px] font-medium leading-none">11:09</span>
        <span className="flex items-center gap-[5px]" aria-hidden>
          <Signal className="h-[11px] w-[15px]" />
          <Wifi size={16} strokeWidth={3} />
          <span className="flex items-center">
            <span className="grid h-[11px] w-[21px] place-items-center rounded-[3px] bg-m-ink text-[8.5px] font-bold leading-none text-soft">
              77
            </span>
            <span className="h-[4px] w-[1.5px] rounded-r-[1px] bg-m-ink/40" />
          </span>
        </span>
      </div>

      <div className="flex h-[51px] items-center">
        <button type="button" aria-label="Back" className="grid h-11 w-14 place-items-center pl-1 text-m-ink">
          <ChevronLeft size={27} strokeWidth={2.2} aria-hidden />
        </button>
        <div className="flex h-10 min-w-0 flex-1 items-center rounded-pill bg-surface pl-[13px] pr-1 shadow-[0_0_0_2px_var(--color-surface)]">
          <span className="flex-1 truncate text-[13.5px] text-m-muted">Search products, deals…</span>
          <Scan size={18} strokeWidth={2.2} className="mr-[11px] shrink-0 text-m-ink" aria-label="Scan an item" />
          <span className="flex h-8 w-[51px] shrink-0 items-center justify-center gap-1 rounded-pill bg-soft text-[13.5px] font-medium text-m-ink">
            <Sparkles size={15} strokeWidth={2} fill="currentColor" aria-hidden />
            AI
          </span>
        </div>
        <button type="button" aria-label={`Cart, ${cartCount} items`} className="relative ml-1.5 mr-[5px] grid size-11 shrink-0 place-items-center text-m-ink">
          <ShoppingCart size={27} strokeWidth={1.9} aria-hidden />
          <span className="absolute right-[4px] top-[2px] grid size-5 place-items-center rounded-full border border-m-ink bg-surface text-[11.5px] leading-none">
            {cartCount}
          </span>
        </button>
      </div>
    </header>
  );
}

const tabs = [
  { label: "Home", icon: <HomeFilled className="size-[25px]" />, active: true },
  { label: "For you", icon: <Heart size={25} strokeWidth={1.7} aria-hidden /> },
  { label: "List", icon: <List size={25} strokeWidth={2} aria-hidden />, badge: listCount },
  { label: "Account", icon: <AccountCircle className="size-[25px]" /> },
  { label: "Menu", icon: <MenuBars className="size-[24px]" /> },
];

/** Bottom tab bar + Android navigation bar. */
export function AppTabBar() {
  return (
    <div className="shrink-0 bg-surface">
      <nav aria-label="Main" className="grid h-14 grid-cols-5 border-t border-m-divider">
        {tabs.map(({ label, icon, active, badge }) => (
          <a
            key={label}
            href="#"
            aria-current={active ? "page" : undefined}
            className={`flex flex-col items-center gap-[3px] pt-[6px] text-[11px] leading-none ${
              active ? "font-semibold text-m-ink" : "font-medium text-m-muted"
            }`}
          >
            <span className="relative grid size-[25px] place-items-center">
              {icon}
              {badge !== undefined && (
                <span className="absolute -top-[5px] left-[6px] grid size-[21px] place-items-center rounded-full border-2 border-surface bg-success text-[11.5px] font-medium leading-none text-white">
                  {badge}
                </span>
              )}
            </span>
            {label}
          </a>
        ))}
      </nav>
      {/* Android 3-button navigation, as faint outlines */}
      <div aria-hidden className="flex h-8 items-center justify-center gap-[62px] pb-1">
        <span className="size-[13px] rounded-[3px] border-[1.5px] border-m-nav" />
        <span className="size-[17px] rounded-full border-[1.5px] border-m-nav" />
        <span className="h-[1.5px] w-[14px] translate-y-[3px] rotate-[35deg] rounded-pill bg-m-nav" />
      </div>
    </div>
  );
}
