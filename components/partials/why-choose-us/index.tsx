import { Star } from "@/components/icons";
import { reasons } from "./constants";

const WhyChooseUs = () => {
  return (
    <div className="bg-slate-50">
      <div className="container py-12 lg:py-36 flex flex-col gap-8 lg:gap-24">
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
              <div className="ml-3 text-blue-600 text-base lg:text-3xl font-bold underline underline-offset-8">
                (3k+)
              </div>
            </div>
          </div>
        </div>
        <div className="grid lg:grid-cols-3 gap-4 lg:gap-8">
          {reasons.map((reason) => (
            <div
              key={reason.id}
              className="p-0.5 hover:bg-gradient-to-r active:bg-gradient-to-r from-blue-600 via-blue-100 to-blue-600"
            >
              <div className="flex flex-col gap-5 lg:gap-10 p-5 lg:p-10 bg-white h-full">
                <div className="text-blue-600 size-12 lg:size-16">
                  {reason.icon}
                </div>
                <h3 className="text-primary text-2xl lg:text-4xl font-semibold">
                  {reason.title}
                </h3>
                <p className="text-slate-700 text-xl lg:text-3xl font-medium">
                  {reason.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
