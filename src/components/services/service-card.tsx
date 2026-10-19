"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";

import { easeOut } from "@/components/motion/reveal";
import { serviceIcons, type ServiceId } from "@/content/services";
import { Link } from "@/i18n/navigation";

type Copy = {
  title: string;
  value: string;
  description: string;
  deliverables: string[];
  deliverablesLabel: string;
  cta: string;
};

export function ServiceCard({ id, index, copy }: { id: ServiceId; index: number; copy: Copy }) {
  const ref = useRef<HTMLDivElement>(null);
  const Icon = serviceIcons[id];

  // A soft spotlight follows the cursor across the card.
  const onPointerMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  return (
    <motion.div
      ref={ref}
      id={id}
      onPointerMove={onPointerMove}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: easeOut, delay: (index % 2) * 0.08 }}
      whileHover={{ y: -6 }}
      className="group relative flex scroll-mt-32 flex-col md:last:odd:col-span-2 overflow-hidden rounded-[2rem] border border-white/[0.08] bg-zinc-950/70 p-7 transition-colors duration-500 hover:border-white/20 sm:p-9"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: "radial-gradient(420px circle at var(--x, 50%) var(--y, 0%), color-mix(in oklch, var(--brand) 18%, transparent), transparent 70%)" }}
      />

      <div className="relative flex items-start justify-between">
        <motion.span
          className="flex size-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-white transition-colors duration-500 group-hover:border-brand/40 group-hover:bg-brand group-hover:text-brand-foreground"
          whileHover={{ rotate: -8, scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          <Icon className="size-6" />
        </motion.span>
        <span className="text-sm text-white/25 tabular-nums">0{index + 1}</span>
      </div>

      <h2 className="relative mt-10 text-2xl font-semibold tracking-tight text-white sm:text-3xl">{copy.title}</h2>
      <p className="relative mt-3 text-lg font-medium text-brand">{copy.value}</p>
      <p className="relative mt-4 leading-relaxed text-white/55">{copy.description}</p>

      <div className="relative mt-8 border-t border-white/[0.08] pt-6">
        <p className="text-xs font-medium tracking-[0.2em] text-white/35 uppercase rtl:tracking-normal">{copy.deliverablesLabel}</p>
        <ul className="mt-4 space-y-2.5">
          {copy.deliverables.map((d) => (
            <li key={d} className="flex items-start gap-3 text-sm text-white/75">
              <Check className="mt-0.5 size-4 shrink-0 text-brand" />
              {d}
            </li>
          ))}
        </ul>
      </div>

      <Link
        href={{ pathname: "/contact", query: { service: id } }}
        className="relative mt-auto inline-flex items-center gap-2 self-start pt-8 text-sm font-medium text-white/70 transition-colors hover:text-white"
      >
        {copy.cta}
        <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5" />
      </Link>
    </motion.div>
  );
}
