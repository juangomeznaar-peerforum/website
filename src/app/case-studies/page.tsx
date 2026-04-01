import type { Metadata } from 'next';
import { CaseStudiesClient } from './CaseStudiesClient';

export const metadata: Metadata = {
  title: 'SHRM Executive Network Case Study',
  description:
    'Learn how the SHRM Executive Network built the largest, most engaged HR peer coaching community in the world using Peerforum.',
  openGraph: {
    title: 'SHRM Executive Network Case Study | Peerforum',
    description:
      'Learn how the SHRM Executive Network built the largest, most engaged HR peer coaching community in the world using Peerforum.',
    url: 'https://www.peerforum.com/case-studies',
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

export default function CaseStudiesPage() {
  return <CaseStudiesClient />;
}
