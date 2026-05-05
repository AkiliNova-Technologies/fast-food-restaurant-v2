import { Suspense } from "react";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { MenuPageContent } from "@/components/menu/MenuPageContent";

export default function MenuPage() {
  return (
    <main>
      <Navbar />

      <Suspense
        fallback={
          <div className="px-4 py-32 text-center text-stone-500">
            Loading menu...
          </div>
        }
      >
        <MenuPageContent />
      </Suspense>

      <Footer />
    </main>
  );
}