import type { Metadata, Viewport } from 'next';
import { UISizeProvider } from '@/context/ui-size-provider';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import {
  SITE_URL,
  SITE_NAME,
  SITE_DEFAULT_DESCRIPTION,
  getWebSiteSchema,
  getOrganizationSchema,
} from '@/lib/seo';
import { JsonLd } from '@/components/common/json-ld';

import '@/styles/globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Algoritmalar & İnteraktif Görselleştirme`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DEFAULT_DESCRIPTION,
  keywords: [
    'algoritmalar',
    'veri yapıları',
    'interaktif görselleştirme',
    'sıralama algoritmaları',
    'graf algoritmaları',
    'dinamik programlama',
    'bilgisayar bilimleri',
    'kod örnekleri',
    'yazılım mülakat hazırlık',
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: `${SITE_NAME} | Algoritmalar & İnteraktif Görselleştirme`,
    description: SITE_DEFAULT_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: 'tr_TR',
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} - Algoritmalar & İnteraktif Görselleştirme`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} | Algoritmalar & İnteraktif Görselleştirme`,
    description: SITE_DEFAULT_DESCRIPTION,
    images: [`${SITE_URL}/og-image.png`],
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
  icons: { icon: '/favicon.ico' },
};

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#070908',
  width: 'device-width',
  initialScale: 1,
};

const uiSizeScript = `
(() => {
  try {
    const storedSize = window.localStorage.getItem('algopit-ui-size');
    const nextSize = storedSize === 'current' ? 'medium' : storedSize;
    const allowedSizes = new Set(['small', 'medium', 'large']);
    const resolvedSize = allowedSizes.has(nextSize) ? nextSize : 'medium';

    window.localStorage.setItem('algopit-ui-size', resolvedSize);
    document.documentElement.dataset.uiSize = resolvedSize;
  } catch {
    document.documentElement.dataset.uiSize = 'medium';
  }
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="tr"
      className="dark"
      data-ui-size="medium"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: uiSizeScript }} />
        <JsonLd data={[getWebSiteSchema(), getOrganizationSchema()]} />
      </head>
      <body>
        <a className="skip-link" href="#main-content">
          İçeriğe atla
        </a>
        <UISizeProvider>
          <div className="site-frame flex min-h-screen flex-col">
            <Navbar />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </UISizeProvider>
      </body>
    </html>
  );
}
