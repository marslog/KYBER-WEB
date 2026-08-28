"use client";

import dynamic from "next/dynamic";
import Image from "next/image";

const ParticleField = dynamic(() => import("./ParticleField"), { ssr: false });

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <ParticleField />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0e2a] z-[1]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#0a0e2a_70%)] z-[1]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-8">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          Enterprise Security & Infrastructure
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6">
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            KYBER
          </span>
        </h1>

        <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
          Powering next-generation{" "}
          <span className="text-cyan-400 font-semibold">AIOps Log Management</span>{" "}
          and{" "}
          <span className="text-blue-400 font-semibold">
            Hyper-Converged Infrastructure
          </span>{" "}
          for enterprise-grade performance and security.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="#products"
            className="px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-sm tracking-wide hover:from-cyan-400 hover:to-blue-500 transition-all shadow-xl shadow-cyan-500/25 hover:scale-105"
          >
            EXPLORE PRODUCTS
          </a>
          <a
            href="#features"
            className="px-8 py-4 rounded-full border border-gray-600 text-gray-300 font-bold text-sm tracking-wide hover:border-cyan-500 hover:text-cyan-400 transition-all hover:scale-105"
          >
            LEARN MORE
          </a>
        </div>

        {/* Product Logos Preview */}
        <div className="flex items-center justify-center gap-12 opacity-60">
          <div className="flex flex-col items-center gap-2">
            <Image
              src="/assets/marslogs-logo.png"
              alt="MARSLOGS"
              width={100}
              height={60}
              className="h-12 w-auto object-contain"
            />
          </div>
          <div className="w-px h-12 bg-gray-700" />
          <div className="flex flex-col items-center gap-2">
            <Image
              src="/assets/kyber-logo.png"
              alt="KYBER HCI"
              width={100}
              height={60}
              className="h-12 w-auto object-contain"
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <div className="w-6 h-10 rounded-full border-2 border-gray-600 flex items-start justify-center p-1">
          <div className="w-1 h-3 bg-cyan-400 rounded-full animate-bounce" />
        </div>
        <span className="text-xs text-gray-500 font-medium">Scroll</span>
      </div>
    </section>
  );
}
