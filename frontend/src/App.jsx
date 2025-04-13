import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TasksPage from "./pages/TaskPage"; 
import SignUpLoginPage from "./pages/SingUpLoginPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUpLoginPage />} />
        <Route path="/tasks" element={<TasksPage />} />
      </Routes>
    </Router>
  );
}

export default App;
