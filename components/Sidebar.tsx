"use client";

import { useState, useEffect } from "react";
import { FiGithub, FiLinkedin, FiYoutube, FiMenu, FiX } from "react-icons/fi";
import { FaSoundcloud } from "react-icons/fa";
import profile from "@/data/profile.json";

const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
];

const SOCIAL_LINKS = [
  { icon: FiGithub, href: profile.socialLinks.github, label: "GitHub" },
  { icon: FiLinkedin, href: profile.socialLinks.linkedin, label: "LinkedIn" },
  { icon: FiYoutube, href: profile.socialLinks.youtube, label: "YouTube" },
  { icon: FaSoundcloud, href: profile.socialLinks.soundcloud, label: "SoundCloud" },
];

export default function Sidebar() {
  const [activeSection, setActiveSection] = useState("about");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => item.href.slice(1));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -60% 0px" }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Mobile Header */}
      <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between bg-navy/90 px-6 py-4 backdrop-blur-sm lg:hidden">
        <div>
          <h1 className="text-lg font-bold text-lightest-slate">{profile.name}</h1>
          <p className="text-xs text-slate">{profile.tagline}</p>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-lightest-slate"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </header>

      {/* Mobile Navigation Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-navy/95 backdrop-blur-sm lg:hidden">
          <nav className="flex flex-col items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className={`text-lg font-medium transition-colors ${
                  activeSection === item.href.slice(1)
                    ? "text-green"
                    : "text-slate hover:text-lightest-slate"
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="mt-4 flex gap-6">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate transition-colors hover:text-green"
                  aria-label={link.label}
                >
                  <link.icon size={22} />
                </a>
              ))}
            </div>
          </nav>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden lg:fixed lg:left-0 lg:top-0 lg:flex lg:h-screen lg:w-1/2 lg:max-w-[600px] lg:flex-col lg:pl-[12vw] lg:pt-24">
        <div className="w-full max-w-[320px]">
          <h1 className="text-5xl font-bold tracking-tight text-lightest-slate">
            {profile.name}
          </h1>
          <h2 className="mt-3 text-lg font-medium text-slate">
            {profile.tagline}
          </h2>

          {/* Navigation */}
          <nav className="mt-16">
            <ul className="flex flex-col gap-4">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.href.slice(1);
                return (
                  <li key={item.href}>
                    <button
                      onClick={() => handleNavClick(item.href)}
                      className={`group flex items-center gap-3 text-xs font-bold uppercase tracking-widest transition-all ${
                        isActive
                          ? "text-lightest-slate"
                          : "text-slate hover:text-lightest-slate"
                      }`}
                    >
                      <span
                        className={`inline-block h-px transition-all ${
                          isActive
                            ? "w-16 bg-lightest-slate"
                            : "w-8 bg-slate group-hover:w-16 group-hover:bg-lightest-slate"
                        }`}
                      />
                      {item.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* Social Icons */}
        <div className="mt-12 flex gap-6">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate transition-colors hover:text-lightest-slate"
              aria-label={link.label}
            >
              <link.icon size={22} />
            </a>
          ))}
        </div>
      </aside>
    </>
  );
}
