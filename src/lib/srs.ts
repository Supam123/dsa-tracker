import { addDays } from 'date-fns';

export type UserRating = 'Hard' | 'Medium' | 'Easy';

export function calculateNextReview(
  rating: UserRating,
  lastSolvedAt: Date | null,
  nextReviewAt: Date | null
): Date {
  const now = new Date();

  // Baseline standard progression exactly like dsaprep.dev
  const progression = [1, 3, 7, 14, 30, 90, 180];
  
  // If first time reviewing, interval is 1 day.
  if (!lastSolvedAt || !nextReviewAt) {
    return addDays(now, 1);
  }

  // Calculate current interval
  const diffTime = Math.abs(nextReviewAt.getTime() - lastSolvedAt.getTime());
  const currentInterval = Math.max(Math.round(diffTime / (1000 * 60 * 60 * 24)), 1);

  // Find where we are in the progression
  let currentStep = 0;
  for (let i = 0; i < progression.length; i++) {
    if (currentInterval >= progression[i]) currentStep = i;
  }

  let nextIntervalDays = 1;

  if (rating === 'Medium') {
    // Standard progression: advance one step
    nextIntervalDays = progression[Math.min(currentStep + 1, progression.length - 1)];
  } else if (rating === 'Easy') {
    // Extended interval: current interval x 1.5
    nextIntervalDays = Math.max(progression[Math.min(currentStep + 1, progression.length - 1)], Math.round(currentInterval * 1.5));
  } else if (rating === 'Hard') {
    // Shortened interval: current interval x 0.7
    nextIntervalDays = Math.max(1, Math.round(currentInterval * 0.7));
  }

  return addDays(now, nextIntervalDays);
}
