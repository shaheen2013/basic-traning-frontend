import {
  TrainingSession,
  DailyTesting,
  Progress,
  ProductTraining,
  Record,
  Certification,
} from "@/components/icons";

export const reasons = [
  {
    id: 1,
    title: "Interactive Training Session",
    desc: "Live sessions integration for real-time learning.",
    icon: <TrainingSession className="text-inherit size-full" />,
  },
  {
    id: 2,
    title: "Daily Testing",
    desc: "Reinforce knowledge with daily exams.",
    icon: <DailyTesting className="text-inherit size-full" />,
  },
  {
    id: 3,
    title: "Progress Tracking",
    desc: "Monitor learning and tests scores",
    icon: <Progress className="text-inherit size-full" />,
  },
  {
    id: 4,
    title: "System & Product Training",
    desc: "Practical training for real-world scenarios.",
    icon: <ProductTraining className="text-inherit size-full" />,
  },
  {
    id: 5,
    title: "A Proven Track Record",
    desc: "Work with the best coaches in the industry.",
    icon: <Record className="text-inherit size-full" />,
  },
  {
    id: 6,
    title: "Master Certification",
    desc: "Earn recognition and certification.",
    icon: <Certification className="text-inherit size-full" />,
  },
];
