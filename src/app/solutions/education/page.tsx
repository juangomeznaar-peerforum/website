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
    url: 'https://peerforum.com/solutions/education',
  },
};

export default function EducationPage() {
  return <EducationClient />;
}
