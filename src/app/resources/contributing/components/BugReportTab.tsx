import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';

export const BugReportTab: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hata Raporlama</CardTitle>
        <CardDescription>
          Bulduğunuz hataları etkili bir şekilde raporlamak için kılavuzlar.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="prose dark:prose-invert max-w-none">
          <h3>Hata Raporlama Süreci</h3>
          <ol>
            <li>
              GitHub Issue bölümünü kontrol edin - belki bu hata zaten
              bildirilmiştir
            </li>
            <li>
              &quot;Bug report&quot; şablonunu kullanarak yeni bir issue
              oluşturun
            </li>
            <li>Hatanın başlığını açık ve kısa tutun</li>
            <li>
              Aşağıdaki bilgileri ekleyin:
              <ul>
                <li>Hatanın detaylı açıklaması</li>
                <li>Hatayı yeniden oluşturmak için adımlar</li>
                <li>Beklenen davranış</li>
                <li>Gerçek davranış</li>
                <li>Ekran görüntüleri (mümkünse)</li>
                <li>Kullandığınız ortam (tarayıcı, işletim sistemi)</li>
                <li>Hatanın çözümü hakkında önerileriniz (varsa)</li>
              </ul>
            </li>
          </ol>

          <h3>Örnek Hata Raporu</h3>
          <div className="bg-obsidian/60 p-4 rounded-sm font-sans">
            <p className="font-semibold">
              Başlık: Quick Sort algoritmasında büyük veri setlerinde performans
              sorunu
            </p>
            <p className="text-sm mt-2">
              <strong>Açıklama:</strong> Quick Sort algoritması 10.000&apos;den
              fazla eleman içeren dizilerde aşırı yavaş çalışıyor.
            </p>
            <p className="text-sm mt-2">
              <strong>Adımlar:</strong>
              <br />
              1. Quick Sort algoritması sayfasına gidin
              <br />
              2. Giriş alanına 15.000 elemanlı rastgele dizi oluşturun
              <br />
              3. &quot;Çalıştır&quot; düğmesine tıklayın
            </p>
            <p className="text-sm mt-2">
              <strong>Beklenen:</strong> Algoritmanın makul bir sürede (birkaç
              saniye) tamamlanması
            </p>
            <p className="text-sm mt-2">
              <strong>Gerçek:</strong> Algoritma tarayıcıyı dondurur veya 30+
              saniye sürer
            </p>
            <p className="text-sm mt-2">
              <strong>Tarayıcı:</strong> Chrome 119.0.6045.123
            </p>
            <p className="text-sm mt-2">
              <strong>İşletim Sistemi:</strong> Windows 11
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
