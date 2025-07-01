import { UpcomingEventsSkeleton } from "@/components/partials/upcoming-events/components/loader";
import { Skeleton } from "@/components/ui/skeleton";

export const AboutBasicTrainingSkeleton = () => {
  return (
    <section className="container grid grid-cols-1 lg:grid-cols-2 gap-8 py-12 lg:py-32">
      {/* Left column - content */}
      <div className="flex flex-col gap-4 lg:gap-8">
        {/* Heading skeleton */}
        <Skeleton className="h-12 lg:h-24 w-3/4 rounded-md" />

        {/* Description paragraph skeleton */}
        <Skeleton className="h-6 lg:h-12 w-full rounded-md" />

        {/* List items skeleton */}
        <div className="flex flex-col gap-3 lg:gap-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="h-5 w-5 rounded-full" />
              <Skeleton className="h-6 lg:h-12 w-4/5 rounded-md" />
            </div>
          ))}
        </div>

        {/* Button skeleton */}
        <Skeleton className="h-14 w-full lg:w-48 rounded-full mt-4" />
      </div>

      {/* Right column - upcoming events skeleton */}
      <UpcomingEventsSkeleton />
    </section>
  );
};
