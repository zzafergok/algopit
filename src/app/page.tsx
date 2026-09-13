'use client';

import React from 'react';
import Link from 'next/link';
import { HeroSection } from './components/hero-section';
import { MarqueeTicker } from '@/components/common/MarqueeTicker';
import { CategoriesSection } from './components/categories-section';
import { FeaturesSection } from './components/features-section';

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
          <a
            className="button button-primary"
            href="https://github.com/zzafergok/algopit"
            target="_blank"
            rel="noreferrer"
          >
            GitHub Deposu <span aria-hidden="true">↗</span>
          </a>
          <Link
            className="button button-secondary"
            href="/resources/contributing"
          >
            Katkı Rehberi
          </Link>
        </div>
      </section>
    </div>
  );
}
