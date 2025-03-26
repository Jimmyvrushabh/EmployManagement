import React, { useState, useEffect } from "react";
import { createProject, updateProject, getAllManagers } from "../AllAPI/ProjectApi";
import ManageProjects from "./ManageProjects";
import AdminNavbar from "./AdminNavbar";

const RegisterProject = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [managerId, setManagerId] = useState(""); // Store selected manager ID
    const [managers, setManagers] = useState([]); // Store list of managers
    const [selectedProject, setSelectedProject] = useState(null);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    // Fetch all managers for dropdown
    useEffect(() => {
        const fetchManagers = async () => {
            try {
                const managerList = await getAllManagers();
                setManagers(managerList);
            } catch (error) {
                console.error("Error fetching managers:", error);
            }
        };
        fetchManagers();
    }, []);

    // Load project data when editing
    const handleEdit = (project) => {
        setSelectedProject(project);
        setName(project.name);
        setDescription(project.description);
        setManagerId(project.manager ? project.manager.id : ""); // Pre-fill manager dropdown if editing
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const projectData = { name, description, manager: { id: managerId } }; // Ensure proper JSON structure
    
        console.log("Submitting project:", projectData); // Debugging
    
        try {
            if (selectedProject) {
                await updateProject(selectedProject.id, projectData);
                alert("Project updated successfully!");
            } else {
                await createProject(projectData);
                alert("Project added successfully!");
            }
    
            clearForm();
            setRefreshTrigger((prev) => prev + 1);
        } catch (error) {
            console.error("Error saving project:", error);
            alert("Failed to save project!");
        }
    };
    const clearForm = () => {
        setName("");
        setDescription("");
        setManagerId("");
        setSelectedProject(null);
    };

    return (
        <div>
            <AdminNavbar />
            <div className="p-4">
                <form onSubmit={handleSubmit} className="p-4 border rounded-lg shadow-md bg-white">
                    <h2 className="text-lg font-bold mb-4">{selectedProject ? "Edit Project" : "Register Project"}</h2>

                    <label className="block font-medium text-gray-700">Project Name:</label>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                        className="input" 
                    />

                    <label className="block font-medium text-gray-700 mt-2">Project Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="input"
                    ></textarea>

                    {/* Manager Dropdown */}
                    <label className="block font-medium text-gray-700 mt-2">Assign Manager:</label>
                    <select 
                        value={managerId} 
                        onChange={(e) => setManagerId(e.target.value)} 
                        required 
                        className="input"
                    >
                        <option value="">Select Manager</option>
                        {managers.map(manager => (
                            <option key={manager.id} value={manager.id}>
                                {manager.name} ({manager.email})
                            </option>
                        ))}
                    </select>

                    <button 
                        type="submit" 
                        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md"
                    >
                        {selectedProject ? "Update Project" : "Register Project"}
                    </button>
                </form>

                <ManageProjects refreshTrigger={refreshTrigger} onEdit={handleEdit} />
            </div>
        </div>
    );
};

export default RegisterProject;
