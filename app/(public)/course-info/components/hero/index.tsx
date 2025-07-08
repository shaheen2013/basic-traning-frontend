/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "@/components/icons";
import { Header, TrainingSlot } from "@/components/partials";
import { HeroSkeleton } from "./components/loader";

const Hero = ({
  isLoading,
  data,
  batches,
}: {
  isLoading: boolean;
  data: any;
  batches: any;
}) => {
  return (
    <div
      className="w-full min-h-dvh"
      style={{
        background: `linear-gradient(90deg, rgba(20, 23, 42, 0.80) 0%, rgba(0, 0, 0, 0.00) 100%), 
                 linear-gradient(0deg, rgba(26, 26, 26, 0.40) 0%, rgba(26, 26, 26, 0.40) 100%), 
                 url(${data?.image}) lightgray 50% / cover no-repeat`,
      }}
    >
      <Header batches={batches} />
      {isLoading ? (
        <HeroSkeleton />
      ) : (
        <div className="container flex items-center py-10 lg:py-20 min-h-[calc(100dvh-120px)]">
          <div className="flex flex-col gap-12 items-start">
            <div className="flex flex-col gap-6 max-w-[1068px]">
              <h2 className="text-white font-semibold text-5xl lg:text-7xl">
                {data?.title}
              </h2>
              <p className="text-base lg:text-4xl text-slate-50 font-medium">
                {data?.description}
              </p>
            </div>
            <TrainingSlot batches={batches}>
              <Button
                variant="outline"
                className="rounded-full w-full lg:w-fit text-white"
                size="2xl"
              >
                Enroll Now
                <ArrowUpRight />
              </Button>
            </TrainingSlot>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
