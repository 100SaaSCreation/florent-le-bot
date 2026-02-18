"use client";

import { motion } from "framer-motion";

export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <motion.div
      className={`rounded bg-white/10 ${className}`}
      initial={{ opacity: 0.5 }}
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

export function DashboardSkeleton() {
  return (
    <div className="min-h-screen px-4 py-8" style={{ backgroundColor: "var(--background)" }}>
      <main className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-7 w-28" />
        </div>
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {[1, 2, 3].map((i) => (
            <div key={i} className="glass-card p-5">
              <Skeleton className="h-3 w-24 mb-2" />
              <Skeleton className="h-8 w-16" />
            </div>
          ))}
        </section>
        <section>
          <Skeleton className="h-6 w-32 mb-4" />
          <ul className="space-y-4">
            {[1, 2, 3].map((i) => (
              <li key={i} className="glass-card p-4">
                <Skeleton className="h-4 w-48 mb-2" />
                <Skeleton className="h-3 w-full mb-2" />
                <Skeleton className="h-12 w-full" />
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

export function AdminPageSkeleton() {
  return (
    <div className="min-h-screen px-4 py-8" style={{ backgroundColor: "var(--background)" }}>
      <main className="max-w-3xl mx-auto">
        <Skeleton className="h-7 w-24 mb-2" />
        <Skeleton className="h-4 w-64 mb-8" />
        <Skeleton className="h-10 w-full mb-2" />
        <Skeleton className="h-10 w-full mb-2" />
        <Skeleton className="h-20 w-full mb-6" />
        <Skeleton className="h-12 w-24 mb-10" />
        <Skeleton className="h-6 w-32 mb-4" />
        <ul className="space-y-4">
          {[1, 2].map((i) => (
            <li key={i} className="border border-stone-200 bg-white/5 p-4 rounded">
              <Skeleton className="h-5 w-48 mb-2" />
              <Skeleton className="h-4 w-full" />
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
