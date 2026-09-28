// Lightweight client for the Laravel API using Sanctum's SPA (cookie) auth.
//
// Flow:
//   1. Call `csrf()` once before the first stateful (POST/PUT/DELETE) request so
//      Laravel sets the XSRF-TOKEN cookie.
//   2. Every request is sent with `credentials: "include"` so the session and
//      CSRF cookies travel with it. The X-XSRF-TOKEN header is read back from
//      the cookie automatically.

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

/** Read a cookie value by name (browser only). */
function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`))
    ?.split("=")[1];
}

/** Prime the XSRF-TOKEN cookie. Call before the first mutating request. */
export async function csrf(): Promise<void> {
  await fetch(`${API_URL}/sanctum/csrf-cookie`, {
    credentials: "include",
  });
}

export class ApiError extends Error {
  constructor(
    public status: number,
    public data: unknown,
  ) {
    super(`API request failed with status ${status}`);
    this.name = "ApiError";
  }
}

/**
 * Perform a JSON API request against the Laravel backend.
 * Path is relative to the API root, e.g. `api(\"/api/user\")`.
 */
export async function api<T = unknown>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const xsrf = getCookie("XSRF-TOKEN");

  const res = await fetch(`${API_URL}${path}`, {
    credentials: "include",
    ...options,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(xsrf ? { "X-XSRF-TOKEN": decodeURIComponent(xsrf) } : {}),
      ...options.headers,
    },
  });

  const isJson = res.headers.get("content-type")?.includes("application/json");
  const data = isJson ? await res.json() : await res.text();

  if (!res.ok) {
    throw new ApiError(res.status, data);
  }

  return data as T;
}
