import { FAQItem } from '../types';
import { generalFaqs } from './general-faqs';
import { algorithmsFaqs } from './algorithms-faqs';
import { usageFaqs } from './usage-faqs';
import { technicalFaqs } from './technical-faqs';
import { contributeFaqs } from './contribute-faqs';

export const faqData: FAQItem[] = [
  ...generalFaqs,
  ...algorithmsFaqs,
  ...usageFaqs,
  ...technicalFaqs,
  ...contributeFaqs,
];
