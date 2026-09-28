"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

type Mode = "login" | "register";

const inputClass =
  "w-full rounded-md border border-black/15 bg-white px-4 py-3 text-sm outline-none transition-colors placeholder:text-black/35 focus:border-black/40";

/**
 * Sign-in / register card. UI only for now: there is no backend auth yet, so
 * submitting just walks the mock flow through to the profile. When Laravel auth
 * lands (email + password), replace `handleSubmit` with the real request and
 * keep the markup.
 */
export default function AuthForm() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("login");
  const isRegister = mode === "register";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Stand-in for a real login/register call.
    router.push("/nalog/profil");
  }

  return (
    <div className="w-full max-w-sm">
      <div className="text-center">
        <h1 className="text-3xl font-light uppercase tracking-[0.22em]">
          <span className="mr-2 text-amber">•</span>
          {isRegister ? "Nalog" : "Prijava"}
        </h1>
        <p className="mt-4 text-sm text-black/50">
          {isRegister
            ? "Napravi nalog i prati svoje porudžbine."
            : "Prijavi se ili napravi nalog."}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-10 space-y-4">
        {isRegister && (
          <div>
            <label htmlFor="name" className="sr-only">
              Ime
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Ime i prezime"
              className={inputClass}
            />
          </div>
        )}

        <div>
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="Email"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="password" className="sr-only">
            Lozinka
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete={isRegister ? "new-password" : "current-password"}
            required
            placeholder="Lozinka"
            className={inputClass}
          />
        </div>

        {!isRegister && (
          <div className="text-right">
            <button
              type="button"
              className="text-xs text-black/45 transition-colors hover:text-black"
            >
              Zaboravljena lozinka?
            </button>
          </div>
        )}

        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 bg-black py-3.5 text-[12px] uppercase tracking-[0.2em] text-white transition-opacity hover:opacity-80"
        >
          {isRegister ? "Napravi nalog" : "Prijavi se"}
          <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-black/55">
        {isRegister ? "Već imaš nalog?" : "Nemaš nalog?"}{" "}
        <button
          type="button"
          onClick={() => setMode(isRegister ? "login" : "register")}
          className="text-black underline underline-offset-4 transition-colors hover:text-amber"
        >
          {isRegister ? "Prijavi se" : "Registruj se"}
        </button>
      </p>
    </div>
  );
}
