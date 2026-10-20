import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  ChartColumn,
  Languages,
  LayoutDashboard,
  Megaphone,
  QrCode,
  Smartphone,
  UserPlus,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { getTranslations } from "next-intl/server";

import { CtaSection } from "@/components/home/cta-section";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/shared/section-heading";
import { BrowserFrame, PhoneFrame } from "@/components/work/device-frames";
import { projects, type CaseStudyFeature } from "@/content/work";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const studies = projects.filter((p) => p.caseStudy);

const featureIcon: Record<CaseStudyFeature, LucideIcon> = {
  qr: QrCode,
  page: Smartphone,
  contact: UserPlus,
  dashboard: LayoutDashboard,
  analytics: ChartColumn,
  ads: Megaphone,
  language: Languages,
  cloud: Zap,
};

export function generateStaticParams() {
  return studies.map((p) => ({ id: p.id }));
}

function findStudy(id: string) {
  const project = studies.find((p) => p.id === id);
  return project?.caseStudy ? { project, study: project.caseStudy } : null;
}

export async function generateMetadata({ params }: PageProps<"/[locale]/work/[id]">): Promise<Metadata> {
  const { id } = await params;
  const found = findStudy(id);
  if (!found) return {};

  const t = await getTranslations("Meta");
  const w = await getTranslations(`Work.projects.${id}`);
  return {
    title: `${w("title")} · ${t("title")}`,
    description: w("study.summary"),
    openGraph: { images: [found.study.screens[0]] },
  };
}

// Every case study is prerendered from generateStaticParams, so links to them
// are instant. Only unknown ids block, and they should, to answer with a real
// 404 status instead of a streamed not-found page.
export const instant = false;

