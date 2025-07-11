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

const Progress = ({
  total,
  currentIndex,
  answeredQuestions,
  setCurrentQuizIndex,
  timeLeft,
}: {
  total: number;
  currentIndex: number;
  answeredQuestions: Set<number>;
  setCurrentQuizIndex: (index: number) => void;
  timeLeft: number;
}) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

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
                  {answeredQuestions.size}/{total} Questions answered
                </DrawerDescription>
              </div>
              <DrawerClose asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <X className="h-4 w-4" />
                </Button>
              </DrawerClose>
            </div>
          </DrawerHeader>

          <div className="mt-4 lg:mt-6 h-[calc(100vh-350px)] lg:h-[calc(100vh-200px)] overflow-y-auto">
            <div className="grid grid-cols-5 gap-3">
              {Array.from({ length: total }, (_, i) => {
                const isAnswered = answeredQuestions.has(i);
                const isCurrent = i === currentIndex;

                return (
                  <div
                    key={i}
                    onClick={() => setCurrentQuizIndex(i)}
                    className={`cursor-pointer flex flex-col items-center justify-center h-12 rounded border ${
                      isCurrent
                        ? "border-blue-500 bg-blue-50 text-blue-600"
                        : isAnswered
                        ? "bg-green-50 border-green-200 text-green-600"
                        : "bg-gray-50 border-gray-200 text-gray-400"
                    }`}
                  >
                    <span className="text-sm font-medium">{i + 1}</span>
                    {isAnswered ? (
                      <Check className="h-3 w-3 mt-1" />
                    ) : (
                      <X className="h-3 w-3 mt-1" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t flex justify-between">
            <div className="text-sm">
              <span className="font-medium">Answered:</span>{" "}
              {answeredQuestions.size}
            </div>
            <div className="text-sm">
              <span className="font-medium">Remaining:</span>{" "}
              {total - answeredQuestions.size}
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default Progress;
