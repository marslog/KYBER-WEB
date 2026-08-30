import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import PowerfulTechSection from "@/components/sections/PowerfulTechSection";
import ProductsCategorySection from "@/components/sections/ProductsCategorySection";
import ResourcesSection from "@/components/sections/ResourcesSection";
import CTASection from "@/components/sections/CTASection";

export default function Home() {
  return (
    <main className="relative bg-[var(--bg)] min-h-screen text-[var(--text)]">
      <Navbar overDarkHero />
      <HeroSection />
      <PowerfulTechSection />
      <ProductsCategorySection />
      <ResourcesSection />
      <CTASection />
      <Footer />
    </main>
  );
}
