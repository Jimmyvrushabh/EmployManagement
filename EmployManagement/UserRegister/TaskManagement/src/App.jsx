import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AdminDashboard from "./Admin/AdminDashboard";
import ManagerDashboard from "./Manager/ManagerDashboard";
import EmployeeDashboard from "./Employ/EmployDashboard";
import RegisterManager from "./Admin/RegisterManager";


// import RegisterManager from "./Admin/RegisterManager";
import ManageManagers from "./Admin/ManageManagers";
import RegisterProject from "./Admin/RegisterProject";
import AssignProjects from "./Admin/AssignProject";


import RegisterEmploy from "./Manager/RegisterEmplyee";
import CreateTask from "./Manager/CreateTask";

function App() {
  return (
    <Router>
      <Routes>
      
           <Route path="/admin/register-manager" element={<RegisterManager />} /> 
          <Route path="/admin/manage-managers" element={<ManageManagers />} />
          <Route path="/admin/register-projects" element={<RegisterProject />} />
          <Route path="/admin/assign-projects" element={<AssignProjects />} />
          <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/manager" element={<ManagerDashboard />} />
        <Route path="/employee" element={<EmployeeDashboard />} />
        <Route path="/manager/register-Employ" element= {<RegisterEmploy/>} />

        <Route path="/manager/CreateTask" element= {<CreateTask/>} />
       
      </Routes>
    </Router>
  );
}

export default App;


