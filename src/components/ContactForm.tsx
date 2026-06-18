import { useState } from 'react';

type Errors = { name?: string; email?: string };

const inputClass = "w-full px-5 py-4 rounded-xl bg-zinc-900 border text-white placeholder:text-zinc-600 focus:outline-none transition-colors";
const inputValid = "border-zinc-800 focus:border-zinc-600";
const inputError = "border-red-500 focus:border-red-500";

const labelClass = "block mb-2 font-spartan font-semibold text-xs tracking-widest uppercase text-zinc-300";

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Errors>({});

  const validate = (formData: FormData): Errors => {
    const errs: Errors = {};
    const name = (formData.get('name') as string).trim();
    const email = (formData.get('email') as string).trim();
    if (!name) errs.name = 'Imię i nazwisko jest wymagane.';
    if (!email) errs.email = 'Adres e-mail jest wymagany.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Podaj poprawny adres e-mail.';
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const errs = validate(formData);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus('loading');

    formData.append('access_key', import.meta.env.PUBLIC_WEB3FORMS_KEY);
    formData.append('replyto', formData.get('email') as string);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section
      aria-labelledby="contact-form-heading"
      className="relative z-20 py-20 lg:py-24 border-t border-brand-500/30 bg-zinc-950/50"
    >
      <div className="container mx-auto px-4 max-w-3xl">

        {/* Header */}
        <div className="mb-10 text-center">
          <p className="mb-3 font-spartan font-semibold text-xs tracking-widest uppercase text-brand-500">
            Dołącz do nas
          </p>
          <h2
            id="contact-form-heading"
            className="font-spartan font-bold text-3xl lg:text-4xl text-foreground mb-4 tracking-tight"
          >
            Zostaw <span className="text-brand-500">Wiadomość!</span>
          </h2>
          <p className="font-sans text-sm sm:text-base text-zinc-400 leading-relaxed">
            Napisz do nas — chętnie odpowiemy na każde pytanie dotyczące zajęć, harmonogramu i zapisów.
          </p>
        </div>

        {/* Success state */}
        {status === 'success' ? (
          <div
            role="status"
            aria-live="polite"
            className="p-8 rounded-2xl bg-green-500/10 border border-green-500 animate-in fade-in zoom-in duration-500"
          >
            <h3 className="text-xl font-spartan font-bold text-green-400 mb-2">Dziękujemy!</h3>
            <p className="text-zinc-300">Twoja wiadomość została wysłana. Skontaktujemy się z Tobą najszybciej jak to możliwe.</p>
            <button
              onClick={() => setStatus('idle')}
              className="mt-4 text-sm text-zinc-500 hover:text-zinc-300 underline underline-offset-4 transition-colors"
            >
              Wyślij kolejną wiadomość
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">

            {/* Honeypot + hidden fields */}
            <input type="checkbox" name="botcheck" className="hidden" aria-hidden="true" tabIndex={-1} />
            <input type="hidden" name="subject" value="Inferno Cheer Elite - Nowa wiadomość" />

            {/* Name */}
            <div>
              <label htmlFor="contact-name" className={labelClass}>
                Imię i nazwisko <span aria-hidden="true" className="text-brand-500">*</span>
              </label>
              <input
                id="contact-name"
                type="text"
                name="name"
                placeholder="Jan Kowalski"
                autoComplete="name"
                enterKeyHint="next"
                aria-required="true"
                aria-describedby={errors.name ? 'error-name' : undefined}
                onChange={() => errors.name && setErrors(e => ({ ...e, name: undefined }))}
                className={`${inputClass} ${errors.name ? inputError : inputValid}`}
              />
              {errors.name && (
                <p id="error-name" role="alert" className="mt-1.5 text-xs text-red-500 pl-1">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="contact-email" className={labelClass}>
                Adres e-mail <span aria-hidden="true" className="text-brand-500">*</span>
              </label>
              <input
                id="contact-email"
                type="email"
                name="email"
                placeholder="jan@kowalski.pl"
                autoComplete="email"
                inputMode="email"
                enterKeyHint="next"
                aria-required="true"
                aria-describedby={errors.email ? 'error-email' : undefined}
                onChange={() => errors.email && setErrors(e => ({ ...e, email: undefined }))}
                className={`${inputClass} ${errors.email ? inputError : inputValid}`}
              />
              {errors.email && (
                <p id="error-email" role="alert" className="mt-1.5 text-xs text-red-500 pl-1">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="contact-phone" className={labelClass}>
                Numer telefonu
                <span className="ml-2 text-zinc-600 normal-case tracking-normal font-normal">(opcjonalnie)</span>
              </label>
              <input
                id="contact-phone"
                type="tel"
                name="phone"
                placeholder="+48 000 000 000"
                autoComplete="tel"
                inputMode="tel"
                enterKeyHint="next"
                className={`${inputClass} ${inputValid}`}
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="contact-message" className={labelClass}>
                Wiadomość
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                placeholder="Napisz do nas..."
                autoComplete="off"
                enterKeyHint="send"
                className={`${inputClass} ${inputValid} resize-y min-h-[150px]`}
              />
            </div>

            {/* Submit error */}
            {status === 'error' && (
              <p role="alert" className="text-red-500 text-sm">
                Wystąpił błąd podczas wysyłania. Spróbuj ponownie później.
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-4 rounded-xl bg-brand-500 text-white font-spartan font-bold text-lg hover:bg-brand-600 hover:shadow-[0_0_20px_rgba(217,10,20,0.4)] transition-all disabled:opacity-70 disabled:cursor-not-allowed mt-2"
            >
              {status === 'loading' ? 'Wysyłanie...' : 'Wyślij wiadomość'}
            </button>

          </form>
        )}

      </div>
    </section>
  );
}
