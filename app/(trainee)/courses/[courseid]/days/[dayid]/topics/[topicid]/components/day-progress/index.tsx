import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const DayProgress = ({
  className,
  currentDay,
  totalDays,
}: {
  className?: string;
  currentDay: number;
  totalDays: number;
}) => {
  return (
    <div className={cn("flex gap-2 w-full lg:justify-between", className)}>
      <h3 className="font-semibold text-xl lg:text-2xl text-primary">
        Running Day: {currentDay}
      </h3>
      <div className="flex gap-2 items-center">
        <Progress
          value={(currentDay / totalDays) * 100}
          className="w-24 bg-white"
        />
        <span className="text-sm font-semibold text-blue-500">
          {currentDay}/{totalDays}
        </span>
      </div>
    </div>
  );
};

export default DayProgress;
