import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { siteConfig } from "@/config/site.ts";
import { Menu } from 'lucide-react';
import { FaFacebook, FaInstagram, FaPhone } from 'react-icons/fa6';

const navLinks = [
  { name: 'Strona Główna', href: '/' },
  { name: 'Poznaj Nas', href: '/#o-nas' },
  { name: 'Oferta Zajęć', href: '/#oferta' },
  { name: 'Kontakt', href: '/#kontakt' },
  { name: 'Galeria', href: '/galeria' },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [activeSection, setActiveSection] = useState('/');

  useEffect(() => {
    const pathname = window.location.pathname;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      if (pathname !== '/') return;
      const sections = document.querySelectorAll("section[id]");
      let current = "/";
      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop <= window.innerHeight / 2) {
          current = "/#" + section.getAttribute("id");
        }
      });
      if (window.scrollY < 100) current = "/";
      setActiveSection(current);
    };

    if (pathname !== '/') {
      setActiveSection(pathname);
    }

    handleScroll();
    const timeoutId = setTimeout(() => setIsMounted(true), 100);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  const transitionClass = isMounted ? 'transition-all duration-300 ease-in-out' : '';

  return (
    <>
      <div className="h-28 w-full" aria-hidden="true" />

      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full border-b border-border/40 ${transitionClass} ${
          isScrolled
            ? 'h-16 bg-background/95 backdrop-blur-md shadow-md'
            : 'h-28 bg-background'
        }`}
      >
        <div className="container mx-auto flex h-full items-center px-4 lg:px-8">

          {/* LOGO */}
          <a href="/" className="flex items-center shrink-0" aria-label="Inferno Cheer Elite – strona główna">
            <img
              src="/favicon.svg"
              alt=""
              width="72"
              height="72"
              className={`object-contain ${transitionClass} ${isScrolled ? 'h-10' : 'h-16'}`}
            />
          </a>

          <div className="hidden lg:flex items-center ml-auto gap-x-8">
            <nav className="flex items-center gap-x-8 xl:gap-x-12">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`group relative text-base font-semibold transition-colors ${
                      isActive ? 'text-foreground' : 'text-zinc-400 hover:text-brand-500'
                    }`}
                  >
                    {link.name}
                    <span
                      className={`absolute -bottom-2 left-0 h-0.5 w-full origin-center bg-brand-500 transition-transform duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
                        isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </a>
                );
              })}
            </nav>

            <div className="flex items-center gap-x-6 border-l border-border/60 pl-8">
              <div className="flex items-center gap-x-4">
                <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook Inferno Cheer Elite" className="text-zinc-400 hover:text-brand-500 transition-colors cursor-pointer">
                  <FaFacebook className="h-6 w-6" aria-hidden="true" />
                </a>
                <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram Inferno Cheer Elite" className="text-zinc-400 hover:text-brand-500 transition-colors cursor-pointer">
                  <FaInstagram className="h-6 w-6" aria-hidden="true" />
                </a>
              </div>

              <a
                href={siteConfig.contact.phoneHref}
                className="inline-flex items-center gap-2.5 bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm px-5 py-2.5 rounded-lg shadow-lg shadow-brand-500/20 transition-colors"
              >
                <FaPhone className="size-4 shrink-0" aria-hidden="true" />
                <span className="translate-y-0.5">Zadzwoń do nas!</span>
              </a>
            </div>
          </div>

          {/* MOBILE NAV BAR */}
          <div className="flex items-center gap-x-3 ml-auto lg:hidden">
            <a
              href={siteConfig.contact.phoneHref}
              className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm px-4 py-2.5 rounded-lg shadow-lg shadow-brand-500/20 transition-colors"
            >
              <FaPhone className="size-4 shrink-0" aria-hidden="true" />
              <span>Zadzwoń do nas!</span>
            </a>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-foreground h-11 w-11" aria-label="Otwórz menu nawigacji">
                  <Menu className={isScrolled ? 'h-6 w-6' : 'h-7 w-7'} aria-hidden="true" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-80 flex flex-col bg-background border-border p-0">
                <div className="flex flex-col gap-y-4 pt-20 px-8 flex-1">
                  {navLinks.map((link) => {
                    const isActive = activeSection === link.href;
                    return (
                      <a
                        key={link.name}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`text-xl font-bold transition-colors py-2 border-b border-border/10 ${
                          isActive ? 'text-brand-500' : 'text-foreground'
                        }`}
                      >
                        {link.name}
                      </a>
                    );
                  })}
                </div>

                <div className="bg-zinc-900/50 border-t border-border/40 p-8 flex justify-center gap-x-12">
                  <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Odwiedź nas na Facebooku" className="flex flex-col items-center gap-y-2 text-zinc-400 hover:text-brand-500 transition-colors cursor-pointer min-w-[44px]">
                    <FaFacebook className="h-9 w-9" aria-hidden="true" />
                    <span className="text-[10px] uppercase tracking-tighter font-bold" aria-hidden="true">Facebook</span>
                  </a>
                  <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Odwiedź nas na Instagramie" className="flex flex-col items-center gap-y-2 text-zinc-400 hover:text-brand-500 transition-colors cursor-pointer min-w-[44px]">
                    <FaInstagram className="h-9 w-9" aria-hidden="true" />
                    <span className="text-[10px] uppercase tracking-tighter font-bold" aria-hidden="true">Instagram</span>
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>

        </div>
      </header>
    </>
  );
}
