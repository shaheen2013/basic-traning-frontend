/* eslint-disable @typescript-eslint/no-explicit-any */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatSecondsToReadableTime(seconds: number): string {
  const days = Math.floor(seconds / (3600 * 24));
  const hours = Math.floor((seconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  if (minutes > 0) return `${minutes}m ${secs}s`;
  return `${secs}s`;
}
export function textToSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .trim();
}

export function getCurrentWeekAndDay(topicId: string, modules: any) {
  console.log("Modules:", modules);
  let currentWeek, currentDay;

  // Search through weeks and days
  for (const week of modules.weeks) {
    for (const day of week.days) {
      if (day.topics.some((topic: any) => topic.id === Number(topicId))) {
        currentWeek = week.weekNumber;
        currentDay = day.dayNumber;
        return { currentWeek, currentDay };
      }
    }
  }
  return { currentWeek: null, currentDay: null };
}
