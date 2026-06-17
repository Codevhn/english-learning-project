export const MASTERY_THRESHOLD = 80;

export function isMastered(score: number | null | undefined): boolean {
  return (score ?? 0) >= MASTERY_THRESHOLD;
}
