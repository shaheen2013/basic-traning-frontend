/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowUpRight } from "@/components/icons";
import { Button } from "@/components/ui/button";
import UpcomingEvents from "../upcoming-events";
import Link from "next/link";
import { AboutBasicTrainingSkeleton } from "./components/loader";

const AboutBasicTraning = ({
  isLoading,
  data,
}: {
  isLoading?: boolean;
  data?: any;
}) => {
  if (isLoading) return <AboutBasicTrainingSkeleton />;
  return (
    <section className="container grid grid-cols-1 lg:grid-cols-2 gap-8 py-12 lg:py-32">
      <div className="flex flex-col gap-4 lg:gap-8">
        <h3 className="text-3xl lg:text-7xl font-semibold text-primary">
          {data.title.split(" ")[0]}{" "}
          <span className="font-normal font-vollkorn italic">
            {data.title.split(" ").slice(1).join(" ")}
          </span>
        </h3>
        <div
          className="prose max-w-none [&_ul>li]:marker:text-slate-700 text-slate-800 text-base lg:text-3xl font-medium"
          dangerouslySetInnerHTML={{ __html: data.description }}
        ></div>
        <Button className="w-full lg:w-fit rounded-full" size="2xl" asChild>
          <Link href="/course-info">
            Learn More
            <ArrowUpRight className="ml-2 lg:ml-3 text-white" />
          </Link>
        </Button>
      </div>
      <UpcomingEvents />
    </section>
  );
};

export default AboutBasicTraning;
