"use client";

import Image from "next/image";

export default function PlatformArchitectureImage({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  return (
    <div className="platform-arch-image platform-arch-image--translucent">
      <Image
        src={src}
        alt={alt}
        width={1000}
        height={594}
        unoptimized
        className="platform-arch-image__img"
        sizes="(max-width: 1024px) 100vw, 50vw"
        priority
      />
    </div>
  );
}
