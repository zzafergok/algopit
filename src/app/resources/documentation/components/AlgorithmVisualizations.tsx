import React from 'react';

export const AlgorithmVisualizations: React.FC = () => {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <h3>Algoritma Görselleştirmeleri</h3>
      <p>
        Platformdaki interaktif görselleştirmelerin nasıl kullanılacağı ve
        özelleştirileceği hakkında bilgiler.
      </p>

      <h4>Temel Özellikler</h4>
      <ul>
        <li>
          <strong>Adım Adım İlerleme:</strong> Algoritmaları her adımda ne
          yaptığını görerek anlayın
        </li>
        <li>
          <strong>Hız Kontrolü:</strong> Görselleştirmenin hızını ayarlayın
        </li>
        <li>
          <strong>Kendi Verilerinizi Girin:</strong> Algoritmaları kendi
          verilerinizle test edin
        </li>
        <li>
          <strong>Performans Metrikleri:</strong> Çalışma süresi, bellek
          kullanımı gibi metrikleri görün
        </li>
      </ul>

      <h4>Örnek Kullanım</h4>
      <p>Bir sıralama algoritması görselleştirmesi için tipik kullanım akışı:</p>
      <ol>
        <li>Algoritma sayfasını açın (ör. Bubble Sort)</li>
        <li>&quot;İnteraktif Demo&quot; bölümüne gidin</li>
        <li>
          Girdi alanına sayıları virgülle ayırarak girin (ör.
          &quot;5,3,8,1,9,4&quot;)
        </li>
        <li>&quot;Çalıştır&quot; düğmesine tıklayın</li>
        <li>
          Algoritmanın çalışmasını izleyin veya &quot;Adım Adım&quot; özelliğini
          kullanın
        </li>
        <li>Performans metriklerini inceleyin</li>
      </ol>

      <h4>Özelleştirme Seçenekleri</h4>
      <ul>
        <li>
          <strong>Rastgele Dizi:</strong> &quot;Rastgele Dizi Oluştur&quot;
          düğmesini kullanarak otomatik veri oluşturun
        </li>
        <li>
          <strong>Animasyon Hızı:</strong> Slider ile görselleştirme hızını
          ayarlayın
        </li>
        <li>
          <strong>Dizi Boyutu:</strong> Test edilecek veri miktarını belirleyin
        </li>
      </ul>
    </div>
  );
};
