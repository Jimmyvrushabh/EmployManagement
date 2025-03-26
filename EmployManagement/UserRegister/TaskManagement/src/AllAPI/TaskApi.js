import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/tasks"; // Adjust if needed

// Fetch all tasks
export const getAllTasks = async () => {
    try {
        const response = await axios.get(API_BASE_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return [];
    }
};

// Fetch a task by ID
export const getTaskById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching task with ID ${id}:`, error);
        return null;
    }
};

// Create a new task
export const createTask = async (task) => {
    try {
        const response = await axios.post(API_BASE_URL, task);
        return response.data;
    } catch (error) {
        console.error("Error creating task:", error);
        throw error;
    }
};

// Update an existing task
export const updateTask = async (id, task) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/${id}`, task);
        return response.data;
    } catch (error) {
        console.error(`Error updating task with ID ${id}:`, error);
        throw error;
    }
};

// Delete a task
export const deleteTask = async (id) => {
    try {
        await axios.delete(`${API_BASE_URL}/${id}`);
        return true;
    } catch (error) {
        console.error(`Error deleting task with ID ${id}:`, error);
        return false;
    }
};

// Fetch all employees with role "EMPLOYEE"
export const getAllEmployee = async () => {
    try {
        const response = await axios.get("http://localhost:8080/api/users"); // Update if needed
        return response.data.filter(user => user.role === "EMPLOYEE");
    } catch (error) {
        console.error("Error fetching employees:", error);
        throw error;
    }
};
