import type { Mode } from '@/hooks/use-svg-theme';

export const THEME_STYLES: Record<Mode, {
  fillColor: string;
  fillOpacity: number;
  strokeColor: string;
  strokeOpacity: number;
  shadowColor: string;
  shadowOpacity: number;
}> = {
  light: {
    fillColor: "#0C8CE9",
    fillOpacity: 0.4,
    strokeColor: "#0C8CE9",
    strokeOpacity: 0.6,
    shadowColor: "#000000",
    shadowOpacity: 0.1,
  },
  dark: {
    fillColor: "#ffffff",
    fillOpacity: 0.06,
    strokeColor: "#ffffff",
    strokeOpacity: 0.14,
    shadowColor: "#ffffff",
    shadowOpacity: 0.1,
  },
};

export function hexToRgb01(hex: string) {
  const clean = hex.replace("#", "");
  const bigint = parseInt(clean, 16);
  return {
    r: ((bigint >> 16) & 255) / 255,
    g: ((bigint >> 8) & 255) / 255,
    b: (bigint & 255) / 255,
  };
}