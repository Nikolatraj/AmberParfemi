import type { ReactNode } from "react";
import WipeIn from "./WipeIn";

type SectionHeadingProps = {
  title: string;
  /** Optional right-aligned action, e.g. a "Vidi sve" link. */
  action?: ReactNode;
};

/**
 * Section heading: light, wide-tracked uppercase title with optional action.
 * The title wipes in from the left as it enters view — the only scroll
 * animation on the page now that the section fades are gone.
 */
export default function SectionHeading({ title, action }: SectionHeadingProps) {
  return (
    <div className="mb-12 flex items-baseline justify-between gap-4">
      <h2 className="text-2xl font-light uppercase tracking-[0.22em] sm:text-3xl">
        <WipeIn>
          <span className="mr-2.5 text-amber">•</span>
          {title}
        </WipeIn>
      </h2>
      {action}
    </div>
  );
}
