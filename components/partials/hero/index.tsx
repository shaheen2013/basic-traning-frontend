import { Button } from "@/components/ui/button";
import Header from "../header";
import { ArrowUpRight } from "@/components/icons";

const Hero = () => {
  return (
    <div
      className="w-full h-dvh"
      style={{
        background: `linear-gradient(0deg, rgba(5, 6, 33, 0.50) 0%, rgba(5, 6, 33, 0.50) 100%), url(${"/assets/landing-page/background-image.png"}) lightgray 50% / cover no-repeat`,
      }}
    >
      <Header className="py-4 lg:py-8" />
      <div className="container flex flex-col gap-12 items-start justify-end pb-10 lg:pb-40 h-[calc(100dvh-120px)]">
        <div className="flex flex-col gap-6 max-w-[1098px]">
          <p className="text-3xl font-medium text-slate-50">
            Start training for <span className="font-bold">$549</span>
          </p>
          <h2 className="text-white font-semibold text-5xl lg:text-8xl leading-[60px] lg:leading-[120px]">
            Transform Learning with{" "}
            <span className="block font-vollkorn italic font-bold">
              Basic Training
            </span>
          </h2>
          <p className="text-base lg:text-4xl text-slate-50 font-normal">
            A powerful training tool that takes the guesswork out of new team
            member development.
          </p>
        </div>
        <Button
          variant="outline"
          className="border border-slate-200 text-white rounded-full w-full lg:w-fit"
          size="2xl"
        >
          Upcoming Sessions
          <ArrowUpRight className="ml-3 text-white" />
        </Button>
      </div>
    </div>
  );
};

export default Hero;
