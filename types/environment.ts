export type Season = 'summer' | 'rainy' | 'winter';
export type TimeOfDay = 'day' | 'night';

export interface EnvironmentTheme {
  id: string;
  season: Season;
  timeOfDay: TimeOfDay;
  name: string;
  subtitle: string;
  skyGradient: string;
  backgroundClasses: string;
  heroBgGradient: string;
  accentColor: string;
  accentSecondary: string;
  glowColor: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  cardBg: string;
  cardBorder: string;
  cardHoverBorder: string;
  cardGlow: string;
  badgeBg: string;
  badgeText: string;
  navBg: string;
  navBorder: string;
  sunMoonColor: string;
  ambientLightColor: number;
  directionalLightColor: number;
  fogColor: string;
  threeGroundColor: number;
  threeAccentColor: number;
  weatherType: 'pollen' | 'fireflies' | 'rain' | 'storm' | 'snow' | 'frost';
}
