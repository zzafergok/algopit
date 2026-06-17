import React from 'react';
import {
  Cpu,
  Zap,
  Code2,
  Users,
  Layers,
  Target,
  Rocket,
  BookOpen,
  GitBranch,
  BrainCircuit,
  GraduationCap,
} from 'lucide-react';

export interface PlatformFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface PlatformStat {
  value: string;
  label: string;
}

export interface LearningStep {
  step: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface HowItWorksItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export const platformFeatures: PlatformFeature[] = [
  {
    icon: <Code2 className="h-6 w-6" />,
    title: 'Görsel Öğrenme',
    description:
      'Her algoritmanın adım adım görselleştirilmesi ile karmaşık konseptleri kolayca anlayın.',
  },
  {
    icon: <Layers className="h-6 w-6" />,
    title: 'Kapsamlı İçerik',
    description:
      '14 kategori ve 95 algoritma ile programlama temellerinizi güçlendirin.',
  },
  {
    icon: <Target className="h-6 w-6" />,
    title: 'Pratik Odaklı',
    description:
      'Teoriyi pratiğe dökün, kendi verilerinizle algoritmaları test edin.',
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: 'Herkes İçin',
    description:
      'Yeni başlayanlardan ileri seviye geliştiricilere, herkes için tasarlandı.',
  },
];

export const platformStats: PlatformStat[] = [
  { value: '95', label: 'Algoritma' },
  { value: '14', label: 'Kategori' },
  { value: '250+', label: 'Kod Örneği' },
  { value: '24/7', label: 'Erişilebilir' },
];

export const learningPath: LearningStep[] = [
  {
    step: 1,
    title: 'Keşfet',
    description: 'Algoritma kategorilerini ve örnekleri inceleyin.',
    icon: <BookOpen className="h-5 w-5" />,
  },
  {
    step: 2,
    title: 'Anla',
    description: 'Görselleştirmeler ve açıklamalar ile mantığı kavrayın.',
    icon: <GraduationCap className="h-5 w-5" />,
  },
  {
    step: 3,
    title: 'Uygula',
    description: 'İnteraktif demolar ile kendi verilerinizi test edin.',
    icon: <Cpu className="h-5 w-5" />,
  },
  {
    step: 4,
    title: 'Ustalaş',
    description: 'Kod örnekleri ile kendi projelerinizde kullanın.',
    icon: <GitBranch className="h-5 w-5" />,
  },
];

export const futureGoals: string[] = [
  'Daha fazla algoritma ve veri yapısı eklemek',
  'Video içerikler ve interaktif dersler hazırlamak',
  'Mobil uyumlu ara yüz geliştirmek',
  'Kullanıcı geri bildirimlerini entegre etmek',
  'Yerelleştirme ve çoklu dil desteği',
];

export const howItWorks: HowItWorksItem[] = [
  {
    icon: <BrainCircuit className="h-6 w-6" />,
    title: 'Akıllı Görselleştirme',
    description:
      'Algoritmaların çalışma mantığını adım adım görsellerle anlatıyoruz. Her adımda neler olduğunu canlı olarak takip edebilirsiniz.',
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: 'Anlık Geri Bildirim',
    description:
      'Girdiğiniz verileri anında işleyerek sonuçları görselleştiriyoruz. Farklı girdilerle algoritmanın davranışını test edebilirsiniz.',
  },
  {
    icon: <Code2 className="h-6 w-6" />,
    title: 'Çoklu Dil Desteği',
    description:
      'JavaScript, Python, Java gibi popüler dillerde kod örnekleri sunuyoruz. Tercih ettiğiniz dilde implementasyonu inceleyebilirsiniz.',
  },
  {
    icon: <Rocket className="h-6 w-6" />,
    title: 'Performans Analizi',
    description:
      'Her algoritmanın zaman ve alan karmaşıklığını detaylı olarak açıklıyoruz. Farklı senaryolardaki performansını analiz edebilirsiniz.',
  },
];

export const technologies: string[] = [
  'Next.js',
  'React',
  'TypeScript',
  'Tailwind CSS',
  'Framer Motion',
  'Radix UI',
];
