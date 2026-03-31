import type { Metadata } from 'next';
import { CommunityClient } from './CommunityClient';

export const metadata: Metadata = {
  title: 'For Premium Communities',
  description:
    'Turn passive networks into high-value ecosystems using facilitated peer forums.',
  openGraph: {
    title: 'For Premium Communities | Peerforum',
    description: 'Turn passive networks into high-value ecosystems using facilitated peer forums.',
    url: 'https://peerforum.com/solutions/community',
  },
};

export default function CommunityPage() {
  return <CommunityClient />;
}
