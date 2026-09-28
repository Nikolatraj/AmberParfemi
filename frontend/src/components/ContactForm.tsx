"use client";

import { useState, type SyntheticEvent } from "react";
import { api, ApiError, csrf } from "@/lib/api";

type Status = "idle" | "sending" | "success" | "error";

/** Contact form that POSTs to the Laravel `/api/contact` endpoint. */
export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError(null);

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      // Prime the CSRF cookie before the mutating request.
      await csrf();
      await api("/api/contact", {
        method: "POST",
        body: JSON.stringify(data),
      });
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      if (err instanceof ApiError && err.status === 422) {
        setError("Proverite unete podatke i pokušajte ponovo.");
      } else {
        setError("Došlo je do greške. Pokušajte kasnije.");
      }
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-lg border border-green-600/30 bg-green-50 px-6 py-8 text-sm text-green-800">
        Hvala! Vaša poruka je uspešno poslata. Javićemo vam se uskoro.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-xs uppercase tracking-wider text-black/50">
            Ime i prezime
          </span>
          <input
            name="name"
            type="text"
            required
            className="w-full rounded-md border border-black/15 px-3 py-2 text-sm outline-none focus:border-black/40"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs uppercase tracking-wider text-black/50">
            Email
          </span>
          <input
            name="email"
            type="email"
            required
            className="w-full rounded-md border border-black/15 px-3 py-2 text-sm outline-none focus:border-black/40"
          />
        </label>
      </div>

      <label className="block">
        <span className="mb-1 block text-xs uppercase tracking-wider text-black/50">
          Naslov
        </span>
        <input
          name="subject"
          type="text"
          className="w-full rounded-md border border-black/15 px-3 py-2 text-sm outline-none focus:border-black/40"
        />
      </label>

      <label className="block">
        <span className="mb-1 block text-xs uppercase tracking-wider text-black/50">
          Poruka
        </span>
        <textarea
          name="message"
          required
          rows={6}
          className="w-full resize-y rounded-md border border-black/15 px-3 py-2 text-sm outline-none focus:border-black/40"
        />
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-full bg-black px-8 py-3 text-sm font-medium text-white disabled:opacity-40"
      >
        {status === "sending" ? "SLANJE..." : "POŠALJI PORUKU"}
      </button>
    </form>
  );
}
