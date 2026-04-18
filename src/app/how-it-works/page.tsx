import { Brain, LineChart, Target, Zap, Clock, TrendingUp } from 'lucide-react';

export default function HowItWorksPage() {
  return (
    <div className="pb-12 max-w-4xl">
      <header className="mb-10">
        <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2">The Science Behind the Tracker 🧠</h1>
        <p className="text-neutral-400 text-lg">Why you keep forgetting BFS vs DFS, and how our algorithm fixes it permanently.</p>
      </header>

      <div className="space-y-12">
        {/* The Problem */}
        <section className="bg-neutral-900 border border-neutral-800 p-8 rounded-2xl relative overflow-hidden group hover:border-pink-500/30 transition-colors">
          <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
          
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-pink-500/10 p-3 rounded-xl text-pink-400">
              <TrendingUp className="w-6 h-6 transform rotate-90" />
            </div>
            <h2 className="text-2xl font-bold text-white">The Forgetting Curve</h2>
          </div>
          
          <p className="text-neutral-300 leading-relaxed text-lg mb-6">
            You spend 45 minutes finally understanding how to implement a Trie. You close the tab feeling like a genius. A week later during an interview, you&apos;re asked to build one. Your mind goes completely blank. 
          </p>
          <p className="text-neutral-300 leading-relaxed text-lg">
            This is the <strong className="text-white">Ebbinghaus Forgetting Curve</strong> in action. Without active recall, human beings lose up to 75% of new information within just 48 hours. When studying Data Structures & Algorithms, cramming before an interview guarantees you will blank out on the patterns you need most.
          </p>
        </section>

        {/* The Solution */}
        <section className="bg-neutral-900 border border-neutral-800 p-8 rounded-2xl relative overflow-hidden group hover:border-indigo-500/30 transition-colors">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
          
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-indigo-500/10 p-3 rounded-xl text-indigo-400">
              <Brain className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-white">Spaced Repetition System (SRS)</h2>
          </div>
          
          <p className="text-neutral-300 leading-relaxed text-lg mb-6">
            Spaced Repetition is a highly efficient learning technique that times your reviews exactly when you are about to forget the material. Each time you successfully recall a concept, the memory trace becomes stronger, and the interval until your next review gets longer.
          </p>
          <p className="text-neutral-300 leading-relaxed text-lg mb-6">
            Instead of solving Two Sum 10 times in a week, you solve it today, then in 3 days, then in 7 days, and eventually, in 6 months. By optimizing review intervals, you spend significantly less time studying while maximizing long-term retention of underlying <strong className="text-indigo-300">problem patterns</strong>.
          </p>
        </section>

        {/* The Algorithm */}
        <section className="bg-neutral-900 border border-neutral-800 p-8 rounded-2xl relative overflow-hidden group hover:border-emerald-500/30 transition-colors">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
          
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-emerald-500/10 p-3 rounded-xl text-emerald-400">
              <Zap className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-white">Our Smart Algorithm</h2>
          </div>
          
          <p className="text-neutral-300 leading-relaxed text-lg mb-6">
            When you complete a problem, our app asks you to rate how difficult it was. Based on your honest feedback, we recalculate exactly when you should see it again.
          </p>
          
          <div className="space-y-4">
            <div className="bg-neutral-950 border border-neutral-800 p-5 rounded-xl flex gap-4">
              <div className="shrink-0 pt-1">
                <span className="bg-amber-500/10 text-amber-400 px-3 py-1 text-sm font-bold rounded-lg uppercase tracking-wider">Medium</span>
              </div>
              <div>
                <p className="text-white font-semibold mb-1">Standard Progression</p>
                <p className="text-neutral-400 text-sm">You got it, but it required some thinking. We push you to the next standard interval: <span className="font-mono text-cyan-400">1 → 3 → 7 → 14 → 30 → 90 → 180</span> days.</p>
              </div>
            </div>
            
            <div className="bg-neutral-950 border border-neutral-800 p-5 rounded-xl flex gap-4">
              <div className="shrink-0 pt-1">
                <span className="bg-emerald-500/10 text-emerald-400 px-3 py-1 text-sm font-bold rounded-lg uppercase tracking-wider">Easy</span>
              </div>
              <div>
                <p className="text-white font-semibold mb-1">Accelerated Progression</p>
                <p className="text-neutral-400 text-sm">The pattern is obvious to you. We aggressively expand the interval by multiplying your current gap by <span className="font-mono text-cyan-400">1.5x</span>, getting it out of your way faster.</p>
              </div>
            </div>

            <div className="bg-neutral-950 border border-neutral-800 p-5 rounded-xl flex gap-4">
              <div className="shrink-0 pt-1">
                <span className="bg-rose-500/10 text-rose-400 px-3 py-1 text-sm font-bold rounded-lg uppercase tracking-wider">Hard</span>
              </div>
              <div>
                <p className="text-white font-semibold mb-1">Safety Net</p>
                <p className="text-neutral-400 text-sm">You had to look at the solution to figure it out. We shrink the interval by <span className="font-mono text-cyan-400">30%</span> to ensure you see it sooner and solidify the concept.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
