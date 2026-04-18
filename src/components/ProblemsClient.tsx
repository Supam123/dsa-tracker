'use client';

import { useState } from 'react';
import { ExternalLink, CheckCircle, Circle, ArrowRight, Search, ChevronDown } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useProblems } from '@/hooks/useProblems';

export default function ProblemsClient() {
  const { problems, isLoaded, updateProblem, startProblem } = useProblems();
  const [filterPattern, setFilterPattern] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isPatternOpen, setIsPatternOpen] = useState(false);

  if (!isLoaded) {
    return <div className="text-neutral-400 text-center py-20">Loading your library...</div>;
  }

  const patterns = Array.from(new Set(problems.map(p => p.pattern)));

  const toggleStatus = (id: number, currentStatus: string) => {
    if (currentStatus === 'To Do') {
      startProblem(id);
    } else {
      updateProblem(id, { status: 'To Do', lastSolvedAt: null, nextReviewAt: null });
    }
  };

  const filteredProblems = problems.filter(p => {
    if (filterPattern && p.pattern !== filterPattern) return false;
    if (filterDifficulty && p.difficulty !== filterDifficulty) return false;
    if (searchQuery && !p.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
            <input 
              type="text"
              placeholder="Search NeetCode 150 problems..."
              className="w-full bg-neutral-900 border border-neutral-800 text-white rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-sm"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Custom Pattern Dropdown */}
            <div className="relative z-20">
              <button 
                onClick={() => setIsPatternOpen(!isPatternOpen)}
                className="flex items-center justify-between gap-3 bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-sm font-semibold text-white hover:border-neutral-700 transition-all w-full sm:w-56 shadow-sm"
              >
                <span className="truncate">{filterPattern || 'All Patterns'}</span>
                <ChevronDown className={`w-4 h-4 text-neutral-400 shrink-0 transition-transform ${isPatternOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isPatternOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setIsPatternOpen(false)}></div>
                  <div className="absolute top-full left-0 mt-2 w-full sm:w-64 max-h-80 overflow-y-auto bg-neutral-900 border border-neutral-800 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] z-20 py-2 scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-transparent">
                    <button
                      onClick={() => { setFilterPattern(''); setIsPatternOpen(false); }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${filterPattern === '' ? 'bg-indigo-500/10 text-indigo-400 font-bold' : 'text-neutral-300 hover:bg-neutral-800 hover:text-white'}`}
                    >
                      All Patterns
                    </button>
                    {patterns.map((pat: any) => (
                      <button
                        key={pat}
                        onClick={() => { setFilterPattern(pat); setIsPatternOpen(false); }}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${filterPattern === pat ? 'bg-indigo-500/10 text-indigo-400 font-bold' : 'text-neutral-300 hover:bg-neutral-800 hover:text-white'}`}
                      >
                        {pat}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Difficulty Segmented Control */}
            <div className="flex bg-neutral-900 border border-neutral-800 rounded-xl p-1 shrink-0 overflow-x-auto">
              {['All', 'Easy', 'Medium', 'Hard'].map(diff => (
                <button
                  key={diff}
                  onClick={() => setFilterDifficulty(diff === 'All' ? '' : diff)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
                    (filterDifficulty === diff || (filterDifficulty === '' && diff === 'All'))
                      ? 'bg-neutral-800 text-white shadow-sm' 
                      : 'text-neutral-500 hover:text-neutral-300 hover:bg-neutral-800/50'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-neutral-950/50 border-b border-neutral-800 text-neutral-400 text-sm uppercase tracking-wider">
                <th className="p-4 font-semibold w-12 text-center">Status</th>
                <th className="p-4 font-semibold">Title</th>
                <th className="p-4 font-semibold text-center w-32">Difficulty</th>
                <th className="p-4 font-semibold">Pattern</th>
                <th className="p-4 font-semibold">Next Review</th>
                <th className="p-4 font-semibold text-center">Link</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/80">
              {filteredProblems.map(problem => (
                <tr key={problem.id} className="hover:bg-neutral-800/20 transition-colors group">
                  <td className="p-4 text-center">
                    <button onClick={() => toggleStatus(problem.id, problem.status)} className="focus:outline-none hover:scale-110 transition-transform">
                      {problem.status === 'Reviewing' ? (
                        <ArrowRight className="w-6 h-6 text-indigo-400" />
                      ) : problem.status === 'Mastered' ? (
                        <CheckCircle className="w-6 h-6 text-emerald-400" />
                      ) : (
                        <Circle className="w-6 h-6 text-neutral-600" />
                      )}
                    </button>
                  </td>
                  <td className="p-4 font-medium text-white">{problem.title}</td>
                  <td className="p-4 text-center">
                    <span className={`px-2.5 py-1 text-xs font-bold uppercase rounded-full tracking-wide ${
                        problem.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-400' :
                        problem.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-400' :
                        'bg-rose-500/10 text-rose-400'
                      }`}>
                      {problem.difficulty}
                    </span>
                  </td>
                  <td className="p-4 text-neutral-400 text-sm">{problem.pattern}</td>
                  <td className="p-4 text-neutral-400 text-sm">
                    {problem.nextReviewAt ? (
                      new Date(problem.nextReviewAt) < new Date() ? (
                        <span className="text-rose-400 font-medium">Due Now</span>
                      ) : (
                        formatDistanceToNow(new Date(problem.nextReviewAt), { addSuffix: true })
                      )
                    ) : (
                      <span className="opacity-50">-</span>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    {problem.leetcodeUrl && (
                      <a href={problem.leetcodeUrl} target="_blank" rel="noopener noreferrer" className="inline-block p-2 hover:bg-neutral-800 rounded-lg text-indigo-400 transition-colors">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
