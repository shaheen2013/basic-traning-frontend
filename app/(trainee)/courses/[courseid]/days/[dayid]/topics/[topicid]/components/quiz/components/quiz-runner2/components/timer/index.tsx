/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatSecondsToReadableTime } from "@/lib/utils";
import { Timer as TimerIcon } from "@/components/icons";
import { useEffect } from "react";

const Timer = ({ timeLeft, setTimeLeft, submitAllAnswers }: any) => {
  // Timer countdown and auto-submit when time is up
  useEffect(() => {
    if (timeLeft <= 0) {
      // Time is up, submit all answers
      submitAllAnswers();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev: number) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  return (
    <>
      {timeLeft <= 0 ? (
        <div className="flex gap-2">
          <TimerIcon className="size-5 text-red-500" />
          <span className="text-red-500">Time&apos;s up!</span>{" "}
        </div>
      ) : (
        <div className="flex gap-2 text-blue-500">
          <TimerIcon className="size-5" />
          Time left {formatSecondsToReadableTime(timeLeft)}
        </div>
      )}
    </>
  );
};

export default Timer;
