import { useParams, useNavigate } from "react-router-dom";
import { useTasks } from "../context/TaskContext";
import { useEffect, useState } from "react";

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks } = useTasks();

  //Find the specific task by ID
  const task = tasks.find((t) => t.id === id);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setStatus(task.status);
    }
  }, [task]);

  //Display an error message and navigation option if the task is not found.
  if (!task) {
    return (
      <div className="max-w-3xl mx-auto p-4 text-center text-red-600">
        Task not found
        <button onClick={() => navigate("/")} className="bg-gray-300 hover:bg-gray-400 px-6 py-2 rounded mt-4">
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white text-center" style={{ color: 'inherit' }}>
        View Task
      </h2>
      <form className="max-w-lg mx-auto mt-10 p-6 shadow-md rounded-lg bg-white dark:bg-gray-900">
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Title
          </label>
          <p className="p-2.5 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 dark:bg-gray-800 dark:border-gray-600 dark:text-white">
            {title}
          </p>
        </div>

        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Description
          </label>
          <p className="p-2.5 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 dark:bg-gray-800 dark:border-gray-600 dark:text-white">
            {description}
          </p>
        </div>

        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Status
          </label>
          <p className="p-2.5 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 dark:bg-gray-800 dark:border-gray-600 dark:text-white">
            {status}
          </p>
        </div>

        <button type="button" onClick={() => navigate("/")} className="bg-gray-400 hover:bg-gray-500 px-6 py-2 rounded">
          Back to Home
        </button>
      </form>
    </div>
  );
};

export default TaskDetails;
