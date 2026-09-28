import ProductSection from "./ProductSection";
import type { Product } from "./ProductCard";

// Placeholder data — replace with a fetch from the API.
const products: Product[] = Array.from({ length: 4 }, (_, i) => ({
  id: i + 1,
  brand: "Armaf",
  name: "Club de Nuit",
  price: "3199 RSD",
}));

/** "Najpopularnije" — most popular products. */
export default function PopularProducts() {
  return (
    <ProductSection
      title="Najpopularnije"
      products={products}
      seeAllHref="/najpopularnije"
    />
  );
}
