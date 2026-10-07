"use client";

import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import {
  KYBER_ENTERPRISE_LOGOS,
  KYBER_REF_LOGOS,
  type KyberRefLogo,
} from "@/data/kyberRefLogos";

function LogoTile({ logo, size = "regular" }: { logo: KyberRefLogo; size?: "regular" | "enterprise" }) {
  const isEnterprise = size === "enterprise";
  return (
    <div
      className={`kyber-ref-tile kyber-ref__tile${isEnterprise ? " kyber-ref-enterprise__tile" : " kyber-ref-marquee__tile"}`}
      title={logo.fullName ?? logo.name}
    >
      <div
        className={`relative shrink-0 ${
          isEnterprise
            ? "h-20 md:h-28 w-[14rem] sm:w-[18rem]"
            : "h-20 md:h-24 w-[12rem] sm:w-[14rem]"
        }`}
      >
        <Image
          src={logo.src}
          alt={logo.fullName ?? logo.name}
          fill
          quality={100}
          className="object-contain object-center kyber-ref__logo-img"
          sizes={isEnterprise ? "(max-width: 640px) 56vw, 288px" : "(max-width: 640px) 48vw, 224px"}
        />
      </div>
    </div>
  );
}

/** Enterprise-tier customer logos — highlighted static row */
export function EnterpriseLogoRow() {
  return (
    <div className="kyber-ref-enterprise" aria-label="Enterprise customers">
      <div className="kyber-ref-enterprise__row">
        {KYBER_ENTERPRISE_LOGOS.map((logo) => (
          <LogoTile key={logo.name} logo={logo} size="enterprise" />
        ))}
      </div>
    </div>
  );
}

/** Scrolling marquee of all reference customers */
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
