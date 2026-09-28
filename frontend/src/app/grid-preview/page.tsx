// TEMPORARY preview route — renders ProductGrid with mock data so the design can
// be checked without the Laravel API. Delete once the backend is reachable.
import ProductGrid from "@/components/ProductGrid";
import type { Product } from "@/lib/catalog";

const lattafa = { id: 1, name: "Lattafa", slug: "lattafa", description: null, logo_url: null };

const products: Product[] = [
  { id: 1, name: "Her Confession", slug: "her-confession", description: null, price: "5900.00", image_url: "/parfem.png", in_stock: true, brand: lattafa },
  { id: 3, name: "Boca Dva", slug: "boca-2", description: null, price: "7400.00", image_url: "/boca2.png", in_stock: false, brand: lattafa },
  { id: 4, name: "Boca Jedan", slug: "boca-1", description: null, price: "4700.00", image_url: "/Boca2 1.png", in_stock: true, brand: lattafa },
];

export default function GridPreviewPage() {
  return (
    <main className="mx-auto w-[90%] py-12">
      <p className="mb-6 text-xs uppercase tracking-[0.14em] text-black/40">
        Preview — mock podaci
      </p>
      <ProductGrid products={products} />
    </main>
  );
}
