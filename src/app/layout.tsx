import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { BrainCircuit, Library, LayoutDashboard, Lightbulb } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NeetCode SRS Tracker",
  description: "Spaced Repetition System for DSA Problems",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar */}
          <aside className="w-64 border-r border-neutral-800 bg-neutral-900/50 p-6 flex flex-col gap-8">
            <div className="flex items-center gap-3 text-indigo-400 font-bold text-xl tracking-tight">
              <BrainCircuit className="w-7 h-7" />
              <span>DSA Tracker</span>
            </div>
            
            <nav className="flex flex-col gap-2">
              <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors group">
                <LayoutDashboard className="w-5 h-5 group-hover:text-indigo-400 transition-colors" />
                <span className="font-medium">Dashboard</span>
              </Link>
              <Link href="/problems" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors group">
                <Library className="w-5 h-5 group-hover:text-pink-400 transition-colors" />
                <span className="font-medium">Problems</span>
              </Link>
              <Link href="/how-it-works" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors group">
                <Lightbulb className="w-5 h-5 group-hover:text-amber-400 transition-colors" />
                <span className="font-medium">How It Works</span>
              </Link>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto bg-neutral-950 p-8">
            <div className="max-w-5xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
