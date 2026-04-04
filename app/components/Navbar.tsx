"use client";

import { useState, useEffect } from "react";

import { BarChart3, Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";

// Navbar component — sticky with blur backdrop, collapses on mobile
export default function Navbar({ name, email, ui }: { name: string, email: string, ui: any }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Add a subtle border when user has scrolled down
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: ui.experience, href: "#experience" },
    { label: ui.education, href: "#education" },
    { label: ui.projects, href: "#projects" },
    { label: ui.skills, href: "#skills" },
    { label: ui.contact, href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-card border-x-0 border-t-0 border-b shadow-sm shadow-zinc-900/5 dark:shadow-black/20" : "bg-transparent"
      }`}
    >
      <nav className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo / Name */}
        <a
          href="#hero"
          className="flex items-center gap-2.5 group"
          aria-label="Home"
        >
          <div className="w-7 h-7 rounded-md bg-indigo-500 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-400 transition-colors shadow-inner drop-shadow-md">
            <BarChart3 className="w-4 h-4 text-white" strokeWidth={2.5} />
          </div>
          <span className="font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight text-sm">
            {name}
          </span>
        </a>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="px-3 py-1.5 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 rounded-md transition-all duration-150"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="ml-2 flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
            <a
              href={email}
              id="nav-cta"
              className="px-3 py-1.5 text-sm font-medium text-indigo-600 dark:text-indigo-400 border border-indigo-500/40 hover:border-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-md transition-all duration-150"
            >
              {ui.getInTouch}
            </a>
          </li>
        </ul>

        {/* Mobile menu toggle & Language/Theme controls */}
        <div className="flex md:hidden items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
          <button
            className="p-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      {isMenuOpen && (
        <div className="md:hidden glass-card border-b border-t shadow-lg">
          <ul className="max-w-5xl mx-auto px-6 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 rounded-md transition-all"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
