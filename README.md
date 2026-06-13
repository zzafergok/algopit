# AlgoPit - İnteraktif Algoritma Öğrenme Platformu

<div  align="center"> <img  src="https://img.shields.io/badge/Next.js-14.1.4-black?style=flat-square&logo=next.js"  alt="Next.js"> <img  src="https://img.shields.io/badge/TypeScript-5.4.3-blue?style=flat-square&logo=typescript"  alt="TypeScript"> <img  src="https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat-square&logo=react"  alt="React"> <img  src="https://img.shields.io/badge/TailwindCSS-3.4.17-38B2AC?style=flat-square&logo=tailwind-css"  alt="Tailwind CSS"> <img  src="https://img.shields.io/badge/License-MIT-green?style=flat-square"  alt="License"> </div> <p  align="center"> <strong>Algoritmaları görsel olarak öğrenin, anlayın ve uygulayın</strong> </p>

## 🎯 Proje Hakkında

AlgoPit, algoritmaları ve veri yapılarını interaktif bir şekilde öğrenmenizi sağlayan kapsamlı bir eğitim platformudur. Platform, karmaşık algoritma kavramlarını görsel açıklamalar, adım adım görselleştirmeler ve pratik kod örnekleriyle basit hale getirir.

### 🌟 Temel Özellikler

**İnteraktif Görselleştirmeler**: Her algoritmanın çalışma mantığını adım adım takip edebileceğiniz dinamik animasyonlar

**Kapsamlı İçerik Kütüphanesi**: 15+ kategori ve 50+ algoritma ile geniş bir öğrenme yelpazesi

**Çoklu Dil Desteği**: JavaScript, Python ve Java dillerinde detaylı kod implementasyonları

**Performans Analizi**: Zaman ve alan karmaşıklığı analizleri ile algoritma performansının derinlemesine incelenmesi

**Responsive Tasarım**: Masaüstü ve mobil cihazlarda kusursuz çalışan modern arayüz

**Tema Desteği**: Kullanıcı tercihlerine göre açık ve koyu tema seçenekleri

## 📚 Algoritma Kategorileri

### Sıralama Algoritmaları

Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, Quick Sort, Heap Sort, Counting Sort ve Radix Sort implementasyonları

### Arama Algoritmaları

Linear Search ve Binary Search algoritmaları ile arama teknikleri

### Graf Algoritmaları

Breadth-First Search (BFS), Depth-First Search (DFS), Dijkstra'nın En Kısa Yol Algoritması ve Bellman-Ford algoritması

### Veri Yapıları

Linked List, Stack, Queue, Binary Search Tree ve Hash Table veri yapıları ve işlemleri

### Dinamik Programlama

Fibonacci Serisi, Knapsack Problem ve Longest Common Subsequence çözümleri

### Geri İzleme Algoritmaları

N-Queens Problem ve Subset Sum Problem çözümleri

### Açgözlü Algoritmalar

Fractional Knapsack ve Huffman Coding algoritmaları

### Metin İşleme Algoritmaları

Rabin-Karp ve Knuth-Morris-Pratt (KMP) string arama algoritmaları

### Matematiksel Algoritmalar

Euclidean Algorithm (GCD) ve Sieve of Eratosthenes asal sayı algoritması

### Optimizasyon Algoritmaları

Simulated Annealing ve Genetic Algorithms meta-sezgisel yöntemler

### İleri Seviye Algoritmalar

Floyd's Cycle-Finding ve Topological Sort algoritmaları

## 🛠️ Teknoloji Yığını

### Frontend Framework

**Next.js 14.1.4** - App Router ile modern React uygulaması geliştirme

### Tip Güvenliği

**TypeScript 5.4.3** - Güçlü tip kontrolü ve geliştirici deneyimi

### Styling ve UI

**Tailwind CSS 3.4.17** - Utility-first CSS framework **Radix UI** - Erişilebilir ve özelleştirilebilir UI bileşenleri **Lucide React** - Modern ve tutarlı ikon kütüphanesi

### Animasyon

**Framer Motion 12.10.5** - Performanslı ve esnek animasyon kütüphanesi

### Tema Yönetimi

**next-themes 0.3.0** - Dinamik tema değiştirme desteği

### Geliştirme Araçları

**ESLint** - Kod kalitesi kontrolü **Prettier** - Otomatik kod formatlaması **Jest** - Unit test framework

## 🚀 Kurulum ve Çalıştırma

### Sistem Gereksinimleri

Node.js 18.0 veya üzeri sürüm gereklidir

### Yerel Geliştirme Ortamı

```bash
# Repository'yi klonlayın
git  clone  https://github.com/zzafergok/algopit.git

# Proje dizinine geçin
cd  AlgoPit

# Bağımlılıkları yükleyin
npm  install
# veya yarn install
# veya pnpm install

# Geliştirme sunucusunu başlatın
npm  run  dev
# veya yarn dev
# veya pnpm dev
```

