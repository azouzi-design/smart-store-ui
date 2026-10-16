import { inStoreDeals } from "../_data";

// Mirrors the live .fresh-deals / .fresh-grid / .fresh-card rules.

export function InStoreDeals() {
  return (
    <section aria-labelledby="in-store-h" className="mb-2">
      <h2 id="in-store-h" className="mb-[18px] font-serif text-h2 font-bold tracking-[-0.01em] text-ink">
        In-store only deals
      </h2>
      <p className="-mt-1 mb-3 max-w-[62ch] text-label text-muted">
        These ad prices are available in store. We can’t add them to an online order.
      </p>
      <ul className="m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(190px,1fr))] gap-2.5 p-0 max-[640px]:grid-cols-[repeat(auto-fill,minmax(150px,1fr))] max-[640px]:gap-2">
        {inStoreDeals.map((d) => (
          <li key={d.name} className="flex flex-col justify-start gap-[3px] rounded-sm border border-l-4 border-line border-l-brand bg-surface px-3.5 py-3">
            {/* eslint-disable-next-line @next/next/no-img-element -- full-bleed 16:9 crop like the live card */}
            <img src={d.img} alt="" loading="lazy" className="-mx-3.5 -mt-3 mb-2 block aspect-video w-[calc(100%+28px)] max-w-none rounded-t-sm bg-soft object-cover" />
            <span className="text-[21px] font-extrabold leading-[1.1] text-brand max-[640px]:text-[19px]">{d.price}</span>
            <span className="text-copy font-semibold">{d.name}</span>
            {d.dept && <span className="text-fine capitalize text-muted">{d.dept}</span>}
            <button
              type="button"
              className="-mb-0.5 ml-auto mr-[-4px] mt-2 cursor-pointer self-start rounded-pill border border-line bg-transparent px-2.5 py-1 text-small font-semibold text-brand hover:bg-soft"
            >
              Sign in to save
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
