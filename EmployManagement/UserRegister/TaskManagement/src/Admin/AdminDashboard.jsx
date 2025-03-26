import AdminNavbar from "./AdminNavbar";
import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div>
      <AdminNavbar />
      <div className="p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
