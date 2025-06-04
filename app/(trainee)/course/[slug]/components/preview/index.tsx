import { Button } from "@/components/ui/button";
import { previewData } from "../../constant";
import Link from "next/link";
import { CheckCircleMarkOutline, ChevronRight } from "@/components/icons";
const Preview = () => {
  return (
    <div className="">
      <h4 className="text-primary text-xl font-semibold mb-4">
        {previewData.title}
      </h4>
      <p className="text-slate-700 text-base">{previewData.description}</p>
      <hr className="my-4 bg-slate-200" />
      <div className="flex flex-col gap-4">
        {previewData.modules.map((module) => {
          return (
            <div className="flex flex-col gap-4" key={module.week}>
              <h4 className="text-primary text-lg font-semibold">
                {module.week}
              </h4>
              {module.quizzes.map((quiz) => (
                <div
                  className="p-4 bg-white rounded-lg border border-slate-200"
                  key={quiz.name}
                >
                  <h5 className="text-primary text-base font-semibold">
                    {module.day}
                  </h5>
                  <hr className="my-4 bg-slate-200" />
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-0.5">
                      <div className="flex items-center gap-2">
                        <CheckCircleMarkOutline className="size-5 text-primary" />
                        <p className="text-slate-600 text-base">{quiz.name}</p>
                      </div>
                      <span className="text-slate-500 text-xs pl-7">
                        {quiz.score}
                      </span>
                    </div>
                    <Button variant="secondary" asChild>
                      <Link href={`/${quiz.action}`}>
                        Re take <ChevronRight className="size-5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Preview;
