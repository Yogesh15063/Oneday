import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { goalTasks } from "@/constants/goalTasks";
import type{ TaskType } from "@/types/task.ts";
export default function Task() {
  
  const handleTaskComplete = () => {
    localStorage.setItem("taskCompleted", "true");
    localStorage.setItem("lastCompletedDate", new Date().toDateString());
    setTaskCompleted(true);
  };
  const [currentDay, setCurrentDay] = useState<number>(1);
  const [taskCompleted, setTaskCompleted] = useState<boolean>(false);
  const navigate = useNavigate();
  const [mygoal, setGoal] = useState<string | null>("");
  const dailyTask:TaskType[] = mygoal?goalTasks[mygoal]:[];

  const currentDayTask = dailyTask[currentDay-1]
  useEffect(() => {
    const today = new Date().toDateString();
    const completedDay = parseInt(localStorage.getItem("completedDay") || "0");
    const lastCompletedDate =localStorage.getItem("lastCompletedDate")||"";
    const wasTaskCompleted = localStorage.getItem("taskCompleted")==="true";
        // If task was completed AND a new day has started, move forward
        if(wasTaskCompleted && lastCompletedDate!==today){
          const newDay =completedDay+1;
          localStorage.setItem("completedDay",String(newDay));
          localStorage.setItem("taskCompleted","false");
          localStorage.setItem("lastCompletedDate",today);
          setCurrentDay(newDay);
          setTaskCompleted(false);
        }
        else{
          setCurrentDay(completedDay + 1); // same day if not completed
          setTaskCompleted(wasTaskCompleted);
        }
    const goal = localStorage.getItem("selectedGoal");
    setGoal(goal);
    if (!goal) {
      navigate("/");
    }

    

  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Your Task for Day {currentDay}</h1>

      {taskCompleted ? (
        <div className="text-green-600">
          🎉 Task Completed! Come back tomorrow for the next one.
        </div>
      ) : (
        <>
          <p className="mb-4">{}</p>
          <button
            onClick={handleTaskComplete}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Mark as Completed
          </button>
        </>
      )}
    </div>
  );
}
