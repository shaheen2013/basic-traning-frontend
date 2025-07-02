/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import { OurStorySkeleton } from "./components/loader";

const OurStory = ({ isLoading, data }: { isLoading: boolean; data: any }) => {
  if (isLoading) return <OurStorySkeleton />;
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
          className="text-slate-800 text-base lg:text-3xl font-medium prose max-w-none [&_ul>li]:marker:text-slate-700"
          dangerouslySetInnerHTML={{ __html: data.description }}
        ></div>
      </div>

      {data.image && (
        <Image
          src={data.image}
          alt={data.title}
          width={1000}
          height={760}
          className="w-full object-cover object-center h-auto max-h-[672px]"
        />
      )}
    </section>
  );
};

export default OurStory;
