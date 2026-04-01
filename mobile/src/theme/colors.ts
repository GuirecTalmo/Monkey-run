/**
 * Couleurs extraites de la maquette Figma MONKEY-RUN-APP.
 */
export const colors = {
  background: '#0a0a0a',
  primary: '#fdc700',
  white: '#ffffff',
  textMuted: '#a1a1a1',
  textBody: '#d4d4d4',
  textPlaceholder: '#717182',
  surface: '#171717',
  border: '#262626',
  dotInactive: '#404040',
  black: '#000000',
} as const;

export type AppColors = typeof colors;
