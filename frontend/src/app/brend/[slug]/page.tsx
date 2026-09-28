import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductGrid from "@/components/ProductGrid";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getBrand } from "@/lib/catalog";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const brand = await getBrand(slug);
  return {
    title: brand ? `${brand.name} | Amber Parfemi` : "Brend",
  };
}

export default async function BrandPage({ params }: Props) {
  const { slug } = await params;
  const brand = await getBrand(slug);

  if (!brand) notFound();

  return (
    <>
      <Header />
      <main className="mx-auto w-[90%] flex-1 py-12">
        <Breadcrumbs
          items={[
            { label: "Brendovi", href: "/brendovi" },
            { label: brand.name },
          ]}
        />
        <p className="text-xs uppercase tracking-wider text-black/45">Brend</p>
        <h1 className="mt-1 text-3xl font-semibold tracking-wide">
          {brand.name}
        </h1>
        {brand.description && (
          <p className="mt-2 max-w-2xl text-sm text-black/60">
            {brand.description}
          </p>
        )}

        <div className="mt-10">
          <ProductGrid products={brand.products ?? []} />
        </div>
      </main>
      <Footer />
    </>
  );
}
