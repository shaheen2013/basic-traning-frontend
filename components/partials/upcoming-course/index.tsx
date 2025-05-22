import { AlertBadge } from "@/components/icons";
import { Button } from "@/components/ui/button";

const UpcomingCourse = () => {
  return (
    <div className="container p-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 bg-blue-100 my-36">
      <h2 className="text-3xl lg:text-6xl font-semibold text-center text-primary">
        Upcoming{" "}
        <span className="font-vollkorn italic font-normal">Courses</span>{" "}
      </h2>
      <Button className="w-fit rounded-full" size="2xl">
        Get Notified Upcoming Classes
        <AlertBadge className="ml-2 size-6 text-white" />
      </Button>
    </div>
  );
};

export default UpcomingCourse;
