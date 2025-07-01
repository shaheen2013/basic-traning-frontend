/* eslint-disable @typescript-eslint/no-explicit-any */
import NotifyMe from "@/components/partials/modal/notify-me";

const UpcomingEvents = () => {
  return (
    <div className="rounded-2xl bg-slate-50 border border-blue-200 overflow-hidden h-fit">
      <div className="bg-blue-200 px-6 py-4 flex flex-col lg:flex-row gap-4 w-full justify-between lg:items-center">
        <h3 className="text-2xl lg:text-3xl font-semibold text-primary">
          Upcoming{" "}
          <span className="font-vollkorn italic font-normal">Events</span>
        </h3>
        <NotifyMe />
      </div>
      <ul className="[&>*:nth-child(odd)]:bg-white [&>*:nth-child(even)]:bg-slate-50">
        <li className="px-6 py-3 lg:py-4 text-lg lg:text-2xl font-semibold text-primary border-b border-slate-100 cursor-pointer">
          1st June
        </li>
        <li className="px-6 py-3 lg:py-4 text-lg lg:text-2xl font-semibold text-primary border-b border-slate-100 cursor-pointer">
          1st July
        </li>
        <li className="px-6 py-3 lg:py-4 text-lg lg:text-2xl font-semibold text-primary border-b border-slate-100 cursor-pointer">
          1st August
        </li>
        <li className="px-6 py-3 lg:py-4 text-lg lg:text-2xl font-semibold text-primary border-b border-slate-100 cursor-pointer">
          1st September
        </li>
        <li className="px-6 py-3 lg:py-4 text-lg lg:text-2xl font-semibold text-primary border-b border-slate-100 cursor-pointer">
          1st October
        </li>
        <li className="px-6 py-3 lg:py-4 text-lg lg:text-2xl font-semibold text-primary border-b border-slate-100 cursor-pointer">
          1st November
        </li>
        <li className="px-6 py-3 lg:py-4 text-lg lg:text-2xl font-semibold text-primary border-b border-slate-100 cursor-pointer">
          1st December
        </li>
      </ul>
    </div>
  );
};

export default UpcomingEvents;
