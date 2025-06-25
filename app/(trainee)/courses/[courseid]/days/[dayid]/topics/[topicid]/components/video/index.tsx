/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { CheckCircleMarkOutline, TextDescription } from "@/components/icons";
import { Button } from "@/components/ui/button";
import "video.js/dist/video-js.css";
import VideoPlayer from "./components/videoPlayer";
import Player from "video.js/dist/types/player";
import { useRef } from "react";
import { useMarkCompleteMutation } from "@/features/course/markComplete";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { markTopicCompleted } from "@/features/slice/modules";

const Video = ({ data }: { data: any }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const router = useRouter();
  const courseId = params.courseid;
  const topicId = params.topicid;
  const playerRef = useRef<Player | null>(null);
  const [markComplete, { isLoading: markCompleteLoading }] =
    useMarkCompleteMutation();

  const options = {
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: data.media,
        type: data.media_mime_type,
      },
    ],
  };

  const handlePlayerReady = (player: Player) => {
    playerRef.current = player;

    player.on("waiting", () => {
      console.log("Player is waiting");
    });
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

        <div className="flex items-center justify-between">
          {data?.status === "completed" ? (
            <Button type="button" variant="secondary" disabled>
              <CheckCircleMarkOutline className="size-5" /> Completed
            </Button>
          ) : (
            <Button
              type="button"
              variant="secondary"
              onClick={handleMarkComplete}
              disabled={markCompleteLoading}
            >
              <CheckCircleMarkOutline className="size-5" /> Mark As Complete
            </Button>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-4 lg:gap-6 px-4 lg:px-6">
        <div id="course-video-player" className="w-full">
          <VideoPlayer options={options} onReady={handlePlayerReady} />
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex gap-2 items-center">
            <TextDescription className="size-5 text-primary" />
            <h3 className="text-primary text-lg font-semibold">Overview</h3>
          </div>
          <p className="text-slate-700 text-base font-normal">
            {data?.description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Video;
