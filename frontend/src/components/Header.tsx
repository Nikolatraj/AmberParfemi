"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, X } from "lucide-react";
import { useRef, useState } from "react";
import { useLenis } from "lenis/react";
import CartDrawer from "./CartDrawer";
import { useCart } from "@/lib/cart";

const navLinks = [
  { label: "Shop", href: "/shop" },
  { label: "Brendovi", href: "/brendovi" },
  { label: "Nađi miris", href: "/kviz" },
  { label: "O nama", href: "/o-nama" },
];

/**
 * Top navigation: text nav, centered wordmark, search and text actions.
 *
 * The bar is fixed, so it stays on screen the whole way down the page. Once you
 * scroll off the top it condenses — smaller wordmark, tighter padding — so a
 * 144px bar isn't sitting on the viewport forever.
 *
 * Fixed (plus the spacer below) rather than sticky on purpose: a sticky bar is
 * still in flow, so shrinking it would pull the whole page up by the difference
 * and the content would jump mid-scroll. The spacer holds the expanded height,
 * so the condense costs nothing in layout.
 */
export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [condensed, setCondensed] = useState(false);
  const condensedRef = useRef(false);
  const { count: cartCount, isOpen: cartOpen, openCart } = useCart();

  // Driven off Lenis rather than a scroll listener so the state flips in step
  // with the smooth-scroll animation. The gap between the two thresholds is
  // hysteresis — a single one flickers when you hover around it.
  useLenis((lenis) => {
    const y = lenis.scroll;
    const next = condensedRef.current ? y > 20 : y > 80;
    if (next === condensedRef.current) return;
    condensedRef.current = next;
    setCondensed(next);
  });

  const linkClass = (href: string) => {
    const active = pathname === href || pathname.startsWith(`${href}/`);
    // The type shrinks with the bar. A smaller step than the logo takes
    // (80→40) on purpose: nav labels have to stay readable, and matching the
    // logo's reduction would leave them looking shrunken rather than settled.
    return `uppercase tracking-[0.15em] transition-[color,font-size] duration-300 ease-out ${
      condensed ? "text-[14px]" : "text-[16px]"
    } ${
      active
        ? "text-black underline underline-offset-8 decoration-1"
        : "text-black/60 hover:text-black"
    }`;
  };

  const searchField = (
    <label className="flex w-full items-center gap-2 border-b border-black/20 pb-1 text-black/60 transition-[width] duration-300 ease-out lg:w-[150px] lg:focus-within:w-[300px]">
      <Search className="h-3.5 w-3.5 text-black/50" strokeWidth={1.5} aria-hidden />
      <input
        type="search"
        placeholder="Pretraži"
        className="w-full bg-transparent text-[13px] outline-none placeholder:text-black/40"
      />
    </label>
  );

  return (
    <>
      {/* Reserves the expanded bar height so the fixed header doesn't sit on top
          of the first screenful. Keep in sync with the padding + logo heights
          below: 20+48+20 mobile, 32+64+32 at md, 32+80+32 at lg. */}
      <div aria-hidden className="h-[88px] md:h-[128px] lg:h-[144px]" />

      <header
        // The border is always there, only its color fades in — toggling the
        // border class instead would jump the bar by a pixel.
        className={`fixed inset-x-0 top-0 z-30 border-b bg-white transition-colors duration-300 ${
          condensed ? "border-black/10" : "border-transparent"
        }`}
      >
        {/* Desktop / tablet */}
        <div
          className={`mx-auto hidden w-[90%] grid-cols-3 items-center transition-[padding] duration-300 md:grid ${
            condensed ? "py-3" : "py-8"
          }`}
        >
          {/* Left: nav links */}
          <nav className="flex items-center gap-6 lg:gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={linkClass(link.href)}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Center: brand */}
          <Link
            href="/"
            aria-label="Amber Parfemi"
            className="justify-self-center"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/amber-logo.png"
              alt="Amber Parfemi"
              className={`w-auto transition-[height] duration-300 ${
                condensed ? "h-10" : "h-16 lg:h-20"
              }`}
            />
          </Link>

          {/* Right: search + account + cart */}
          <div className="flex items-center justify-end gap-4 lg:gap-8">
            {searchField}
            <Link href="/nalog" className={linkClass("/nalog")}>
              Nalog
            </Link>
            <button
              type="button"
              onClick={openCart}
              aria-haspopup="dialog"
              aria-expanded={cartOpen}
              className={`whitespace-nowrap ${linkClass("/korpa")}`}
            >
              Korpa ({cartCount})
            </button>
          </div>
        </div>

        {/* Mobile bar */}
        <div
          className={`mx-auto flex w-[90%] items-center justify-between transition-[padding] duration-300 md:hidden ${
            condensed ? "py-3" : "py-5"
          }`}
        >
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Zatvori meni" : "Otvori meni"}
            aria-expanded={open}
          >
            {open ? (
              <X className="h-6 w-6" strokeWidth={1.5} />
            ) : (
              <Menu className="h-6 w-6" strokeWidth={1.5} />
            )}
          </button>

          <Link href="/" aria-label="Amber Parfemi">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/amber-logo.png"
              alt="Amber Parfemi"
              className={`w-auto transition-[height] duration-300 ${
                condensed ? "h-9" : "h-12"
              }`}
            />
          </Link>

          <button
            type="button"
            onClick={openCart}
            aria-haspopup="dialog"
            aria-expanded={cartOpen}
            className={linkClass("/korpa")}
          >
            Korpa ({cartCount})
          </button>
        </div>

        {/* Mobile dropdown panel */}
        {open && (
          <div className="mx-auto flex w-[90%] flex-col gap-5 border-t border-black/10 py-6 md:hidden">
            {searchField}
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={linkClass(link.href)}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/nalog"
                className={linkClass("/nalog")}
                onClick={() => setOpen(false)}
              >
                Nalog
              </Link>
            </nav>
          </div>
        )}
      </header>

      <CartDrawer />
    </>
  );
}

