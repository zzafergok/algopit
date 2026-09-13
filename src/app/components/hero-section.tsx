'use client';

import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="hero-kicker">
          ALGORITHM VISUALIZATION ENGINE <span>/</span> CS ARCHITECTURE
        </p>
        <h1 id="hero-title">Karmaşık algoritmalar, net görsel deneyimler.</h1>
        <p className="hero-intro">
          Bilgisayar bilimleri kavramlarını, veri yapılarını ve optimizasyon
          tekniklerini soyut matematik formüllerinden çıkarıp interaktif, adım
          adım çalışan görsel simülasyonlara dönüştürüyoruz.
        </p>
        <div className="hero-actions">
          <Link className="button button-primary" href="/algorithms">
            Algoritmaları İncele <span aria-hidden="true">↘</span>
          </Link>
          <Link
            className="button button-secondary"
            href="/resources/documentation"
          >
            Dokümantasyon ↗
          </Link>
        </div>
      </div>
    </section>
  );
}
