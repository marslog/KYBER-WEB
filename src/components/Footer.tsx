"use client";

import Image from "next/image";

const footerLinks = {
  Products: [
    { label: "MARSLOG", href: "#marslog" },
    { label: "KYBER HCI", href: "#kyber-hci" },
  ],
  Company: [
    { label: "About", href: "#about" },
    { label: "Careers", href: "#" },
    { label: "Partners", href: "#" },
    { label: "Contact", href: "#contact" },
  ],
  Resources: [
    { label: "Documentation", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Support", href: "#" },
  ],
  Legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-[#060818]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Image
              src="/assets/kyber-logo.png"
              alt="KYBER"
              width={100}
              height={40}
              className="h-8 w-auto mb-4"
            />
            <p className="text-sm text-gray-500 leading-relaxed">
              Enterprise Security & Infrastructure Solutions. Powering the next generation of AIOps and HCI.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-bold text-white mb-4">{title}</h4>
              <ul className="space-y-2">
                {links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-sm text-gray-500 hover:text-white transition-colors"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-600">
            © 2025 KYBER. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="text-gray-500 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 2.5c.89 25.12 1.57 3.77 1.38 2.11 5.45.18 5.43.37 6.19.37.59-.08 1.17-.23 1.71-.45a8 8 0 00.58-1.97c-1.67-.83-1.53-.53-2.66-1.17-.61.53-1.25.99-1.97.89a-1.35 1.35 3.5 1.56-.85.82-.24.15-.25.13.37-.22.74-.45a-1.35 1.35 1.35 2.06-.85.82-.24.15-.25.13.37-.22.74-.45a-1.35 1.35 1.35 2.06-.85.82-.24.15-.25.13.37-.22.74-.45a-1.35 1.35 1.35 3.5 1.56-.85.82-.24.15-.25.13.37-.22.74-.45a-1.35 1.35 1.35 2.06-.85.82-.24.15-.25.13.37-.22.74-.45a-1.35 1.35 1.35 2.06-.85.82-.24.15-.25.13.37-.22.74-.45a-1.35 1.35 1.35 3.5 1.56-.85.82-.24.15-.25.13.37-.22.74-.45a-1.35 1.35 1.35 2.06-.85.82-.24.15-.25.13.37-.22.74-.45a-1.35 1.35 1.35 2.06-.85.82-.24.15-.25.13.37-.22.74-.45a-1.35 1.35 1.35 3.5 1.56-.85.82-.24.15-.25.13.37-.22.74-.45a-1.35 1.35 1.35 2.06-.85.82-.24.15-.25.13.37-.22.74-.45a-1.35 1.35 1.35 3.5 1.56-.85.82-.24.15-.25.13.37-.22.74-.45a-1.35 1.35 1.35 2.06-.85.82-.24.15-.25.13.37-.22.74-.45a-1.35 1.35 1.35 3.5 1.56-.85.82-.24.15-.25.13.37-.22.74-.45a-1.35 1.35 1.35 2.06-.85.82-.24.15-.25.13.37-.22.74-.45a-1.35 1.35 1.35 3.5 1.56-.85.82-.24.15-.25.13.37-.22.74-.45.38-.14.75-.27.75-.27.75-.39.38-.15.71-.3.71-.39.38-.15.71-.3.71-.39 1.11-.12" clip-rule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
