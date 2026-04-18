'use client';

import { ExternalLink, Check, Brain, Clock, PlusCircle, Calendar } from 'lucide-react';
import { useProblems } from '@/hooks/useProblems';
import { UserRating } from '@/lib/srs';

export default function DashboardClient() {
  const { problems, isLoaded, submitReview, startProblem } = useProblems();

  if (!isLoaded) {
    return <div className="text-neutral-400 text-center py-20">Loading your progress...</div>;
  }

  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
  const todayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);

  // Derive queue and overdue
  const queue = problems.filter(p => {
    if (p.status !== 'Reviewing' || !p.nextReviewAt) return false;
    const reviewDate = new Date(p.nextReviewAt);
    return reviewDate <= todayEnd;
  }).sort((a, b) => new Date(a.nextReviewAt!).getTime() - new Date(b.nextReviewAt!).getTime());

  const overdue = queue.filter(p => new Date(p.nextReviewAt!) < todayStart);

  const totalProgress = problems.filter(p => p.status === 'Reviewing' || p.status === 'Mastered').length;

  // Derive upcoming 7 days
  const upcomingDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(todayStart);
    d.setDate(d.getDate() + i + 1); // tomorrow is i=0
    return d;
  });

  const upcomingData = upcomingDays.map(date => {
    const start = new Date(date);
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    const count = problems.filter(p => {
      if (p.status !== 'Reviewing' || !p.nextReviewAt) return false;
      const reviewDate = new Date(p.nextReviewAt);
      return reviewDate >= start && reviewDate <= end;
    }).length;

    return {
      date: start,
      count
    };
  });

  return (
    <div className="space-y-8">
      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl shadow-xl flex items-center justify-between group hover:border-indigo-500/50 transition duration-300">
          <div>
            <p className="text-neutral-400 text-sm font-medium uppercase tracking-wider mb-1">Due Today</p>
            <h3 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">{queue.length}</h3>
          </div>
          <div className="bg-indigo-500/10 p-4 rounded-full group-hover:scale-110 transition-transform">
            <Brain className="w-8 h-8 text-indigo-400" />
          </div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl shadow-xl flex items-center justify-between group hover:border-pink-500/50 transition duration-300">
          <div>
            <p className="text-neutral-400 text-sm font-medium uppercase tracking-wider mb-1">Overdue</p>
            <h3 className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">{overdue.length}</h3>
          </div>
          <div className="bg-pink-500/10 p-4 rounded-full group-hover:scale-110 transition-transform">
            <Clock className="w-8 h-8 text-pink-400" />
          </div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl shadow-xl flex items-center justify-between group hover:border-emerald-500/50 transition duration-300">
          <div>
            <p className="text-neutral-400 text-sm font-medium uppercase tracking-wider mb-1">Total Progress</p>
            <h3 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">{totalProgress} / 150</h3>
          </div>
          <div className="bg-emerald-500/10 p-4 rounded-full group-hover:scale-110 transition-transform">
            <Check className="w-8 h-8 text-emerald-400" />
          </div>
        </div>
      </div>

      {/* Review Queue */}
      <div>
        <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
          <Brain className="text-indigo-400" />
          Action Items Queue
        </h2>

        {queue.length === 0 ? (
          <div className="bg-neutral-900/50 border border-neutral-800 border-dashed rounded-2xl p-12 text-center text-neutral-400">
            <Check className="w-16 h-16 text-emerald-500 mx-auto mb-4 opacity-50" />
            <p className="text-xl font-medium text-white mb-2">You&apos;re all caught up!</p>
            <p>No problems are due for review. Go to the Problems tab to start new ones.</p>
          </div>
        ) : (
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="max-h-[500px] overflow-y-auto divide-y divide-neutral-800/60 scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-transparent">
              {queue.map(problem => {
                const isOverdueDate = new Date(problem.nextReviewAt!) < todayStart;

                return (
                  <div key={problem.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 hover:bg-neutral-800/30 transition-colors gap-4">
                    <div className="flex items-center gap-4 flex-1">
                      <span className={`shrink-0 w-[72px] text-center px-2 py-1 text-[11px] font-bold uppercase rounded-md tracking-wider ${problem.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-400' :
                          problem.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-400' :
                            'bg-rose-500/10 text-rose-400'
                        }`}>
                        {problem.difficulty}
                      </span>

                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-base font-bold text-white">{problem.title}</h3>
                          {isOverdueDate && (
                            <span className="flex items-center gap-1 text-[10px] text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                              <Clock className="w-3 h-3" /> Overdue
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-sm text-neutral-400 font-medium">
                          <span className="text-neutral-500">{problem.pattern}</span>
                          {problem.leetcodeUrl && (
                            <>
                              <span className="w-1 h-1 rounded-full bg-neutral-700"></span>
                              <a href={problem.leetcodeUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-indigo-400 transition-colors">
                                LeetCode <ExternalLink className="w-3 h-3" />
                              </a>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center">
                      {problem.status === 'To Do' ? (
                        <button
                          onClick={() => startProblem(problem.id)}
                          className="w-full sm:w-auto flex justify-center items-center gap-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-sm font-semibold transition-colors shadow-sm"
                        >
                          <PlusCircle className="w-4 h-4" /> Start Reviewing
                        </button>
                      ) : (
                        <div className="flex gap-2">
                          <button
                            onClick={() => submitReview(problem.id, 'Hard')}
                            className="px-4 py-2 rounded-lg text-sm font-bold bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-colors shadow-sm"
                          >
                            Hard
                          </button>
                          <button
                            onClick={() => submitReview(problem.id, 'Medium')}
                            className="px-4 py-2 rounded-lg text-sm font-bold bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 transition-colors shadow-sm"
                          >
                            Medium
                          </button>
                          <button
                            onClick={() => submitReview(problem.id, 'Easy')}
                            className="px-4 py-2 rounded-lg text-sm font-bold bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-colors shadow-sm"
                          >
                            Easy
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Upcoming 7 Days Schedule */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
          <Calendar className="w-6 h-6 text-cyan-400" />
          Upcoming 7 Days
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {upcomingData.map((day, idx) => (
            <div key={idx} className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl flex flex-col items-center justify-center hover:border-cyan-500/30 transition-colors">
              <span className="text-neutral-400 text-sm font-medium mb-1">
                {day.date.toLocaleDateString('en-US', { weekday: 'short' })}
              </span>
              <span className="text-neutral-500 text-xs mb-3">
                {day.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </span>
              <span className={`text-3xl font-bold ${day.count > 0 ? 'bg-gradient-to-br from-cyan-400 to-blue-500 bg-clip-text text-transparent' : 'text-neutral-700'}`}>
                {day.count}
              </span>
              <span className="text-xs text-neutral-500 mt-2 uppercase tracking-widest font-semibold">
                Tasks
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
