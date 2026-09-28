"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FALLBACK_IMAGE } from "@/lib/catalog";

/**
 * Product image viewer: one large frame with prev/next arrows and a thumbnail
 * strip underneath. Arrows and thumbnails are hidden when there is only one
 * shot, which is the common case until the API returns a real gallery.
 *
 * With no images at all the frame stays empty — see `productImages` for why we
 * do not substitute another product's render here.
 */
export default function ProductGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [index, setIndex] = useState(0);
  const hasMany = images.length > 1;

  if (images.length === 0) {
    return (
      <div className="flex aspect-[616/886] w-full items-center justify-center bg-[#F5F4F2]">
        <p className="text-[11px] uppercase tracking-[0.2em] text-black/30">
          Slika uskoro
        </p>
      </div>
    );
  }

  // Wrap around, so the arrows never dead-end on the first/last image.
  const step = (delta: number) =>
    setIndex((i) => (i + delta + images.length) % images.length);

  return (
    <div>
      <div className="relative">
        <div className="flex aspect-[616/886] w-full items-center justify-center overflow-hidden bg-[#F5F4F2] p-8">
          {/* Only the placeholder is scaled up — it is mostly empty studio
              card, so at natural contain size the bottle sits tiny in the
              middle, and the frame clips the card away. Real product shots are
              already cropped to the bottle and must render untouched. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={images[index]}
            alt={alt}
            className={`h-full w-full object-contain ${
              images[index] === FALLBACK_IMAGE ? "scale-[2.4]" : ""
            }`}
          />
        </div>

        {hasMany && (
          <>
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Prethodna slika"
              className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-black/15 bg-white/80 text-black/60 backdrop-blur transition-colors hover:border-black hover:text-black"
            >
              <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Sledeća slika"
              className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-black/15 bg-white/80 text-black/60 backdrop-blur transition-colors hover:border-black hover:text-black"
            >
              <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </>
          
        )}
      </div>

      {/* Two per row and 32px apart, per the Figma frame: 292 + 32 + 292
          fills the 616 gallery column exactly. */}
      {hasMany && (
        <div className="mt-10 grid grid-cols-2 gap-8">
          {images.map((src, i) => (
            <button
              key={`${src}-${i}`}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Prikaži sliku ${i + 1}`}
              aria-current={i === index}
              className={`flex aspect-square items-center justify-center overflow-hidden bg-[#F5F4F2] p-4 transition-opacity ${
                i === index ? "opacity-100" : "opacity-60 hover:opacity-100"
              }`}
            >
              {/* Lower factor than the main frame, so the bottle fills the
                  same share of a square tile as it does of the tall one. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt=""
                className={`h-full w-full object-contain ${
                  src === FALLBACK_IMAGE ? "scale-[1.6]" : ""
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
