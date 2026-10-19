import type { Metadata } from "next";
import { MapPin } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { CtaSection } from "@/components/home/cta-section";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Eyebrow, PageHeader, SectionHeading } from "@/components/shared/section-heading";
import { site } from "@/content/site";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Meta");
  return { title: `${t("about")} · ${t("title")}`, description: t("aboutDescription") };
}

const values = ["v1", "v2", "v3"] as const;
const steps = ["s1", "s2", "s3", "s4"] as const;

export default async function AboutPage() {
  const t = await getTranslations("About");
  const c = await getTranslations("Contact.info");

  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} subtitle={t("intro")} />

      {/* Mission */}
      <section className="px-6 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_2fr]">
          <Reveal>
            <Eyebrow>{t("missionTitle")}</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-[clamp(1.5rem,3.2vw,2.5rem)] leading-[1.3] font-medium tracking-tight text-balance text-white rtl:leading-[1.6] rtl:tracking-normal">
              {t("mission")}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="px-6 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2>
              <Eyebrow>{t("valuesTitle")}</Eyebrow>
            </h2>
          </Reveal>
          <RevealGroup className="mt-10 grid gap-px overflow-hidden rounded-[2rem] border border-white/[0.08] bg-white/[0.08] md:grid-cols-3">
            {values.map((v, i) => (
              <RevealItem key={v} className="bg-black p-8 sm:p-10">
                <span className="text-sm text-brand tabular-nums">0{i + 1}</span>
                <h3 className="mt-6 text-2xl font-semibold tracking-tight text-white">{t(`values.${v}.title`)}</h3>
                <p className="mt-3 leading-relaxed text-white/55">{t(`values.${v}.body`)}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Approach */}
      <section className="px-6 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <SectionHeading eyebrow={t("approachTitle")} title={t("approachTitle")} />
          <RevealGroup className="relative mt-16 grid gap-10 md:grid-cols-4 md:gap-6">
            <div aria-hidden className="absolute inset-x-0 top-5 hidden h-px bg-gradient-to-r from-brand/60 via-white/15 to-transparent md:block rtl:bg-gradient-to-l" />
            {steps.map((s, i) => (
              <RevealItem key={s} className="relative">
                <span className="relative flex size-10 items-center justify-center rounded-full border border-white/15 bg-black text-sm font-medium text-white tabular-nums">
                  {i + 1}
                </span>
                <h3 className="mt-6 text-xl font-semibold text-white">{t(`approach.${s}.title`)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">{t(`approach.${s}.body`)}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Location */}
      <section className="px-6 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow={c("location")} title={t("locationTitle")} subtitle={t("locationBody")} />
            <Reveal delay={0.15} className="mt-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-sm text-white/80">
              <MapPin className="size-4 text-brand" />
              {c("locationValue")}
            </Reveal>
          </div>
          <Reveal delay={0.1} className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-white/10">
            {/* Inverting the default Google map gives a dark map without an API key. */}
            <iframe
              title={t("mapTitle")}
              src={site.mapEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 size-full [filter:invert(0.92)_hue-rotate(180deg)_grayscale(0.6)_contrast(0.9)]"
            />
            <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-white/10 ring-inset" />
          </Reveal>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
