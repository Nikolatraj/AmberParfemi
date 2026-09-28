import Link from "next/link";
import { Fragment } from "react";

export type Crumb = { label: string; href?: string };

/**
 * Navigation trail, e.g. Početna / Shop / Armaf.
 * "Početna" (home) is always prepended; the last item renders as the
 * current page (no link).
 */
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-6 text-xs uppercase tracking-[0.12em] text-black/45"
    >
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <li>
          <Link href="/" className="transition-colors hover:text-black">
            Početna
          </Link>
        </li>
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <Fragment key={`${item.label}-${i}`}>
              <li aria-hidden="true" className="text-black/25">
                /
              </li>
              <li>
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-black"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    className="text-black/70"
                    aria-current={isLast ? "page" : undefined}
                  >
                    {item.label}
                  </span>
                )}
              </li>
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
