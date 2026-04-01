import type { Metadata } from 'next';
import { EducationClient } from './EducationClient';

export const metadata: Metadata = {
  title: 'For Executive Education',
  description:
    'Extend the lifecycle of executive education programs with 1-year continuity forums.',
  openGraph: {
    title: 'For Executive Education | Peerforum',
    description:
      'Extend the lifecycle of executive education programs with 1-year continuity forums.',
    url: 'https://www.peerforum.com/solutions/education',
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

export default function EducationPage() {
  return <EducationClient />;
}
