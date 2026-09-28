import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductGrid from "@/components/ProductGrid";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getCategory } from "@/lib/catalog";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategory(slug);
  return {
    title: category ? `${category.name} | Amber Parfemi` : "Kategorija",
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = await getCategory(slug);

  if (!category) notFound();

  return (
    <>
      <Header />
      <main className="mx-auto w-[90%] flex-1 py-12">
        <Breadcrumbs
          items={[
            { label: "Shop", href: "/shop" },
            { label: category.name },
          ]}
        />
        <p className="text-xs uppercase tracking-wider text-black/45">
          Kategorija
        </p>
        <h1 className="mt-1 text-3xl font-semibold tracking-wide">
          {category.name}
        </h1>
        {category.description && (
          <p className="mt-2 max-w-2xl text-sm text-black/60">
            {category.description}
          </p>
        )}

        <div className="mt-10">
          <ProductGrid products={category.products ?? []} />
        </div>
      </main>
      <Footer />
    </>
  );
}
