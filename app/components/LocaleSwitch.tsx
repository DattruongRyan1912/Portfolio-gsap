'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { LOCALE_COOKIE, locales, type Locale } from '../content';

/** Remembers the choice for a year and updates the document language right away. */
function saveLocale(next: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
  document.documentElement.lang = next;
}

export function LocaleSwitch({ locale, label }: { locale: Locale; label: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const choose = (next: Locale) => {
    if (next === locale) return;
    saveLocale(next);
    startTransition(() => router.refresh());
  };

  return (
    <div className="locale-switch" role="group" aria-label={label} aria-busy={pending}>
      {locales.map((item) => (
        <button
          key={item}
          type="button"
          aria-pressed={item === locale}
          onClick={() => choose(item)}
        >
          {item.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
