"use client";

import { motion } from "framer-motion";
import type { Product } from "@/data/products";
import SceneCanvas from "@/components/three/SceneCanvas";
import HCIWorld from "@/components/three/HCIWorld";
import MARSLOQWorld from "@/components/three/MARSLOQWorld";
import KRGWorld from "@/components/three/KRGWorld";
import Button from "@/components/ui/Button";
import { scrollToId } from "./HeroSection";

function WorldVisual({ type }: { type: Product["visualType"] }) {
  if (type === "hci") return <HCIWorld />;
  if (type === "observability") return <MARSLOQWorld />;
  if (type === "security") return <KRGWorld />;
  return null;
}

interface ProductDetailSectionProps {
  product: Product;
  index: number;
  reversed?: boolean;
}

export default function ProductDetailSection({
  product,
  index,
  reversed = false,
}: ProductDetailSectionProps) {
  return (
    <section id={product.id} className="relative py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            className={reversed ? "md:order-2" : ""}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
          >
            <div
              className="text-xs font-semibold uppercase tracking-[0.3em] mb-4"
              style={{ color: product.accent }}
            >
              {`0${index + 2} — ${product.category}`}
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-ink mb-3">
              {product.name}
            </h2>
            <div className="text-lg text-ink2 mb-6">{product.tagline}</div>
            <p className="text-ink2 leading-relaxed mb-8">{product.description}</p>

            <div className="grid grid-cols-2 gap-3 mb-10">
              {product.capabilities.map((c) => (
                <div
                  key={c}
                  className="glass rounded-lg px-4 py-3 text-sm text-ink flex items-center gap-2"
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: product.accent }}
                  />
                  {c}
                </div>
              ))}
            </div>

            <Button onClick={() => scrollToId("cta")}>Explore {product.name}</Button>
          </motion.div>

          <motion.div
            className={reversed ? "md:order-1" : ""}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
          >
            <SceneCanvas className="h-[380px] md:h-[460px] w-full" camera={{ position: [0, 0.4, 6.4], fov: 50 }}>
              <WorldVisual type={product.visualType} />
            </SceneCanvas>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
