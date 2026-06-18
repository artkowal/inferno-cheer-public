import { Button } from '@/components/ui/button';
import tigerPattern from '../assets/images/inferno-cheer-elite-hero-bg-tiger-pattern.webp';

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="bg-parallax relative flex items-center justify-center bg-background bg-cover bg-center
      min-h-[clamp(500px,calc(100dvh-7rem),960px)]"
      style={{ backgroundImage: `url(${tigerPattern.src})` }}
    >
      <div className="container mx-auto z-10 flex flex-col items-center text-center px-4">

        {/* Club badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/25 pl-4 pr-5 py-2 font-spartan font-semibold text-xs md:text-sm tracking-widest uppercase text-zinc-300 text-center">
          <span className="w-2 h-2 rounded-full bg-brand-500 shrink-0" aria-hidden="true" />
          <span>Klub Cheerleadingu • Tarnów</span>
        </div>

        <h1
          id="hero-heading"
          className="font-gothic font-normal text-6xl md:text-[96px] leading-none tracking-wide uppercase text-foreground"
        >
          Inferno <span className="text-brand-500">Cheer Elite</span>
        </h1>

        <div className="mt-6 md:mt-5 flex flex-col items-start md:flex-row md:items-center gap-3 md:gap-4 font-spartan font-semibold text-xs md:text-sm leading-none tracking-[0.25em] uppercase text-zinc-300">

          <div className="flex items-center gap-2 md:gap-3">
            <span className="w-1.5 h-1.5 shrink-0 rounded-full bg-brand-500" aria-hidden="true" />
            <span>Energia</span>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <span className="w-1.5 h-1.5 shrink-0 rounded-full bg-brand-500" aria-hidden="true" />
            <span>Technika</span>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <span className="w-1.5 h-1.5 shrink-0 rounded-full bg-brand-500" aria-hidden="true" />
            <span>Pasja</span>
          </div>
        </div>

        <Button
          asChild
          size="lg"
          className="font-bold tracking-wide mt-12 py-6 text-lg px-8 cursor-pointer transition-all duration-200 hover:bg-brand-600 active:bg-brand-selected active:scale-[0.98]"
        >
          <a href="#kontakt">Dołącz do nas!</a>
        </Button>
      </div>
    </section>
  );
}