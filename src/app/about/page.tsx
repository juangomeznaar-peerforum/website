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
    url: 'https://peerforum.com/about',
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
