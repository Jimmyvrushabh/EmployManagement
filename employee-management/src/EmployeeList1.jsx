import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { deleteEmployee } from "./api";
import {  FaArrowLeft, FaArrowRight, FaSearch } from "react-icons/fa";





const EmployeeList1 = ({ onEdit1 }) => {
    const [employees, setEmployees] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(5);
    const [sortBy, setSortBy] = useState("id");
    const [sortDirection, setSortDirection] = useState("asc");
    const [totalPages, setTotalPages] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate(); // Correcting the use of Navigate

    useEffect(() => {
        fetchEmployees();
    }, [page, size, sortBy, sortDirection, searchQuery]);

    const fetchEmployees = async () => {
        try {
            const response = await axios.get("http://localhost:8080/employees/search", {
                params: { page, size, sortBy, sortDirection, query: searchQuery },
            });
            setEmployees(response.data.content);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error("Error fetching employees", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteEmployee(id);
            setEmployees((prevEmployees) => prevEmployees.filter(emp => emp.id !== id));
            alert("Employee deleted successfully!");
        } catch (error) {
            alert("Failed to delete employee!");
        }
    };


    const handleDeleteAll = async () => {
        try {
          const response = await fetch("http://localhost:8080/employees/all", {
            method: "DELETE",
          });
    
          if (response.ok) {
            alert("All employees deleted successfully!");
          } else {
            alert("Failed to delete employees.");
          }
        } catch (error) {
          console.error("Error deleting employees:", error);
          alert("An error occurred while deleting employees.");
        }
      };
    

   

    return (
        <>


<div className="p-4">
      <button
        onClick={handleDeleteAll}
        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
      >
        Delete All Employees
      </button>
    </div>

 
     
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4 text-center">Employee List</h1>

            {/* Single Search Input */}
            <div className="relative w-full mb-4">
                <input
                    type="text"
                    placeholder="Search by Name or Department..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <FaSearch className="absolute top-3 right-3 text-gray-500" />
            </div>
        <div className="overflow-x-auto shadow-lg rounded-lg">
            <table className="w-full bg-white border border-gray-200 rounded-lg">
                <thead className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                    <tr>
                        <th className="p-3 text-left cursor-pointer" >
                            Name
                        </th>
                        <th className="p-3 text-left cursor-pointer">
                            Email  
                        </th>
                        <th className="p-3 text-left cursor-pointer">
                            Department 
                        </th>
                        <th className="p-3 text-left cursor-pointer" >
                            Job Title 
                        </th>
                        <th className="p-3 text-left cursor-pointer">
                            Salary
                        </th>
                        <th className="p-3 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee, index) => (
                        <tr key={employee.id} className={`border-b ${index % 2 === 0 ? "bg-gray-100" : "bg-white"} hover:bg-gray-200 transition duration-200`}>
                            <td className="p-3">{employee.name}</td>
                            <td className="p-3">{employee.email}</td>
                            <td className="p-3">{employee.department ? employee.department.name : "N/A"}</td>
                            <td className="p-3">{employee.jobTitle}</td>
                            <td className="p-3">Rs {employee.salary.toLocaleString()}</td>
                            <td className="p-3 text-center">
                                <button 
                                    onClick={() => navigate("/add-employee", { state: { employee } })}
                                    className="bg-yellow-500 text-white px-3 py-1 rounded-lg shadow-md hover:bg-yellow-600 transition">
                                    Edit
                                </button>
                                <button 
                                    onClick={() => handleDelete(employee.id)} 
                                    className="ml-2 bg-red-500 text-white px-3 py-1 rounded-lg shadow-md hover:bg-red-600 transition">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center mt-6 space-x-4">
            <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                disabled={page === 0}
                className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <FaArrowLeft className="mr-2" /> Previous
            </button>

            <span className="text-lg font-semibold text-gray-700">
                Page {page + 1} of {totalPages}
            </span>

            <button
                onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
                disabled={page >= totalPages - 1}
                className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Next <FaArrowRight className="ml-2" />
            </button>
        </div>
    </div>
    </>
    );
};

export default EmployeeList1;
