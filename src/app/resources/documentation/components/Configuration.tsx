import React from 'react';

export const Configuration: React.FC = () => {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <h3>Konfigürasyon ve Ayarlar</h3>
      <p>
        AlgoPit&apos;i tercihlerinize göre özelleştirmek için çeşitli ayarlar ve
        konfigürasyon seçenekleri bulunmaktadır.
      </p>

      <h4>Tema Ayarları</h4>
      <p>
        Platform, hem açık hem de koyu tema desteği sunar. Tema değiştirmek için:
      </p>
      <ul>
        <li>Sağ üst köşedeki tema geçiş düğmesini kullanın</li>
        <li>Sistem temasını kullanmak için otomatik temayı seçin</li>
      </ul>

      <h4>Görselleştirme Ayarları</h4>
      <p>
        Algoritma görselleştirmelerini özelleştirmek için her demo sayfasında
        bulunan ayar seçeneklerini kullanabilirsiniz:
      </p>
      <ul>
        <li>
          <strong>Animasyon Hızı:</strong> Slider ile görselleştirme hızını
          ayarlayın
        </li>
        <li>
          <strong>Veri Boyutu:</strong> Test edilecek veri miktarını belirleyin
        </li>
        <li>
          <strong>Renk Şeması:</strong> Görselleştirmelerde kullanılan renkleri
          özelleştirin
        </li>
        <li>
          <strong>Adım Adım Modu:</strong> Algoritmanın her adımını manuel
          olarak ilerletin
        </li>
      </ul>

      <h4>Performans Ayarları</h4>
      <p>
        Büyük veri setleriyle çalışırken, performansı optimize etmek için
        çeşitli ayarlar bulunur:
      </p>
      <ul>
        <li>
          <strong>Animasyon Optimizasyonu:</strong> Büyük veri setlerinde
          animasyonları devre dışı bırakın
        </li>
        <li>
          <strong>Veri Kümeleme:</strong> Büyük veri setlerini görselleştirirken
          veri noktalarını gruplandırın
        </li>
        <li>
          <strong>Görselleştirme Detayı:</strong> Performans için detay
          seviyesini azaltın
        </li>
      </ul>
    </div>
  );
};
