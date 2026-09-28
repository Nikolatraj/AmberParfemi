"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import WipeIn from "./WipeIn";

type Callout = {
  title: string;
  text: string;
  /** Position of the text block within the square bottle stage. */
  box: string;
  /** Connector endpoints + dots in a 0–100 viewBox (matches the square stage). */
  line: { x1: number; y1: number; x2: number; y2: number };
  /** Elbow point where the connector bends between the two dots. */
  bend: { x: number; y: number };
};

/** Build an angled leader line: dot → bend → bottle. */
function elbowPath(
  l: { x1: number; y1: number; x2: number; y2: number },
  bend: { x: number; y: number },
) {
  return `M ${l.x1} ${l.y1} L ${bend.x} ${bend.y} L ${l.x2} ${l.y2}`;
}

const callouts: Callout[] = [
  {
    title: "Odgovori na par pitanja",
    text: "Reci nam šta voliš — note, prilike, intenzitet",
    box: "left-[98%] top-[30%] text-left",
    line: { x1: 96, y1: 32, x2: 63, y2: 45 },
    bend: { x: 74, y: 32 },
  },
  {
    title: "Mi biramo za tebe",
    text: "Pretražujemo preko 150 parfema i izdvajamo prave",
    box: "left-[-22%] top-[58%] text-left",
    line: { x1: 12, y1: 58, x2: 47, y2: 71 },
    bend: { x: 34, y: 58 },
  },
  {
    title: "Otkrij svoj miris",
    text: "Preporuke po meri",
    box: "left-[98%] top-[78%] text-left",
    line: { x1: 96, y1: 96, x2: 63, y2: 83 },
    bend: { x: 74, y: 96 },
  },
];

/** Reveal each mobile callout as it scrolls into view. */
function Reveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
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
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        shown ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      {children}
    </div>
  );
}

/**
 * "Pronađi svoj miris" — quiz CTA. On desktop the bottle pins while scrolling
 * and the three callouts reveal in sequence; on mobile they stack and reveal
 * as they enter the viewport.
 */
export default function QuizCta() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const p = total > 0 ? Math.min(Math.max(-rect.top / total, 0), 1) : 0;
      setProgress(p);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  // Scroll thresholds at which each desktop callout reveals.
  const thresholds = [0.12, 0.4, 0.68];

  return (
    <section ref={sectionRef} className="relative md:h-[240vh]">
      <div className="relative flex flex-col items-center overflow-hidden md:sticky md:top-0 md:h-screen md:justify-center">
        {/* Decorative background waves — purely visual. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/waves/wave-1.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-16 -z-10 w-[45%] max-w-3xl select-none opacity-70"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/waves/wave-2.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-16 -left-24 -z-10 w-[45%] max-w-3xl select-none opacity-70"
        />

        {/* Heading — eyebrow wipes in from the left, the h2 follows downwards. */}
        <div className="w-[90%] text-center">
          <p className="text-[2rem] font-light tracking-[0.13em] text-black/50">
            <WipeIn>
              <span className="text-amber">•</span> PRONAĐI SVOJ MIRIS
            </WipeIn>
          </p>
          <h2 className="mx-auto mt-10 max-w-[1290px] text-4xl leading-tight tracking-tight sm:text-5xl lg:text-[5rem]">
            <WipeIn direction="down" delay={180}>
              NE ZNAŠ KOJI PARFEM JE PRAVI ZA TEBE
            </WipeIn>
          </h2>
        </div>

        {/* Desktop: bottle stage with positioned callouts */}
        <div
          className="relative mx-auto mt-6 hidden aspect-square w-full max-w-[560px] md:block"
          style={{ maxHeight: "56vh" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/boca2.png"
            alt="Parfem"
            className="absolute inset-0 h-full w-full object-contain"
          />

          {/* Connector lines */}
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 h-full w-full"
          >
            {callouts.map((c, i) => (
              <g
                key={c.title}
                style={{
                  opacity: progress > thresholds[i] ? 1 : 0,
                  transition: "opacity 700ms ease",
                }}
              >
                <path
                  d={elbowPath(c.line, c.bend)}
                  fill="none"
                  stroke="black"
                  strokeWidth={0.4}
                  vectorEffect="non-scaling-stroke"
                />
                <circle
                  cx={c.line.x1}
                  cy={c.line.y1}
                  r={0.7}
                  fill="var(--color-amber)"
                />
                <circle
                  cx={c.line.x2}
                  cy={c.line.y2}
                  r={0.7}
                  fill="var(--color-amber)"
                />
              </g>
            ))}
          </svg>

          {/* Callout text blocks */}
          {callouts.map((c, i) => (
            <div
              key={c.title}
              className={`absolute w-max whitespace-nowrap transition-all duration-700 ${c.box} ${
                progress > thresholds[i]
                  ? "translate-y-0 opacity-100"
                  : "translate-y-3 opacity-0"
              }`}
            >
              <p className="text-3xl font-medium">{c.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-black/55">
                {c.text}
              </p>
            </div>
          ))}
        </div>

        {/* Mobile: stacked bottle + callouts */}
        <div className="mt-8 w-[90%] md:hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/boca2.png"
            alt="Parfem"
            className="mx-auto h-64 w-auto object-contain"
          />
          <div className="mt-8 flex flex-col gap-6">
            {callouts.map((c) => (
              <Reveal key={c.title}>
                <p className="text-sm font-medium">{c.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-black/55">
                  {c.text}
                </p>
              </Reveal>
            ))}
          </div>
        </div>

        <Link
          href="/kviz"
          className={`mt-4 inline-block border border-black px-8 py-3 text-sm uppercase tracking-wide transition-all duration-700 hover:border-amber hover:bg-amber hover:text-white ${
            progress > 0.7
              ? "md:translate-y-0 md:opacity-100"
              : "md:pointer-events-none md:translate-y-3 md:opacity-0"
          }`}
        >
          Započni kviz
        </Link>
      </div>
    </section>
  );
}
