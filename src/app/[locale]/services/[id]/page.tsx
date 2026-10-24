import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check, Plus } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { CtaSection } from "@/components/home/cta-section";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/shared/section-heading";
import { serviceIcons, serviceIds, type ServiceId } from "@/content/services";
import { Link } from "@/i18n/navigation";

const deliverableKeys = ["d1", "d2", "d3", "d4", "d5", "d6"] as const;
const stepKeys = ["s1", "s2", "s3", "s4"] as const;
const faqKeys = ["q1", "q2"] as const;

function isServiceId(id: string): id is ServiceId {
  return (serviceIds as readonly string[]).includes(id);
}

export function generateStaticParams() {
  return serviceIds.map((id) => ({ id }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/services/[id]">): Promise<Metadata> {
  const { id } = await params;
  if (!isServiceId(id)) return {};

  const t = await getTranslations("Meta");
  const s = await getTranslations(`Services.items.${id}`);
  return { title: `${s("title")} · ${t("title")}`, description: s("description") };
}

// Every service is prerendered from generateStaticParams; unknown ids block so
// they answer with a real 404 status instead of a streamed not-found page.
export const instant = false;

export default async function ServicePage({ params }: PageProps<"/[locale]/services/[id]">) {
  const { id } = await params;
  if (!isServiceId(id)) notFound();

  const t = await getTranslations("Services.detail");
  const s = await getTranslations(`Services.items.${id}`);
  const Icon = serviceIcons[id];
  const index = serviceIds.indexOf(id);

  const next = serviceIds[(index + 1) % serviceIds.length];
  const nextTitle = (await getTranslations(`Services.items.${next}`))("title");

  return (
    <>
      {/* Intro */}
      <section className="relative isolate overflow-hidden px-6 pt-36 pb-14 sm:px-8 sm:pt-44 sm:pb-20">
        <div
          aria-hidden
          className="absolute -top-40 start-1/2 -z-10 size-[40rem] -translate-x-1/2 bg-radial-[closest-side] from-brand/10 to-transparent rtl:translate-x-1/2"
        />
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white"
            >
              <ArrowLeft className="size-4 rtl:-scale-x-100" />
              {t("back")}
            </Link>
          </Reveal>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <Reveal delay={0.05}>
              <div className="flex items-center gap-4">
                <span className="flex size-14 items-center justify-center rounded-2xl bg-brand text-brand-foreground shadow-[0_0_40px_-8px_var(--brand)]">
                  <Icon className="size-6" />
                </span>
                <Eyebrow>
                  {t("eyebrow")} · 0{index + 1}
                </Eyebrow>
              </div>
              <h1 className="mt-8 text-[clamp(2.75rem,7vw,5.5rem)] leading-[0.98] font-semibold tracking-[-0.04em] text-white rtl:leading-[1.25] rtl:tracking-normal">
                {s("title")}
              </h1>
              <p className="mt-5 text-xl font-medium text-brand sm:text-2xl">{s("value")}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-lg leading-relaxed text-white/70 sm:text-xl">{s("description")}</p>
              <Link
                href={{ pathname: "/contact", query: { service: id } }}
                className="group mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-brand ps-6 pe-2 text-sm font-semibold text-brand-foreground shadow-[0_0_40px_-8px_var(--brand)] transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {t("cta")}
                <span className="flex size-8 items-center justify-center rounded-full bg-black/90 text-white transition-transform duration-300 group-hover:rotate-45 rtl:-scale-x-100 rtl:group-hover:-rotate-45">
                  <ArrowUpRight className="size-4" />
                </span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="px-6 sm:px-8">
        <Reveal className="mx-auto grid max-w-6xl gap-6 border-t border-white/10 pt-12 md:grid-cols-[1fr_2fr]">
          <p className="text-xs tracking-[0.15em] text-white/40 uppercase rtl:tracking-normal">{t("overviewTitle")}</p>
          <p className="text-xl leading-relaxed text-pretty text-white/80 sm:text-2xl">{s("intro")}</p>
        </Reveal>
      </section>

      {/* Deliverables */}
      <section className="px-6 pt-20 sm:px-8 sm:pt-28">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2 className="max-w-2xl text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] font-semibold tracking-[-0.03em] text-balance text-white rtl:leading-[1.35] rtl:tracking-normal">
              {t("includedTitle")}
            </h2>
          </Reveal>
          <RevealGroup stagger={0.05} className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {deliverableKeys.map((key) => (
              <RevealItem
                key={key}
                className="flex items-start gap-4 rounded-3xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-white/20 hover:bg-white/[0.04]"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-brand/15 text-brand">
                  <Check className="size-4" />
                </span>
                <p className="pt-1.5 text-base text-white/85">{s(key)}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Process */}
      <section className="px-6 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] font-semibold tracking-[-0.03em] text-white rtl:leading-[1.35] rtl:tracking-normal">
              {t("processTitle")}
            </h2>
          </Reveal>
          <RevealGroup className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {stepKeys.map((key, i) => (
              <RevealItem key={key} className="bg-black p-8">
                <p className="text-sm font-semibold text-brand tabular-nums">0{i + 1}</p>
                <h3 className="mt-6 text-xl font-semibold text-white">{s(`steps.${key}.title`)}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/55">{s(`steps.${key}.body`)}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 sm:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1fr_2fr]">
          <Reveal>
            <h2 className="text-[clamp(2rem,4.5vw,3rem)] leading-[1.05] font-semibold tracking-[-0.03em] text-white rtl:leading-[1.35] rtl:tracking-normal">
              {t("faqTitle")}
            </h2>
          </Reveal>
          <Reveal delay={0.05} className="divide-y divide-white/10 border-y border-white/10">
            {faqKeys.map((key) => (
              <details key={key} className="group py-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-medium text-white [&::-webkit-details-marker]:hidden">
                  {s(`faq.${key}.q`)}
                  <Plus className="size-5 shrink-0 text-white/50 transition-transform duration-300 group-open:rotate-45" />
                </summary>
                <p className="mt-4 max-w-2xl leading-relaxed text-white/60">{s(`faq.${key}.a`)}</p>
              </details>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Next service */}
      <section className="px-6 pt-20 sm:px-8">
        <div className="mx-auto flex max-w-6xl justify-end border-t border-white/10 pt-12">
          <Reveal>
            <Link href={`/services/${next}`} className="group inline-flex items-center gap-4 text-white">
              <span className="text-end">
                <span className="block text-xs text-white/45">{t("next")}</span>
                <span className="mt-1 block text-2xl font-semibold tracking-tight">{nextTitle}</span>
              </span>
              <span className="flex size-12 items-center justify-center rounded-full border border-white/15 transition-colors group-hover:border-white group-hover:bg-white group-hover:text-black">
                <ArrowUpRight className="size-5 rtl:-scale-x-100" />
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
