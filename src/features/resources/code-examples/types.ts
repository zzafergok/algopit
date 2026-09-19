import React from 'react';

export type Category = {
  id: string;
  name: string;
  icon: React.ReactNode;
};

export type Difficulty = 'Kolay' | 'Orta' | 'Zor';

export type LanguageCode = {
  language: string;
  code: string;
};

export type CodeExample = {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: Difficulty;
  languages: string[];
  githubUrl?: string;
  concepts: string[];
  codeExamples: LanguageCode[];
};
