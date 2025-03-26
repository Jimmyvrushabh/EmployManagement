import { Link } from "react-router-dom";

const ManagerNavbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between">
        <Link to ="/manager"      className="text-white text-xl font-bold">Manager Dashboard
        </Link>
        <div className="space-x-4">
          <Link to="/manager/register-Employ" className="text-gray-300 hover:text-white">
            Register Employ
          </Link>
        
           
        
          <Link to="/manager/CreateTask" className="text-gray-300 hover:text-white">
            Create Task 
            </Link>
        </div>
      </div>
    </nav>
  );
};

export default ManagerNavbar;    