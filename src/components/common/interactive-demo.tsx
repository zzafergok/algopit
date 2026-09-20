'use client';

import React, { useState } from 'react';

import {
  Card,
  CardTitle,
  CardFooter,
  CardHeader,
  CardContent,
} from '@/components/core/card';
import { Input } from '@/components/core/input';
import { Label } from '@/components/core/label';
import { Button } from '@/components/core/button';

import { measureAlgorithmTime } from '@/lib/utils';

interface InteractiveDemoProps<TInput = never, TOutput = unknown> {
  title: string;
  description?: string;
  algorithmFunction: (input: TInput) => TOutput;
  inputPlaceholder?: string;
  inputType?: 'text' | 'number' | 'array';
  outputFormatter?: (output: TOutput) => React.ReactNode;
}

export function InteractiveDemo<TInput = never, TOutput = unknown>({
  title,
  description,
  algorithmFunction,
  inputPlaceholder = 'Veri girin...',
  inputType = 'text',
  outputFormatter,
}: InteractiveDemoProps<TInput, TOutput>) {
  const [input, setInput] = useState<string>('');
  const [output, setOutput] = useState<TOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [executionTime, setExecutionTime] = useState<number | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    setError(null);
  };

  const parseInput = (input: string): unknown => {
    if (inputType === 'number') {
      const number = parseFloat(input);
      if (isNaN(number)) {
        throw new Error('Geçerli bir sayı girin');
      }
      return number;
    }

    if (inputType === 'array') {
      try {
        if (input.trim().startsWith('[') && input.trim().endsWith(']')) {
          return JSON.parse(input);
        }

        return input.split(',').map((item) => {
          const trimmed = item.trim();
          if (!isNaN(parseFloat(trimmed)) && trimmed !== '') {
            return parseFloat(trimmed);
          }
          return trimmed;
        });
      } catch (e) {
        throw new Error('Geçerli bir dizi girin (örn: 1,2,3 veya [1,2,3])');
      }
    }

    return input; // Metin girişi için
  };

  const handleRun = () => {
    setError(null);
    setIsRunning(true);

    try {
      const parsedInput = parseInput(input);

      const { result, time } = measureAlgorithmTime(
        (val: unknown) =>
          (algorithmFunction as unknown as (arg: unknown) => TOutput)(val),
        parsedInput,
      );

      setOutput(result);
      setExecutionTime(time);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError('Bir hata oluştu');
      }
      setOutput(null);
      setExecutionTime(null);
    } finally {
      setIsRunning(false);
    }
  };

  const formatOutput = (output: unknown): React.ReactNode => {
    if (outputFormatter) {
      return outputFormatter(output as TOutput);
    }

    if (output === null || output === undefined) {
      return <span className="text-ash">Sonuç yok</span>;
    }

    if (Array.isArray(output)) {
      return JSON.stringify(output);
    }

    if (typeof output === 'object') {
      return <pre>{JSON.stringify(output, null, 2)}</pre>;
    }

    return String(output);
  };

  return (
    <Card className="interactive-section">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <p className="text-sm text-ash">{description}</p>}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="mb-2">
              <Label htmlFor="input" className="text-sm font-medium">
                Girdi{' '}
                {inputType === 'array' &&
                  '(virgülle ayrılmış değerler veya dizi)'}
              </Label>
            </div>
            <Input
              id="input"
              value={input}
              onChange={handleInputChange}
              placeholder={inputPlaceholder}
              className="w-full"
            />
            {error && <p className="mt-1 text-sm text-alert-red">{error}</p>}
          </div>

          <div>
            <div className="mb-2">
              <Label className="text-sm font-medium">Sonuç</Label>
            </div>
            <div className="rounded-sm border p-3 min-h-12">
              {formatOutput(output)}
            </div>
            {executionTime !== null && (
              <p className="mt-1 text-sm text-ash">
                Çalışma süresi: {executionTime.toFixed(4)} ms
              </p>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleRun} disabled={isRunning || !input.trim()}>
          {isRunning ? 'Çalışıyor...' : 'Çalıştır'}
        </Button>
      </CardFooter>
    </Card>
  );
}
