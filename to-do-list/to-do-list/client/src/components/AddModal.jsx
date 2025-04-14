import { useEffect, useState } from "react";

export default function Addmodal({ hide }) {
    const [title, setTitle] = useState('');
    const [tasks, setTasks] = useState([]);

    const addTask = () => {
        setTasks([...tasks, ""]);
    };

    const removeTask = (index) => {
        setTasks(tasks.filter((_, i) => i !== index));
    };

    // Handle task input change
    const handleTaskChange = (index, value) => {
        const newTasks = [...tasks];
        newTasks[index] = value;
        setTasks(newTasks);
    };

    const handleSave = () => {
        if (!title.trim()) {
            alert("Please enter a task title.");
            return;
        }

        const validTasks = tasks.filter(task => task.trim() !== "");
        if (validTasks.length === 0) {
            alert("Please enter at least one task.");
            return;
        }

        console.log({
            title,
            tasks: validTasks
        });

        alert('Tasks saved successfully!');
        hide(); // Close modal after saving
    };

    useEffect(() => {
        if (tasks.length === 0) {
            setTasks([""]);
        }
    }, [tasks]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-400 bg-opacity-50">
            <div className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-xl">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">About Your Tool</h3>
                    <button
                        onClick={hide}
                        id="closeModalButton"
                        className="text-gray-500 hover:text-gray-700"
                    >
                        <svg
                            className="h-4 w-4 inline-block ml-2"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            ></path>
                        </svg>
                    </button>
                </div>

                <div className="space-y-4">
                    {/* Title Input */}
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            Task Title
                        </label>
                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            type="text"
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-white text-gray-900 placeholder-gray-400"
                        />
                    </div>

                    {/* Task List */}
                    <div className="mt-3">
                        <label htmlFor="list" className="block text-sm font-medium text-gray-700">
                            Task List
                        </label>

                        <div className="space-y-2">
                            {tasks.map((task, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                    <input
                                        type="text"
                                        value={task}
                                        onChange={(e) => handleTaskChange(index, e.target.value)}
                                        className="p-2 border border-gray-300 rounded-md w-full"
                                        placeholder={`Task ${index + 1}`}
                                    />
                                    {tasks.length > 1 && (
                                        <button
                                            onClick={() => removeTask(index)}
                                            className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Add Task Button */}
                    <button
                        onClick={addTask}
                        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                        Add Task
                    </button>

                    {/* Save Button */}
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}
