import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("NotFound");

  return (
    <section className="flex min-h-[80svh] flex-col items-center justify-center px-6 pt-32 text-center">
      <p className="bg-gradient-to-b from-white/30 to-transparent bg-clip-text text-[clamp(6rem,20vw,12rem)] leading-none font-bold text-transparent">404</p>
      <h1 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">{t("title")}</h1>
      <p className="mt-4 max-w-md text-white/55">{t("body")}</p>
      <Link href="/" className="mt-10 inline-flex h-12 items-center rounded-full bg-white px-6 text-sm font-medium text-black transition-transform hover:scale-[1.03]">
        {t("cta")}
      </Link>
    </section>
  );
}
