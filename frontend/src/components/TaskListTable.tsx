import moment from "moment";

type StatusType = "Pending" | "In Progress" | "Completed";
type PriorityType = "Low" | "Medium" | "High";

type TaskStatusType = Exclude<StatusType, "All">;

export interface Task {
  _id: string;
  title: string;
  status: StatusType;
  priority: PriorityType;
  createdAt: string;
}

interface TaskTableProps {
  tableData: Task[];
}

const TaskListTable = ({ tableData }: TaskTableProps) => {
  const getStatusBadgeColor = (status: TaskStatusType) => {
    switch (status) {
      case "Completed":
        return "completed-status";
      case "Pending":
        return "pending-status";
      case "In Progress":
        return "in-progress-status";
      default:
        return "default-status";
    }
  };

  const getPriorityBadgeColor = (priority: PriorityType) => {
    switch (priority) {
      case "High":
        return "high-priority";
      case "Medium":
        return "medium-priority";
      case "Low":
        return "low-priority";
      default:
        return "default-priority";
    }
  };
  return (
    <div className="overflow-x-auto p-0 rounded-lg mt-3">
      <table className="min-w-full">
        <thead>
          <tr className="text-left">
            <th className="py-3 px-4 text-gray-800 font-medium text-[13px]">
              Name
            </th>
            <th className="py-3 px-4 text-gray-800 font-medium text-[13px]">
              Status
            </th>
            <th className="py-3 px-4 text-gray-800 font-medium text-[13px]">
              Priority
            </th>
            <th className="py-3 px-4 text-gray-800 font-medium text-[13px] hidden md:table-cell">
              Created On
            </th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((task) => (
            <tr key={task._id} className="border-t border-gray-200">
              <td className="my-3 mx-4 text-gray-700 text-[13px] line-clamp-1 overflow-hidden">
                {task.title}
              </td>
              <td className="py-4 px-4">
                <span
                  className={`px-2 py-1 text-xs rounded inline-block ${getStatusBadgeColor(
                    task.status
                  )}`}
                >
                  {task.status}
                </span>
              </td>
              <td className="py-4 px-4">
                <span
                  className={`px-2 py-1 text-xs rounded inline-block ${getPriorityBadgeColor(task.priority)}`}
                >
                  {task.priority}
                </span>
              </td>
              <td className="py-4 px-4  text-gray-700 text-[13px] text-nowrap hidden md:table-cell">
                {task.createdAt
                  ? moment(task.createdAt).format("Do MMM YYYY")
                  : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskListTable;
