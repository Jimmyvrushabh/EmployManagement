import { useState, useEffect } from "react";
import { createProject, getProjects, deleteProject } from "../../Api"; // Import API methods

export default function ManageProjects() {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ name: "", description: "", managerId: "" });

  // Fetch projects from the API
  const fetchProjects = async () => {
    try {
      const { data } = await getProjects();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  // Handle creating a new project
  const handleCreateProject = async () => {
    try {
      await createProject(newProject);
      setNewProject({ name: "", description: "", managerId: "" });
      fetchProjects();  // Re-fetch the list of projects after creating a new one
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  // Handle deleting a project
  const handleDeleteProject = async (projectId) => {
    try {
      await deleteProject(projectId);
      fetchProjects();  // Re-fetch the list of projects after deletion
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Manage Projects</h2>

      {/* New Project Form */}
      <div className="mt-4">
        <h3 className="font-semibold">Create New Project</h3>
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Project Name"
            value={newProject.name}
            onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
            className="border p-2 rounded w-full"
          />
          <textarea
            placeholder="Project Description"
            value={newProject.description}
            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            placeholder="Manager ID"
            value={newProject.managerId}
            onChange={(e) => setNewProject({ ...newProject, managerId: e.target.value })}
            className="border p-2 rounded w-full"
          />
          <button
            onClick={handleCreateProject}
            className="bg-green-500 text-white px-4 py-2 rounded mt-2"
          >
            Create Project
          </button>
        </div>
      </div>

      {/* List of Projects */}
      <div className="mt-6">
        <h3 className="font-semibold">Projects List</h3>
        <div className="space-y-2">
          {projects.map((project) => (
            <div key={project.id} className="flex justify-between items-center p-2 border rounded">
              <span>{project.name} - {project.description}</span>
              <button
                onClick={() => handleDeleteProject(project.id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
