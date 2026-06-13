import { ThemeProvider } from '@/context/theme-provider';
import { UISizeProvider } from '@/context/ui-size-provider';
import { JetBrains_Mono, Space_Grotesk } from 'next/font/google';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

import '@/styles/globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin-ext'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin-ext'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata = {
  title: 'Algoritmalar İnteraktif Öğrenme Platformu',
  description:
    'Algoritmaları öğrenmek ve pratik yapmak için interaktif platform',
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
    <html lang="tr" data-ui-size="medium" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: uiSizeScript }} />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} flex min-h-screen flex-col bg-void-black font-mono text-sm text-titanium antialiased`}
      >
        <ThemeProvider>
          <UISizeProvider>
            <Navbar />
            <main className="container mx-auto flex-1 px-4 py-8">
              {children}
            </main>
            <Footer />
          </UISizeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
