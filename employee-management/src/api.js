import axios from "axios";

const API_URL = "http://localhost:8080";

// 🚀 Fetch all employees
export const fetchEmployees = () => {
    return fetch(`${API_URL}/employees`)
        .then(response => response.json())
        .then(data => {
            console.log("Fetched employees:", data); // Debugging
            return data;
        })
        .catch(error => {
            console.error("Error fetching employees:", error);
            return [];
        });
};

//  Fetch all departments
export const fetchDepartments = () => {
    return axios.get(`${API_URL}/departments`)
        .then(response => response.data)
        .catch(error => {
            console.error("Error fetching departments:", error);
            throw error;
        });
};

//  Fetch employee by ID
export const fetchEmployeeById = (id) => {
    return axios.get(`${API_URL}/employees/${id}`)
        .then(response => response.data)
        .catch(error => {
            console.error("Error fetching employee:", error);
            throw error;
        });
};

//  Add a new employee
export const createEmployee = (employee, departmentId) => {
    return axios.post(`${API_URL}/employees/department/${departmentId}`, employee)
        .then(response => response.data)
        .catch(error => {
            console.error("Error creating employee:", error);
            throw error;
        });
};

//Update an existing employee
export const updateEmployee = (id, departmentId, employee) => {
    return axios.put(`${API_URL}/employees/${id}/department/${departmentId}`, employee)
        .then(response => response.data)
        .catch(error => {
            console.error("Error updating employee:", error);
            throw error;
        });
};

//  Delete an employee
export const deleteEmployee = (id) => {
    return axios.delete(`${API_URL}/employees/${id}`)
        .then(() => console.log(`Employee with ID ${id} deleted successfully`))
        .catch(error => {
            console.error("Error deleting employee:", error);
            throw error;
        });
};

//Add a new department
export const addDepartment = (department) => {
    return fetch(`${API_URL}/departments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(department)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Failed to add department");
        }
        return response.json();
    })
    .catch(error => {
        console.error("Error adding department:", error);
        return null;
    });
};



export const sortBy = async (sortBy = "name") => {
    const response = await fetch(`http://localhost:8080/employees/sort?sortBy=${sortBy}`);
    return response.json();
};
