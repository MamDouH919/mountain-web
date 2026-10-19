import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { serviceIds } from "@/content/services";
import { site } from "@/content/site";
import { Link } from "@/i18n/navigation";

const pages = ["home", "services", "work", "about", "contact"] as const;
const pageHref = { home: "/", services: "/services", work: "/work", about: "/about", contact: "/contact" } as const;

export async function Footer() {
  const t = await getTranslations("Footer");
  const nav = await getTranslations("Nav");
  const brand = await getTranslations("Brand");
  const s = await getTranslations("Services.items");
  const c = await getTranslations("Contact.info");

  return (
    <footer className="border-t border-white/[0.06] px-6 pt-20 pb-10 sm:px-8">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
        <div>
          <Link href="/" className="flex items-center gap-2 text-lg font-semibold text-white">
            <Image src="/logo.webp" alt="" width={40} height={40} className="size-10 rounded-full" />
            {brand("name")}
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/45">{t("tagline")}</p>
        </div>

        <nav aria-label={t("pages")}>
          <h2 className="text-xs font-medium tracking-[0.2em] text-white/35 uppercase rtl:tracking-normal">{t("pages")}</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {pages.map((p) => (
              <li key={p}>
                <Link href={pageHref[p]} className="text-white/60 transition-colors hover:text-white">
                  {nav(p)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-xs font-medium tracking-[0.2em] text-white/35 uppercase rtl:tracking-normal">{t("services")}</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {serviceIds.map((id) => (
              <li key={id}>
                <Link href={{ pathname: "/services", hash: id }} className="text-white/60 transition-colors hover:text-white">
                  {s(`${id}.title`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-medium tracking-[0.2em] text-white/35 uppercase rtl:tracking-normal">{t("contact")}</h2>
          <ul className="mt-5 space-y-3 text-sm text-white/60">
            {site.phones.map((p) => (
              <li key={p.href}>
                <a href={p.href} dir="ltr" className="transition-colors hover:text-white">
                  {p.display}
                </a>
              </li>
            ))}
            <li>
              <a href={`mailto:${site.email}`} className="break-all transition-colors hover:text-white">
                {site.email}
              </a>
            </li>
            <li>{c("locationValue")}</li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-16 flex max-w-6xl flex-col justify-between gap-3 border-t border-white/[0.06] pt-8 text-xs text-white/35 sm:flex-row">
        <p>
          © <CopyrightYear /> {brand("name")}. {t("rights")}
        </p>
        <p>{t("madeIn")}</p>
      </div>
    </footer>
  );
}

// Cached so the footer stays fully static under Cache Components. The year
// refreshes whenever the site is rebuilt or the cache is revalidated.
async function CopyrightYear() {
  "use cache";
  return new Date().getFullYear();
}
