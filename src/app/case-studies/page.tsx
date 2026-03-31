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
    url: 'https://peerforum.com/case-studies',
  },
};

export default function CaseStudiesPage() {
  return <CaseStudiesClient />;
}
