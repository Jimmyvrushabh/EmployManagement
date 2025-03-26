import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminNavbar from "./components/AdminNavbar";
import ManagerNavbar from "./components/ManagerNavbar";
import EmployeeNavbar from "./components/EmployeeNavbar";

import AdminDashboard from "./pages/admin/AdminDashboard"; 
import ManageManagers from "./pages/admin/ManageManagers";
import ManageProjects from "./pages/admin/ManageProjects";
import AssignProjects from "./pages/admin/AssignProjects";

import ManagerDashboard from "./pages/manager/ManagerDashboard";
import AssignTasks from "./pages/manager/AssignTasks"; // Manager functionality
import ManageEmployees from "./pages/manager/ManageEmployees";

import EmployeeDashboard from "./pages/employee/EmployeeDashboard";
import ViewTasks from "./pages/employee/ViewTasks"; // Employee functionality

function App() {
  return (
    <Router>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminNavbar />}>
          <Route index element={<AdminDashboard />} />
          <Route path="manage-managers" element={<ManageManagers />} />
          <Route path="manage-projects" element={<ManageProjects />} />
          <Route path="assign-projects" element={<AssignProjects />} />
        </Route>

        {/* Manager Routes */}
        <Route path="/manager" element={<ManagerNavbar />}>
          <Route index element={<ManagerDashboard />} />
          <Route path="assign-tasks" element={<AssignTasks />} />
          <Route path="manage-employees" element={<ManageEmployees />} />
        </Route>

        {/* Employee Routes */}
        <Route path="/employee" element={<EmployeeNavbar />}>
          <Route index element={<EmployeeDashboard />} />
          <Route path="view-tasks" element={<ViewTasks />} />
        </Route>

        {/* Default Route */}
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
