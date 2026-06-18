import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import aboutImage from '../assets/images/inferno-cheer-elite-tarnow-druzyna-poznaj-nas.webp';

export function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="o-nas"
      ref={sectionRef}
      aria-labelledby="about-heading"
      className="relative z-20 py-12 lg:py-16 bg-zinc-950/50  border-t border-brand-500/30 overflow-hidden"
    >
      <div className="container mx-auto px-4 max-w-7xl">

        <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-[auto_1fr] gap-6 lg:gap-x-16 lg:gap-y-8">

          {/* Heading */}
          <div
            className={`order-1 lg:col-start-2 lg:row-start-1 transition-all duration-700 ease-out
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 will-change-transform'}`}
          >
            <p className="mb-3 font-spartan font-semibold text-xs tracking-widest uppercase text-brand-500">
              Poznaj nas
            </p>
            <h2
              id="about-heading"
              className="font-spartan font-bold text-4xl lg:text-5xl tracking-tight text-foreground"
            >
              Kim <span className="text-brand-500">Jesteśmy?</span>
            </h2>
          </div>

          {/* Image */}
          <div
            className={`order-2 lg:col-start-1 lg:row-start-1 lg:row-span-2 relative w-full aspect-4/3 sm:aspect-video lg:aspect-auto lg:h-full min-h-[340px] rounded-2xl overflow-hidden shadow-[0_20px_50px_-12px_rgba(217,10,20,0.15)] transition-all duration-1000 ease-out
              ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12 will-change-transform'}`}
            style={{ transitionDelay: '200ms' }}
          >
            <img
              src={aboutImage.src}
              width={aboutImage.width}
              height={aboutImage.height}
              alt="Drużyna Inferno Cheer Elite z pomponami na parkiecie"
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 border border-white/5 rounded-2xl pointer-events-none" aria-hidden="true" />
            <div className="absolute bottom-4 left-4 px-4 py-2 bg-brand-500 rounded-lg" aria-hidden="true">
              <span className="font-spartan font-bold text-xs tracking-widest uppercase text-white">
                Nasz Zespół
              </span>
            </div>
          </div>

          {/* Description + CTA */}
          <div
            className={`order-3 lg:col-start-2 lg:row-start-2 flex flex-col justify-start transition-all duration-700 ease-out
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 will-change-transform'}`}
            style={{ transitionDelay: '150ms' }}
          >
            <div className="font-sans text-sm lg:text-base text-zinc-400 leading-relaxed space-y-5">
              <p>
                Inferno Cheer Elite to <span className="text-zinc-200 font-medium">studio tańca i cheerleadingu</span>. Tworzymy przestrzeń dla <span className="text-zinc-200 font-medium">dzieci, młodzieży i dorosłych</span> – bez względu na doświadczenie!
              </p>
              <p>
                Na zajęciach łączymy <span className="text-zinc-200 font-medium">ruch, energię i pasję</span>, stawiając na rozwój, siłę i pozytywną atmosferę. Oferujemy różnorodne zajęcia, które pomagają w budowaniu <span className="text-zinc-200 font-medium">pewności siebie</span> oraz umiejętności pracy w zespole.
              </p>
              <p>
                Nasze profesjonalne podejście oraz przyjazna atmosfera sprawiają, że <span className="text-brand-500 font-medium">każdy znajdzie coś dla siebie</span>.
              </p>
            </div>

            <div className="mt-8 flex justify-center lg:justify-start">
              <Button
                asChild
                size="lg"
                className="font-bold tracking-wide py-6 text-lg px-8 cursor-pointer transition-all duration-200 hover:bg-brand-600 active:bg-brand-selected active:scale-[0.98]"
              >
                <a href="#oferta">Zobacz Ofertę →</a>
              </Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
