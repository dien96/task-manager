import TaskCard from "@/components/Cards/TaskCard";
import DashboardLayout from "@/components/layout/DashboardLayout";
import TaskStatusTabs, { type Tab } from "@/components/TaskStatusTabs";
import { API_PATHS } from "@/utils/apiPaths";
import axiosInstance from "@/utils/axiosInstance";
import { useEffect, useState } from "react";
import { LuFileSpreadsheet } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { Label } from "recharts";

export type TaskStatus = "All" | "Pending" | "In Progress" | "Completed";

// Tipe untuk Task
type Task = {
  _id: string;
  title: string;
  description?: string;
  priority: string;
  status: TaskStatus;
  progress: number;
  createdAt: string;
  dueDate?: string;
  assignedTo: string[];
  attachments: string[];
  completedTotoCount: number;
  todoChecklist: string[];
};

// Tipe untuk Status Summary
type StatusSummary = {
  all: number;
  pendingTasks: number;
  inProgressTasks: number;
  completedTasks: number;
};

type GetTasksResponse = {
  tasks: Task[];
  statusSummary: StatusSummary;
};

const ManageTasks = () => {
  const [allTasks, setAllTasks] = useState<Task[]>([]);

  const [tabs, setTabs] = useState<Tab[]>([]);
  const [filterStatus, setFilterStatus] = useState<Task["status"]>("All");

  const navigate = useNavigate();

  const getAllTasks = async (filterStatus: Task["status"]) => {
    try {
      const response = await axiosInstance.get<GetTasksResponse>(
        API_PATHS.TASKS.GET_ALL_TASKS,
        {
          params: {
            status: filterStatus === "All" ? "" : filterStatus,
          },
        }
      );

      setAllTasks(response.data?.tasks?.length > 0 ? response.data.tasks : []);

      // Map statusSummary data with fixed labels and order
      const statusSummary = response.data?.statusSummary || {};

      const statusArray: Tab[] = [
        { label: "All", count: statusSummary.all || 0 },
        { label: "Pending", count: statusSummary.pendingTasks },
        { label: "In Progress", count: statusSummary.inProgressTasks },
        { label: "Completed", count: statusSummary.completedTasks },
      ];

      setTabs(statusArray);
    } catch (error) {
      console.error("Error fetching Users:", error);
    }
  };

  const handleClick = (taskData: Task) => {
    navigate(`/admin/create-task`, { state: { taskId: taskData._id } });
  };

  // Download task report
  const handleDownloadReport = async () => {};

  useEffect(() => {
    getAllTasks(filterStatus);
    return () => {};
  }, [filterStatus]);

  return (
    <DashboardLayout activeMenu="Manage Tasks">
      <div className="my-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl md:text-xl font-medium">My Tasks</h2>

            <button
              className="flex lg:hidden download-btn"
              onClick={handleDownloadReport}
            >
              <LuFileSpreadsheet className="text-lg" />
              Download Report
            </button>
          </div>

          {tabs?.[0]?.count > 0 && (
            <div className="flex items-center gap-3">
              <TaskStatusTabs
                tabs={tabs}
                activeTab={filterStatus}
                setActiveTab={setFilterStatus}
              />

              <button
                className="hidden lg:flex download-btn"
                onClick={handleDownloadReport}
              >
                <LuFileSpreadsheet className="text-lg" />
                Download Report
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {allTasks?.map((item, index) => (
            <TaskCard
              key={item._id}
              title={item.title}
              description={item.description}
              priority={item.priority}
              status={item.status}
              progress={item.progress}
              createdAt={item.createdAt}
              dueDate={item.dueDate}
              assignTo={item.assignedTo?.map((item) => item.profileImageUrl)}
              attachmentCount={item.attachments?.length || 0}
              completedTodoCount={item.completedTotoCount || 0}
              todoChecklist={item.todoChecklist || []}
              onClick={() => handleClick(item)}
            />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ManageTasks;
