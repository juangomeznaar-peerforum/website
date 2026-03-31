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
    url: 'https://peerforum.com/solutions/enterprise',
  },
};

export default function EnterprisePage() {
  return <EnterpriseClient />;
}
