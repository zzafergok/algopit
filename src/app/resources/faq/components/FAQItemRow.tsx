'use client';

import React from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { FAQItem } from '../types';

interface FAQItemRowProps {
  faq: FAQItem;
  isExpanded: boolean;
  onToggle: () => void;
  variants: Variants;
}

export const FAQItemRow: React.FC<FAQItemRowProps> = ({
  faq,
  isExpanded,
  onToggle,
  variants,
}) => {
  return (
    <motion.div
      variants={variants}
      className="border rounded-sm overflow-hidden"
    >
      <div
        className={`p-4 flex justify-between items-center cursor-pointer ${
          isExpanded ? 'bg-obsidian/60' : 'bg-card'
        }`}
        onClick={onToggle}
      >
        <h3 className="font-medium text-lg">{faq.question}</h3>
        <ChevronDown
          className={`h-5 w-5 transition-transform duration-200 ${
            isExpanded ? 'rotate-180' : ''
          }`}
        />
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-4 border-t">
              <div className="prose dark:prose-invert max-w-none">
                {faq.answer}
              </div>

              <div className="flex flex-wrap gap-1 mt-4">
                {faq.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
