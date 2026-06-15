"use client";

import React, { useEffect, useState } from "react";
import { List, ChevronDown, ChevronUp, X } from "lucide-react";

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
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const updateScroll = () => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight - windowHeight;
      setProgress((currentScrollY / docHeight) * 100);
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

      {/* Mobile TOC Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full shadow-lg md:hidden transition-all active:scale-95"
      >
        {isOpen ? <X className="h-4 w-4" /> : <List className="h-4 w-4" />}
        <span className="text-sm font-medium">Contents</span>
      </button>

      {/* Mobile TOC Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/80 md:hidden p-6 flex flex-col">
          <div className="flex justify-end">
            <button onClick={() => setIsOpen(false)} className="text-zinc-400">
              <X className="h-8 w-8" />
            </button>
          </div>
          <div className="mt-8 overflow-y-auto">
            <h4 className="text-xl font-bold text-white mb-6">In this article</h4>
            <nav className="space-y-4">
              {headings.map((heading) => (
                <a
                  key={heading.id}
                  href={`#${heading.id}`}
                  onClick={() => setIsOpen(false)}
                  className={`block transition-colors ${
                    heading.level === 2 
                      ? "text-lg font-semibold text-white" 
                      : "text-zinc-400 hover:text-white ml-4 text-base"
                  }`}
                >
                  {heading.text}
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
