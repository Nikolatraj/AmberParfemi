import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductGrid from "@/components/ProductGrid";
import ShopFilters from "@/components/ShopFilters";
import SortSelect from "@/components/SortSelect";
import Breadcrumbs from "@/components/Breadcrumbs";
import {
  getProducts,
  parseSort,
  sortProducts,
  type Product,
} from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Shop | Amber Parfemi",
  description: "Pregledajte kompletnu ponudu parfema.",
};

// TEMPORARY — same stand-in data as /grid-preview, so the layout is reviewable
// while the Laravel API is unreachable. Delete this and the fallback below once
// the backend is running.
// Names and prices vary so sorting is visible against the stand-in data.
const placeholderNames = [
  "Her Confession",
  "Asad",
  "Yara",
  "Club de Nuit",
  "9 PM",
  "Bade'e Al Oud",
  "Khamrah",
  "Supremacy Not Only Intense",
];

const placeholderProducts: Product[] = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  name: placeholderNames[i],
  slug: `placeholder-${i + 1}`,
  description: null,
  price: `${4200 + i * 700}.00`,
  image_url: "/parfem.png",
  in_stock: i !== 5,
  brand: {
    id: 1,
    name: "Lattafa",
    slug: "lattafa",
    description: null,
    logo_url: null,
  },
}));

export default async function ShopPage(props: PageProps<"/shop">) {
  const sort = parseSort((await props.searchParams).sort);
  const products = await getProducts();
  const items = sortProducts(products ?? placeholderProducts, sort);

  return (
    <>
      <Header />
      <main className="mx-auto w-[90%] flex-1 py-12">
        <Breadcrumbs items={[{ label: "Shop" }]} />

        <h1 className="mt-2 text-3xl font-light uppercase tracking-[0.22em] sm:text-4xl">
          <span className="mr-2.5 text-amber">•</span>
          Shop
        </h1>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-black/55">
          Kompletna ponuda originalnih parfema.
        </p>

        <section className="mt-12">
          <div className="mb-8 flex items-center justify-between gap-6 border-b border-black/10 pb-4">
            <div className="flex items-center gap-6">
              <ShopFilters />
              <p className="hidden text-[11px] uppercase tracking-[0.2em] text-black/35 sm:block">
                {items.length} {items.length === 1 ? "proizvod" : "proizvoda"}
              </p>
            </div>
            <SortSelect value={sort} />
          </div>

          <ProductGrid products={items} />
        </section>
      </main>
      <Footer />
    </>
  );
}
