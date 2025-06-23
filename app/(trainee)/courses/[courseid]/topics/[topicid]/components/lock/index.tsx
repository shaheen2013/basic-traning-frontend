import { Lock } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const LockLesson = () => {
  const router = useRouter();

  return (
    <section className="bg-slate-50 flex flex-col gap-4 lg:gap-6 pb-4 lg:pb-6">
      <div className="p-4 lg:p-6 bg-slate-200 flex justify-between items-center">
        <h2 className="font-semibold text-lg lg:text-2xl capitalize text-primary">
          My Course
        </h2>
      </div>
      <div className="flex flex-col items-center justify-center gap-6 px-4 lg:px-6 py-12">
        <div className="flex flex-col items-center gap-4 text-center">
          <Lock className="size-16" />
          <h3 className="text-xl font-bold text-gray-800">Lesson Locked</h3>
          <p className="text-gray-600 max-w-md">
            Please complete the previous lesson to unlock this content.
          </p>
          <Button
            variant="default"
            onClick={() => router.back()}
            className="mt-4"
          >
            Go Back to Previous Lesson
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LockLesson;
