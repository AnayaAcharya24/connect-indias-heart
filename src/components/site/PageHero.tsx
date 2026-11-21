import type { ReactNode } from "react";

export function PageHero({ eyebrow, title, text, img, children, compact = false }: { eyebrow: string; title: string; text?: string; img?: string | undefined; children?: ReactNode; compact?: boolean }) {
  return (
    <section className="grain relative overflow-hidden bg-ink text-ink-foreground">
      {img && (
        <>
          <img src={img} alt="" className="absolute inset-0 h-full w-full object-cover opacity-45" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/30" />
        </>
      )}
      <div className={compact ? "relative mx-auto max-w-[1480px] px-5 pb-8 pt-24 md:px-8 md:pb-12 md:pt-28 lg:pb-14 lg:pt-[7.5rem]" : "relative mx-auto max-w-[1480px] px-5 pb-14 pt-32 md:px-8 md:pb-20 md:pt-44"}>
        <p className={compact ? "mb-3 flex min-w-0 flex-wrap items-center gap-x-3 gap-y-2 text-[10px] font-bold uppercase tracking-[0.18em] text-gold md:mb-4 md:text-[11px] md:tracking-[0.28em]" : "mb-5 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.28em] text-gold"}>
          <span className="h-px w-8 bg-primary" />
          {eyebrow}
        </p>
        <h1 className={compact ? "font-display text-[clamp(3.25rem,8.8vw,4.25rem)] lg:text-[clamp(4.25rem,11.2vw,8.75rem)]" : "font-display text-[16vw] md:text-[9vw] xl:text-[140px]"}>{title}</h1>
        {text && <p className={compact ? "mt-3 max-w-lg break-words text-base text-ink-muted md:mt-4 md:text-lg" : "mt-5 max-w-lg text-lg text-ink-muted"}>{text}</p>}
        {children}
      </div>
    </section>
  );
}
