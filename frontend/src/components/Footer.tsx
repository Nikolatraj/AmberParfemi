import Link from "next/link";

const navLinks = [
  { label: "SHOP", href: "/shop" },
  { label: "O NAMA", href: "/o-nama" },
  { label: "KONTAKT", href: "/kontakt" },
];

const socialLinks = [
  { label: "INSTAGRAM", href: "https://instagram.com" },
  { label: "TIKTOK", href: "https://tiktok.com" },
];

/** Site footer: brand, newsletter signup, navigation, socials and copyright. */
export default function Footer() {
  return (
    <footer className="mt-auto w-full">
      <div className="mx-auto grid w-[90%] grid-cols-1 gap-10 py-14 sm:grid-cols-2">
        {/* Brand */}
        <div>
          <Link href="/" aria-label="Amber Parfemi">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/amber-logo.png"
              alt="Amber Parfemi"
              className="h-auto w-56 max-w-full sm:w-80 lg:w-[440px]"
            />
          </Link>
        </div>

        {/* Newsletter */}
        <div className="sm:justify-self-end">
          <p className="mb-3 text-sm tracking-wide">PRIDRUŽI SE AMBER LISTI</p>
          <form className="flex items-center gap-3 border-b border-black/30 pb-2">
            <input
              type="email"
              placeholder="Unesite vaš email"
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-black/40"
            />
            <button type="submit" className="text-sm font-medium">
              PRIJAVI SE
            </button>
          </form>
        </div>
      </div>

      {/* Nav + socials */}
      <div className="mx-auto flex w-[90%] flex-wrap items-center gap-6 pb-8 text-xs tracking-wide">
        {navLinks.map((l) => (
          <Link key={l.href} href={l.href} className="hover:underline">
            {l.label}
          </Link>
        ))}
        <span className="text-black/40">ZAPRATITE NAS:</span>
        {socialLinks.map((l) => (
          <Link key={l.href} href={l.href} className="hover:underline">
            {l.label}
          </Link>
        ))}
      </div>

      {/* Copyright bar */}
      <div className="w-full bg-black text-white">
        <div className="mx-auto flex w-[90%] flex-wrap items-center justify-between gap-2 py-4 text-xs">
          <span>©SVA PRAVA ZADRŽANA. AMBER PARFEMI</span>
          <div className="flex gap-6">
            <Link href="/politika-privatnosti" className="hover:underline">
              POLITIKA PRIVATNOSTI
            </Link>
            <Link href="/uslovi-koriscenja" className="hover:underline">
              USLOVI KORIŠĆENJA
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
