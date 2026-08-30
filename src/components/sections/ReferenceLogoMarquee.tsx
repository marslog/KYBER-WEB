"use client";

import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { KYBER_REF_LOGOS, type KyberRefLogo } from "@/data/kyberRefLogos";

function LogoTile({ logo }: { logo: KyberRefLogo }) {
  return (
    <div className="kyber-ref-marquee__tile kyber-ref-tile kyber-ref__tile" title={logo.name}>
      <div className="relative h-14 md:h-16 w-[9rem] sm:w-[10.5rem] shrink-0">
        <Image
          src={logo.src}
          alt={logo.name}
          fill
          className="object-contain object-center"
          sizes="(max-width: 640px) 40vw, 168px"
        />
      </div>
    </div>
  );
}

export default function ReferenceLogoMarquee() {
  const reducedMotion = useReducedMotion();
  const logos = reducedMotion ? KYBER_REF_LOGOS : [...KYBER_REF_LOGOS, ...KYBER_REF_LOGOS];

  return (
    <div
      className={`kyber-ref-marquee${reducedMotion ? " kyber-ref-marquee--static" : ""}`}
      aria-label="Reference customers"
    >
      {!reducedMotion && (
        <>
          <div className="kyber-ref-marquee__fade kyber-ref-marquee__fade--left" aria-hidden />
          <div className="kyber-ref-marquee__fade kyber-ref-marquee__fade--right" aria-hidden />
        </>
      )}

      <div className="kyber-ref-marquee__viewport">
        <div className="kyber-ref-marquee__track">
          {logos.map((logo, index) => (
            <LogoTile key={`${logo.name}-${index}`} logo={logo} />
          ))}
        </div>
      </div>
    </div>
  );
}
