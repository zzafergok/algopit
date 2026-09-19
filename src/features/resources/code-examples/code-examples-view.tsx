'use client';

import React, { useState, useMemo, useCallback } from 'react';
import {
  X,
  Code2,
  Search,
  Layers,
  Target,
  Settings2,
  GitBranch,
  BookMarked,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { Badge } from '@/components/core/badge';
import { Input } from '@/components/core/input';
import { Button } from '@/components/core/button';

import { Category, Difficulty } from './types';
import { codeExamples } from './data';
import { FilterSection } from './components/FilterSection';
import { ExampleCard } from './components/ExampleCard';
import { getDifficultyColor } from './components/CodeModal';

export function CodeExamplesView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(
    new Set(),
  );
  const [selectedDifficulties, setSelectedDifficulties] = useState<
    Set<Difficulty>
  >(new Set());
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const categories: Category[] = [
    {
      id: 'sorting',
      name: 'Sıralama',
      icon: <Settings2 className="h-4 w-4" />,
    },
    { id: 'searching', name: 'Arama', icon: <Search className="h-4 w-4" /> },
    { id: 'graph', name: 'Graf', icon: <Code2 className="h-4 w-4" /> },
    {
      id: 'dp',
      name: 'Dinamik Programlama',
      icon: <BookMarked className="h-4 w-4" />,
    },
    {
      id: 'data-structures',
      name: 'Veri Yapıları',
      icon: <Layers className="h-4 w-4" />,
    },
    { id: 'greedy', name: 'Açgözlü', icon: <Target className="h-4 w-4" /> },
    {
      id: 'backtracking',
      name: 'Geri İzleme',
      icon: <GitBranch className="h-4 w-4" />,
    },
  ];

  const toggleCategory = useCallback((categoryId: string) => {
    setSelectedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(categoryId)) {
        next.delete(categoryId);
      } else {
        next.add(categoryId);
      }
      return next;
    });
  }, []);

  const toggleDifficulty = useCallback((difficulty: Difficulty) => {
    setSelectedDifficulties((prev) => {
      const next = new Set(prev);
      if (next.has(difficulty)) {
        next.delete(difficulty);
      } else {
        next.add(difficulty);
      }
      return next;
    });
  }, []);

  const clearFilters = useCallback(() => {
    setSelectedCategories(new Set());
    setSelectedDifficulties(new Set());
    setSearchTerm('');
  }, []);

  const filteredExamples = useMemo(() => {
    return codeExamples.filter((example) => {
      const matchesSearch =
        example.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        example.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        example.concepts?.some((concept: string) =>
          concept.toLowerCase().includes(searchTerm.toLowerCase()),
        );

      const matchesCategory =
        selectedCategories.size === 0 ||
        selectedCategories.has(example.category);

      const matchesDifficulty =
        selectedDifficulties.size === 0 ||
        selectedDifficulties.has(example.difficulty);

      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [searchTerm, selectedCategories, selectedDifficulties]);

  const activeFilterCount = selectedCategories.size + selectedDifficulties.size;

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <Input
              placeholder="Kod örneklerinde ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <FilterSection
            categories={categories}
            selectedCategories={selectedCategories}
            toggleCategory={toggleCategory}
            selectedDifficulties={selectedDifficulties}
            toggleDifficulty={toggleDifficulty}
            activeFilterCount={activeFilterCount}
            clearFilters={clearFilters}
            isFilterOpen={isFilterOpen}
            setIsFilterOpen={setIsFilterOpen}
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="font-mono text-xs text-muted uppercase">
          {filteredExamples.length} kod örneği bulundu
        </p>

        {(selectedCategories.size > 0 || selectedDifficulties.size > 0) && (
          <div className="flex flex-wrap gap-2">
            {Array.from(selectedCategories).map((categoryId) => {
              const category = categories.find((c) => c.id === categoryId);
              return category ? (
                <Badge
                  key={categoryId}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {category.name}
                  <X
                    className="h-3 w-3 cursor-pointer hover:text-destructive"
                    onClick={() => toggleCategory(categoryId)}
                  />
                </Badge>
              ) : null;
            })}
            {Array.from(selectedDifficulties).map((difficulty) => (
              <Badge
                key={difficulty}
                variant={getDifficultyColor(difficulty)}
                className="flex items-center gap-1"
              >
                {difficulty}
                <X
                  className="h-3 w-3 cursor-pointer hover:text-destructive"
                  onClick={() => toggleDifficulty(difficulty)}
                />
              </Badge>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence mode="popLayout">
        {filteredExamples.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExamples.map((example, index) => (
              <motion.div
                key={example.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <ExampleCard example={example} categories={categories} />
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 border border-line bg-surface p-8"
          >
            <p className="font-mono text-sm text-muted">
              Arama kriterlerinize uygun kod örneği bulunamadı.
            </p>
            <Button variant="outline" className="mt-4" onClick={clearFilters}>
              Filtreleri Temizle
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
