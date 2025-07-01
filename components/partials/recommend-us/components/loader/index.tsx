"use client";

import { Skeleton } from "@/components/ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export const RecommendUsSkeleton = () => {
  return (
    <section id="reviews" className="py-12 lg:py-32 bg-slate-50">
      <div className="container flex justify-center flex-col gap-y-8 lg:gap-y-24">
        {/* Heading skeleton */}
        <Skeleton className="h-12 lg:h-24 w-3/4 mx-auto rounded-md" />

        {/* Carousel skeleton */}
        <Carousel>
          <CarouselContent>
            {[...Array(3)].map((_, index) => (
              <CarouselItem key={index}>
                <div className="flex flex-row gap-x-28">
                  {/* Quote image skeleton - hidden on mobile */}
                  <Skeleton className="size-28 rounded-lg hidden lg:block shrink-0" />

                  {/* Testimonial content */}
                  <div className="flex flex-col gap-y-6 lg:gap-y-12 w-full">
                    {/* Rating stars */}
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Skeleton
                          key={i}
                          className="size-4 lg:size-8 rounded-full mr-2"
                        />
                      ))}
                      <Skeleton className="h-6 lg:h-10 w-16 ml-3 rounded-md" />
                    </div>

                    {/* Testimonial text */}
                    <div className="space-y-2">
                      <Skeleton className="h-6 lg:h-10 w-full rounded-md" />
                      <Skeleton className="h-6 lg:h-10 w-4/5 rounded-md" />
                      <Skeleton className="h-6 lg:h-10 w-3/4 rounded-md" />
                    </div>

                    {/* Author info */}
                    <div className="flex items-center gap-x-4">
                      <Skeleton className="size-16 lg:size-20 rounded-full shrink-0" />
                      <div className="flex flex-col gap-y-1 lg:gap-y-2 w-full">
                        <Skeleton className="h-6 lg:h-8 w-32 lg:w-48 rounded-md" />
                        <Skeleton className="h-5 lg:h-6 w-48 lg:w-64 rounded-md" />
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselDots />
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};
