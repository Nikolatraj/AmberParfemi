import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Kontakt | Amber Parfemi",
  description: "Kontaktirajte Amber Parfemi.",
};

export default function KontaktPage() {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-16">
        <Breadcrumbs items={[{ label: "Kontakt" }]} />
        <h1 className="text-3xl font-semibold tracking-wide">KONTAKT</h1>
        <p className="mt-2 text-sm text-black/60">
          Imate pitanje? Pošaljite nam poruku i javićemo vam se u najkraćem
          roku.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_280px]">
          <ContactForm />

          <aside className="space-y-6 text-sm">
            <div>
              <h2 className="mb-1 text-xs font-semibold uppercase tracking-wider text-black/50">
                Email
              </h2>
              <p className="text-black/70">info@amberparfemi.rs</p>
            </div>
            <div>
              <h2 className="mb-1 text-xs font-semibold uppercase tracking-wider text-black/50">
                Telefon
              </h2>
              <p className="text-black/70">+381 11 123 4567</p>
            </div>
            <div>
              <h2 className="mb-1 text-xs font-semibold uppercase tracking-wider text-black/50">
                Adresa
              </h2>
              <p className="text-black/70">
                Bulevar kralja Aleksandra 1<br />
                11000 Beograd, Srbija
              </p>
            </div>
            <div>
              <h2 className="mb-1 text-xs font-semibold uppercase tracking-wider text-black/50">
                Radno vreme
              </h2>
              <p className="text-black/70">
                Pon – Pet: 09 – 17h
                <br />
                Subota: 10 – 14h
              </p>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}
