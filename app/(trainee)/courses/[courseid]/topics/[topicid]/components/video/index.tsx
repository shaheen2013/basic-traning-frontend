/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ChevronLeft, ChevronRight, TextDescription } from "@/components/icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import "video.js/dist/video-js.css";
import VideoPlayer from "./components/videoPlayer";
import Player from "video.js/dist/types/player";
import { useRef } from "react";
import { useMarkCompleteMutation } from "@/features/course/markComplete";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

const Video = ({ data }: { data: any }) => {
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
        type: "video/mp4",
      },
    ],
  };

  const handlePlayerReady = (player: Player) => {
    playerRef.current = player;

    player.on("waiting", () => {
      console.log("Player is waiting");
    });

    player.on("dispose", () => {
      console.log("Player will dispose");
    });
  };

  const handleNext = async () => {
    try {
      await markComplete({
        courseId: courseId,
        topicId: topicId,
      }).unwrap();
      router.push(`/courses/${courseId}/topics/${13}`);
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

        <div className="flex items-center justify-between gap-2 lg:gap-4">
          <Button
            type="button"
            variant="outline"
            className="bg-transparent shadow-none hover:shadow-sm hover:bg-transparent"
            asChild
          >
            <Link href="/course">
              <ChevronLeft className="size-5" />
              Previous
            </Link>
          </Button>

          <Button
            type="button"
            variant="secondary"
            asChild
            onClick={handleNext}
            disabled={markCompleteLoading}
          >
            <div>
              Next
              <ChevronRight className="size-5" />
            </div>
          </Button>
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
