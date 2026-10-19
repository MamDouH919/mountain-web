"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { easeOut } from "@/components/motion/reveal";
import { ProjectCard } from "@/components/work/project-card";
import { projects, workCategories, type WorkCategory } from "@/content/work";
import { cn } from "@/lib/utils";

type Filter = "all" | WorkCategory;
const filters: Filter[] = ["all", ...workCategories];

export function WorkGallery() {
  const t = useTranslations("Work");
  const [active, setActive] = useState<Filter>("all");

  const visible = active === "all" ? projects : projects.filter((p) => p.category === active);

  return (
    <section className="px-6 pb-12 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          role="tablist"
          aria-label={t("filterLabel")}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeOut, delay: 0.2 }}
          className="inline-flex flex-wrap gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1 backdrop-blur"
        >
          {filters.map((f) => {
            const count = f === "all" ? projects.length : projects.filter((p) => p.category === f).length;
            return (
              <button
                key={f}
                type="button"
                role="tab"
                aria-selected={active === f}
                onClick={() => setActive(f)}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm transition-colors sm:px-5",
                  active === f ? "text-black" : "text-white/60 hover:text-white",
                )}
              >
                {active === f && (
                  <motion.span
                    layoutId="work-filter"
                    className="absolute inset-0 -z-10 rounded-full bg-white"
                    transition={{ type: "spring", stiffness: 400, damping: 34 }}
                  />
                )}
                {t(`filters.${f}`)}
                <span className={cn("ms-1.5 text-xs tabular-nums", active === f ? "text-black/50" : "text-white/30")}>
                  {count}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* CSS columns give a true masonry layout with no JS measuring. */}
        <div className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
                transition={{ duration: 0.6, ease: easeOut, delay: Math.min(i, 8) * 0.05 }}
                className="mb-4 break-inside-avoid"
              >
                <ProjectCard
                  project={project}
                  title={t(`projects.${project.id}.title`)}
                  type={t(`projects.${project.id}.type`)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {visible.length === 0 && <p className="py-20 text-center text-white/40">{t("empty")}</p>}
      </div>
    </section>
  );
}
