import { describe, expect, it } from 'vitest';
import sitemap from '@/app/sitemap';
import { remainingAlgorithmContents } from '@/lib/remaining-algorithm-content';
import { SITE_URL } from '@/lib/seo/types';

describe('sitemap', () => {
  it('indexes every remaining algorithm by its content slug', () => {
    const urls = new Set(sitemap().map(({ url }) => url));

    for (const [slug, item] of Object.entries(remainingAlgorithmContents)) {
      expect(urls).toContain(`${SITE_URL}${item.categoryHref}/${slug}`);
    }
  });

  it('does not use visualizer kinds as page slugs', () => {
    const urls = new Set(sitemap().map(({ url }) => url));

    expect(urls).not.toContain(
      `${SITE_URL}/algorithms/string-algorithms/string-search`,
    );
    expect(urls).not.toContain(
      `${SITE_URL}/algorithms/data-structures/operations`,
    );
  });
});
