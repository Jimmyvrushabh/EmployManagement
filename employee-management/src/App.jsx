import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import EmployeeForm from "./EmployeeForm";
import DepartmentList from "./DepartmentList";
import EmployeeList1 from "./EmployeeList1";

import Navbar from "./Navbar";


function App() {
    return (
        <Router>
            <Navbar />
                {/* Define Routes */}
                <Routes>
                    <Route path="/add-employee" element={<EmployeeForm />} />
                    <Route path="/add-department" element={<DepartmentList />} />
                    <Route path = "/employee-list" element={<EmployeeList1/>}/>
                 
                </Routes>
   
        </Router>
    );
}

export default App;
