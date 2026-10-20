"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Images, Maximize2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { ProjectArt, StudyCover } from "@/components/work/project-art";
import { ProjectLightbox } from "@/components/work/project-lightbox";
import type { Project } from "@/content/work";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const aspectClass: Record<Project["aspect"], string> = {
  tall: "aspect-[4/5]",
  square: "aspect-square",
  wide: "aspect-[4/3]",
};

export function ProjectCard({
  project,
  title,
  type,
  className,
  fixedAspect,
}: {
  project: Project;
  title: string;
  type: string;
  className?: string;
  /** Override the masonry aspect, e.g. for uniform slider cards. */
  fixedAspect?: string;
}) {
  const t = useTranslations("Work.gallery");
  const s = useTranslations("Work.study");
  const isRtl = useLocale() === "ar";
  const images = project.images ?? [];
  const count = images.length;
  const isGallery = count > 1;
  const study = !!project.caseStudy;

  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const surface = useRef<HTMLElement>(null);

  // Hover scrub: the pointer's horizontal position picks the image, the way
  // product cards on Dribbble or Airbnb preview a set. Mirrored in RTL so the
  // first image is always at the reading start.
  const onPointerMove = (e: React.PointerEvent) => {
    if (!isGallery || e.pointerType !== "mouse" || !surface.current) return;
    const rect = surface.current.getBoundingClientRect();
    let frac = (e.clientX - rect.left) / rect.width;
    if (isRtl) frac = 1 - frac;
    setActive(Math.min(count - 1, Math.max(0, Math.floor(frac * count))));
  };

  const [deep, light] = project.palette;

  const surfaceClass = cn(
    "relative block w-full overflow-hidden rounded-3xl border border-white/[0.08] bg-zinc-950 text-start shadow-[0_20px_60px_-25px_rgba(0,0,0,0.9)] outline-none transition-[transform,border-color] duration-500 ease-out focus-visible:ring-2 focus-visible:ring-brand/70 group-hover:border-white/20",
    fixedAspect ?? aspectClass[project.aspect],
  );

  const body = (
    <>
      {count === 0 ? (
        project.caseStudy ? (
          <StudyCover project={project} study={project.caseStudy} />
        ) : (
          <ProjectArt project={project} title={title} />
        )
      ) : (
        <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.03]">
          {images.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt=""
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 90vw"
              className={cn(
                "object-cover transition-opacity duration-300",
                i === active ? "opacity-100" : "opacity-0",
              )}
            />
          ))}
        </div>
      )}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/30 opacity-90 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Story-style segments show which image the scrub is on. */}
      {isGallery && (
        <div aria-hidden className="absolute inset-x-4 top-4 flex gap-1.5">
          {images.map((src, i) => (
            <span key={src} className="h-0.5 flex-1 overflow-hidden rounded-full bg-white/25">
              <span
                className={cn(
                  "block h-full origin-left rounded-full bg-white transition-transform duration-300 rtl:origin-right",
                  i === active ? "scale-x-100" : "scale-x-0",
                )}
              />
            </span>
          ))}
        </div>
      )}

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 sm:p-6">
        <div className="min-w-0">
          {study && (
            <span className="mb-3 inline-flex h-6 items-center rounded-full bg-brand px-2.5 text-[11px] font-semibold text-brand-foreground">
              {s("badge")}
            </span>
          )}
          <p className="text-xs text-white/60">{type}</p>
          <h3 className="mt-1 truncate text-lg font-semibold tracking-tight text-white sm:text-xl">{title}</h3>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {isGallery && (
            <span className="inline-flex h-8 items-center gap-1.5 rounded-full border border-white/15 bg-black/40 px-3 text-xs font-medium text-white backdrop-blur-md">
              <Images className="size-3.5" />
              <span className="tabular-nums">{count}</span>
            </span>
          )}
          <span className="flex size-8 items-center justify-center rounded-full bg-white text-black opacity-0 transition-all duration-500 group-hover:opacity-100 group-focus-within:opacity-100 max-sm:opacity-100">
            {study ? <ArrowUpRight className="size-4 rtl:-scale-x-100" /> : <Maximize2 className="size-3.5" />}
          </span>
        </div>
      </div>
    </>
  );

  return (
    <article className={cn("group relative", isGallery && "pt-3", className)}>
      {/* Deck layers peeking above the card signal "there's more than one". */}
      {isGallery && (
        <>
          <div
            aria-hidden
            className="absolute inset-x-6 top-0 bottom-6 rounded-3xl border border-white/[0.06] opacity-50 transition-transform duration-500 ease-out group-hover:-translate-y-1.5"
            style={{ background: `linear-gradient(160deg, ${deep}, #0a0a0a)` }}
          />
          <div
            aria-hidden
            className="absolute inset-x-3 top-1.5 bottom-3 rounded-3xl border border-white/[0.08] opacity-80 transition-transform duration-500 ease-out group-hover:-translate-y-0.5"
            style={{ background: `linear-gradient(160deg, ${light}40, #0a0a0a)` }}
          />
        </>
      )}

      {study ? (
        <Link
          ref={surface as React.Ref<HTMLAnchorElement>}
          href={`/work/${project.id}`}
          onPointerMove={onPointerMove}
          onPointerLeave={() => setActive(0)}
          aria-label={s("openStudy", { title })}
          className={cn(surfaceClass, "cursor-pointer")}
        >
          {body}
        </Link>
      ) : (
        <button
          ref={surface as React.Ref<HTMLButtonElement>}
          type="button"
          onClick={() => setOpen(true)}
          onPointerMove={onPointerMove}
          onPointerLeave={() => setActive(0)}
          aria-label={`${t("open", { title })}${count ? ` · ${t("count", { count })}` : ""}`}
          className={cn(surfaceClass, "cursor-zoom-in")}
        >
          {body}
        </button>
      )}

      {!study && (
        <ProjectLightbox
          open={open}
          onOpenChange={setOpen}
          project={project}
          title={title}
          type={type}
          startIndex={active}
        />
      )}
    </article>
  );
}
