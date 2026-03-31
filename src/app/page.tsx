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
    url: 'https://peerforum.com',
  },
};

export default function HomePage() {
  return <HomeClient />;
}
