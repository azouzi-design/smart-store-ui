// Signed-out empty state. Spacing and the button are measured from the live page (no stylesheet rule to copy).

export function CouponsOnCard() {
  return (
    <section className="mt-[clamp(10px,2vw,22px)]">
      <h2 className="mb-[18px] font-serif text-h2 font-bold tracking-[-0.01em] text-brand">Coupons on your card</h2>
      <div className="flex flex-col items-center gap-3.5 pb-[120px] pt-20 text-center">
        <p className="text-copy text-muted">Add your loyalty card to see the coupons loaded on it.</p>
        <button
          type="button"
          className="w-[213px] rounded-md bg-brand py-2 text-[15px] font-bold text-white hover:brightness-[1.08]"
        >
          Add your card
        </button>
      </div>
    </section>
  );
}
