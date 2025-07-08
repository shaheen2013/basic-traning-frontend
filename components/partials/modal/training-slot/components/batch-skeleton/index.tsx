import { Skeleton } from "@/components/ui/skeleton";

export function BatchSkeleton() {
  return (
    <div className="flex flex-col gap-3 lg:gap-6">
      {/* Header section skeleton */}
      <div className="flex flex-col gap-2">
        <Skeleton className="h-8 w-3/4 lg:h-10" />
        <Skeleton className="h-5 w-full lg:h-6" />
      </div>

      {/* Radio group skeleton */}
      <div className="space-y-2">
        <div className="gap-0 overflow-y-auto max-h-[300px] lg:max-h-[400px]">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="flex items-center space-x-2 border-x border-t border-slate-300 px-6 py-4 last:border-b"
            >
              <Skeleton className="h-5 w-5 rounded-full" />
              <Skeleton className="h-5 w-48 lg:h-6 lg:w-64" />
            </div>
          ))}
        </div>
      </div>

      {/* Buttons skeleton */}
      <div className="mt-4 flex justify-between gap-4 w-full">
        <Skeleton className="h-12 rounded-full w-1/2" />
        <Skeleton className="h-12 rounded-full w-1/2" />
      </div>
    </div>
  );
}
