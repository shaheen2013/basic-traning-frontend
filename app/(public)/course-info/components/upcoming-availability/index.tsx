import { AlertBadge } from "@/components/icons";
import { Button } from "@/components/ui/button";

const UpcomingAvailability = () => {
  return (
    <section className="container max-w-4xl flex flex-col justify-center items-center gap-8 lg:gap-16 py-12 lg:py-32">
      <h3 className="text-3xl lg:text-7xl font-semibold text-primary w-full">
        Upcoming Slot{" "}
        <span className="font-normal font-vollkorn italic">Availability</span>
      </h3>
      <div className="border border-slate-300 overflow-hidden h-fit w-full">
        <div className="bg-slate-200 px-6 py-4 flex flex-col lg:flex-row gap-4 w-full justify-between lg:items-center">
          <h3 className="lg:text-xl font-medium text-primary">Month </h3>
        </div>
        <ul className="[&>*:nth-child(odd)]:bg-white [&>*:nth-child(even)]:bg-slate-50">
          <li className="px-6 py-3 lg:py-4 text-base lg:text-lg font-medium text-slate-800 border-b border-slate-100 cursor-pointer">
            June 01 - June 20
          </li>
          <li className="px-6 py-3 lg:py-4 text-base lg:text-lg font-medium text-slate-800 border-b border-slate-100 cursor-pointer">
            July 10 - July 30
          </li>
          <li className="px-6 py-3 lg:py-4 text-base lg:text-lg font-medium text-slate-800 border-b border-slate-100 cursor-pointer">
            August 01 - August 20
          </li>
        </ul>
      </div>
      <Button className="w-full lg:w-fit rounded-full" size="2xl">
        Get Notified Upcoming Classes
        <AlertBadge className="ml-2 size-6 text-white" />
      </Button>
    </section>
  );
};

export default UpcomingAvailability;
