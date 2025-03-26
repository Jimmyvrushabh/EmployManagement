import axios from 'axios';

const API_URL = 'http://localhost:8080/auth';

// Register a new user
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Registration failed';
  }
};

// Login an existing user
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    return response.data; // JWT Token
  } catch (error) {
    throw error.response?.data || 'Login failed';
  }
};
