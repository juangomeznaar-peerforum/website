import type { Metadata } from 'next';
import { FacilitatorsClient } from './FacilitatorsClient';

export const metadata: Metadata = {
  title: 'Top 1% Facilitators',
  description:
    'Peerforum curates the top 1% of executive coaches and behavioral experts in the world to guide your peer groups.',
  openGraph: {
    title: 'Top 1% Facilitators | Peerforum',
    description:
      'Peerforum curates the top 1% of executive coaches and behavioral experts in the world to guide your peer groups.',
    url: 'https://www.peerforum.com/facilitators',
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

export default function FacilitatorsPage() {
  return <FacilitatorsClient />;
}
