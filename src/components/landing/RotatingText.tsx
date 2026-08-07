"use client";

import { useEffect, useState } from "react";

const titles = ["Full Stack Developer", "Backend Engineer", "Problem Solver"];

const TYPING_SPEED = 60;
const DELETING_SPEED = 30;
const PAUSE_DURATION = 1200;

export default function RotatingText() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentTitle = titles[titleIndex];

    if (!isDeleting && displayText === currentTitle) {
      const pause = setTimeout(() => setIsDeleting(true), PAUSE_DURATION);
      return () => clearTimeout(pause);
    }

    if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setTitleIndex((prev) => (prev + 1) % titles.length);
      return;
    }

    const timeout = setTimeout(
      () => {
        setDisplayText((prev) =>
          isDeleting
            ? currentTitle.slice(0, prev.length - 1)
            : currentTitle.slice(0, prev.length + 1),
        );
      },
      isDeleting ? DELETING_SPEED : TYPING_SPEED,
    );

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, titleIndex]);

  return (
    <div className="relative h-5 overflow-hidden">
      <p className="text-white/60 text-xs sm:text-sm font-medium">
        {displayText}
        <span className="inline-block w-[1px] h-3 sm:h-4 bg-white/60 ml-0.5 align-middle animate-pulse" />
      </p>
    </div>
  );
}
