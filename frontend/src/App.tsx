import Task from "./pages/Task";
import Onboarding from "./pages/Onboarding"
import { Routes, Route } from "react-router-dom";
function App() {
  return (
  <Routes>
    <Route path="/"element={<Onboarding/>}/>
    <Route path="/task"element={<Task/>}/>
  </Routes>
  )
}

export default App