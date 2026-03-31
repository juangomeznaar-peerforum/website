export function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Peerforum',
    url: 'https://peerforum.com',
    description:
      'Full-service provider of peer coaching groups at scale for enterprise, education, and premium communities.',
    sameAs: [],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
