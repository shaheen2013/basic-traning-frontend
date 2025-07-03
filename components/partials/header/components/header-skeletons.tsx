"use client";

import { Skeleton } from "@/components/ui/skeleton";

export const HeaderSkeleton = () => {
  return (
    <div className="container flex justify-between items-center relative py-4 lg:py-8">
      {/* Logo skeleton */}

      <Skeleton className="h-12 w-48 rounded-md" />

      {/* Navigation links skeleton - hidden on mobile */}
      <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 gap-12">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-6 w-20 rounded-md" />
        ))}
      </div>

      {/* Right side buttons skeleton */}
      <div className="flex gap-3 items-center">
        {/* Login/Account skeleton */}
        <Skeleton className="h-10 w-20 lg:w-24 rounded-md" />

        {/* CTA button skeleton - hidden on mobile */}
        <div className="hidden lg:flex">
          <Skeleton className="h-12 w-48 rounded-full" />
        </div>

        {/* Mobile menu button skeleton */}
        <Skeleton className="lg:hidden h-10 w-10 rounded-lg" />
      </div>
    </div>
  );
};
