import React, { useState, useEffect } from "react";
import { getAllProjects, deleteProject } from "../AllAPI/ProjectApi";

const ManageProjects = ({ onEdit, refreshTrigger }) => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProjects = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await getAllProjects();
            if (Array.isArray(response)) {
                setProjects(response);
            } else {
                console.error("Invalid response format:", response);
                setProjects([]);
            }
        } catch (error) {
            console.error("Error fetching projects:", error);
            setError("Failed to fetch projects!");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteProject(id);
            setProjects((prevProjects) => prevProjects.filter(project => project.id !== id));
            alert("Project deleted successfully!");
        } catch (error) {
            alert("Failed to delete project!");
        }
    };

    useEffect(() => {
        fetchProjects();
    }, [refreshTrigger]);

    return (
        <div className="max-w-3xl mx-auto mt-10">
            <h2 className="text-xl font-semibold mb-4">Projects</h2>

            {loading && <p>Loading projects...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {projects.length > 0 ? (
                <table className="min-w-full bg-white border rounded-lg">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="py-2 px-4 border">Project Name</th>
                            <th className="py-2 px-4 border">Project Description</th>
                            <th className="py-2 px-4 border">Project Assign</th>
                            <th className="py-2 px-4 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((project) => (
                            <tr key={project.id} className="text-center">
                                <td className="py-2 px-4 border">{project.name}</td>
                                <td className="py-2 px-4 border">{project.description}</td>
                                <td className="py-2 px-4 border">
{project.manager ? project.manager.name : "Not Assigned"}
</td>
                                <td className="py-2 px-4 border">
                                    <button
                                        onClick={() => onEdit(project)}
                                        className="bg-yellow-500 text-white px-2 py-1 rounded mx-1"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(project.id)}
                                        className="bg-red-500 text-white px-2 py-1 rounded"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                !loading && <p>No projects available.</p>
            )}
        </div>
    );
};

export default ManageProjects;
