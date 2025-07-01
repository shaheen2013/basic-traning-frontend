import { Button } from "@/components/ui/button";
import TestimonialCard from "../testimonial";
import { ArrowUpRight } from "@/components/icons";
import TrainingSlot from "../modal/training-slot";
import { EnrollSkeleton } from "./components/loader";

const Enroll = ({ isShow }: { isShow?: boolean }) => {
  if (true) return <EnrollSkeleton isShow={isShow} />;
  return (
    <section className="bg-slate-50  py-12 lg:py-32">
      <div className="container flex flex-col gap-8 lg:gap-24">
        <TestimonialCard />
        {isShow && (
          <TrainingSlot className="justify-start lg:ml-56">
            <Button className="w-full lg:w-fit rounded-full" size="2xl">
              Enroll Now
              <ArrowUpRight className="ml-2 lg:ml-3 text-white" />
            </Button>
          </TrainingSlot>
        )}
      </div>
    </section>
  );
};

export default Enroll;
