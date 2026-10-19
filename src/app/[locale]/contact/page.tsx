import { Suspense } from "react";
import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { ContactForm } from "@/components/contact/contact-form";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { PageHeader } from "@/components/shared/section-heading";
import { site } from "@/content/site";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Meta");
  return { title: `${t("contact")} · ${t("title")}`, description: t("contactDescription") };
}

export default async function ContactPage() {
  const t = await getTranslations("Contact");

  const rowClass = "flex items-start gap-4 rounded-3xl border border-white/[0.08] bg-zinc-950/60 p-5";
  const iconClass = "flex size-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-brand";

  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />

      <section className="px-6 pb-28 sm:px-8">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1fr_1.6fr]">
          <RevealGroup className="space-y-3">
            <RevealItem className={rowClass}>
              <span className={iconClass}><Phone className="size-5" /></span>
              <div>
                <p className="text-xs text-white/40">{t("info.phone")}</p>
                {site.phones.map((p) => (
                  <a key={p.href} href={p.href} dir="ltr" className="mt-1 block text-lg font-medium text-white transition-colors hover:text-brand">
                    {p.display}
                  </a>
                ))}
              </div>
            </RevealItem>
            <RevealItem className={rowClass}>
              <span className={iconClass}><Mail className="size-5" /></span>
              <div className="min-w-0">
                <p className="text-xs text-white/40">{t("info.email")}</p>
                <a href={`mailto:${site.email}`} className="mt-1 block text-base font-medium break-all text-white transition-colors hover:text-brand">
                  {site.email}
                </a>
              </div>
            </RevealItem>
            <RevealItem className={rowClass}>
              <span className={iconClass}><MapPin className="size-5" /></span>
              <div>
                <p className="text-xs text-white/40">{t("info.location")}</p>
                <p className="mt-1 text-lg font-medium text-white">{t("info.locationValue")}</p>
              </div>
            </RevealItem>
            <RevealItem className={rowClass}>
              <span className={iconClass}><Clock className="size-5" /></span>
              <div>
                <p className="text-xs text-white/40">{t("info.hours")}</p>
                <p className="mt-1 text-base font-medium text-white">{t("info.hoursValue")}</p>
              </div>
            </RevealItem>
            <RevealItem>
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-full border border-[#25D366]/40 bg-[#25D366]/10 px-6 py-4 text-sm font-medium text-[#4ade80] transition-colors hover:bg-[#25D366]/20"
              >
                <MessageCircle className="size-4" />
                {t("info.whatsapp")}
              </a>
            </RevealItem>
          </RevealGroup>

          <Reveal delay={0.15}>
            {/* useSearchParams (service pre-select) needs a Suspense boundary. */}
            <Suspense fallback={<div className="min-h-[34rem] rounded-[2rem] border border-white/10 bg-zinc-950/70" />}>
              <ContactForm />
            </Suspense>
          </Reveal>
        </div>
      </section>
    </>
  );
}
