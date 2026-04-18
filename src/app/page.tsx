'use client';

import DashboardClient from '@/components/DashboardClient';

export default function Dashboard() {
  return (
    <div className="pb-12">
      <header className="mb-10">
        <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2">Welcome Back! ✨</h1>
        <p className="text-neutral-400 text-lg">Ready to crush some DSA problems today?</p>
      </header>
      
      <DashboardClient />
    </div>
  );
}