Uygulama başarıyla başlatıldıktan sonra [http://localhost:3000](http://localhost:3000/) adresinden erişebilirsiniz.

### Production Build

```bash
# Production build oluşturun
npm  run  build

# Production sunucusunu başlatın
npm  run  start
```

## 📁 Proje Yapısı

```
AlgoPit/

├── public/ # Statik dosyalar

│ └── assets/ # Görsel ve medya dosyaları

├── src/

│ ├── app/ # Next.js App Router sayfaları

│ │ ├── algorithms/ # Algoritma kategori sayfaları

│ │ ├── resources/ # Kaynak ve dokümantasyon sayfaları

│ │ ├── about/ # Hakkında sayfası

│ │ ├── layout.tsx # Root layout bileşeni

│ │ └── page.tsx # Ana sayfa

│ ├── components/ # React bileşenleri

│ │ ├── common/ # Ortak kullanılan bileşenler

│ │ ├── layout/ # Layout bileşenleri

│ │ ├── theme/ # Tema yönetimi bileşenleri

│ │ └── ui/ # Temel UI bileşenleri

│ ├── context/ # React Context tanımlamaları

│ │ └── theme-provider.tsx

│ ├── lib/ # Yardımcı fonksiyonlar ve algoritma implementasyonları

│ │ ├── algorithms/ # Algoritma implementasyonları

│ │ ├── complexity-analysis.ts

│ │ └── utils.ts # Genel yardımcı fonksiyonlar

│ └── styles/ # Global stil tanımlamaları

│ └── globals.css

├── .gitignore # Git ignore kuralları

├── next.config.js # Next.js konfigürasyonu

├── package.json # Proje bağımlılıkları ve scriptler

├── postcss.config.js # PostCSS konfigürasyonu

├── tailwind.config.js # Tailwind CSS konfigürasyonu

├── tsconfig.json # TypeScript konfigürasyonu

└── README.md # Proje dokümantasyonu
```

## 🎨 Bileşen Mimarisi

### UI Bileşenleri

Radix UI temelinde oluşturulmuş, tutarlı ve erişilebilir bileşen kütüphanesi

### Layout Bileşenleri

Responsive navigation, footer ve sidebar bileşenleri

### Algorithm Bileşenleri

Görselleştirme, açıklama ve interaktif demo bileşenleri

### Common Bileşenleri

CodeBlock, InteractiveDemo, AlgorithmExplanation ve UnderConstruction bileşenleri

## 🧪 Test ve Kalite Kontrol

```bash
# Unit testleri çalıştırın
npm  run  test

# Linting kontrolü
npm  run  lint

# Kod formatlama
npm  run  format
```

## 📖 Kullanım Kılavuzu

### Algoritma Görselleştirmeleri

Her algoritma sayfasında bulunan interaktif demo bölümünden kendi verilerinizi girerek algoritmanın çalışmasını gözlemleyebilirsiniz

### Kod İnceleme

Algoritmaların JavaScript, Python ve Java implementasyonlarını inceleyerek farklı dillerdeki uygulama farklarını öğrenebilirsiniz

### Performans Analizi

Her algoritmanın zaman ve alan karmaşıklığı detayları ile algoritma seçimi konusunda bilinçli kararlar verebilirsiniz

### Karşılaştırmalı Öğrenme

Benzer kategorideki algoritmaları karşılaştırarak hangisinin hangi durumlarda daha uygun olduğunu anlayabilirsiniz

## 🤝 Katkıda Bulunma

Projeye katkıda bulunmak için aşağıdaki adımları izleyebilirsiniz:

### Katkı Süreci

1.  **Repository'yi Fork Edin**: GitHub'da projeyi kendi hesabınıza fork edin

2.  **Feature Branch Oluşturun**:

```bash
git checkout -b feature/yeni-ozellik-adi
```

3.  **Değişikliklerinizi Yapın**: Kod standartlarına uygun şekilde geliştirme yapın

4.  **Testleri Çalıştırın**: Değişikliklerinizin mevcut fonksiyonaliteyi bozmadığından emin olun

5.  **Commit Edin**: Açıklayıcı commit mesajları ile değişikliklerinizi commit edin

```bash
git commit -m "feat: yeni algoritma eklendi"
```

6.  **Push Edin**: Branch'inizi remote repository'ye push edin

```bash
git push origin feature/yeni-ozellik-adi
```

7.  **Pull Request Oluşturun**: GitHub üzerinden pull request açın

### Katkı Alanları

**Yeni Algoritmalar**: Eksik algoritmaların implementasyonu ve görselleştirilmesi
**Dokümantasyon**: Algoritma açıklamalarının iyileştirilmesi ve yeni içerik eklenmesi
**UI/UX İyileştirmeleri**: Kullanıcı deneyiminin geliştirilmesi
**Performance Optimizasyonu**: Uygulamanın performansının artırılması
**Bug Fixes**: Mevcut hataların düzeltilmesi

### Kod Standartları

TypeScript kullanımında strict mode tercih edilir ve tüm bileşenler için proper typing yapılmalıdır. ESLint ve Prettier konfigürasyonlarına uygun kod yazımı beklenir. Bileşen isimlendirmelerinde PascalCase, fonksiyon isimlendirmelerinde camelCase kullanılmalıdır.

## 📞 İletişim ve Destek

**Proje Geliştirici**: [gok.zaferr@gmail.com](mailto:gok.zaferr@gmail.com)

**GitHub Issues**: [Yeni issue oluşturun](https://github.com/zzafergok/algopit/issues)

**Dokümantasyon**: [Detaylı dokümantasyon](https://www.algopit.wiki/resources/documentation)

## 🎯 Gelecek Hedefler

**Çoklu Dil Desteği**: Arayüz çevirilerinin eklenmesi

**Kullanıcı Profilleri**: İlerleme takibi ve kişiselleştirme özellikleri

**API Entegrasyonu**: Algoritma performans karşılaştırmaları için backend servis geliştirme

---

<div  align="center">**AlgoPit ile algoritma öğrenmenin keyfini çıkarın! 🚀**</div>
