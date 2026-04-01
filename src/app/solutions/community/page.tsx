import type { Metadata } from 'next';
import { CommunityClient } from './CommunityClient';

export const metadata: Metadata = {
  title: 'For Premium Communities',
  description:
    'Turn passive networks into high-value ecosystems using facilitated peer forums.',
  openGraph: {
    title: 'For Premium Communities | Peerforum',
    description: 'Turn passive networks into high-value ecosystems using facilitated peer forums.',
    url: 'https://www.peerforum.com/solutions/community',
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

export default function CommunityPage() {
  return <CommunityClient />;
}
