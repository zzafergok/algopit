'use client';

import { Link } from '@/components/core/link';

import { ArrowLeft } from 'lucide-react';

import { AlgorithmPageTemplate } from '@/components/common/algorithm-page-template';
import { InteractiveDemo } from '@/components/common/interactive-demo';
import { Badge } from '@/components/core/badge';
import { Button } from '@/components/core/button';
import {
  type DuplicateAlgorithmContent,
  duplicateAlgorithmContents,
} from '@/lib/duplicate-algorithms';
import {
  buildCodeExamples,
  runGenericDemo,
} from './duplicate-algorithm-helpers';

const categoryLabels: Record<string, string> = {
  sorting: 'Sıralama Algoritmaları',
  searching: 'Arama Algoritmaları',
  'data-structures': 'Veri Yapıları',
  'graph-algorithms': 'Graf Algoritmaları',
  'dynamic-programming': 'Dinamik Programlama',
  backtracking: 'Geri İzleme',
  'greedy-algorithms': 'Açgözlü Algoritmalar',
  'mathematical-algorithms': 'Matematiksel Algoritmalar',
  'string-algorithms': 'Metin İşleme Algoritmaları',
  'advanced-algorithms': 'İleri Seviye Algoritmalar',
  'divide-and-conquer': 'Böl ve Fethet',
};

interface DuplicateAlgorithmPageProps {
  algorithm: DuplicateAlgorithmContent;
}

export function DuplicateAlgorithmPage({
  algorithm,
}: DuplicateAlgorithmPageProps) {
  const categoryHref = `/algorithms/${algorithm.category}`;
  const codeExamples = buildCodeExamples(algorithm);
  const relatedAlgorithms = duplicateAlgorithmContents
    .filter(
      (item) =>
        item.slug !== algorithm.slug &&
        (item.category === algorithm.category ||
          item.family === algorithm.family),
    )
    .slice(0, 3);

  return (
    <div className="space-y-10 py-2">
      <div className="space-y-5">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{algorithm.family}</Badge>
            <Badge variant="outline">{algorithm.difficulty}</Badge>
            {algorithm.sources.map((source) => (
              <Badge key={source} variant="default">
                {source}
              </Badge>
            ))}
          </div>

          <p className="max-w-4xl text-lg text-ash leading-relaxed">
            {algorithm.description}
          </p>
        </div>
      </div>

      <AlgorithmPageTemplate
        title={`${algorithm.title} Algoritması`}
        descriptionTitle={`${algorithm.title} Açıklaması`}
        description={algorithm.synthesis}
        descriptionExtra={
          <div>
            <h3 className="mb-3 font-semibold">Çalışma Prensibi</h3>
            <ol className="list-decimal space-y-2 pl-5">
              {algorithm.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>
        }
        codeExamples={codeExamples}
        codeIntro={
          <>
            {algorithm.title} için pseudo koddan türetilmiş örnek uygulama
            iskeletleri aşağıda verilmiştir. Gerçek projelerde veri modeli ve
            hata kontrolleri probleme göre özelleştirilmelidir.
          </>
        }
        demoDescription={
          <>
            Aşağıya kendi verilerinizi girerek {algorithm.title} akışını örnek
            bir demo üzerinde izleyebilirsiniz. Virgülle ayrılmış değerler girin
            veya JSON dizi formatı kullanın.
          </>
        }
        demo={
          <InteractiveDemo
            title={`${algorithm.title} Demo`}
            description="Girilen veri, algoritmanın temel adımlarına göre örnek bir izleme çıktısına dönüştürülür."
            algorithmFunction={(input) =>
              runGenericDemo(algorithm, input as unknown[])
            }
            inputType="array"
            inputPlaceholder="5,3,8,4,2"
            outputFormatter={(output) => (
              <div className="space-y-3">
                {!output ? (
                  <span className="text-ash">Henüz çalıştırılmadı</span>
                ) : (
                  <>
                    <div>
                      <span className="font-medium">Yorumlanan Girdi: </span>
                      <span>{JSON.stringify(output.input)}</span>
                    </div>
                    <div>
                      <span className="font-medium">Demo Sonucu: </span>
                      <span>{output.result}</span>
                    </div>
                    <div>
                      <span className="font-medium">Karmaşıklık: </span>
                      <span className="font-mono">{output.complexity}</span>
                    </div>
                    <div>
                      <span className="font-medium">İzlenen Adımlar:</span>
                      <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-ash">
                        {output.trace.map((step: string) => (
                          <li key={step}>{step}</li>
                        ))}
                      </ol>
                    </div>
                  </>
                )}
              </div>
            )}
          />
        }
        timeComplexity={algorithm.timeComplexity}
        spaceComplexity={algorithm.spaceComplexity}
        analysisRightTitle="Kullanım Alanları"
        analysisRightContent={
          <ul className="list-disc space-y-1 pl-5 text-sm">
            {algorithm.applications.map((application) => (
              <li key={application}>{application}</li>
            ))}
          </ul>
        }
        advantages={algorithm.advantages}
        disadvantages={algorithm.disadvantages}
        relatedIntro={
          <>
            Aynı kategori veya aynı problem ailesinde değerlendirilebilecek
            diğer algoritmalar:
          </>
        }
        relatedAlgorithms={relatedAlgorithms.map((related) => ({
          title: related.title,
          description: related.family,
          href: `/algorithms/${related.category}/${related.slug}`,
        }))}
        className="space-y-12"
      />
    </div>
  );
}
