import Link from "next/link";

/** Full-width editorial hero with a background image and overlaid copy. */
export default function Hero() {
  const slides = ["01", "02", "03", "04", "05"];

  return (
    <section className="relative w-full overflow-hidden">
      {/* Background image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/slide-shop-3_5c6e58a5-1cb8-4e70-824b-a4020d92c3d6.webp"
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Copy */}
      <div className="relative mx-auto flex min-h-[480px] w-[90%] items-center sm:min-h-[600px] lg:min-h-[760px]">
        <div className="max-w-md">
          <p className="text-xs uppercase tracking-[0.25em] text-black/50">
            Nova kolekcija
          </p>
          <h1 className="mt-4 text-4xl leading-[1.05] tracking-tight text-black sm:text-5xl lg:text-6xl">
            Miris koji
            <br />
            ostaje
          </h1>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-black/60">
            Otkrijte našu pažljivo odabranu selekciju luksuznih parfema.
          </p>
          <Link
            href="/shop"
            className="mt-8 inline-block border border-black px-8 py-3 text-xs uppercase tracking-[0.2em] text-black transition-colors hover:border-amber hover:bg-amber hover:text-white"
          >
            Istraži
          </Link>
        </div>
      </div>

      {/* Carousel indicators */}
      <div className="absolute bottom-6 right-6 flex gap-2 text-xs text-black/50">
        {slides.map((n, i) => (
          <button
            key={n}
            type="button"
            aria-label={`Slajd ${n}`}
            className={i === 0 ? "font-semibold text-black" : ""}
          >
            {n}
          </button>
        ))}
      </div>
    </section>
  );
}
