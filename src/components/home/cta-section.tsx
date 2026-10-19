import { ArrowUpRight, MessageCircle } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Reveal } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/shared/section-heading";
import { site } from "@/content/site";
import { Link } from "@/i18n/navigation";

export async function CtaSection() {
  const t = await getTranslations("Cta");

  return (
    <section className="px-4 py-20 sm:px-8 sm:py-28">
      <Reveal className="relative isolate mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] border border-white/10 bg-zinc-950 px-6 py-20 text-center sm:px-16 sm:py-28">
        <div aria-hidden className="absolute start-1/2 top-full -z-10 size-[44rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/25 blur-[120px] rtl:translate-x-1/2" />
        <div aria-hidden className="absolute inset-0 -z-10 opacity-40 [background-image:radial-gradient(rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />

        <Eyebrow className="justify-center">{t("eyebrow")}</Eyebrow>
        <h2 className="mx-auto mt-6 max-w-3xl text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1.02] font-semibold tracking-[-0.03em] text-balance text-white rtl:leading-[1.3] rtl:tracking-normal">
          {t("title")}
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/55 sm:text-lg">{t("subtitle")}</p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/contact"
            className="group inline-flex h-12 items-center gap-2 rounded-full bg-brand ps-6 pe-2 text-sm font-semibold text-brand-foreground shadow-[0_0_40px_-8px_var(--brand)] transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {t("primary")}
            <span className="flex size-8 items-center justify-center rounded-full bg-black/90 text-white transition-transform duration-300 group-hover:rotate-45 rtl:-scale-x-100 rtl:group-hover:-rotate-45">
              <ArrowUpRight className="size-4" />
            </span>
          </Link>
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center gap-2 rounded-full border border-white/15 px-6 text-sm font-medium text-white/85 transition-colors hover:border-white/35 hover:bg-white/[0.04] hover:text-white"
          >
            <MessageCircle className="size-4" />
            {t("whatsapp")}
          </a>
        </div>
      </Reveal>
    </section>
  );
}
