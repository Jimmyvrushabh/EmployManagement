import React, { useState, useEffect } from "react";
import { getAllTasks, deleteTask } from "../AllAPI/TaskApi";

const ManageTasks = ({ refreshTrigger, onEdit }) => {
    const [tasks, setTasks] = useState([]);

    const fetchTasks = async () => {
        const response = await getAllTasks();
        setTasks(response);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this task?")) {
            const success = await deleteTask(id);
            if (success) {
                alert("Task deleted successfully!");
                fetchTasks();
            } else {
                alert("Failed to delete task!");
            }
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [refreshTrigger]); // Re-fetch when refreshTrigger changes

    return (
        <div className="max-w-3xl mx-auto mt-10">
            <h2 className="text-xl font-semibold mb-4">Manage Tasks</h2>
            <table className="min-w-full bg-white border rounded-lg">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="py-2 px-4 border">Task Name</th>
                        <th className="py-2 px-4 border">Description</th>
                        <th className="py-2 px-4 border">Status</th>
                        <th className="py-2 px-4 border">Project</th>
                        <th className="py-2 px-4 border">Employee</th>
                        <th className="py-2 px-4 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task) => (
                        <tr key={task.id} className="text-center">
                            <td className="py-2 px-4 border">{task.name}</td>
                            <td className="py-2 px-4 border">{task.description}</td>
                            <td className="py-2 px-4 border">{task.status}</td>
                            <td className="py-2 px-4 border">{task.project?.name || "N/A"}</td>
                            <td className="py-2 px-4 border">{task.employee?.name || "N/A"}</td>
                            <td className="py-2 px-4 border">
                                <button
                                    onClick={() => onEdit(task)}
                                    className="bg-yellow-500 text-white px-2 py-1 rounded mx-1"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(task.id)}
                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageTasks;
