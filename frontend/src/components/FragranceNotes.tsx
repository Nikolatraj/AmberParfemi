import Link from "next/link";
import SectionHeading from "./SectionHeading";

/**
 * Note families, as a rack of blotter strips (mouillettes) rather than photos.
 * No imagery: a scent family isn't a picture of its ingredient, and six stock
 * photos on coloured discs dragged pink and yellow into a cream/amber palette.
 * All ten families list here — the four that used to reuse another note's photo
 * no longer need art of their own.
 */
/**
 * `dip` is how far up the strip the waterline sits, in percent. The values are
 * deliberately uneven: at a uniform depth the ten lines join into one rule
 * straight across the section, which is the first thing the eye lands on.
 */
const notes = [
  { label: "Cvetne", href: "/note/cvetne", dip: 18 },
  { label: "Ružine", href: "/note/ruzine", dip: 24 },
  { label: "Drvenaste", href: "/note/drvenaste", dip: 13 },
  { label: "Citrusne", href: "/note/citrusne", dip: 21 },
  { label: "Kožne", href: "/note/kozne", dip: 15 },
  { label: "Slatke", href: "/note/slatke", dip: 26 },
  { label: "Orijentalne", href: "/note/orijentalne", dip: 17 },
  { label: "Akvatične", href: "/note/akvaticne", dip: 22 },
  { label: "Voćne", href: "/note/vocne", dip: 14 },
  { label: "Začinske", href: "/note/zacinske", dip: 20 },
];

/**
 * "Pronađi po notama" — browse fragrances by scent family.
 *
 * Ten strips fit one row on desktop and two on mobile, so there's no carousel
 * and nothing is hidden. Hover/focus "dips" a strip: amber wicks up from the
 * cut end the way paper absorbs oil. That's the section's one bold move —
 * everything else stays on the site's existing cream / hairline / amber voice.
 */
export default function FragranceNotes() {
  return (
    <section className="relative overflow-hidden py-16">
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

      <div className="mx-auto w-[90%]">
        <SectionHeading title="Pronađi po notama" />

        {/* Fixed widths rather than fluid columns: a strip has to stay slender
            to read as paper, and a 10-track grid across a wide viewport makes
            them fat enough to look like arched windows. justify-between keeps
            the rack flush with the heading on both edges, and the row wraps to
            two on narrow screens on its own. */}
        <div className="flex flex-wrap justify-between gap-y-10">
          {notes.map((note) => (
            <Link
              key={note.href}
              href={note.href}
              className="group relative flex h-[280px] w-[56px] shrink-0 items-start justify-center overflow-hidden rounded-t-full border border-black/10 bg-[#F5F0E8] pt-6 sm:w-[72px] md:h-[380px] md:pt-7 lg:h-[440px] xl:w-[104px]"
            >
              {/* The dip. Scaled from the bottom edge so it reads as the strip
                  drawing liquid upward, deepest where it met the oil. */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-full origin-bottom scale-y-0 bg-gradient-to-t from-amber-deep to-amber transition-transform duration-700 ease-out group-hover:scale-y-100 group-focus-visible:scale-y-100 motion-reduce:transition-none"
              />
              {/* Waterline — where the paper met the oil. */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 h-px bg-black/10"
                style={{ bottom: `${note.dip}%` }}
              />
              {/* The label sits at the dry end you'd hold. Its colour change is
                  delayed to land as the amber arrives, not ahead of it. */}
              <span className="relative rotate-180 text-[11px] uppercase tracking-[0.2em] text-black/70 transition-colors delay-500 duration-300 [writing-mode:vertical-rl] group-hover:text-background group-focus-visible:text-background motion-reduce:transition-none motion-reduce:delay-0">
                {note.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
