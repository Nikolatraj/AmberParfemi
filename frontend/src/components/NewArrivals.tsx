import ProductSection from "./ProductSection";
import type { Product } from "./ProductCard";

// Placeholder data — replace with a fetch from the API.
const products: Product[] = Array.from({ length: 4 }, (_, i) => ({
  id: i + 1,
  brand: "Armaf",
  name: "Club de Nuit",
  price: "3199 RSD",
}));

/** "Novo u ponudi" — newly added products. */
export default function NewArrivals() {
  return (
    <ProductSection
      title="Novo u ponudi"
      products={products}
      seeAllHref="/novo"
    />
  );
}
