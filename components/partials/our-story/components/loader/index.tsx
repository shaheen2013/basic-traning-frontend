import { Skeleton } from "@/components/ui/skeleton";

export const OurStorySkeleton = () => {
  return (
    <section className="container grid grid-cols-1 lg:grid-cols-2 gap-8 py-12 lg:py-32">
      {/* Left column - content */}
      <div className="flex flex-col gap-4 lg:gap-8">
        {/* Heading */}
        <Skeleton className="h-12 lg:h-24 w-48 lg:w-64 rounded-md" />

        {/* Description paragraph */}
        <Skeleton className="h-6 lg:h-12 w-full rounded-md" />
        <Skeleton className="h-6 lg:h-12 w-4/5 rounded-md" />

        {/* List items */}
        <div className="flex flex-col gap-3 lg:gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-start gap-3">
              <Skeleton className="h-5 w-5 rounded-full mt-1 lg:mt-2" />
              <Skeleton
                className={`h-6 lg:h-12 rounded-md ${
                  i === 3 ? "w-full" : "w-3/4"
                }`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Right column - image placeholder */}
      <div className="aspect-video lg:aspect-auto lg:h-full">
        <Skeleton className="w-full h-full rounded-lg" />
      </div>
    </section>
  );
};
