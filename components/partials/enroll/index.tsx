import { Button } from "@/components/ui/button";
import TestimonialCard from "../testimonial";
import { ArrowUpRight } from "@/components/icons";

const Enroll = ({ isShow }: { isShow?: boolean }) => {
  return (
    <section className="bg-slate-50  py-12 lg:py-32">
      <div className="container flex flex-col gap-8 lg:gap-24">
        <TestimonialCard />
        {isShow && (
          <Button className="w-full lg:w-fit rounded-full lg:ml-56" size="2xl">
            Enroll Now
            <ArrowUpRight className="ml-2 lg:ml-3 text-white" />
          </Button>
        )}
      </div>
    </section>
  );
};

export default Enroll;
