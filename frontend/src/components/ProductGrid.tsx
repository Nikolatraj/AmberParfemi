import Link from "next/link";
import { formatPrice, type Product } from "@/lib/catalog";

/** Responsive grid of product cards. Renders an empty state when there are none. */
export default function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <p className="py-16 text-center text-sm text-black/50">
        Nema dostupnih proizvoda.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/proizvod/${product.slug}`}
          className="group block"
        >
          {/* No backdrop here on purpose: the product renders carry their own
              studio card and drop shadow, so the tile stays transparent and the
              image is the whole visual. */}
          <div className="relative aspect-square w-full overflow-hidden">
            {!product.in_stock && (
              <span className="absolute left-4 top-4 z-10 bg-white/70 px-2 py-1 text-[10px] uppercase tracking-[0.14em] text-black/55 backdrop-blur-sm">
                Rasprodato
              </span>
            )}

            {/* Same render scale as the homepage tiles (ProductCard), so a
                bottle reads the same size wherever it appears. The wrapper
                clips it, since 1.25 overflows the square. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.image_url ?? "/parfem.png"}
              alt={product.name}
              className="h-full w-full scale-[1.25] object-contain transition-transform duration-500 group-hover:scale-[1.3]"
            />
          </div>

          <div className="mt-5">
            {product.brand && (
              <p className="text-[10px] uppercase tracking-[0.14em] text-black/45">
                {product.brand.name}
              </p>
            )}
            <p className="mt-1.5 text-[13px] uppercase tracking-[0.06em] text-black/85">
              {product.name}
            </p>
            <p className="mt-1.5 text-[12px] text-black/60">
              {formatPrice(product.price)}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
