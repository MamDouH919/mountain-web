import type { Project } from "@/content/work";

/**
 * Stand-in cover art generated from the project's palette and category, so
 * the portfolio looks finished before real photography exists.
 */
export function ProjectArt({ project, title }: { project: Project; title: string }) {
  const [deep, light] = project.palette;
  const initial = title.trim().charAt(0);

  return (
    <div
      aria-hidden
      className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.04]"
      style={{ background: `radial-gradient(120% 90% at 20% 0%, ${light}55, transparent 60%), linear-gradient(160deg, ${deep}, #050505 85%)` }}
    >
      {/* Faint grid texture shared by every cover. */}
      <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(to_right,rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:32px_32px]" />

      {project.category === "logos" && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute size-[70%] rounded-full border border-white/10" />
          <div className="absolute size-[48%] rounded-full border border-white/15" />
          <div
            className="flex size-[34%] items-center justify-center rounded-[28%] text-[clamp(2.5rem,7vw,5rem)] font-bold text-black shadow-2xl"
            style={{ background: light, boxShadow: `0 30px 80px -20px ${light}` }}
          >
            {initial}
          </div>
        </div>
      )}

      {project.category === "websites" && (
        <div className="absolute inset-x-[8%] top-[14%] bottom-0 overflow-hidden rounded-t-xl border border-white/15 bg-black/60 shadow-2xl backdrop-blur">
          <div className="flex gap-1.5 border-b border-white/10 px-3 py-2.5">
            {[0, 1, 2].map((i) => (
              <span key={i} className="size-2 rounded-full bg-white/20" />
            ))}
          </div>
          <div className="space-y-3 p-[7%]">
            <div className="h-2 w-1/4 rounded-full" style={{ background: light }} />
            <div className="h-5 w-4/5 rounded bg-white/80" />
            <div className="h-5 w-3/5 rounded bg-white/60" />
            <div className="grid grid-cols-3 gap-2 pt-4">
              {[0, 1, 2].map((i) => (
                <div key={i} className="aspect-[4/3] rounded-md bg-white/[0.07]" />
              ))}
            </div>
          </div>
        </div>
      )}

      {project.category === "apps" && (
        <div className="absolute start-1/2 top-[12%] bottom-[-10%] w-[46%] -translate-x-1/2 rounded-[2rem] border border-white/20 bg-black/70 p-[3%] shadow-2xl rtl:translate-x-1/2">
          <div className="flex h-full flex-col gap-3 rounded-[1.6rem] bg-white/[0.04] p-[9%]">
            <div className="mx-auto h-1.5 w-1/3 rounded-full bg-white/20" />
            <div className="mt-2 h-[30%] rounded-2xl" style={{ background: `linear-gradient(135deg, ${light}, ${deep})` }} />
            <div className="h-2.5 w-2/3 rounded-full bg-white/70" />
            <div className="h-2 w-1/2 rounded-full bg-white/30" />
            <div className="mt-auto grid grid-cols-2 gap-2">
              <div className="aspect-square rounded-xl bg-white/[0.08]" />
              <div className="aspect-square rounded-xl bg-white/[0.08]" />
            </div>
          </div>
        </div>
      )}

      {project.category === "designs" && (
        <>
          <div className="absolute -end-[10%] -top-[10%] size-[65%] rounded-full blur-2xl" style={{ background: light, opacity: 0.55 }} />
          <div className="absolute start-[10%] bottom-[12%] h-[45%] w-[38%] rotate-[-8deg] rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md" />
          <div className="absolute end-[14%] bottom-[22%] h-[32%] w-[30%] rotate-[10deg] rounded-2xl shadow-2xl" style={{ background: light }} />
        </>
      )}
    </div>
  );
}
