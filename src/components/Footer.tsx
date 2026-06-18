import { MapPin, Phone, Mail } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { FaFacebook, FaInstagram } from 'react-icons/fa6';
import logoImage from '../assets/images/inferno-cheer-elite-tarnow-logotyp-napis.webp';


export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-950 border-t border-brand-500/30 pt-16 relative z-20">
      
      <div className="container mx-auto px-4 lg:px-8 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8">

          <div className="md:col-span-12 lg:col-span-5 flex flex-col items-center text-center md:items-start md:text-left">
            <img
              src={logoImage.src}
              width={logoImage.width}
              height={logoImage.height}
              alt="Inferno Cheer Elite – logotyp szkoły tańca i cheerleadingu w Tarnowie"
              className="mb-8 w-52 lg:w-64"
              loading="lazy"
              decoding="async"
            />
            <p className="text-zinc-400 text-sm leading-relaxed mb-8 max-w-md">
              W naszej szkole nie tylko uczysz się tańca, ale także stajesz się częścią przyjaznej społeczności, która motywuje i inspiruje. Dołącz do nas i rozpocznij swoją taneczną podróż już dziś!
            </p>
            <div className="flex items-center  gap-4">
              <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook Inferno Cheer Elite" className="text-zinc-400 hover:text-brand-500 transition-colors cursor-pointer"><FaFacebook className="w-6 h-6" aria-hidden="true" /></a>
              <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram Inferno Cheer Elite" className="text-zinc-400 hover:text-brand-500 transition-colors cursor-pointer"><FaInstagram className="w-6 h-6" aria-hidden="true" /></a>
            </div>
          </div>

          <div className="md:col-span-6 lg:col-span-3 lg:col-start-7 flex flex-col items-center text-center md:items-start md:text-left">
            <h4 className="font-spartan font-bold text-lg text-foreground mb-6">Na skróty</h4>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li><a href="/" className="hover:text-brand-500 transition-colors">Strona Główna</a></li>
              <li><a href="/#o-nas" className="hover:text-brand-500 transition-colors">Poznaj Nas</a></li>
              <li><a href="/#oferta" className="hover:text-brand-500 transition-colors">Oferta Zajęć</a></li>
              <li><a href="/#kontakt" className="hover:text-brand-500 transition-colors">Kontakt</a></li>
              <li><a href="/galeria" className="hover:text-brand-500 transition-colors">Galeria</a></li>
              <li><a href="/polityka-prywatnosci" className="hover:text-brand-500 transition-colors">Polityka Prywatności</a></li>
            </ul>
          </div>

          <div className="md:col-span-6 lg:col-span-3 flex flex-col items-center text-center md:items-start md:text-left">
            <h4 className="font-spartan font-bold text-lg text-brand-500 mb-6">Kontakt</h4>
            <ul className="space-y-4 text-sm text-zinc-400">
              <li className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-brand-500 shrink-0" />
                <a href={siteConfig.contact.address.mapsHref} target="_blank" rel="noopener noreferrer" className="hover:text-brand-500 transition-colors">{siteConfig.contact.address.full}</a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-brand-500 shrink-0" />
                <a href={siteConfig.contact.phoneHref} className="hover:text-brand-500 transition-colors">{siteConfig.contact.phone}</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-brand-500 shrink-0" />
                <a href={siteConfig.contact.emailHref} className="hover:text-brand-500 transition-colors">{siteConfig.contact.email}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-border/40 py-6">
        <div className="container mx-auto px-4 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-zinc-500 text-center sm:text-left">
            &copy; {currentYear} Inferno Cheer Elite. Wszelkie prawa zastrzeżone.
          </p>
          <p className="text-[10px] text-zinc-600 uppercase tracking-widest font-semibold opacity-60 hover:opacity-100 transition-opacity text-center sm:text-right">
            <span>Developed by <span className="text-zinc-400 font-bold">ART.KOWAL</span></span>
            <span className="hidden sm:inline mx-2 text-zinc-700" aria-hidden="true">&amp;</span>
            <br className="sm:hidden" />
            <span>Designed by <span className="text-zinc-400 font-bold">Daniel Mróz</span></span>
          </p>
        </div>
      </div>
    </footer>
  );
}