import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Kviz | Amber Parfemi",
  description: "Odgovori na par pitanja i pronađi svoj miris.",
};

export default function KvizPage() {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16">
        <Breadcrumbs items={[{ label: "Kviz" }]} />
        <p className="text-xs uppercase tracking-wider text-black/45">
          Pronađi svoj miris
        </p>
        <h1 className="mt-1 text-3xl font-semibold tracking-wide">KVIZ</h1>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-black/70">
          Uskoro: odgovori na par pitanja o notama, prilikama i intenzitetu, a
          mi ćemo izdvojiti parfeme baš za tebe.
        </p>
      </main>
      <Footer />
    </>
  );
}
