import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Home from "./pages/Home";
import TaskDetails from "./pages/TaskDetails";
import TaskForm from "./pages/TaskForm";
import { useTasks } from './context/TaskContext';

const App = () => {
  const { mode } = useTasks();
  return (
    <>
      <Navbar />
      <div className="p-4 pt-6" style={{ backgroundColor: mode ? "white" : "black", color: mode ? "black" : "white", minHeight: "100vh" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/task/:id" element={<TaskDetails />} />
          <Route path="/add" element={<TaskForm />} />
          <Route path="/edit/:id" element={<TaskForm />} />
        </Routes>
      </div>
    </>
  );
};

export default App;