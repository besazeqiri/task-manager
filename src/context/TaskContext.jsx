import { createContext, useContext, useEffect, useState } from "react";

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [mode, setMode] = useState(false);

    // Loads tasks from localStorage 
    useEffect(() => {
        const storedTasks = localStorage.getItem("tasks");
        if (storedTasks) {
            setTasks(JSON.parse(storedTasks));
        }
    }, []);

    // Saves tasks to localStorage 
    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);


    // Add a new task 
    const addTask = (task) => {
        setTasks([...tasks, { ...task, id: Date.now().toString() }]);
    };

    // Update existing task by ID
    const updateTask = (updatedTask) => {
        setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
    }

    // Delete a task by ID
    const deleteTask = (id) => {
        setTasks(tasks.filter((t) => t.id !== id));
    }
    // Toggles between dark and light mode
    const changeMode = () => {
        setMode(!mode);
    }

    return (
        <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask, mode, changeMode }}>
            {children}
        </TaskContext.Provider>
    );
};

export default TaskProvider;