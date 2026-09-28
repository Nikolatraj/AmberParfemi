"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserRound } from "lucide-react";

const nav = [
  { label: "Porudžbine", href: "/nalog/porudzbine" },
  { label: "Profil", href: "/nalog/profil" },
  { label: "Amber klub", href: "/nalog/klub" },
];

/**
 * Shared chrome for the signed-in account pages: a left sidebar nav (with the
 * current section emphasised) and the account glyph, wrapping the page content.
 * Client-only for the active-link state; the pages themselves stay Server
 * Components and just drop their content in as children.
 */
export default function AccountShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="mx-auto w-[90%] max-w-5xl flex-1 py-12">
      <div className="flex items-start justify-between">
        <p className="text-[11px] uppercase tracking-[0.2em] text-black/40">
          Moj nalog
        </p>
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-black/15 text-black/60">
          <UserRound className="h-4 w-4" strokeWidth={1.5} />
        </span>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-x-14 gap-y-10 lg:grid-cols-[180px_1fr]">
        {/* Sidebar — a row on mobile, a column alongside the content on desktop. */}
        <nav className="flex gap-6 lg:flex-col lg:gap-4">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`text-lg tracking-wide transition-colors ${
                  active
                    ? "font-medium text-black"
                    : "text-black/40 hover:text-black"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}
