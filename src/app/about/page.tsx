import type { Metadata } from 'next';
import { AboutClient } from './AboutClient';

export const metadata: Metadata = {
  title: 'About Peerforum',
  description:
    'Peerforum was built to solve the profound isolation of leadership by delivering collective intelligence and togetherness at scale.',
  openGraph: {
    title: 'About Peerforum',
    description:
      'Peerforum was built to solve the profound isolation of leadership by delivering collective intelligence and togetherness at scale.',
    url: 'https://www.peerforum.com/about',
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

export default function AboutPage() {
  return <AboutClient />;
}
