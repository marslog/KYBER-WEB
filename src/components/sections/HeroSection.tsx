"use client";

import ProductHighlightsSection from "@/components/sections/ProductHighlightsSection";
import PlatformShowcaseBanner from "@/components/sections/PlatformShowcaseBanner";

export function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function HeroSection() {
  return (
    <>
      <PlatformShowcaseBanner />
      <ProductHighlightsSection />
    </>
  );
}
