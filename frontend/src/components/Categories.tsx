import Link from "next/link";
import SectionHeading from "./SectionHeading";

const panels = [
  { label: "Muški", href: "/kategorija/muski", image: "/muski.png" },
  { label: "Ženski", href: "/kategorija/zenski", image: "/zenski.png" },
];

/** Two large editorial category panels, with Unisex as a quiet text link. */
export default function Categories() {
  return (
    <section className="mx-auto w-[90%]">
      <SectionHeading
        title="Kategorije"
        action={
          <Link
            href="/shop"
            className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-black/60 transition-colors hover:text-black"
          >
            Vidi sve
            <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-amber">
              ↗
            </span>
          </Link>
        }
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {panels.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="group relative flex aspect-[4/3] w-full items-end overflow-hidden rounded-lg bg-zinc-800 sm:aspect-[3/2]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={c.image}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
            <div className="relative flex w-full items-center justify-between p-6 text-white">
              <span className="text-base uppercase tracking-[0.2em] sm:text-lg">
                {c.label}
              </span>
              <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-amber">
                ↗
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
