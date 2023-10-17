import { useEffect, useMemo, useState } from 'react';
import { useIsMounted } from './useIsMounted';

export const themes: Record<string, string> = {
  ['p12-theme-01']: 'https://cdn1.p12.games/airdrop/theme/purple/',
  ['p12-theme-02']: 'https://cdn1.p12.games/airdrop/theme/green/',
  ['p12-theme-03']: 'https://cdn1.p12.games/airdrop/theme/orange/',
  ['p12-theme-04']: 'https://cdn1.p12.games/airdrop/theme/blue/',
};

export const useThemeAsset = (file: string) => {
  const isMounted = useIsMounted();
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    if (!isMounted) return;
    const themeClass = document?.documentElement?.classList?.[0];
    const theme = themes?.[themeClass] ?? themes['p12-theme-01'];
    setSrc(theme + file);
  }, [file, isMounted]);

  return useMemo(() => src, [src]);
};

export const arcanaThemes: Record<string, string> = {
  ['p12-theme-01']: 'https://cdn1.p12.games/arcana/theme/purple/',
  ['p12-theme-02']: 'https://cdn1.p12.games/arcana/theme/green/',
  ['p12-theme-03']: 'https://cdn1.p12.games/arcana/theme/orange/',
  ['p12-theme-04']: 'https://cdn1.p12.games/arcana/theme/blue/',
};

export const useArcanaThemeAsset = (file: string) => {
  const isMounted = useIsMounted();
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    if (!isMounted) return;
    const themeClass = document?.documentElement?.classList?.[0];
    const theme = arcanaThemes?.[themeClass] ?? arcanaThemes['p12-theme-01'];
    setSrc(theme + file);
  }, [file, isMounted]);

  return useMemo(() => src, [src]);
};

export const useThemeColors = () => {
  const [gradientFrom, setGradientFrom] = useState<string>('');
  const [gradientTo, setGradientTo] = useState<string>('');

  useEffect(() => {
    const themeStyles = window.getComputedStyle(document.documentElement);
    setGradientFrom(themeStyles.getPropertyValue(`--from`).trim());
    setGradientTo(themeStyles.getPropertyValue(`--to`).trim());
  }, []);
  return {
    gradientFrom,
    gradientTo,
  };
};
