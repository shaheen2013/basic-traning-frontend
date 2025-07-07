/* eslint-disable @typescript-eslint/no-explicit-any */
import { Star } from "@/components/icons";
import { WhyChooseUsSkeleton } from "./components/loader";
import Image from "next/image";
import Link from "next/link";

const WhyChooseUs = ({
  data,
  isLoading,
}: {
  data: any;
  isLoading: boolean;
}) => {
  if (isLoading) return <WhyChooseUsSkeleton />;
  return (
    <div className="bg-slate-50">
      <div className="container py-12 lg:py-32 flex flex-col gap-8 lg:gap-24">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <h2 className="text-3xl lg:text-7xl font-semibold text-center text-primary">
            Why{" "}
            <span className="font-vollkorn italic font-normal">Choose Us</span>{" "}
          </h2>
          <div className="flex flex-col gap-1.5 lg:gap-3">
            <p className="text-slate-800 text-base lg:text-4xl font-medium">
              Why our users Recommend Us
            </p>
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].fill(5).map((_, index) => (
                <Star key={index} className="text-[#FFBB00] size-4 lg:size-8" />
              ))}
              <Link
                href="https://www.trophyclubconsulting.com/"
                target="_blank"
                className="ml-3 text-blue-600 text-base lg:text-3xl font-bold underline underline-offset-8"
              >
                (3k+)
              </Link>
            </div>
          </div>
        </div>
        <div className="grid lg:grid-cols-3 gap-4 lg:gap-8">
          {data.map((reason: any, index: number) => (
            <div
              key={index}
              className="p-0.5 hover:bg-gradient-to-r active:bg-gradient-to-r from-blue-600 via-blue-100 to-blue-600 hover:shadow-sm transition-all rounded-sm duration-50"
            >
              <div className="flex flex-col gap-5 lg:gap-10 p-5 lg:p-10 bg-white h-full">
                {reason.icon && (
                  <Image
                    src={reason.icon}
                    alt={reason.title.split(" ")[0]}
                    width={100}
                    height={100}
                    className="object-center object-contain size-12 lg:size-16 text-blue-600"
                  />
                )}
                <div className="flex flex-col gap-4">
                  <h3 className="text-primary text-2xl lg:text-3xl font-semibold">
                    {reason.title}
                  </h3>
                  <p className="text-slate-700 text-xl lg:text-2xl font-medium">
                    {reason.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
