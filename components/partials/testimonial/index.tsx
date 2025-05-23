import { Star } from "@/components/icons";
import Image from "next/image";

const TestimonialCard = () => {
  return (
    <div className="container py-32">
      <div className="flex flex-row gap-x-28">
        <Image
          src="/icons/quote.png"
          alt="quote"
          width={120}
          height={120}
          className="size-28 object-center object-contain shrink-0 lg:block hidden"
        />
        <div className="flex flex-col gap-y-6 lg:gap-y-12">
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].fill(5).map((_, index) => (
              <Star key={index} className="text-[#FFBB00] size-4 lg:size-8" />
            ))}
            <div className="ml-3 text-blue-600 text-base lg:text-3xl font-bold underline underline-offset-8">
              (3k+)
            </div>
          </div>
          <p className="text-primary text-2xl lg:text-5xl font-medium">
            This platform has completely transformed how we train our team. The
            structured courses, interactive lessons, and real-time reporting
            tools made onboarding and upskilling smoother than ever.{" "}
          </p>
          <div className="flex items-center gap-x-4">
            <Image
              src="/icons/avatar.png"
              alt="avatar"
              width={80}
              height={80}
              className="size-16 lg:size-20 object-center object-contain shrink-0"
            />
            <div className="flex flex-col gap-y-1 lg:gap-y-2">
              <h3 className="text-slate-800 text-xl lg:text-3xl font-semibold">
                Jack Smith
              </h3>
              <p className="text-slate-800 text-base lg:text-2xl font-medium">
                Training Coordinator, FutureSecure Insurance
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
