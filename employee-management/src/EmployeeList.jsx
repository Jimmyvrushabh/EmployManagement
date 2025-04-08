import { useEffect, useState } from "react";
import { fetchEmployees, deleteEmployee } from "./api";





const EmployeeList = ({ onEdit, refreshTrigger }) => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        loadEmployees();
    }, [refreshTrigger]); // Refresh on change

    const loadEmployees = async () => {
        try {
            const data = await fetchEmployees();
            setEmployees(data);
        } catch (error) {
            console.error("Error loading employees:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteEmployee(id);
            setEmployees(employees.filter(emp => emp.id !== id));
            alert("Employee deleted successfully!");
        } catch (error) {
            alert("Failed to delete employee!");
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-10">
            <h2 className="text-xl font-semibold mb-4">Employees</h2>
            <table className="min-w-full bg-white border rounded-lg">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="py-2 px-4 border">Name</th>
                        <th className="py-2 px-4 border">Email</th>
                        <th className="py-2 px-4 border">Department</th>
                        <th className="py-2 px-4 border">Job Title</th>
                        <th className="py-2 px-4 border">Salary</th>
                        <th className="py-2 px-9 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee.id} className="text-center">
                            <td className="py-2 px-4 border">{employee.name}</td>
                            <td className="py-2 px-4 border">{employee.email}</td>
                            <td className="py-2 px-4 border">{employee.department?.name || "N/A"}</td>
                            <td className="py-2 px-4 border">{employee.jobTitle}</td>
                            <td className="py-2 px-4 border">Rs {employee.salary}</td>
                            <td className="py-2 px-4 border">
                                <button onClick={() => onEdit(employee)} className="bg-yellow-500 text-white px-2 py-1 rounded mx-1">Edit</button>
                                <button onClick={() => handleDelete(employee.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeList;

