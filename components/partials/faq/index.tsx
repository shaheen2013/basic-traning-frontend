/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FaqSkeleton } from "./components/loader";

const Faq = ({ data: faqs, isLoading }: { data: any; isLoading: boolean }) => {
  if (isLoading) return <FaqSkeleton />;
  return (
    <section
      id="faq"
      className="container grid grid-cols-1 lg:grid-cols-[45%_55%] gap-y-8 gap-x-12 py-12 lg:py-32"
    >
      <div className="flex flex-col gap-4">
        <h2 className="text-3xl lg:text-7xl font-semibold text-primary">
          Frequently{" "}
          <span className="font-vollkorn italic font-normal">
            Asked Questions
          </span>
        </h2>
        <p className="text-slate-800 text-base lg:text-3xl font-medium">
          Find answers to some of the most common questions about the Basic
          Training.
        </p>
      </div>
      <div className="">
        <Accordion type="single" collapsible defaultValue="0">
          {faqs?.map((faq: any, index: number) => (
            <AccordionItem key={index} value={String(index)} className="px-0">
              <AccordionTrigger className="text-slate-700 font-medium text-xl lg:text-4xl py-4 cursor-pointer px-4">
                {faq?.question}
              </AccordionTrigger>
              <AccordionContent className="px-4">
                <div className="text-base lg:text-3xl font-normal text-slate-700">
                  {faq?.answer}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default Faq;
