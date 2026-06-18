import { useEffect, useRef, useState } from 'react';
import type { ImageMetadata } from 'astro';

import imgCheerleading from '../assets/images/dziecko-cheerleading-grupy-turniejowe-tarnow-inferno.webp';
import imgCheerOpen from '../assets/images/dziecko-cheer-open-szkolka-tarnow-inferno.webp';
import imgBalet from '../assets/images/dziecko-balet-zajecia-tarnow-inferno.webp';
import imgOgolnorozwojowe from '../assets/images/dziecko-zajecia-ogolnorozwojowe-tarnow-inferno.webp';

interface OfferItem {
  title: string;
  subtitle: string;
  desc: string;
  desc2: string;
  note?: string;
  image: ImageMetadata;
}

const offerData: OfferItem[] = [
  {
    title: 'Cheerleading',
    subtitle: 'Grupy turniejowe',
    desc: 'Treningi dla osób chcących rozwijać się w cheerleadingu sportowym i brać udział w pokazach oraz zawodach.',
    desc2: 'Podczas zajęć pracujemy nad techniką, choreografiami, skokami, akrobatyką oraz współpracą zespołową. To połączenie sportu, energii i widowiskowych układów.',
    image: imgCheerleading,
  },
  {
    title: 'Cheer Open',
    subtitle: 'Szkółka cheerleadingu',
    desc: 'Szkółka cheer to idealna grupa dla osób rozpoczynających swoją przygodę z cheerleadingiem!',
    desc2: 'Na zajęciach poznajemy podstawy cheeru, uczymy się prostych choreografii, elementów gimnastyki i pracy z pomponami — wszystko w przyjaznej i pełnej uśmiechu atmosferze.',
    note: 'Z tej grupy najzdolniejsze tancerki zapraszane są do grup turniejowych.',
    image: imgCheerOpen,
  },
  {
    title: 'Balet',
    subtitle: 'Z elementami gimnastyki',
    desc: 'Zajęcia baletowe z elementami gimnastyki i akrobatyki rozwijające grację, koordynację, muzykalność i prawidłową postawę ciała.',
    desc2: 'Podczas treningów dzieci poznają podstawy techniki baletowej poprzez ruch, taniec i kreatywną pracę przy muzyce.',
    image: imgBalet,
  },
  {
    title: 'Ogólnorozwojowe',
    subtitle: 'Sprawność i zabawa',
    desc: 'Aktywne zajęcia ruchowe dla dzieci, podczas których rozwijamy sprawność, gibkość, koordynację i podstawy gimnastyki oraz akrobatyki.',
    desc2: 'Ćwiczenia dostosowane są do wieku i poziomu uczestników, a najważniejsza jest dobra zabawa i zdrowy rozwój dziecka!',
    image: imgOgolnorozwojowe,
  },
];

export function Offer() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const equalize = () => {
      const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
      cards.forEach(c => (c.style.minHeight = ''));
      const maxH = Math.max(...cards.map(c => c.offsetHeight));
      cards.forEach(c => (c.style.minHeight = `${maxH}px`));
    };
    equalize();
    window.addEventListener('resize', equalize);
    return () => window.removeEventListener('resize', equalize);
  }, []);

  return (
    <section
      id="oferta"
      ref={sectionRef}
      aria-labelledby="offer-heading"
      className="relative z-20 py-12 lg:py-16 bg-background border-t border-brand-500/30"
    >
      <div className="container mx-auto px-4 max-w-7xl">

        <div
          className={`max-w-2xl mb-8 lg:mb-10 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 will-change-transform'
          }`}
        >
          <p className="mb-3 font-spartan font-semibold text-xs tracking-widest uppercase text-brand-500">
            Co oferujemy
          </p>
          <h2
            id="offer-heading"
            className="font-spartan font-bold text-4xl lg:text-5xl text-foreground mb-4 tracking-tight"
          >
            Nasza <span className="text-brand-500">Oferta</span>
          </h2>
          <p className="font-sans text-sm sm:text-base text-zinc-400 leading-relaxed">
            Oferujemy różnorodne zajęcia dla wszystkich poziomów zaawansowania. Wybierz zajęcia, dołącz do naszej społeczności i odkryj radość z ruchu!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">
          {offerData.map((offer, index) => (
            <div
              key={offer.title}
              ref={el => { cardsRef.current[index] = el; }}
              className={`h-full transition-all duration-700 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 will-change-transform'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="group relative overflow-hidden rounded-2xl bg-black border border-border/40 h-full min-h-[280px] transition-colors hover:border-brand-500/50">

                {/* Image */}
                <div className="absolute inset-y-0 right-0 w-[44%] md:w-[36%] lg:w-[48%] pointer-events-none z-[1]">
                  <img
                    src={offer.image.src}
                    width={offer.image.width}
                    height={offer.image.height}
                    alt=""
                    aria-hidden="true"
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
                </div>

                {/* Text */}
                <div className="relative z-10 p-6 lg:p-7 flex flex-col w-full md:w-auto md:max-w-[68%] lg:max-w-[62%]">
                  <p className="font-sans text-[11px] font-semibold text-brand-500 uppercase tracking-widest mb-2">
                    {offer.subtitle}
                  </p>
                  <h3 className="font-spartan font-bold text-[1.6rem] lg:text-3xl text-foreground tracking-tight leading-tight mb-3">
                    {offer.title}
                  </h3>
                  <p className="font-sans text-sm text-zinc-400 leading-relaxed">
                    {offer.desc}
                  </p>
                  <p className="font-sans text-sm text-zinc-400 group-hover:text-zinc-100 leading-relaxed mt-2.5 transition-colors">
                    {offer.desc2}
                  </p>
                  {offer.note && (
                    <p className="font-sans text-xs text-zinc-500 leading-relaxed mt-3 pt-3 border-t border-zinc-800">
                      {offer.note}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
