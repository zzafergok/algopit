import React from 'react';
import type { Metadata } from 'next';
import { FloydCycleFindingView } from '@/features/algorithms/floyd-cycle-finding';

export const metadata: Metadata = {
  title: "Floyd's Cycle Finding Algoritması (Tortoise and Hare) | AlgoPit",
  description:
    "Floyd'un döngü bulma algoritması, bağlı listeler ve dizilerde döngü tespiti, başlangıç ve uzunluk hesaplaması.",
};

export default function FloydCycleFindingPage() {
  return (
    <div className="container py-8 max-w-7xl mx-auto">
      <FloydCycleFindingView />
    </div>
  );
}
