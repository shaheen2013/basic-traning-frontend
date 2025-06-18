export const courseData = {
  weeks: [
    {
      weekNumber: 1,
      title: "Week One",
      days: [
        {
          dayNumber: 1,
          title: "Welcome, Office Systems, and Life Insurance",
          duration: "2 h 8m + 1/3",
          topics: [
            {
              title: "Welcome and Introduction",
              href: "1-1-1-welcome-and-introduction",
              duration: "2m 48s",
              type: "video",
              isCompleted: true,
            },
            {
              title: "Review of Resources",
              href: "1-1-2-review-of-resources",
              duration: "2m 48s",
              type: "video",
              isCompleted: false,
            },
            {
              title: "Mindset",
              href: "1-1-3-mindset",
              duration: "2m 48s",
              type: "video",
              isCompleted: false,
            },
          ],
        },
        {
          dayNumber: 2,
          title: "Life Insurance",
          duration: "2 h 8m + 1/3",
          topics: [],
        },
        {
          dayNumber: 3,
          title: "Life and Business Lines",
          duration: "2 h 8m + 1/3",
          topics: [],
        },
        {
          dayNumber: 4,
          title: "Fire Insurance",
          duration: "2 h 8m + 1/3",
          topics: [],
        },
        {
          dayNumber: 5,
          title: "Fire Insurance (Continued)",
          duration: "2 h 8m + 1/3",
          topics: [],
        },
      ],
    },
    {
      weekNumber: 2,
      title: "Week Two",
      days: [],
    },
    {
      weekNumber: 3,
      title: "Week Three",
      days: [],
    },
  ],
};

export const type = "video"; // can be "video", "live-class", "quiz", "assignment", "preview"

export const quizStatus = "result"; // can be "instructions", "result"

export const testData = {
  quizId: "lesson-101-quiz",
  lessonId: "lesson-101",
  title: "JavaScript Basics Quiz",
  questions: [
    {
      id: "q1",
      type: "single",
      question: "Which one is a JavaScript framework?",
      options: [
        { id: "a", text: "React" },
        { id: "b", text: "Laravel" },
        { id: "c", text: "Django" },
        { id: "d", text: "Spring Boot" },
      ],
      durationInSeconds: 30,
    },
    {
      id: "q2",
      type: "multiple",
      question: "Which of the following are JavaScript data types?",
      options: [
        { id: "a", text: "String" },
        { id: "b", text: "Boolean" },
        { id: "c", text: "Float" },
        { id: "d", text: "Object" },
      ],
      correctAnswers: ["a", "b", "d"],
      durationInSeconds: 45,
    },
  ],
};

export const quizInstaructions = {};

export const quizResults = {
  title: "JavaScript Basics Quiz",
  time: "10 minutes",
  score: "2.5/10",
  percentage: "25%",
  duration: "1000",
  startedAt: "2023-10-01T10:00:00Z",
  completedAt: "2023-10-01T10:10:00Z",
};

export const previewData = {
  title: "Your are almost Done!",
  description:
    "Before starting your final test, we noticed that you haven't completed or passed some required modules. To ensure the best outcome, we recommend reviewing them first.",
  modules: [
    {
      week: "Week1 - Systems",
      day: "Day 1",
      duration: "2 h 8m",
      completion: "1/3",
      quizzes: [
        {
          name: "Quiz 1",
          score: "2.5/11",
          action: "/module-link",
        },
      ],
    },
    {
      week: "Week 3 - Health Insurance",
      day: "Day 6",
      duration: "2 h 8m",
      completion: "1/3",
      quizzes: [
        {
          name: "Quiz 1",
          score: "2.5/11",
          action: "/module-link",
        },
      ],
    },
    {
      week: "Week 6 - Auto Insurance",
      day: "Day 1",
      duration: "2 h 8m",
      completion: "1/3",
      quizzes: [
        {
          name: "Quiz 1",
          score: "2.5/11",
          action: "/module-link",
        },
      ],
    },
  ],
};
