import React, { useState, useEffect } from "react";
import { createUser, updateUser } from "../AllAPI/Api";  // Ensure API supports employees
import ManageEmployees from "./ManageEmployees";  // Updated component for listing employees

import ManagerNavbar from "./ManagerNavbar";

const RegisterEmplyee = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [role, setRole] = useState("EMPLOYEE");  // Default role for employees
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [refreshTrigger, setRefreshTrigger] = useState(0); // Trigger refresh for employee list

    // Load employee data when editing
    const handleEdit = (employee) => {
        setSelectedEmployee(employee);
        setEmail(employee.email);
        setName(employee.name);
        setPassword(employee.password);
        setRole(employee.role);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const employeeData = { email, password, name, role };

        try {
            if (selectedEmployee) {
                // Update existing employee
                await updateUser(selectedEmployee.id, employeeData);
                alert("Employee updated successfully!");
            } else {
                // Create new employee
                await createUser(employeeData);
                alert("Employee added successfully!");
            }

            // Reset form and refresh employee list
            clearForm();
            setRefreshTrigger((prev) => prev + 1);
        } catch (error) {
            alert("Failed to save employee!");
        }
    };

    const clearForm = () => {
        setEmail("");
        setPassword("");
        setName("");
        setSelectedEmployee(null);
    };

    return (
        <div>
            <ManagerNavbar />
            <div className="p-4">
                <form onSubmit={handleSubmit} className="p-4 border rounded-lg shadow-md bg-white">
                    <h2 className="text-lg font-bold mb-4">{selectedEmployee ? "Edit Employee" : "Register Employee"}</h2>

                    <label className="block font-medium text-gray-700">Email:</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        className="input" 
                    />

                    <label className="block font-medium text-gray-700 mt-2">Password:</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                        className="input" 
                    />

                    <label className="block font-medium text-gray-700 mt-2">Name:</label>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                        className="input" 
                    />

                    <button 
                        type="submit" 
                        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md"
                    >
                        {selectedEmployee ? "Update Employee" : "Register Employee"}
                    </button>
                </form>

                {/* Pass handleEdit to EmployeeList for editing an employee */}
                <ManageEmployees refreshTrigger={refreshTrigger} onEdit={handleEdit} />
            </div>
        </div>
    );
};

export default RegisterEmplyee;
