import { Check } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/shared/section-heading";
import { featureIcon } from "@/components/work/feature-icons";
import type { CaseStudy } from "@/content/work";
import { cn } from "@/lib/utils";

const headingClass =
  "mt-5 max-w-3xl text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] font-semibold tracking-[-0.03em] text-balance text-white rtl:leading-[1.35] rtl:tracking-normal";

/** One card per kind of user, each with what they do in the product. Copy: study.audiences. */
export async function Audiences({ id, audiences }: { id: string; audiences: NonNullable<CaseStudy["audiences"]> }) {
  const a = await getTranslations(`Work.projects.${id}.study.audiences`);

  return (
    <section className="px-6 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <Eyebrow>{a("eyebrow")}</Eyebrow>
          <h2 className={headingClass}>{a("title")}</h2>
          <p className="mt-4 max-w-2xl text-base text-white/55 sm:text-lg">{a("subtitle")}</p>
        </Reveal>
        <RevealGroup stagger={0.06} className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map(({ key, icon }, i) => {
            const Icon = featureIcon[icon];
            // The last card is the team behind the app, set apart from the app's users.
            const staff = i === audiences.length - 1;
            return (
              <RevealItem
                key={key}
                className={cn(
                  "flex flex-col rounded-3xl border p-6 sm:p-7",
                  staff ? "border-brand/40 bg-brand/[0.06]" : "border-white/10 bg-white/[0.02]",
                )}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="flex size-11 items-center justify-center rounded-2xl bg-brand/15 text-brand">
                    <Icon className="size-5" />
                  </span>
                  <span className="text-xs text-white/40">{a(`${key}.where`)}</span>
                </div>
                <h3 className="mt-6 text-xl font-semibold tracking-tight text-white">{a(`${key}.title`)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">{a(`${key}.body`)}</p>
                <ul className="mt-6 space-y-2.5 border-t border-white/10 pt-5">
                  {(a.raw(`${key}.points`) as string[]).map((point) => (
                    <li key={point} className="flex gap-2.5 text-sm text-white/80">
                      <Check className="mt-0.5 size-4 shrink-0 text-brand" />
                      {point}
                    </li>
                  ))}
                </ul>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}

/** The product's main flow as a numbered track. Copy: study.journey. */
export async function Journey({ id, steps }: { id: string; steps: string[] }) {
  const j = await getTranslations(`Work.projects.${id}.study.journey`);

  return (
    <section className="px-6 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <Eyebrow>{j("eyebrow")}</Eyebrow>
          <h2 className={headingClass}>{j("title")}</h2>
          <p className="mt-4 max-w-2xl text-base text-white/55 sm:text-lg">{j("subtitle")}</p>
        </Reveal>
        <RevealGroup stagger={0.07} className="relative mt-14 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-6">
          {/* The rail behind the numbers, on the one-row layout only. */}
          <div aria-hidden className="absolute inset-x-6 top-6 hidden h-px bg-gradient-to-r from-brand/60 via-white/15 to-brand/60 lg:block" />
          {steps.map((step, i) => (
            <RevealItem key={step} className="relative">
              <span
                className={cn(
                  "relative flex size-12 items-center justify-center rounded-full border text-sm font-semibold tabular-nums",
                  i === 0 || i === steps.length - 1
                    ? "border-brand bg-brand text-brand-foreground shadow-[0_0_30px_-6px_var(--brand)]"
                    : "border-white/15 bg-black text-white",
                )}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 text-base font-semibold text-white">{j(`steps.${step}.title`)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/55">{j(`steps.${step}.body`)}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
