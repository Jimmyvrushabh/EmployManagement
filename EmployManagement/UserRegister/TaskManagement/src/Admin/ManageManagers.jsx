import React, { useState, useEffect } from "react";
import { getAllUsers, deleteUser } from "../AllAPI/Api";

const ManageManagers = ({ onEdit, refreshTrigger }) => {
    const [managers, setManagers] = useState([]);

    // Fetch managers from the API
    const fetchManagers = async () => {
        try {
            const allUsers = await getAllUsers();
            // Filter only managers
            const managersList = allUsers.filter(user => user.role === 'MANAGER');
            setManagers(managersList);
        } catch (error) {
            console.error('Error fetching managers:', error);
        }
    };

    // Handle delete operation for a manager
    const handleDelete = async (id) => {
        try {
            await deleteUser(id); // Assuming deleteUser works correctly in the backend
            setManagers(managers.filter(manager => manager.id !== id)); // Remove deleted manager from the list
            alert("Manager deleted successfully!");
        } catch (error) {
            alert("Failed to delete manager!");
        }
    };

    useEffect(() => {
        fetchManagers(); // Reload managers when refreshTrigger changes
    }, [refreshTrigger]);

    return (
        <div className="max-w-2xl mx-auto mt-10">
            <h2 className="text-xl font-semibold mb-4">Managers</h2>
            <table className="min-w-full bg-white border rounded-lg">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="py-2 px-4 border">Email</th>
                        <th className="py-2 px-4 border">Name</th>
                        <th className="py-2 px-4 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {managers.map((manager) => (
                        <tr key={manager.id} className="text-center">
                            <td className="py-2 px-4 border">{manager.email}</td>
                            <td className="py-2 px-4 border">{manager.name}</td>
                            <td className="py-2 px-4 border">
                                <button
                                    onClick={() => onEdit(manager)}
                                    className="bg-yellow-500 text-white px-2 py-1 rounded mx-1"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(manager.id)}
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

export default ManageManagers;
