import Result from "./components/result";
import Instructions from "./components/instructions";
import { quizStatus } from "@/app/(trainee)/courses/[courseid]/constant";

type QuizStatus = "instructions" | "result";

const typedQuizStatus = quizStatus as QuizStatus;

const Quiz = () => {
  return (
    <section className="bg-slate-50 flex flex-col gap-4 lg:gap-6 pb-4 lg:pb-6">
      <div className="p-4 lg:p-6 bg-slate-200">
        <h2 className="font-semibold text-lg lg:text-2xl capitalize text-primary">
          My Course
        </h2>
      </div>
      {typedQuizStatus === "instructions" && <Instructions />}
      {typedQuizStatus === "result" && <Result />}
    </section>
  );
};

export default Quiz;
