import React from 'react';
import { Book, LayoutGrid, FileText, Code, Settings } from 'lucide-react';
import { GettingStarted } from '../components/GettingStarted';
import { PlatformArchitecture } from '../components/PlatformArchitecture';
import { AlgorithmVisualizations } from '../components/AlgorithmVisualizations';
import { CodeImplementation } from '../components/CodeImplementation';
import { Configuration } from '../components/Configuration';

export interface DocSection {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  tags: string[];
  content: React.ReactNode;
}

export const docSections: DocSection[] = [
  {
    id: 'getting-started',
    title: 'Başlangıç',
    description: 'Platforma giriş ve temel kullanım',
    icon: <Book className="h-5 w-5" />,
    tags: ['başlangıç', 'giriş', 'temel'],
    content: <GettingStarted />,
  },
  {
    id: 'platform-architecture',
    title: 'Platform Mimarisi',
    description: 'Sistemin teknik yapısı ve bileşenleri',
    icon: <LayoutGrid className="h-5 w-5" />,
    tags: ['mimari', 'yapı', 'teknik'],
    content: <PlatformArchitecture />,
  },
  {
    id: 'algorithm-visualizations',
    title: 'Algoritma Görselleştirmeleri',
    description: 'İnteraktif görselleştirme bileşenlerinin kullanımı',
    icon: <FileText className="h-5 w-5" />,
    tags: ['görselleştirme', 'interaktif', 'demo'],
    content: <AlgorithmVisualizations />,
  },
  {
    id: 'code-implementation',
    title: 'Kod İmplementasyonları',
    description: 'Algoritmaların farklı dillerdeki implementasyon detayları',
    icon: <Code className="h-5 w-5" />,
    tags: ['kod', 'programlama', 'örnekler'],
    content: <CodeImplementation />,
  },
  {
    id: 'configuration',
    title: 'Konfigürasyon',
    description: 'Platform ayarları ve özelleştirme seçenekleri',
    icon: <Settings className="h-5 w-5" />,
    tags: ['ayarlar', 'özelleştirme', 'konfigürasyon'],
    content: <Configuration />,
  },
];
