'use client';

import React from 'react';
import { Filter, ChevronDown, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Category, Difficulty } from '../types';

interface FilterSectionProps {
  categories: Category[];
  selectedCategories: Set<string>;
  toggleCategory: (categoryId: string) => void;
  selectedDifficulties: Set<Difficulty>;
  toggleDifficulty: (difficulty: Difficulty) => void;
  activeFilterCount: number;
  clearFilters: () => void;
  isFilterOpen: boolean;
  setIsFilterOpen: (isOpen: boolean) => void;
}

export const FilterSection: React.FC<FilterSectionProps> = ({
  categories,
  selectedCategories,
  toggleCategory,
  selectedDifficulties,
  toggleDifficulty,
  activeFilterCount,
  clearFilters,
  isFilterOpen,
  setIsFilterOpen,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-end">
        <Button
          variant={activeFilterCount > 0 ? 'default' : 'outline'}
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex items-center gap-2"
        >
          <Filter className="h-4 w-4" />
          Filtrele
          {activeFilterCount > 0 && (
            <Badge variant="secondary" className="ml-1">
              {activeFilterCount}
            </Badge>
          )}
          <ChevronDown
            className={`h-4 w-4 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`}
          />
        </Button>
      </div>

      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <Card className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">Kategoriler</h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <Button
                        key={category.id}
                        variant={
                          selectedCategories.has(category.id)
                            ? 'default'
                            : 'outline'
                        }
                        size="sm"
                        onClick={() => toggleCategory(category.id)}
                        className="flex items-center gap-2"
                      >
                        {category.icon}
                        {category.name}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Zorluk Seviyesi</h3>
                  <div className="flex flex-wrap gap-2">
                    {(['Kolay', 'Orta', 'Zor'] as Difficulty[]).map(
                      (difficulty) => (
                        <Button
                          key={difficulty}
                          variant={
                            selectedDifficulties.has(difficulty)
                              ? 'default'
                              : 'outline'
                          }
                          size="sm"
                          onClick={() => toggleDifficulty(difficulty)}
                        >
                          {difficulty}
                        </Button>
                      ),
                    )}
                  </div>
                </div>

                {activeFilterCount > 0 && (
                  <div className="flex justify-end">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFilters}
                      className="text-ash"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Filtreleri Temizle
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
