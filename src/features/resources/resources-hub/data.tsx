import React from 'react';
import { Book, GitFork, FileQuestion, Code } from 'lucide-react';
import { ResourceCategory, ExternalResource } from './types';

export const resourceCategories: ResourceCategory[] = [
  {
    title: 'Belgelendirme',
    description: 'Platform ve algoritmaların detaylı teknik belgelendirmesi',
    icon: <Book className="h-5 w-5" />,
    href: '/resources/documentation',
  },
  {
    title: 'Katkıda Bulunma',
    description: 'Projeye katkıda bulunmak isteyenler için rehber',
    icon: <GitFork className="h-5 w-5" />,
    href: '/resources/contributing',
  },
  {
    title: 'Sık Sorulan Sorular',
    description: 'Kullanıcıların en sık sorduğu sorular ve yanıtları',
    icon: <FileQuestion className="h-5 w-5" />,
    href: '/resources/faq',
  },
  {
    title: 'Kod Örnekleri',
    description: 'Algoritmaların farklı dillerde örnek implementasyonları',
    icon: <Code className="h-5 w-5" />,
    href: '/resources/code-examples',
  },
];

export const externalResources: ExternalResource[] = [
  {
    title: 'The Algorithmist',
    description: 'Çeşitli algoritma problemleri ve çözümleri içeren platform',
    href: 'https://www.algorithmist.com/',
  },
  {
    title: 'VisuAlgo',
    description:
      'Veri yapıları ve algoritmaların görselleştirildiği interaktif platform',
    href: 'https://visualgo.net/',
  },
  {
    title: 'GeeksforGeeks',
    description:
      'Programlama ve algoritma konularında geniş kaynak kütüphanesi',
    href: 'https://www.geeksforgeeks.org/',
  },
];
