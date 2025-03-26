import axios from "axios";

const API_URL = "http://localhost:8080/api"; // Adjust as needed

// Authentication APIs
export const login = async (credentials) => axios.post(`${API_URL}/auth/login`, credentials);
export const registerUser = async (user) => axios.post(`${API_URL}/users`, user);

export const createManager = async (manager) => axios.post(`${API_URL}/users`, manager);

// User APIs
export const getUsers = async () => axios.get(`${API_URL}/users`);
export const getUserById = async (id) => axios.get(`${API_URL}/users/${id}`);
export const deleteUser = async (id) => axios.delete(`${API_URL}/users/${id}`);

// Project APIs
export const createProject = async (project) => axios.post(`${API_URL}/projects`, project);
export const getProjects = async () => axios.get(`${API_URL}/projects`);
export const assignProject = async (projectId, managerId) =>
  axios.put(`${API_URL}/projects/${projectId}/assign/${managerId}`);

// Task APIs
export const createTask = async (task) => axios.post(`${API_URL}/tasks`, task);
export const getTasks = async () => axios.get(`${API_URL}/tasks`);
export const assignTask = async (taskId, employeeId) =>
  axios.put(`${API_URL}/tasks/${taskId}/assign/${employeeId}`);
export const updateTaskStatus = async (taskId, status) =>
  axios.put(`${API_URL}/tasks/${taskId}`, { status });








export const deleteProject = async (projectId) => axios.delete(`${API_URL}/projects/${projectId}`);
export const assignProjectToManager = async (projectId, managerId) => 
  axios.post(`${API_URL}/projects/assign`, { projectId, managerId });
