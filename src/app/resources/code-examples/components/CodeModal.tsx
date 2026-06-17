'use client';

import React, { useState } from 'react';
import { Code2, ExternalLink } from 'lucide-react';
import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CodeExample, Difficulty } from '../types';
import { CopyButton } from './CopyButton';

export const getDifficultyColor = (difficulty: Difficulty) => {
  switch (difficulty) {
    case 'Kolay':
      return 'success';
    case 'Orta':
      return 'warning';
    case 'Zor':
      return 'destructive';
    default:
      return 'secondary';
  }
};

export const CodeModal = ({ example }: { example: CodeExample }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(
    example.codeExamples[0]?.language || '',
  );

  return (
    <DialogContent className="max-w-4xl max-h-[80vh]">
      <DialogHeader>
        <DialogTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code2 className="h-5 w-5" />
            {example.title}
          </div>
          {example.githubUrl && (
            <Button variant="outline" size="sm" asChild>
              <a
                href={example.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <ExternalLink className="h-4 w-4" />
                GitHub
              </a>
            </Button>
          )}
        </DialogTitle>
      </DialogHeader>

      <div className="space-y-4">
        <div>
          <p className="text-ash">{example.description}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge variant={getDifficultyColor(example.difficulty)}>
            {example.difficulty}
          </Badge>
          {example.concepts.map((concept) => (
            <Badge key={concept} variant="secondary">
              {concept}
            </Badge>
          ))}
        </div>

        {example.codeExamples.length > 0 && (
          <Tabs value={selectedLanguage} onValueChange={setSelectedLanguage}>
            <TabsList className="w-full">
              {example.codeExamples.map((codeExample) => (
                <TabsTrigger
                  key={codeExample.language}
                  value={codeExample.language}
                  className="flex-1"
                >
                  {codeExample.language}
                </TabsTrigger>
              ))}
            </TabsList>
            {example.codeExamples.map((codeExample) => (
              <TabsContent
                key={codeExample.language}
                value={codeExample.language}
              >
                <ScrollArea className="h-[25rem] w-full rounded-sm border">
                  <div className="relative">
                    <CopyButton text={codeExample.code} />
                    <pre className="p-4">
                      <code className="text-sm">{codeExample.code}</code>
                    </pre>
                  </div>
                </ScrollArea>
              </TabsContent>
            ))}
          </Tabs>
        )}
      </div>
    </DialogContent>
  );
};
