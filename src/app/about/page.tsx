import React from 'react';
import type { Metadata } from 'next';
import {
  StatsSection,
  HowItWorksSection,
  FeaturesSection,
  LearningPathSection,
  ContributingFutureSection,
} from '@/features/about';

export const metadata: Metadata = {
  title: 'Hakkında | AlgoPit',
  description:
    'AlgoPit algoritma görselleştirme ve öğrenme platformu hakkında bilgiler.',
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-12 py-4 sm:space-y-14 sm:py-6 lg:space-y-16 lg:py-8">
      <StatsSection />
      <HowItWorksSection />
      <FeaturesSection />
      <LearningPathSection />
      <ContributingFutureSection />
    </div>
  );
}
