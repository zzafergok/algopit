'use client';

import React from 'react';
import { FolderTree, TreePine } from 'lucide-react';

interface TreeInfoCardsProps {
  currentTreeType: 'trie' | 'segment';
}

export function TreeInfoCards({ currentTreeType }: TreeInfoCardsProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {currentTreeType === 'trie' && (
          <div className="space-y-2">
            <h4 className="font-semibold">Trie Düğüm Renkleri</h4>
            <div className="space-y-1 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-signal-green border-2 border-signal-green rounded-full"></div>
                <span>Kelime sonu düğümü</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gunmetal/40 border-2 border-ash rounded-full"></div>
                <span>Ara düğüm</span>
              </div>
            </div>
          </div>
        )}

        {currentTreeType === 'segment' && (
          <div className="space-y-2">
            <h4 className="font-semibold">Segment Tree Düğüm Renkleri</h4>
            <div className="space-y-1 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-6 h-4 bg-arcly-blue/15 border-2 border-arcly-blue rounded"></div>
                <span>Yaprak düğümü (tek eleman)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-4 bg-arcly-blue/20 border-2 border-arcly-blue rounded"></div>
                <span>İç düğüm (aralık)</span>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-2">
          <h4 className="font-semibold">Genel Bilgiler</h4>
          <div className="space-y-1 text-sm">
            {currentTreeType === 'trie' ? (
              <>
                <p>• Yeşil düğümler tamamlanmış kelimeleri temsil eder</p>
                <p>
                  • Parantez içindeki sayı kelimenin kaç kez eklendiğini
                  gösterir
                </p>
                <p>• Mavi etiketler tamamlanmış kelimeyi gösterir</p>
              </>
            ) : (
              <>
                <p>
                  • Her düğüm bir aralığı ve o aralıktaki toplam/min/max
                  değerleri içerir
                </p>
                <p>• Yaprak düğümler orijinal dizi elemanlarını temsil eder</p>
                <p>• İç düğümler alt aralıkların birleşimini temsil eder</p>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 bg-obsidian/60 rounded-sm">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <FolderTree className="w-5 h-5" />
            Trie (Prefix Tree)
          </h3>
          <div className="space-y-2 text-sm">
            <p>
              <strong>Zaman Karmaşıklığı:</strong>
            </p>
            <ul className="list-disc pl-5">
              <li>Ekleme: O(m) - m kelime uzunluğu</li>
              <li>Arama: O(m)</li>
              <li>
                Prefix arama: O(p + k) - p prefix uzunluğu, k sonuç sayısı
              </li>
            </ul>
            <p>
              <strong>Alan Karmaşıklığı:</strong> O(ALPHABET_SIZE * N * M)
            </p>
            <p>
              <strong>Kullanım Alanları:</strong> Otomatik tamamlama, yazım
              kontrolü, IP routing
            </p>
          </div>
        </div>

        <div className="p-4 bg-obsidian/60 rounded-sm">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <TreePine className="w-5 h-5" />
            Segment Tree
          </h3>
          <div className="space-y-2 text-sm">
            <p>
              <strong>Zaman Karmaşıklığı:</strong>
            </p>
            <ul className="list-disc pl-5">
              <li>İnşa etme: O(n)</li>
              <li>Aralık sorgusu: O(log n)</li>
              <li>Güncelleme: O(log n)</li>
            </ul>
            <p>
              <strong>Alan Karmaşıklığı:</strong> O(n)
            </p>
            <p>
              <strong>Kullanım Alanları:</strong> Aralık toplamı, min/max
              sorguları, lazy propagation
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
