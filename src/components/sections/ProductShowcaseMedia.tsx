"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import type { PresentationProduct, ShowcaseViewId } from "@/data/presentationContent";
import { PRODUCT_HERO_SHOWCASE_ASPECT } from "@/data/presentationContent";
import PlatformArchitectureDiagram from "@/components/sections/PlatformArchitectureDiagram";
import ShowcaseVideo from "@/components/media/ShowcaseVideo";

const MEDIA_ASPECT = PRODUCT_HERO_SHOWCASE_ASPECT.replace("/", " / ");

interface ProductShowcaseMediaProps {
  product: PresentationProduct;
  activeView: ShowcaseViewId;
}

export default function ProductShowcaseMedia({ product, activeView }: ProductShowcaseMediaProps) {
  const [uiIndex, setUiIndex] = useState(0);

  const uiSlides = product.showcaseUiSlides ?? [];
  const activeUiSlide = uiSlides[uiIndex] ?? uiSlides[0];
  const videoAspect = product.videoAspect?.replace("/", " / ") ?? MEDIA_ASPECT;

  useEffect(() => {
    if (activeView === "ui") setUiIndex(0);
  }, [activeView, product.id]);

  return (
    <div className="product-showcase-media">
      <div
        id={`${product.id}-showcase-panel`}
        role="tabpanel"
        className={`product-showcase-media__panel product-showcase-media__panel--${activeView}`}
      >
        <AnimatePresence mode="wait" initial={false}>
          {activeView === "architecture" && (
            <motion.div
              key="architecture"
              className="product-showcase-media__architecture"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
            >
              <PlatformArchitectureDiagram product={product} />
            </motion.div>
          )}

          {activeView === "ui" && activeUiSlide && (
            <motion.div
              key={`ui-${activeUiSlide.id}`}
              className="product-showcase-media__ui"
              initial={{ opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.985 }}
              transition={{ duration: 0.22 }}
            >
              <div
                className="platform-product-row__zoom product-showcase-media__zoom"
                style={{ aspectRatio: MEDIA_ASPECT }}
              >
                <Image
                  src={activeUiSlide.image}
                  alt={activeUiSlide.imageAlt}
                  fill
                  unoptimized
                  quality={100}
                  className="showcase-media-sharpen object-contain object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority={uiIndex === 0}
                />
              </div>
            </motion.div>
          )}

          {activeView === "video" && product.video && (
            <motion.div
              key="video"
              className="product-showcase-media__video"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
            >
              <div
                className="platform-product-row__zoom product-showcase-media__zoom"
                style={{ aspectRatio: videoAspect }}
              >
                <ShowcaseVideo
                  src={product.video}
                  poster={product.videoPoster}
                  objectFit="contain"
                  className="showcase-video-crisp"
                  priority
                  ariaLabel={`${product.name} product demo`}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {activeView === "ui" && uiSlides.length > 1 && (
        <div className="product-showcase-media__ui-nav" aria-label="UI examples">
          {uiSlides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => setUiIndex(index)}
              aria-pressed={uiIndex === index}
              className={`product-showcase-media__ui-thumb ${uiIndex === index ? "is-active" : ""}`}
              title={slide.title}
            >
              <span className="product-showcase-media__ui-thumb-image">
                <Image
                  src={slide.image}
                  alt=""
                  fill
                  unoptimized
                  className="object-cover object-top"
                  sizes="72px"
                />
              </span>
              <span className="product-showcase-media__ui-thumb-label">{slide.title}</span>
            </button>
          ))}
        </div>
      )}

      {activeUiSlide && activeView === "ui" && (
        <p className="product-showcase-media__caption">{activeUiSlide.title}</p>
      )}
    </div>
  );
}
