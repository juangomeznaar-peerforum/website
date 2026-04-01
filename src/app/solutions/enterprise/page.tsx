import type { Metadata } from 'next';
import { EnterpriseClient } from './EnterpriseClient';

export const metadata: Metadata = {
  title: 'Enterprise Peer Coaching',
  description:
    'Embed facilitated peer coaching groups directly into enterprise leadership programs.',
  openGraph: {
    title: 'Enterprise Peer Coaching | Peerforum',
    description:
      'Embed facilitated peer coaching groups directly into enterprise leadership programs.',
    url: 'https://www.peerforum.com/solutions/enterprise',
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

export default function EnterprisePage() {
  return <EnterpriseClient />;
}
