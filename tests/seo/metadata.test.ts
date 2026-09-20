import { describe, expect, it } from 'vitest';
import { createPageMetadata } from '@/lib/seo/metadata';
import { SITE_URL } from '@/lib/seo/types';

describe('createPageMetadata', () => {
  it('uses the dynamic Open Graph image route by default', () => {
    const metadata = createPageMetadata({
      title: 'Örnek Sayfa',
      description: 'Test açıklaması',
      path: '/ornek',
    });

    expect(metadata.openGraph).toMatchObject({
      images: [{ url: `${SITE_URL}/opengraph-image` }],
    });
    expect(metadata.twitter).toMatchObject({
      images: [`${SITE_URL}/opengraph-image`],
    });
  });
});
