import React from 'react';

export const GettingStarted: React.FC = () => {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <h3>AlgoPit&apos;e Hoş Geldiniz</h3>
      <p>
        AlgoPit, algoritmaları interaktif bir şekilde öğrenmenize yardımcı olan
        kapsamlı bir eğitim platformudur. Bu belgede, platformun temel
        özelliklerini ve nasıl kullanılacağını öğreneceksiniz.
      </p>

      <h4>Platformun Ana Özellikleri</h4>
      <ul>
        <li>
          <strong>İnteraktif Görselleştirmeler:</strong> Algoritmaların çalışma
          mantığını adım adım görselleştirme
        </li>
        <li>
          <strong>Kod Örnekleri:</strong> Farklı programlama dillerinde
          (JavaScript, Python, Java) örnekler
        </li>
        <li>
          <strong>Canlı Demo:</strong> Kendi verilerinizle algoritmaları test
          etme imkanı
        </li>
        <li>
          <strong>Detaylı Açıklamalar:</strong> Her algoritmanın karmaşıklık
          analizi ve kullanım alanları
        </li>
      </ul>

      <h4>Navigasyon</h4>
      <p>
        Ana menüden farklı algoritma kategorilerine erişebilirsiniz. Her
        algoritma sayfasında genellikle şu bölümler bulunur:
      </p>
      <ul>
        <li>Teorik açıklama ve karmaşıklık analizi</li>
        <li>İnteraktif demo ve görselleştirme</li>
        <li>Kod örnekleri</li>
        <li>Gerçek hayat uygulamaları</li>
      </ul>
    </div>
  );
};
