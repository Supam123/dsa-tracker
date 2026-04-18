'use client';

import { useState, useEffect } from 'react';
import initialProblemsData from '@/data/problems.json';
import { calculateNextReview, UserRating } from '@/lib/srs';

export type ProblemStatus = 'To Do' | 'Reviewing' | 'Mastered';

export type TrackedData = {
  status: ProblemStatus;
  lastSolvedAt: string | null;
  nextReviewAt: string | null;
};

export type FullProblem = {
  id: number;
  title: string;
  leetcodeUrl: string;
  difficulty: string;
  pattern: string;
} & TrackedData;

export function useProblems() {
  const [problems, setProblems] = useState<FullProblem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load from localStorage
    const stored = localStorage.getItem('dsaTrackerData');
    const trackingMap = stored ? JSON.parse(stored) : {};

    const merged = initialProblemsData.map((p: any) => ({
      ...p,
      status: trackingMap[p.id]?.status || 'To Do',
      lastSolvedAt: trackingMap[p.id]?.lastSolvedAt || null,
      nextReviewAt: trackingMap[p.id]?.nextReviewAt || null,
    }));

    setProblems(merged);
    setIsLoaded(true);
  }, []);

  const saveToStorage = (updatedProblems: FullProblem[]) => {
    const trackingMap: Record<string, TrackedData> = {};
    for (const p of updatedProblems) {
      if (p.status !== 'To Do' || p.lastSolvedAt) {
        trackingMap[p.id] = {
          status: p.status,
          lastSolvedAt: p.lastSolvedAt,
          nextReviewAt: p.nextReviewAt,
        };
      }
    }
    localStorage.setItem('dsaTrackerData', JSON.stringify(trackingMap));
    setProblems(updatedProblems);
  };

  const updateProblem = (id: number, updates: Partial<TrackedData>) => {
    const updated = problems.map(p => {
      if (p.id === id) {
        return { ...p, ...updates };
      }
      return p;
    });
    saveToStorage(updated);
  };

  const submitReview = (id: number, rating: UserRating) => {
    const p = problems.find(x => x.id === id);
    if (!p) return;

    const lastDate = p.lastSolvedAt ? new Date(p.lastSolvedAt) : null;
    const nextDate = p.nextReviewAt ? new Date(p.nextReviewAt) : null;

    const newNextReviewAt = calculateNextReview(rating, lastDate, nextDate);

    updateProblem(id, {
      status: 'Reviewing',
      lastSolvedAt: new Date().toISOString(),
      nextReviewAt: newNextReviewAt.toISOString(),
    });
  };

  const startProblem = (id: number) => {
    const nextDay = new Date();
    nextDay.setDate(nextDay.getDate() + 1);

    updateProblem(id, {
      status: 'Reviewing',
      lastSolvedAt: new Date().toISOString(),
      nextReviewAt: nextDay.toISOString(),
    });
  };

  return {
    problems,
    isLoaded,
    updateProblem,
    submitReview,
    startProblem
  };
}
