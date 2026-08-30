"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Layers, Monitor, Play } from "lucide-react";
import type { PresentationProduct, ShowcaseViewId } from "@/data/presentationContent";
import PlatformArchitectureDiagram from "@/components/sections/PlatformArchitectureDiagram";
import ShowcaseVideo from "@/components/media/ShowcaseVideo";

const VIEW_META: Record<
  ShowcaseViewId,
  { label: string; shortLabel: string; icon: typeof Layers }
> = {
  architecture: { label: "Architecture", shortLabel: "Arch", icon: Layers },
  ui: { label: "Product UI", shortLabel: "UI", icon: Monitor },
  video: { label: "Demo video", shortLabel: "Video", icon: Play },
};

function availableViews(product: PresentationProduct): ShowcaseViewId[] {
  const views: ShowcaseViewId[] = ["architecture"];
  if (product.showcaseUiSlides?.length) views.push("ui");
  if (product.video) views.push("video");
  return views;
}

export default function ProductShowcaseMedia({ product }: { product: PresentationProduct }) {
  const views = useMemo(() => availableViews(product), [product]);
  const [activeView, setActiveView] = useState<ShowcaseViewId>(views[0] ?? "architecture");
  const [uiIndex, setUiIndex] = useState(0);

  const uiSlides = product.showcaseUiSlides ?? [];
  const activeUiSlide = uiSlides[uiIndex] ?? uiSlides[0];
  const videoAspect = product.videoAspect?.replace("/", " / ") ?? "16 / 9";

  function selectView(view: ShowcaseViewId) {
    setActiveView(view);
    if (view === "ui") setUiIndex(0);
  }

  return (
    <div className="product-showcase-media">
      {views.length > 1 && (
        <div className="product-showcase-media__tabs" role="tablist" aria-label={`${product.name} showcase views`}>
          {views.map((viewId) => {
            const meta = VIEW_META[viewId];
            const Icon = meta.icon;
            const selected = activeView === viewId;

            return (
              <button
                key={viewId}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`${product.id}-showcase-panel`}
                id={`${product.id}-showcase-tab-${viewId}`}
                onClick={() => selectView(viewId)}
                className={`product-showcase-media__tab ${selected ? "is-active" : ""}`}
              >
                <Icon className="product-showcase-media__tab-icon" strokeWidth={1.75} aria-hidden />
                <span className="product-showcase-media__tab-label">{meta.label}</span>
                <span className="product-showcase-media__tab-label-short">{meta.shortLabel}</span>
              </button>
            );
          })}
        </div>
      )}

      <div
        id={`${product.id}-showcase-panel`}
        role="tabpanel"
        aria-labelledby={`${product.id}-showcase-tab-${activeView}`}
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
              <div className="platform-product-row__zoom product-showcase-media__zoom">
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
              <p className="product-showcase-media__caption">{activeUiSlide.title}</p>
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
                  sizes="80px"
                />
              </span>
              <span className="product-showcase-media__ui-thumb-label">{slide.title}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
