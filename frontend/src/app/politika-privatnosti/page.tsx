import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Politika privatnosti | Amber Parfemi",
  description: "Kako čuvamo i koristimo tvoje podatke.",
};

export default function PolitikaPrivatnostiPage() {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16">
        <Breadcrumbs items={[{ label: "Politika privatnosti" }]} />
        <h1 className="text-3xl font-semibold tracking-wide">
          POLITIKA PRIVATNOSTI
        </h1>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-black/70">
          Uskoro: informacije o tome koje podatke prikupljamo i kako ih
          koristimo.
        </p>
      </main>
      <Footer />
    </>
  );
}
