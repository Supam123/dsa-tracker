# Open Source DSA Tracker

A fully free, local-first Spaced Repetition System (SRS) for tracking your Data Structures and Algorithms prep.

## The Story

I was originally using a website called [dsaprep.dev/tracker](https://www.dsaprep.dev/tracker) to track my LeetCode progress using spaced repetition. It was great, right up until I hit 50 problems. At that point, I hit a paywall.

I hated that. I didn't want to pay a monthly subscription just for tracking my study habits and revising concepts. The logic for spaced repetition isn't a secret, and locking basic study tools behind a paywall didn't sit right with me.

**Learning should be accessible.**

So, I built my own version. It has the exact same functionality, the exact same spaced-repetition tracking, but completely free and open-source. Your data lives in your browser's local storage, meaning you own it forever. No subscriptions, no limits, no paywalls.

## Features

- **Spaced Repetition Algorithm**: Automatically schedules problems for review based on how difficult you found them (Easy, Medium, Hard).
- **Unlimited Tracking**: Track as many of the NeetCode 150 (or any other) problems as you want.
- **Local-First Storage**: All data is saved securely in your browser's Local Storage. No backend, no accounts, and most importantly, no data limits.
- **Action Items Queue**: A clean dashboard showing exactly what you need to review today and what's overdue.
- **Upcoming Schedule**: Visualize your review load for the next 7 days so you can plan your study sessions.

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Storage**: Browser Local Storage

## Getting Started

Because this is a completely static, front-end application, running it locally is incredibly simple:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/dsa-tracker.git
   cd dsa-tracker
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open the app:**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

Since this app uses Local Storage and has no backend database, you can host it entirely for free on platforms like [Vercel](https://vercel.com) or [Netlify](https://netlify.com).

Just import the GitHub repository into Vercel, click "Deploy", and you'll have a live URL in seconds.

---

*Because paying to track your learning is ridiculous.*
