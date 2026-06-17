'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Sparkles, Mail } from 'lucide-react';
import { futureGoals, technologies } from '../about-data';

export function ContributingFutureSection() {
  return (
    <>
      <section className="space-y-4 sm:space-y-6">
        <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
          Kullanılan Teknolojiler
        </h2>
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
          {technologies.map((tech) => (
            <Badge
              key={tech}
              variant="secondary"
              className="px-3 py-1.5 text-sm sm:px-4 sm:py-2 sm:text-base"
            >
              {tech}
            </Badge>
          ))}
        </div>
      </section>

      <section className="space-y-5 rounded-sm bg-obsidian/30 p-5 sm:space-y-6 sm:p-8">
        <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
          Katkıda Bulunun
        </h2>
        <div className="mx-auto max-w-3xl space-y-4 text-center">
          <p className="text-base leading-relaxed sm:text-lg">
            AlgoPit açık kaynak bir projedir. Her türlü katkı ve önerilerinizi
            memnuniyetle karşılıyoruz.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
            <Button asChild>
              <Link
                href="https://github.com/zzafergok/algopit"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub'da İncele
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link
                href="/resources/contributing"
                className="flex items-center gap-2"
              >
                <FileText className="h-4 w-4" />
                Katkı Rehberi
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="space-y-4 sm:space-y-6">
        <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
          Gelecek Hedeflerimiz
        </h2>
        <div className="mx-auto max-w-3xl">
          <ul className="space-y-3">
            {futureGoals.map((goal, index) => (
              <motion.li
                key={index}
                className="flex items-start gap-3 rounded-sm bg-obsidian/30 p-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Sparkles className="h-5 w-5 text-arcly-blue flex-shrink-0" />
                <span className="leading-relaxed">{goal}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      <section className="space-y-5 text-center sm:space-y-6">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          İletişim
        </h2>
        <p className="mx-auto max-w-2xl text-base leading-relaxed sm:text-lg">
          Platform hakkında sorularınız, önerileriniz veya geri bildirimleriniz
          için bizimle iletişime geçebilirsiniz.
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild>
            <Link
              href="mailto:gok.zaferr@gmail.com"
              className="flex items-center gap-2"
            >
              <Mail className="h-4 w-4" />
              E-posta Gönder
            </Link>
          </Button>
        </div>
      </section>

      <section className="relative overflow-hidden rounded-sm bg-obsidian/30 p-5 text-center sm:p-8">
        <div className="absolute -top-10 -left-10 font-serif text-[9.375rem] opacity-5">
          "
        </div>
        <blockquote className="relative z-10 mx-auto max-w-3xl text-base italic leading-relaxed sm:text-xl">
          Herhangi bir aptal, bir bilgisayarın anlayabileceği kod yazabilir. İyi
          programcılar, insanların anlayabileceği kod yazar.
          <span className="block mt-4 font-semibold text-arcly-blue">
            — Martin Fowler
          </span>
        </blockquote>
      </section>
    </>
  );
}
