import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Korpa | Amber Parfemi",
  description: "Tvoja korpa za kupovinu.",
};

export default function KorpaPage() {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16">
        <Breadcrumbs items={[{ label: "Korpa" }]} />
        <h1 className="text-3xl font-semibold tracking-wide">KORPA</h1>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-black/70">
          Tvoja korpa je trenutno prazna.
        </p>
      </main>
      <Footer />
    </>
  );
}
