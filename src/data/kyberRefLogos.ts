export interface KyberRefLogo {
  name: string;
  src: string;
  /** Full legal entity name shown as tooltip / accessible label */
  fullName?: string;
}

/** Enterprise-tier flagship customers — displayed in a highlighted row */
export const KYBER_ENTERPRISE_LOGOS: KyberRefLogo[] = [
  {
    name: "Mitsubishi Electric",
    fullName: "Mitsubishi Electric Asia (Thailand) Co., Ltd.",
    src: "/assets/references/mitsubishi-electric-clean.jpg",
  },
  {
    name: "Thai Union",
    src: "/assets/references/thai-union-clean.png",
  },
  {
    name: "Univentures",
    src: "/assets/references/univentures-clean.png",
  },
];

/** General reference customers — displayed in the scrolling marquee */
export const KYBER_REF_LOGOS: KyberRefLogo[] = [
  { name: "Camel Industry", src: "/assets/references/camelindustry-clean.png" },
  { name: "Maxx World", src: "/assets/references/maxx-world-clean.png" },
  { name: "Khunhan Hospital", src: "/assets/references/khunhan-hospital-clean.png" },
  { name: "Winona International", src: "/assets/references/winona-international-clean.png" },
  { name: "Boromarajonani College of Nursing", src: "/assets/references/boromarajonani-nursing-clean.png" },
  { name: "Bangpakok General Hospital 5", src: "/assets/references/bangpakok-hospital-5-clean.png" },
  { name: "Cosma Solution", src: "/assets/references/cosma-solution-clean.png" },
  { name: "Secure Serve", src: "/assets/references/secure-serve-clean.png" },
  { name: "Thai Lab", src: "/assets/references/thai-lab-clean.png" },
  { name: "TVI", src: "/assets/references/tvi-clean.png" },
  { name: "KST Hotel Supply", src: "/assets/references/kst-hotel-supply-clean.png" },
  { name: "Leonian", src: "/assets/references/leonian-clean.png" },
  { name: "Srisangwornsukhothai Hospital", src: "/assets/references/srisangwornsukhothai-hospital-clean.png" },
  { name: "Phrapokklao Nursing College Chanthaburi", src: "/assets/references/phrapokklao-nursing-chanthaburi-clean.png" },
  { name: "Suppatassana Company Limited", src: "/assets/references/suppatassana-company-clean.png" },
];
