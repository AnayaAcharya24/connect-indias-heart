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
      <div className={compact ? "relative mx-auto max-w-[1480px] px-5 pb-6 pt-14 md:px-8 md:pb-7 md:pt-16 lg:pb-10 lg:pt-12" : "relative mx-auto max-w-[1480px] px-5 pb-14 pt-32 md:px-8 md:pb-20 md:pt-44"}>
        <p className={compact ? "mb-2 flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 text-[10px] font-bold uppercase tracking-[0.15em] text-gold md:mb-3 md:gap-x-3 md:text-[11px] md:tracking-[0.22em]" : "mb-5 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.28em] text-gold"}>
          <span className="h-px w-8 bg-primary" />
          {eyebrow}
        </p>
        <h1 className={compact ? "font-display text-[clamp(2.875rem,13vw,3.5rem)] md:text-[clamp(3.25rem,7vw,3.5rem)] lg:text-[clamp(5.625rem,6.5vw,6.5625rem)]" : "font-display text-[16vw] md:text-[9vw] xl:text-[140px]"}>{title}</h1>
        {text && <p className={compact ? "mt-2 max-w-lg break-words text-sm leading-snug text-ink-muted md:mt-3 md:text-base lg:text-lg" : "mt-5 max-w-lg text-lg text-ink-muted"}>{text}</p>}
        {children}
      </div>
    </section>
  );
}
