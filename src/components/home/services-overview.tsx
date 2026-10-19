import { ArrowUpRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { serviceIcons, serviceIds } from "@/content/services";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export async function ServicesOverview() {
  const t = await getTranslations("HomeServices");
  const s = await getTranslations("Services.items");

  return (
    <section className="px-6 py-28 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading eyebrow={t("eyebrow")} title={t("title")} className="max-w-2xl" />
          <Link
            href="/services"
            className="group inline-flex shrink-0 items-center gap-2 text-sm font-medium text-white/70 transition-colors hover:text-white"
          >
            {t("cta")}
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5" />
          </Link>
        </div>

        <RevealGroup className="mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {serviceIds.map((id, i) => {
            const Icon = serviceIcons[id];
            return (
              // Bento: the first card takes 2×2 and the last two take a half row
              // each, so seven cards fill a 4-column grid with no gaps.
              <RevealItem
                key={id}
                className={cn(
                  i === 0 && "sm:col-span-2 lg:row-span-2",
                  i >= serviceIds.length - 2 && "lg:col-span-2",
                )}
              >
                <Link
                  href={{ pathname: "/services", hash: id }}
                  className="group relative flex h-full min-h-56 flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-zinc-950/60 p-6 transition-colors duration-500 hover:border-white/20 sm:p-7"
                >
                  <div
                    aria-hidden
                    className="absolute -end-20 -top-20 size-56 rounded-full bg-brand/0 blur-3xl transition-colors duration-700 group-hover:bg-brand/20"
                  />
                  <div className="flex items-center justify-between">
                    <span className="flex size-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-white transition-colors duration-500 group-hover:border-brand/40 group-hover:text-brand">
                      <Icon className="size-5" />
                    </span>
                    <span className="text-xs text-white/30 tabular-nums">0{i + 1}</span>
                  </div>
                  <div className="mt-auto pt-10">
                    <h3 className={cn("font-semibold tracking-tight text-white", i === 0 ? "text-3xl sm:text-4xl" : "text-xl")}>
                      {s(`${id}.title`)}
                    </h3>
                    <p className={cn("mt-2 leading-relaxed text-white/50", i === 0 ? "max-w-sm text-base" : "text-sm")}>
                      {s(`${id}.value`)}
                    </p>
                  </div>
                </Link>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
