import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("inline-flex items-center gap-2 text-xs font-medium tracking-[0.2em] text-white/50 uppercase rtl:tracking-normal", className)}>
      <span aria-hidden className="h-px w-6 bg-brand" />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  as: Tag = "h2",
  className,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <Reveal className={cn("max-w-3xl", className)}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <Tag
        className={cn(
          "mt-5 font-semibold tracking-[-0.03em] text-balance text-white rtl:tracking-normal",
          Tag === "h1"
            ? "text-[clamp(2.5rem,6vw,4.75rem)] leading-[1.02] rtl:leading-[1.3]"
            : "text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] rtl:leading-[1.35]",
        )}
      >
        {title}
      </Tag>
      {subtitle && <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/55 sm:text-lg">{subtitle}</p>}
    </Reveal>
  );
}

/** Top-of-page header used by the inner pages, sized to clear the floating nav. */
export function PageHeader(props: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <section className="relative isolate overflow-hidden px-6 pt-40 pb-16 sm:px-8 sm:pt-48 sm:pb-24">
      <div
        aria-hidden
        className="absolute -top-40 start-1/2 -z-10 size-[36rem] -translate-x-1/2 bg-radial-[closest-side] from-brand/10 to-transparent rtl:translate-x-1/2"
      />
      <div className="mx-auto max-w-6xl">
        <SectionHeading as="h1" {...props} />
      </div>
    </section>
  );
}
