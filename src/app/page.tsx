import { Link } from '@/components/core/link';
import {
  HeroSection,
  CategoriesSection,
  FeaturesSection,
} from '@/features/home';
import { MarqueeTicker } from '@/components/common/marquee-ticker';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <MarqueeTicker />
      <CategoriesSection />
      <FeaturesSection />

      <section
        className="section"
        id="contribute"
        aria-labelledby="contribute-title"
      >
        <p className="eyebrow">03 · Açık Kaynak</p>
        <h2
          id="contribute-title"
          className="text-3xl sm:text-5xl font-semibold tracking-tight text-ink max-w-4xl"
        >
          Algoritmaları herkes için daha anlaşılır kılalım.
        </h2>
        <p className="mt-4 max-w-2xl font-mono text-xs sm:text-sm text-muted uppercase leading-relaxed">
          AlgoPit topluluk destekli bir açık kaynak platformudur. Yeni algoritma
          simülasyonları ekleyebilir, dokümantasyonu zenginleştirebilir veya
          performans iyileştirmelerine katkı sağlayabilirsiniz.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            variant="button-primary"
            href="https://github.com/zzafergok/algopit"
            target="_blank"
          >
            GitHub Deposu <span aria-hidden="true">↗</span>
          </Link>
          <Link variant="button-secondary" href="/resources/contributing">
            Katkı Rehberi
          </Link>
        </div>
      </section>
    </div>
  );
}
