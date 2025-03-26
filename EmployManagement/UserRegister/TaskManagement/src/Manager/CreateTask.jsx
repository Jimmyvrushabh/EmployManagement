import React, { useState, useEffect } from "react";
import { createTask, updateTask, getAllEmployee } from "../AllAPI/TaskApi";
import { getAllProjects } from "../AllAPI/ProjectApi";
import ManageTasks from "./ManageTasks";
import ManagerNavbar from "./ManagerNavbar";

const CreateTask = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("PENDING"); // Default status
    const [projectId, setProjectId] = useState(""); // Store selected project ID
    const [employeeId, setEmployeeId] = useState(""); // Store selected employee ID
    const [projects, setProjects] = useState([]); // Store list of projects
    const [employees, setEmployees] = useState([]); // Store list of employees
    const [selectedTask, setSelectedTask] = useState(null); // Corrected state name
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    // Fetch all employees and projects for dropdowns
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [employeeList, projectList] = await Promise.all([
                    getAllEmployee(),
                    getAllProjects(),
                ]);

                setEmployees(employeeList.filter(emp => emp.role === "EMPLOYEE")); // Filter only employees
                setProjects(projectList); // Store projects
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    // Load task data when editing
    const handleEdit = (task) => {
        setSelectedTask(task);
        setName(task.name);
        setDescription(task.description);
        setStatus(task.status);
        setProjectId(task.project ? task.project.id : ""); // Ensure project ID is correctly set
        setEmployeeId(task.employee ? task.employee.id : ""); // Ensure employee ID is correctly set
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const taskData = {
            name,
            description,
            status,
            project: projectId ? { id: parseInt(projectId) } : null, // Ensure project reference
            employee: employeeId ? { id: parseInt(employeeId) } : null, // Ensure employee is sent properly
        };
    
        console.log("Submitting task:", taskData); // Debugging
    
        try {
            if (selectedTask) {
                await updateTask(selectedTask.id, taskData);
                alert("Task updated successfully!");
            } else {
                await createTask(taskData);
                alert("Task added successfully!");
            }
    
            clearForm();
            setRefreshTrigger((prev) => prev + 1);
        } catch (error) {
            console.error("Error saving task:", error);
            alert("Failed to save task!");
        }
    };
    

    const clearForm = () => {
        setName("");
        setDescription("");
        setStatus("PENDING"); // Reset status
        setProjectId("");
        setEmployeeId(""); // Reset employee selection
        setSelectedTask(null);
    };

    return (
        <div>
            <ManagerNavbar />
            <div className="p-4">
                <form onSubmit={handleSubmit} className="p-4 border rounded-lg shadow-md bg-white">
                    <h2 className="text-lg font-bold mb-4">{selectedTask ? "Edit Task" : "Create Task"}</h2>

                    <label className="block font-medium text-gray-700">Task Name:</label>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                        className="input" 
                    />

                    <label className="block font-medium text-gray-700 mt-2">Task Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="input"
                    ></textarea>

                    {/* Status Dropdown */}
                    <label className="block font-medium text-gray-700 mt-2">Task Status:</label>
                    <select 
                        value={status} 
                        onChange={(e) => setStatus(e.target.value)} 
                        required 
                        className="input"
                    >
                        <option value="PENDING">Pending</option>
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="COMPLETED">Completed</option>
                    </select>

                    {/* Project Dropdown */}
                    <label className="block font-medium text-gray-700 mt-2">Select Project:</label>
                    <select 
                        value={projectId} 
                        onChange={(e) => setProjectId(e.target.value)} 
                        required 
                        className="input"
                    >
                        <option value="">Select Project</option>
                        {projects.map(proj => (
                            <option key={proj.id} value={proj.id}>
                                {proj.name}
                            </option>
                        ))}
                    </select>

                    {/* Employee Dropdown */}
                    <label className="block font-medium text-gray-700 mt-2">Assign Employee:</label>
                    <select 
                        value={employeeId} 
                        onChange={(e) => setEmployeeId(e.target.value)} 
                        required 
                        className="input"
                    >
                        <option value="">Select Employee</option>
                        {employees.map(employee => (
                            <option key={employee.id} value={employee.id}>
                                {employee.name} ({employee.email})
                            </option>
                        ))}
                    </select>

                    <button 
                        type="submit" 
                        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md"
                    >
                        {selectedTask ? "Update Task" : "Create Task"}
                    </button>
                </form>

                <ManageTasks refreshTrigger={refreshTrigger} onEdit={handleEdit} />
            </div>
        </div>
    );
};

export default CreateTask;
