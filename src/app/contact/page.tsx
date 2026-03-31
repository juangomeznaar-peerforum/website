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
    url: 'https://peerforum.com/contact',
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
