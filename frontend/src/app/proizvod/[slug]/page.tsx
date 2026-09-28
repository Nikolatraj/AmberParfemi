import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs, { type Crumb } from "@/components/Breadcrumbs";
import ProductGallery from "@/components/ProductGallery";
import ProductBuyBox from "@/components/ProductBuyBox";
import ProductTabs from "@/components/ProductTabs";
import { formatPrice, getProduct, productImages } from "@/lib/catalog";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  return {
    title: product ? `${product.name} | Amber Parfemi` : "Proizvod",
    description: product?.description ?? undefined,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) notFound();

  const crumbs: Crumb[] = [
    { label: "Shop", href: "/shop" },
    ...(product.brand
      ? [{ label: product.brand.name, href: `/brend/${product.brand.slug}` }]
      : []),
    { label: product.name },
  ];

  return (
    <>
      <Header />
      <main className="mx-auto w-[90%] flex-1 py-10">
        <Breadcrumbs items={crumbs} />

        {/* Track widths come straight from the Figma frame, as ratios so they
            scale with the container: on a 1920 frame the 90% content box is
            1728 = gallery 616 + gutter 248 + copy 608 + trailing 256. The copy
            column stops short of the right margin on purpose. */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[616fr_248fr_608fr_256fr] lg:gap-0">
          <div className="lg:col-start-1">
            <ProductGallery images={productImages(product)} alt={product.name} />
          </div>

          <div className="lg:col-start-3">
            {/* Block wrapper, not a bare inline <Link>: the 30px gaps below
                are measured off this element's box, and an inline link's box is
                its glyphs rather than its line box — 2px short of the design. */}
            <p className="text-2xl uppercase tracking-[0.16em]">
              {product.brand ? (
                <Link
                  href={`/brend/${product.brand.slug}`}
                  className="transition-colors hover:text-amber"
                >
                  {product.brand.name}
                </Link>
              ) : (
                product.name
              )}
            </p>

            <h1 className="mt-[30px] text-[13px] uppercase tracking-[0.2em] text-black/70">
              {product.name}
            </h1>

            <p className="mt-[30px] text-xl tracking-[0.06em]">
              {formatPrice(product.price)}
            </p>

            <ProductBuyBox name={product.name} inStock={product.in_stock} />

            <ProductTabs
              description={product.description}
              notes={product.notes}
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
