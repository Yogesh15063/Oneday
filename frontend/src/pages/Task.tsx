import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { goalTasks } from "@/constants/goalTasks";
import type { TaskType } from "@/types/task.ts";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
export default function Task() {
  const navigate = useNavigate();

  // --------------------------
  // States
  // --------------------------

  const [currentDay, setCurrentDay] = useState<number>(1); // 1-based day index

  const [taskCompleted, setTaskCompleted] = useState<boolean>(false); // is today's task completed

  const [mygoal, setGoal] = useState<string | null>(""); // selected goal from localStorage

  const [showHints, setShowHints] = useState(false);

  // Get the tasks list for the selected goal (if available)
  const dailyTask: TaskType[] = mygoal ? goalTasks[mygoal] : [];

  // Get the task for the current day (day 1 = index 0)
  const currentDayTask = dailyTask[currentDay - 1];

  // --------------------------
  // Handle "Mark as Completed"
  // --------------------------
  const handleTaskComplete = () => {
    localStorage.setItem("taskCompleted", "true");
    localStorage.setItem("lastCompletedDate", new Date().toDateString());
    setTaskCompleted(true);
  };

  // --------------------------
  // On Component Mount
  // --------------------------
  useEffect(() => {
    const today = new Date().toDateString();

    const completedDay = parseInt(localStorage.getItem("completedDay") || "0");
    const lastCompletedDate = localStorage.getItem("lastCompletedDate") || "";
    const wasTaskCompleted = localStorage.getItem("taskCompleted") === "true";

    // If user completed the task yesterday, and today is a new day ➝ increment the day
    if (wasTaskCompleted && lastCompletedDate !== today) {
      const newDay = completedDay + 1;

      localStorage.setItem("completedDay", String(newDay));
      localStorage.setItem("taskCompleted", "false");
      localStorage.setItem("lastCompletedDate", today);

      setCurrentDay(newDay);
      setTaskCompleted(false);
    } else {
      // If not completed or same day ➝ keep the same day
      setCurrentDay(completedDay + 1);
      setTaskCompleted(wasTaskCompleted);
    }

    // Get goal from localStorage
    const goal = localStorage.getItem("selectedGoal");
    setGoal(goal);

    // If goal is not selected ➝ navigate back to onboarding
    if (!goal) {
      navigate("/");
    }
  }, []);

  // --------------------------
  // Render UI
  // --------------------------

  return (
    <div className="max-w-xl mx-auto px-4 py-8 min-h-screen flex flex-col justify-center items-center bg-gray-50 dark:bg-neutral-900 text-gray-800 dark:text-gray-100 font-custom">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
        Your Task for Day {currentDay}
      </h1>
  
      {taskCompleted ? (
        <div className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-6 py-4 rounded-xl shadow-md text-center w-full">
          🎉 Task Completed! Come back tomorrow for the next one.
        </div>
      ) : (
        <>
          {currentDayTask ? (
            <div className="bg-white dark:bg-neutral-800 w-full p-6 rounded-xl shadow-md">
              <p className="text-base sm:text-lg font-medium mb-4">
                {currentDayTask.task}
              </p>
  
              <Accordion type="multiple" className="w-full">
                <AccordionItem value="hint-1">
                  <AccordionTrigger>Show Hint 1</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      💡 {currentDayTask.hint1}
                    </p>
                  </AccordionContent>
                </AccordionItem>
  
                <AccordionItem value="hint-2">
                  <AccordionTrigger>Show Hint 2</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      💡 {currentDayTask.hint2}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
  
              <button
                onClick={handleTaskComplete}
                className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-all w-full text-center"
              >
                Mark as Completed
              </button>
            </div>
          ) : (
            <p className="text-center text-lg text-green-600">
              🎉 You've completed all tasks!
            </p>
          )}
        </>
      )}
    </div>
  );
  
}
