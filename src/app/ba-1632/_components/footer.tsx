import { footerColumns, store, trust } from "../_data";
import { Logo } from "./logo";

export function TrustStrip() {
  return (
    <div className="mt-11 bg-soft">
      <div className="mx-auto grid max-w-site grid-cols-2 px-9 py-[30px] lg:grid-cols-4">
        {trust.map((t, i) => (
          <div
            key={t.title}
            className={`flex items-center gap-3 px-[26px] py-1.5 ${i > 0 ? "lg:border-l lg:border-line/60" : ""}`}
          >
            <span aria-hidden className="text-[22px] leading-none">
              {t.icon}
            </span>
            <div>
              <div className="text-lead font-bold leading-tight text-ink">{t.title}</div>
              <div className="mt-0.5 text-label leading-snug text-muted">{t.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SiteFooter() {
  const link = "text-small leading-[1.35] text-white/85 hover:underline";
  return (
    <footer className="mt-11 bg-brand-deep px-8 pb-6 pt-[34px] text-label text-white">
      <div className="mx-auto max-w-site">
        <div className="grid grid-cols-1 items-end gap-5 border-b border-white/15 pb-6 md:grid-cols-[1fr_auto_1fr]">
          <div>
            <Logo className="h-10 w-[73px]" />
            <b className="mt-3.5 block font-bold">Price Chopper</b>
            <span>Healthier, Cheaper, Better</span>
          </div>
          <nav className="flex gap-3.5 pb-4">
            {["Coupons", "Weekly Deals", "Departments", "Recipes"].map((l) => (
              <a key={l} href="#" className={`${link} underline`}>
                {l}
              </a>
            ))}
          </nav>
          <address className="not-italic md:text-right">
            {store.address}
            <br />
            {store.phone}
          </address>
        </div>

        <div className="grid grid-cols-2 gap-[30px] border-b border-white/15 pb-6 pt-5 lg:grid-cols-4">
          {footerColumns.map((c) => (
            <div key={c.title}>
              <h2 className="text-label font-bold">{c.title}</h2>
              <ul className="mt-2 flex flex-col gap-1.5">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#" className={link}>
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-3.5 text-fine text-white/70">
          <div className="flex flex-wrap items-center gap-[18px]">
            <span>© 2026 Price Chopper. All rights reserved.</span>
            <button className="text-white/85 underline">Your Privacy Choices</button>
          </div>
          <p className="mt-1.5">
            Prices, promotions, and availability may vary by store and are subject to change without
            notice. Quantities may be limited. Online prices may differ from in-store prices.
          </p>
        </div>
      </div>
    </footer>
  );
}
