import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';

export const FeatureRequestTab: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Özellik Önerileri</CardTitle>
        <CardDescription>
          Yeni özellik önerilerinde bulunmak için rehber.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="prose dark:prose-invert max-w-none">
          <h3>Özellik Önerisi Süreci</h3>
          <ol>
            <li>
              GitHub Issues sayfasını kontrol edin - belki benzer bir öneri
              zaten mevcuttur
            </li>
            <li>
              &quot;Feature request&quot; şablonunu kullanarak yeni bir issue
              oluşturun
            </li>
            <li>Özelliği açık ve anlaşılır bir şekilde tanımlayın</li>
            <li>
              Aşağıdaki bilgileri ekleyin:
              <ul>
                <li>Özellik açıklaması</li>
                <li>
                  Bu özelliğin hangi sorunu çözeceği veya nasıl kullanışlı
                  olacağı
                </li>
                <li>Alternatif çözümler</li>
                <li>Örnek kullanım senaryoları</li>
                <li>
                  Varsa, benzer özelliklere sahip diğer projelerden referanslar
                </li>
              </ul>
            </li>
          </ol>

          <p>
            Bir özellik önerirken, projenin genel amacına ve kapsamına uygun
            olmasına dikkat edin. Önerdiğiniz özelliği kendinizin uygulamaya
            istekli olup olmadığınızı belirtin.
          </p>

          <h3>Öneri Sonrası</h3>
          <p>Öneriniz proje yöneticileri tarafından incelendikten sonra:</p>
          <ul>
            <li>Kabul edilebilir</li>
            <li>Daha fazla tartışma gerektirebilir</li>
            <li>Kapsamın dışında olduğu için reddedilebilir</li>
            <li>Zaten planlanmış olabilir</li>
          </ul>
          <p>
            Her durumda, projedeki herkesin zamanına saygı göstermek ve yapıcı
            bir diyalog sürdürmek önemlidir.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
