"use client";

import { Comment, Reply } from "@/components/icons";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { MorePopOver } from "./components";
import { useState } from "react";
import { Input } from "@/components/ui/input";

export default function Conversations() {
  const [isOpen, setIsOpen] = useState(false);
  const [comments] = useState([
    {
      id: 1,
      author: "Joseph McFall",
      role: "CEO & Founder XXX LLC",
      avatar: "/assets/course/Avatar.png",
      time: "Mon, Jul 31, 3:20 PM (22 hours ago)",
      title: "Issue with Final Quiz Access",
      content:
        "I attempted the final quiz but it says I'm not eligible. Can you please check if I missed any modules?",
      replies: [
        {
          id: 101,
          author: "Esther Howard",
          role: "Instructor",
          avatar: "/assets/course/Avatar.png",
          time: "21 hours ago",
          content:
            "Thank you for reaching out. Please check your pending modules...",

          replies: [
            {
              id: 1011,
              author: "Jenny Wilson",
              role: "Organizer",
              avatar: "/assets/course/Avatar.png",
              time: "20 hours ago",
              content:
                "I can help you identify which modules are incomplete...",
            },
          ],
        },
        {
          id: 102,
          author: "Jenny Wilson",
          role: "Organizer",
          avatar: "/assets/course/Avatar.png",
          time: "20 hours ago",
          content: "I can help you identify which modules are incomplete...",
        },
        {
          id: 103,
          author: "Jenny Wilson",
          role: "Organizer",
          avatar: "/assets/course/Avatar.png",
          time: "20 hours ago",
          content: "I can help you identify which modules are incomplete...",
        },
      ],
    },
    {
      id: 2,
      author: "Joseph McFall",
      role: "CEO & Founder XXX LLC",
      avatar: "/assets/course/Avatar.png",
      time: "Mon, Jul 31, 3:20 PM (22 hours ago)",
      title: "Issue with Final Quiz Access",
      content:
        "I attempted the final quiz but it says I'm not eligible. Can you please check if I missed any modules?",
      replies: [
        {
          id: 201,
          author: "Esther Howard",
          role: "Instructor",
          avatar: "/assets/course/Avatar.png",
          time: "21 hours ago",
          content:
            "Thank you for reaching out. Please check your pending modules...",

          replies: [
            {
              id: 2011,
              author: "Jenny Wilson",
              role: "Organizer",
              avatar: "/assets/course/Avatar.png",
              time: "20 hours ago",
              content:
                "I can help you identify which modules are incomplete...",
            },
          ],
        },
        {
          id: 202,
          author: "Jenny Wilson",
          role: "Organizer",
          avatar: "/assets/course/Avatar.png",
          time: "20 hours ago",
          content: "I can help you identify which modules are incomplete...",
        },
        {
          id: 203,
          author: "Jenny Wilson",
          role: "Organizer",
          avatar: "/assets/course/Avatar.png",
          time: "20 hours ago",
          content: "I can help you identify which modules are incomplete...",
        },
      ],
    },
  ]);
  return (
    <div className="flex bg-slate-50 p-4 lg:p-6 overflow-y-auto h-screen">
      <div className="rounded-xl bg-white border border-slate-200 p-4 h-fit w-full">
        {comments.map((comment) => (
          <div key={comment.id}>
            <div className="flex flex-col lg:flex-row justify-between gap-2 lg:items-center">
              <div className="flex gap-2.5 items-center">
                <Image
                  src={comment.avatar}
                  alt={comment.author}
                  width={40}
                  height={40}
                  className="size-8 lg:size-10 rounded-full"
                />
                <div className="flex flex-col justify-between">
                  <h3 className="text-primary text-sm font-semibold">
                    {comment.author}
                  </h3>
                  <span className="text-slate-600 text-sm">{comment.role}</span>
                </div>
              </div>
              <div className="flex gap-3 items-center justify-between">
                <span className="text-slate-600 text-sm">{comment.time}</span>
                <MorePopOver />
              </div>
            </div>
            <hr className="border-slate-200 my-4" />
            <h3 className="text-primary text-xl font-semibold mb-4">
              {comment.title}
            </h3>
            <p className="text-slate-600 text-base mb-4">{comment.content}</p>
            <div className="flex flex-wrap gap-4 items-start mt-4">
              <Button
                variant="outline"
                className="w-full lg:w-fit"
                onClick={() => setIsOpen(true)}
              >
                <Reply className="size-5 text-primary" />
                Reply Publicly
              </Button>
              <Button variant="outline" className="w-full lg:w-fit">
                <Reply className="size-5 text-primary" /> Reply Privately
              </Button>
              <Button variant="outline" className="w-full lg:w-fit">
                <Comment className="size-5 text-primary" />
                {comment.replies.length} Replies
              </Button>
            </div>
            {isOpen && (
              <form>
                <Input
                  type="text"
                  placeholder="Type your reply here..."
                  className="mt-4"
                />
                <Button className="mt-4" type="submit">
                  Reply
                </Button>
              </form>
            )}
            {/* replies of replies */}
            <div className="my-4">
              {comment.replies.map((reply) => (
                <div key={reply.id} className="pl-4">
                  <div className="">
                    <div className="flex gap-2.5 items-center mb-4">
                      <Image
                        src={reply.avatar}
                        alt={reply.author}
                        width={40}
                        height={40}
                        className="size-8 lg:size-10 rounded-full"
                      />
                      <div className="flex flex-col justify-between">
                        <h3 className="text-primary text-sm font-semibold">
                          {reply.author}
                          <span className="text-slate-600 ml-1 font-normal">
                            {reply.time}
                          </span>
                        </h3>
                        <span className="text-slate-600 text-sm">
                          {reply.role}
                        </span>
                      </div>
                    </div>
                    <p className="text-slate-600 text-sm mb-4 pl-12.5">
                      {comment.content}
                    </p>
                    <div className="flex flex-wrap gap-4 items-center mb-4 pl-12.5">
                      <Button
                        variant="ghost"
                        className="px-0 has-[>svg]:px-0 h-fit hover:bg-transparent hover:text-primary "
                      >
                        <Reply className="size-5 text-primary" />
                        Reply Publicly
                      </Button>
                      <Button
                        variant="ghost"
                        className="px-0 has-[>svg]:px-0 h-fit hover:bg-transparent hover:text-primary"
                      >
                        <Reply className="size-5 text-primary" /> Reply
                        Privately
                      </Button>
                      <Button
                        variant="ghost"
                        className="px-0 has-[>svg]:px-0 h-fit hover:bg-transparent hover:text-primary"
                      >
                        <Comment className="size-5 text-primary" />
                        {comment.replies.length} Replies
                      </Button>
                    </div>
                    {isOpen && (
                      <form>
                        <Input
                          type="text"
                          placeholder="Type your reply here..."
                          className="mt-4"
                        />
                        <Button className="mt-4" type="submit">
                          Reply
                        </Button>
                      </form>
                    )}
                  </div>
                  <div className="pl-4">
                    <div className="flex gap-2.5 items-center mb-4">
                      <Image
                        src={reply.avatar}
                        alt={reply.author}
                        width={40}
                        height={40}
                        className="size-8 lg:size-10 rounded-full"
                      />
                      <div className="flex flex-col justify-between">
                        <h3 className="text-primary text-sm font-semibold">
                          {reply.author}
                          <span className="text-slate-600 ml-1 font-normal">
                            {reply.time}
                          </span>
                        </h3>
                        <span className="text-slate-600 text-sm">
                          {reply.role}
                        </span>
                      </div>
                    </div>
                    <p className="text-slate-600 text-sm mb-4 pl-12.5">
                      {comment.content}
                    </p>
                    <div className="flex flex-wrap gap-4 items-center mb-4 pl-12.5">
                      <Button
                        variant="ghost"
                        className="px-0 has-[>svg]:px-0 h-fit hover:bg-transparent hover:text-primary "
                      >
                        <Reply className="size-5 text-primary" />
                        Reply Publicly
                      </Button>
                      <Button
                        variant="ghost"
                        className="px-0 has-[>svg]:px-0 h-fit hover:bg-transparent hover:text-primary"
                      >
                        <Reply className="size-5 text-primary" /> Reply
                        Privately
                      </Button>
                      <Button
                        variant="ghost"
                        className="px-0 has-[>svg]:px-0 h-fit hover:bg-transparent hover:text-primary"
                      >
                        <Comment className="size-5 text-primary" />
                        {comment.replies.length} Replies
                      </Button>
                    </div>
                    {isOpen && (
                      <form>
                        <Input
                          type="text"
                          placeholder="Type your reply here..."
                          className="mt-4"
                        />
                        <Button className="mt-4" type="submit">
                          Reply
                        </Button>
                      </form>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
