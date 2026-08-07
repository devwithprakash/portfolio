"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blogs" },
  { label: "Let's Talk", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isDark = resolvedTheme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 nav-root ${
          scrolled || mobileOpen ? "nav-scrolled" : ""
        }`}
      >
        <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="nav-logo text-lg sm:text-2xl font-bold tracking-tight hover:opacity-75 transition-opacity select-none"
            style={{ fontFamily: "var(--font-logo)" }}
          >
            Prakash
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`relative px-3 font-sans lg:px-4 py-1.5 text-sm font-medium font-mono transition-all duration-200 rounded-sm ${
                  isActive(link.href) ? "nav-link-active" : "nav-link"
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="nav-dot absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full" />
                )}
              </Link>
            ))}

            <button
              onClick={toggleTheme}
              id="theme-toggle-desktop"
              className="nav-icon-btn ml-1 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200"
              aria-label={
                mounted
                  ? isDark
                    ? "Switch to light mode"
                    : "Switch to dark mode"
                  : "Toggle theme"
              }
            >
              {mounted ? (
                isDark ? (
                  <Sun size={16} />
                ) : (
                  <Moon size={16} />
                )
              ) : (
                <span className="w-4 h-4" />
              )}
            </button>
          </div>

          <div className="flex md:hidden items-center gap-1">
            <button
              onClick={toggleTheme}
              id="theme-toggle-mobile"
              className="nav-icon-btn w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200"
              aria-label={
                mounted
                  ? isDark
                    ? "Switch to light mode"
                    : "Switch to dark mode"
                  : "Toggle theme"
              }
            >
              {mounted ? (
                isDark ? (
                  <Sun size={16} />
                ) : (
                  <Moon size={16} />
                )
              ) : (
                <span className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="nav-icon-btn w-9 h-9 flex items-center justify-center rounded-md transition-all duration-200"
              aria-label="Toggle mobile menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden max-w-4xl mx-auto px-4 pb-4 flex flex-col gap-1 animate-in fade-in slide-in-from-top-2 duration-200">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  isActive(link.href) ? "nav-mobile-active" : "nav-mobile-link"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </>
  );
}
