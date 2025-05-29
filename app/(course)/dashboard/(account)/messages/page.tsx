import { Comment, Reply } from "@/components/icons";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { MorePopOver } from "./components";

export default function Conversations() {
  return (
    <div className="flex bg-slate-50 h-full p-4 lg:p-6">
      <div className="rounded-xl bg-white border border-slate-200 p-4 h-fit w-full">
        <div>
          <div className="flex flex-col lg:flex-row justify-between gap-2 lg:items-center">
            <div className="flex gap-2.5 items-center">
              <Image
                src="/assets/course/Avatar.png"
                alt="avatar"
                width={40}
                height={40}
                className="size-8 lg:size-10 rounded-full"
              />
              <div className="flex flex-col justify-between">
                <h3 className="text-primary text-sm font-semibold">
                  Joseph McFall
                </h3>
                <span className="text-slate-600 text-sm">Trainee</span>
              </div>
            </div>
            <div className="flex gap-3 items-center justify-between">
              <span className="text-slate-600 text-sm">
                Mon, Jul 31, 3:20 PM (22 hours ago)
              </span>
              <MorePopOver />
            </div>
          </div>
          <hr className="border-slate-200 my-4" />
          <h3 className="text-primary text-xl font-semibold mb-4">
            Issue with Final Quiz Access
          </h3>
          <p className="text-slate-600 text-base mb-4">
            I attempted the final quiz but it says I'm not eligible. Can you
            please check if I missed any modules?
          </p>
          <div className="flex flex-wrap gap-4 items-center mt-4">
            <Button variant="outline" className="w-full lg:w-fit">
              <Reply className="size-5 text-primary" />
              Reply Publicly
            </Button>
            <Button variant="outline" className="w-full lg:w-fit">
              <Reply className="size-5 text-primary" /> Reply Privately
            </Button>
            <Button variant="outline" className="w-full lg:w-fit">
              <Comment className="size-5 text-primary" /> 40
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
