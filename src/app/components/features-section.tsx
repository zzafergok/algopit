'use client';

import { SectionHeading } from '@/components/common/SectionHeading';

const FEATURES = [
  {
    index: '01 / THEORY',
    title: 'Teorik Derinlik',
    description:
      'Her algoritmanın matematiksel kanıtları, zaman ve alan karmaşıklığı analizleri (Worst, Best, Average Case Big-O) ve mimari trade-off açıklamaları.',
  },
  {
    index: '02 / VISUAL',
    title: 'Adım Adım Görselleştirme',
    description:
      'Her iterasyonda dizilerin, düğümlerin ve bellek işaretçilerinin nasıl yer değiştirdiğini 60 FPS akıcı geçişlerle canlı olarak izleyin.',
  },
  {
    index: '03 / INTERACTIVE',
    title: 'İnteraktif Kontrol Odası',
    description:
      'Kendi girdi verilerinizi tanımlayın, yürütme hızını ayarlayın, tek tek adım (step-by-step) atlayın veya anlık kod vurgusunu takip edin.',
  },
];

export function FeaturesSection() {
  return (
    <section className="section" id="engine" aria-labelledby="engine-title">
      <SectionHeading
        id="engine-title"
        index="02"
        eyebrow="Öğrenme Motoru"
        title="Soyut matematiği gözle görülür hale getirin."
        description="Ezberlemek yerine algoritmanın altında yatan state dönüşümlerini ve bellek manipülasyonunu doğrudan hissedin."
      />

      <div className="features-grid">
        {FEATURES.map((feature) => (
          <div className="feature-box" key={feature.index}>
            <p className="feature-box-index">{feature.index}</p>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
