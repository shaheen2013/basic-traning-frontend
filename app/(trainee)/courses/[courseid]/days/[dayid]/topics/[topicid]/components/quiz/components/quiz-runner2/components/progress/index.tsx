/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Check, X, ChevronUp, ChevronRight } from "lucide-react";
import { useMediaQuery } from "usehooks-ts";

const Progress = ({ total, setCurrentQuizIndex, answers, timeLeft }: any) => {
  console.log("answers", answers);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  // Mock data - replace with your actual quiz submission status
  const quizStatus = Array.from({ length: total }, (_, i) => ({
    id: i + 1,
    submitted: false,
  }));

  return (
    <Drawer direction={isDesktop ? "right" : "bottom"}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="gap-2" disabled={timeLeft <= 0}>
          Quiz Progress
          {isDesktop ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronUp className="h-4 w-4" />
          )}
        </Button>
      </DrawerTrigger>

      <DrawerContent
        className={
          isDesktop
            ? "h-full top-0 right-0 left-auto mt-0 w-[400px] rounded-none"
            : ""
        }
      >
        <div className="mx-auto w-full p-4">
          <DrawerHeader className="text-left">
            <div className="flex justify-between items-start">
              <div>
                <DrawerTitle>Your Quiz Progress</DrawerTitle>
                <DrawerDescription>
                  {quizStatus.filter((q) => q.submitted).length}/{total}{" "}
                  Question completed
                </DrawerDescription>
              </div>
              <DrawerClose asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <X className="h-4 w-4" />
                </Button>
              </DrawerClose>
            </div>
          </DrawerHeader>

          {/* Quiz Grid */}
          <div className="mt-4 lg:mt-6 h-[calc(100vh-350px)] lg:h-[calc(100vh-200px)] overflow-y-auto">
            <div className="grid grid-cols-5 gap-3">
              {quizStatus.map((quiz, index) => (
                <div
                  key={quiz.id}
                  onClick={() => setCurrentQuizIndex(index)}
                  className={`cursor-pointer flex flex-col items-center justify-center h-12 rounded border ${
                    quiz.submitted
                      ? "bg-green-50 border-green-200 text-green-600"
                      : "bg-gray-50 border-gray-200 text-gray-400"
                  }`}
                >
                  <span className="text-sm font-medium">{quiz.id}</span>
                  {quiz.submitted ? (
                    <Check className="h-3 w-3 mt-1" />
                  ) : (
                    <X className="h-3 w-3 mt-1" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Stats Summary */}
          <div className="mt-6 pt-4 border-t flex justify-between">
            <div className="text-sm">
              <span className="font-medium">Completed:</span>{" "}
              {quizStatus.filter((q) => q.submitted).length}
            </div>
            <div className="text-sm">
              <span className="font-medium">Remaining:</span>{" "}
              {quizStatus.filter((q) => !q.submitted).length}
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default Progress;
