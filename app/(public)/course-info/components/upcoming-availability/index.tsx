/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";
import { UpcomingAvailabilitySkeleton } from "./components/loader";
import { NotifyMe } from "@/components/partials";

const UpcomingAvailability = ({
  isLoading,
  batches,
}: {
  isLoading: boolean;
  batches: any;
}) => {
  if (isLoading) return <UpcomingAvailabilitySkeleton />;
  return (
    <section className="container max-w-4xl flex flex-col justify-center items-center gap-8 lg:gap-16 py-12 lg:py-32">
      <h3 className="text-3xl lg:text-7xl font-semibold text-primary w-full">
        Upcoming Slot{" "}
        <span className="font-normal font-vollkorn italic">Availability</span>
      </h3>
      <div className="border border-slate-300 overflow-hidden h-fit w-full">
        <div className="bg-slate-200 px-6 py-4 flex flex-col lg:flex-row gap-4 w-full justify-between lg:items-center">
          <h3 className="text-xl lg:text-2xl font-semibold text-primary">
            Month{" "}
          </h3>
        </div>
        <ul className="[&>*:nth-child(odd)]:bg-white [&>*:nth-child(even)]:bg-slate-50">
          {batches &&
            batches.map((batch: any) => (
              <li
                key={batch.id}
                className="px-6 py-3 lg:py-4 text-lg lg:text-xl font-medium text-primary border-b border-slate-100"
              >
                {batch.month}
                {moment(batch.start_date).format("MMMM DD")} -{" "}
                {moment(batch.end_date).format("MMMM DD")}
              </li>
            ))}
        </ul>
      </div>
      <NotifyMe />
    </section>
  );
};

export default UpcomingAvailability;
