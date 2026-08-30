"use client";

import { Search, Layers, Cpu, ShieldCheck } from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Discovery & Planning",
    description: "Comprehensive requirement analysis, infrastructure audit, and strategy mapping.",
    icon: Search,
  },
  {
    step: "02",
    title: "IT Architecture",
    description: "Designing robust, resilient cloud, network, and cybersecurity architecture.",
    icon: Layers,
  },
  {
    step: "03",
    title: "Execution & Testing",
    description: "Agile software deployment, system integration, and rigorous QA validation.",
    icon: Cpu,
  },
  {
    step: "04",
    title: "24/7 Support & Care",
    description: "Proactive monitoring, regular updates, threat defense, and SLA support.",
    icon: ShieldCheck,
  },
];

export default function ProcessSection() {
  return (
    <section id="process" className="py-24 bg-[#f4f7fb] relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#0057d9]">
            OUR WORK PROCESS
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0a1f44] mt-3 font-outfit">
            How We Execute IT Solutions
          </h2>
          <p className="text-[#5b6b82] mt-4 text-base font-sans">
            Our structured 4-step delivery process ensures flawless execution, security, and long-term business growth.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-[#e2e8f0] hover:border-[#0057d9] p-8 rounded-2xl relative transition-all duration-300 transform hover:-translate-y-2 shadow-sm hover:shadow-xl group"
              >
                {/* Step Number Badge */}
                <div className="absolute top-6 right-6 text-3xl font-black text-[#0057d9]/20 group-hover:text-[#0057d9] transition-colors font-outfit">
                  {item.step}
                </div>

                <div className="w-14 h-14 rounded-xl bg-[#0057d9]/10 border border-[#0057d9]/20 flex items-center justify-center text-[#0057d9] mb-6 group-hover:bg-[#0057d9] group-hover:text-white transition-colors">
                  <Icon className="w-7 h-7" />
                </div>

                <h3 className="text-xl font-bold text-[#0a1f44] mb-3 font-outfit">
                  {item.title}
                </h3>

                <p className="text-sm text-[#5b6b82] leading-relaxed font-sans">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
