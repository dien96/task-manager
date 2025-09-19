import DashboardLayout from "@/components/layout/DashboardLayout";
import { API_PATHS } from "@/utils/apiPaths";
import axiosInstance from "@/utils/axiosInstance";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Label } from "recharts";

const ManageTasks = () => {
  const [allTasks, setAllTasks] = useState([]);

  const [tabs, setTabs] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");

  const navigate = useNavigate();

  const getAllTasks = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.TASKS.GET_ALL_TASKS, {
        params: {
          status: filterStatus === "All" ? "" : filterStatus,
        },
      });

      setAllTasks(response.data?.tasks?.length > 0 ? response.data.tasks : []);

      // Map statusSummary data with fixed labels and order
      const statusSummary = response.data?.statusSummary || {};

      const statusArray = [
        { label: "All", count: statusSummary.all || 0 },
        { label: "Pending", count: statusSummary.pending },
        { label: "In Progress", count: statusSummary.inProgress },
        { label: "Completed", count: statusSummary.completed },
      ];

      setTabs(statusArray);
    } catch (error) {
      console.error("Error fetching Users:", error);
    }
  };

  const handleClick = (taskData) => {
    navigate(`/admin/create-task`, { state: { taskId: taskData._id } });
  };

  // Download task report
  const handleDownloadReport = async () => {};

  return (
    <DashboardLayout activeMenu="Manage Tasks">
      <div className="my-5"></div>
    </DashboardLayout>
  );
};

export default ManageTasks;
