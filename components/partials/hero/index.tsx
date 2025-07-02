/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import Header from "../header";
import { ArrowUpRight } from "@/components/icons";
import Link from "next/link";
import { HeroSkeleton } from "./components/loader";

const Hero = ({ isLoading, data }: { isLoading: boolean; data: any }) => {
  if (isLoading) return <HeroSkeleton />;
  return (
    <div
      className="w-full min-h-dvh"
      style={{
        background: `linear-gradient(0deg, rgba(5, 6, 33, 0.50) 0%, rgba(5, 6, 33, 0.50) 100%), url(${
          data.image || "/assets/landing-page/background-image.png"
        }) lightgray 50% / cover no-repeat`,
      }}
    >
      <Header />
      <div className="container flex flex-col items-start justify-center gap-12 py-10 lg:py-20 min-h-[calc(100dvh-120px)]">
        <div className="flex flex-col gap-4 lg:gap-6 max-w-[1098px]">
          <p className="text-3xl font-medium text-slate-50">
            Start training for <span className="font-bold">$549</span>
          </p>
          <h2 className="text-white font-semibold italic font-vollkorn text-5xl lg:text-8xl leading-[60px] lg:leading-[120px]">
            {data.title}
          </h2>
          <p className="text-base lg:text-4xl text-slate-50 font-normal">
            {data.description}
          </p>
        </div>
        <Button
          variant="outline"
          className="border border-slate-200 text-white rounded-full w-full lg:w-fit"
          size="2xl"
          asChild
        >
          <Link href="/course-info">
            Upcoming Sessions
            <ArrowUpRight className="ml-3 text-white" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Hero;
