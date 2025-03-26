import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between">
        <h1 className="text-white text-xl font-bold">Employee Management</h1>
        <ul className="flex space-x-4">
          <li>
            <Link to="/add-employee" className="text-white hover:underline">Add Employee</Link>
          </li>
          <li>
            <Link to="/add-department" className="text-white hover:underline">Add Department</Link>
          </li>
          <li>
            <Link to="/employee-list" className="text-white hover:underline">Employee List</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
