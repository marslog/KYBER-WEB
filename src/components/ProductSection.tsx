"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface ProductFeature {
  icon: string;
  title: string;
  desc: string;
}

interface ProductSectionProps {
  id: string;
  name: string;
  tagline: string;
  description: string;
  logo: string;
  logoAlt: string;
  color: string;
  gradient: string;
  features: ProductFeature[];
  stats: { value: string; label: string }[];
  reversed?: boolean;
}

export default function ProductSection({
  id,
  name,
  tagline,
  description,
  logo,
  logoAlt,
  color,
  gradient,
  features,
  stats,
  reversed = false,
}: ProductSectionProps) {
  return (
    <section id={id} className="relative py-24 md:py-32 overflow-hidden">
      {/* Background glow */}
      <div
        className={`absolute inset-0 opacity-10 ${
          reversed ? "bg-gradient-to-l" : "bg-gradient-to-r"
        } from-transparent via-current to-transparent`}
        style={{ color: color }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <div
          className={`grid md:grid-cols-2 gap-12 items-center ${
            reversed ? "md:flex-row-reverse" : ""
          }`}
        >
          {/* Content */}
          <div className={reversed ? "md:order-2" : ""}>
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-4"
              style={{ backgroundColor: `${color}15`, color: color }}
            >
              {tagline}
            </div>

            <h2 className="text-4xl md:text-5xl font-black mb-4">
              {name}
            </h2>

            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              {description}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              {stats.map((s, i) => (
                <div key={i}>
                  <div
                    className="text-2xl md:text-3xl font-bold"
                    style={{ color: color }}
                  >
                    {s.value}
                  </div>
                  <div className="text-sm text-gray-500">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4">
              {features.map((f, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all group"
                >
                  <span
                    className="text-xl group-hover:scale-110 transition-transform"
                    style={{ color: color }}
                  >
                    {f.icon}
                  </span>
                  <div>
                    <div className="font-semibold text-sm text-white">
                      {f.title}
                    </div>
                    <div className="text-xs text-gray-500">{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Logo / Visual */}
          <div
            className={`flex items-center justify-center ${
              reversed ? "md:order-1" : ""
            }`}
          >
            <div
              className="relative w-full max-w-md aspect-square flex items-center justify-center rounded-3xlborder border-white/10 bg-gradient-to-br"
              style={{
                backgroundImage: `radial-gradient(circle at center, ${color}08, transparent 70%)`,
              }}
            >
              {/* Orbiting rings */}
              <div
                className="absolute inset-4 rounded-full border border-white/5 animate-spin"
                style={{ animationDuration: "30s" }}
              />
              <div
                className="absolute inset-8 rounded-full border border-white/5 animate-spin"
                style={{ animationDuration: "20s", animationDirection: "reverse" }}
              />
              <div
                className="absolute inset-16 rounded-full border border-white/5 animate-spin"
                style={{ animationDuration: "15s" }}
              />

              {/* Center glow */}
              <div
                className="absolute w-48 h-48 rounded-full blur-3xl opacity-20"
                style={{ backgroundColor: color }}
              />

              <Image
                src={logo}
                alt={logoAlt}
                width={250}
                height={250}
                className="relative z-10 w-48 h-48 object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
