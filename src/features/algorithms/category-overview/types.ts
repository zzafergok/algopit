import React from 'react';

export interface CategoryAlgorithm {
  name: string;
  path: string;
  description?: string;
  difficulty?: 'Kolay' | 'Orta' | 'Zor' | string;
  category?: string;
}

export interface CategoryOverviewProps {
  algorithms: CategoryAlgorithm[];
  children?: React.ReactNode;
}
