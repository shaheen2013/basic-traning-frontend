import NotifyMe from "../modal/notify-me";
import { UpcomingCourseSkeleton } from "./components/loader";
const UpcomingCourse = () => {
  if (true) return <UpcomingCourseSkeleton />;
  return (
    <div className="container p-6 lg:p-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 lg:gap-8 bg-blue-100 my-12 lg:my-36">
      <h2 className="text-3xl lg:text-6xl font-semibold text-center text-primary">
        Upcoming{" "}
        <span className="font-vollkorn italic font-normal">Courses</span>{" "}
      </h2>
      <NotifyMe />
    </div>
  );
};

export default UpcomingCourse;
