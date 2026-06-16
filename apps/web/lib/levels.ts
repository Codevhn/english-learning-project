const THRESHOLDS = [0, 100, 250, 500, 1000, 2000, 4000, 7000, 11000, 16000, 22000];
const LABELS = [
  "Principiante", "Explorador", "Estudiante", "Aprendiz", "Practicante",
  "Intermedio", "Avanzado", "Experto", "Maestro", "Leyenda", "Leyenda",
];

export const LEVEL_COLORS = [
  { text: "#6B7280", bg: "#F3F4F6" }, // 1 Principiante — gray
  { text: "#059669", bg: "#ECFDF5" }, // 2 Explorador — emerald
  { text: "#0891B2", bg: "#ECFEFF" }, // 3 Estudiante — cyan
  { text: "#2563EB", bg: "#DBEAFE" }, // 4 Aprendiz — blue
  { text: "#0369A1", bg: "#E0F2FE" }, // 5 Practicante — sky
  { text: "#D97706", bg: "#FEF3C7" }, // 6 Intermedio — amber
  { text: "#C2410C", bg: "#FFF7ED" }, // 7 Avanzado — orange
  { text: "#B91C1C", bg: "#FEF2F2" }, // 8 Experto — red
  { text: "#BE185D", bg: "#FDF2F8" }, // 9 Maestro — rose
  { text: "#92400E", bg: "#FFFBEB" }, // 10 Leyenda — gold
] as const;

export const CEFR_COLORS: Record<string, { text: string; bg: string }> = {
  A1: { text: "#059669", bg: "#ECFDF5" },
  A2: { text: "#0891B2", bg: "#ECFEFF" },
  B1: { text: "#D97706", bg: "#FEF3C7" },
  B2: { text: "#C2410C", bg: "#FFF7ED" },
  C1: { text: "#B91C1C", bg: "#FEF2F2" },
  C2: { text: "#92400E", bg: "#FFFBEB" },
};

export function xpToLevel(xp: number) {
  let level = 0;
  for (let i = 0; i < THRESHOLDS.length - 1; i++) {
    if (xp >= THRESHOLDS[i]) level = i + 1;
  }
  level = Math.min(level, 10);

  const currentThreshold = THRESHOLDS[level - 1] ?? 0;
  const nextThreshold = THRESHOLDS[level] ?? THRESHOLDS[THRESHOLDS.length - 1];
  const progress =
    nextThreshold > currentThreshold
      ? Math.round(((xp - currentThreshold) / (nextThreshold - currentThreshold)) * 100)
      : 100;

  const colors = LEVEL_COLORS[level - 1] ?? LEVEL_COLORS[0];
  return {
    level,
    label: LABELS[level - 1] ?? "Principiante",
    nextLevelXp: nextThreshold,
    progress,
    colors,
  };
}
