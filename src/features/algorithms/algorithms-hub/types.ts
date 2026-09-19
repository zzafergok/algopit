import React from 'react';

export interface AlgorithmItem {
  name: string;
  slug: string;
  description: string;
  difficulty?: 'Kolay' | 'Orta' | 'Zor';
}

export interface AlgorithmCategory {
  title: string;
  slug: string;
  description: string;
  algorithms: AlgorithmItem[];
  icon?: React.ReactNode;
}
