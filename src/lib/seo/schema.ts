import {
  SITE_URL,
  SITE_NAME,
  SITE_DEFAULT_DESCRIPTION,
  AlgorithmSchemaOptions,
} from './types';

export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DEFAULT_DESCRIPTION,
    inLanguage: 'tr-TR',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/algorithms?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.ico`,
    description: SITE_DEFAULT_DESCRIPTION,
    sameAs: ['https://github.com/zzafergok/algopit'],
  };
}

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

export function getAlgorithmSchema({
  name,
  description,
  category,
  categoryHref,
  path,
  difficulty,
  timeComplexity,
  spaceComplexity,
}: AlgorithmSchemaOptions) {
  const url = `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
  const tc =
    typeof timeComplexity === 'string'
      ? timeComplexity
      : timeComplexity
        ? `Ortalama: ${timeComplexity.average || '-'}, En Kötü: ${timeComplexity.worst || '-'}`
        : undefined;

  return {
    '@context': 'https://schema.org',
    '@type': ['TechArticle', 'SoftwareApplication'],
    name: `${name} Algoritması`,
    headline: `${name} Algoritması: Çalışma Mantığı ve İnteraktif Görselleştirme`,
    description,
    inLanguage: 'tr-TR',
    mainEntityOfPage: url,
    url,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    educationalLevel: difficulty,
    about: {
      '@type': 'Thing',
      name: category,
    },
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    ...(tc || spaceComplexity
      ? {
          additionalProperty: [
            ...(tc
              ? [
                  {
                    '@type': 'PropertyValue',
                    name: 'Time Complexity',
                    value: tc,
                  },
                ]
              : []),
            ...(spaceComplexity
              ? [
                  {
                    '@type': 'PropertyValue',
                    name: 'Space Complexity',
                    value: spaceComplexity,
                  },
                ]
              : []),
          ],
        }
      : {}),
    breadcrumb: getBreadcrumbSchema([
      { name: 'Ana Sayfa', url: '/' },
      { name: 'Algoritmalar', url: '/algorithms' },
      { name: category, url: categoryHref },
      { name, url: path },
    ]),
  };
}

export function getCategorySchema({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  const url = `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${name} - Algoritmalar`,
    headline: `${name} Kütüphanesi`,
    description,
    url,
    inLanguage: 'tr-TR',
    breadcrumb: getBreadcrumbSchema([
      { name: 'Ana Sayfa', url: '/' },
      { name: 'Algoritmalar', url: '/algorithms' },
      { name, url: path },
    ]),
  };
}

export function getFaqSchema(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}
