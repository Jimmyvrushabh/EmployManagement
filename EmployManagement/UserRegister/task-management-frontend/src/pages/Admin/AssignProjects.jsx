import { useState, useEffect } from "react";
import { getProjects, getUsers, assignProjectToManager } from "../../Api";

export default function AssignProjects() {
  const [projects, setProjects] = useState([]);
  const [managers, setManagers] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedManager, setSelectedManager] = useState("");

  // Fetch projects and managers
  const fetchData = async () => {
    try {
      const projectsResponse = await getProjects();
      const managersResponse = await getUsers();
      setProjects(projectsResponse.data);
      setManagers(managersResponse.data.filter(user => user.role === "MANAGER"));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Handle assigning a project to a manager
  const handleAssignProject = async () => {
    try {
      await assignProjectToManager(selectedProject, selectedManager);
      alert("Project assigned successfully!");
      setSelectedProject("");
      setSelectedManager("");
    } catch (error) {
      console.error("Error assigning project:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Assign Project to Manager</h2>
      
      <div className="mt-4 space-y-4">
        {/* Select Project */}
        <div>
          <label className="block">Select Project</label>
          <select
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
            className="border p-2 rounded w-full"
          >
            <option value="">-- Select a Project --</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
        </div>

        {/* Select Manager */}
        <div>
          <label className="block">Select Manager</label>
          <select
            value={selectedManager}
            onChange={(e) => setSelectedManager(e.target.value)}
            className="border p-2 rounded w-full"
          >
            <option value="">-- Select a Manager --</option>
            {managers.map((manager) => (
              <option key={manager.id} value={manager.id}>
                {manager.name}
              </option>
            ))}
          </select>
        </div>

        {/* Assign Button */}
        <button
          onClick={handleAssignProject}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Assign Project
        </button>
      </div>
    </div>
  );
}
