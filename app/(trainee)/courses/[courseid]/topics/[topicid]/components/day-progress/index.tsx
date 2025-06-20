import { progress } from "@/app/(trainee)/(account)/my-course/constant";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const DayProgress = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex gap-2 w-full lg:justify-between", className)}>
      <h3 className="font-semibold text-xl lg:text-2xl text-primary">
        Running Day: 01
      </h3>
      <div className="flex gap-2 items-center">
        <Progress value={progress} className="w-24 bg-white" />
        <span className="text-sm font-semibold text-blue-500">1/4</span>
      </div>
    </div>
  );
};

export default DayProgress;
