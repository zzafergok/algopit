import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';

export const DocumentationTab: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Dokümantasyon Standartları</CardTitle>
        <CardDescription>
          İyi belgelenmiş kod ve özellikler, projenin herkes tarafından
          anlaşılabilir olmasını sağlar.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="prose dark:prose-invert max-w-none">
          <h3>Kod Belgelendirmesi</h3>
          <ul>
            <li>
              Tüm sınıflar, arayüzler ve fonksiyonlar için JSDoc yorumları ekleyin
            </li>
            <li>Parametre ve dönüş değerlerini detaylı olarak açıklayın</li>
            <li>Karmaşık algoritmaların çalışma prensiplerini açıklayın</li>
            <li>
              Edge case&apos;leri ve varsayımları belgelemek için yorum ekleyin
            </li>
          </ul>

          <h3>Algoritma Dokümantasyonu</h3>
          <p>
            Yeni bir algoritma eklerken, aşağıdaki bilgileri içeren bir
            dokümantasyon oluşturun:
          </p>
          <ul>
            <li>Algoritmanın adı ve kısa açıklaması</li>
            <li>
              Zaman ve alan karmaşıklığı analizleri (en iyi, ortalama ve en kötü
              durum)
            </li>
            <li>Algoritmanın avantajları ve dezavantajları</li>
            <li>Gerçek hayat uygulama örnekleri</li>
            <li>Pseudo kod veya akış şeması</li>
            <li>İmplementasyon notları</li>
          </ul>

          <h3>README ve Wiki</h3>
          <p>
            Önemli değişiklikler yaptığınızda, README.md dosyasını da
            güncellemeyi unutmayın. Yeni eklenen özellikler için wiki sayfaları
            oluşturmayı düşünün.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
