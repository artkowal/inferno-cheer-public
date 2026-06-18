import { useEffect, useRef, useState, Fragment } from 'react';

const statsData = [
  {
    number: 100,
    prefix: '',
    suffix: '%',
    label: 'Zadowolonych klientów',
    desc: 'Pierwsze lekcje już za nami, a nasi uczniowie są zachwyceni!',
  },
  {
    number: 15,
    prefix: '+',
    suffix: '',
    label: 'Lat doświadczenia',
    desc: 'Nasi instruktorzy to doświadczeni tancerze, gotowi dzielić się pasją!',
  },
  {
    number: 60,
    prefix: '+',
    suffix: '',
    label: 'Aktywnych członków',
    desc: 'Dołącz do naszej społeczności i tańcz z nami!',
  },
] as const;

function AnimatedCounter({
  end,
  prefix,
  suffix,
  isVisible,
}: {
  end: number;
  prefix: string;
  suffix: string;
  isVisible: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const DURATION = 2000;
    let startTime: number | undefined;
    let rafId: number;

    const step = (timestamp: number) => {
      startTime ??= timestamp;
      const progress = Math.min((timestamp - startTime) / DURATION, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setCount(Math.floor(eased * end));

      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [end, isVisible]);

  return <>{prefix}{count}{suffix}</>;
}

function Divider({ isVisible, delay }: { isVisible: boolean; delay: number }) {
  return (
    <div
      className={`w-16 h-px lg:w-px lg:h-20 shrink-0 bg-brand-500/30 rounded-full transition-opacity duration-700
        ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      aria-hidden="true"
      style={{ transitionDelay: `${delay}ms` }}
    />
  );
}

export function Stats() {
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
      ref={sectionRef}
      aria-label="Nasze statystyki"
      className="relative z-20 py-16 bg-background border-t border-b border-brand-500/30"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-0">

          <Divider isVisible={isVisible} delay={300} />

          {statsData.map((stat, index) => (
            <Fragment key={stat.label}>

              <div
                className={`flex flex-col items-center text-center px-8 lg:px-12 xl:px-16 transition-all duration-700 ease-out
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 will-change-transform'}`}
                style={{ transitionDelay: `${400 + index * 150}ms` }}
              >
                {/* aria-label exposes the final value to screen readers during animation */}
                <p
                  className="font-gothic text-[40px] md:text-[48px] leading-none text-brand-500"
                  aria-label={`${stat.prefix}${stat.number}${stat.suffix}`}
                >
                  <AnimatedCounter
                    end={stat.number}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    isVisible={isVisible}
                  />
                </p>

                <h3 className="mt-3 font-spartan font-bold text-[10px] md:text-xs uppercase tracking-widest text-[#A5A5A5]">
                  {stat.label}
                </h3>

                <p className="mt-2 font-sans text-[11px] md:text-xs leading-relaxed text-[#5D5D5D] max-w-[200px]">
                  {stat.desc}
                </p>
              </div>

              <Divider isVisible={isVisible} delay={550 + index * 150} />

            </Fragment>
          ))}

        </div>
      </div>
    </section>
  );
}
