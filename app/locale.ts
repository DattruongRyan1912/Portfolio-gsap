import { cookies, headers } from 'next/headers';
import { LOCALE_COOKIE, isLocale, type Locale } from './content';

/** The visitor's language: the saved choice, otherwise Vietnamese when the browser prefers it, otherwise English. */
export async function getLocale(): Promise<Locale> {
  const saved = (await cookies()).get(LOCALE_COOKIE)?.value;
  if (isLocale(saved)) return saved;
  const accepted = (await headers()).get('accept-language') ?? '';
  return /^\s*vi\b/i.test(accepted) ? 'vi' : 'en';
}
