import Image from "next/image";

const HERO_ATMOSPHERE = "/assets/backgrounds/hero-hci-atmosphere.jpg";

/** Scoped hero intro backdrop — HCI atmosphere + minimal line art */

export default function HeroBackground() {
  return (
    <div className="hero-background" aria-hidden="true">
      <div className="hero-background__photo">
        <Image
          src={HERO_ATMOSPHERE}
          alt=""
          fill
          priority
          unoptimized
          sizes="(max-width: 1280px) 80vw, 960px"
        />
      </div>

      <div className="hero-background__wash" />

      <svg
        className="hero-background__svg"
        viewBox="0 0 1200 480"
        preserveAspectRatio="xMaxYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="hero-flow" x1="100%" y1="50%" x2="0%" y2="50%">
            <stop offset="0%" stopColor="#111111" stopOpacity="0.14" />
            <stop offset="55%" stopColor="#111111" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#111111" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Converged HCI triangle */}
        <g opacity="0.11" stroke="#111111" strokeWidth="1.2" fill="none">
          <circle cx="920" cy="160" r="44" />
          <circle cx="1020" cy="230" r="44" />
          <circle cx="840" cy="250" r="44" />
          <line x1="920" y1="160" x2="1020" y2="230" />
          <line x1="920" y1="160" x2="840" y2="250" />
          <line x1="1020" y1="230" x2="840" y2="250" />
        </g>

        {/* Data streams toward platform */}
        <path
          d="M 980 200 C 820 190 620 210 380 230 C 220 245 100 260 40 270"
          fill="none"
          stroke="url(#hero-flow)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M 1000 280 C 860 270 680 290 480 305 C 300 318 160 330 60 338"
          fill="none"
          stroke="url(#hero-flow)"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.75"
        />

        {/* Log pulse dots */}
        <g opacity="0.14" fill="#111111">
          <circle cx="340" cy="228" r="3" />
          <circle cx="480" cy="238" r="2.5" />
          <circle cx="620" cy="248" r="3" />
          <circle cx="760" cy="258" r="2.5" />
        </g>
      </svg>
    </div>
  );
}
