"use client";

import { useEffect, useRef } from "react";

type ShowcaseVideoProps = {
  src: string;
  poster?: string;
  objectPosition?: string;
  objectFit?: "cover" | "contain";
  className?: string;
  priority?: boolean;
  ariaLabel?: string;
};

export default function ShowcaseVideo({
  src,
  poster,
  objectPosition = "center",
  objectFit = "cover",
  className = "",
  priority = false,
  ariaLabel,
}: ShowcaseVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const play = () => {
      void video.play().catch(() => undefined);
    };

    play();

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (!entry) return;
          if (entry.isIntersecting) play();
          else video.pause();
        },
        { threshold: 0.2 }
      );
      observer.observe(video);
      return () => observer.disconnect();
    }

    return undefined;
  }, [src]);

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      autoPlay
      loop
      muted
      playsInline
      preload={priority ? "auto" : "metadata"}
      aria-label={ariaLabel}
      aria-hidden={!ariaLabel}
      className={`showcase-video absolute inset-0 h-full w-full ${objectFit === "contain" ? "object-contain" : "object-cover"} ${className}`}
      style={{ objectPosition }}
    />
  );
}
