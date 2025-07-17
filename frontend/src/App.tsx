import Task from "./pages/Task";
import Onboarding from "./pages/Onboarding";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  const userGoal = localStorage.getItem("selectedGoal");

  return (
    <Routes>
      <Route
        path="/"
        element={
          userGoal ? <Navigate to="/task" replace /> : <Onboarding />
        }
      />
      <Route path="/task" element={<Task />} />
    </Routes>
  );
}

export default App;
