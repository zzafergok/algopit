import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { CodeBlock } from '@/components/common/code-block';

export const CodeStandardsTab: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Kod Standartları</CardTitle>
        <CardDescription>
          Kodunuzun proje standartlarına uygun olduğundan emin olun.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="prose dark:prose-invert max-w-none">
          <h3>Stil Rehberi</h3>
          <ul>
            <li>ESLint ve Prettier yapılandırmalarına uygun kod yazın</li>
            <li>Değişkenler ve fonksiyonlar için anlamlı isimler kullanın</li>
            <li>
              Her fonksiyon ve karmaşık kod bloğu için açıklayıcı yorumlar ekleyin
            </li>
            <li>Her dosya başına tekli bir sorumluluk ilkesini uygulayın</li>
          </ul>

          <h3>TypeScript</h3>
          <ul>
            <li>Tüm fonksiyonlar ve bileşenler için doğru tipleri kullanın</li>
            <li>
              Tür genellemesini uygun yerlerde kullanın (örn. jenerik fonksiyonlar)
            </li>
            <li>
              <code>any</code> kullanımından kaçının
            </li>
            <li>Açık dönüş tiplerini belirtin</li>
          </ul>

          <h3>React Bileşenleri</h3>
          <ul>
            <li>
              Bileşenleri mümkün olduğunca küçük ve yeniden kullanılabilir tutun
            </li>
            <li>Karmaşık durum yönetimi için React Hooks kullanın</li>
            <li>Prop drilling yerine context kullanmayı tercih edin</li>
            <li>Tüm prop&apos;lar için TypeScript arayüzleri oluşturun</li>
          </ul>

          <h3>Performans</h3>
          <ul>
            <li>
              Gereksiz yeniden render&apos;ları önlemek için memo, useMemo ve
              useCallback kullanın
            </li>
            <li>Büyük listeleri görselleştirirken sanal listeler tercih edin</li>
            <li>Yoğun işlemleri web worker&apos;lara taşıyın</li>
          </ul>
        </div>

        <div className="bg-obsidian/60 p-4 rounded-sm">
          <h4 className="text-sm font-medium mb-2">Örnek Kod Stili</h4>
          <CodeBlock
            code={`// Kötü
function sort(a) {
  // Sıralama işlemi
  return a.sort();
}

// İyi
/**
 * Bir diziyi sıralar
 * @param {Array<number>} array Sıralanacak dizi
 * @returns {Array<number>} Sıralanmış dizi
 */
function sortArray<T extends number>(array: T[]): T[] {
  // Giriş doğrulama
  if (!Array.isArray(array)) {
    throw new Error('Input must be an array');
  }
  
  // Sıralama işlemi (orijinal diziyi değiştirmemek için kopyasını oluşturuyoruz)
  return [...array].sort((a, b) => a - b);
}`}
            language="typescript"
          />
        </div>
      </CardContent>
    </Card>
  );
};
