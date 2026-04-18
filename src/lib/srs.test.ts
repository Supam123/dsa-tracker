import { calculateNextReview, UserRating } from './srs';
import { differenceInDays, addDays } from 'date-fns';

describe('SRS Algorithm', () => {
  beforeEach(() => {
    // Mock the current date to ensure tests are deterministic
    jest.useFakeTimers().setSystemTime(new Date('2026-04-18T12:00:00.000Z'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  const now = new Date('2026-04-18T12:00:00.000Z');

  it('should return interval of 1 day for a brand new problem', () => {
    const nextDate = calculateNextReview('Medium', null, null);
    expect(differenceInDays(nextDate, now)).toBe(1);
  });

  it('should advance interval to 3 days when rating is Medium on first review (interval 1)', () => {
    const lastSolvedAt = addDays(now, -1);
    const nextReviewAt = now;
    
    const nextDate = calculateNextReview('Medium', lastSolvedAt, nextReviewAt);
    expect(differenceInDays(nextDate, now)).toBe(3);
  });

  it('should shrink interval by 0.7 when rating is Hard', () => {
    // Current interval is 10 days
    const lastSolvedAt = addDays(now, -10);
    const nextReviewAt = now;
    
    const nextDate = calculateNextReview('Hard', lastSolvedAt, nextReviewAt);
    // 10 * 0.7 = 7 days
    expect(differenceInDays(nextDate, now)).toBe(7);
  });

  it('should multiply interval by 1.5 when rating is Easy', () => {
    // Current interval is 10 days
    const lastSolvedAt = addDays(now, -10);
    const nextReviewAt = now;
    
    const nextDate = calculateNextReview('Easy', lastSolvedAt, nextReviewAt);
    // 10 * 1.5 = 15 days
    expect(differenceInDays(nextDate, now)).toBe(15);
  });

  it('should not let interval drop below 1 day on Hard rating', () => {
    const lastSolvedAt = addDays(now, -1);
    const nextReviewAt = now;
    
    const nextDate = calculateNextReview('Hard', lastSolvedAt, nextReviewAt);
    // 1 * 0.7 = 0.7 -> rounded to 1. Should be at least 1.
    expect(differenceInDays(nextDate, now)).toBe(1);
  });

  it('should cap progression intervals at the maximum step size (180 days)', () => {
    const lastSolvedAt = addDays(now, -180);
    const nextReviewAt = now;
    
    // Medium advances one step, but there is no step after 180 in standard progression
    const nextDate = calculateNextReview('Medium', lastSolvedAt, nextReviewAt);
    expect(differenceInDays(nextDate, now)).toBe(180);
  });
});
