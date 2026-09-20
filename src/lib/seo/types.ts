export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://algopit.dev';
export const SITE_NAME = 'AlgoPit';
export const SITE_DEFAULT_DESCRIPTION =
  'Karmaşık algoritmaları, veri yapılarını ve optimizasyon tekniklerini adım adım görselleştiren etkileşimli platform.';

export interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  openGraphType?: 'website' | 'article';
  image?: string;
}

export interface AlgorithmMetadataOptions {
  title: string;
  description: string;
  path: string;
  category: string;
  difficulty?: string;
  keywords?: string[];
}

export interface AlgorithmSchemaOptions {
  name: string;
  description: string;
  category: string;
  categoryHref: string;
  path: string;
  difficulty?: string;
  timeComplexity?: { best?: string; average?: string; worst?: string } | string;
  spaceComplexity?: string;
}
