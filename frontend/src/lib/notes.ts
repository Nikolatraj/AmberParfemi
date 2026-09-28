export type Note = {
  label: string;
  href: string;
  image: string;
  /**
   * No dedicated art exists yet, so `image` borrows another note's photo.
   * Components can show a type-only card instead. Drop the flag — and point
   * `image` at the real file — once the photo is shot.
   */
  noArt?: true;
};

/** Scent families shown in the homepage "Pronađi po notama" section. */
export const NOTES: Note[] = [
  { label: "Cvetne", href: "/note/cvetne", image: "/notes/cvetni.webp" },
  { label: "Ružine", href: "/note/ruzine", image: "/notes/ruza.webp" },
  { label: "Drvenaste", href: "/note/drvenaste", image: "/notes/drvo.webp" },
  { label: "Citrusne", href: "/note/citrusne", image: "/notes/citrus.webp" },
  { label: "Kožne", href: "/note/kozne", image: "/notes/koza.webp" },
  { label: "Slatke", href: "/note/slatke", image: "/notes/slatko.webp" },
  { label: "Orijentalne", href: "/note/orijentalne", image: "/notes/slatko.webp", noArt: true },
  { label: "Akvatične", href: "/note/akvaticne", image: "/notes/citrus.webp", noArt: true },
  { label: "Voćne", href: "/note/vocne", image: "/notes/ruza.webp", noArt: true },
  { label: "Začinske", href: "/note/zacinske", image: "/notes/drvo.webp", noArt: true },
];
