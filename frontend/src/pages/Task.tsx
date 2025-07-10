import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Task() {
  const tasks: string[] = [
    "Watch an intro video on your selected skill.",
    "Set up your development environment.",
    "Follow a basic tutorial and build a small project.",
    "Take a short quiz to test your understanding.",
  ];
  
  const navigate = useNavigate();
  const [mygoal, setGoal] = useState<string | null>("");
  useEffect(() => {
    const goal = localStorage.getItem("selectedGoal");
    setGoal(goal);
    if (!goal) {
      navigate("/");
    }
  }, []);

  return <div>{mygoal}</div>;
}
