
 import type{TaskType}  from "@/types/task.ts";
export const goalTasks:Record<string,TaskType[]> = {
    "Become a Full-Stack MERN Developer": [
      {
        day: 1,
        task: "Set up your development environment with Node.js, VS Code, Git.",
        hint1: "Install Node.js LTS version and verify with `node -v`.",
        hint2: "Use VS Code extensions like Prettier, ES Lint, GitLens for productivity.",
      },
      {
        day: 2,
        task: "Learn how the web works (HTTP, DNS, Hosting).",
        hint1: "Watch a video about browser-to-server request lifecycle.",
        hint2: "Research how DNS lookup happens.",
      },
      // add up to 90 progressively
    ],
    "Master Data Structures & Algorithm": [
      {
        day: 1,
        task: "Understand Time & Space Complexity.",
        hint1: "Big O Notation is used to describe performance.",
        hint2: "Watch a video on O(1), O(n), O(log n).",
      },
      // ...
    ],
    // add other goals similarly
  };
  