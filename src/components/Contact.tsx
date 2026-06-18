import { useEffect, useRef, useState } from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { FaFacebook, FaInstagram } from 'react-icons/fa6';

export function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasConsent, setHasConsent] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const checkConsent = () => {
      setHasConsent(localStorage.getItem('cookie-consent') === 'accepted');
    };
    checkConsent();
    window.addEventListener('cookie-consent-updated', checkConsent);
    return () => window.removeEventListener('cookie-consent-updated', checkConsent);
  }, []);

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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="kontakt"
      ref={sectionRef}
      aria-labelledby="contact-heading"
      className="relative z-20 py-20 lg:py-32 bg-background border-t border-brand-500/30 overflow-hidden"
    >
      <div className="container mx-auto px-4 max-w-7xl">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          <div className={`flex flex-col transition-all duration-1000 ease-out will-change-transform ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>

            <h2 id="contact-heading" className="font-spartan font-bold text-4xl lg:text-5xl text-foreground mb-6 tracking-tight text-left">
              Bądźmy w <span className="text-brand-500">Kontakcie</span>
            </h2>
            
            <p className="font-sans text-sm sm:text-base text-zinc-400 leading-relaxed mb-10 text-left">
              Jesteśmy tutaj, aby odpowiedzieć na wszystkie Twoje wątpliwości dotyczące zajęć, grafiku czy zapisów. Napisz do nas, zadzwoń albo odwiedź nas na miejscu – razem znajdziemy dla Ciebie najlepszy program zajęć.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <a
                href={siteConfig.contact.phoneHref}
                className="group flex flex-col items-center sm:items-start p-6 rounded-2xl bg-zinc-950/50 border border-border/40 hover:border-brand-500/50 hover:bg-zinc-950 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-brand-500/10 flex items-center justify-center mb-4 group-hover:bg-brand-500 transition-colors">
                  <Phone className="w-5 h-5 text-brand-500 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-spartan font-semibold text-lg text-foreground mb-1">Telefon</h3>
                <p className="text-sm text-zinc-400 mb-1">Masz pytania?</p>
                <p className="font-medium text-brand-500">{siteConfig.contact.phone}</p>
              </a>

              <a
                href={siteConfig.contact.emailHref}
                className="group flex flex-col items-center sm:items-start p-6 rounded-2xl bg-zinc-950/50 border border-border/40 hover:border-brand-500/50 hover:bg-zinc-950 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-brand-500/10 flex items-center justify-center mb-4 group-hover:bg-brand-500 transition-colors">
                  <Mail className="w-5 h-5 text-brand-500 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-spartan font-semibold text-lg text-foreground mb-1">E-mail</h3>
                <p className="text-sm text-zinc-400 mb-1">Napisz do nas:</p>
                <p className="font-medium text-brand-500 transition-colors break-all">{siteConfig.contact.email}</p>
              </a>

              <a
                href={siteConfig.contact.address.mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center sm:items-start p-6 rounded-2xl bg-zinc-950/50 border border-border/40 hover:border-brand-500/50 hover:bg-zinc-950 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-brand-500/10 flex items-center justify-center mb-4 group-hover:bg-brand-500 transition-colors">
                  <MapPin className="w-5 h-5 text-brand-500 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-spartan font-semibold text-lg text-foreground mb-1">Lokalizacja</h3>
                <p className="text-sm text-zinc-400 mb-1">Gdzie możesz nas znaleźć?</p>
                <p className="font-medium text-brand-500 text-left">{siteConfig.contact.address.street} | {siteConfig.contact.address.city}</p>
              </a>

              <div className="flex flex-col items-center sm:items-start p-6 rounded-2xl bg-zinc-950/50 border border-border/40">
                <div className="w-10 h-10 rounded-full bg-brand-500/10 flex items-center justify-center mb-4">
                  <FaFacebook className="w-5 h-5 text-brand-500" />
                </div>
                <h3 className="font-spartan font-semibold text-lg text-foreground mb-3">Social Media</h3>

                <div className="flex items-center gap-4">
                  <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook Inferno Cheer Elite" className="text-zinc-400 hover:text-brand-500 transition-colors cursor-pointer">
                    <FaFacebook className="w-6 h-6" aria-hidden="true" />
                  </a>
                  <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram Inferno Cheer Elite" className="text-zinc-400 hover:text-brand-500 transition-colors cursor-pointer">
                    <FaInstagram className="w-6 h-6" aria-hidden="true" />
                  </a>
                </div>
              </div>

            </div>
          </div>

          <div className={`w-full h-100 lg:h-full min-h-100 rounded-2xl overflow-hidden shadow-xl shadow-black/50 border border-border/40 transition-all duration-1000 ease-out delay-300 will-change-transform ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            {hasConsent ? (
              <iframe
                src="https://maps.google.com/maps?q=Inferno%20Cheer%20Elite,%20Tarn%C3%B3w&t=&z=16&ie=UTF8&iwloc=&output=embed&hl=pl"
                className="w-full h-full"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(100%)' }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Wizytówka Inferno Cheer Elite w Google Maps"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-5 bg-zinc-950 p-8 text-center">
                <MapPin className="w-8 h-8 text-brand-500" aria-hidden="true" />
                <div>
                  <p className="text-sm text-zinc-300 font-semibold mb-1">
                    {siteConfig.contact.address.full}
                  </p>
                  <p className="text-xs text-zinc-500">
                    Zaakceptuj ciasteczka, aby wyświetlić mapę.
                  </p>
                </div>
                <a
                  href={siteConfig.contact.address.mapsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-brand-500 hover:text-brand-400 transition-colors"
                >
                  Otwórz w Google Maps →
                </a>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}