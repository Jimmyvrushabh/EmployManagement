import { useEffect, useState } from "react";
import axios from "../../api/axios"; // Adjust API path if needed
import EmployeeNavbar from "../../components/EmployeeNavbar";

const EmployeeDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const employeeId = 2; // Change this dynamically after login integration

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`/tasks/employee/${employeeId}`);
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, [employeeId]);

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      await axios.put(`/tasks/${taskId}`, { status: newStatus });
      setTasks(tasks.map(task => (task.id === taskId ? { ...task, status: newStatus } : task)));
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  return (
    <div>
      {/* Employee Navbar */}
      <EmployeeNavbar />

      <div className="container mx-auto mt-10">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">My Assigned Tasks</h2>

        {tasks.length === 0 ? (
          <p className="text-center text-gray-600">No tasks assigned.</p>
        ) : (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Task</th>
                <th className="border border-gray-300 px-4 py-2">Project</th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id} className="text-center">
                  <td className="border border-gray-300 px-4 py-2">{task.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{task.projectName}</td>
                  <td className="border border-gray-300 px-4 py-2">{task.status}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <select
                      value={task.status}
                      onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                      className="p-1 border rounded"
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default EmployeeDashboard;
