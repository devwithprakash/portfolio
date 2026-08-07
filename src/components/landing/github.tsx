"use client";

import { GitHubCalendar } from "react-github-calendar";
import { useEffect, useRef, useState } from "react";

const GITHUB_USERNAME = "devwithprakash";

const darkTheme = {
  light: ["#1b1b1b", "#4a4a4a", "#7a7a7a", "#a8a8a8", "#d4d4d4"],
  dark: ["#1b1b1b", "#4a4a4a", "#7a7a7a", "#a8a8a8", "#d4d4d4"],
};

const lightTheme = {
  light: ["#ebebeb", "#b8b8b8", "#8a8a8a", "#5c5c5c", "#2e2e2e"],
  dark: ["#ebebeb", "#b8b8b8", "#8a8a8a", "#5c5c5c", "#2e2e2e"],
};

// number of weeks columns rendered by the lib (roughly 53 for a full year)
const WEEK_COLUMNS = 53;
const MIN_BLOCK = 8;
const MAX_BLOCK = 14;
const MARGIN_RATIO = 0.25; // margin as a fraction of blockSize

export default function GithubContributions() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [blockSize, setBlockSize] = useState(12);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const dark = document.documentElement.classList.contains("dark");
    setIsDark(dark);

    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const computeBlockSize = (width: number) => {
      const raw = width / (WEEK_COLUMNS * (1 + MARGIN_RATIO));
      return Math.min(MAX_BLOCK, Math.max(MIN_BLOCK, Math.floor(raw)));
    };

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setBlockSize(computeBlockSize(entry.contentRect.width));
      }
    });

    resizeObserver.observe(el);
    return () => resizeObserver.disconnect();
  }, []);

  const blockMargin = Math.max(2, Math.round(blockSize * MARGIN_RATIO));

  return (
    <section
      id="github"
      className={`w-full transition-colors ${
        isDark ? "bg-[#0d0d0d]" : "bg-white"
      }`}
      aria-label="GitHub contributions section"
    >
      <div
        className={`max-w-4xl mx-auto px-5 py-8 border-b ${
          isDark ? "border-white/5" : "border-black/5"
        }`}
      >
        <h2
          className={`text-xl sm:text-2xl font-bold font-mono mb-1 ${
            isDark ? "text-white" : "text-black"
          }`}
        >
          Contributions
        </h2>

        <p
          className={`text-[0.65rem] sm:text-xs font-mono font-semibold tracking-widest uppercase mb-5 ${
            isDark ? "text-white/35" : "text-black/40"
          }`}
        >
          GitHub Contributions · @{GITHUB_USERNAME}
        </p>

        <div
          ref={containerRef}
          className={`github-calendar-wrap w-full rounded-xl border p-4 sm:p-5 overflow-hidden no-scrollbar ${
            isDark ? "border-white/8" : "border-black/10"
          } min-h-[160px]`}
        >
          {mounted && (
            <GitHubCalendar
              username={GITHUB_USERNAME}
              theme={isDark ? darkTheme : lightTheme}
              colorScheme={isDark ? "dark" : "light"}
              blockSize={blockSize}
              blockMargin={blockMargin}
              fontSize={11}
              labels={{ totalCount: "{{count}} contributions in the last year" }}
            />
          )}
        </div>
      </div>
    </section>
  );
}
