import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { createEmployee, updateEmployee, fetchDepartments } from "./api";

const EmployeeForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [jobTitle, setJobTitle] = useState("");
    const [salary, setSalary] = useState("");
    const [departmentId, setDepartmentId] = useState("");
    const [departments, setDepartments] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        fetchDepartments().then(setDepartments);

        if (location.state?.employee) {
            const employee = location.state.employee;
            setSelectedEmployee(employee);
            setName(employee.name || "");
            setEmail(employee.email || "");
            setJobTitle(employee.jobTitle || "");
            setSalary(employee.salary || "");
            setDepartmentId(employee.department?.id || "");
        } else {
            clearForm();
        }
    }, [location]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const employeeData = { name, email, jobTitle, salary };

        try {
            if (selectedEmployee) {
                await updateEmployee(selectedEmployee.id, departmentId, employeeData);
                alert("Employee updated successfully!");
            } else {
                await createEmployee(employeeData, departmentId);
                alert("Employee added successfully!");
            }
            navigate("/employee-list");
        } catch (error) {
            alert("Failed to save employee!");
        }
    };

    const clearForm = () => {
        setName("");
        setEmail("");
        setJobTitle("");
        setSalary("");
        setDepartmentId("");
        setSelectedEmployee(null);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-4">
            <div className="w-full max-w-lg bg-white/70 backdrop-blur-md shadow-lg rounded-2xl p-6">
                <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
                    {selectedEmployee ? "Edit Employee" : "Add Employee"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                        <label className="block text-gray-700 font-medium">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-gray-700 font-medium">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                    </div>

                    {/* Job Title */}
                    <div>
                        <label className="block text-gray-700 font-medium">Job Title</label>
                        <input
                            type="text"
                            value={jobTitle}
                            onChange={(e) => setJobTitle(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                    </div>

                    {/* Salary */}
                    <div>
                        <label className="block text-gray-700 font-medium">Salary</label>
                        <input
                            type="number"
                            value={salary}
                            onChange={(e) => setSalary(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                    </div>

                    {/* Department Dropdown */}
                    <div>
                        <label className="block text-gray-700 font-medium">Department</label>
                        <select
                            value={departmentId}
                            onChange={(e) => setDepartmentId(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        >
                            <option value="">Select Department</option>
                            {departments.map((dept) => (
                                <option key={dept.id} value={dept.id}>
                                    {dept.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Submit & Clear Buttons */}
                    <div className="flex justify-between items-center mt-4">
                        <button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-300 shadow-md"
                        >
                            {selectedEmployee ? "Update Employee" : "Add Employee"}
                        </button>
                    </div>
                </form>

                {/* Clear Button */}
                <button
                    type="button"
                    onClick={clearForm}
                    className="w-full mt-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 rounded-lg transition duration-300 shadow-md"
                >
                    Clear Form
                </button>
            </div>
        </div>
    );
};

export default EmployeeForm;
