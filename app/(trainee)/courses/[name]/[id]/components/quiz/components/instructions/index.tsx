"use client";

import { ChevronRight } from "@/components/icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";

const Instructions = () => {
  const params = useParams();
  return (
    <div className="flex flex-col gap-4 lg:gap-6 px-4 lg:px-6">
      <div className="flex gap-4 items-start">
        <div className="flex flex-col gap-5 w-full">
          <div className="flex flex-col gap-2">
            <h4 className="text-primary text-base font-semibold">
              Instructions
            </h4>
            <ul className="text-slate-700 text-base font-normal">
              <li>Number of questions: 8 </li>
              <li>Has a time limit of: 00:05:00</li>
              <li>Questions displayed per page: 1</li>
              <li>Will allow you to go back and change your answers.</li>
              <li>Will not let you finish with any questions unattempt.</li>
            </ul>
          </div>
          <div className="flex justify-between items-center">
            <Button variant="secondary" asChild>
              <Link href={`/course/${params.name}/start`}>
                Start Test
                <ChevronRight className="size-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Instructions;
