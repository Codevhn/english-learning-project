export interface SM2Card {
  easeFactor: number;
  intervalDays: number;
  repetitions: number;
}

export interface SM2Result extends SM2Card {
  nextReviewAt: Date;
}

/**
 * SM-2 spaced repetition algorithm.
 * quality: 0–5 (0-2 = forgot, 3-5 = remembered; 5 = perfect)
 */
export function sm2(card: SM2Card, quality: 0 | 1 | 2 | 3 | 4 | 5): SM2Result {
  let { easeFactor, intervalDays, repetitions } = card;

  if (quality >= 3) {
    if (repetitions === 0) {
      intervalDays = 1;
    } else if (repetitions === 1) {
      intervalDays = 6;
    } else {
      intervalDays = Math.round(intervalDays * easeFactor);
    }

    easeFactor =
      easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
    easeFactor = Math.max(1.3, easeFactor);
    repetitions++;
  } else {
    repetitions = 0;
    intervalDays = 1;
  }

  const nextReviewAt = new Date();
  nextReviewAt.setDate(nextReviewAt.getDate() + intervalDays);

  return { easeFactor, intervalDays, repetitions, nextReviewAt };
}

export const DEFAULT_CARD: SM2Card = {
  easeFactor: 2.5,
  intervalDays: 1,
  repetitions: 0,
};
