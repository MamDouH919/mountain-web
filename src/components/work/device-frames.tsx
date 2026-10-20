import Image from "next/image";

import { cn } from "@/lib/utils";

/** A desktop screenshot in a minimal browser window, with the live URL in the bar. */
export function BrowserFrame({
  src,
  alt,
  url,
  priority,
  className,
}: {
  src: string;
  alt: string;
  url: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)] sm:rounded-3xl",
        className,
      )}
    >
      <div className="flex items-center gap-3 border-b border-white/[0.08] bg-white/[0.03] px-4 py-3">
        <div aria-hidden className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span key={i} className="size-2.5 rounded-full bg-white/15" />
          ))}
        </div>
        {/* Always LTR: a URL reads left to right in either language. */}
        <div dir="ltr" className="mx-auto max-w-sm flex-1 truncate rounded-full bg-white/[0.06] px-4 py-1 text-center text-xs text-white/45">
          {url.replace(/^https?:\/\//, "")}
        </div>
        <div aria-hidden className="w-[42px]" />
      </div>
      <div className="relative aspect-[16/10]">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(min-width: 1152px) 1100px, 100vw"
          className="object-cover object-top"
        />
      </div>
    </div>
  );
}

/** A mobile screenshot in a phone body. */
export function PhoneFrame({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <div
      className={cn(
        "rounded-[2.25rem] border border-white/15 bg-zinc-900 p-2 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.95)]",
        className,
      )}
    >
      <div className="relative aspect-[390/844] overflow-hidden rounded-[1.75rem] bg-black">
        <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 260px, 45vw" className="object-cover object-top" />
        <div aria-hidden className="absolute top-2 start-1/2 h-5 w-20 -translate-x-1/2 rounded-full bg-black rtl:translate-x-1/2" />
      </div>
    </div>
  );
}
