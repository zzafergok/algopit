import { Search, FileText, Code2, Microscope, Rocket } from 'lucide-react';

export const timelineSteps = [
  {
    title: 'Araştırma',
    description: 'Algoritma hakkında kapsamlı araştırma ve kaynak toplama',
    status: 'Tamamlandı',
    icon: Search,
  },
  {
    title: 'İçerik Planlama',
    description: 'Teori, örnekler ve görselleştirmelerin planlanması',
    status: 'Devam Ediyor',
    icon: FileText,
  },
  {
    title: 'Geliştirme',
    description: 'İnteraktif demo ve görselleştirmelerin kodlanması',
    status: 'Planlandı',
    icon: Code2,
  },
  {
    title: 'Test ve İyileştirme',
    description: 'Kullanıcı deneyimi testleri ve iyileştirmeler',
    status: 'Planlandı',
    icon: Microscope,
  },
  {
    title: 'Yayınlama',
    description: 'İçeriğin gözden geçirilmesi ve canlıya alınması',
    status: 'Planlandı',
    icon: Rocket,
  },
];
