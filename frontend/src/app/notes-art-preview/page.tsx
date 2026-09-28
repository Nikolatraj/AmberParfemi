// TEMPORARY preview route — the same six note photos under four art treatments,
// so the vibrant discs baked into the webps can be judged against alternatives.
// All CSS, no new assets. Delete once a direction is picked.
import { NOTES } from "@/lib/notes";

/** One of each real image, plus a note with no art, for a like-for-like row. */
const sample = [
  NOTES[0], // cvetni
  NOTES[1], // ruza
  NOTES[2], // drvo
  NOTES[3], // citrus
  NOTES[4], // koza
  NOTES[5], // slatko
  NOTES[7], // akvaticne — no art
];

const treatments = [
  {
    name: "0 — danas",
    note: "Kakvo jeste: pun kolor, disk zapečen u slici.",
    wrap: "bg-background",
    img: "",
  },
  {
    name: "1 — crno-belo",
    note: "grayscale + contrast, multiply na krem podlogu. Disk nestaje, ostaje siva.",
    wrap: "bg-background isolate",
    img: "[filter:grayscale(1)_contrast(1.15)] mix-blend-multiply",
  },
  {
    name: "2 — amber duotone",
    note: "Isto, ali svetli tonovi padaju u amber umesto u sivo.",
    wrap: "bg-amber isolate",
    img: "[filter:grayscale(1)_contrast(1.1)] mix-blend-multiply",
  },
  {
    name: "3 — kolor, bez diska",
    note: "Samo multiply: disk se stapa sa podlogom, predmet zadržava boju.",
    wrap: "bg-background isolate",
    img: "mix-blend-multiply",
  },
  {
    name: "4 — prigušen kolor",
    note: "Pola zasićenja: nota se i dalje prepoznaje, ali paleta prestaje da viče.",
    wrap: "bg-background isolate",
    img: "[filter:saturate(0.45)_contrast(1.05)] mix-blend-multiply",
  },
];

export default function NotesArtPreviewPage() {
  return (
    <main className="mx-auto w-[90%] py-12">
      <p className="mb-10 text-xs uppercase tracking-[0.14em] text-black/40">
        Preview — obrada slika za note
      </p>

      <div className="flex flex-col gap-12">
        {treatments.map((t) => (
          <section key={t.name}>
            <h2 className="text-[11px] uppercase tracking-[0.2em] text-amber">
              {t.name}
            </h2>
            <p className="mb-4 mt-1 text-xs text-black/50">{t.note}</p>

            <div className="flex flex-wrap gap-4">
              {sample.map((note) => (
                <figure key={note.href} className="w-[150px]">
                  <div
                    className={`flex h-[150px] w-[150px] items-center justify-center overflow-hidden ${t.wrap}`}
                  >
                    {note.noArt ? (
                      <div className="flex h-full w-full items-center justify-center bg-amber p-3 text-center">
                        <span className="text-[10px] uppercase leading-tight tracking-[0.2em] text-white">
                          {note.label}
                        </span>
                      </div>
                    ) : (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={note.image}
                        alt=""
                        className={`h-full w-full object-cover ${t.img}`}
                      />
                    )}
                  </div>
                  <figcaption className="mt-2 text-[10px] uppercase tracking-[0.16em] text-black/40">
                    {note.label}
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
