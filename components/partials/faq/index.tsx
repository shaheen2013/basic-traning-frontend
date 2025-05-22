import { ArrowUpRight } from "@/components/icons";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const Faq = () => {
  return (
    <section className="container grid grid-cols-1 lg:grid-cols-[45%_55%] gap-y-8 gap-x-12 py-12 lg:py-32">
      <div className="flex flex-col gap-4">
        <h2 className="text-3xl lg:text-6xl font-semibold text-primary">
          Frequently{" "}
          <span className="font-vollkorn italic font-normal">
            Asked Questions
          </span>
        </h2>
        <p className="text-slate-800 text-base lg:text-3xl font-medium">
          Find answers to some of the most common questions about the Basic
          Training.
        </p>
        <Button className="w-full lg:w-fit rounded-full mt-4" size="2xl">
          Contact Us
          <ArrowUpRight className="ml-2 lg:ml-3 text-white" />
        </Button>
      </div>
      <div>
        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue="item-1"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger className="data-[state=open]:font-semibold">
              Who is this training program for?
            </AccordionTrigger>
            <AccordionContent>
              Basic training is for new employees who need system, product,
              underwriting, service, and application training.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="data-[state=open]:font-semibold">
              What lines of business will be covered?
            </AccordionTrigger>
            <AccordionContent>
              Basic training is for new employees who need system, product,
              underwriting, service, and application training.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="data-[state=open]:font-semibold">
              How long is the training program?
            </AccordionTrigger>
            <AccordionContent>
              Basic training is for new employees who need system, product,
              underwriting, service, and application training.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
};

export default Faq;
