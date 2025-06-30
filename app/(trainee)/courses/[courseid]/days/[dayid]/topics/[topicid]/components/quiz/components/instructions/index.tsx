/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ChevronRight } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { useStartQuizMutation } from "@/features/course/quizApi";
import { useParams } from "next/navigation";
import { toast } from "sonner";

const Instructions = ({
  data,
  handleStatus,
}: {
  data: any;
  handleStatus: any;
}) => {
  const params = useParams();
  const courseId = params.courseid;
  const dayId = params.dayid;

  console.log("dayid", dayId);

  const [startQuiz, { isLoading }] = useStartQuizMutation({});
  const handleQuizStart = async () => {
    try {
      await startQuiz({ courseId, dayId }).unwrap();
      handleStatus("ongoing");
    } catch (error: any) {
      console.log(error);
      toast.error(error?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="flex flex-col gap-4 lg:gap-6 px-4 lg:px-6">
      <div className="flex gap-4 items-start">
        <div className="flex flex-col gap-5 w-full">
          <div className="flex flex-col gap-2">
            <h4 className="text-primary text-base font-semibold">
              Instructions
            </h4>
            <ul className="text-slate-700 text-base font-normal">
              <li>Number of questions: {data.number_of_questions} </li>
              <li>Has a time limit of:  {data.time_limit} minutes</li>
              <li>Questions displayed per page: 1</li>
              <li>Will not let you finish with any questions unattempt.</li>
            </ul>
          </div>
          <div className="flex justify-between items-center">
            <Button
              variant="secondary"
              onClick={handleQuizStart}
              disabled={isLoading}
            >
              Start Test
              <ChevronRight className="size-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Instructions;
