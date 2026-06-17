'use client';

import React from 'react';
import { StatsSection } from './components/stats-section';
import { HowItWorksSection } from './components/how-it-works-section';
import { FeaturesSection } from './components/features-section';
import { LearningPathSection } from './components/learning-path-section';
import { ContributingFutureSection } from './components/contributing-future-section';

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
