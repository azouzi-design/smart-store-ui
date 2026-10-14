const swatches = [
  ["brand", "bg-brand"],
  ["brand-link", "bg-brand-link"],
  ["brand-deep", "bg-brand-deep"],
  ["accent", "bg-accent"],
  ["badge", "bg-badge"],
  ["ink", "bg-ink"],
  ["muted", "bg-muted"],
  ["field", "bg-field"],
] as const;

export default function StyleGuide() {
  return (
    <main className="mx-auto w-full max-w-page px-6 py-12">
      <h1 className="font-serif text-[34px] font-bold text-brand">Style guide</h1>
      <p className="mt-2 text-muted">
        Foundation check: tokens extracted from the live Scan page.
      </p>

      <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {swatches.map(([name, cls]) => (
          <li key={name}>
            <div className={`${cls} h-16 rounded-md border border-black/10`} />
            <span className="mt-1 block text-sm">{name}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <button className="rounded-md bg-brand px-5 py-3.5 font-bold text-white">
          Primary button
        </button>
        <span className="rounded-pill bg-accent px-3 py-1.5 text-[12.5px] font-bold text-white">
          Pill
        </span>
        <span className="font-script text-3xl text-accent">Script accent</span>
      </div>
    </main>
  );
}
