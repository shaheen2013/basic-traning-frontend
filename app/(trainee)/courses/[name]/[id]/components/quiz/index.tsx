import { ChevronLeft, ChevronRight } from "@/components/icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Result from "./components/result";
import { quizStatus } from "@/app/(trainee)/courses/[name]/constant";
import Instructions from "./components/instructions";

type QuizStatus = "instructions" | "result";

const typedQuizStatus = quizStatus as QuizStatus;

const Quiz = () => {
  return (
    <section className="bg-slate-50 flex flex-col gap-4 lg:gap-6 pb-4 lg:pb-6">
      <div className="p-4 lg:p-6 bg-slate-200 flex justify-between items-center">
        <h2 className="font-semibold text-lg lg:text-2xl capitalize text-primary">
          My Course
        </h2>

        <div className="flex items-center justify-between gap-2 lg:gap-4">
          <Button
            type="button"
            variant="outline"
            className="bg-transparent shadow-none hover:shadow-sm hover:bg-transparent"
            asChild
          >
            <Link href="/course">
              <ChevronLeft className="size-5" />
              Previous
            </Link>
          </Button>

          <Button type="button" variant="secondary" asChild>
            <Link href="/course">
              Next
              <ChevronRight className="size-5" />
            </Link>
          </Button>
        </div>
      </div>
      {typedQuizStatus === "instructions" && <Instructions />}
      {typedQuizStatus === "result" && <Result />}
    </section>
  );
};

export default Quiz;
