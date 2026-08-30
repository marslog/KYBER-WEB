"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Layers, Monitor, Play } from "lucide-react";
import {
  PLATFORM_SHOWCASE_VIEWS,
  type PresentationProduct,
  type ShowcaseViewId,
} from "@/data/presentationContent";
import PlatformArchitectureDiagram from "@/components/sections/PlatformArchitectureDiagram";
import ShowcaseVideo from "@/components/media/ShowcaseVideo";

const VIEW_ICONS = {
  architecture: Layers,
  ui: Monitor,
  video: Play,
} as const;

function availableViews(product: PresentationProduct): ShowcaseViewId[] {
  const views: ShowcaseViewId[] = ["architecture"];
  if (product.showcaseUiSlides?.length) views.push("ui");
  if (product.video) views.push("video");
  return views;
}

export default function ProductShowcaseMedia({ product }: { product: PresentationProduct }) {
  const views = useMemo(() => availableViews(product), [product]);
  const viewOptions = useMemo(
    () => PLATFORM_SHOWCASE_VIEWS.filter((view) => views.includes(view.id)),
    [views],
  );

  const [activeView, setActiveView] = useState<ShowcaseViewId>("architecture");
  const [uiIndex, setUiIndex] = useState(0);

  const uiSlides = product.showcaseUiSlides ?? [];
  const activeUiSlide = uiSlides[uiIndex] ?? uiSlides[0];
  const [videoWidth, videoHeight] = (product.videoAspect ?? "1920/956")
    .split("/")
    .map((value) => Number.parseInt(value.trim(), 10));

  function selectView(view: ShowcaseViewId) {
    setActiveView(view);
    if (view === "ui") setUiIndex(0);
  }

  return (
    <div
      className={`product-showcase-media${
        activeView === "video" ? " product-showcase-media--video" : ""
      }`}
    >
      <div
        className={`product-showcase-media__stage${
          activeView === "video" ? " product-showcase-media__stage--video" : ""
        }`}
      >
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
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <PlatformArchitectureDiagram product={product} />
              </motion.div>
            )}

            {activeView === "ui" && activeUiSlide && (
              <motion.div
                key={`ui-${activeUiSlide.id}`}
                className="product-showcase-media__ui"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="product-showcase-media__frame product-showcase-media__frame--ui">
                  <Image
                    src={activeUiSlide.image}
                    alt={activeUiSlide.imageAlt}
                    width={activeUiSlide.width}
                    height={activeUiSlide.height}
                    unoptimized
                    sizes="(max-width: 1024px) 100vw, 36rem"
                    className="product-showcase-media__image"
                    priority={uiIndex === 0}
                  />
                </div>
              </motion.div>
            )}

            {activeView === "video" && product.video && (
              <motion.div
                key="video"
                className="product-showcase-media__video"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="product-showcase-media__frame product-showcase-media__frame--video">
                  <ShowcaseVideo
                    src={product.video}
                    poster={product.videoPoster}
                    variant="responsive"
                    width={videoWidth}
                    height={videoHeight}
                    objectPosition="center top"
                    className="product-showcase-media__video-el"
                    priority
                    ariaLabel={`${product.name} product demo`}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {viewOptions.length > 1 && (
          <div className="product-showcase-media__dock">
            <div
              className="product-showcase-media__tabs"
              role="tablist"
              aria-label={`${product.name} showcase views`}
            >
              {viewOptions.map((view) => {
                const Icon = VIEW_ICONS[view.id];
                const selected = activeView === view.id;

                return (
                  <button
                    key={view.id}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-controls={`${product.id}-showcase-panel`}
                    id={`${product.id}-showcase-tab-${view.id}`}
                    onClick={() => selectView(view.id)}
                    className={`product-showcase-media__tab ${selected ? "is-active" : ""}`}
                  >
                    <Icon className="product-showcase-media__tab-icon" strokeWidth={1.75} aria-hidden />
                    {view.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}
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
                  width={slide.width}
                  height={slide.height}
                  unoptimized
                  className="product-showcase-media__thumb-image"
                  sizes="96px"
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
