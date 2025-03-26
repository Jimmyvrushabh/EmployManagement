import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RoleBased = () => {
    const navigate = useNavigate();
    const [role, setRole] = useState(null);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        // Assuming you have the JWT token stored in localStorage after login
        const token = localStorage.getItem('token');

      

        // Get the user's role by decoding the token (using a library like jwt-decode)
        const decodedToken = decodeToken(token); // You need to implement decodeToken function
        const userRole = decodedToken.role; // Assuming the role is stored in the token

        setRole(userRole);
        fetchRoleBasedData(userRole, token);
    }, [navigate]);

    const fetchRoleBasedData = async (userRole, token) => {
        setLoading(true);
        setError('');
        let url = '';

        if (userRole === 'ADMIN') {
            url = '/api/role/admin';
        } else if (userRole === 'MANAGER') {
            url = '/api/role/manager';
        } else if (userRole === 'EMPLOYEE') {
            url = '/api/role/employee';
        }

        try {
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setMessage(response.data);
        } catch (err) {
            setError('Error fetching data for your role.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2>{role} Role Access</h2>
            <p>{message}</p>
        </div>
    );
};

// Helper function to decode JWT token (assuming you are using jwt-decode library)
const decodeToken = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    const jsonPayload = decodeURIComponent(
        atob(base64)
            .split('')
            .map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join('')
    );
    return JSON.parse(jsonPayload);
};

export default RoleBased;
