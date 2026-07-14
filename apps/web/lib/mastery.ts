export const MASTERY_THRESHOLD = 80;

export function isMastered(score: number | null | undefined): boolean {
  return (score ?? 0) >= MASTERY_THRESHOLD;
}

// End-of-level exams (Fase D.2) require a higher bar than a single lesson —
// they certify the whole CEFR level, not just one topic.
export const LEVEL_EXAM_PASS_THRESHOLD = 85;

export function passedLevelExam(score: number | null | undefined): boolean {
  return (score ?? 0) >= LEVEL_EXAM_PASS_THRESHOLD;
}

// How many exercises to sample from the exam's full question bank per
// attempt, so retries don't just repeat the exact same items.
export const LEVEL_EXAM_SAMPLE_SIZE = 24;
