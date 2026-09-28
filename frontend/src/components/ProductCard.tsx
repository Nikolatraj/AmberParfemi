"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { parsePrice, useCart } from "@/lib/cart";

export type Product = {
  id: string | number;
  brand: string;
  name: string;
  price: string;
  href?: string;
  image?: string;
};

/** Single product tile: image, brand, name, price, and a quick add-to-cart button. */
export default function ProductCard({ product }: { product: Product }) {
  const { add, openCart } = useCart();

  // Adding pops the drawer open: the button sits on the tile with no other
  // feedback, so without it a click looks like nothing happened.
  const addToCart = () => {
    add({
      id: String(product.id),
      name: product.name,
      brand: product.brand,
      price: parsePrice(product.price),
      image: product.image,
    });
    openCart();
  };

  return (
    <div className="group relative">
      <Link href={product.href ?? `/proizvod/${product.id}`} className="block">
        {/* Transparent tile: the render carries its own studio card and shadow,
            so anything drawn here would show as a second card behind it. */}
        <div className="relative aspect-square w-full overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image ?? "/parfem.png"}
            alt={product.name}
            className="h-full w-full scale-[1.25] object-contain transition-transform duration-500 group-hover:scale-[1.3]"
          />
        </div>
        <div className="mt-3">
          <p className="text-[11px] uppercase tracking-[0.12em] text-black/45">
            {product.brand}
          </p>
          <p className="mt-1 text-base text-black/75">{product.name}</p>
          <p className="mt-1 text-[12px] text-black/60">{product.price}</p>
        </div>
      </Link>

      {/* Quick add to cart — sibling of the Link so it doesn't trigger navigation. */}
      <button
        type="button"
        onClick={addToCart}
        aria-label={`Dodaj u korpu: ${product.name}`}
        className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white/80 text-black/70 backdrop-blur transition-colors duration-300 hover:border-amber hover:bg-amber hover:text-white"
      >
        <ShoppingBag className="h-4 w-4" strokeWidth={1.5} />
      </button>
    </div>
  );
}
