"use client";

import { useRef } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { ProjectCard } from "@/components/work/project-card";
import { projects } from "@/content/work";
import { Link } from "@/i18n/navigation";

const featured = projects.filter((p) => p.featured);

export function FeaturedWork() {
  const t = useTranslations("FeaturedWork");
  const w = useTranslations("Work.projects");
  const isRtl = useLocale() === "ar";
  const track = useRef<HTMLDivElement>(null);

  // Native scroll-snap handles touch, trackpads and RTL. The buttons only nudge
  // it by one card. In RTL, "next" moves toward negative scrollLeft.
  const scroll = (step: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const amount = (card?.offsetWidth ?? el.clientWidth * 0.8) + 16;
    el.scrollBy({ left: step * amount * (isRtl ? -1 : 1), behavior: "smooth" });
  };

  return (
    <section className="overflow-hidden py-28 sm:py-36">
      <div className="mx-auto flex max-w-6xl flex-col justify-between gap-8 px-6 sm:px-8 md:flex-row md:items-end">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
        <Reveal className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scroll(-1)}
            aria-label={t("prev")}
            className="flex size-12 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-white/40 hover:text-white"
          >
            <ArrowLeft className="size-4 rtl:-scale-x-100" />
          </button>
          <button
            type="button"
            onClick={() => scroll(1)}
            aria-label={t("next")}
            className="flex size-12 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-white/40 hover:text-white"
          >
            <ArrowRight className="size-4 rtl:-scale-x-100" />
          </button>
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <div
          ref={track}
          className="mt-14 flex items-end snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-6 pb-4 [scrollbar-width:none] sm:px-8 lg:px-[max(2rem,calc((100vw-72rem)/2+2rem))] [&::-webkit-scrollbar]:hidden"
        >
          {featured.map((project) => (
            // Cards open their own lightbox, so they aren't wrapped in a link.
            <div
              key={project.id}
              data-card
              className="w-[82%] shrink-0 snap-start sm:w-[46%] lg:w-[36%]"
            >
              <ProjectCard
                project={project}
                title={w(`${project.id}.title`)}
                type={w(`${project.id}.type`)}
                fixedAspect="aspect-[4/5]"
              />
            </div>
          ))}
        </div>
      </Reveal>

      <div className="mx-auto mt-10 max-w-6xl px-6 sm:px-8">
        <Link
          href="/work"
          className="group inline-flex items-center gap-2 text-sm font-medium text-white/70 transition-colors hover:text-white"
        >
          {t("cta")}
          <ArrowUpRight className="size-4 rtl:-scale-x-100" />
        </Link>
      </div>
    </section>
  );
}
