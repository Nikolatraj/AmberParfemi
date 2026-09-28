"use client";

/**
 * Cart panel: slides in leftward from the right edge, from the cart action in
 * the header or from any add-to-cart button.
 *
 * Escape and the scrim close it, matching ShopFilters — the other drawer in the
 * app. Neither traps focus; if that changes, change both.
 */

import { useEffect } from "react";
import Link from "next/link";
import { useLenis } from "lenis/react";
import { Minus, Plus, X } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/catalog";

export default function CartDrawer() {
  const { items, count, subtotal, isOpen, closeCart, setQty, remove } =
    useCart();
  const lenis = useLenis();

  // Escape closes the panel; Lenis keeps scrolling the page behind it unless
  // we stop it while the panel is open.
  useEffect(() => {
    if (!isOpen) return;

    lenis?.stop();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      lenis?.start();
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, lenis, closeCart]);

  return (
    <>
      {/* Rendered always so the panel can transition both ways. */}
      <div
        onClick={closeCart}
        aria-hidden
        className={`fixed inset-0 z-40 bg-black/20 transition-opacity duration-500 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Korpa"
        data-lenis-prevent
        className={`fixed right-0 top-0 z-50 flex h-dvh w-full flex-col bg-white transition-transform duration-500 ease-out sm:w-[420px] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-8 pb-10 pt-8 sm:px-10">
          <h2 className="text-lg font-light uppercase tracking-[0.22em]">
            Korpa {count > 0 && <span className="text-black/40">({count})</span>}
          </h2>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Zatvori korpu"
            className="text-black/50 transition-colors hover:text-black"
          >
            <X className="h-5 w-5" strokeWidth={1.25} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center sm:px-10">
            <p className="text-sm text-black/50">Tvoja korpa je prazna.</p>
            <Link
              href="/shop"
              onClick={closeCart}
              className="mt-8 border border-black/15 px-9 py-3.5 text-[11px] uppercase tracking-[0.2em] text-black/75 transition-colors hover:border-black hover:bg-black hover:text-white"
            >
              Nastavi kupovinu
            </Link>
          </div>
        ) : (
          <ul className="flex-1 overflow-y-auto px-8 sm:px-10">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex gap-4 border-b border-black/8 py-5 first:pt-0"
              >
                <div className="h-20 w-16 shrink-0 overflow-hidden bg-[#F5F4F2]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image ?? "/parfem.png"}
                    alt=""
                    className="h-full w-full scale-[1.3] object-contain"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  {item.brand && (
                    <p className="text-[10px] uppercase tracking-[0.14em] text-black/45">
                      {item.brand}
                    </p>
                  )}
                  <p className="mt-1 truncate text-[13px] text-black/85">
                    {item.name}
                  </p>
                  <p className="mt-1 text-[12px] text-black/60">
                    {formatPrice(item.price)}
                  </p>

                  <div className="mt-3 flex items-center gap-4">
                    <div className="flex items-center border border-black/15">
                      <button
                        type="button"
                        onClick={() => setQty(item.id, item.qty - 1)}
                        aria-label={`Smanji količinu: ${item.name}`}
                        className="flex h-8 w-8 items-center justify-center text-black/60 transition-colors hover:text-black"
                      >
                        <Minus className="h-3 w-3" strokeWidth={1.5} />
                      </button>
                      <span className="w-8 border-x border-black/15 py-1.5 text-center text-[12px]">
                        {item.qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQty(item.id, item.qty + 1)}
                        aria-label={`Povećaj količinu: ${item.name}`}
                        className="flex h-8 w-8 items-center justify-center text-black/60 transition-colors hover:text-black"
                      >
                        <Plus className="h-3 w-3" strokeWidth={1.5} />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => remove(item.id)}
                      className="text-[10px] uppercase tracking-[0.16em] text-black/40 underline underline-offset-4 transition-colors hover:text-black"
                    >
                      Ukloni
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {items.length > 0 && (
          <div className="border-t border-black/10 px-8 pb-10 pt-6 sm:px-10">
            <div className="flex items-baseline justify-between">
              <span className="text-[11px] uppercase tracking-[0.2em] text-black/45">
                Ukupno
              </span>
              <span className="text-base">{formatPrice(subtotal)}</span>
            </div>
            <Link
              href="/korpa"
              onClick={closeCart}
              className="mt-6 block bg-black py-3.5 text-center text-[11px] uppercase tracking-[0.2em] text-white transition-opacity hover:opacity-80"
            >
              Nastavi na plaćanje
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
