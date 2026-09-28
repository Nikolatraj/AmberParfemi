// Typed helpers for the public catalog API (brands, categories, products).
// These run in Server Components, so they fetch straight from the Laravel API
// without cookies — the catalog endpoints are public GETs.

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export type Brand = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  logo_url: string | null;
  products?: Product[];
};

export type Category = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  products?: Product[];
};

/** Scent pyramid, as shown on the product page's "Mirisne note" tab. */
export type FragranceNotes = {
  top?: string[];
  heart?: string[];
  base?: string[];
};

export type Product = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  price: string;
  image_url: string | null;
  in_stock: boolean;
  brand?: Brand | null;
  category?: Category | null;
  /** Extra gallery shots. The API only returns `image_url` so far. */
  images?: string[] | null;
  /** Not returned by the API yet — the notes tab falls back to a placeholder. */
  notes?: FragranceNotes | null;
};

/**
 * Stand-in render, shown until products carry images of their own. It is
 * mostly empty studio card, so the gallery scales it up — which is why callers
 * need to tell it apart from a real product shot rather than scaling blindly.
 */
export const FALLBACK_IMAGE = "/parfem.png";

/** Gallery images for a product, primary shot first, duplicates removed. */
export function productImages(product: Product): string[] {
  const all = [product.image_url, ...(product.images ?? [])].filter(
    (src): src is string => Boolean(src),
  );
  return all.length > 0 ? [...new Set(all)] : [FALLBACK_IMAGE];
}

/**
 * Fetch JSON from the API. Returns `null` on any failure so pages can render a
 * graceful fallback instead of crashing when the backend is unreachable.
 */
async function getJson<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API_URL}/api${path}`, {
      headers: { Accept: "application/json" },
      // Revalidate the catalog periodically rather than on every request.
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export function getProducts(params?: {
  category?: string;
  brand?: string;
  search?: string;
}): Promise<Product[] | null> {
  const query = new URLSearchParams();
  if (params?.category) query.set("category", params.category);
  if (params?.brand) query.set("brand", params.brand);
  if (params?.search) query.set("search", params.search);
  const qs = query.toString();
  return getJson<Product[]>(`/products${qs ? `?${qs}` : ""}`);
}

export const getProduct = (slug: string) =>
  getJson<Product>(`/products/${slug}`);

export const getBrands = () => getJson<Brand[]>("/brands");
export const getBrand = (slug: string) => getJson<Brand>(`/brands/${slug}`);

export const getCategories = () => getJson<Category[]>("/categories");
export const getCategory = (slug: string) =>
  getJson<Category>(`/categories/${slug}`);

/**
 * Sorting is applied in the frontend: the API returns the full list in its own
 * order and has no `sort` parameter. Move this to the query once it does.
 */
export const SORT_OPTIONS = [
  { value: "", label: "Preporučeno" },
  { value: "price-asc", label: "Cena: niža → viša" },
  { value: "price-desc", label: "Cena: viša → niža" },
  { value: "name", label: "Naziv: A–Š" },
] as const;

export type SortValue = (typeof SORT_OPTIONS)[number]["value"];

/** Narrow a raw query-string value to a known sort key. */
export function parseSort(value: string | string[] | undefined): SortValue {
  const key = Array.isArray(value) ? value[0] : value;
  return SORT_OPTIONS.some((o) => o.value === key) ? (key as SortValue) : "";
}

/** Returns a sorted copy; unknown or empty sort keeps the API's order. */
export function sortProducts(products: Product[], sort: SortValue): Product[] {
  const items = [...products];
  switch (sort) {
    case "price-asc":
      return items.sort((a, b) => Number(a.price) - Number(b.price));
    case "price-desc":
      return items.sort((a, b) => Number(b.price) - Number(a.price));
    case "name":
      return items.sort((a, b) => a.name.localeCompare(b.name, "sr-RS"));
    default:
      return items;
  }
}

/** Format a price string (e.g. "12500.00") as RSD. */
export function formatPrice(price: string | number): string {
  const value = typeof price === "string" ? Number(price) : price;
  return new Intl.NumberFormat("sr-RS", {
    style: "currency",
    currency: "RSD",
    maximumFractionDigits: 0,
  }).format(value);
}
