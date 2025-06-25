/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CheckCircleMarkOutline,
  ChevronRight,
  Clock,
  HourGlass,
  TextDescription,
} from "@/components/icons";
import { Button } from "@/components/ui/button";
import { useMarkCompleteMutation } from "@/features/course/markComplete";
import { markTopicCompleted } from "@/features/slice/modules";
import { formatSecondsToReadableTime } from "@/lib/utils";
import moment from "moment";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const LiveClass = ({ data }: { data: any }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const router = useRouter();
  const courseId = params.courseid;
  const topicId = params.topicid;

  const [markComplete, { isLoading: markCompleteLoading }] =
    useMarkCompleteMutation();

  const calculateTimeLeft = (
    startDate: string,
    startTime: string
  ): string | null => {
    const combinedDateTime = moment(`${startDate} ${startTime}`);
    const now = moment();
    const diffSeconds = combinedDateTime.diff(now, "seconds");

    if (diffSeconds <= 0) return null;
    return `Left ${formatSecondsToReadableTime(diffSeconds)}`;
  };

  const isEndClass = (
    start_date: string,
    start_time: string,
    durationHours: number = 1
  ) => {
    const classStart = moment(`${start_date} ${start_time}`);
    const classEnd = classStart.clone().add(durationHours, "hours");
    return moment().isAfter(classEnd);
  };

  const handleMarkComplete = async () => {
    try {
      const response = await markComplete({
        courseId: courseId,
        topicId: topicId,
      }).unwrap();

      dispatch(
        markTopicCompleted({
          current_lesson: Number(topicId),
          next_lesson: response?.data?.next_lesson,
        })
      );
      router.push(
        `/courses/${courseId}/days/${response?.data?.ongoing_day}/topics/${response?.data?.next_lesson}`
      );
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong.");
    }
  };

  return (
    <section className="bg-slate-50 flex flex-col gap-4 lg:gap-6 pb-4 lg:pb-6">
      <div className="p-4 lg:p-6 bg-slate-200 flex justify-between items-center">
        <h2 className="font-semibold text-lg lg:text-2xl capitalize text-primary">
          My Course
        </h2>

        {data?.status === "completed" ? (
          <Button type="button" variant="secondary" disabled>
            <CheckCircleMarkOutline className="size-5" /> Completed
          </Button>
        ) : (
          <Button
            type="button"
            variant="secondary"
            onClick={handleMarkComplete}
            disabled={
              markCompleteLoading ||
              !isEndClass(data.start_date, data.start_time)
            }
          >
            <CheckCircleMarkOutline className="size-5" /> Mark As Complete
          </Button>
        )}
      </div>
      <div className="flex flex-col gap-4 lg:gap-6 px-4 lg:px-6">
        <div className="flex gap-4 items-start">
          <div className="flex flex-col gap-5 w-full">
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-2">
                <h3 className="text-primary text-xl font-semibold">
                  {data.title}
                </h3>
                <div className="flex gap-4 items-center flex-wrap">
                  {calculateTimeLeft(data.start_date, data.start_time) && (
                    <div className="inline-flex items-center gap-1">
                      <HourGlass className="size-5 text-blue-600" />
                      <span className="text-slate-700 text-sm font-normal">
                        {calculateTimeLeft(data.start_date, data.start_time)}
                      </span>
                    </div>
                  )}

                  <div className="inline-flex items-center gap-1">
                    <Clock className="size-5 text-blue-600" />
                    <span className="text-slate-700 text-sm font-normal">
                      {moment(data.start_date).format("MMMM D, YYYY")},{" "}
                      {moment(data.time).format("hh:mm A")}
                    </span>
                  </div>
                </div>
              </div>
              {!isEndClass(data.start_date, data.start_time) && (
                <Button variant="secondary" asChild>
                  <Link href={data.zoom_link} target="_blank">
                    Join Live Class
                    <ChevronRight className="size-5" />
                  </Link>
                </Button>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-primary text-base font-semibold">
                Instructions
              </h4>
              <ul className="text-slate-700 text-base font-normal">
                <li>One Sitting Only – You cannot pause or resume later </li>
                <li>
                  All Questions Required – You must attempt every question
                  before submitting{" "}
                </li>
                <li>Will allow you to go back and change your answers.</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex gap-2 items-center">
            <TextDescription className="size-5 text-primary" />
            <h3 className="text-primary text-lg font-semibold">Overview</h3>
          </div>
          <p className="text-slate-700 text-base font-normal">
            {data.description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default LiveClass;
