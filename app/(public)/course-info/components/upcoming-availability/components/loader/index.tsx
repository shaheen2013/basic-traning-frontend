import { Skeleton } from "@/components/ui/skeleton";

export const UpcomingAvailabilitySkeleton = () => {
  return (
    <section className="container max-w-4xl flex flex-col justify-center items-center gap-8 lg:gap-16 py-12 lg:py-32">
      {/* Heading skeleton */}
      <Skeleton className="h-10 lg:h-18 w-3/4 rounded-md" />

      {/* Availability card skeleton */}
      <div className="border border-slate-300 overflow-hidden h-fit w-full">
        {/* Card header */}
        <div className="bg-slate-200 px-6 py-4">
          <Skeleton className="h-6 w-24 rounded-md" />
        </div>

        {/* Availability list */}
        <ul className="[&>*:nth-child(odd)]:bg-white [&>*:nth-child(even)]:bg-slate-50">
          {[...Array(8)].map((_, i) => (
            <li
              key={i}
              className="px-6 py-3 lg:py-4 border-b border-slate-100 flex items-center"
            >
              <Skeleton className="h-6 w-full rounded-md" />
            </li>
          ))}
        </ul>
      </div>

      {/* Button skeleton */}
      <Skeleton className="h-14 w-full lg:w-80 rounded-full" />
    </section>
  );
};
