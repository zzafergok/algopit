import React from 'react';

export interface FAQItem {
  id: string;
  tags: string[];
  question: string;
  category: string;
  isHelpful?: boolean;
  answer: React.ReactNode;
}
