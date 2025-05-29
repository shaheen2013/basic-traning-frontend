"use client";

import { Comment as CommentIcon, Reply as ReplyIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { MorePopOver } from "./components";
import { useState } from "react";
import { Input } from "@/components/ui/input";

interface User {
  id: number;
  author: string;
  role: string;
  avatar: string;
  time: string;
}

interface Comment extends User {
  title: string;
  content: string;
  replies: Reply[];
}

interface Reply extends User {
  content: string;
  replies?: Reply[];
  type: "public" | "private";
}

export default function Conversations() {
  const [activeReply, setActiveReply] = useState<{
    id: number;
    type: "public" | "private";
  } | null>(null);
  console.log("activeReply", activeReply);
  const [replyContent, setReplyContent] = useState("");
  const [comments, setComments] = useState<Comment[]>([
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
            "Thank you for reaching out. Please check your pending modules. You need to complete modules 3, 5, and 7 before attempting the final quiz.",
          type: "public",
          replies: [
            {
              id: 1011,
              author: "Jenny Wilson",
              role: "Organizer",
              avatar: "/assets/course/Avatar.png",
              time: "20 hours ago",
              content:
                "I can help you identify which modules are incomplete. Would you like me to send you a detailed progress report?",
              type: "public",
            },
          ],
        },
      ],
    },
    {
      id: 2,
      author: "Sarah Johnson",
      role: "Course Participant",
      avatar: "/assets/course/Avatar.png",
      time: "Tue, Aug 1, 10:15 AM (5 hours ago)",
      title: "Certificate Not Generated",
      content:
        "I completed all modules but haven't received my certificate. Can you check what might be causing the delay?",
      replies: [
        {
          id: 201,
          author: "Esther Howard",
          role: "Instructor",
          avatar: "/assets/course/Avatar.png",
          time: "4 hours ago",
          content:
            "Certificates are usually generated within 24 hours of completion. I'll check the system and get back to you.",
          type: "public",
          replies: [
            {
              id: 2001,
              author: "Esther Howard",
              role: "Instructor",
              avatar: "/assets/course/Avatar.png",
              time: "4 hours ago",
              content:
                "Certificates are usually generated within 24 hours of completion. I'll check the system and get back to you.",
              type: "public",
              replies: [
                {
                  id: 20001,
                  author: "Esther Howard",
                  role: "Instructor",
                  avatar: "/assets/course/Avatar.png",
                  time: "4 hours ago",
                  content:
                    "Certificates are usually generated within 24 hours of completion. I'll check the system and get back to you.",
                  type: "public",
                },
              ],
            },
          ],
        },
      ],
    },
  ]);

  const handleReplySubmit = (
    commentId: number,
    parentId?: number | null,
    type: "public" | "private" = "public"
  ) => {
    if (!replyContent.trim()) return;

    const newReply: Reply = {
      id: Date.now(),
      author: "You",
      role: "Current User",
      avatar: "/assets/course/Avatar.png",
      time: "Just now",
      content: replyContent,
      type,
    };

    setComments((prevComments) =>
      prevComments.map((comment) => {
        if (comment.id === commentId) {
          if (parentId) {
            // Find and update nested reply
            const updateNestedReplies = (replies: Reply[]): Reply[] => {
              return replies.map((reply) => {
                if (reply.id === parentId) {
                  return {
                    ...reply,
                    replies: [...(reply.replies || []), newReply],
                  };
                }
                if (reply.replies) {
                  return {
                    ...reply,
                    replies: updateNestedReplies(reply.replies),
                  };
                }
                return reply;
              });
            };
            return {
              ...comment,
              replies: updateNestedReplies(comment.replies),
            };
          } else {
            // Add to top level replies
            return {
              ...comment,
              replies: [...comment.replies, newReply],
            };
          }
        }
        return comment;
      })
    );

    setReplyContent("");
    setActiveReply(null);
  };

  const renderReplies = (replies: Reply[], commentId: number, depth = 0) => {
    return replies.map((reply) => (
      <div
        key={reply.id}
        className={`mt-4 pl-${depth === 0 ? 4 : 8} border-l-2 border-slate-100`}
      >
        <div className="flex gap-3">
          <div className="flex-shrink-0">
            <Image
              src={reply.avatar}
              alt={reply.author}
              width={40}
              height={40}
              className="size-8 lg:size-10 rounded-full"
            />
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <span className="text-sm font-semibold text-primary">
                  {reply.author}
                </span>
                <span className="ml-2 text-xs text-slate-500">
                  {reply.role}
                </span>
              </div>
              <span className="text-xs text-slate-400">{reply.time}</span>
            </div>
            <p className="mt-1 text-sm text-slate-600">{reply.content}</p>

            <div className="mt-2 flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-xs"
                onClick={() =>
                  setActiveReply(
                    activeReply?.id === reply.id
                      ? null
                      : { id: reply.id, type: "public" }
                  )
                }
              >
                <ReplyIcon className="size-4" />
                Reply Publicly
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-xs"
                onClick={() =>
                  setActiveReply(
                    activeReply?.id === reply.id
                      ? null
                      : { id: reply.id, type: "private" }
                  )
                }
              >
                <ReplyIcon className="size-4" />
                Reply Privately
              </Button>
              {reply.replies && reply.replies.length > 0 && (
                <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
                  <CommentIcon className="size-4" />
                  {reply.replies.length} Replies
                </Button>
              )}
            </div>

            {activeReply?.id === reply.id && (
              <div className="mt-3">
                <Input
                  type="text"
                  placeholder="Type your reply here..."
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  className="text-sm"
                />
                <div className="mt-2 flex gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="h-8 px-3 text-xs"
                    onClick={() =>
                      handleReplySubmit(commentId, reply.id, activeReply.type)
                    }
                  >
                    Post {activeReply.type === "private" && "Private"} Reply
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 px-3 text-xs"
                    onClick={() => setActiveReply(null)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {reply.replies &&
              renderReplies(reply.replies, commentId, depth + 1)}
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="bg-slate-50 p-4 lg:p-6">
      <div className="space-y-6">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex gap-3">
                <Image
                  src={comment.avatar}
                  alt={comment.author}
                  width={40}
                  height={40}
                  className="size-10 rounded-full"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-primary">
                      {comment.author}
                    </h3>
                    <span className="text-xs text-slate-500">
                      {comment.role}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400">{comment.time}</span>
                </div>
              </div>
              <MorePopOver />
            </div>

            <div className="mt-4">
              <h3 className="text-lg font-semibold text-slate-800">
                {comment.title}
              </h3>

              <p className="mt-1 text-slate-600">{comment.content}</p>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-9 gap-1.5 px-3 text-sm"
                onClick={() =>
                  setActiveReply(
                    activeReply?.id === comment.id
                      ? null
                      : { id: comment.id, type: "public" }
                  )
                }
              >
                <ReplyIcon className="size-4" />
                Reply Publicly
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-9 gap-1.5 px-3 text-sm"
                onClick={() =>
                  setActiveReply(
                    activeReply?.id === comment.id
                      ? null
                      : { id: comment.id, type: "private" }
                  )
                }
              >
                <ReplyIcon className="size-4" />
                Reply Privately
              </Button>
              {comment.replies.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  className="h-9 gap-1.5 px-3 text-sm"
                >
                  <CommentIcon className="size-4" />
                  {comment.replies.length} Replies
                </Button>
              )}
            </div>

            {activeReply?.id === comment.id && (
              <div className="mt-4">
                <Input
                  type="text"
                  placeholder="Type your reply here..."
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                />
                <div className="mt-2 flex gap-2">
                  <Button
                    variant="secondary"
                    className="px-4"
                    onClick={() =>
                      handleReplySubmit(comment.id, null, activeReply.type)
                    }
                  >
                    Post {activeReply.type === "private" && "Private"} Reply
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setActiveReply(null)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {comment.replies.length > 0 && (
              <div className="mt-4">
                {renderReplies(comment.replies, comment.id)}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
