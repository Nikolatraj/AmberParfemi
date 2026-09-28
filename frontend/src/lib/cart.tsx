"use client";

/**
 * Client-side cart, held in a module-level store and mirrored to localStorage.
 * There is no cart endpoint on the API yet, so nothing reaches the server and
 * the cart does not follow the user to another browser.
 *
 * An external store rather than React state on purpose: localStorage *is* an
 * external system, so `useSyncExternalStore` is the fitting API. It also gets
 * SSR right (the server snapshot is always empty, so the first client render
 * matches the server HTML) and keeps two open tabs in step for free.
 *
 * The drawer's open state lives here too, so adding from anywhere — a grid
 * tile, the product page — can pop the drawer without threading callbacks
 * through the tree.
 */

import { useCallback, useSyncExternalStore } from "react";

export type CartItem = {
  /** Stable identity for a cart line. Fold the size into this once sizes are real. */
  id: string;
  name: string;
  brand?: string;
  /** RSD, as a number so lines can be summed. */
  price: number;
  image?: string;
  qty: number;
};

type State = {
  items: CartItem[];
  isOpen: boolean;
};

const STORAGE_KEY = "amber-cart";

/** Frozen so the server snapshot is referentially stable across renders. */
const EMPTY: State = Object.freeze({ items: [], isOpen: false });

let state: State = EMPTY;
let hydrated = false;
const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

function setState(next: Partial<State>) {
  state = { ...state, ...next };
  emit();
}

function persist(items: CartItem[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Private mode or quota. The cart still works for this page view.
  }
}

function read(): CartItem[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    // Corrupt or unavailable storage — start empty rather than crash.
    return [];
  }
}

/**
 * React calls this after mount, which is exactly when reading localStorage is
 * safe: the first render has already matched the server's empty HTML.
 */
function subscribe(listener: () => void) {
  if (!hydrated) {
    hydrated = true;
    setState({ items: read() });
  }

  listeners.add(listener);

  // Another tab changed the cart.
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) setState({ items: read() });
  };
  window.addEventListener("storage", onStorage);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

const getSnapshot = () => state;
const getServerSnapshot = () => EMPTY;

/** Pulls a number out of a display price like "3.199 RSD" or "5900.00". */
export function parsePrice(value: string | number): number {
  if (typeof value === "number") return value;
  // Drop currency and thousands separators, keep a decimal separator if present.
  const cleaned = value.replace(/[^\d.,]/g, "").replace(/[.,](?=\d{3}\b)/g, "");
  return Number(cleaned.replace(",", ".")) || 0;
}

/** Adds `qty` of an item, merging into the existing line if it is already in. */
function add(item: Omit<CartItem, "qty">, qty = 1) {
  const existing = state.items.find((i) => i.id === item.id);
  const items = existing
    ? state.items.map((i) =>
        i.id === item.id ? { ...i, qty: i.qty + qty } : i,
      )
    : [...state.items, { ...item, qty }];
  persist(items);
  setState({ items });
}

function setQty(id: string, qty: number) {
  const items =
    qty <= 0
      ? state.items.filter((i) => i.id !== id)
      : state.items.map((i) => (i.id === id ? { ...i, qty } : i));
  persist(items);
  setState({ items });
}

function remove(id: string) {
  const items = state.items.filter((i) => i.id !== id);
  persist(items);
  setState({ items });
}

export function useCart() {
  const { items, isOpen } = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const openCart = useCallback(() => setState({ isOpen: true }), []);
  const closeCart = useCallback(() => setState({ isOpen: false }), []);

  return {
    items,
    isOpen,
    /** Total units, i.e. the number next to "Korpa". */
    count: items.reduce((n, i) => n + i.qty, 0),
    subtotal: items.reduce((n, i) => n + i.price * i.qty, 0),
    openCart,
    closeCart,
    add,
    setQty,
    remove,
  };
}
