import { useState, useEffect } from 'react';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShowBanner(false);
    window.dispatchEvent(new Event('cookie-consent-updated'));

    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        'analytics_storage': 'granted',
        'ad_storage': 'granted'
      });
    }
  };

  if (!showBanner) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Zgoda na ciasteczka"
      className="fixed bottom-4 left-4 right-4 z-[500] sm:bottom-6 sm:left-auto sm:right-6 sm:max-w-sm"
    >
      <div className="bg-zinc-900 border border-border/50 p-6 rounded-2xl shadow-2xl">
        <h4 className="font-spartan font-bold text-white mb-2">Ciasteczka? <span aria-hidden="true">🍪</span></h4>
        <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
          Używamy ich, aby zrozumieć, jak poruszasz się po naszej stronie Inferno. Dzięki temu możemy ją ulepszać. Klikając "Zgoda", pomagasz nam się rozwijać!{' '}
          <a href="/polityka-prywatnosci" className="underline underline-offset-2 hover:text-zinc-200 transition-colors">
            Polityka prywatności
          </a>
        </p>
        <div className="flex gap-3">
          <button 
            onClick={acceptCookies}
            className="flex-1 py-2 bg-brand-500 hover:bg-brand-600 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
          >
            Zgoda
          </button>
          <button
            onClick={() => setShowBanner(false)}
            className="flex-1 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-bold rounded-lg transition-colors cursor-pointer"
          >
            Odrzuć
          </button>
        </div>
      </div>
    </div>
  );
}