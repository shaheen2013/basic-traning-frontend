import { ArrowUpRight, Four, One, Three, Two } from "@/components/icons";
import { Button } from "@/components/ui/button";

const HowWorks = () => {
  return (
    <section className="container flex flex-col gap-8 lg:gap-24 py-12 lg:py-36">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4">
        <h3 className="text-primary text-3xl lg:text-7xl font-semibold">
          How <span className="font-normal font-vollkorn">It Works</span>
        </h3>
        <p className="text-slate-800 text-base lg:text-4xl font-medium">
          Getting started with Basic Training is easy. Follow these steps and
          begin training today!
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16">
        <div className="flex flex-col gap-8 lg:gap-12 group py-8 lg:py-16">
          <One className="w-9 lg:w-[60px] h-16 lg:h-[104px] text-slate-700 group-active:text-blue-600 group-hover:text-blue-600 fill-white group-active:fill-current group-hover:fill-current transition-colors duration-50" />
          <div className="flex flex-col gap-4 lg:gap-6">
            <h4 className="text-primary text-2xl lg:text-5xl font-semibold">
              Complete Enrollment
            </h4>
            <p className="text-slate-700 text-base lg:text-4xl font-medium">
              Create your account, enter your new employee’s information.
            </p>
          </div>

          <Button className="w-fit has-[>svg]:px-0" variant="link" size="2xl">
            Get Started
            <ArrowUpRight className="ml-3 size-6" />
          </Button>
        </div>
        <div className="flex flex-col gap-8 lg:gap-12 border-t lg:border-none border-slate-500 group py-8 lg:py-16">
          <Two className="w-9 lg:w-[60px] h-16 lg:h-[104px] text-slate-700 group-active:text-blue-600 group-hover:text-blue-600 fill-white group-active:fill-current group-hover:fill-current transition-colors duration-50" />
          <div className="flex flex-col gap-4 lg:gap-6">
            <h4 className="text-primary text-2xl lg:text-5xl font-semibold">
              Prepare to Join Class
            </h4>
            <p className="text-slate-700 text-base lg:text-4xl font-medium">
              Attend live sessions and follow our interactive curriculum.
            </p>
          </div>
          <Button className="w-fit has-[>svg]:px-0" variant="link" size="2xl">
            Our Curriculum
            <ArrowUpRight className="ml-3 size-6" />
          </Button>
        </div>
        <div className="flex flex-col gap-8 lg:gap-12 border-t border-slate-500 py-8 lg:py-16 group">
          <Three className="w-9 lg:w-[60px] h-16 lg:h-[104px] text-slate-700 group-active:text-blue-600 group-hover:text-blue-600 fill-white group-active:fill-current group-hover:fill-current transition-colors duration-50" />
          <div className="flex flex-col gap-4 lg:gap-6">
            <h4 className="text-primary text-2xl lg:text-5xl font-semibold">
              Track Progress and See Results
            </h4>
            <p className="text-slate-700 text-base lg:text-4xl font-medium">
              Monitor your team’s learning with progress tracking and
              interactive testing.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-8 lg:gap-12 border-t border-slate-500 py-8 lg:py-16 group">
          <Four className="w-9 lg:w-[60px] h-16 lg:h-[104px] text-slate-700 group-active:text-blue-600 group-hover:text-blue-600 fill-white group-active:fill-current group-hover:fill-current transition-colors duration-50" />
          <div className="flex flex-col gap-4 lg:gap-6">
            <h4 className="text-primary text-2xl lg:text-5xl font-semibold">
              Get Certified
            </h4>
            <p className="text-slate-700 text-base lg:text-4xl font-medium">
              Earn your Basic Training certification and move forward with
              confidence.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWorks;
