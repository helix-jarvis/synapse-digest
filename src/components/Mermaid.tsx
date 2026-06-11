"use client";

import React, { useEffect, useRef } from "react";
import mermaid from "mermaid";

mermaid.initialize({
  startOnLoad: false,
  theme: "dark",
  fontFamily: "Inter, sans-serif",
});

interface MermaidProps {
  chart: string;
}

export default function Mermaid({ chart }: MermaidProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.innerHTML = "";
      mermaid.render(
        `mermaid-svg-${Math.random().toString(36).substr(2, 9)}`,
        `<div class="mermaid">${chart}</div>`,
        ref.current
      );
    }
  }, [chart]);

  return (
    <div className="flex justify-center my-8 overflow-x-auto py-4 bg-zinc-900/50 rounded-xl border border-zinc-800">
      <div ref={ref} className="mermaid" />
    </div>
  );
}
