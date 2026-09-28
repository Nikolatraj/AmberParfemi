"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

/**
 * Site-wide momentum smooth scrolling. Lower `lerp` = heavier, more noticeable
 * easing on wheel/trackpad. Lenis scrolls the real document, so scroll-driven
 * effects (e.g. the quiz section) keep working.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.075, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
