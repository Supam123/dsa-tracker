'use client';

import ProblemsClient from '@/components/ProblemsClient';

export default function ProblemsPage() {
  return (
    <div className="pb-12">
      <header className="mb-10">
        <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2">Problem Library 📚</h1>
        <p className="text-neutral-400 text-lg">Manage all your NeetCode 150 problems here.</p>
      </header>
      
      <ProblemsClient />
    </div>
  );
}
