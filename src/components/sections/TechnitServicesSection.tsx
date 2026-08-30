"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SOLUTIONS_JOURNEYS } from "@/data/platformData";
import { getIcon } from "@/lib/icons";

export default function TechnitServicesSection() {
  return (
    <section id="solutions" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#0066ff]">
            Solutions
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0a1f44] mt-3">
            Solve Your Biggest Infrastructure Challenges
          </h2>
          <p className="text-[#5b6b82] mt-4 text-base">
            Proven solution journeys for virtualization modernization, ransomware resilience, and
            intelligent observability — powered by the KYBER platform.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {SOLUTIONS_JOURNEYS.map((solution) => {
            const Icon = getIcon(solution.iconName);
            return (
              <div
                key={solution.id}
                className="border border-[#e2e8f0] hover:border-[#0066ff]/40 p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col"
              >
                <div className="w-14 h-14 rounded-xl bg-[#0066ff]/10 border border-[#0066ff]/20 flex items-center justify-center text-[#0066ff] mb-6">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-[#0a1f44] mb-2">{solution.title}</h3>
                <p className="text-sm text-[#0066ff] font-medium mb-3">{solution.tagline}</p>
                <p className="text-sm text-[#5b6b82] leading-relaxed mb-6">{solution.description}</p>

                <div className="space-y-3 mb-6 flex-1">
                  {solution.journeySteps.map((step) => (
                    <div key={step.step} className="flex gap-3">
                      <span className="text-xs font-mono font-bold text-[#0066ff] shrink-0">
                        {step.step}
                      </span>
                      <div>
                        <div className="text-sm font-semibold text-[#0a1f44]">{step.title}</div>
                        <div className="text-xs text-[#5b6b82]">{step.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-[#e2e8f0] pt-4 space-y-2 mb-6">
                  {solution.outcomes.map((outcome) => (
                    <div key={outcome} className="flex items-start gap-2 text-xs text-[#5b6b82]">
                      <span className="text-[#0066ff] font-bold">✓</span>
                      <span>{outcome}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href={solution.href}
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#0066ff] hover:gap-3 transition-all"
                >
                  <span>Explore Solution</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
