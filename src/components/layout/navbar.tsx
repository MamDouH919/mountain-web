"use client";

import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", key: "home" },
  { href: "/services", key: "services" },
  { href: "/work", key: "work" },
  { href: "/about", key: "about" },
  { href: "/contact", key: "contact" },
] as const;

export function Navbar() {
  const t = useTranslations("Nav");
  const brand = useTranslations("Brand");
  const pathname = usePathname();
  // The menu remembers which route it was opened on, so navigating closes it.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:pt-6"
    >
      <nav
        className={cn(
          "relative flex w-full max-w-6xl items-center justify-between gap-4 rounded-full border px-3 py-2 ps-5 transition-[background-color,border-color,box-shadow] duration-500",
          "backdrop-blur-xl backdrop-saturate-150",
          scrolled
            ? "border-white/10 bg-black/60 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.9)]"
            : "border-white/[0.06] bg-white/[0.03]",
        )}
      >
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-semibold tracking-tight text-white"
        >
          <Image src="/logo.webp" alt="" width={32} height={32} priority className="size-8 rounded-full" />
          {brand("name")}
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map(({ href, key }) => (
            <li key={key}>
              <Link
                href={href}
                className={cn(
                  "relative block rounded-full px-4 py-2 text-sm transition-colors",
                  isActive(href) ? "text-white" : "text-white/55 hover:text-white",
                )}
              >
                {isActive(href) && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 -z-10 rounded-full bg-white/[0.08]"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                {t(key)}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <Link
            href="/contact"
            className="hidden h-9 items-center rounded-full bg-white px-4 text-sm font-medium text-black transition-transform hover:scale-[1.03] active:scale-[0.98] sm:inline-flex"
          >
            {t("cta")}
          </Link>
          <button
            type="button"
            onClick={() => setOpenOn(open ? null : pathname)}
            aria-expanded={open}
            aria-label={open ? t("closeMenu") : t("openMenu")}
            className="inline-flex size-9 items-center justify-center rounded-full text-white/80 hover:bg-white/10 md:hidden"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="absolute inset-x-0 top-full mt-2 origin-top rounded-3xl border border-white/10 bg-black/80 p-2 backdrop-blur-xl md:hidden"
            >
              <ul className="flex flex-col">
                {links.map(({ href, key }, i) => (
                  <motion.li
                    key={key}
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.04 * i }}
                  >
                    <Link
                      href={href}
                      className={cn(
                        "block rounded-2xl px-4 py-3 text-base",
                        isActive(href) ? "bg-white/[0.06] text-white" : "text-white/60",
                      )}
                    >
                      {t(key)}
                    </Link>
                  </motion.li>
                ))}
                <li className="p-2 pt-3">
                  <Link
                    href="/contact"
                    className="flex h-11 items-center justify-center rounded-full bg-white text-sm font-medium text-black"
                  >
                    {t("cta")}
                  </Link>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
