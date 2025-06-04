"use client";

import {
  ChevronRight,
  Clock,
  HourGlass,
  TextDescription,
} from "@/components/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

const Quiz = () => {
  const params = useParams();
  return (
    <section className="flex flex-col gap-4 lg:gap-6 px-4 lg:px-6">
      <div className="flex gap-4 items-start">
        <Image
          src={`/assets/course-info/course-cover.png`}
          alt="course-cover"
          width={1000}
          height={700}
          className="max-w-72 w-full h-auto object-cover object-center rounded-xl"
        />
        <div className="flex flex-col gap-5 w-full">
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-2">
              <div className="flex gap-2.5 items-center">
                <h3 className="text-primary text-xl font-semibold">
                  Test Name is here
                </h3>
                <Badge>New</Badge>
              </div>
              <div className="flex gap-4 items-center flex-wrap">
                <div className="inline-flex items-center gap-1">
                  <HourGlass className="size-5 text-blue-600" />
                  <span className="text-slate-700 text-sm font-normal">
                    5:00 Minuets
                  </span>
                </div>
                <div className="inline-flex items-center gap-1">
                  <Clock className="size-5 text-blue-600" />
                  <span className="text-slate-700 text-sm font-normal">
                    April 8, 2025
                  </span>
                </div>
              </div>
            </div>
            <Button variant="secondary" asChild>
              <Link href={`/course/${params.slug}/start`}>
                Start Test
                <ChevronRight className="size-5" />
              </Link>
            </Button>
          </div>
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
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex gap-2 items-center">
          <TextDescription className="size-5 text-primary" />
          <h3 className="text-primary text-lg font-semibold">Overview</h3>
        </div>
        <p className="text-slate-700 text-base font-normal">
          This lesson covers [brief summary of what the lesson includes].
          Learners will explore key concepts such as [key topics] and get
          hands-on experience through [activity/project/demo]. This lesson
          builds foundational knowledge for the upcoming modules.
        </p>
      </div>
    </section>
  );
};

export default Quiz;
