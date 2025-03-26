import { Link } from "react-router-dom";

const AdminNavbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between">
        <Link to ="/admin"      className="text-white text-xl font-bold">Admin Dashboard
        </Link>
        <div className="space-x-4">
          <Link to="/admin/register-manager" className="text-gray-300 hover:text-white">
            Register Manager
          </Link>
        
           
        
          <Link to="/admin/register-projects" className="text-gray-300 hover:text-white">
            Create Projects
            </Link>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
