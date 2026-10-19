import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { CtaSection } from "@/components/home/cta-section";
import { PageHeader } from "@/components/shared/section-heading";
import { WorkGallery } from "@/components/work/work-gallery";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Meta");
  return { title: `${t("work")} · ${t("title")}`, description: t("workDescription") };
}

export default async function WorkPage() {
  const t = await getTranslations("Work");

  return (
    <>
      <PageHeader eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />
      <WorkGallery />
      <CtaSection />
    </>
  );
}
