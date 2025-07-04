/* eslint-disable @typescript-eslint/no-explicit-any */
// components/video-modal.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import VideoPlayer from "@/app/(trainee)/courses/[courseid]/days/[dayid]/topics/[topicid]/components/video/components/videoPlayer";
import { Button } from "@/components/ui/button";

export function VideoModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(1);
  const [showInterestPrompt, setShowInterestPrompt] = useState(false);
  const [player, setPlayer] = useState<any>(null);
  const currentVideoRef = useRef(currentVideo);

  // Update the ref whenever currentVideo changes
  useEffect(() => {
    currentVideoRef.current = currentVideo;
  }, [currentVideo]);

  // Video configurations
  const videos: { [key: number]: { src: string; type: string } } = {
    1: {
      src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      type: "video/mp4",
    },
    2: {
      src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4", // Different video for testing
      type: "video/mp4",
    },
  };

  useEffect(() => {
    // Check if this is the first visit
    const hasVisited =
      localStorage.getItem("visitedBefore") ||
      document.cookie.includes("visitedBefore=true");

    if (!hasVisited) {
      setIsOpen(true);
      // Set flags to remember the visit
      localStorage.setItem("visitedBefore", "true");
      document.cookie = "visitedBefore=true; max-age=2592000; path=/"; // 30 days
    }

    setHasChecked(true);
  }, []);

  const handlePlayerReady = (player: any) => {
    setPlayer(player);

    player.on("ended", () => {
      console.log("Video ended, currentVideoRef:", currentVideoRef.current);
      if (currentVideoRef.current === 1) {
        console.log("First video ended - showing prompt");
        setShowInterestPrompt(true);
      } else {
        console.log("Second video ended - closing modal");
        setIsOpen(false);
      }
    });
  };

  const handleInterestResponse = (interested: boolean) => {
    setShowInterestPrompt(false);
    if (interested) {
      console.log("User interested - showing second video");
      setCurrentVideo(2);
      if (player) {
        player.src(videos[2]);
        player.play();
      }
    } else {
      console.log("User not interested - closing modal");
      setIsOpen(false);
    }
  };

  if (!hasChecked) return null;

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    muted: true,
    sources: [videos[currentVideo]],
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-[800px] w-full p-0 overflow-hidden">
        <DialogTitle className="sr-only">Welcome Video</DialogTitle>
        <div className="relative pt-[56.25%]">
          {/* 16:9 aspect ratio */}
          <div className="absolute inset-0">
            <VideoPlayer options={videoJsOptions} onReady={handlePlayerReady} />

            {/* Interest Prompt Overlay */}
            {showInterestPrompt && (
              <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center p-4 z-50">
                <h3 className="text-white text-xl font-bold mb-4">
                  Want to see more?
                </h3>
                <p className="text-white mb-6 text-center">
                  We have another video that you might find interesting.
                </p>
                <div className="flex gap-4">
                  <Button
                    variant="default"
                    onClick={() => handleInterestResponse(true)}
                    className="bg-green-600 hover:bg-green-700 px-6 py-2"
                  >
                    Yes, Show Me
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleInterestResponse(false)}
                    className="text-white border-white hover:bg-white hover:text-black px-6 py-2"
                  >
                    No Thanks
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
