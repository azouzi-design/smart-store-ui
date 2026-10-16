import { footerColumns, store, trust } from "../_data";
import { Logo } from "./logo";

// Mirrors the live .trust-bar / .trust-* and .foot / .foot-* rules.

export function TrustStrip() {
  return (
    <div className="mt-[clamp(28px,5vw,44px)] bg-line/20 px-[clamp(16px,4vw,36px)] py-[30px]">
      <div className="mx-auto grid max-w-site grid-cols-4 max-[760px]:grid-cols-2 max-[760px]:gap-y-4">
        {trust.map((t) => (
          <div key={t.title} className="flex items-center gap-3 border-l border-line/50 px-[26px] py-1.5 first:border-l-0">
            <span aria-hidden className="text-[22px] leading-none">
              {t.icon}
            </span>
            <div>
              <div className="text-lead font-bold">{t.title}</div>
              <div className="text-label text-muted">{t.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-[clamp(24px,5vw,44px)] bg-brand-deep px-[max(clamp(14px,4vw,32px),calc((100vw-var(--container-site))/2))] pt-[34px] text-label text-white">
      <div className="mb-3.5 flex">
        <Logo className="h-10 w-[73px]" />
      </div>

      <div className="flex flex-wrap justify-between gap-x-12 gap-y-6">
        <div>
          <b className="font-bold">Price Chopper</b>
          <br />
          Healthier, Cheaper, Better
        </div>
        <nav className="flex flex-wrap gap-x-3.5 gap-y-1">
          {["Coupons", "Weekly Deals", "Departments", "Recipes"].map((l) => (
            <a key={l} href="#" className="text-white/86 underline hover:text-white">
              {l}
            </a>
          ))}
        </nav>
        <address className="not-italic">
          {store.address}
          <br />
          {store.phone}
        </address>
      </div>

      <div className="mt-6 grid grid-cols-[repeat(auto-fit,minmax(170px,1fr))] gap-x-8 gap-y-5 border-t border-white/16 pt-5">
        {footerColumns.map((c) => (
          <div key={c.title}>
            <h2 className="mb-2 text-label font-bold tracking-[0.02em] text-white">{c.title}</h2>
            <ul className="flex flex-col gap-1.5">
              {c.links.map((l) => (
                <li key={l}>
                  <a href="#" className="text-small leading-[1.35] text-white/86 hover:text-white hover:underline">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-[26px] flex flex-wrap gap-x-[18px] gap-y-1 border-t border-white/16 py-3.5 text-fine text-white/72">
        <span>© 2026 Price Chopper. All rights reserved.</span>
        <button className="text-fine text-white/86 underline">Your Privacy Choices</button>
        <span className="opacity-85">
          Prices, promotions, and availability may vary by store and are subject to change without notice.
          Quantities may be limited. Online prices may differ from in-store prices.
        </span>
      </div>
      <div className="mt-4 pb-[18px] text-fine text-white/45">
        revision 18647 · loyalty, coupons, circular, fulfillment, search
      </div>
    </footer>
  );
}
