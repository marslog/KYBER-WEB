"use client";

import { Zap, Target, BarChart3, Users } from "lucide-react";

const features = [
  {
    title: "High Performance",
    description: "Optimized solutions to ensure your systems run at peak efficiency.",
    icon: Zap,
  },
  {
    title: "Strategic Planning",
    description: "Data-driven strategies to align IT with your business goals.",
    icon: Target,
  },
  {
    title: "Advanced Analytics",
    description: "Real-time insights to monitor and improve your infrastructure.",
    icon: BarChart3,
  },
  {
    title: "Expert Collaboration",
    description: "Dedicated teams working alongside you for seamless integration.",
    icon: Users,
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0a1f44] mb-4">
            Our Core Features
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover the key capabilities that set our services apart and drive success for your business.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={idx}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              >
                <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center mb-6">
                  <IconComponent className="w-7 h-7 text-[#0057d9]" />
                </div>
                <h3 className="text-lg font-bold text-[#0a1f44] mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
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
