import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getBrands } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Brendovi | Amber Parfemi",
  description: "Svi brendovi u ponudi Amber Parfemi.",
};

export default async function BrendoviPage() {
  const brands = await getBrands();

  return (
    <>
      <Header />
      <main className="mx-auto w-[90%] flex-1 py-12">
        <Breadcrumbs items={[{ label: "Brendovi" }]} />
        <p className="text-xs uppercase tracking-wider text-black/45">Brendovi</p>
        <h1 className="mt-1 text-3xl font-semibold tracking-wide">Brendovi</h1>

        {brands && brands.length > 0 ? (
          <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {brands.map((brand) => (
              <Link
                key={brand.id}
                href={`/brend/${brand.slug}`}
                className="group block"
              >
                <div className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden bg-white p-6 transition-shadow duration-300 group-hover:shadow-[0_10px_30px_-8px_rgba(0,0,0,0.12)]">
                  {brand.logo_url ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={brand.logo_url}
                      alt={brand.name}
                      className="max-h-[70%] w-auto object-contain transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  ) : (
                    <span className="text-lg tracking-wide text-black/70">
                      {brand.name}
                    </span>
                  )}
                </div>
                <p className="mt-3 text-center text-[13px] uppercase tracking-[0.12em] text-black/70">
                  {brand.name}
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <p className="mt-10 text-sm text-black/50">
            Brendovi trenutno nisu dostupni.
          </p>
        )}
      </main>
      <Footer />
    </>
  );
}
