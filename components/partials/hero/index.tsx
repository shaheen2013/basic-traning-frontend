/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import Header from "../header";
import { ArrowUpRight } from "@/components/icons";
import { HeroSkeleton } from "./components/loader";
import TrainingSlot from "../modal/training-slot";

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
        <div className="container flex flex-col items-start justify-center gap-12 py-10 lg:py-20 min-h-[calc(100dvh-120px)]">
          <div className="flex flex-col gap-4 lg:gap-6 max-w-[1098px]">
            <p className="text-3xl font-medium text-slate-50">
              Start training for <span className="font-bold">$549</span>
            </p>
            <h2 className="text-white font-semibold italic font-vollkorn text-5xl lg:text-8xl leading-[60px] lg:leading-[120px]">
              {data?.title}
            </h2>
            <p className="text-base lg:text-4xl text-slate-50 font-normal">
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
      )}
    </div>
  );
};

export default Hero;
