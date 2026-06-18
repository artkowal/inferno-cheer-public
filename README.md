# Inferno Cheer Elite — Landing Page

Strona internetowa dla **Inferno Cheer Elite** — szkoły cheerleadingu i tańca w Tarnowie.

Zbudowana w oparciu o [Astro](https://astro.build) z komponentami React (shadcn/ui), stylowana Tailwind CSS v4.

**Strona:** [infernocheerelite.pl](https://www.infernocheerelite.pl)

## Figma

[Projekt UI — Figma](https://www.figma.com/design/ec69AbODnMRwxCGB9NxwVV/Page1?node-id=0-1&p=f&t=4w0gdoPkbOtu2AzE-0)

## Struktura projektu

```
/
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   └── inferno-cheer-elite-tarnow-og.jpg   # OG image
│
├── gallery-source/                           # oryginalne zdjęcia (niekomitowane)
├── scripts/
│   └── compress-gallery.mjs                 # kompresja zdjęć do src/assets/gallery/
│
├── src/
│   ├── assets/
│   │   ├── gallery/                         # zdjęcia galerii (webp, zoptymalizowane)
│   │   └── images/                          # pozostałe grafiki strony
│   │
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Offer.tsx
│   │   ├── Stats.tsx
│   │   ├── Gallery.tsx
│   │   ├── Contact.tsx
│   │   ├── ContactForm.tsx
│   │   ├── Footer.tsx
│   │   ├── CookieBanner.tsx
│   │   └── ui/                              # komponenty shadcn/ui
│   │       ├── button.tsx
│   │       └── sheet.tsx
│   │
│   ├── config/
│   │   └── site.ts                          # dane kontaktowe, social media, URL strony
│   │
│   ├── content/
│   │   └── polityka-prywatnosci.md
│   │
│   ├── layouts/
│   │   └── Layout.astro                     # bazowy layout (meta, GA, schema.org)
│   │
│   ├── lib/
│   │   └── utils.ts
│   │
│   ├── pages/
│   │   ├── index.astro
│   │   ├── galeria.astro
│   │   ├── polityka-prywatnosci.astro
│   │   └── 404.astro
│   │
│   └── styles/
│       └── global.css
│
├── .env                                     # zmienne środowiskowe (niekomitowane)
├── .env.example                             # szablon zmiennych środowiskowych
├── astro.config.mjs
└── package.json
```

## Zmienne środowiskowe

Przed uruchomieniem skopiuj `.env.example` do `.env` i uzupełnij wartości:

```bash
cp .env.example .env
```

| Zmienna                  | Opis                                              |
| :----------------------- | :------------------------------------------------ |
| `PUBLIC_WEB3FORMS_KEY`   | Klucz dostępu do Web3Forms (formularz kontaktowy) |
| `PUBLIC_GA_MEASUREMENT_ID` | Google Analytics Measurement ID (`G-XXXXXXXXXX`) |

## Uruchomienie

```bash
# instalacja zależności
npm install

# serwer deweloperski (localhost:4321)
npm run dev

# build produkcyjny
npm run build

# podgląd buildu lokalnie
npm run preview
```

### Galeria — kompresja zdjęć

Oryginalne zdjęcia umieszcza się w `gallery-source/`. Skrypt kompresuje je do formatu webp i zapisuje w `src/assets/gallery/`:

```bash
npm run compress-gallery
```

## Stos technologiczny

| Technologia | Rola |
| :---------- | :--- |
| [Astro 5](https://astro.build) | Framework (SSG) |
| [React 19](https://react.dev) | Komponenty interaktywne |
| [Tailwind CSS v4](https://tailwindcss.com) | Stylowanie |
| [shadcn/ui](https://ui.shadcn.com) | Biblioteka komponentów UI |
| [Web3Forms](https://web3forms.com) | Backend formularza kontaktowego |
| [Google Analytics 4](https://analytics.google.com) | Analityka |
