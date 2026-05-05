import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { MenuPageContent } from "@/components/menu/MenuPageContent";

export default function MenuPage() {
  return (
    <main>
      <Navbar />
      <MenuPageContent />
      <Footer />
    </main>
  );
}