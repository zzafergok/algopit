import React from 'react';
import { Label } from '@/components/core/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/core/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/core/card';

interface HierarchicalParamsCardProps {
  dataType: 'random' | 'clustered';
  setDataType: (type: 'random' | 'clustered') => void;
  isRunning: boolean;
  numPoints: number;
  setNumPoints: (val: number) => void;
  numClusters: number;
  setNumClusters: (val: number) => void;
  cutoffValue: number;
  handleCutoffChange: (value: number[]) => void;
  generateData: () => void;
  runAlgorithm: () => void;
  pointsLength: number;
}

export function HierarchicalParamsCard({
  dataType,
  setDataType,
  isRunning,
  numPoints,
  setNumPoints,
  numClusters,
  setNumClusters,
  cutoffValue,
  handleCutoffChange,
  generateData,
  runAlgorithm,
  pointsLength,
}: HierarchicalParamsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Algoritma Parametreleri</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Veri Tipi</Label>
            <div className="flex space-x-2">
              <Button
                variant={dataType === 'random' ? 'default' : 'outline'}
                onClick={() => setDataType('random')}
                disabled={isRunning}
              >
                Rastgele
              </Button>
              <Button
                variant={dataType === 'clustered' ? 'default' : 'outline'}
                onClick={() => setDataType('clustered')}
                disabled={isRunning}
              >
                Kümelenmiş
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="numPoints">Nokta Sayısı: {numPoints}</Label>
            </div>
            <Slider
              id="numPoints"
              min={10}
              max={100}
              step={5}
              value={[numPoints]}
              onValueChange={(value) => setNumPoints(value[0])}
              disabled={isRunning}
            />
          </div>

          {dataType === 'clustered' && (
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="numClusters">Küme Sayısı: {numClusters}</Label>
              </div>
              <Slider
                id="numClusters"
                min={2}
                max={6}
                step={1}
                value={[numClusters]}
                onValueChange={(value) => setNumClusters(value[0])}
                disabled={isRunning}
              />
            </div>
          )}

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="cutoffValue">
                Kesme Eşiği:{' '}
                {cutoffValue === 100 ? 'Hiç (Tek Küme)' : `${cutoffValue}%`}
              </Label>
            </div>
            <Slider
              id="cutoffValue"
              min={0}
              max={100}
              step={5}
              value={[cutoffValue]}
              onValueChange={handleCutoffChange}
              disabled={isRunning}
            />
          </div>

          <div className="flex space-x-2">
            <Button onClick={generateData} disabled={isRunning}>
              Yeni Veri Oluştur
            </Button>
            <Button
              onClick={runAlgorithm}
              disabled={isRunning || pointsLength === 0}
            >
              {isRunning ? 'Çalışıyor...' : 'Algoritmayı Çalıştır'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
