import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";

type Props = { params: Promise<{ slug: string }> };

const NOTE_NAMES: Record<string, string> = {
  cvetne: "Cvetne note",
  ruzine: "Ružine note",
  drvenaste: "Drvenaste note",
  citrusne: "Citrusne note",
  kozne: "Kožne note",
  slatke: "Slatke note",
  orijentalne: "Orijentalne note",
  akvaticne: "Akvatične note",
  vocne: "Voćne note",
  zacinske: "Začinske note",
};

function noteName(slug: string) {
  return NOTE_NAMES[slug] ?? slug.charAt(0).toUpperCase() + slug.slice(1);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return { title: `${noteName(slug)} | Amber Parfemi` };
}

export default async function NotePage({ params }: Props) {
  const { slug } = await params;

  return (
    <>
      <Header />
      <main className="mx-auto w-[90%] flex-1 py-12">
        <Breadcrumbs
          items={[
            { label: "Shop", href: "/shop" },
            { label: noteName(slug) },
          ]}
        />
        <p className="text-xs uppercase tracking-wider text-black/45">Nota</p>
        <h1 className="mt-1 text-3xl font-semibold tracking-wide">
          {noteName(slug)}
        </h1>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-black/70">
          Uskoro: parfemi sa notama „{noteName(slug).toLowerCase()}“.
        </p>
      </main>
      <Footer />
    </>
  );
}
