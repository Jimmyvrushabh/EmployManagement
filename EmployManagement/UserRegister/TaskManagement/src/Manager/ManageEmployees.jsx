import React, { useState, useEffect } from "react";
import { getAllUsers, deleteUser } from "../AllAPI/Api";

const ManageEmployees = ({ onEdit, refreshTrigger }) => {
    const [employees, setEmployees] = useState([]);

    // Fetch employees from the API
    const fetchEmployees = async () => {
        try {
            const allUsers = await getAllUsers();
            // Filter only employees
            const employeesList = allUsers.filter(user => user.role === 'EMPLOYEE');
            setEmployees(employeesList);
        } catch (error) {
            console.error("Error fetching employees:", error);
        }
    };

    // Handle delete operation for an employee
    const handleDelete = async (id) => {
        try {
            await deleteUser(id); // Assuming deleteUser works correctly in the backend
            setEmployees(employees.filter(employee => employee.id !== id)); // Remove deleted employee from the list
            alert("Employee deleted successfully!");
        } catch (error) {
            alert("Failed to delete employee!");
        }
    };

    useEffect(() => {
        fetchEmployees(); // Reload employees when refreshTrigger changes
    }, [refreshTrigger]);

    return (
        <div className="max-w-2xl mx-auto mt-10">
            <h2 className="text-xl font-semibold mb-4">Employees</h2>
            <table className="min-w-full bg-white border rounded-lg">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="py-2 px-4 border">Email</th>
                        <th className="py-2 px-4 border">Name</th>
                        <th className="py-2 px-4 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee.id} className="text-center">
                            <td className="py-2 px-4 border">{employee.email}</td>
                            <td className="py-2 px-4 border">{employee.name}</td>
                            <td className="py-2 px-4 border">
                                <button
                                    onClick={() => onEdit(employee)}
                                    className="bg-yellow-500 text-white px-2 py-1 rounded mx-1"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(employee.id)}
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

export default ManageEmployees;
