import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Dat Truong (Ryan) — Backend Developer',
    template: '%s · Dat Truong',
  },
  description:
    'Backend Developer with 2 years of experience building reliable APIs and production-ready systems.',
  keywords: [
    'Dat Truong',
    'Ryan Truong',
    'Backend Developer',
    'Go',
    'NestJS',
    'PostgreSQL',
    'MongoDB',
    'DevOps',
  ],
  authors: [{ name: 'Dat Truong (Ryan)' }],
  creator: 'Dat Truong (Ryan)',
  category: 'technology',
  icons: {
    icon: '/ryan-avatar.jpg',
    apple: '/ryan-avatar.jpg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'vi_VN',
    title: 'Dat Truong — Backend Developer',
    description:
      'Reliable APIs. Production-ready systems. Built with clarity and care.',
    siteName: 'Dat Truong — Backend Developer',
    images: [
      {
        url: '/og.png',
        width: 1672,
        height: 941,
        alt: 'Dat Truong — Backend Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dat Truong — Backend Developer',
    description:
      'Reliable APIs. Production-ready systems. Built with clarity and care.',
    images: ['/og.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
