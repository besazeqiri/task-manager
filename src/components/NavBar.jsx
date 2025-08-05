import { Link } from "react-router-dom";
import { useTasks } from "../context/TaskContext";

const Navbar = () => {
  const { mode, changeMode } = useTasks();

  return (
    <nav className={`w-full px-4 py-4 shadow-md ${mode ? "bg-white text-black" : "bg-gray-900 text-white"}`}>
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-4">
        <h1 className="text-xl md:text-2xl font-semibold">Task Manager</h1>
        <div className="flex flex-wrap items-center gap-2 md:gap-4">
          <Link to="/"
            className={`px-3 md:px-4 py-2 rounded-md text-sm font-medium ${mode
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-blue-400 hover:bg-blue-500 text-black"
              }`} >
            Home
          </Link>
          <Link to="/add"
            className={`px-3 md:px-4 py-2 rounded-md text-sm font-medium ${mode
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-blue-400 hover:bg-blue-500 text-black"
              }`}>
            Add Task
          </Link>

          <button onClick={changeMode}
            className={`px-3 md:px-4 py-2 rounded-md text-sm font-medium ${mode
              ? "bg-gray-800 hover:bg-gray-900 text-white"
              : "bg-white hover:bg-gray-100 text-black"
              }`}>
            {mode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
