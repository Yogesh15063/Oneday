import { useNavigate } from "react-router-dom";
import { Card, CardHeader,  CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
export default function Onboarding() {
  const goals: string[] = [
    "Become a Full-Stack MERN Developer",
    "Master Data Structures & Algorithm",
    "Become a Data Analyst",
    "Become a UI?UX Designer",
    "Learn System Design",
  ];
  const navigate = useNavigate()
  const [selectedGoal, setSelectedGoal] = useState<string>("");
  const onClickHandler = (goal: string) => {
    setSelectedGoal(goal);
  };

  const continueHandler = ()=>{
    if (selectedGoal){
      localStorage.setItem("selectedGoal",selectedGoal);
      navigate("/task")
    }
  }
  return (
    <>
      <div className="h-screen w-full flex flex-col items-center px-4 py-4 overflow-hidden ">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-wide text-center mb-6 font-custom">
            Choose What You Want To Become{" "}
            <span className="text-blue-600">OneDay</span>
          </h1>
        </div>
        <div className="flex flex-col items-center gap-4 w-full max-w-md">
          {goals.map((goal, index) => (
            <Card
              onClick={() => onClickHandler(goal)}
              key={index}
              className={`w-full h-16 cursor-pointer hover:shadow-md hover:border-black flex items-center transition-colors duration-300 ${
    selectedGoal === goal ? "bg-black text-white" : "bg-white text-black"
  }`}
            >
              <CardHeader className="w-full h-full flex items-center">
                <CardTitle className="text-lg font-semibold font-custom ">
                  {goal}
                </CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
        <div className="mt-6">
          <Button onClick={continueHandler} className="cursor-pointer" disabled={selectedGoal === ""}>
            Continue
          </Button>
        </div>
      </div>
    </>
  );
}
