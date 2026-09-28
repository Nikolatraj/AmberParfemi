"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { NOTES, type Note } from "@/lib/notes";
import SectionHeading from "./SectionHeading";

/** Size of the desktop hover preview, in px — also used to centre it on the cursor. */
const PREVIEW_W = 230;
const PREVIEW_H = 300;

/** How far the preview trails the pointer: lower is heavier. */
const EASE = 0.12;

/**
 * The picture for a note — or, for the ones still waiting on art, a type-only
 * amber card instead of another note's photo. Both the row thumbnails and the
 * hover preview go through here.
 *
 * `label` draws the note's name into that card: wanted in the large desktop
 * preview, but not at thumbnail size where it would be unreadable.
 */
function NoteArt({
  note,
  label = true,
  className = "",
}: {
  note: Note;
  label?: boolean;
  className?: string;
}) {
  if (note.noArt) {
    return (
      <div
        aria-hidden="true"
        className={`flex items-center justify-center bg-amber p-3 text-center ${className}`}
      >
        {label && (
          <span className="text-xs uppercase leading-tight tracking-[0.2em] text-white">
            {note.label}
          </span>
        )}
      </div>
    );
  }

  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={note.image}
      alt=""
      aria-hidden="true"
      loading="lazy"
      decoding="async"
      className={`object-cover ${className}`}
    />
  );
}

/**
 * Browse-by-note section: a typographic index rather than a grid of pictures.
 * Hovering a row dims the rest and floats that note's photo beside the cursor,
 * so the imagery is a reward for browsing instead of ten thumbnails competing
 * at once.
 */
export default function Notes() {
  const [active, setActive] = useState<number | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  // Where the preview is headed vs. where it currently sits. Kept in refs and
  // written straight to the node: putting this in state would re-render all ten
  // rows every frame.
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  // The row was reached by keyboard, so the preview is anchored to it and the
  // pointer must not drag it away. Chrome re-fires mousemove at the unchanged
  // cursor position whenever the rows re-render under it, which would otherwise
  // pull the preview back to a mouse nobody is touching.
  const viaKeyboard = useRef(false);
  const lastPointer = useRef({ x: -1, y: -1 });

  /** `snap` skips the easing — used when the preview is invisible anyway, so it
   *  doesn't glide in from wherever it was last left. */
  const moveTo = (x: number, y: number, snap: boolean) => {
    target.current = { x, y };
    if (!snap) return;
    current.current = { x, y };
    if (previewRef.current) {
      previewRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    }
  };

  // Trailing follow. Only runs while a row is active; the preview is hidden
  // outside of that, so there's nothing to animate.
  useEffect(() => {
    if (active === null) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const tick = () => {
      const el = previewRef.current;
      if (el) {
        current.current.x += (target.current.x - current.current.x) * EASE;
        current.current.y += (target.current.y - current.current.y) * EASE;
        el.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0)`;
      }
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active]);

  /**
   * Preview position for a pointer event, relative to the stage — or `null` if
   * the pointer hasn't actually moved while a keyboard-anchored row is active.
   * A real move hands control back to the mouse.
   */
  const pointFromEvent = (e: React.MouseEvent) => {
    const stage = stageRef.current;
    if (!stage) return null;
    const moved =
      e.clientX !== lastPointer.current.x || e.clientY !== lastPointer.current.y;
    lastPointer.current = { x: e.clientX, y: e.clientY };
    if (viaKeyboard.current) {
      if (!moved) return null;
      viaKeyboard.current = false;
    }
    const r = stage.getBoundingClientRect();
    return {
      x: e.clientX - r.left + 32,
      y: e.clientY - r.top - PREVIEW_H / 2,
    };
  };

  return (
    <section className="relative py-16">
      <div className="mx-auto w-[90%]">
        <SectionHeading title="Pronađi po notama" />

        <div
          ref={stageRef}
          className="relative"
          onMouseMove={(e) => {
            const p = pointFromEvent(e);
            // Nothing hovered yet: keep the preview parked under the cursor so
            // the first row entered appears exactly there.
            if (p) moveTo(p.x, p.y, active === null);
          }}
          onMouseLeave={() => setActive(null)}
        >
          <ul>
            {NOTES.map((note, i) => (
              <li
                key={note.href}
                className="border-t border-black/10 last:border-b"
              >
                <Link
                  href={note.href}
                  onMouseEnter={(e) => {
                    const p = pointFromEvent(e);
                    // Null means the cursor is parked and a keyboard-focused row
                    // owns the preview — don't let a phantom enter steal it.
                    if (!p) return;
                    moveTo(p.x, p.y, active === null);
                    setActive(i);
                  }}
                  onFocus={(e) => {
                    const stage = stageRef.current;
                    // Keyboard focus: the pointer isn't driving, so anchor the
                    // preview to the row itself rather than a stale cursor
                    // position. A mouse click doesn't match :focus-visible, so
                    // it keeps following the pointer.
                    if (stage && e.currentTarget.matches(":focus-visible")) {
                      const s = stage.getBoundingClientRect();
                      const r = e.currentTarget.getBoundingClientRect();
                      viaKeyboard.current = true;
                      moveTo(
                        s.width - PREVIEW_W,
                        r.top - s.top + r.height / 2 - PREVIEW_H / 2,
                        true,
                      );
                    }
                    setActive(i);
                  }}
                  onBlur={() => {
                    viaKeyboard.current = false;
                    setActive(null);
                  }}
                  className={`flex items-center gap-4 py-4 transition-all duration-300 md:items-baseline md:gap-6 motion-reduce:transition-none ${
                    active === null || active === i
                      ? "opacity-100"
                      : "opacity-25"
                  } ${active === i ? "md:pl-5" : "pl-0"}`}
                >
                  <span className="text-[11px] tabular-nums tracking-[0.2em] text-amber">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {/* Touch has no hover, so the thumbnail carries the imagery
                      the cursor preview provides on desktop. */}
                  <NoteArt
                    note={note}
                    label={false}
                    className="h-14 w-14 shrink-0 md:hidden"
                  />
                  <span className="text-2xl font-light uppercase tracking-tight md:text-4xl lg:text-5xl">
                    {note.label}
                  </span>
                  <span
                    className={`ml-auto text-lg transition-all duration-300 motion-reduce:transition-none ${
                      active === i
                        ? "translate-x-0 text-amber opacity-100"
                        : "-translate-x-2 opacity-0"
                    }`}
                  >
                    ↗
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Cursor-following preview. Desktop only — there's no hover on touch,
              and the transform would just chase taps around. All ten are mounted
              and crossfaded so the first hover isn't an empty box waiting on a
              download. */}
          <div
            ref={previewRef}
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 z-10 hidden overflow-hidden transition-opacity duration-300 md:block motion-reduce:hidden"
            style={{
              width: PREVIEW_W,
              height: PREVIEW_H,
              opacity: active === null ? 0 : 1,
            }}
          >
            {NOTES.map((note, i) => (
              <NoteArt
                key={note.href}
                note={note}
                className={`absolute inset-0 h-full w-full transition-opacity duration-300 ${
                  active === i ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
