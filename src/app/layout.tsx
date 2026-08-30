import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "KYBER — Enterprise Infrastructure & Observability",
  description:
    "KYBER delivers hyper-converged infrastructure (HCI, KSV, KSAN), ransomware defense (KRG), and intelligent observability (MARSLOQ) — one unified platform on any hardware.",
  openGraph: {
    title: "KYBER — Enterprise Infrastructure & Observability",
    description:
      "Modern virtualization, distributed storage, security, and intelligent observability — built into one unified KYBER ecosystem for enterprise teams.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${inter.variable} antialiased font-sans`}>
        {children}
      </body>
    </html>
  );
}

