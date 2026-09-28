import Header from "@/components/Header";
import Hero from "@/components/Hero";
import LogoStrip from "@/components/LogoStrip";
import Categories from "@/components/Categories";
import PopularProducts from "@/components/PopularProducts";
import SaleBanner from "@/components/SaleBanner";
import Notes from "@/components/Notes";
import QuizCta from "@/components/QuizCta";
import NewArrivals from "@/components/NewArrivals";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      {/* Sections arrive without a fade — the scroll animation is the heading
          wipe inside SectionHeading. QuizCta runs its own choreography. */}
      <main className="flex flex-1 flex-col gap-16 sm:gap-24">
        <Hero />
        <LogoStrip />
        <Categories />
        <PopularProducts />
        <SaleBanner />
        <Notes />
        <QuizCta />
        <NewArrivals />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
