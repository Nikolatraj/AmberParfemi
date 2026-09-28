import type { Metadata } from "next";
import Link from "next/link";
import { MapPin } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AccountShell from "@/components/account/AccountShell";

export const metadata: Metadata = {
  title: "Profil | Amber Parfemi",
  description: "Upravljajte podacima svog naloga.",
};

// Placeholder identity — no auth yet, so this stands in for the signed-in user.
const account = { email: "nikolatraj1@gmail.com" };

export default function ProfilPage() {
  return (
    <>
      <Header />
      <AccountShell>
        {/* Contact */}
        <section>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-medium">Kontakt</h2>
            <button
              type="button"
              className="rounded-md border border-black/15 px-4 py-1.5 text-[11px] uppercase tracking-[0.14em] text-black/60 transition-colors hover:border-black hover:text-black"
            >
              Izmeni
            </button>
          </div>
          <div className="mt-4 flex items-center justify-between rounded-lg border border-black/10 px-5 py-4">
            <span className="text-xs uppercase tracking-[0.16em] text-black/40">
              Email
            </span>
            <span className="text-sm text-black/80">{account.email}</span>
          </div>
        </section>

        {/* Addresses */}
        <section className="mt-12">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-medium">Adrese</h2>
            <button
              type="button"
              className="rounded-md border border-black/15 px-4 py-1.5 text-[11px] uppercase tracking-[0.14em] text-black/60 transition-colors hover:border-black hover:text-black"
            >
              Dodaj
            </button>
          </div>
          <div className="mt-4 flex items-center gap-4 rounded-lg border border-black/10 px-5 py-6">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black/[0.04] text-black/40">
              <MapPin className="h-5 w-5" strokeWidth={1.5} />
            </span>
            <p className="text-sm text-black/45">Nema sačuvanih adresa.</p>
          </div>
        </section>

        {/* Sign out */}
        <div className="mt-12">
          <Link
            href="/nalog"
            className="inline-block rounded-md border border-black/15 px-6 py-2.5 text-[11px] uppercase tracking-[0.18em] text-black/70 transition-colors hover:border-black hover:text-black"
          >
            Odjavi se
          </Link>
        </div>
      </AccountShell>
      <Footer />
    </>
  );
}
