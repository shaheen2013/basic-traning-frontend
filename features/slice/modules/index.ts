/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const modulesSlice = createSlice({
  name: "modules",
  initialState: null as any,
  reducers: {
    shareModules: (state, action) => {
      return action.payload;
    },
    markTopicCompleted: (
      state,
      action: PayloadAction<{
        current_lesson: number;
        next_lesson: number;
      }>
    ) => {
      if (!state || !state.weeks) {
        console.log("No weeks data available");
        return;
      }

      let foundCurrent = false;
      let foundNext = false;

      // Search through weeks, days, and topics
      for (const week of state.weeks) {
        if (!week.days) continue;

        for (const day of week.days) {
          if (!day.topics) continue;

          // Find and update current lesson
          if (!foundCurrent) {
            const currentLesson = day.topics.find(
              (t: any) => t.id === action.payload.current_lesson
            );
            if (currentLesson) {
              currentLesson.is_completed = true;
              foundCurrent = true;
            }
          }

          // Find and update next lesson
          if (!foundNext) {
            const nextLesson = day.topics.find(
              (t: any) => t.id === action.payload.next_lesson
            );
            if (nextLesson) {
              nextLesson.is_locked = false;
              foundNext = true;
            }
          }

          // If both are found, exit early
          if (foundCurrent && foundNext) {
            return;
          }
        }
      }

      console.log(
        foundCurrent
          ? `Updated current lesson ${action.payload.current_lesson}`
          : `Current lesson ${action.payload.current_lesson} not found`
      );
      console.log(
        foundNext
          ? `Updated next lesson ${action.payload.next_lesson}`
          : `Next lesson ${action.payload.next_lesson} not found`
      );
    },
  },
});

export const { shareModules, markTopicCompleted } = modulesSlice.actions;
export default modulesSlice.reducer;
