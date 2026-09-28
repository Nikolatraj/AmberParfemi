import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "O nama | Amber Parfemi",
  description: "Priča o Amber Parfemi.",
};

export default function ONamaPage() {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16">
        <Breadcrumbs items={[{ label: "O nama" }]} />
        <h1 className="text-3xl font-semibold tracking-wide">O NAMA</h1>

        <div className="mt-8 space-y-6 text-sm leading-relaxed text-black/70">
          <p>
            Amber Parfemi je online destinacija za ljubitelje luksuznih mirisa.
            Naša misija je da vam približimo pažljivo odabranu kolekciju
            originalnih parfema svetskih brendova, po pristupačnim cenama.
          </p>
          <p>
            Verujemo da miris nije samo detalj, već način na koji ostavljamo
            utisak i izražavamo sopstveni identitet. Zato svaki proizvod u našoj
            ponudi biramo sa posebnom pažnjom.
          </p>
          <p>
            Naš tim je uvek tu da vam pomogne da pronađete miris koji vam
            savršeno odgovara — bilo da tražite svežinu za svaki dan ili
            intenzivnu notu za posebne trenutke.
          </p>
        </div>

        <dl className="mt-12 grid grid-cols-2 gap-8 border-t border-black/10 pt-8 sm:grid-cols-3">
          <div>
            <dt className="text-2xl font-semibold">100%</dt>
            <dd className="mt-1 text-xs uppercase tracking-wider text-black/50">
              Originalni proizvodi
            </dd>
          </div>
          <div>
            <dt className="text-2xl font-semibold">24h</dt>
            <dd className="mt-1 text-xs uppercase tracking-wider text-black/50">
              Brza isporuka
            </dd>
          </div>
          <div>
            <dt className="text-2xl font-semibold">5000+</dt>
            <dd className="mt-1 text-xs uppercase tracking-wider text-black/50">
              Zadovoljnih kupaca
            </dd>
          </div>
        </dl>
      </main>
      <Footer />
    </>
  );
}
