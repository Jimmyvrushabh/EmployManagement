import React, { useState, useEffect } from "react";
import { fetchDepartments } from "./api";
import DepartmentForm from "./DepartmentForm";

const DepartmentList = () => {
    const [departments, setDepartments] = useState([]);

    const loadDepartments = async () => {
        const data = await fetchDepartments();
        setDepartments(data);
    };

    useEffect(() => {
        loadDepartments();
    }, []);

    return (
        <div>
            <h2 className="text-xl font-bold mb-2">Department List</h2>
            <DepartmentForm onDepartmentAdded={loadDepartments} />
            <ul className="list-disc pl-5">
                {departments.map((dept) => (
                    <li key={dept.id} className="py-1">{dept.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default DepartmentList;
