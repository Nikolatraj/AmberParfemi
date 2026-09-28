"use client";

import { useEffect, useRef, useState } from "react";

/** Matches the reference easing: quick off the mark, long slow settle. */
const EASING = "cubic-bezier(0.11, 0.82, 0.39, 0.92)";

/** Past 100% on the right/bottom so glyph overhang and antialiasing aren't shaved. */
const SHOWN = "polygon(0 0, 110% 0, 110% 110%, 0 110%)";

/** Collapsed against the edge the wipe travels away from. */
const HIDDEN = {
  /** Reference site's exact values — flat against the left edge. */
  left: "polygon(0 0, 0 0, 0 100%, 0 100%)",
  /** Flat against the top edge; only the y values move, so the sweep is square. */
  down: "polygon(0 0, 110% 0, 110% 0, 0 0)",
};

/**
 * One-shot wipe: the first time it enters the viewport its contents are
 * uncovered by a clip-path sweeping in from one edge, then it stops observing.
 * For headings — the text is revealed in place rather than moved, so the line
 * never shifts under the reader.
 *
 * Inline (`inline-block`) on purpose so it can sit inside an `h2` without
 * disturbing baseline alignment. Reduced motion is handled in CSS (the
 * `[data-wipe]` rule in globals.css) rather than here, so the content is
 * visible even if this observer never runs.
 */
export default function WipeIn({
  children,
  className = "",
  delay = 0,
  direction = "left",
}: {
  children: React.ReactNode;
  className?: string;
  /** Hold the wipe back, e.g. to let a section's own reveal settle first. */
  delay?: number;
  /** Edge the reveal travels from: `left` sweeps rightwards, `down` downwards. */
  direction?: "left" | "down";
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      // threshold 0, not 0.15: a single heading line is short enough that a
      // ratio-based trigger is needlessly fussy.
      { threshold: 0, rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // The observed element must NOT be the clipped one. Chromium measures
  // intersection against the target's visible rect, so a zero-width clip-path
  // reports zero intersection — the observer would never fire, the state would
  // never flip, and the heading would stay invisible forever.
  return (
    <span ref={ref} className={`inline-block ${className}`}>
      <span
        data-wipe
        className="inline-block"
        style={{
          clipPath: shown ? SHOWN : HIDDEN[direction],
          transition: `clip-path 900ms ${EASING}`,
          transitionDelay: `${delay}ms`,
        }}
      >
        {children}
      </span>
    </span>
  );
}
