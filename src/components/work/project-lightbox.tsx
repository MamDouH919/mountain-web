"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { ProjectArt } from "@/components/work/project-art";
import type { Project } from "@/content/work";
import { cn } from "@/lib/utils";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: Project;
  title: string;
  type: string;
  /** Image to open on, e.g. the one the card was scrubbed to. */
  startIndex?: number;
};

export function ProjectLightbox({ open, onOpenChange, project, title, type, startIndex = 0 }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="inset-0 top-0 start-0 flex h-dvh w-screen max-w-none translate-x-0 translate-y-0 flex-col gap-0 rounded-none bg-black/95 p-0 ring-0 backdrop-blur-2xl sm:max-w-none rtl:translate-x-0"
      >
        {/* The dialog only mounts its content while open, so the body's state
            starts fresh at startIndex every time it opens. */}
        <LightboxBody project={project} title={title} type={type} startIndex={startIndex} />
      </DialogContent>
    </Dialog>
  );
}

function LightboxBody({ project, title, type, startIndex }: Omit<Props, "open" | "onOpenChange"> & { startIndex: number }) {
  const t = useTranslations("Work.gallery");
  const isRtl = useLocale() === "ar";
  const images = project.images ?? [];
  const total = Math.max(images.length, 1);
  const hasMany = images.length > 1;

  // [index, direction]: direction drives which side the next slide enters from.
  const [[index, direction], setSlide] = useState<[number, number]>([Math.min(startIndex, total - 1), 0]);
  const go = (step: number) => setSlide(([i]) => [(i + step + total) % total, step]);
  const goTo = (i: number) => setSlide(([cur]) => [i, i > cur ? 1 : -1]);

  // Visual direction: "next" comes from the right in LTR, from the left in RTL.
  const flip = isRtl ? -1 : 1;

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!hasMany) return;
    if (e.key === "ArrowRight") go(flip);
    else if (e.key === "ArrowLeft") go(-flip);
    else return;
    e.preventDefault();
  };

  const onDragEnd = (_: unknown, info: PanInfo) => {
    const swipe = Math.abs(info.offset.x) > 80 || Math.abs(info.velocity.x) > 500;
    if (swipe) go((info.offset.x < 0 ? 1 : -1) * flip);
  };

  // Keep the active thumbnail visible in the strip.
  const thumbs = useRef<Array<HTMLButtonElement | null>>([]);
  useEffect(() => {
    thumbs.current[index]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [index]);

  return (
    <div className="flex h-full flex-col" onKeyDown={onKeyDown}>
      <header className="flex items-center justify-between gap-4 px-5 pt-5 sm:px-8 sm:pt-6">
        <div className="min-w-0">
          <p className="text-xs text-white/50">{type}</p>
          <DialogTitle className="truncate text-lg font-semibold tracking-tight text-white sm:text-xl">{title}</DialogTitle>
          <DialogDescription className="sr-only">{t("swipe")}</DialogDescription>
        </div>
        <div className="flex items-center gap-3">
          {hasMany && (
            <span className="text-sm text-white/60 tabular-nums" aria-live="polite">
              <span className="sr-only">{t("imageOf", { index: index + 1, total })}</span>
              {/* LTR so Arabic's bidi rules don't flip "2 / 4" into "4 / 2". */}
              <span aria-hidden dir="ltr">
                {index + 1} / {total}
              </span>
            </span>
          )}
          <DialogClose
            aria-label={t("close")}
            className="flex size-11 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-white/40 hover:bg-white/10 hover:text-white"
          >
            <X className="size-5" />
          </DialogClose>
        </div>
      </header>

      {/* Stage */}
      <div className="relative min-h-0 flex-1 overflow-hidden px-4 py-4 sm:px-20 sm:py-6">
        <div className="relative size-full">
          <AnimatePresence initial={false} custom={direction * flip} mode="popLayout">
            <motion.div
              key={index}
              custom={direction * flip}
              variants={{
                enter: (d: number) => ({ x: d === 0 ? 0 : `${d * 30}%`, opacity: 0, scale: 0.96 }),
                center: { x: 0, opacity: 1, scale: 1 },
                exit: (d: number) => ({ x: `${d * -30}%`, opacity: 0, scale: 0.96 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ x: { type: "spring", stiffness: 260, damping: 30 }, opacity: { duration: 0.25 }, scale: { duration: 0.3 } }}
              drag={hasMany ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.5}
              onDragEnd={onDragEnd}
              className={cn("absolute inset-0 flex items-center justify-center", hasMany && "cursor-grab active:cursor-grabbing")}
            >
              {images.length > 0 ? (
                <Image
                  src={images[index]}
                  alt={`${title}, ${t("imageOf", { index: index + 1, total })}`}
                  fill
                  sizes="100vw"
                  priority
                  draggable={false}
                  className="pointer-events-none object-contain select-none"
                />
              ) : (
                <div className="relative aspect-[4/5] h-full max-h-full overflow-hidden rounded-3xl">
                  <ProjectArt project={project} title={title} />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {hasMany && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label={t("prev")}
              className="absolute start-3 top-1/2 z-10 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white backdrop-blur-md transition-colors hover:bg-white hover:text-black sm:flex"
            >
              <ChevronLeft className="size-5 rtl:-scale-x-100" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label={t("next")}
              className="absolute end-3 top-1/2 z-10 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white backdrop-blur-md transition-colors hover:bg-white hover:text-black sm:flex"
            >
              <ChevronRight className="size-5 rtl:-scale-x-100" />
            </button>
          </>
        )}
      </div>

      {hasMany && (
        <nav aria-label={t("thumbnails")} className="flex justify-center px-4 pb-5 sm:pb-8">
          <div className="flex max-w-full gap-2 overflow-x-auto p-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {images.map((src, i) => (
              <button
                key={src}
                ref={(el) => {
                  thumbs.current[i] = el;
                }}
                type="button"
                onClick={() => goTo(i)}
                aria-label={t("imageOf", { index: i + 1, total })}
                aria-current={i === index}
                className={cn(
                  "relative h-14 w-20 shrink-0 overflow-hidden rounded-xl border transition-all duration-300 sm:h-16 sm:w-24",
                  i === index
                    ? "border-brand opacity-100 ring-2 ring-brand/40"
                    : "border-white/10 opacity-45 hover:opacity-80",
                )}
              >
                <Image src={src} alt="" fill sizes="96px" className="object-cover" />
              </button>
            ))}
          </div>
        </nav>
      )}
    </div>
  );
}
