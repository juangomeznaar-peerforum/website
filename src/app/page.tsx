import type { Metadata } from 'next';
import { HomeClient } from './HomeClient';

export const metadata: Metadata = {
  title: 'Scale Peer Coaching Groups',
  description:
    'Peerforum designs, operates, and runs high-end peer coaching groups for enterprise, education, and premium communities.',
  openGraph: {
    title: 'Scale Peer Coaching Groups | Peerforum',
    description:
      'Peerforum designs, operates, and runs high-end peer coaching groups for enterprise, education, and premium communities.',
    url: 'https://www.peerforum.com',
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

export default function HomePage() {
  return <HomeClient />;
}
