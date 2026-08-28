"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0e2a]/90 backdrop-blur-xl shadow-lg shadow-blue-500/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image
            src="/assets/kyber-logo.png"
            alt="KYBER"
            width={120}
            height={40}
            className="h-8 w-auto"
          />
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="#products" className="text-gray-300 hover:text-cyan-400 transition-colors">
            Products
          </a>
          <a href="#features" className="text-gray-300 hover:text-cyan-400 transition-colors">
            Features
          </a>
          <a href="#about" className="text-gray-300 hover:text-cyan-400 transition-colors">
            About
          </a>
          <a href="#contact" className="text-gray-300 hover:text-cyan-400 transition-colors">
            Contact
          </a>
          <button className="px-5 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold transition-all shadow-lg shadow-cyan-500/25">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
}
