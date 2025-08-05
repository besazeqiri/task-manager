import { useTasks } from "../context/TaskContext";
import { useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
    const { tasks, deleteTask } = useTasks();
    const [filter, setFilter] = useState("all");
    const [search, setSearch] = useState("");

    // Filter tasks based on search input and selected status filter
    const filteredTasks = tasks.filter((task) => {
        const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase());
        if (search) {
            return matchesSearch;
        }
        if (filter === "done") return task.status === "Done";
        if (filter === "unfinished") return task.status === "Unfinished";
        return true;
    });

    return (
        <div className="p-4 max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4 mb-6">

                {/* Search input section */}
                <div className="flex-1">
                    <label htmlFor="default-search" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" style={{ color: 'inherit' }}>
                        Search
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input type="text" id="default-search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." className="block w-full p-2 pl-10 text-sm border border-gray-300 rounded-md bg-white text-black focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400" />
                    </div>
                </div>

                {/* Filter dropdown */}
                <div className="w-full sm:w-48">
                    <label htmlFor="filter" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" style={{ color: 'inherit' }}>
                        Filter Tasks:
                    </label>
                    <select id="filter" value={filter} onChange={(e) => setFilter(e.target.value)} className="block w-full p-2 text-sm border border-gray-300 rounded-md bg-white text-black dark:bg-gray-800 dark:border-gray-600 dark:text-white">
                        <option value="all">All</option>
                        <option value="done">Done</option>
                        <option value="unfinished">Unfinished</option>
                    </select>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600 text-sm dark:text-white">
                    <thead className="bg-inherit-100">
                        <tr>
                            <th className="border border-gray-300  px-4 py-2 text-left">Title</th>
                            <th className="border border-gray-300  px-4 py-2 text-left">Description</th>
                            <th className="border border-gray-300  px-4 py-2 text-left">Status</th>
                            <th className="border border-gray-300  px-4 py-2 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTasks.length > 0 ? (
                            filteredTasks.map((task) => (
                                <tr key={task.id}>
                                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                                        <Link to={`/task/${task.id}`} className="font-semibold text-blue-600 hover:underline dark:text-blue-400">
                                            {task.title}
                                        </Link>
                                    </td>
                                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{task.description}</td>
                                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{task.status}</td>
                                    <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 space-x-2 text-center">
                                        <Link to={`/edit/${task.id}`} className="bg-yellow-500 text-white px-2 py-1 rounded text-sm">
                                            Edit
                                        </Link>
                                        <button onClick={() => {
                                            if (confirm("Are you sure you want to delete this task?")) {
                                                deleteTask(task.id);
                                            }
                                        }}
                                            className="bg-red-600 text-white px-2 mt-2 py-1 rounded text-sm">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center text-gray-500 dark:text-gray-400 py-4" style={{ color: 'inherit' }}>
                                    No tasks to display
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="mt-8 text-center">
                <Link to="/add" className="inline-block bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md font-semibold transition">
                    Add Task
                </Link>
            </div>
        </div>
    );
};

export default Home;
