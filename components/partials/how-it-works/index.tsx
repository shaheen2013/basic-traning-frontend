/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowUpRight, Four, One, Three, Two } from "@/components/icons";
import { Button } from "@/components/ui/button";
import TrainingSlot from "../modal/training-slot";
import { HowWorksSkeleton } from "./components/loader";

const HowWorks = ({ isLoading, data }: { isLoading?: boolean; data?: any }) => {
  if (isLoading) return <HowWorksSkeleton />;

  const contents = data.contents;

  return (
    <section className="container flex flex-col gap-8 lg:gap-24 py-12 lg:py-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4">
        <h3 className="text-3xl lg:text-7xl font-semibold text-primary">
          {data.title.split(" ")[0]}{" "}
          <span className="font-normal font-vollkorn italic">
            {data.title.split(" ").slice(1).join(" ")}
          </span>
        </h3>
        <p className="text-slate-800 text-base lg:text-4xl font-medium">
          {data.description}
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16">
        <div className="flex flex-col gap-8 lg:gap-12 group py-8 lg:py-16 hover:shadow-md transition-shadow rounded-sm duration-50 px-4">
          <One className="w-9 lg:w-[60px] h-16 lg:h-[104px] text-slate-700 group-active:text-blue-600 group-hover:text-blue-600 fill-white group-active:fill-current group-hover:fill-current transition-colors duration-50" />
          <div className="flex flex-col gap-4">
            <h4 className="text-primary text-2xl lg:text-3xl font-semibold">
              {contents[0].title}
            </h4>
            <p className="text-slate-700 text-base lg:text-2xl font-medium">
              {contents[0].description}
            </p>
          </div>

          <TrainingSlot className="justify-start">
            <Button className="w-fit has-[>svg]:px-0" variant="link" size="2xl">
              Get Started
              <ArrowUpRight className="ml-3 size-6" />
            </Button>
          </TrainingSlot>
        </div>
        <div className="flex flex-col gap-8 lg:gap-12 border-t lg:border-none border-slate-500 group py-8 lg:py-16 hover:shadow-md transition-shadow rounded-sm duration-50 px-4">
          <Two className="w-9 lg:w-[60px] h-16 lg:h-[104px] text-slate-700 group-active:text-blue-600 group-hover:text-blue-600 fill-white group-active:fill-current group-hover:fill-current transition-colors duration-50" />
          <div className="flex flex-col gap-4">
            <h4 className="text-primary text-2xl lg:text-3xl font-semibold">
              {contents[1].title}
            </h4>
            <p className="text-slate-700 text-base lg:text-2xl font-medium">
              {contents[1].description}
            </p>
          </div>
          <Button className="w-fit has-[>svg]:px-0" variant="link" size="2xl">
            Our Curriculum
            <ArrowUpRight className="ml-3 size-6" />
          </Button>
        </div>
        <div className="flex flex-col gap-8 lg:gap-12 border-t border-slate-500 py-8 lg:py-16 group hover:shadow-md transition-shadow rounded-sm duration-50 px-4">
          <Three className="w-9 lg:w-[60px] h-16 lg:h-[104px] text-slate-700 group-active:text-blue-600 group-hover:text-blue-600 fill-white group-active:fill-current group-hover:fill-current transition-colors duration-50" />
          <div className="flex flex-col gap-4">
            <h4 className="text-primary text-2xl lg:text-3xl font-semibold">
              {contents[2].title}
            </h4>
            <p className="text-slate-700 text-base lg:text-2xl font-medium">
              {contents[2].description}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-8 lg:gap-12 border-t border-slate-500 py-8 lg:py-16 group hover:shadow-md transition-shadow rounded-sm duration-50 px-4">
          <Four className="w-9 lg:w-[60px] h-16 lg:h-[104px] text-slate-700 group-active:text-blue-600 group-hover:text-blue-600 fill-white group-active:fill-current group-hover:fill-current transition-colors duration-50" />
          <div className="flex flex-col gap-4">
            <h4 className="text-primary text-2xl lg:text-3xl font-semibold">
              {contents[3].title}
            </h4>
            <p className="text-slate-700 text-base lg:text-2xl font-medium">
              {contents[3].description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWorks;
