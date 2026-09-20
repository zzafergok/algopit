import type { Metadata } from 'next';
import {
  SITE_URL,
  SITE_NAME,
  PageMetadataOptions,
  AlgorithmMetadataOptions,
} from './types';

export function createPageMetadata({
  title,
  description,
  path,
  keywords = [],
  openGraphType = 'website',
  image = '/opengraph-image',
}: PageMetadataOptions): Metadata {
  const cleanTitle = title.replace(/\s*\|\s*AlgoPit\s*$/i, '').trim();
  const canonicalUrl = `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
  const imageUrl = image.startsWith('http') ? image : `${SITE_URL}${image}`;

  const baseKeywords = [
    'algoritmalar',
    'veri yapıları',
    'algoritma görselleştirme',
    'kod örnekleri',
    'bilgisayar mühendisliği',
    'yazılım geliştirme',
  ];

  const mergedKeywords = Array.from(new Set([...baseKeywords, ...keywords]));

  return {
    title: cleanTitle,
    description,
    keywords: mergedKeywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${cleanTitle} | ${SITE_NAME}`,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      locale: 'tr_TR',
      type: openGraphType,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${cleanTitle} - ${SITE_NAME}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${cleanTitle} | ${SITE_NAME}`,
      description,
      images: [imageUrl],
      creator: '@algopit',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export function createAlgorithmMetadata({
  title,
  description,
  path,
  category,
  difficulty,
  keywords = [],
}: AlgorithmMetadataOptions): Metadata {
  const algoKeywords = [
    category,
    `${title} algoritması`,
    `${title} time complexity`,
    `${title} visualizer`,
    'adım adım simülasyon',
    ...(difficulty ? [`${difficulty} seviye`] : []),
    ...keywords,
  ];

  return createPageMetadata({
    title,
    description,
    path,
    keywords: algoKeywords,
    openGraphType: 'article',
  });
}
