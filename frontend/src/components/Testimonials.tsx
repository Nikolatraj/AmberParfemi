import SectionHeading from "./SectionHeading";

type Review = {
  quote: string;
  author: string;
  /** Which perfume the review is about — grounds the quote in the catalogue. */
  product: string;
  rating: number;
};

// PLACEHOLDER COPY — replace with real customer reviews before launch.
const reviews: Review[] = [
  {
    quote:
      "Poručila u utorak, stiglo u četvrtak. Miris se drži ceo radni dan, a na duksu i duže.",
    author: "Milica J.",
    product: "Lattafa Her Confession",
    rating: 5,
  },
  {
    quote:
      "Tražio sam nešto za veče što nije preslatko. Ovo je tačno to — i original, bez sumnje.",
    author: "Stefan M.",
    product: "Armaf Club de Nuit",
    rating: 5,
  },
  {
    quote:
      "Prvi put kupujem parfem online. Javili se na Instagramu i pomogli oko izbora.",
    author: "Ana T.",
    product: "Rasasi Hawas",
    rating: 5,
  },
];

/** Rating rendered with the brand's amber bullet rather than generic stars. */
function Rating({ value }: { value: number }) {
  return (
    <p
      className="text-sm tracking-[0.35em] text-amber"
      aria-label={`Ocena ${value} od 5`}
    >
      <span aria-hidden="true">{"•".repeat(value)}</span>
    </p>
  );
}

/** "Iskustva" — customer reviews. Quiet editorial row, hairline-separated. */
export default function Testimonials() {
  return (
    <section className="mx-auto w-[90%]">
      <SectionHeading title="Iskustva" />

      <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-3 sm:gap-x-0">
        {reviews.map((r, i) => (
          <figure
            key={r.author}
            className={`sm:px-10 ${
              i > 0 ? "sm:border-l sm:border-black/10" : "sm:pl-0"
            } ${i === reviews.length - 1 ? "sm:pr-0" : ""}`}
          >
            <Rating value={r.rating} />
            <blockquote className="mt-6 text-lg font-light leading-relaxed text-black/80">
              „{r.quote}“
            </blockquote>
            <figcaption className="mt-6">
              <span className="text-[13px] uppercase tracking-[0.06em] text-black/85">
                {r.author}
              </span>
              <span className="mt-1 block text-[11px] uppercase tracking-[0.14em] text-black/40">
                {r.product}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
