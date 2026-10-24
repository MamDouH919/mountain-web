import { ArrowUpRight, Check, Minus } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/shared/section-heading";
import type { PlanComparison as Plans } from "@/content/work";
import { cn } from "@/lib/utils";

const planKeys = ["catalog", "full"] as const;

/**
 * Two plan cards, each with how a customer buys on it, then a table of what
 * each plan switches on. Copy lives under Work.projects.<id>.study.plans.
 */
export async function PlanComparison({ id, plans }: { id: string; plans: Plans }) {
  const t = await getTranslations("Work.study");
  const p = await getTranslations(`Work.projects.${id}.study.plans`);
  const has = (plan: (typeof planKeys)[number], row: string) => plan === "full" || plans.catalog.includes(row);

  return (
    <section className="px-6 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <Eyebrow>{p("eyebrow")}</Eyebrow>
          <h2 className="mt-5 max-w-3xl text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] font-semibold tracking-[-0.03em] text-balance text-white rtl:leading-[1.35] rtl:tracking-normal">
            {p("title")}
          </h2>
          <p className="mt-4 max-w-2xl text-base text-white/55 sm:text-lg">{p("subtitle")}</p>
        </Reveal>

        <RevealGroup className="mt-12 grid gap-4 md:grid-cols-2">
          {planKeys.map((plan) => {
            const full = plan === "full";
            const flow = p.raw(`${plan}.flow`) as string[];
            const examples = plans.examples[plan];
            return (
              <RevealItem
                key={plan}
                className={cn(
                  "relative flex flex-col overflow-hidden rounded-3xl border p-8 sm:p-10",
                  full ? "border-brand/40 bg-brand/[0.06]" : "border-white/10 bg-white/[0.02]",
                )}
              >
                {full && (
                  <div
                    aria-hidden
                    className="absolute -end-24 -top-24 size-64 rounded-full bg-brand/20 blur-3xl"
                  />
                )}
                <div className="relative flex items-center justify-between gap-3">
                  <p className={cn("text-sm font-semibold", full ? "text-brand" : "text-white/45")}>{p(`${plan}.label`)}</p>
                  <span
                    className={cn(
                      "inline-flex h-6 items-center rounded-full px-2.5 text-[11px] font-semibold",
                      full ? "bg-brand text-brand-foreground" : "border border-white/15 text-white/70",
                    )}
                  >
                    {p(`${plan}.badge`)}
                  </span>
                </div>
                <h3 className="relative mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl">{p(`${plan}.name`)}</h3>
                <p className="relative mt-4 text-base leading-relaxed text-white/70 sm:text-lg">{p(`${plan}.body`)}</p>

                {/* How a customer buys on this plan, step by step. */}
                <p className="relative mt-8 text-xs tracking-[0.15em] text-white/40 uppercase rtl:tracking-normal">{p("flowTitle")}</p>
                <ol className="relative mt-4 space-y-3">
                  {flow.map((step, i) => (
                    <li key={step} className="flex items-center gap-3 text-sm text-white/80">
                      <span
                        className={cn(
                          "flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold tabular-nums",
                          full ? "bg-brand/15 text-brand" : "bg-white/[0.06] text-white/60",
                        )}
                      >
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>

                <p className="relative mt-8 border-t border-white/10 pt-6 text-sm text-white/55">
                  <span className="font-medium text-white/80">{p("bestFor")} </span>
                  {p(`${plan}.bestFor`)}
                </p>

                {examples.length > 0 && (
                  <ul className="relative mt-5 flex flex-wrap gap-2">
                    {examples.map((url) => (
                      <li key={url}>
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          dir="ltr"
                          className="inline-flex h-9 items-center gap-1.5 rounded-full border border-white/15 px-4 text-xs text-white/75 transition-colors hover:border-white/40 hover:text-white"
                        >
                          {url.replace(/^https?:\/\//, "")}
                          <ArrowUpRight className="size-3.5" />
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </RevealItem>
            );
          })}
        </RevealGroup>

        <Reveal className="mt-4 overflow-hidden rounded-3xl border border-white/10">
          <table className="w-full text-start text-sm">
            <caption className="sr-only">{p("title")}</caption>
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.03]">
                <th scope="col" className="px-5 py-4 text-start font-medium text-white/45 sm:px-8">
                  {p("feature")}
                </th>
                {planKeys.map((plan) => (
                  <th
                    key={plan}
                    scope="col"
                    className={cn(
                      "w-[4.5rem] px-2 py-4 text-center text-xs font-semibold sm:w-40 sm:px-3 sm:text-sm",
                      plan === "full" ? "text-brand" : "text-white/80",
                    )}
                  >
                    {p(`${plan}.name`)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {plans.rows.map((row) => (
                <tr key={row} className="border-b border-white/[0.06] last:border-0">
                  <th scope="row" className="px-4 py-4 text-start font-normal sm:px-8">
                    <span className="block text-white/85">{p(`rows.${row}.title`)}</span>
                    <span className="mt-0.5 block text-xs text-white/45">{p(`rows.${row}.body`)}</span>
                  </th>
                  {planKeys.map((plan) => (
                    <td key={plan} className={cn("px-2 py-4 text-center sm:px-3", plan === "full" && "bg-brand/[0.04]")}>
                      {has(plan, row) ? (
                        <Check aria-label={t("included")} className={cn("mx-auto size-5", plan === "full" ? "text-brand" : "text-white")} />
                      ) : (
                        <Minus aria-label={t("notIncluded")} className="mx-auto size-5 text-white/20" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>

        <Reveal>
          <p className="mt-6 text-center text-sm text-white/55">{p("upgrade")}</p>
        </Reveal>
      </div>
    </section>
  );
}
