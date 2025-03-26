import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/projects"; // Update this if needed

// Fetch all projects
export const getAllProjects = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching projects:", error);
        throw error;
    }
};

// Create a new project
export const createProject = async (projectData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}`, projectData);
        return response.data;
    } catch (error) {
        console.error("Error creating project:", error);
        throw error;
    }
};

// Update a project
export const updateProject = async (id, projectData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/${id}`, projectData);
        return response.data;
    } catch (error) {
        console.error("Error updating project:", error);
        throw error;
    }
};

// Delete a project
export const deleteProject = async (id) => {
    try {
        await axios.delete(`${API_BASE_URL}/${id}`);
    } catch (error) {
        console.error("Error deleting project:", error);
        throw error;
    }
};

// Fetch all managers
export const getAllManagers = async () => {
    try {
        const response = await axios.get("http://localhost:8080/api/users"); // Update if needed
        return response.data.filter(user => user.role === "MANAGER");
    } catch (error) {
        console.error("Error fetching managers:", error);
        throw error;
    }
};
