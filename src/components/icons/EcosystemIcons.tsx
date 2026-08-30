import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function iconProps({ size = 16, className, ...props }: IconProps) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 64 64",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className,
    ...props,
  };
}

/** Flaticon-style hypervisor / virtualization icon */
export function HypervisorIcon(props: IconProps) {
  return (
    <svg {...iconProps(props)} aria-hidden>
      <rect x="10" y="34" width="44" height="18" rx="3" stroke="currentColor" strokeWidth="3" />
      <rect x="14" y="38" width="8" height="4" rx="1" fill="currentColor" />
      <rect x="26" y="38" width="8" height="4" rx="1" fill="currentColor" />
      <rect x="38" y="38" width="12" height="4" rx="1" fill="currentColor" />
      <rect x="18" y="12" width="28" height="18" rx="3" stroke="currentColor" strokeWidth="3" />
      <path d="M24 20h16M24 24h10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M32 30v4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="32" cy="8" r="3" fill="currentColor" />
      <path d="M32 11v1" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

/** Flaticon-style centralized hub-and-spoke icon */
export function CentralizedIcon(props: IconProps) {
  return (
    <svg {...iconProps(props)} aria-hidden>
      <circle cx="32" cy="32" r="8" stroke="currentColor" strokeWidth="3" />
      <circle cx="32" cy="10" r="4" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="51" cy="22" r="4" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="51" cy="42" r="4" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="32" cy="54" r="4" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="13" cy="42" r="4" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="13" cy="22" r="4" stroke="currentColor" strokeWidth="2.5" />
      <path
        d="M32 18v6M44 24l-5 3M44 40l-5-3M32 46v-6M20 40l5-3M20 24l5 3"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Observability / log analytics icon */
export function ObservabilityIcon(props: IconProps) {
  return (
    <svg {...iconProps(props)} aria-hidden>
      <rect x="10" y="14" width="44" height="36" rx="4" stroke="currentColor" strokeWidth="3" />
      <path d="M18 40l8-10 8 6 12-16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="44" cy="24" r="3" fill="currentColor" />
    </svg>
  );
}

/** Security shield icon */
export function SecurityShieldIcon(props: IconProps) {
  return (
    <svg {...iconProps(props)} aria-hidden>
      <path
        d="M32 8l18 8v14c0 12-8 20-18 24-10-4-18-12-18-24V16l18-8z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M24 32l6 6 12-12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export type EcosystemIconComponent = typeof HypervisorIcon;