export default async function CaseStudyPage({ params }: PageProps<"/[locale]/work/[id]">) {
  const { id } = await params;
  const found = findStudy(id);
  if (!found) notFound();
  const { project, study } = found;

  const t = await getTranslations("Work.study");
  const w = await getTranslations(`Work.projects.${id}`);
  const title = w("title");

  const next = studies.length > 1 ? studies[(studies.indexOf(project) + 1) % studies.length] : null;
  const nextTitle = next ? (await getTranslations(`Work.projects.${next.id}`))("title") : null;

  const meta = [
    { label: t("client"), value: w("study.client") },
    { label: t("services"), value: w("study.services") },
    { label: t("year"), value: study.year },
  ];

  return (
    <>
      {/* Intro */}
      <section className="relative isolate overflow-hidden px-6 pt-36 pb-14 sm:px-8 sm:pt-44 sm:pb-20">
        <div
          aria-hidden
          className="absolute -top-40 start-1/2 -z-10 size-[40rem] -translate-x-1/2 rounded-full blur-[150px] rtl:translate-x-1/2"
          style={{ background: `${project.palette[1]}26` }}
        />
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white"
            >
              <ArrowLeft className="size-4 rtl:-scale-x-100" />
              {t("back")}
            </Link>
          </Reveal>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <Reveal delay={0.05}>
              <Eyebrow>{t("eyebrow")}</Eyebrow>
              <h1 className="mt-5 text-[clamp(2.75rem,7vw,5.5rem)] leading-[0.98] font-semibold tracking-[-0.04em] text-white rtl:leading-[1.25] rtl:tracking-normal">
                {title}
              </h1>
              <p className="mt-4 text-sm font-medium text-brand">{w("type")}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-lg leading-relaxed text-white/70 sm:text-xl">{w("study.summary")}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={study.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex h-12 items-center gap-2 rounded-full bg-brand ps-6 pe-2 text-sm font-semibold text-brand-foreground shadow-[0_0_40px_-8px_var(--brand)] transition-transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  {t("live")}
                  <span className="flex size-8 items-center justify-center rounded-full bg-black/90 text-white transition-transform duration-300 group-hover:rotate-45 rtl:-scale-x-100 rtl:group-hover:-rotate-45">
                    <ArrowUpRight className="size-4" />
                  </span>
                </a>
                <Link
                  href="/contact"
                  className="inline-flex h-12 items-center rounded-full border border-white/15 px-6 text-sm font-medium text-white/85 transition-colors hover:border-white/40 hover:text-white"
                >
                  {t("similar")}
                </Link>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <dl className="mt-14 grid grid-cols-1 gap-6 border-t border-white/10 pt-8 sm:grid-cols-3">
              {meta.map((m) => (
                <div key={m.label}>
                  <dt className="text-xs tracking-[0.15em] text-white/40 uppercase rtl:tracking-normal">{m.label}</dt>
                  <dd className="mt-2 text-base text-white">{m.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* Hero shot */}
      <section className="px-4 sm:px-8">
        <Reveal className="mx-auto max-w-6xl">
          <BrowserFrame src={study.screens[0]} alt={t("screenAlt", { title, index: 1 })} url={study.url} priority />
        </Reveal>
      </section>

      {/* Results */}
      <section className="px-6 pt-20 sm:px-8 sm:pt-28">
        <RevealGroup className="mx-auto grid max-w-6xl gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-3">
          {study.stats.map((key) => (
            <RevealItem key={key} className="bg-black px-8 py-10">
              <p dir="ltr" className="text-[clamp(2.75rem,6vw,4rem)] leading-none font-semibold tracking-[-0.04em] text-white rtl:text-end">
                {w(`study.stats.${key}.value`)}
              </p>
              <p className="mt-3 text-sm text-white/55">{w(`study.stats.${key}.label`)}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* Story */}
      <section className="px-6 py-20 sm:px-8 sm:py-28">
        <RevealGroup className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2">
          {(["challenge", "solution"] as const).map((key, i) => (
            <RevealItem
              key={key}
              className={cn(
                "rounded-3xl border p-8 sm:p-10",
                i === 0 ? "border-white/10 bg-white/[0.02]" : "border-brand/30 bg-brand/[0.06]",
              )}
            >
              <p className={cn("text-sm font-semibold", i === 0 ? "text-white/45" : "text-brand")}>
                0{i + 1} · {t(`${key}Title`)}
              </p>
              <p className="mt-5 text-lg leading-relaxed text-white/80 sm:text-xl">{w(`study.${key}`)}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* Phones */}
      <section className="overflow-hidden py-10 sm:py-16">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          <Reveal>
            <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] font-semibold tracking-[-0.03em] text-white rtl:leading-[1.35] rtl:tracking-normal">
              {t("screensTitle")}
            </h2>
            <p className="mt-4 max-w-xl text-base text-white/55 sm:text-lg">{w("study.phonesCaption")}</p>
          </Reveal>
        </div>
        <RevealGroup className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-6 [scrollbar-width:none] sm:px-8 lg:mx-auto lg:grid lg:max-w-6xl lg:grid-cols-4 lg:gap-6 lg:overflow-visible [&::-webkit-scrollbar]:hidden">
          {study.phones.map((src, i) => (
            <RevealItem key={src} className={cn("w-[62%] shrink-0 snap-center sm:w-[38%] lg:w-auto", i % 2 === 1 && "lg:translate-y-12")}>
              <PhoneFrame src={src} alt={t("phoneAlt", { title, index: i + 1 })} />
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* Features */}
      <section className="px-6 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2 className="max-w-2xl text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] font-semibold tracking-[-0.03em] text-balance text-white rtl:leading-[1.35] rtl:tracking-normal">
              {t("featuresTitle")}
            </h2>
          </Reveal>
          <RevealGroup stagger={0.05} className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {study.features.map((key) => {
              const Icon = featureIcon[key];
              return (
                <RevealItem
                  key={key}
                  className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-white/20 hover:bg-white/[0.04]"
                >
                  <span className="flex size-11 items-center justify-center rounded-2xl bg-brand/15 text-brand">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-5 text-base font-semibold text-white">{w(`study.features.${key}.title`)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/55">{w(`study.features.${key}.body`)}</p>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      {/* Remaining desktop screens */}
      {study.screens.slice(1).map((src, i) => (
        <section key={src} className="px-4 pb-10 sm:px-8">
          <Reveal className="mx-auto max-w-6xl">
            <BrowserFrame src={src} alt={t("screenAlt", { title, index: i + 2 })} url={study.url} />
            <p className="mt-5 text-center text-sm text-white/50">{w("study.dashboardCaption")}</p>
          </Reveal>
        </section>
      ))}

      {/* Stack + next */}
      <section className="px-6 pt-16 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 border-t border-white/10 pt-12 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <p className="text-xs tracking-[0.15em] text-white/40 uppercase rtl:tracking-normal">{t("stackTitle")}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {study.stack.map((tech) => (
                <li key={tech} dir="ltr" className="rounded-full border border-white/10 px-4 py-1.5 text-sm text-white/75">
                  {tech}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal>
            <Link
              href={next ? `/work/${next.id}` : "/work"}
              className="group inline-flex items-center gap-4 text-white"
            >
              <span className="text-end">
                <span className="block text-xs text-white/45">{next ? t("next") : t("back")}</span>
                <span className="mt-1 block text-2xl font-semibold tracking-tight">{nextTitle ?? t("allWork")}</span>
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
