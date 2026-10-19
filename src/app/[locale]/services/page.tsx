import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { CtaSection } from "@/components/home/cta-section";
import { ServiceCard } from "@/components/services/service-card";
import { PageHeader } from "@/components/shared/section-heading";
import { serviceIds } from "@/content/services";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Meta");
  return { title: `${t("services")} · ${t("title")}`, description: t("servicesDescription") };
}

export default async function ServicesPage() {
  const t = await getTranslations("Services");

  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />
      <section className="px-6 pb-12 sm:px-8">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2">
          {serviceIds.map((id, i) => (
            <ServiceCard
              key={id}
              id={id}
              index={i}
              copy={{
                title: t(`items.${id}.title`),
                value: t(`items.${id}.value`),
                description: t(`items.${id}.description`),
                deliverables: [t(`items.${id}.d1`), t(`items.${id}.d2`), t(`items.${id}.d3`)],
                deliverablesLabel: t("deliverables"),
                cta: t("cta"),
              }}
            />
          ))}
        </div>
      </section>
      <CtaSection />
    </>
  );
}
