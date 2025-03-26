import React, { useState, useEffect } from "react";
import { createUser, updateUser } from "../AllAPI/Api";  // Adjust API methods to match your backend
import ManageManagers from "./ManageManagers";  // Assuming a list of managers is being displayed elsewhere
import AdminNavbar from "./AdminNavbar"


const RegisterManager = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const[name,setname] = useState("")

    const[role,setrole] = useState("MANAGER");
    const [selectedManager, setSelectedManager] = useState(null);
    const [refreshTrigger, setRefreshTrigger] = useState(0); // Trigger refresh for manager list

    //  Load manager data when editing an existing manager
    const handleEdit = (manager) => {
        setSelectedManager(manager);
        setEmail(manager.email);
        setname(manager.name)
        setPassword(manager.password);
        setrole(manager.role);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const managerData = { email, password,name,role};

        try {
            if (selectedManager) {
                //  Update existing manager
                await updateUser(selectedManager.id, managerData);
                alert("Manager updated successfully!");
            } else {
                //  Create new manager
                await createUser(managerData);
                alert("Manager added successfully!");
            }

            //  Reset form and refresh manager list
            clearForm();
            setRefreshTrigger((prev) => prev + 1);
        } catch (error) {
            alert("Failed to save manager!");
        }
    };

    const clearForm = () => {
        setEmail("");
        setPassword("");
        setname("")
        setSelectedManager(null);
    };

    return (
        <div>
            <AdminNavbar/>
        <div className="p-4">
            <form onSubmit={handleSubmit} className="p-4 border rounded-lg shadow-md bg-white">
                <h2 className="text-lg font-bold mb-4">{selectedManager ? "Edit Manager" : "Register Manager"}</h2>

                <label className="block font-medium text-gray-700">Email:</label>
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                    className="input" 
                />

                <label className="block font-medium text-gray-700 mt-2">Password:</label>
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                    className="input" 
                />

<label className="block font-medium text-gray-700 mt-2">Name</label>
                <input 
                    type="name" 
                    value={name} 
                    onChange={(e) => setname(e.target.value)} 
                    required 
                    className="input" 
                />

                <button 
                    type="submit" 
                    className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md"
                >
                    {selectedManager ? "Update Manager" : "Register Manager"}
                </button>
            </form>

            {/* Pass handleEdit to ManagerList for editing a manager */}
            <ManageManagers refreshTrigger={refreshTrigger} onEdit={handleEdit} />
        </div>
        </div>
    );
};

export default RegisterManager;
