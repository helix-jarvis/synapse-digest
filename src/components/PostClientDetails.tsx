"use client";

import React, { useEffect, useState } from "react";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface PostClientDetailsProps {
  headings: TOCItem[];
}

export default function PostClientDetails({ headings }: PostClientDetailsProps) {
  const [progress, setProgress] = useState(0);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const updateScroll = () => {
      // Update progress bar
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight - windowHeight;
      setProgress((currentScrollY / docHeight) * 100);

      // Update active TOC link
      const elements = Array.from(document.querySelectorAll("h2, h3"));
      let currentHeadingId = "";
      for (const el of elements) {
        const rect = el.getBoundingClientRect();
        if (rect.top < windowHeight / 3) {
          currentHeadingId = el.id;
        } else {
          break;
        }
      }
      setActiveId(currentHeadingId);
    };

    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  return (
    <>
      {/* Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-blue-600 z-50 transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />

      {/* On Mobile, we could also show the TOC as a floating button, but let's stick to desktop for now */}
    </>
  );
}
