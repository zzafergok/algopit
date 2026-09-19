import type { Metadata, Viewport } from 'next';
import { UISizeProvider } from '@/context/ui-size-provider';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

import '@/styles/globals.css';

export const metadata: Metadata = {
  title: {
    default: 'AlgoPit | Algoritmalar & İnteraktif Görselleştirme',
    template: '%s | AlgoPit',
  },
  description:
    'Karmaşık algoritmaları, veri yapılarını ve optimizasyon tekniklerini adım adım görselleştiren etkileşimli platform.',
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
