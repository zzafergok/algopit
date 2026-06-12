import { ThemeProvider } from '@/context/theme-provider';
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="tr"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body
        className="flex min-h-screen flex-col bg-void-black font-mono text-sm text-titanium antialiased"
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="flex-1 container mx-auto py-8 px-4">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
