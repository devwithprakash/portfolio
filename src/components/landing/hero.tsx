"use client";

import Image from "next/image";
import { Download } from "lucide-react";
import { useEffect, useState } from "react";
import RotatingText from "./RotatingText";

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="home"
      className="pt-14 bg-[#0d0d0d] w-full"
      aria-label="Hero section"
    >
      <div className="max-w-4xl mx-auto">
        <div className="relative">
          <div
            className={`relative w-full rounded-md overflow-hidden transition-opacity duration-700 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
            style={{ height: "clamp(120px, 20vw, 220px)" }}
          >
            <video
              src="/videos/samurai-banner.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#0d0d0d]/60 to-transparent" />
          </div>

          <div
            className={`absolute bottom-0 left-4 sm:left-5 translate-y-1/2 z-10 transition-all duration-700 delay-150 ${
              isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            <div className="relative group">
              <div className="p-[3px] sm:p-1 rounded-full bg-[#0d0d0d]">
                <div
                  className="
                    w-[72px]  h-[72px]
                    sm:w-[84px]  sm:h-[84px]
                    md:w-[100px]  md:h-[100px]
                    rounded-full overflow-hidden bg-[#1a1a1a]
                    ring-1 ring-white/12
                    transition-all duration-300
                    group-hover:ring-white/25
                  "
                >
                  <Image
                    src="/avatar.png"
                    alt="Profile picture of Prakash Jangid"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover object-center grayscale"
                    priority
                  />
                </div>
              </div>

              <span
                className="
                  absolute bottom-[6px] right-[6px]
                  sm:bottom-[7px] sm:right-[7px]
                  w-3 h-3 sm:w-3.5 sm:h-3.5
                  rounded-full bg-emerald-400
                  border-2 border-[#0d0d0d]
                  shadow-sm shadow-emerald-400/50
                "
              />
            </div>
          </div>
        </div>

        <div
          className={`px-4 sm:px-5 border-b border-white/5 transition-all duration-700 delay-300 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
        >
          <div className="flex items-end justify-between gap-2 pt-[50px] sm:pt-[58px] md:pt-[66px] pb-4 sm:pb-5">
            <div className="flex-1 min-w-0 flex flex-col md:gap-1">
              <h1 className="text-xl sm:text-2xl md:text-[1.7rem] font-bold font-mono text-white tracking-tight leading-none mb-1.5">
                Prakash Jangid
              </h1>
              <RotatingText />
              <p className="text-white/35 text-[11px] sm:text-xs">
                20 · Rajasthan, IND
              </p>
            </div>

            <div className="flex-shrink-0 flex flex-col items-end gap-2.5">
              <a
                href="https://drive.google.com/file/d/1QczvtZKoc1SBwYfqH77CCRY-Twv42fjm/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                id="hero-resume-btn"
                className="
                  inline-flex items-center gap-1.5
                  px-2.5 sm:px-3 py-1.5
                  rounded-md text-[11px] sm:text-xs font-mono font-medium
                  border border-white/12
                  text-white/55
                  hover:border-white/28 hover:text-white hover:bg-white/5
                  active:scale-[0.97] transition-all duration-200
                "
              >
                <Download size={11} />
                Resume
              </a>
            </div>
          </div>
        </div>
        <div
          className={`px-4 sm:px-5 py-6 border-b border-white/5 transition-all duration-700 delay-500 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
        >
          <h2 className="text-xl sm:text-2xl font-bold font-mono text-white mb-4">
            About
          </h2>
          <ul className="space-y-2.5 list-none">
            {[
              <>
                I&apos;m a{" "}
                <span className="text-white">Full Stack Developer</span>{" "}
                passionate about building scalable web applications with clean
                architecture and intuitive user experiences.
              </>,
              <>
                I build modern applications using{" "}
                <span className="text-white">
                  React, Next.js, TypeScript, Node.js &amp; PostgreSQL
                </span>{" "}
                with a focus on performance, maintainability, and developer
                experience.
              </>,
              <>
                As a Computer Science student, I enjoy solving real-world
                problems, exploring backend systems, and turning ideas into
                production-ready products through continuous learning and
                hands-on projects.
              </>,
            ].map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-2.5 text-white/55 text-sm sm:text-[0.9rem] leading-relaxed"
              >
                <span className="mt-[7px] w-1 h-1 rounded-full bg-white/30 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
