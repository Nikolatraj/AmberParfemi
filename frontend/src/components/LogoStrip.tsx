import Link from "next/link";

const brands = [
  { slug: "armaf", name: "Armaf", src: "/brands/armaf.png" },
  { slug: "afnan", name: "Afnan", src: "/brands/afnan.png" },
  { slug: "lattafa", name: "Lattafa", src: "/brands/lattafa.png" },
  { slug: "french-avenue", name: "French Avenue", src: "/brands/french-avenue.png" },
  { slug: "rasasi", name: "Rasasi", src: "/brands/rasasi.png" },
  { slug: "mancera", name: "Mancera", src: "/brands/mancera.png" },
];

/** Static row of brand logos, each linking to its brand page. */
export default function LogoStrip() {
  return (
    <section className="-mt-12 w-full  pb-8 sm:-mt-24">
      <div className="mx-auto flex w-[90%] flex-wrap items-center justify-center gap-8 sm:justify-between">
        {brands.map((brand) => (
          <Link
            key={brand.slug}
            href={`/brend/${brand.slug}`}
            aria-label={brand.name}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={brand.src}
              alt={brand.name}
              className="h-20 w-auto object-contain opacity-80 mix-blend-multiply transition-opacity hover:opacity-100 sm:h-28 lg:h-32"
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
