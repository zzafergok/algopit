import { FAQItem } from '../types';
import { generalFaqs } from './generalFaqs';
import { algorithmsFaqs } from './algorithmsFaqs';
import { usageFaqs } from './usageFaqs';
import { technicalFaqs } from './technicalFaqs';
import { contributeFaqs } from './contributeFaqs';

export const faqData: FAQItem[] = [
  ...generalFaqs,
  ...algorithmsFaqs,
  ...usageFaqs,
  ...technicalFaqs,
  ...contributeFaqs,
];
