import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userRole = localStorage.getItem('role'); 
    console.log(userRole);
    
    // Retrieve the role from localStorage
    if (!userRole) {
      navigate('/login'); // Redirect to login if no role is found
    } else {
      setRole(userRole);
    }
  }, [navigate]);

  if (!role) {
    return <div>Loading...</div>;
  }

  // Render different dashboards based on the role
  return (
    <div className="dashboard-container">
      {role === 'ADMIN' && (
        <div className="admin-dashboard">
          <h2>Admin Dashboard</h2>
          <p>Admin can manage users, roles, and settings.</p>
        </div>
      )}
      {role === 'MANAGER' && (
        <div className="manager-dashboard">
          <h2>Manager Dashboard</h2>
          <p>Managers can view team progress and reports.</p>
        </div>
      )}
      {role === 'EMPLOYEE' && (
        <div className="employee-dashboard">
          <h2>Employee Dashboard</h2>
          <p>Employees can view their tasks and progress.</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
