import { useState, useEffect, useCallback, useRef } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export interface GalleryImage {
  thumb: string;
  full: string;
  alt: string;
}

const BATCH_SIZE = 12;

function GalleryItem({
  img,
  index,
  onOpen,
  triggerRef,
}: {
  img: GalleryImage;
  index: number;
  onOpen: (i: number) => void;
  triggerRef: (el: HTMLButtonElement | null) => void;
}) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // onLoad won't fire for cached images — check img.complete after mount
  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true);
  }, []);

  return (
    <li>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => onOpen(index)}
        className="group relative aspect-square w-full cursor-pointer overflow-hidden rounded-xl bg-zinc-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
        aria-label={`Otwórz zdjęcie: ${img.alt}`}
      >
        {!loaded && (
          <div
            className="absolute inset-0 animate-pulse rounded-xl bg-zinc-800"
            aria-hidden="true"
          />
        )}
        <img
          ref={imgRef}
          src={img.thumb}
          alt={img.alt}
          loading={index < 8 ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setLoaded(true)}
          className={`h-full w-full object-cover transition-all duration-300 group-hover:scale-105 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        />
      </button>
    </li>
  );
}

export function Gallery({ images }: { images: GalleryImage[] }) {
  const [visible, setVisible] = useState(BATCH_SIZE);
  const [selected, setSelected] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const lastSelectedRef = useRef<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  const hasMore = visible < images.length;

  // Stale closure guard for keyboard/touch handlers
  useEffect(() => {
    if (selected !== null) lastSelectedRef.current = selected;
  }, [selected]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasMore) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(v => Math.min(v + BATCH_SIZE, images.length));
      },
      { rootMargin: '300px' }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, images.length]);

  const close = useCallback(() => {
    setSelected(null);
    const idx = lastSelectedRef.current;
    if (idx !== null) requestAnimationFrame(() => triggerRefs.current[idx]?.focus());
  }, []);

  const prev = useCallback(() => {
    setSelected(i => i !== null ? (i - 1 + images.length) % images.length : null);
  }, [images.length]);

  const next = useCallback(() => {
    setSelected(i => i !== null ? (i + 1) % images.length : null);
  }, [images.length]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (selected !== null && !dialog.open) dialog.showModal();
    else if (selected === null && dialog.open) dialog.close();
  }, [selected]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    dialog.addEventListener('close', close);
    return () => dialog.removeEventListener('close', close);
  }, [close]);

  useEffect(() => {
    if (selected === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next();
      else if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selected, next, prev]);

  if (images.length === 0) {
    return (
      <div className="flex items-center justify-center py-24" role="status">
        <p className="text-sm text-zinc-500">Brak zdjęć do wyświetlenia.</p>
      </div>
    );
  }

  const current = selected !== null ? images[selected] : null;

  return (
    <>
      <ul className="grid list-none grid-cols-2 gap-2 p-0 sm:grid-cols-3 lg:grid-cols-4">
        {images.slice(0, visible).map((img, i) => (
          <GalleryItem
            key={img.thumb}
            img={img}
            index={i}
            onOpen={setSelected}
            triggerRef={el => { triggerRefs.current[i] = el; }}
          />
        ))}
      </ul>

      {hasMore && <div ref={sentinelRef} className="h-1" aria-hidden="true" />}

      {/* Lightbox */}
      <dialog
        ref={dialogRef}
        className="gallery-lightbox"
        onClick={e => { if (e.target === dialogRef.current) close(); }}
        aria-modal="true"
        aria-label={current ? current.alt : 'Podgląd zdjęcia'}
        onTouchStart={e => { touchStartX.current = e.touches[0].clientX; }}
        onTouchEnd={e => {
          if (touchStartX.current === null) return;
          const diff = touchStartX.current - e.changedTouches[0].clientX;
          if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
          touchStartX.current = null;
        }}
      >
        {current && (
          <div className="relative flex h-full w-full items-center justify-center">
            <img
              key={current.full}
              src={current.full}
              alt={current.alt}
              className="max-h-[90dvh] max-w-[90vw] rounded-lg object-contain shadow-2xl"
            />

            {/* Close */}
            <button
              type="button"
              onClick={close}
              className="absolute right-4 top-4 flex min-h-[44px] min-w-[44px] cursor-pointer items-center justify-center rounded-full bg-black/50 p-2 text-white/70 transition-colors hover:bg-black/75 hover:text-white focus-visible:outline-2 focus-visible:outline-white"
              aria-label="Zamknij podgląd"
            >
              <X size={20} aria-hidden="true" />
            </button>

            {images.length > 1 && (
              <>
                {/* Prev */}
                <button
                  type="button"
                  onClick={prev}
                  className="absolute left-4 top-1/2 flex min-h-[44px] min-w-[44px] -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/50 p-3 text-white/70 transition-colors hover:bg-black/75 hover:text-white focus-visible:outline-2 focus-visible:outline-white"
                  aria-label="Poprzednie zdjęcie"
                >
                  <ChevronLeft size={20} aria-hidden="true" />
                </button>

                {/* Next */}
                <button
                  type="button"
                  onClick={next}
                  className="absolute right-4 top-1/2 flex min-h-[44px] min-w-[44px] -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/50 p-3 text-white/70 transition-colors hover:bg-black/75 hover:text-white focus-visible:outline-2 focus-visible:outline-white"
                  aria-label="Następne zdjęcie"
                >
                  <ChevronRight size={20} aria-hidden="true" />
                </button>

                {/* Counter */}
                <p
                  className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-black/40 px-3 py-1 text-sm tabular-nums text-white/60"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  {selected! + 1} / {images.length}
                </p>
              </>
            )}
          </div>
        )}
      </dialog>
    </>
  );
}
