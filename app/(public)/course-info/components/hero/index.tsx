import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "@/components/icons";
import { Header, TrainingSlot } from "@/components/partials";
import { HeroSkeleton } from "./components/loader";

const Hero = ({ isLoading }: { isLoading: boolean }) => {
  if (isLoading) return <HeroSkeleton />;
  return (
    <div
      className="w-full min-h-dvh"
      style={{
        background: `linear-gradient(90deg, rgba(20, 23, 42, 0.80) 0%, rgba(0, 0, 0, 0.00) 100%), 
                 linear-gradient(0deg, rgba(26, 26, 26, 0.40) 0%, rgba(26, 26, 26, 0.40) 100%), 
                 url(${"/assets/course-info/background.png"}) lightgray 50% / cover no-repeat`,
      }}
    >
      <Header />
      <div className="container flex flex-col gap-12 items-start justify-end py-10 lg:py-20 min-h-[calc(100dvh-120px)]">
        <div className="flex flex-col gap-6 max-w-[1068px]">
          <h2 className="text-white font-semibold text-5xl lg:text-7xl">
            Start Your Training for Just $549 – One-Time Fee!
          </h2>
          <p className="text-base lg:text-4xl text-slate-50 font-medium">
            Get hands-on learning with live Zoom sessions, expert guidance, and
            daily progress tracking.
          </p>
        </div>
        <TrainingSlot>
          <Button
            variant="outline"
            className="border border-slate-200 text-white rounded-full w-full lg:w-fit"
            size="2xl"
          >
            Book Session
            <ArrowUpRight className="ml-3 text-white" />
          </Button>
        </TrainingSlot>
      </div>
    </div>
  );
};

export default Hero;
