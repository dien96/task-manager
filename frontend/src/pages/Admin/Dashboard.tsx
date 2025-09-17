import InfoCard from "@/components/Cards/InfoCard";
import CustomBarChart, {
  type BarChartData,
} from "@/components/Charts/CustomBarChart";
import CustomPieChart, {
  type PieChartData,
} from "@/components/Charts/CustomPieChart";
import DashboardLayout from "@/components/layout/DashboardLayout";
import TaskListTable, { type Task } from "@/components/TaskListTable";
import { UserContext } from "@/context/UserContext";
import { useUserAuth } from "@/hooks/useUserAuth";
import { API_PATHS } from "@/utils/apiPaths";
import axiosInstance from "@/utils/axiosInstance";
import { addThousandsSeparator } from "@/utils/helper";
import moment from "moment";
import { useContext, useEffect, useState, useCallback } from "react";
import { LuArrowRight } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

type TaskDistributionType = {
  All: number;
  Pending: number;
  InProgress: number;
  Completed: number;
};

type TaskPriorityLevelsType = {
  Low: number;
  Medium: number;
  High: number;
};

interface DashboardData {
  charts: {
    taskDistribution: TaskDistributionType;
    taskPriorityLevels: TaskPriorityLevelsType;
  };
  recentTasks: Task[];
}

const COLORS = ["#8D51ff", "#00B8DB", "#7BCE00"];

const Dashboard = () => {
  useUserAuth();

  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [pieChartData, setPieChartData] = useState<PieChartData[]>([]);
  const [barChartData, setBarChartData] = useState<BarChartData[]>([]);

  // Prepare Chart Data
  const prepareChartData = useCallback((data: DashboardData["charts"]) => {
    const taskDistribution = data?.taskDistribution || null;
    const taskPriorityLevels = data?.taskPriorityLevels || null;

    const taskDistributionData = [
      { status: "Pending", count: taskDistribution?.Pending || 0 },
      { status: "In Progress", count: taskDistribution?.InProgress || 0 },
      { status: "Completed", count: taskDistribution?.Completed || 0 },
    ];

    setPieChartData(taskDistributionData);

    const taskPriorityLevelData = [
      { priority: "Low", count: taskPriorityLevels?.Low || 0 },
      { priority: "Medium", count: taskPriorityLevels?.Medium || 0 },
      { priority: "High", count: taskPriorityLevels?.High || 0 },
    ];

    setBarChartData(taskPriorityLevelData);
  }, []);

  // Get Dashboard Data API Call
  const getDashboardData = useCallback(async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.TASKS.GET_DASHBOARD_DATA
      );
      if (response.data) {
        setDashboardData(response.data);
        prepareChartData(response.data?.charts || null);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  }, [prepareChartData]);

  const onSeeMore = () => {
    navigate("/admin/tasks");
  };

  useEffect(() => {
    getDashboardData();
  }, [getDashboardData]);

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="card my-5">
        <div>
          <div className="col-span-3">
            <h2 className="text-xl md:text-2xl">Good Morning! {user?.name}</h2>
            <p className="text-xs md:text-[13px] text-gray-400 mt-1.5">
              {moment().format("dddd Do MMM YYYY")}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mt-5">
          <InfoCard
            label="Total Tasks"
            value={addThousandsSeparator(
              dashboardData?.charts?.taskDistribution?.All || 0
            )}
            className="bg-primary"
          />

          <InfoCard
            label="Pending Tasks"
            value={addThousandsSeparator(
              dashboardData?.charts?.taskDistribution?.Pending || 0
            )}
            className="bg-violet-500"
          />

          <InfoCard
            label="In Progress Tasks"
            value={addThousandsSeparator(
              dashboardData?.charts?.taskDistribution?.InProgress || 0
            )}
            className="bg-cyan-500"
          />

          <InfoCard
            label="Completed Tasks"
            value={addThousandsSeparator(
              dashboardData?.charts?.taskDistribution?.Completed || 0
            )}
            className="bg-lime-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4 md:my-6">
        <div>
          <div className="card">
            <div className="flex items-center justify-between">
              <h5 className="font-medium">Task Distribution</h5>
            </div>

            <CustomPieChart data={pieChartData} colors={COLORS} />
          </div>
        </div>

        <div>
          <div className="card">
            <div className="flex items-center justify-between">
              <h5 className="font-medium">Priority Levels</h5>
            </div>

            <CustomBarChart data={barChartData} />
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="card">
            <div className="flex items-center justify-between">
              <h5 className="text-lg">Recent Tasks</h5>

              <button className="card-btn" onClick={onSeeMore}>
                See All <LuArrowRight className="text-base" />
              </button>
            </div>

            <TaskListTable tableData={dashboardData?.recentTasks || []} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
