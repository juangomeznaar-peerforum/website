import type { Metadata } from 'next';
import { ContactClient } from './ContactClient';

export const metadata: Metadata = {
  title: 'Talk to Us',
  description:
    'Get in touch with Peerforum to learn how we can design and run peer coaching groups for your organization.',
  openGraph: {
    title: 'Talk to Us | Peerforum',
    description:
      'Get in touch with Peerforum to learn how we can design and run peer coaching groups for your organization.',
    url: 'https://www.peerforum.com/contact',
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

export default function ContactPage() {
  return <ContactClient />;
}
