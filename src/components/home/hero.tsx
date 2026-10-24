"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion, useReducedMotion, useScroll, useTransform, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";

// WebGL only exists in the browser, so skip SSR and keep three.js out of the
// initial JS bundle.
const HeroScene = dynamic(() => import("@/components/three/hero-scene"), {
  ssr: false,
});

const ease = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.25 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
};

// Whole lines slide up from behind a mask. Animating per letter would break
// Arabic ligatures, so the line is the smallest unit.
const lineReveal: Variants = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 1.1, ease } },
};

export function Hero() {
  const t = useTranslations("Hero");
  const reducedMotion = useReducedMotion() ?? false;
  const [sceneReady, setSceneReady] = useState(false);

  // Subtle parallax: the scene drifts and fades as the hero scrolls away.
  const { scrollY } = useScroll();
  const sceneY = useTransform(scrollY, [0, 800], [0, 160]);
  const sceneOpacity = useTransform(scrollY, [0, 600], [1, 0.2]);

  const stats = [
    { value: "07", label: t("stats.services") },
    { value: t("stats.responseValue"), label: t("stats.response") },
    { value: t("stats.basedValue"), label: t("stats.based") },
  ];

  return (
    <section className="relative isolate flex min-h-svh items-center overflow-hidden bg-black">
      {/* Backdrop: a faint grid fading out from the centre, plus a brand glow
          behind the object. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20 opacity-[0.35] [background-image:linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_45%,black,transparent)]"
      />
      <div
        aria-hidden
        className="absolute top-1/2 -z-20 size-[42rem] -translate-y-1/2 bg-radial-[closest-side] from-brand/15 to-transparent end-[-12rem] lg:end-[-4rem]"
      />

      {/* 3D object. Full-bleed on mobile behind the copy; on desktop it sits
          on the inline-end side, so it flips with the text in Arabic. */}
      <motion.div
        aria-hidden
        style={{ y: sceneY, opacity: sceneOpacity }}
        className="absolute inset-0 -z-10 lg:start-[38%]"
      >
        <motion.div
          className="size-full"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={sceneReady ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.6, ease }}
        >
          <HeroScene reducedMotion={reducedMotion} onReady={() => setSceneReady(true)} />
        </motion.div>
      </motion.div>

      {/* Mobile scrim so the copy stays readable over the object. */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-black/30 via-black/60 to-black lg:hidden" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mx-auto w-full max-w-6xl px-6 pt-32 pb-24 sm:px-8 lg:pt-24"
      >
        <motion.p
          variants={fadeUp}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs font-medium tracking-wide text-white/70 backdrop-blur"
        >
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand opacity-75" />
            <span className="relative inline-flex size-1.5 rounded-full bg-brand" />
          </span>
          {t("eyebrow")}
        </motion.p>

        <h1 className="max-w-3xl text-[clamp(2.75rem,8vw,6.5rem)] leading-[0.95] font-semibold tracking-[-0.04em] text-white rtl:max-w-4xl rtl:text-[clamp(2.5rem,6.5vw,5.25rem)] rtl:leading-[1.25] rtl:tracking-normal">
          <span className="block overflow-hidden pb-[0.08em] rtl:pb-[0.22em]">
            <motion.span variants={lineReveal} className="block">
              {t("titleLine1")}
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-[0.08em] rtl:pb-[0.22em]">
            <motion.span
              variants={lineReveal}
              className="block bg-gradient-to-r from-white via-white/80 to-white/40 bg-clip-text text-transparent rtl:bg-gradient-to-l"
            >
              {t("titleLine2")}
            </motion.span>
          </span>
        </h1>

        <motion.p
          variants={fadeUp}
          className="mt-8 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg"
        >
          {t("subtitle")}
        </motion.p>

        <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-3">
          <Link
            href="/contact"
            className="group inline-flex h-12 items-center gap-2 rounded-full bg-brand ps-6 pe-2 text-sm font-semibold text-brand-foreground shadow-[0_0_40px_-8px_var(--brand)] transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {t("primaryCta")}
            <span className="flex size-8 items-center justify-center rounded-full bg-black/90 text-white transition-transform duration-300 group-hover:rotate-45 rtl:-scale-x-100 rtl:group-hover:-rotate-45">
              <ArrowUpRight className="size-4" />
            </span>
          </Link>
          <Link
            href="/work"
            className="inline-flex h-12 items-center rounded-full border border-white/15 px-6 text-sm font-medium text-white/85 backdrop-blur transition-colors hover:border-white/35 hover:bg-white/[0.04] hover:text-white"
          >
            {t("secondaryCta")}
          </Link>
        </motion.div>

        <motion.dl
          variants={fadeUp}
          className="mt-16 grid max-w-lg grid-cols-3 gap-6 border-t border-white/10 pt-6"
        >
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="text-xs text-white/45">{s.label}</dt>
              <dd className="mt-1 text-lg font-semibold tracking-tight text-white sm:text-xl">{s.value}</dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>

      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-[10px] tracking-[0.3em] text-white/40 uppercase sm:flex"
      >
        {t("scroll")}
        <span className="relative h-10 w-px overflow-hidden bg-white/15">
          <motion.span
            className="absolute inset-x-0 top-0 h-1/2 bg-white/70"
            animate={reducedMotion ? undefined : { y: ["-100%", "200%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}
