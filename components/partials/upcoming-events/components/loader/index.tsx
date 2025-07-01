import { Skeleton } from "@/components/ui/skeleton";

export const UpcomingEventsSkeleton = () => {
  return (
    <div className="rounded-2xl bg-slate-50 border border-blue-200 overflow-hidden h-fit">
      {/* Header section skeleton */}
      <div className="bg-blue-200 px-6 py-4 flex flex-col lg:flex-row gap-4 w-full justify-between lg:items-center">
        <Skeleton className="h-8 lg:h-10 w-48 rounded-md" />
        <Skeleton className="h-10 w-32 rounded-full" />
      </div>

      {/* Events list skeleton */}
      <ul className="[&>*:nth-child(odd)]:bg-white [&>*:nth-child(even)]:bg-slate-50">
        {[...Array(7)].map((_, i) => (
          <li
            key={i}
            className="px-6 py-3 lg:py-4 border-b border-slate-100 flex items-center"
          >
            <Skeleton className="h-6 lg:h-8 w-full rounded-md" />
          </li>
        ))}
      </ul>
    </div>
  );
};
