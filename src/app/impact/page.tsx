import type { Metadata } from 'next';
import { ImpactClient } from './ImpactClient';

export const metadata: Metadata = {
  title: 'Our Impact',
  description:
    'See how Peerforum partners with organizations to scale peer coaching as leadership infrastructure. Featured partnership with SHRM Executive Network.',
  openGraph: {
    title: 'Our Impact | Peerforum',
    description:
      'See how Peerforum partners with organizations to scale peer coaching as leadership infrastructure. Featured partnership with SHRM Executive Network.',
    url: 'https://www.peerforum.com/impact',
    images: [
      {
        url: 'https://www.peerforum.com/og-image.png',
        width: 1200,
        height: 630,
        type: 'image/png',
        alt: 'Peerforum — Peer Coaching Groups at Scale',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['https://www.peerforum.com/og-image.png'],
  },
};

export default function ImpactPage() {
  return <ImpactClient />;
}
