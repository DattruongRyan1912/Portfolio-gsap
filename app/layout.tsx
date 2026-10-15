import type { Metadata } from 'next';
import { Be_Vietnam_Pro, Bricolage_Grotesque, JetBrains_Mono } from 'next/font/google';
import { SiteHeader } from './components/SiteHeader';
import { siteCopy } from './content';
import { getLocale } from './locale';
import './globals.css';

const display = Bricolage_Grotesque({
  variable: '--font-display',
  subsets: ['latin', 'vietnamese'],
  weight: ['500', '700', '800'],
});

const body = Be_Vietnam_Pro({
  variable: '--font-body',
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700'],
});

const mono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500'],
});

const siteUrl = process.env.SITE_URL ?? 'https://portfolio.truongquocdat.id.vn';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const { meta } = siteCopy[locale];
  return {
    metadataBase: new URL(siteUrl),
    title: { default: meta.title, template: '%s · Dat Truong' },
    description: meta.description,
    authors: [{ name: 'Dat Truong (Ryan)' }],
    creator: 'Dat Truong (Ryan)',
    icons: { icon: '/ryan-avatar.jpg', apple: '/ryan-avatar.jpg' },
    openGraph: {
      type: 'website',
      locale: locale === 'vi' ? 'vi_VN' : 'en_US',
      alternateLocale: locale === 'vi' ? 'en_US' : 'vi_VN',
      title: meta.title,
      description: meta.description,
      siteName: 'Dat Truong',
      images: [{ url: '/og.png', width: 1672, height: 941, alt: meta.title }],
    },
    twitter: { card: 'summary_large_image', title: meta.title, description: meta.description, images: ['/og.png'] },
    robots: { index: true, follow: true },
  };
}

// Runs before first paint: opt into entrance animations only when the visitor allows motion.
const motionScript = `try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('motion')}catch(e){}`;

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale();
  const copy = siteCopy[locale];
  return (
    <html lang={locale} className={`${display.variable} ${body.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionScript }} />
      </head>
      <body>
        <a className="skip-link" href="#main">
          {copy.common.skip}
        </a>
        <SiteHeader copy={copy} locale={locale} />
        {children}
        <footer className="site-footer">
          <span>{copy.footer}</span>
          <span>© {new Date().getFullYear()}</span>
        </footer>
      </body>
    </html>
  );
}
