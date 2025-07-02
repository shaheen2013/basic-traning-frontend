/* eslint-disable @typescript-eslint/no-explicit-any */
import { Star, StarHalfIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const TestimonialCard = ({ data }: any) => {
  const rating = data?.rating || 0; // Default to 0 if no rating
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  return (
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
          {/* Render full stars */}
          {[...Array(fullStars)].map((_, index) => (
            <Star
              key={`full-${index}`}
              className="text-[#FFBB00] size-4 lg:size-8"
            />
          ))}

          {/* Render half star if needed */}
          {hasHalfStar && (
            <StarHalfIcon
              key="half"
              className="text-[#FFBB00] size-4 lg:size-8"
            />
          )}

          {/* Render empty stars */}
          {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, index) => (
            <Star
              key={`empty-${index}`}
              className="text-gray-300 size-4 lg:size-8"
            />
          ))}
          <Link
            href="https://www.trophyclubconsulting.com"
            target="_blank"
            className="ml-3 text-blue-600 text-base lg:text-3xl font-bold underline underline-offset-8"
          >
            (3k+)
          </Link>
        </div>
        <p className="text-primary text-2xl lg:text-5xl font-medium">
          {data?.review}
        </p>
        <div className="flex items-center gap-x-4">
          {data?.user_avatar && (
            <Image
              src={data?.user_avatar}
              alt={data?.user_name}
              width={80}
              height={80}
              className="size-16 lg:size-20 object-center object-contain shrink-0 rounded-full"
            />
          )}

          <div className="flex flex-col gap-y-1 lg:gap-y-2">
            <h3 className="text-slate-800 text-xl lg:text-3xl font-semibold">
              {data?.user_name}
            </h3>
            <p className="text-slate-800 text-base lg:text-2xl font-medium">
              {data?.user_designation}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
