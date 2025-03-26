import React, { useState } from "react";
import { addDepartment } from "./api";

const DepartmentForm = ({ onDepartmentAdded }) => {
    const [name, setName] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name.trim()) {
            alert("Department name cannot be empty!");
            return;
        }

        const newDepartment = { name };
        const addedDepartment = await addDepartment(newDepartment);

        if (addedDepartment) {
            alert("Department added successfully!");
            setName(""); // Reset input field
            onDepartmentAdded(); // Refresh the department list
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 border rounded-lg shadow-md bg-white">
            <h2 className="text-lg font-bold mb-2">Add New Department</h2>
            <div className="mb-2">
                <label className="block mb-1">Department Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full border px-2 py-1 rounded"
                />
            </div>
            <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded">Add Department</button>
        </form>
    );
};

export default DepartmentForm;
