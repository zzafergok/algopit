'use client';

import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { CodeExample, Category } from '../types';
import { CodeModal, getDifficultyColor } from './CodeModal';

interface ExampleCardProps {
  example: CodeExample;
  categories: Category[];
}

export const ExampleCard: React.FC<ExampleCardProps> = ({
  example,
  categories,
}) => {
  const categoryName =
    categories.find((c) => c.id === example.category)?.name || example.category;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="h-full flex flex-col cursor-pointer hover:border-arcly-blue/30 transition-colors">
          <CardHeader>
            <div className="flex items-start justify-between mb-2">
              <CardTitle className="text-lg">{example.title}</CardTitle>
              <Badge variant={getDifficultyColor(example.difficulty)}>
                {example.difficulty}
              </Badge>
            </div>
            <p className="text-sm text-ash line-clamp-2">
              {example.description}
            </p>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="mb-4">
              <p className="text-sm font-medium mb-2">Diller:</p>
              <div className="flex flex-wrap gap-1">
                {example.languages.map((lang) => (
                  <Badge key={lang} variant="outline" className="text-xs">
                    {lang}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm font-medium mb-2">Konseptler:</p>
              <div className="flex flex-wrap gap-1">
                {example.concepts.map((concept) => (
                  <Badge key={concept} variant="secondary" className="text-xs">
                    {concept}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm font-medium mb-1">Kategori:</p>
              <Badge variant="outline">{categoryName}</Badge>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      <CodeModal example={example} />
    </Dialog>
  );
};
