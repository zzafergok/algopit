'use client';

import type React from 'react';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

export type UISize = 'small' | 'medium' | 'large';

type UISizeContextValue = {
  uiSize: UISize;
  setUISize: (size: UISize) => void;
};

const STORAGE_KEY = 'algopit-ui-size';
const DEFAULT_UI_SIZE: UISize = 'medium';
const UI_SIZES = new Set<UISize>(['small', 'medium', 'large']);

const UISizeContext = createContext<UISizeContextValue | undefined>(undefined);

function isUISize(value: string | null): value is UISize {
  return value !== null && UI_SIZES.has(value as UISize);
}

function normalizeUISize(value: string | null): UISize {
  if (value === 'current') {
    return 'medium';
  }

  return isUISize(value) ? value : DEFAULT_UI_SIZE;
}

function applyUISize(size: UISize) {
  document.documentElement.dataset.uiSize = size;
}

function getInitialUISize(): UISize {
  if (typeof document !== 'undefined') {
    return normalizeUISize(document.documentElement.dataset.uiSize ?? null);
  }

  return DEFAULT_UI_SIZE;
}

export function UISizeProvider({ children }: { children: React.ReactNode }) {
  const [uiSize, setUiSizeState] = useState<UISize>(getInitialUISize);

  useEffect(() => {
    const storedSize =
      document.documentElement.dataset.uiSize ??
      localStorage.getItem(STORAGE_KEY);
    const initialSize = normalizeUISize(storedSize);

    setUiSizeState(initialSize);
    localStorage.setItem(STORAGE_KEY, initialSize);
    applyUISize(initialSize);
  }, []);

  const setUISize = useCallback((size: UISize) => {
    setUiSizeState(size);
    localStorage.setItem(STORAGE_KEY, size);
    applyUISize(size);
  }, []);

  const value = useMemo(
    () => ({
      uiSize,
      setUISize,
    }),
    [setUISize, uiSize],
  );

  return (
    <UISizeContext.Provider value={value}>{children}</UISizeContext.Provider>
  );
}

export function useUISize() {
  const context = useContext(UISizeContext);

  if (!context) {
    throw new Error('useUISize must be used inside UISizeProvider');
  }

  return context;
}
