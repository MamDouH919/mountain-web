"use client";

import { useTransition } from "react";
import { Languages } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { usePathname, useRouter } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ className }: { className?: string }) {
  const t = useTranslations("Nav");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const next: Locale = locale === "ar" ? "en" : "ar";

  return (
    <button
      type="button"
      lang={next}
      aria-label={t("switchLabel")}
      disabled={isPending}
      onClick={() =>
        startTransition(() => {
          // Same page, other locale. The layout re-renders <html lang dir>.
          router.replace(pathname, { locale: next, scroll: false });
        })
      }
      className={cn(
        "inline-flex h-9 items-center gap-1.5 rounded-full border border-white/10 px-3 text-xs font-medium text-white/80 transition-colors hover:border-white/25 hover:text-white disabled:opacity-50",
        className,
      )}
    >
      <Languages className="size-3.5" aria-hidden />
      {t("switchTo")}
    </button>
  );
}
