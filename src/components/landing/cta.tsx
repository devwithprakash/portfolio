"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section
      id="contact"
      className="bg-[#0d0d0d] w-full border-t border-white/5"
      aria-label="Call to action section"
    >
      <div className="max-w-4xl mx-auto px-5 py-16 flex flex-col items-center text-center">
        <p className="text-[0.65rem] sm:text-xs font-mono font-semibold tracking-[0.25em] uppercase text-white/35 mb-4">
          Get in touch
        </p>

        <h2 className="text-2xl sm:text-3xl font-sans font-bold text-white leading-tight">
          Got an idea?{" "}
          <span className="text-white/45">Let's build it together.</span>
        </h2>

        <p className="mt-4 max-w-md text-sm text-white/55 leading-7">
          Open to full-time opportunities, freelance work, or simply discussing
          your next project.
        </p>

        <Link
          href="/contact"
          id="cta-lets-talk-btn"
          className="group mt-8 inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white px-5 py-2.5 text-sm font-medium text-[#0d0d0d] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
        >
          Let's Talk
          <ArrowRight
            size={15}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </div>
    </section>
  );
}
