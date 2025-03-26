import { Routes, Route } from "react-router-dom";
import AdminNavbar from "./Admin/AdminNavbar";
 import ManageManagers from "./Admin/ManageManager";

import ManageProjects from "./Admin/ManageProjects";
 import AssignProjects from "./Admin/AssignProjects";

export default function AdminDashboard() {
  return (
    <div>
      <AdminNavbar />
      <div className="p-6">
        <Routes>
          <Route path="managers" element={<ManageManagers />} />
          <Route path="projects" element={<ManageProjects />} />
          <Route path="assign" element={<AssignProjects />} />
        </Routes>
      </div>
    </div>
  );
}
