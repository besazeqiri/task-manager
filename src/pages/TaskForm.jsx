import { useState, useEffect } from "react";
import { useTasks } from "../context/TaskContext";
import { useNavigate, useParams } from "react-router-dom";

const TaskForm = () => {
  const { addTask, updateTask, tasks } = useTasks();
  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    if (id) {
      const taskToEdit = tasks.find((t) => t.id === id);
      if (taskToEdit) {
        setTitle(taskToEdit.title);
        setDescription(taskToEdit.description);
        setStatus(taskToEdit.status);
      }
    }
  }, [id, tasks]);


  // Validates form fields and returns any validation errors
  const validate = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!description.trim()) newErrors.description = "Description is required";
    if (!status.trim()) newErrors.status = "Status is required";
    return newErrors;
  };


  // Handles form submission for both adding and editing tasks
  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (id) {
      updateTask({
        id,
        title: title.trim(),
        description: description.trim(),
        status,
      });
      setSuccessMsg("Task updated successfully!");
    } else {
      addTask({ title: title.trim(), description: description.trim(), status });
      setSuccessMsg("Task added successfully!");
      setTitle("");
      setDescription("");
      setStatus("");
    }

    setTimeout(() => {
      setSuccessMsg("");
      navigate("/");
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto px-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white text-center" style={{ color: 'inherit' }}>
        {id ? "Edit Task" : "Add Task"}
      </h2>
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-4 shadow-md rounded-md bg-white dark:bg-gray-800">
        <div className="mb-5">
          <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setErrors({ ...errors, title: null });
            }}
            className={`bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:ring-blue-500 focus:border-blue-500 ${errors.title ? "border-red-600" : "border-gray-300"
              } dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white`}
            placeholder="write a title"
          />
          {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title}</p>}
        </div>

        <div className="mb-5">
          <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setErrors({ ...errors, description: null });
            }}
            className={`bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:ring-blue-500 focus:border-blue-500 ${errors.description ? "border-red-600" : "border-gray-300"
              } dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white`}
            placeholder="write a description"
          />
          {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description}</p>}
        </div>

        <div className="mb-5">
          <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
          <select
            id="status"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setErrors({ ...errors, status: null });
            }}
            className={`bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:ring-blue-500 focus:border-blue-500 ${errors.status ? "border-red-600" : "border-gray-300"
              } dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white`}
          >
            <option value="" disabled hidden>Choose status</option>
            <option value="done">Done</option>
            <option value="unfinished">Unfinished</option>
          </select>
          {errors.status && <p className="text-red-600 text-sm mt-1">{errors.status}</p>}
        </div>

        <button type="submit" className="bg-blue-700 text-white px-5 py-2.5 rounded hover:bg-blue-800 w-full sm:w-auto">
          {id ? "Edit" : "Add"}
        </button>

        {successMsg && (
          <div className="mt-3 p-2 bg-green-200 text-green-800 rounded text-center">
            {successMsg}
          </div>
        )}
      </form>
    </div>
  );
};

export default TaskForm;
