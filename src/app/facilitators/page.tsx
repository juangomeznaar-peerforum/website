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
    url: 'https://peerforum.com/facilitators',
  },
};

export default function FacilitatorsPage() {
  return <FacilitatorsClient />;
}
