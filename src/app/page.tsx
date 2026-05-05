import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { BestProductsSection } from "@/components/sections/BestProductsSection";
import { CategorySection } from "@/components/sections/CategorySection";
import { HeroSection } from "@/components/sections/HeroSection";
import { PromoSection } from "@/components/sections/PromoSection";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <CategorySection />
      <PromoSection />
      <BestProductsSection />
      <Footer />
    </main>
  );
}