"use client";

import { Skeleton } from "@/components/ui/skeleton";

export const FooterSkeleton = () => {
  return (
    <footer className="bg-gray-800 py-6 lg:py-16">
      <div className="container flex flex-col gap-8 lg:gap-12">
        {/* Top section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Logo */}

          <Skeleton className="order-1 h-12 w-48 rounded-md" />

          {/* Navigation links */}
          <div className="order-3 lg:order-2 flex flex-wrap items-center gap-4 lg:gap-8">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-6 w-16 lg:w-20 rounded-md" />
            ))}
          </div>

          {/* Social icons */}
          <div className="order-2 lg:order-3 flex gap-4 items-center lg:justify-end">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="size-6 rounded-full" />
            ))}
          </div>
        </div>

        {/* Divider */}
        <Skeleton className="h-px w-full" />

        {/* Bottom section */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12">
          <Skeleton className="h-6 w-64 rounded-md" />
          <div className="space-y-2">
            <Skeleton className="h-5 w-full rounded-md" />
            <Skeleton className="h-5 w-full rounded-md" />
            <Skeleton className="h-5 w-4/5 rounded-md" />
          </div>
        </div>
      </div>
    </footer>
  );
};
