import React from 'react';
import { FAQItem } from '../types';

export const usageFaqs: FAQItem[] = [
  {
    id: 'usage-1',
    question: 'Algoritma görselleştirmelerini nasıl kullanabilirim?',
    answer: (
      <div>
        <p>Algoritma görselleştirmelerini kullanmak için:</p>
        <ol className="list-decimal pl-5 mt-2 space-y-1">
          <li>İlgilendiğiniz algoritmanın sayfasına gidin</li>
          <li>İnteraktif demo bölümünü bulun</li>
          <li>Kendi verilerinizi girin veya rastgele veri oluşturun</li>
          <li>
            &quot;Çalıştır&quot; düğmesine tıklayın ve algoritmanın çalışmasını
            izleyin
          </li>
          <li>
            Adım adım ilerlemek için &quot;İleri&quot; ve &quot;Geri&quot;
            düğmelerini kullanabilirsiniz
          </li>
          <li>
            Algoritmanın performans metriklerini görmek için çalışma
            tamamlandıktan sonra &quot;Performans&quot; sekmesine bakın
          </li>
        </ol>
      </div>
    ),
    category: 'usage',
    tags: ['görselleştirme', 'demo', 'kullanım'],
  },
  {
    id: 'usage-2',
    question: 'Algoritmaların kodlarını kendi projemde kullanabilir miyim?',
    answer: (
      <p>
        Evet, tüm algoritma implementasyonları MIT lisansı altında
        sunulmaktadır, bu da kodları kendi projelerinizde özgürce
        kullanabileceğiniz anlamına gelir. Ancak, kodları kullanırken
        projenizde AlgoPit&apos;e atıfta bulunmanız takdir edilir, ancak zorunlu
        değildir. Kodları kullanmadan önce, üretim ortamında kullanım için
        optimize edilmemiş olabileceklerini ve ek testlere ihtiyaç
        duyabileceğinizi unutmayın.
      </p>
    ),
    category: 'usage',
    tags: ['lisans', 'kod kullanımı'],
  },
  {
    id: 'usage-3',
    question: 'Büyük veri setlerini nasıl test edebilirim?',
    answer: (
      <div>
        <p>Büyük veri setleriyle algoritma performansını test etmek için:</p>
        <ol className="list-decimal pl-5 mt-2 space-y-1">
          <li>
            İlgili algoritma sayfasında &quot;İnteraktif Demo&quot; bölümüne
            gidin
          </li>
          <li>
            &quot;Rastgele Dizi Oluştur&quot; özelliğini kullanın ve boyut
            parametresini artırın (ör. 1000 eleman)
          </li>
          <li>
            Çok büyük veri setleri için (10.000+ eleman), animasyonları devre
            dışı bırakmak isteyebilirsiniz
          </li>
          <li>
            Performans metriklerinde çalışma süresi, bellek kullanımı ve diğer
            ölçümleri görebilirsiniz
          </li>
        </ol>
        <p className="mt-2">
          Not: Çok büyük veri setleri tarayıcınızın performansını etkileyebilir.
          Tarayıcı tabanlı bir uygulama olduğu için, milyonlarca elemanlı veri
          setleri için uygun olmayabilir.
        </p>
      </div>
    ),
    category: 'usage',
    tags: ['büyük veri', 'performans', 'test'],
  },
];
