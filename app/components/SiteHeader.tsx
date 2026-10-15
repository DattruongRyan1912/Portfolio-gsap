import Link from 'next/link';
import type { Locale, SiteCopy } from '../content';
import { LocaleSwitch } from './LocaleSwitch';

export function SiteHeader({ copy, locale }: { copy: SiteCopy; locale: Locale }) {
  return (
    <header className="site-header" data-header>
      <Link className="brand" href="/" prefetch={false} aria-label="Dat Truong — home">
        <span className="brand-mark" aria-hidden="true">
          DT
        </span>
        <span className="brand-name">Dat Truong</span>
      </Link>
      <nav className="site-nav" aria-label="Primary">
        <Link href="/#projects" prefetch={false}>{copy.nav.projects}</Link>
        <Link href="/#stack" prefetch={false}>{copy.nav.stack}</Link>
        <Link href="/#infrastructure" prefetch={false}>{copy.nav.infra}</Link>
        <Link href="/#contact" prefetch={false}>{copy.nav.contact}</Link>
      </nav>
      <LocaleSwitch locale={locale} label={copy.nav.language} />
    </header>
  );
}
