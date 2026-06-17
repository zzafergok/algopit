'use client';

import React from 'react';
import { HeroSection } from './components/hero-section';
import { FeaturesSection } from './components/features-section';
import { CategoriesSection } from './components/categories-section';

export default function Home() {
  return (
    <div className="space-y-12">
      <HeroSection />
      <FeaturesSection />
      <CategoriesSection />
    </div>
  );
}
