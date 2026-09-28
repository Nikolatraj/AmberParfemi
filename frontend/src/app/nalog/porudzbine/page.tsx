import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AccountShell from "@/components/account/AccountShell";

export const metadata: Metadata = {
  title: "Porudžbine | Amber Parfemi",
  description: "Pregled tvojih porudžbina.",
};

export default function PorudzbinePage() {
  return (
    <>
      <Header />
      <AccountShell>
        {/* Empty-orders state — the welcome card until there are real orders. */}
        <div className="flex flex-col items-start justify-between gap-6 rounded-lg border border-black/10 px-8 py-10 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-xl font-medium">Dobrodošli</h2>
            <p className="mt-1 text-sm text-black/50">Spremni za kupovinu?</p>
          </div>
          <Link
            href="/shop"
            className="inline-block bg-black px-7 py-3 text-[12px] uppercase tracking-[0.2em] text-white transition-opacity hover:opacity-80"
          >
            Kupuj sada
          </Link>
        </div>
      </AccountShell>
      <Footer />
    </>
  );
}
