import Link from "next/link";
import ProductCard, { type Product } from "./ProductCard";
import SectionHeading from "./SectionHeading";

type ProductSectionProps = {
  title: string;
  products: Product[];
  seeAllHref?: string;
};

/** Reusable titled row of product cards with a "Vidi sve" link. */
export default function ProductSection({
  title,
  products,
  seeAllHref = "#",
}: ProductSectionProps) {
  return (
    <section className="mx-auto w-[90%]">
      <SectionHeading
        title={title}
        action={
          <Link
            href={seeAllHref}
            className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-black/60 transition-colors hover:text-black"
          >
            Vidi sve
            <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-amber">
              ↗
            </span>
          </Link>
        }
      />
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
