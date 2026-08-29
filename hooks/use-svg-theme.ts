'use client'

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

export type Mode = "light" | "dark";

export function useSvgTheme(defaultMode: Mode = "light"): Mode {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return mounted ? ((resolvedTheme as Mode) ?? defaultMode) : defaultMode;
}