import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

export default function Onboarding() {
  const goals: string[] = [
    "Become a Full-Stack MERN Developer",
    "Master Data Structures & Algorithm",
    "Become a Data Analyst",
    "Become a UI?UX Designer",
    "Learn System Design",
  ];

  return (
    <>
      <div className="h-screen w-full flex flex-col items-center px-4 py-4 ">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-wide text-center mb-6 font-custom">
            Choose What You Want To Become{" "}
            <span className="text-blue-600">OneDay</span>
          </h1>
        </div>
        <div className="flex-1 overflow-y-auto w-full max-w-md flex flex-col gap-4">
          {goals.map((goal, index) => (
            <Card key={index} className="w-full cursor-pointer hover:shadow-md hover:border-blue-500 transition">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-800 font-custom">{goal}</CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
