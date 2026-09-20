import React from 'react';
import type { Metadata } from 'next';
import { AStarView } from '@/features/algorithms/a-star';

export const metadata: Metadata = {
  title: 'A* (A-Star) Arama Algoritması | AlgoPit',
  description:
    'A* algoritması, sezgisel yol bulma, grid analizi ve interaktif görselleştirici.',
};

export default function AStarPage() {
  return (
    <div className="container py-8 max-w-7xl mx-auto">
      <AStarView />
    </div>
  );
}
