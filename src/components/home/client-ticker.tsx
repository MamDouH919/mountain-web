import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { clients } from "@/content/site";

export async function ClientTicker() {
  const t = await getTranslations("Clients");
  const track = [...clients, ...clients];

  return (
    <section className="border-y border-white/[0.06] py-12 sm:py-16">
      <p className="px-6 text-center text-xs tracking-[0.2em] text-white/40 uppercase rtl:tracking-normal">{t("title")}</p>
      <div className="group relative mt-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <ul className="animate-marquee flex w-max items-center group-hover:[animation-play-state:paused]">
          {track.map((client, i) => (
            <li
              key={i}
              aria-hidden={i >= clients.length}
              // Client names are Latin, so they stay LTR in both locales.
              dir="ltr"
              className="flex w-36 shrink-0 flex-col items-center self-start gap-3 px-4 opacity-60 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 sm:w-44 sm:px-6"
            >
              <Image
                src={client.logo}
                alt={i >= clients.length ? "" : client.name}
                width={112}
                height={112}
                className="aspect-square size-24 shrink-0 rounded-full border border-white/10 object-cover sm:size-28"
              />
              <span className="line-clamp-2 h-8 text-center text-xs leading-4 font-medium text-white/60">{client.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
