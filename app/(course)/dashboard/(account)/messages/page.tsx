"use client";

import { Comment as CommentIcon, Reply as ReplyIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { MorePopOver } from "./components";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { ChevronDown, ChevronUp } from "lucide-react";
import { courseMenus } from "@/components/partials/header/constans";
import { usePathname } from "next/navigation";

interface User {
  id: number;
  author: string;
  role: string;
  avatar: string;
  time: string;
}

interface Reply extends User {
  content: string;
  replies?: Reply[];
  type: "public" | "private";
}

interface Comment extends User {
  title: string;
  content: string;
  replies: Reply[];
}

export default function Conversations() {
  const pathname = usePathname();
  // State for active reply form
  const [activeReply, setActiveReply] = useState<{
    id: number;
    type: "public" | "private";
    parentId?: number | null;
    commentId: number;
  } | null>(null);

  // State for expanded replies (track which replies are visible)
  const [expandedReplies, setExpandedReplies] = useState<
    Record<number, boolean>
  >({});

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
            "Thank you for reaching out. You need to complete modules 3, 5, and 7 before attempting the final quiz.",
          type: "public",
          replies: [
            {
              id: 1011,
              author: "Jenny Wilson",
              role: "Organizer",
              avatar: "/assets/course/Avatar.png",
              time: "20 hours ago",
              content:
                "I can send you a detailed progress report if you'd like.",
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
        },
      ],
    },
  ]);

  // Toggle visibility of replies
  const toggleReplies = (id: number) => {
    setExpandedReplies((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Handle reply submission
  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyContent.trim() || !activeReply) return;

    const newReply: Reply = {
      id: Date.now(),
      author: "You",
      role: "Current User",
      avatar: "/assets/course/Avatar.png",
      time: "Just now",
      content: replyContent,
      type: activeReply.type,
    };

    setComments((prevComments) =>
      prevComments.map((comment) => {
        if (comment.id === activeReply.commentId) {
          // Add to top level if no parentId
          if (!activeReply.parentId) {
            return {
              ...comment,
              replies: [...comment.replies, newReply],
            };
          }

          // Find and update nested replies
          const updateNestedReplies = (replies: Reply[]): Reply[] => {
            return replies.map((reply) => {
              if (reply.id === activeReply.parentId) {
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
        }
        return comment;
      })
    );

    // Reset form and auto-expand the replies
    setReplyContent("");
    setActiveReply(null);
    if (activeReply.parentId) {
      setExpandedReplies((prev) => ({
        ...prev,
        [activeReply.parentId!]: true,
      }));
    } else {
      setExpandedReplies((prev) => ({
        ...prev,
        [activeReply.commentId]: true,
      }));
    }
  };

  // Render nested replies recursively
  const renderReplies = (replies: Reply[], commentId: number, depth = 0) => {
    return replies.map((reply) => (
      <div
        key={reply.id}
        className={`mt-4 ${
          depth > 0 ? "pl-8" : "pl-4"
        } border-l-2 border-slate-100`}
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

            <div className="mt-2 flex flex-wrap gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-xs"
                onClick={() =>
                  setActiveReply({
                    id: reply.id,
                    type: "public",
                    parentId: reply.id,
                    commentId,
                  })
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
                  setActiveReply({
                    id: reply.id,
                    type: "private",
                    parentId: reply.id,
                    commentId,
                  })
                }
              >
                <ReplyIcon className="size-4" />
                Reply Privately
              </Button>
              {reply.replies && reply.replies.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 text-xs"
                  onClick={() => toggleReplies(reply.id)}
                >
                  <CommentIcon className="size-4" />
                  {reply.replies.length} Replies
                  <span className="ml-1">
                    {expandedReplies[reply.id] ? (
                      <ChevronDown />
                    ) : (
                      <ChevronUp />
                    )}
                  </span>
                </Button>
              )}
            </div>

            {/* Reply form for this specific reply */}
            {activeReply?.id === reply.id && (
              <form onSubmit={handleReplySubmit} className="mt-3">
                <Input
                  type="text"
                  placeholder="Type your reply here..."
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  className="text-sm"
                  required
                />
                <div className="mt-2 flex gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="h-8 px-3 text-xs"
                    type="submit"
                  >
                    Post {activeReply.type === "private" ? "Private " : ""}Reply
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 px-3 text-xs"
                    type="button"
                    onClick={() => setActiveReply(null)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            )}

            {/* Nested replies */}
            {reply.replies &&
              expandedReplies[reply.id] &&
              renderReplies(reply.replies, commentId, depth + 1)}
          </div>
        </div>
      </div>
    ));
  };

  return (
    <>
      <div className="hidden lg:block font-semibold lg:text-2xl text-lg lg:py-6 lg:px-8 p-4 bg-slate-200 rounded-t-2xl capitalize">
        {courseMenus.find((menu) => menu.href === pathname)?.label}
      </div>
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
                    <span className="text-xs text-slate-400">
                      {comment.time}
                    </span>
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
                    setActiveReply({
                      id: comment.id,
                      type: "public",
                      commentId: comment.id,
                    })
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
                    setActiveReply({
                      id: comment.id,
                      type: "private",
                      commentId: comment.id,
                    })
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
                    onClick={() => toggleReplies(comment.id)}
                  >
                    <CommentIcon className="size-4" />
                    {comment.replies.length} Replies
                    <span className="ml-1">
                      {expandedReplies[comment.id] ? (
                        <ChevronDown />
                      ) : (
                        <ChevronUp />
                      )}
                    </span>
                  </Button>
                )}
              </div>

              {/* Reply form for main comment */}
              {activeReply?.id === comment.id && (
                <form onSubmit={handleReplySubmit} className="mt-4">
                  <Input
                    type="text"
                    placeholder="Type your reply here..."
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    required
                  />
                  <div className="mt-2 flex gap-2">
                    <Button variant="secondary" className="px-4" type="submit">
                      Post {activeReply.type === "private" ? "Private " : ""}
                      Reply
                    </Button>
                    <Button
                      variant="outline"
                      type="button"
                      onClick={() => setActiveReply(null)}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              )}

              {/* Replies section */}
              {comment.replies.length > 0 && expandedReplies[comment.id] && (
                <div className="mt-4">
                  {renderReplies(comment.replies, comment.id)}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
