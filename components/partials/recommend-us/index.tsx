/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import TestimonialCard from "../testimonial";
import Autoplay from "embla-carousel-autoplay";
import { RecommendUsSkeleton } from "./components/loader";

const RecommendUs = ({
  data: feedbacks,
  isLoading,
}: {
  data: any;
  isLoading: boolean;
}) => {
  if (isLoading) return <RecommendUsSkeleton />;
  if (feedbacks.length === 0) return null;
  return (
    <section id="reviews" className="py-12 lg:py-32 bg-slate-50 ">
      <div className="container flex justify-center flex-col gap-y-8 lg:gap-y-24">
        <h3 className="text-3xl lg:text-7xl font-semibold text-primary text-center">
          Our user{" "}
          <span className="font-normal font-vollkorn italic pr-4">
            Love To Recommend
          </span>
          Us
        </h3>
        <Carousel
          plugins={[
            Autoplay({
              delay: 5000,
              stopOnInteraction: false,
              stopOnMouseEnter: true,
            }),
          ]}
        >
          <CarouselContent>
            {feedbacks?.map((feedback: any, index: number) => (
              <CarouselItem key={index}>
                <TestimonialCard data={feedback} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselDots />
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default RecommendUs;
