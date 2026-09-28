import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthForm from "@/components/account/AuthForm";

export const metadata: Metadata = {
  title: "Prijava | Amber Parfemi",
  description: "Prijavite se ili napravite nalog.",
};

export default function NalogPage() {
  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-24">
        <AuthForm />
      </main>
      <Footer />
    </>
  );
}
