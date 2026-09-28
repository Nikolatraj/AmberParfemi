import Link from "next/link";

/**
 * "Akcija" — full-bleed promo band for the 10% discount. Deliberately breaks the
 * w-[90%] rhythm of the surrounding sections so it reads as an interruption.
 * Flat ink rather than photography, so it doesn't compete with the Categories
 * panels, which are the page's other dark moment.
 */
export default function SaleBanner() {
  return (
    <section className="w-full bg-foreground text-background">
      <div className="mx-auto flex w-[90%] flex-col gap-10 py-16 sm:py-20 md:flex-row md:items-center md:justify-between md:gap-16">
        {/* The discount as the graphic: oversized, light, tight-tracked. */}
        <p className="flex items-center leading-[0.8]">
          {/* Minus centres on the numeral; the % rides high, as in editorial
              price setting. */}
          <span className="text-5xl font-light text-amber sm:text-7xl lg:text-8xl">
            −
          </span>
          <span className="text-[5.5rem] font-light tracking-tight sm:text-[8rem] lg:text-[10rem]">
            10
          </span>
          <span className="self-start pt-2 text-3xl font-light sm:pt-4 sm:text-5xl">
            %
          </span>
        </p>

        <div className="md:max-w-md">
          <p className="text-[11px] uppercase tracking-[0.22em] text-background/55">
            <span className="mr-2.5 text-amber">•</span>
            Akcija
          </p>
          <h2 className="mt-5 text-2xl font-light uppercase leading-tight tracking-[0.12em] sm:text-3xl">
            Odabrani parfemi
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-background/65">
            Popust važi na izabranu selekciju originalnih parfema, dok traju
            zalihe.
          </p>

          <Link
            href="/akcija"
            className="group mt-8 inline-flex items-center gap-3 border border-background/35 px-8 py-3 text-[11px] uppercase tracking-[0.2em] transition-colors duration-300 hover:border-amber hover:bg-amber hover:text-white"
          >
            Pogledaj akciju
            <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              ↗
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
