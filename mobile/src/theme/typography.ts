/**
 * Tailles de texte, interlignages et letter-spacing (Figma → React Native).
 * Les polices utilisent la stack système (équivalent Arial/sans-serif maquette).
 */
export const typography = {
  /** Titres principaux — 24px / 36px lh, tracking 1.2 */
  heading1: { fontSize: 24, lineHeight: 36, letterSpacing: 1.2 },
  /** Sous-titres accent — 16px / 24px */
  subtitleAccent: { fontSize: 16, lineHeight: 24, letterSpacing: 1.6 },
  /** Corps onboarding — 16px / 26px */
  bodyLarge: { fontSize: 16, lineHeight: 26, letterSpacing: 0 },
  /** Labels, boutons — 16px / 24px, tracking 0.4 */
  label: { fontSize: 16, lineHeight: 24, letterSpacing: 0.4 },
  /** Placeholder champs — 14px */
  inputPlaceholder: { fontSize: 14, lineHeight: 20, letterSpacing: 0 },
  /** Section dashboard — 20px / 30px, tracking 0.5 */
  heading2: { fontSize: 20, lineHeight: 30, letterSpacing: 0.5 },
  /** Cartes séance titres — 16px / 24px */
  heading3: { fontSize: 16, lineHeight: 24, letterSpacing: 0 },
  /** Badge Fractionné — 12px / 16px, tracking 0.6 */
  badge: { fontSize: 12, lineHeight: 16, letterSpacing: 0.6 },
  /** Chronomètre 00:00 — 96px lh ajusté */
  timerDisplay: { fontSize: 80, lineHeight: 96, letterSpacing: -2 },
  /** Stats détail séance grande valeur */
  statLarge: { fontSize: 40, lineHeight: 48, letterSpacing: 0 },
  /** Onglets bottom nav */
  tabLabel: { fontSize: 11, lineHeight: 14, letterSpacing: 0.2 },
} as const;
