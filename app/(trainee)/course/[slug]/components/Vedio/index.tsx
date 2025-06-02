import { TextDescription } from "@/components/icons";
import Image from "next/image";

const Vedio = () => {
  return (
    <div className="flex flex-col gap-4 lg:gap-6">
      <Image
        src={`/assets/course-info/course-cover.png`}
        alt="course-cover"
        width={1000}
        height={700}
        className="w-full max-h-[685px] h-full object-cover object-center rounded-xl"
      />
      <div className="flex flex-col gap-3">
        <div className="flex gap-2 items-center">
          <TextDescription className="size-5 text-primary" />
          <h3 className="text-primary text-lg font-semibold">Overview</h3>
        </div>
        <p className="text-slate-700 text-base font-normal">
          This lesson covers [brief summary of what the lesson includes].
          Learners will explore key concepts such as [key topics] and get
          hands-on experience through [activity/project/demo]. This lesson
          builds foundational knowledge for the upcoming modules.
        </p>
      </div>
    </div>
  );
};

export default Vedio;
