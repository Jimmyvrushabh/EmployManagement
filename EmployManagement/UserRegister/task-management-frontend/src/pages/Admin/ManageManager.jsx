import { useState, useEffect } from "react";
import { getUsers, deleteUser,createManager } from "../../Api";  // Import API methods


export default function ManageManager() {
  const [managers, setManagers] = useState([]);
  const [newManager, setNewManager] = useState({ name: "", email: "", role: "MANAGER" });

  // Fetch managers from the API
  const fetchManagers = async () => {
    try {
      const { data } = await getUsers();
      // Filter out only managers from the users list
      setManagers(data.filter(user => user.role === "MANAGER"));
    } catch (error) {
      console.error("Error fetching managers:", error);
    }
  };

  //Handle creating a new manager
  const handleCreateManager = async () => {
     try {
       //Create new manager (API call)
     await createManager(newManager);
   setNewManager({ name: "", email: "", role: "MANAGER" });  // Reset form fields
     fetchManagers(); // Re-fetch the list of managers after creating a new one
   } catch (error) {
      console.error("Error creating manager:", error);
    }
 };

  // Handle deleting a manager
  const handleDeleteManager = async (managerId) => {
    try {
      await deleteUser(managerId);  // Delete manager via API
      fetchManagers();  // Re-fetch the list of managers after deletion
    } catch (error) {
      console.error("Error deleting manager:", error);
    }
  };

  useEffect(() => {
    fetchManagers();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Manage Managers</h2>
      
      {/* New Manager Form */}
      <div className="mt-4">
        <h3 className="font-semibold">Add New Manager</h3>
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Name"
            value={newManager.name}
            onChange={(e) => setNewManager({ ...newManager, name: e.target.value })}
            className="border p-2 rounded w-full"
          />
          <input
            type="email"
            placeholder="Email"
            value={newManager.email}
            onChange={(e) => setNewManager({ ...newManager, email: e.target.value })}
            className="border p-2 rounded w-full"
          />
          <button
            onClick={handleCreateManager}
            className="bg-green-500 text-white px-4 py-2 rounded mt-2"
          >
            Create Manager
          </button>
        </div>
      </div>

      {/* List of Managers */}
      <div className="mt-6">
        <h3 className="font-semibold">Managers List</h3>
        <div className="space-y-2">
          {managers.map((manager) => (
            <div key={manager.id} className="flex justify-between items-center p-2 border rounded">
              <span>{manager.name} ({manager.email})</span>
              <button
                onClick={() => handleDeleteManager(manager.id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
